function colorStartInit() {
    let currentColor = localStorage.getItem("currentColor");
    let prevColor = localStorage.getItem("prevColor");
    document.getElementById("current-color").style.backgroundColor = currentColor;
    document.getElementById("prev-color").style.backgroundColor = prevColor;
}

function getColor(color) {
    let tool = localStorage.getItem("currentTool");
    let currentColor = localStorage.getItem("currentColor");
    if(tool === "color-picker"){
        localStorage.setItem('currentColor', color);
        localStorage.setItem("prevColor", currentColor);
        document.getElementById("current-color").style.backgroundColor = color;
        document.getElementById("prev-color").style.backgroundColor = currentColor;
    }
}
