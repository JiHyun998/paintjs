const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const Initial_color = "#2c2c2c";
const Canvas_size = 700;
const saveBtn = document.getElementById("jsSave");
canvas.width = Canvas_size;
canvas.height = Canvas_size;

ctx.fillStyle = "white";
ctx.fillRect(0,0,Canvas_size,Canvas_size);
ctx.strokeStyle = Initial_color;
ctx.lineWidth = 2.5;
ctx.fillStyle = Initial_color;
// 채우는 색상 / x,y,width,height
// ctx.fillRect(50,20,100,49);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

// 이벤트 내장 함수 확인가능 
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x , y);

    if(!painting) {
        // console.log("creating path in" ,x,y );
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        // console.log("creating line in" ,x,y );
        ctx.lineTo(x,y);
        ctx.stroke();
        // closePath 사용시 계속 클릭하고 있다면 시작점은 처음 시작점
        // ctx.closePath();
    }
}

function handleColorClick(event){
    // console.log(event.target.style.backgroundColor);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
};

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;

    // ctx.lineWidth = range.value;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerHTML = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if (filling) {
        ctx.fillRect(0,0,Canvas_size,Canvas_size);
    } 
}

function handleCM(event) {
    // 마우스 우클릭 방지 contextmenu
    event.preventDefault();
}

function hacdleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.download = "PaintJS[EXPORT]";
    link.href = image;
    // download 는 a tag의 attribute임 제목 설정
    // console.log(link);

    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

// 캔버스 내에 좌표 offsetX/Y
// clientX/Y는 윈도우 전체의 범위 내에 마우스를 움직이는 값

// HTML Collection 으로 나와서 Array.from(colors)사용하여 배열로 만들어줌

// const array1 = ['a', 'b', 'c'];
// array1.forEach(element => console.log(element));
// 결과값 "a" "b" "c" 한줄씩 실행
Array.from(colors).forEach(changeColor => changeColor.addEventListener("click",handleColorClick));

if(range) {
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click",hacdleSaveClick);
}