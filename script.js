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
