const sameLiquidCheckbox = document.getElementById("same_liquid");
const c1Input = document.getElementById("inputSpecificHeatCapacity1");
const c2Input = document.getElementById("inputSpecificHeatCapacity2");
const unitsC1Select = document.getElementById("unitsSpecificHeatCapacity1");
const unitsC2Select = document.getElementById("unitsSpecificHeatCapacity2");

sameLiquidCheckbox.addEventListener("change", function () {
    if (this.checked) {
        c1Input.disabled = true;
        c2Input.disabled = true;
        unitsC1Select.disabled = true;
        unitsC2Select.disabled = true;
        // Clear c1 and c2 inputs
        c1Input.value = "";
        c2Input.value = "";
    } else {
        c1Input.disabled = false;
        c2Input.disabled = false;
        unitsC1Select.disabled = false;
        unitsC2Select.disabled = false;
    }
});

window.addEventListener("reset", function () {
    c1Input.disabled = false;
    c2Input.disabled = false;
    unitsC1Select.disabled = false;
    unitsC2Select.disabled = false;
});

// Get all input fields
const inputs = document.querySelectorAll("input");

// Add event listeners to each input field
inputs.forEach((input) => {
    input.addEventListener("input", checkInputs);
});

// Enable/disable submit button based on whether all inputs are filled or not
function checkInputs() {
    let inputsFilled = true;

    // Check mass 1 input
    if (!document.getElementById("inputMass1").value) {
        inputsFilled = false;
    }

    // Check mass 2 input
    if (!document.getElementById("inputMass2").value) {
        inputsFilled = false;
    }

    // Check specific heat capacity 1 input if checkbox not checked
    if (!document.getElementById("same_liquid").checked && !document.getElementById("inputSpecificHeatCapacity1").value) {
        inputsFilled = false;
    }

    // Check specific heat capacity 2 input if checkbox not checked
    if (!document.getElementById("same_liquid").checked && !document.getElementById("inputSpecificHeatCapacity2").value) {
        inputsFilled = false;
    }

    // Check initial temperature 1 input
    if (!document.getElementById("inputTemperature1").value) {
        inputsFilled = false;
    }

    // Check initial temperature 2 input
    if (!document.getElementById("inputTemperature2").value) {
        inputsFilled = false;
    }

    // Enable/disable submit button based on whether all inputs are filled or not
    document.getElementById("submitButton").disabled = !inputsFilled;
}


// Check for which units of Specific Heat Capacity 1 are appropriate
const xunitsSpecificHeatCapacity = document.getElementById('unitsSpecificHeatCapacity1');
const xinputSpecificHeatCapacity = document.getElementById('inputSpecificHeatCapacity1');

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

// Check for which units of Specific Heat Capacity 2 are appropriate
const xunitsSpecificHeatCapacity2 = document.getElementById('unitsSpecificHeatCapacity2');
const xinputSpecificHeatCapacity2 = document.getElementById('inputSpecificHeatCapacity2');

xunitsSpecificHeatCapacity2.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
        case 'c82':
            xinputSpecificHeatCapacity2.value = 4186;
            break;
        case 'c92':
            xinputSpecificHeatCapacity2.value = 2440;
            break;
        case 'c102':
            xinputSpecificHeatCapacity2.value = 897;
            break;
        case 'c112':
            xinputSpecificHeatCapacity2.value = 385;
            break;
        case 'c122':
            xinputSpecificHeatCapacity2.value = 412;
            break;
        case 'c132':
        case 'c142':
            xinputSpecificHeatCapacity2.value = 129;
            break;
        case 'c152':
            xinputSpecificHeatCapacity2.value = 139;
            break;
        case 'c162':
            xinputSpecificHeatCapacity2.value = 1012;
            break;
        case 'c172':
            xinputSpecificHeatCapacity2.value = 1040;
            break;
        case 'c182':
            xinputSpecificHeatCapacity2.value = 2108;
            break;
        case 'c192':
            xinputSpecificHeatCapacity2.value = 790;
            break;
        case 'c202':
            xinputSpecificHeatCapacity2.value = 509.1;
            break;
        default:
            break;
    }

    if (selectedValue === 'c12') {
        xinputSpecificHeatCapacity2.placeholder = 'J kg⁻¹·K⁻¹';
    } else {
        xinputSpecificHeatCapacity2.placeholder = '';
    }

    xinputSpecificHeatCapacity2.disabled = (selectedValue !== 'c12' && selectedValue !== 'c22' && selectedValue !== 'c32' && selectedValue !== 'c42' && selectedValue !== 'c52' && selectedValue !== 'c62' && selectedValue !== 'c72');
});

document.getElementById("submitButton").addEventListener("click", function () {
    if (validateInputs()) {
        calculateFinalTemperature();
    }
});

function calculateFinalTemperature() {
    //User input values
    let m1 = parseFloat(document.getElementById("inputMass1").value);
    let c1 = parseFloat(document.getElementById("inputSpecificHeatCapacity1").value);
    let t1 = parseFloat(document.getElementById("inputTemperature1").value);
    let m2 = parseFloat(document.getElementById("inputMass2").value);
    let c2 = parseFloat(document.getElementById("inputSpecificHeatCapacity2").value);
    let t2 = parseFloat(document.getElementById("inputTemperature2").value);


    // *************************************************************** //
    // User input units - change everything to metric for calculations //
    // *************************************************************** //

    // Mass 1 //
    const mUnit = document.getElementById("unitsMass1").value;
    if (mUnit === "kg") {
        m1 = m1;
    }
    if (mUnit === "gm") {
        m1 = m1 / 1000;
    }
    if (mUnit === "mg") {
        m1 = m1 / 1000000;
    }
    if (mUnit === "μg") {
        m1 = m1 / 1000000000;
    }
    if (mUnit === "lb") {
        m1 = m1 * 0.45359237;
    }
    if (mUnit === "oz") {
        m1 = m1 * 0.02834952;
    }
    if (mUnit === "toz") {
        m1 = m1 * 0.0311034768;
    }
    if (isNaN(m1)) m1 = 0;

    // Mass 2 //
    const m2Unit = document.getElementById("unitsMass2").value;
    if (m2Unit === "kg2") {
        m2 = m2;
    }
    if (m2Unit === "gm2") {
        m2 = m2 / 1000;
    }
    if (m2Unit === "mg2") {
        m2 = m2 / 1000000;
    }
    if (m2Unit === "μg2") {
        m2 = m2 / 1000000000;
    }
    if (m2Unit === "lb2") {
        m2 = m2 * 0.45359237;
    }
    if (m2Unit === "oz2") {
        m2 = m2 * 0.02834952;
    }
    if (m2Unit === "toz2") {
        m2 = m2 * 0.0311034768;
    }
    if (isNaN(m2)) m2 = 0;

    // Specific Heat Capacity 1
    const cUnit = document.getElementById("unitsSpecificHeatCapacity1").value;
    if (cUnit === "c1") {
        c1 = c1;
    }
    if (cUnit === "c2") {
        c1 = c1 / 1000;
    }
    if (cUnit === "c4") {
        c1 = c1 * 4184;
    }
    if (cUnit === "c5") {
        c1 = c1 * 4184 / 1.8;
    }
    if (cUnit === "c6") {
        c1 = c1 * 1000;
    }
    if (cUnit === "c8") {
        c1 = 4186;
    }
    if (cUnit === "c9") {
        c1 = 2440;
    }
    if (cUnit === "c10") {
        c1 = 897;
    }
    if (cUnit === "c11") {
        c1 = 385;
    }
    if (cUnit === "c12") {
        c1 = 412;
    }
    if (cUnit === "c13") {
        c1 = 129;
    }
    if (cUnit === "c14") {
        c1 = 129;
    }
    if (cUnit === "c15") {
        c1 = 139.5;
    }
    if (cUnit === "c16") {
        c1 = 1012;
    }
    if (cUnit === "c17") {
        c1 = 1040;
    }
    if (cUnit === "c18") {
        c1 = 2108;
    }
    if (cUnit === "c19") {
        c1 = 790;
    }
    if (cUnit === "c20") {
        c1 = 509.1;
    }
    if (isNaN(c1)) c1 = 0;

    // Specific Heat Capacity 2
    const c2Unit = document.getElementById("unitsSpecificHeatCapacity2").value;
    if (c2Unit === "c12") {
        c2 = c2;
    }
    if (c2Unit === "c22") {
        c2 = c2 / 1000;
    }
    if (c2Unit === "c42") {
        c2 = c2 * 4184;
    }
    if (c2Unit === "c52") {
        c2 = c2 * 4184 / 1.8;
    }
    if (c2Unit === "c62") {
        c2 = c2 * 1000;
    }
    if (c2Unit === "c82") {
        c2 = 4186;
    }
    if (c2Unit === "c92") {
        c2 = 2440;
    }
    if (c2Unit === "c102") {
        c2 = 897;
    }
    if (c2Unit === "c112") {
        c2 = 385;
    }
    if (c2Unit === "c122") {
        c2 = 412;
    }
    if (c2Unit === "c132") {
        c2 = 129;
    }
    if (c2Unit === "c142") {
        c2 = 129;
    }
    if (c2Unit === "c152") {
        c2 = 139.5;
    }
    if (c2Unit === "c162") {
        c2 = 1012;
    }
    if (c2Unit === "c172") {
        c2 = 1040;
    }
    if (c2Unit === "c182") {
        c2 = 2108;
    }
    if (c2Unit === "c192") {
        c2 = 790;
    }
    if (c2Unit === "c202") {
        c2 = 509.1;
    }
    if (isNaN(c2)) c2 = 0;

    // Temperature 1
    const tUnit = document.getElementById("unitsTemperature1").value;
    if (tUnit === "k") {
        // no conversion necessary as the input is already in kelvin
    }
    if (tUnit === "c") {
        t1 = t1 + 273.15; // converting Celsius to Kelvin
    }
    if (tUnit === "f") {
        t1 = (t1 + 459.67) * (5 / 9); // converting Fahrenheit to Kelvin
    }

    // Temperature 2
    const t2Unit = document.getElementById("unitsTemperature2").value;
    if (t2Unit === "k2") {
        // no conversion necessary as the input is already in kelvin
    }
    if (t2Unit === "c2") {
        t2 = t2 + 273.15; // converting Celsius to Kelvin
    }
    if (t2Unit === "f2") {
        t2 = (t2 + 459.67) * (5 / 9); // converting Fahrenheit to Kelvin
    }

    //**************//
    // Calculations //
    //**************//
    // Calculate final temperature
    let tf;
    if (document.getElementById("same_liquid").checked) {
        tf = ((m1 * t1) + (m2 * t2)) / (m1 + m2);
    } else {
        tf = ((m1 * c1 * t1) + (m2 * c2 * t2)) / (m1 * c1 + m2 * c2);
    }

    // Output
    document.getElementById("massOutput").innerHTML = scientificNotation(m1 + m2) + " kg";
    document.getElementById("changeInTemperatureOutput").innerHTML = scientificNotation(tf - ((t1 + t2) / 2)) + " K";
    document.getElementById("temperatureOutput").innerHTML = scientificNotation(tf) + " K";
    document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} T_f = \frac{m_1c_1T_1 + m_2c_2T_2}{m_1c_1 + m_2c_2} \\ \notag \end{gather}$$</span>`;
    MathJax.typeset();

    // Update mass values for m1
    document.getElementById("m1x").innerHTML = scientificNotation(m1) + " kg";
    document.getElementById("m2x").innerHTML = scientificNotation(m1 * 1000) + " g";
    document.getElementById("m3x").innerHTML = scientificNotation(m1 * 1e+6) + " mg";
    document.getElementById("m4x").innerHTML = scientificNotation(m1 * 1e+9) + " μg";
    document.getElementById("m5x").innerHTML = scientificNotation(m1 * 2.20462) + " lb";
    document.getElementById("m6x").innerHTML = scientificNotation(m1 * 35.274) + " oz";
    document.getElementById("m7x").innerHTML = scientificNotation(m1 * 32.1507) + " t oz";

    // Update mass values for m2
    document.getElementById("m1x2").innerHTML = scientificNotation(m2) + " kg";
    document.getElementById("m2x2").innerHTML = scientificNotation(m2 * 1000) + " g";
    document.getElementById("m3x2").innerHTML = scientificNotation(m2 * 1e+6) + " mg";
    document.getElementById("m4x2").innerHTML = scientificNotation(m2 * 1e+9) + " μg";
    document.getElementById("m5x2").innerHTML = scientificNotation(m2 * 2.20462) + " lb";
    document.getElementById("m6x2").innerHTML = scientificNotation(m2 * 35.274) + " oz";
    document.getElementById("m7x2").innerHTML = scientificNotation(m2 * 32.1507) + " t oz";

    // Update heat capacity values for c1
    document.getElementById("c1x").innerHTML = scientificNotation(c1) + " J kg⁻¹·K⁻¹";
    document.getElementById("c3x").innerHTML = scientificNotation(c1 * 1000) + " J g⁻¹·K⁻¹";
    document.getElementById("c4x").innerHTML = scientificNotation(c1 * 0.238846) + " cal g⁻¹·K⁻¹";
    document.getElementById("c5x").innerHTML = scientificNotation(c1 * 0.000238846) + " Btu lb⁻¹·°F⁻¹";
    document.getElementById("c6x").innerHTML = scientificNotation(c1 * 0.001) + " kJ kg⁻¹·K⁻¹";

    // Update heat capacity values for c2
    document.getElementById("c1x2").innerHTML = scientificNotation(c2) + " J kg⁻¹·K⁻¹";
    document.getElementById("c3x2").innerHTML = scientificNotation(c2 * 1000) + " J g⁻¹·K⁻¹";
    document.getElementById("c4x2").innerHTML = scientificNotation(c2 * 0.238846) + " cal g⁻¹·K⁻¹";
    document.getElementById("c5x2").innerHTML = scientificNotation(c2 * 0.000238846) + " Btu lb⁻¹·°F⁻¹";
    document.getElementById("c6x2").innerHTML = scientificNotation(c2 * 0.001) + " kJ kg⁻¹·K⁻¹";

    // Update temperature values for T1
    document.getElementById("t1x").innerHTML = scientificNotation(t1) + " K";
    document.getElementById("t2x").innerHTML = (t1 - 273.15).toFixed(2) + " °C";
    document.getElementById("t3x").innerHTML = (t1 * 9 / 5 - 459.67).toFixed(2) + " °F";

    // Update temperature values for T2
    document.getElementById("t1x2").innerHTML = scientificNotation(t2) + " K";
    document.getElementById("t2x2").innerHTML = (t2 - 273.15).toFixed(2) + " °C";
    document.getElementById("t3x2").innerHTML = (t2 * 9 / 5 - 459.67).toFixed(2) + " °F";

    // Update temperature values for Tf
    document.getElementById("tf1x").innerHTML = scientificNotation(tf) + " K";
    document.getElementById("tf2x").innerHTML = (tf - 273.15).toFixed(2) + " °C";
    document.getElementById("tf3x").innerHTML = (tf * 9 / 5 - 459.67).toFixed(2) + " °F";

};

