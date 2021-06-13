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

    let inputs = document.getElementsByClassName("input-box")
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    document.getElementById("wh-x").focus();
}

/**
 * Takes the wellhead and source X and Y inputs
 * and calculates the source offset and azimuth
 */
function calculateSourceA(whX, whY, srcX, srcY) {
    let offsetX = srcX - whX;
    let offsetY = srcY - whY;
    let srcOffset = (offsetX ** 2 + offsetY ** 2) ** (1/2);
    let srcAngle = (Math.atan(offsetY/offsetX)) / (Math.PI / 180);
    let srcAzimuth;

    if (offsetX < 1) {
        srcAzimuth = 270 - srcAngle;
    } else {
        srcAzimuth = 90 - srcAngle;
    }

    console.log(srcOffset);
    console.log(srcAzimuth);
}

/**
 * Takes the wellhead and source offset and azimuth inputs
 * and calculates the source X and Y
 */

function calculateSourceB(whX, whY, srcOffset, srcAzimuth) {
    let srcAngle;

    if (srcAzimuth < 180) {
        srcAngle = 90 - srcAzimuth;
    } else {
        srcAngle = 270 - srcAzimuth;
    }

    let srcAngleR = srcAngle * (Math.PI / 180);
    let offsetX;
    let offsetY;

    if (srcAzimuth < 180) {
        offsetY = Math.sin(srcAngleR) * srcOffset;
        offsetX = Math.cos(srcAngleR) * srcOffset;
    } else {
        offsetY = Math.sin(srcAngleR) * -srcOffset;
        offsetX = Math.cos(srcAngleR) * -srcOffset;
    }

    let srcX = offsetX + whX;
    let srcY = offsetY + whY;

    console.log(srcX);
    console.log(srcY);
}