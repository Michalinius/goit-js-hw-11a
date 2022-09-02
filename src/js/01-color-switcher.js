function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyChange = document.querySelector("body");
const startChange = document.querySelector(`[data-start]`);
const stopChange = document.querySelector(`[data-stop]`);
let interval;

function colorAssignment() {
    bodyChange.style.backgroundColor = getRandomHexColor();
}

function colorSwitch() {
    startChange.disabled = true;
    interval = setInterval (colorAssignment, 1000)
}

function stopColorSwitch() {
    startChange.disabled = false;
    clearInterval(interval);
}

startChange.addEventListener("click", colorSwitch);
stopChange.addEventListener("click", stopColorSwitch);


