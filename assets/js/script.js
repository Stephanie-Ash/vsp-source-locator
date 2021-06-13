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

    if (!whX && whX !== 0 || !whY && whY !== 0) {
        alert("Enter Wellhead X and Y Coordinates");
    } else if (srcAzimuth > 360 || srcAzimuth < 0) {
        alert("Source Azimuth is outside of acceptable 0 to 360 range");
    } else if ((srcX || srcX === 0) && (srcY || srcY === 0)) {
        calculateSourceA(whX, whY, srcX, srcY);
    } else if ((srcOffset || srcOffset === 0) && (srcAzimuth || srcAzimuth === 0)) {
        calculateSourceB(whX, whY, srcOffset, srcAzimuth);
    } else {
        alert("Enter Source X and Y or Offset and Azimuth");
    }
}
