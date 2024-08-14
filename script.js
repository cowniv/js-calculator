// Calculator – first real JavaScript project (DOM, events, state)
const currentEl = document.getElementById("current");
const prevEl = document.getElementById("prev");

let current = "0";
let previous = "";
let operator = null;
let justEvaluated = false;

function render() {
  currentEl.textContent = current;
  prevEl.textContent = operator ? `${previous} ${operator}` : "";
}

function appendNumber(n) {
  if (justEvaluated) {
    current = "0";
    justEvaluated = false;
  }
  if (n === "." && current.includes(".")) return;
  if (current === "0" && n !== ".") current = n;
  else current += n;
}

function chooseOperator(op) {
  if (operator && !justEvaluated) compute();
  previous = current;
  operator = op;
  current = "0";
  justEvaluated = false;
}

function compute() {
  const a = parseFloat(previous);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b) || !operator) return;

  let result;
  switch (operator) {
    case "+": result = a + b; break;
    case "−": result = a - b; break;
    case "×": result = a * b; break;
    case "÷": result = b === 0 ? "Error" : a / b; break;
  }

  // avoid floating point noise like 0.1 + 0.2 = 0.30000000000000004
  current = typeof result === "number" ? String(parseFloat(result.toFixed(10))) : result;
  previous = "";
  operator = null;
  justEvaluated = true;
}

document.querySelector(".keys").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.num) appendNumber(btn.dataset.num);
  else if (btn.dataset.op) chooseOperator(btn.dataset.op);
  else if (btn.dataset.action === "equals") compute();
  else if (btn.dataset.action === "clear") {
    current = "0"; previous = ""; operator = null;
  } else if (btn.dataset.action === "delete") {
    current = current.length > 1 ? current.slice(0, -1) : "0";
  }
});
