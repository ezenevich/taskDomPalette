function getTool(tool) {
    localStorage.setItem('currentTool', tool);
}

function changeObject(elem) {
    let tool = localStorage.getItem("currentTool");

    if(tool === "bucket"){
        elem.style.backgroundColor = localStorage.getItem("currentColor");
    }

    if(tool === "transform"){
        if(elem.dataset.atr === "0"){
            elem.dataset.atr = "50";
        }
        else{
            elem.dataset.atr = "0";
        }
        elem.style.borderRadius = elem.dataset.atr+"%";
    }

    if(tool === "move"){
        switch (localStorage.getItem("countClick")) {
            case "1": {
                let firstOb = {};
                firstOb.id = elem.id;
                firstOb.atr = elem.dataset.atr;
                if (elem.style.backgroundColor === "") {
                    firstOb.color = "lightgray"
                }
                else {
                    firstOb.color = elem.style.backgroundColor;
                }
                localStorage.setItem("firstOb", JSON.stringify(firstOb));
                localStorage.setItem("countClick", "2");
                elem.style.filter = "opacity(25%)";
            } break;

            case "2": {
                let secondOb = {};
                secondOb.id = elem.id;
                secondOb.atr = elem.dataset.atr;
                if(elem.style.backgroundColor === ""){
                    secondOb.color = "lightgray"
                }
                else{
                    secondOb.color = elem.style.backgroundColor;
                }
                localStorage.setItem("secondOb",JSON.stringify(secondOb));

                let firstOb = JSON.parse(localStorage.getItem("firstOb"));

                let f = document.getElementById(firstOb.id);
                f.dataset.atr = secondOb.atr;
                f.style.borderRadius = f.dataset.atr+"%";
                f.style.backgroundColor = secondOb.color;
                f.style.filter = "none";

                let s = document.getElementById(secondOb.id);
                s.dataset.atr = firstOb.atr;
                s.style.borderRadius = s.dataset.atr+"%";
                s.style.backgroundColor = firstOb.color;
                s.style.filter = "none";


                localStorage.setItem("firstOb",null);
                localStorage.setItem("secondOb",null);
                localStorage.setItem("countClick", "1");
            } break;
        }
    }

    saveCanvas();
}

function saveCanvas() {
    for(var i = 1; i < 10; i++ ){
        let elem = document.getElementById(`ob${i}`)
        let ob = {};
        ob.id = elem.id;
        ob.atr = elem.dataset.atr;
        if(elem.style.backgroundColor === ""){
            ob.color = "lightgray"
        }
        else{
            ob.color = elem.style.backgroundColor;
        }
        localStorage.setItem(`ob${i}`, JSON.stringify(ob));
    }
}

function canvasStartInit() {
    for(var i = 1; i < 10; i++ ){
        let ob = JSON.parse(localStorage.getItem(`ob${i}`));

        let d = document.getElementById(ob.id);
        d.dataset.atr = ob.atr;
        d.style.borderRadius = d.dataset.atr+"%";
        d.style.backgroundColor = ob.color;
        d.style.filter = "none";
    }

}


function KeyPress(e) {
    let eventOb = window.event? event : e;
    if (eventOb.keyCode === 66 && eventOb.shiftKey) {
        localStorage.setItem('currentTool', "bucket");
    }
    if (eventOb.keyCode === 80 && eventOb.shiftKey) {
        localStorage.setItem('currentTool', "color-picker");
    }
    if (eventOb.keyCode === 77 && eventOb.shiftKey) {
        localStorage.setItem('currentTool', "move");
    }
    if (eventOb.keyCode === 84 && eventOb.shiftKey) {
        localStorage.setItem('currentTool', "transform");
    }
}

document.onkeydown = KeyPress;
