// Wait for the DOM to load
// Get the Calculate button and add event listener

document.addEventListener("DOMContentLoaded", function() {
    let calculate = document.getElementById("calculate");

    calculate.addEventListener("click", getValues);
})

/**
 * Gets and checks the input values from the DOM
 * and runs the appropriate calculation
 */

function getValues() {
    let whX = parseFloat(document.getElementById("wh-x").value);
    let whY = parseFloat(document.getElementById("wh-y").value);
    let srcX = parseFloat(document.getElementById("src-x").value);
    let srcY = parseFloat(document.getElementById("src-y").value);
    let srcOffset = parseFloat(document.getElementById("src-off").value);
    let srcAzimuth = parseFloat(document.getElementById("src-az").value);

    if (!whX || !whY) {
        alert("Enter Wellhead X and Y Coordinates");
    } else if (srcX && srcY) {
        calculateSourceA(whX, whY, srcX, srcY);
    } else if (srcOffset && srcAzimuth) {
        calculateSourceB(whX, whY, srcOffset, srcAzimuth);
    } else {
        alert("Enter Source X and Y or Offset and Azimuth");
    }

}