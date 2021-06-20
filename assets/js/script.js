// Wait for the DOM to load
// Get the Calculate button and add event listener

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let buttonType;
            if (this.getAttribute("data-type") === "calculate") {
                buttonType = "calculate";
                getValues(buttonType);
            } else if (this.getAttribute("data-type") === "add") {
                buttonType = "add";
                getValues(buttonType);
            } else drawChart()
        })
    }
})

/**
 * Gets and checks the input values from the DOM
 * and runs the appropriate calculation
 */
function getValues(buttonType) {
    let whX = parseFloat(document.getElementById("wh-x").value);
    let whY = parseFloat(document.getElementById("wh-y").value);
    let srcX = parseFloat(document.getElementById("src-x").value);
    let srcY = parseFloat(document.getElementById("src-y").value);
    let srcOffset = parseFloat(document.getElementById("src-off").value);
    let srcAzimuth = parseFloat(document.getElementById("src-az").value);
    let display;

    if (buttonType === 'calculate') {
        display = 'results';
    } else display = 'list'; 

    if (!whX && whX !== 0 || !whY && whY !== 0) {
        alert("Enter Wellhead X and Y Coordinates");
    } else if (srcAzimuth > 360 || srcAzimuth < 0) {
        alert("Source Azimuth is outside of acceptable 0 to 360 range");
    } else if (whX === srcX && whY === srcY) {
        alert("Source at wellhead, no calculation required!")
    } else if ((srcX || srcX === 0) && (srcY || srcY === 0)) {
        calculateSourceA(whX, whY, srcX, srcY, display);
    } else if ((srcOffset || srcOffset === 0) && (srcAzimuth || srcAzimuth === 0)) {
        calculateSourceB(whX, whY, srcOffset, srcAzimuth, display);
    } else {
        alert("Enter Source X and Y or Offset and Azimuth");
    }

    let inputs = document.getElementsByClassName("input-box")
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

}

/**
 * Takes the wellhead and source X and Y inputs
 * and calculates the source offset and azimuth
 */
function calculateSourceA(whX, whY, srcX, srcY, display) {
    let offsetX = srcX - whX;
    let offsetY = srcY - whY;
    let srcOffset;
    let srcAzimuth;

    if (offsetX === 0 && offsetY < 0) {
        srcOffset = offsetY;
        srcAzimuth = 180;
    } else if (offsetX === 0 && offsetY > 0) {
        srcOffset = offsetY;
        srcAzimuth = 360;
    } else if (offsetY === 0 && offsetX < 0) {
        srcOffset = offsetX;
        srcAzimuth = 270;
    } else if (offsetY === 0 && offsetX > 0) {
        srcOffset = offsetX;
        srcAzimuth = 90;
    } else {
        srcOffset = (offsetX ** 2 + offsetY ** 2) ** (1/2);
        let srcAngle = (Math.atan(offsetY / offsetX)) / (Math.PI / 180);

        if (offsetX < 1) {
            srcAzimuth = 270 - srcAngle;
        } else {
            srcAzimuth = 90 - srcAngle;
        }
    }
    
    let source = {
        x: Math.round(srcX * Math.pow(10,1)) / Math.pow(10,1),
        y: Math.round(srcY * Math.pow(10,1)) / Math.pow(10,1),
        offset: Math.round(srcOffset * Math.pow(10,1)) / Math.pow(10,1),
        azimuth: Math.round(srcAzimuth * Math.pow(10,1)) / Math.pow(10,1)
        };
    
    if (display === 'results') {
        displayResults(source);
    } else displayList(source);
       
}

/**
 * Takes the wellhead and source offset and azimuth inputs
 * and calculates the source X and Y
 */
function calculateSourceB(whX, whY, srcOffset, srcAzimuth, display) {
    let srcAngle;
    let offsetX;
    let offsetY;

    if (srcOffset === 0) {
        alert("Source at Wellhead, no calculation required!");
    } else if (srcAzimuth === 360 || srcAzimuth === 0) {
        offsetX = 0;
        offsetY = srcOffset;
    } else if (srcAzimuth === 90) {
        offsetX = srcOffset;
        offsetY = 0;
    } else if (srcAzimuth === 180) {
        offsetX = 0;
        offsetY = -srcOffset;
    } else if (srcAzimuth === 270) {
        offsetX = -srcOffset;
        offsetY = 0;
    } else {
        if (srcAzimuth < 180) {
            srcAngle = 90 - srcAzimuth;
        } else {
            srcAngle = 270 - srcAzimuth;
        }
    
        let srcAngleR = srcAngle * (Math.PI / 180);
            
        if (srcAzimuth < 180) {
            offsetY = Math.sin(srcAngleR) * srcOffset;
            offsetX = Math.cos(srcAngleR) * srcOffset;
        } else {
            offsetY = Math.sin(srcAngleR) * -srcOffset;
            offsetX = Math.cos(srcAngleR) * -srcOffset;
        }
    }

    let srcX = offsetX + whX;
    let srcY = offsetY + whY;

    let source = {
        x: Math.round(srcX * Math.pow(10,1)) / Math.pow(10,1),
        y: Math.round(srcY * Math.pow(10,1)) / Math.pow(10,1),
        offset: Math.round(srcOffset * Math.pow(10,1)) / Math.pow(10,1),
        azimuth: Math.round(srcAzimuth * Math.pow(10,1)) / Math.pow(10,1)
    };

    if (display === 'results') {
        displayResults(source);
    } else displayList(source);
}

/**
 * Displays calculated values in the DOM
 */
function displayResults(source) {
    document.getElementById("result-area").style.display = "inherit";
    document.getElementById("list").innerHTML ="";
    document.getElementById("result-list").style.display = "none";

    let sourceInformation = document.getElementsByClassName("results");

    sourceInformation[0].innerHTML = `X Coordinate:<span class="srcX">${source.x}</span>`;
    sourceInformation[1].innerHTML = `Y Coordinate:<span class="srcY">${source.y}</span>`;
    sourceInformation[2].innerHTML = `Offset:<span>${source.offset}</span>`;
    sourceInformation[3].innerHTML = `Azimuth:<span>${source.azimuth}&degN</span>`;

    let listEntry = document.createElement('li');

    listEntry.innerHTML = `
      <p class="results-list">X Coordinate:<span class="srcX">${source.x}</span></p>
      <p class="results-list">Y Coordinate:<span class="srcY">${source.y}</span></p>
      <p class="results-list">Offset:<span>${source.offset}</span></p>
      <p class="results-list">Azimuth:<span>${source.azimuth}&degN</span></p>`;

    document.getElementById("list").appendChild(listEntry);   

    document.getElementById("add").style.display = "inline-block";
    document.getElementById("create").style.display = "inherit"
}

/**
 * Appends calculated values to an html list
 */
function displayList(source) {
    document.getElementById("result-area").style.display = "none";
    document.getElementById("result-list").style.display = "inherit";

    let listEntry = document.createElement('li');

    listEntry.innerHTML = `
      <p class="results-list">X Coordinate:<span class="srcX">${source.x}</span></p>
      <p class="results-list">Y Coordinate:<span class="srcY">${source.y}</span></p>
      <p class="results-list">Offset:<span>${source.offset}</span></p>
      <p class="results-list">Azimuth:<span>${source.azimuth}&degN</span></p>`;

    document.getElementById("list").appendChild(listEntry);  
}

function drawChart() {
    document.getElementById('plan-area').style.display = "inherit";

    let whX = parseFloat(document.getElementById("wh-x").value);
    let whY = parseFloat(document.getElementById("wh-y").value);
    let srcsXInitial = document.getElementsByClassName("srcX");
    let srcsYInitial = document.getElementsByClassName("srcY");
    let srcsX = [];
    let srcsY = [];

    for (let i = 0; i < srcsXInitial.length; i++) {
        srcsX.push(parseFloat(srcsXInitial[i].textContent));
    }

    for (let i = 0; i < srcsYInitial.length; i++) {
        srcsY.push(parseFloat(srcsYInitial[i].textContent));
    }

    let data = new google.visualization.DataTable();
    data.addColumn('number', 'X Coordinate');
    data.addColumn('number', 'Wellhead');
    data.addColumn('number', 'Sources');

    data.addRows([
        [whX, whY, null]
    ]);

    for (let i = 0; i < srcsX.length; i++) {
        data.addRows([
            [srcsX[i], null, srcsY[i]]
        ]);
    }
    

      let options = {
        title: 'Age vs. Weight comparison',
        hAxis: {title: 'Age', minValue: 0, maxValue: 15},
        vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none'
      };

      let chart = new google.visualization.ScatterChart(document.getElementById('plan-area'));

      chart.draw(data, options);
}