const inputVelocity = document.getElementById('inputVelocity');
const unitsVelocity = document.getElementById('unitsVelocity');
const submitButton = document.getElementById('submitButton');

function validateGammaFactorInput() {
    const input = document.getElementById('inputVelocity');
    const inputName = 'Velocity';

    const v = parseFloat(input.value);
    const vUnit = unitsVelocity.value;
    let min = 0;
    let max = 1;

    if (vUnit === 'ms') {
        max = 299792458;
    } else if (vUnit === 'kmh') {
        max = 1079252848.8;
    } else if (vUnit === 'mph') {
        max = 670616629.3844;
    } else if (vUnit === 'fts') {
        max = 983571056.4305;
    } else if (vUnit === 'knots') {
        max = 582749912.8774;
    } else if (vUnit === 'kms') {
        max = 299792.458;
    } else if (vUnit === 'cms') {
        max = 2997.92458;
    }

    if (isNaN(v) || v < 0 || v > max) {
        showAlert(`Invalid input for ${inputName}. Please enter a value between 0 and ${max}.`, input.id);
        return false;
    }

    if (v < min || v > max) {
        showAlert(`Invalid input for ${inputName}. Please enter a value between ${min} and ${max}.`, input.id);
        return false;
    }

    const regex = /^-?\d*\.?\d+(e[-+]?\d+)?$/i;
    if (!regex.test(input.value)) {
        showAlert(`Invalid input for ${inputName}. Please enter a valid number.`, input.id);
        return false;
    }

    removeCardBorder();
    return true;
}

function updateMinMax() {
    const vUnit = unitsVelocity.value;

    let min = 0;
    let max = 0;

    if (vUnit === 'ms') {
        min = 0;
        max = 299792458;
    } else if (vUnit === 'kmh') {
        min = 0;
        max = 1079252848.8;
    } else if (vUnit === 'mph') {
        min = 0;
        max = 670616629.3844;
    } else if (vUnit === 'fts') {
        min = 0;
        max = 983571056.4305;
    } else if (vUnit === 'knots') {
        min = 0;
        max = 582749912.8774;
    } else if (vUnit === 'kms') {
        min = 0;
        max = 299792.458;
    } else if (vUnit === 'cms') {
        min = 0;
        max = 2997.92458;
    } else if (vUnit === 'c') {
        min = 0;
        max = 1;
    }

    inputVelocity.setAttribute('min', min);
    inputVelocity.setAttribute('max', max);
}

inputVelocity.addEventListener('input', function () {
    if (inputVelocity.checkValidity()) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

unitsVelocity.addEventListener('change', function () {
    updateMinMax();
    inputVelocity.value = '';
    submitButton.disabled = true;
});

document.getElementById("submitButton").addEventListener("click", function () {
    if (validateGammaFactorInput()) {
        calculateVelocity();
    }
});

function calculateVelocity() {
    const v = parseFloat(inputVelocity.value);
    const vUnit = unitsVelocity.value;

    let vDecimal = 0;

    if (vUnit === "ms") {
        vDecimal = v / 299792458;
    } else if (vUnit === "kmh") {
        vDecimal = (v * 1000 / 3600) / 299792458;
    } else if (vUnit === "mph") {
        vDecimal = (v / 2.23694) / 299792458;
    } else if (vUnit === "fts") {
        vDecimal = (v / 3.28084) / 299792458;
    } else if (vUnit === "knots") {
        vDecimal = (v / 1.94384) / 299792458;
    } else if (vUnit === "kms") {
        vDecimal = v / 299792.458;
    } else if (vUnit === "cms") {
        vDecimal = v / 2997924580;
    } else if (vUnit === "c") {
        vDecimal = v
    }

    vDecimal = parseFloat(vDecimal);

    if (isNaN(vDecimal)) {
        if (v !== "c") {
            showAlert(`Invalid input for Velocity. Please enter a valid number.`, inputVelocity.id);
            return false;
        }
        vDecimal = 1;
    }

    const gammaFactor = 1 / Math.sqrt(1 - (vDecimal ** 2));

    console.log("gammaFactor:", gammaFactor);

    document.getElementById("gammaFactorValue").textContent = gammaFactor.toFixed(5);
}
