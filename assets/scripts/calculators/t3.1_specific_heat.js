// Check the users are clicking the right number of checkboxes
const $checkboxes = $(".ideal-check input[type=checkbox]");
const $submitButton = $("#submitButton");

$checkboxes.on("change", function () {
    const $checkedCheckboxes = $checkboxes.filter(":checked");

    // Disable unchecked checkboxes
    $checkboxes.filter(":not(:checked)").prop("disabled", $checkedCheckboxes.length >= 3);

    // Enable corresponding inputs for checked checkboxes
    const $checkedInputs = $checkedCheckboxes.map(function () {
        return $("[data-input='" + this.id + "']");
    });
    const $allInputs = $(".reset_form");
    $allInputs.prop("disabled", true);
    $checkedInputs.each(function () {
        $(this).prop("disabled", false);
        $(this).siblings("select").prop("disabled", false);
    });

    // Disable corresponding unit select options for unchecked checkboxes
    const $uncheckedCheckboxes = $checkboxes.filter(":not(:checked)");
    $uncheckedCheckboxes.each(function () {
        const $uncheckedInputs = $("[data-input='" + this.id + "']");
        $uncheckedInputs.prop("disabled", true);
        $uncheckedInputs.siblings("select").prop("disabled", true);
        $uncheckedInputs.val(""); // clear the input box
        $uncheckedInputs.siblings("select").prop("selectedIndex", 0); // reset the select option to default
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


const xunitsSpecificHeatCapacity = document.getElementById('unitsSpecificHeatCapacity');
const xinputSpecificHeatCapacity = document.getElementById('inputSpecificHeatCapacity');

xunitsSpecificHeatCapacity.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
        case 'c8':
            xinputSpecificHeatCapacity.value = 4186;
            break;
        case 'c9':
            xinputSpecificHeatCapacity.value = 2440;
            break;
        case 'c10':
            xinputSpecificHeatCapacity.value = 897;
            break;
        case 'c11':
            xinputSpecificHeatCapacity.value = 385;
            break;
        case 'c12':
            xinputSpecificHeatCapacity.value = 412;
            break;
        case 'c13':
        case 'c14':
            xinputSpecificHeatCapacity.value = 129;
            break;
        case 'c15':
            xinputSpecificHeatCapacity.value = 139;
            break;
        case 'c16':
            xinputSpecificHeatCapacity.value = 1012;
            break;
        case 'c17':
            xinputSpecificHeatCapacity.value = 1040;
            break;
        case 'c18':
            xinputSpecificHeatCapacity.value = 2108;
            break;
        case 'c19':
            xinputSpecificHeatCapacity.value = 790;
            break;
        case 'c20':
            xinputSpecificHeatCapacity.value = 509.1;
            break;
        default:
            break;
    }

    if (selectedValue === 'c1') {
        xinputSpecificHeatCapacity.placeholder = 'J kg⁻¹·K⁻¹';
    } else {
        xinputSpecificHeatCapacity.placeholder = '';
    }

   xinputSpecificHeatCapacity.disabled = (selectedValue !== 'c1' && selectedValue !== 'c2' && selectedValue !== 'c3' && selectedValue !== 'c4' && selectedValue !== 'c5' && selectedValue !== 'c6' && selectedValue !== 'c7');
});



//Equation Variables
//Checkbox selection
const q1 = document.querySelector("#heat");
const m1 = document.querySelector("#mass");
const c1 = document.querySelector("#specificHeatCapacity");
const t1 = document.querySelector("#changeInTemperature");

document.getElementById("submitButton").addEventListener("click", function () {
    if (validateInputs()) {
        calculateIdealGas();
    }
});

function calculateIdealGas() {
    //User input values
    let q = parseFloat(document.getElementById("inputHeat").value);
    let m = parseFloat(document.getElementById("inputMass").value);
    let c = parseFloat(document.getElementById("inputSpecificHeatCapacity").value);
    let t = parseFloat(document.getElementById("inputChangeInTemperature").value);

    // *************************************************************** //
    // User input units - change everything to metric for calculations //
    // *************************************************************** //

    // Heat //
    const heatUnit = document.getElementById("unitsHeat").value;
    if (heatUnit === "j") {
        heat = heat;
    }
    if (heatUnit === "cal") {
        heat = heat * 4.184;
    }
    if (heatUnit === "kj") {
        heat = heat / 1000;
    }
    if (heatUnit === "kcal") {
        heat = heat * 4.184 / 1000;
    }
    if (heatUnit === "btu") {
        heat = heat * 1055.056;
    }
    if (heatUnit === "ev") {
        heat = heat * 6.24150913e+18;
    }
    if (heatUnit === "mj") {
        heat = heat / 1000000;
    }
    if (isNaN(heat)) heat = 0;

    // Mass //
    const mUnit = document.getElementById("unitsMass").value;
    if (mUnit === "kg") {
        m = m;
    }
    if (mUnit === "gm") {
        m = m / 1000;
    }
    if (mUnit === "mg") {
        m = m / 1000000;
    }
    if (mUnit === "μg") {
        m = m / 1000000000;
    }
    if (mUnit === "lb") {
        m = m * 0.45359237;
    }
    if (mUnit === "oz") {
        m = m * 0.02834952;
    }
    if (mUnit === "toz") {
        m = m * 0.0311034768;
    }
    if (isNaN(m)) m = 0;

    // Specific Heat Capacity
    const cUnit = document.getElementById("unitsSpecificHeatCapacity").value;
    if (cUnit === "c1") {
        c = c;
    }
    if (cUnit === "c2") {
        c = c / 1000;
    }
    if (cUnit === "c4") {
        c = c * 4184;
    }
    if (cUnit === "c5") {
        c = c * 4184 / 1.8;
    }
    if (cUnit === "c6") {
        c = c * 1000;
    }
    if (cUnit === "c8") {
        c = 4186;
    }
    if (cUnit === "c9") {
        c = 2440;
    }
    if (cUnit === "c10") {
        c = 897;
    }
    if (cUnit === "c11") {
        c = 385;
    }
    if (cUnit === "c12") {
        c = 412;
    }
    if (cUnit === "c13") {
        c = 129;
    }
    if (cUnit === "c14") {
        c = 129;
    }
    if (cUnit === "c15") {
        c = 139.5;
    }
    if (cUnit === "c16") {
        c = 1012;
    }
    if (cUnit === "c17") {
        c = 1040;
    }
    if (cUnit === "c18") {
        c = 2108;
    }
    if (cUnit === "c19") {
        c = 790;
    }
    if (cUnit === "c20") {
        c = 509.1;
    }
    if (isNaN(c)) c = 0;

    // Temperature
    const tUnit = document.getElementById("unitsChangeInTemperature").value;
    if (tUnit === "k") {
        // no conversion necessary as the input is already in kelvin
    }
    if (tUnit === "c") {
        t = t + 273.15; // converting Celsius to Kelvin
    }
    if (tUnit === "f") {
        t = (t + 459.67) * (5 / 9); // converting Fahrenheit to Kelvin
    }

    //**************//
    // Calculations //
    //**************//
    if (!q1.checked && m1.checked && c1.checked && t1.checked) {
        //Equation 1 q unknown
        q = m * c * t;
        document.getElementById("inputHeat").value = q.toFixed(3);
        document.getElementById("massOutput").innerHTML = scientificNotation(m) + " kg";
        document.getElementById("heatOutput").innerHTML = scientificNotation(q) + " J";
        document.getElementById("specificHeatCapacityOutput").innerHTML = scientificNotation(c) + " J kg⁻¹ K⁻¹";
        document.getElementById("changeInTemperatureOutput").innerHTML = scientificNotation(t) + " K";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} q=mc\Delta T \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    // Equation 2 m unknown
    if (q1.checked && !m1.checked && c1.checked && t1.checked) {
        m = q / (c * t);
        document.getElementById("inputMass").value = m.toFixed(3);
        document.getElementById("massOutput").innerHTML = scientificNotation(m) + " kg";
        document.getElementById("heatOutput").innerHTML = scientificNotation(q) + " J";
        document.getElementById("specificHeatCapacityOutput").innerHTML = scientificNotation(c) + " J kg⁻¹ K⁻¹";
        document.getElementById("changeInTemperatureOutput").innerHTML = scientificNotation(t) + " K";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} m = \frac{q}{c \cdot \Delta T} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    //Equation 3 c unknown
    if (q1.checked && m1.checked && !c1.checked && t1.checked) {
        c = q / (m * t);
        document.getElementById("inputSpecificHeatCapacity").value = c.toFixed(3);
        document.getElementById("massOutput").innerHTML = scientificNotation(m) + " kg";
        document.getElementById("heatOutput").innerHTML = scientificNotation(q) + " J";
        document.getElementById("specificHeatCapacityOutput").innerHTML = scientificNotation(c) + " J kg⁻¹ K⁻¹";
        document.getElementById("changeInTemperatureOutput").innerHTML = scientificNotation(t) + " K";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} c = \frac{q}{m \cdot \Delta T} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    //Equation 4 t unknown
    if (q1.checked && m1.checked && c1.checked && !t1.checked) {
        t = q / (m * c);
        document.getElementById("inputChangeInTemperature").value = t.toFixed(3);
        document.getElementById("massOutput").innerHTML = scientificNotation(m) + " kg";
        document.getElementById("heatOutput").innerHTML = scientificNotation(q) + " J";
        document.getElementById("specificHeatCapacityOutput").innerHTML = scientificNotation(c) + " J kg⁻¹ K⁻¹";
        document.getElementById("changeInTemperatureOutput").innerHTML = scientificNotation(t) + " K";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} \Delta T = \frac{q}{m \cdot c} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    // Scroll to the results section
    document.querySelector('#results_table_1').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Table 2 - results all converted
    // Update heat values
    document.getElementById("q1x").innerHTML = scientificNotation(q) + " J";
    document.getElementById("q2x").innerHTML = scientificNotation(q / 4.184) + " cal";
    document.getElementById("q3x").innerHTML = scientificNotation(q / 1000) + " kJ";
    document.getElementById("q4x").innerHTML = scientificNotation(q / 4184) + " kcal";
    document.getElementById("q5x").innerHTML = scientificNotation(q / 1055) + " BTUs";
    document.getElementById("q6x").innerHTML = scientificNotation(q / 1.602e-19) + " eV";
    document.getElementById("q7x").innerHTML = scientificNotation(q / 1e6) + " MJ";

    // Update mass values
    document.getElementById("m1x").innerHTML = scientificNotation(m) + " kg";
    document.getElementById("m2x").innerHTML = scientificNotation(m * 1000) + " g";
    document.getElementById("m3x").innerHTML = scientificNotation(m * 1e+6) + " mg";
    document.getElementById("m4x").innerHTML = scientificNotation(m * 1e+9) + " μg";
    document.getElementById("m5x").innerHTML = scientificNotation(m * 2.20462) + " lb";
    document.getElementById("m6x").innerHTML = scientificNotation(m * 35.274) + " oz";
    document.getElementById("m7x").innerHTML = scientificNotation(m * 32.1507) + " t oz";

    // Update specific heat values
    document.getElementById("c1x").innerHTML = scientificNotation(c) + " J kg<sup>-1</sup> K<sup>-1</sup>";
    document.getElementById("c2x").innerHTML = scientificNotation(c / 1000) + " J g<sup>-1</sup> K<sup>-1</sup>";
    document.getElementById("c4x").innerHTML = scientificNotation(c / 4184) + " cal g<sup>-1</sup> K<sup>-1</sup>";
    document.getElementById("c5x").innerHTML = scientificNotation(c / 2326) + " Btu lb<sup>-1</sup> °F<sup>-1</sup>";
    document.getElementById("c6x").innerHTML = scientificNotation(c / 1000) + " kJ kg<sup>-1</sup> K<sup>-1</sup>";

    // Update temperature values
    document.getElementById("dtx").innerHTML = scientificNotation(t) + " K";
    document.getElementById("dty").innerHTML = scientificNotation(t - 273.15) + " °C";
    document.getElementById("dtz").innerHTML = scientificNotation((t - 273.15) * 9 / 5 + 32) + " °F";
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

const inputHeat = document.getElementById('inputHeat');
const unitsHeat = document.getElementById('unitsHeat');

unitsHeat.addEventListener('change', function () {
    const selectedValue = unitsHeat.value;
    let max = 1e13;
    let min = 1.6e-19;
    let step = min;
    switch (selectedValue) {
        case 'j':
            inputHeat.setAttribute('max', max.toExponential(4));
            inputHeat.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'cal':
            max = max / 4.184;
            min = min / 4.184;
            inputHeat.setAttribute('max', max.toExponential(4));
            inputHeat.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'kj':
            max = max / 1000;
            min = min / 1000;
            inputHeat.setAttribute('max', max.toExponential(4));
            inputHeat.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'kcal':
            max = max / 4184;
            min = min / 4184;
            inputHeat.setAttribute('max', max.toExponential(4));
            inputHeat.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'btu':
            max = max / 1055.06;
            min = min / 1055.06;
            inputHeat.setAttribute('max', max.toExponential(4));
            inputHeat.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'ev':
            max = max / 1.60218e-19;
            min = min / 1.60218e-19;
            inputHeat.setAttribute('max', max.toExponential(4));
            inputHeat.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'mj':
            max = max / 1e6;
            min = min / 1e6;
            inputHeat.setAttribute('max', max.toExponential(4));
            inputHeat.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        default:
            console.error('Invalid heat unit');
    }
});

const inputMass = document.getElementById('inputMass');
const unitsMass = document.getElementById('unitsMass');

unitsMass.addEventListener('change', function () {
    const selectedValue = unitsMass.value;
    let max = 1e13;
    let min = 1e-10;
    let step = 1e-10;
    switch (selectedValue) {
        case 'kg':
            inputMass.setAttribute('max', max.toExponential(4));
            inputMass.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'gm':
            max = max / 1000;
            min = min / 1000;
            step = step / 1000;
            inputMass.setAttribute('max', max.toExponential(4));
            inputMass.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'mg':
            max = max / 1e6;
            min = min / 1e6;
            step = step / 1e6;
            inputMass.setAttribute('max', max.toExponential(4));
            inputMass.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'μg':
            max = max / 1e9;
            min = min / 1e9;
            step = step / 1e9;
            inputMass.setAttribute('max', max.toExponential(4));
            inputMass.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'lb':
            max = max / 2.20462;
            min = min / 2.20462;
            step = step / 2.20462;
            inputMass.setAttribute('max', max.toExponential(4));
            inputMass.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'oz':
            max = max / 35.274;
            min = min / 35.274;
            step = step / 35.274;
            inputMass.setAttribute('max', max.toExponential(4));
            inputMass.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        case 'toz':
            max = max / 32.1507;
            min = min / 32.1507;
            step = step / 32.1507;
            inputMass.setAttribute('max', max.toExponential(4));
            inputMass.setAttribute('min', min.toExponential(4));
            inputMass.setAttribute('step', step.toExponential(4));
            break;
        default:
            console.error('Invalid mass unit');
    }
});

const inputSpecificHeatCapacity = document.getElementById('inputSpecificHeatCapacity');
const unitsSpecificHeatCapacity = document.getElementById('unitsSpecificHeatCapacity');

unitsSpecificHeatCapacity.addEventListener('change', function () {
    const selectedValue = unitsSpecificHeatCapacity.value;
    let max = 5000000;
    let min = 0.000000000001;
    let step = 0.000000000001;

    switch (selectedValue) {
        case 'c2':
        case 'c4':
            max = 5000;
            min = 0.0001;
            step = 0.0001;
            break;
        case 'c5':
            max = 10000;
            min = 0.001;
            step = 0.001;
            break;
        case 'c6':
            max = 5000;
            min = 0.0001;
            step = 0.0001;
            break;
        case 'c8':
        case 'c9':
        case 'c10':
        case 'c11':
        case 'c12':
        case 'c13':
        case 'c14':
        case 'c15':
        case 'c16':
        case 'c17':
        case 'c18':
        case 'c19':
        case 'c20':
            max = 5000;
            min = 0.0001;
            step = 0.0001;
            break;
        default:
            console.error('Invalid specific heat capacity unit');
            break;
    }

    inputSpecificHeatCapacity.setAttribute('max', max);
    inputSpecificHeatCapacity.setAttribute('min', min);
    inputSpecificHeatCapacity.setAttribute('step', step);
});

// Set step, min and max for Change in Temperature
const inputChangeInTemperature = document.getElementById('inputChangeInTemperature');
const unitsChangeInTemperature = document.getElementById('unitsChangeInTemperature');

unitsChangeInTemperature.addEventListener('change', function () {
    const selectedValue = unitsChangeInTemperature.value;
    let max = 6700;
    let step = 0.0001;
    switch (selectedValue) {
        case 'k':
            inputChangeInTemperature.setAttribute('max', max);
            inputChangeInTemperature.setAttribute('min', step);
            inputChangeInTemperature.setAttribute('step', step);
            break;
        case 'c':
            max = max - 273.15;
            step = 0.0001;
            inputChangeInTemperature.setAttribute('max', max);
            inputChangeInTemperature.setAttribute('min', step);
            inputChangeInTemperature.setAttribute('step', step);
            break;
        case 'f':
            max = (max - 273.15) * 1.8 + 32;
            step = 0.0001;
            inputChangeInTemperature.setAttribute('max', max);
            inputChangeInTemperature.setAttribute('min', step);
            inputChangeInTemperature.setAttribute('step', step);
            break;
        default:
            console.error('Invalid temperature unit');
    }
});
