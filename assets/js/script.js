// Wait for Google Charts package to load
// Get the Create Plan button and add event listener

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(prepareCharting);

function prepareCharting () {
    document.getElementById("create").addEventListener("click", function() {
        drawChart();
    });
} 

// Wait for the DOM to load
// Get the calculation buttons and add event listeners

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByClassName("calc-buttons");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let buttonType; //Create variable based on button type clicked for use in later functions
            if (this.getAttribute("data-type") === "calculate") {
                buttonType = "calculate";
                getValues(buttonType);
            } else if (this.getAttribute("data-type") === "add") {
                buttonType = "add";
                getValues(buttonType);
            }
        });
    }
});

/**
 * Runs after either of the calculation buttons are clicked
 * Gets and checks the input values from the DOM
 * and calls the appropriate calculation function
 */
function getValues(buttonType) {
    //Get user inputs
    let whX = parseFloat(document.getElementById("wh-x").value);
    let whY = parseFloat(document.getElementById("wh-y").value);
    let previousWhX = parseFloat(document.getElementById("result-wh-x").innerHTML);
    let previousWhY = parseFloat(document.getElementById("result-wh-y").innerHTML);
    let srcX = parseFloat(document.getElementById("src-x").value);
    let srcY = parseFloat(document.getElementById("src-y").value);
    let srcOffset = parseFloat(document.getElementById("src-off").value);
    let srcAzimuth = parseFloat(document.getElementById("src-az").value);
    let display;

    /* Set a variable based on which button was clicked.
    will be used to define which result display function to use */
    if (buttonType === 'calculate') {
        display = 'results';
    } else display = 'list';
    
    //Test input data for missing or problematic values and call appropriate calulation function
    if (!whX && whX !== 0 || !whY && whY !== 0) {
        alert("Enter Wellhead X and Y Coordinates");
    } else if (srcAzimuth > 360 || srcAzimuth < 0) {
        alert("Source Azimuth is outside of acceptable 0 to 360 range");
    } else if (whX === srcX && whY === srcY || srcOffset === 0) {
        alert("Source at wellhead, no calculation required!");
    } else if (display === 'list' && (whX !== previousWhX || whY !== previousWhY)) {
        alert("Wellhead X and Y locations do not match previous calculation");
    } else if ((srcX || srcX === 0) && (srcY || srcY === 0)) {
        calculateSourceA(whX, whY, srcX, srcY, display);
    } else if (srcOffset && (srcAzimuth || srcAzimuth === 0)) {
        calculateSourceB(whX, whY, srcOffset, srcAzimuth, display);
    } else {
        alert("Enter Source X and Y or Offset and Azimuth");
    }

    //Clear source information input boxes
    //Wellhead boxes left populated for use if Add Source button clicked
    let inputs = document.getElementsByClassName("input-box");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

}

/**
 * Takes the wellhead and source X and Y inputs
 * and calculates the source offset and azimuth
 */
function calculateSourceA(whX, whY, srcX, srcY, display) {
    let offsetX = srcX - whX; //Calculate source X and Y offset from wellhead
    let offsetY = srcY - whY;
    let srcOffset;
    let srcAzimuth;

    //Check for north, south, east or west locations then calculate source offset and azimuth
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

        //Calculate source azimuth based on which side of well (in X) source is
        if (offsetX < 1) {
            srcAzimuth = 270 - srcAngle;
        } else {
            srcAzimuth = 90 - srcAngle;
        }
    }
    
    //Save calculated results in objects
    let source = {
        x: Math.round(srcX * Math.pow(10,1)) / Math.pow(10,1),
        y: Math.round(srcY * Math.pow(10,1)) / Math.pow(10,1),
        offset: Math.round(srcOffset * Math.pow(10,1)) / Math.pow(10,1),
        azimuth: Math.round(srcAzimuth * Math.pow(10,1)) / Math.pow(10,1)
    };

    let wellhead = {
        x: whX,
        y: whY
    };
    
    //Call correct display results function based on which button was clicked
    if (display === 'results') {
        displayResults(source, wellhead);
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

    //Check for north, south, east or west locations then calculate source X and Y
    if (srcAzimuth === 360 || srcAzimuth === 0) {
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

    //Calculate source locations from offsets
    let srcX = offsetX + whX;
    let srcY = offsetY + whY;

    //Save calculated results in objects
    let source = {
        x: Math.round(srcX * Math.pow(10,1)) / Math.pow(10,1),
        y: Math.round(srcY * Math.pow(10,1)) / Math.pow(10,1),
        offset: Math.round(srcOffset * Math.pow(10,1)) / Math.pow(10,1),
        azimuth: Math.round(srcAzimuth * Math.pow(10,1)) / Math.pow(10,1)
    };

    let wellhead = {
        x: whX,
        y: whY
    };

    //Call correct display results function based on which button was clicked
    if (display === 'results') {
        displayResults(source, wellhead);
    } else displayList(source);
}

/**
 * Displays the calculated values in the DOM
 */
function displayResults(source, wellhead) {
    //Display result area
    document.getElementById("result-area").style.display = "inherit";

    //Clear source list and turn off chart display
    document.getElementById("list").innerHTML ="";
    document.getElementById("result-list").style.display = "none";
    document.getElementById("plan-area").style.display = "none";

    //Add wellhead locations to the DOM for use in drawChart function
    //Values won't be displayed
    let wellheadInformation = document.getElementsByClassName("wh-info");

    wellheadInformation[0].innerHTML = `${wellhead.x}`;
    wellheadInformation[1].innerHTML = `${wellhead.y}`;

    //Add calculated source location information to the DOM
    let sourceInformation = document.getElementsByClassName("results");

    sourceInformation[0].innerHTML = `X Location:<span class="srcX">${source.x.toFixed(1)}</span>`;
    sourceInformation[1].innerHTML = `Y Location:<span class="srcY">${source.y.toFixed(1)}</span>`;
    sourceInformation[2].innerHTML = `Offset:<span>${source.offset.toFixed(1)}</span>`;
    sourceInformation[3].innerHTML = `Azimuth:<span>${source.azimuth.toFixed(1)}&degN</span>`;

    //Add calculated source location to a list ready for display if Add Source button clicked
    let listEntry = document.createElement('li');

    listEntry.innerHTML = `
      <p class="results-list list-x">X Location:<span class="srcX">${source.x.toFixed(1)}</span></p>
      <p class="results-list list-y">Y Location:<span class="srcY">${source.y.toFixed(1)}</span></p>
      <p class="results-list list-off">Offset:<span>${source.offset.toFixed(1)}</span></p>
      <p class="results-list list-az">Azimuth:<span>${source.azimuth.toFixed(1)}&degN</span></p>`;

    document.getElementById("list").appendChild(listEntry);   

    //Set additional buttons to display
    document.getElementById("add").style.display = "inline-block";
    document.getElementById("create").style.display = "inherit";
}

/**
 * Appends calculated values to an html list
 */
function displayList(source) {
    //Turn off result area and chart display and display list
    document.getElementById("result-area").style.display = "none";
    document.getElementById("plan-area").style.display = "none";
    document.getElementById("result-list").style.display = "inherit";

    //Append calculated source information to source list
    let listEntry = document.createElement('li');

    listEntry.innerHTML = `
      <p class="results-list list-x">X Location:<span class="srcX">${source.x.toFixed(1)}</span></p>
      <p class="results-list list-y">Y Location:<span class="srcY">${source.y.toFixed(1)}</span></p>
      <p class="results-list list-off">Offset:<span>${source.offset.toFixed(1)}</span></p>
      <p class="results-list list-az">Azimuth:<span>${source.azimuth.toFixed(1)}&degN</span></p>`;

    document.getElementById("list").appendChild(listEntry);  
}

/**
 * Retrieves the calculated values from the DOM
 * and plots them on a Google chart
 */
function drawChart() {
    //Turn on chart display
    document.getElementById('plan-area').style.display = "inherit";

    //Get source and wellhead locations
    let whX = parseFloat(document.getElementById("result-wh-x").innerHTML);
    let whY = parseFloat(document.getElementById("result-wh-y").innerHTML);
    let srcsXInitial = document.getElementsByClassName("srcX");
    let srcsYInitial = document.getElementsByClassName("srcY");
    let srcsX = [];
    let srcsY = [];

    //Take source className collections and add the X and Y values to arrays
    for (let i = 0; i < srcsXInitial.length; i++) {
        srcsX.push(parseFloat(srcsXInitial[i].textContent));
    }

    for (let i = 0; i < srcsYInitial.length; i++) {
        srcsY.push(parseFloat(srcsYInitial[i].textContent));
    }

    //Create the data table for the chart
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
    
    //Set chart display parameters and draw chart
    let options = {
        title: 'Plan View of Well and Calculated Sources',
        hAxis: {title: 'X Coordinate', gridlines: {color: '#1d1e20'}},
        vAxis: {title: 'Y Coordinate', gridlines: {color: '#1d1e20'}},
        legend: 'bottom'
    };

      let chart = new google.visualization.ScatterChart(document.getElementById('plan-area'));

      chart.draw(data, options);
}

//Redraws the chart if the window is resized to make it more responsive
window.addEventListener('resize', function(){
    let chart = document.getElementById('plan-area');
    let chartStatus = window.getComputedStyle(chart).display;

    if (chartStatus !== 'none') {
        drawChart();
    }
});