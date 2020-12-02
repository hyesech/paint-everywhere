const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("js-range");
const mode = document.getElementById("js-mode");
const saveBtn = document.getElementById("js-save");

const INITIAL_COLOR = "rgb(24, 24, 24)";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// Canvas INIT 작업
// 이거 안 하면 저장시 Background가 투명으로 저장된다.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  console.log(event);
  painting = true;
}

function handdleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handdleRangeChange(event) {
  const currentValue = event.target.value;
  ctx.lineWidth = currentValue;
}

function handdleModeClick(event) {
  if (filling) {
    filling = false;
    mode.innerText = "FILLING";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handdleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handdleRightClick(event) {
  event.preventDefault();
}

function handdleSaveClick() {
  const image = canvas.toDataURL(); // default가 png
  const link = document.createElement("a");
  link.href = image;
  link.download = "thisisthemasterpiece";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handdleCanvasClick);
  //   저장 방지
  canvas.addEventListener("contextmenu", handdleRightClick);
}

// Color
Array.from(colors).forEach((colors) =>
  colors.addEventListener("click", handdleColorClick)
);

// Range
if (range) {
  range.addEventListener("input", handdleRangeChange);
}

// Fill Mode
if (mode) {
  mode.addEventListener("click", handdleModeClick);
}

// Save Image
if (saveBtn) {
  saveBtn.addEventListener("click", handdleSaveClick);
}
