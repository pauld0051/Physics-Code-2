// Check the users are clicking the right number of checkboxes
const $checkboxes = $(".ideal-check input[type=checkbox]");
const $submitButton = $("#submitButton");

$checkboxes.on("change", function() {
    const $checkedCheckboxes = $checkboxes.filter(":checked");

    // Disable unchecked checkboxes
    $checkboxes.filter(":not(:checked)").prop("disabled", $checkedCheckboxes.length >= 3);

    // Enable corresponding inputs for checked checkboxes
    const $checkedInputs = $checkedCheckboxes.map(function() {
        return $("[data-input='" + this.id + "']");
    });
    const $allInputs = $(".reset_form");
    $allInputs.prop("disabled", true);
    $checkedInputs.each(function() {
        $(this).prop("disabled", false);
    });

    // Disable submit button if less than 3 checkboxes are checked
    $submitButton.prop("disabled", $checkedCheckboxes.length < 3);

    // Change colour of checkbox icon when valid
    const $fontawesomeIcon = $(".fas.fa-check-square");
    if ($checkedCheckboxes.length === 3) {
        $fontawesomeIcon.removeClass("text-warning").addClass("text-success");
    } else {
        $fontawesomeIcon.removeClass("text-success").addClass("text-warning");
    }
});


//Equation Variables
//Checkbox selection
const p1 = document.querySelector("#pressure");
const v1 = document.querySelector("#volume");
const n1 = document.querySelector("#moles");
const t1 = document.querySelector("#temperature");

document.getElementById("submitButton").addEventListener("click", function() {
    if (validateInputs()) {
        calculateIdealGas();
    }
});

function calculateIdealGas() {
    //User input values
    let p = parseFloat(document.getElementById("inputPressure").value);
    let v = parseFloat(document.getElementById("inputVolume").value);
    let n = parseFloat(document.getElementById("inputMole").value);
    let r = parseFloat(document.getElementById("inputGasConstant").value);
    let t = parseFloat(document.getElementById("inputTemperature").value);

    // *************************************************************** //
    // User input units - change everything to metric for calculations //
    // *************************************************************** //

    // Pressure //
    const pUnit = document.getElementById("unitsPressure").value;
    if (pUnit === "pa") {
        p = p;
    }
    if (pUnit === "bar") {
        p = p * 100000;
    }
    if (pUnit === "atm") {
        p = p * 101325;
    }
    if (pUnit === "mmHg") {
        p = p * 133.322;
    }
    if (pUnit === "psi") {
        p = p * 6894.76;
    }
    if (pUnit === "torr") {
        p = p * 133.322;
    }
    if (pUnit === "hpa") {
        p = p * 100;
    }
    if (pUnit === "kpa") {
        p = p * 1000;
    }
    if (pUnit === "mpa") {
        p = p * 1000000;
    }
    if (isNaN(p)) p = 0;

    // Volume //
    const vUnit = document.getElementById("unitsVolume").value;
    if (vUnit === "m3") {
        v = v;
    }
    if (vUnit === "cm3") {
        v = v / 1000000;
    }
    if (vUnit === "L") {
        v = v / 1000;
    }
    if (vUnit === "mL") {
        v = v / 1000000;
    }
    if (isNaN(v)) v = 0;

    // Temperature //
    const tUnit = document.getElementById("unitsTemperature").value;
    if (tUnit === "k") {
        t = t;
    }
    if (tUnit === "c") {
        t = t + 273.15;
    }
    if (tUnit === "f") {
        t = (t + 459.67) * 5 / 9;
    }
    if (isNaN(t)) t = 0;

    // Moles //
    const nUnit = document.getElementById("unitsMole").value;
    if (nUnit === "mol") {
        n = n;
    }
    if (nUnit === "mmol") {
        n = n / 1000;
    }
    if (nUnit === "μmol") {
        n = n / 1000000;
    }
    if (nUnit === "nmol") {
        n = n / 1000000000;
    }
    if (isNaN(n)) n = 0;

    //**************//
    // Calculations //
    //**************//
    if (!p1.checked && v1.checked && n1.checked && t1.checked) {
        //Equation 1 P unknown
        p = n * r * t / v;
        document.getElementById("inputPressure").value = p.toFixed(3);
        document.getElementById("pressureOutput").innerHTML = scientificNotation(p) + " Pa";
        document.getElementById("volumeOutput").innerHTML = scientificNotation(v) + " m<sup>3</sup>";
        document.getElementById("molOutput").innerHTML = scientificNotation(n) + " mol";
        document.getElementById("gasConstOut").innerHTML = r.toFixed(3) + "<span> m<sup>3</sup>⋅Pa⋅K<sup>-1</sup>⋅mol<sup>-1</sup></span>";
        document.getElementById("temperatureOutput").innerHTML = scientificNotation(t) + " K";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} p=\frac{nRT}{V} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (p1.checked && v1.checked && !n1.checked && t1.checked) {
        // Equation 2 n unknown
        n = p * v / (r * t);
        document.getElementById("inputMole").value = p.toFixed(3);
        document.getElementById("pressureOutput").innerHTML = scientificNotation(p) + " Pa";
        document.getElementById("volumeOutput").innerHTML = scientificNotation(v) + " m<sup>3</sup>";
        document.getElementById("molOutput").innerHTML = scientificNotation(n) + " mol";
        document.getElementById("gasConstOut").innerHTML = r.toFixed(3) + "<span> m<sup>3</sup>⋅Pa⋅K<sup>-1</sup>⋅mol<sup>-1</sup></span>";
        document.getElementById("temperatureOutput").innerHTML = scientificNotation(t) + " K";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} n=\frac{pV}{RT} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (p1.checked && !v1.checked && n1.checked && t1.checked) {
        // Equation 3 v unknown
        v = n * r * t / p;
        document.getElementById("inputVolume").value = v.toFixed(3);
        document.getElementById("pressureOutput").innerHTML = scientificNotation(p) + " Pa";
        document.getElementById("volumeOutput").innerHTML = scientificNotation(v) + " m<sup>3</sup>";
        document.getElementById("molOutput").innerHTML = scientificNotation(n) + " mol";
        document.getElementById("gasConstOut").innerHTML = r.toFixed(3) + "<span> m<sup>3</sup>⋅Pa⋅K<sup>-1</sup>⋅mol<sup>-1</sup></span>";
        document.getElementById("temperatureOutput").innerHTML = scientificNotation(t) + " K";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} V=\frac{nRT}{p} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }
    // Equation 4 T unknown
    else if (p1.checked && v1.checked && n1.checked && !t1.checked) {
        t = p * v / (n * r);
        document.getElementById("inputTemperature").value = t.toFixed(3);
        document.getElementById("pressureOutput").innerHTML = scientificNotation(p) + " Pa";
        document.getElementById("volumeOutput").innerHTML = scientificNotation(v) + " m<sup>3</sup>";
        document.getElementById("molOutput").innerHTML = scientificNotation(n) + " mol";
        document.getElementById("gasConstOut").innerHTML = r.toFixed(3) + "<span> m<sup>3</sup>⋅Pa⋅K<sup>-1</sup>⋅mol<sup>-1</sup></span>";
        document.getElementById("temperatureOutput").innerHTML = scientificNotation(t) + " K";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} T=\frac{pV}{nR} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }
    // Scroll to the results section
    document.querySelector('#results_table_1').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    // Table 2 - results all converted
    // Update pressure values
    document.getElementById("p1x").innerHTML = scientificNotation(p) + " Pa";
    document.getElementById("p2x").innerHTML = scientificNotation(p / 100000) + " bar";
    document.getElementById("p3x").innerHTML = scientificNotation(p / 101325) + " atm";
    document.getElementById("p4x").innerHTML = scientificNotation(p / 133.322) + " mmHg";
    document.getElementById("p5x").innerHTML = scientificNotation(p / 6894.76) + " PSI";
    document.getElementById("p6x").innerHTML = scientificNotation(p / 133.322) + " Torr";
    document.getElementById("p7x").innerHTML = scientificNotation(p / 100) + " hPa";
    document.getElementById("p8x").innerHTML = scientificNotation(p / 1000) + " kPa";
    document.getElementById("p9x").innerHTML = scientificNotation(p / 1000000) + " MPa";

    // Update volume values
    document.getElementById("v1x").innerHTML = scientificNotation(v) + " m³";
    document.getElementById("v2x").innerHTML = scientificNotation(v * 1000000) + " cm³";
    document.getElementById("v3x").innerHTML = scientificNotation(v * 1000) + " L";
    document.getElementById("v4x").innerHTML = scientificNotation(v * 1000000) + " mL";

    // Update moles values
    document.getElementById("n1x").innerHTML = scientificNotation(n) + " mol";
    document.getElementById("n2x").innerHTML = scientificNotation(n * 1000) + " mmol";
    document.getElementById("n3x").innerHTML = scientificNotation(n * 1000000) + " μmol";
    document.getElementById("n4x").innerHTML = scientificNotation(n * 1000000000) + " nmol";

    // Update temperature values
    document.getElementById("t1x").innerHTML = scientificNotation(t) + " K";
    document.getElementById("t2x").innerHTML = scientificNotation(t - 273.15) + " °C";
    document.getElementById("t3x").innerHTML = scientificNotation((t - 273.15) * 9 / 5 + 32) + " °F";
}

document.getElementById("resetButton1").addEventListener("click", resetForm);
document.getElementById("resetButton2").addEventListener("click", resetForm);

function resetForm() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });
    document.querySelectorAll('.maxAllow').forEach((input) => {
        input.value = '';
        input.disabled = true;
    });
}

// Set step, min and max for Pressure
const inputPressure = document.getElementById('inputPressure');
const unitsPressure = document.getElementById('unitsPressure');

unitsPressure.addEventListener('change', function() {
    const selectedValue = unitsPressure.value;
    let max = 10000000;
    let step = 0.0001;
    switch (selectedValue) {
        case 'pa':
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        case 'bar':
            max = max / 100000;
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        case 'atm':
            max = max / 100000;
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        case 'mmHg':
            max = max / 133
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        case 'torr':
            max = max / 130;
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        case 'psi':
            max = max / 1450;
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        case 'hpa':
            max = max / 10;
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        case 'kpa':
            max = max / 1000;
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        case 'mpa':
            max = max / 1000000;
            inputPressure.setAttribute('max', max);
            inputPressure.setAttribute('min', step);
            inputPressure.setAttribute('step', step);
            break;
        default:
            console.error('Invalid pressure unit');
    }
});

// Set step, min and max for Volume
const volumeInput = document.getElementById('inputVolume');
const volumeUnits = document.getElementById('unitsVolume');

volumeUnits.addEventListener('change', function() {
    switch (volumeUnits.value) {
        case 'm3':
            volumeInput.setAttribute('step', '0.001');
            volumeInput.setAttribute('min', '0');
            volumeInput.setAttribute('max', '1e9');
            break;
        case 'cm3':
            volumeInput.setAttribute('step', '0.000001');
            volumeInput.setAttribute('min', '0');
            volumeInput.setAttribute('max', '1e15');
            break;
        case 'L':
            volumeInput.setAttribute('step', '0.001');
            volumeInput.setAttribute('min', '0');
            volumeInput.setAttribute('max', '1e12');
            break;
        case 'mL':
            volumeInput.setAttribute('step', '0.000001');
            volumeInput.setAttribute('min', '0');
            volumeInput.setAttribute('max', '1e15');
            break;
        default:
            console.error('Invalid volume unit');
    }
});

// Set step, min and max for Moles
const inputMoles = document.getElementById('inputMole');
const moleUnits = document.getElementById('unitsMole');

moleUnits.addEventListener('change', function() {
    switch (moleUnits.value) {
        case 'mole':
            inputMoles.step = '1';
            inputMoles.min = '0';
            inputMoles.max = '1000000';
            break;
        case 'mmol':
            inputMoles.step = '0.001';
            inputMoles.min = '0';
            inputMoles.max = '1000000000';
            break;
        case 'μmol':
            inputMoles.step = '0.000001';
            inputMoles.min = '0';
            inputMoles.max = '1000000000000';
            break;
        case 'nmol':
            inputMoles.step = '0.000000001';
            inputMoles.min = '0';
            inputMoles.max = '1000000000000000';
            break;
        default:
            break;
    }
});

// Set step, min and max for Temperature
const inputTemperature = document.getElementById('inputTemperature');
const unitsTemperature = document.getElementById('unitsTemperature');

unitsTemperature.addEventListener('change', function() {
    switch (unitsTemperature.value) {
        case 'k':
            inputTemperature.step = '0.0001';
            inputTemperature.min = '0';
            inputTemperature.max = '5778';
            break;
        case 'c':
            inputTemperature.step = '0.0001';
            inputTemperature.min = '-273.15';
            inputTemperature.max = '5504.85';
            break;
        case 'f':
            inputTemperature.step = '0.0001';
            inputTemperature.min = '-459.67';
            inputTemperature.max = '9940.33';
            break;
        default:
            break;
    }
});