// Check the users are clicking the right number of checkboxes
const $checkboxes = $(".ideal-check input[type=checkbox]");
const $submitButton = $("#submitButton");

$checkboxes.on("change", function () {
    const $checkedCheckboxes = $checkboxes.filter(":checked");

    // Disable unchecked checkboxes
    $checkboxes.filter(":not(:checked)").prop("disabled", $checkedCheckboxes.length >= 2);

    // Enable corresponding inputs for checked checkboxes
    const $checkedInputs = $checkedCheckboxes.map(function () {
        return $("[data-input='" + this.id + "']");
    });
    const $allInputs = $(".reset_form");
    $allInputs.prop("disabled", true);
    $checkedInputs.each(function () {
        $(this).prop("disabled", false);
    });

    // Disable submit button if less than 3 checkboxes are checked
    $submitButton.prop("disabled", $checkedCheckboxes.length < 2);

    // Change colour of checkbox icon when valid
    const $fontawesomeIcon = $(".fas.fa-check-square");
    if ($checkedCheckboxes.length === 2) {
        $fontawesomeIcon.removeClass("text-warning").addClass("text-success");
    } else {
        $fontawesomeIcon.removeClass("text-success").addClass("text-warning");
    }
});

//Equation Variables
//Checkbox selection
const v1 = document.querySelector("#velocity");
const d1 = document.querySelector("#distance");
const t1 = document.querySelector("#time");

document.getElementById("submitButton").addEventListener("click", function () {
    if (validateInputs()) {
        calculateIdealGas();
    }
});

function calculateIdealGas() {
    //User input values
    let v = parseFloat(document.getElementById("inputVelocity").value);
    let d = parseFloat(document.getElementById("inputDistance").value);
    let t = parseFloat(document.getElementById("inputTime").value);

    // *************************************************************** //
    // User input units - change everything to metric for calculations //
    // *************************************************************** //

    // Velocity //
    const vUnit = document.getElementById("unitsVelocity").value;
    if (vUnit === "ms") {
        v = v;
    }
    if (vUnit === "kmh") {
        v = v * 0.277778;
    }
    if (vUnit === "mph") {
        v = v * 0.44704;
    }
    if (vUnit === "fts") {
        v = v * 0.3048;
    }
    if (vUnit === "knots") {
        v = v * 0.514444;
    }
    if (vUnit === "kms") {
        v = v * 1000;
    }
    if (vUnit === "cms") {
        v = v * 0.01;
    }
    if (isNaN(v)) v = 0;

    // Distance //
    const dUnit = document.getElementById("unitsDistance").value;
    if (dUnit === "m") {
        d = d;
    }
    if (dUnit === "km") {
        d = d * 1000;
    }
    if (dUnit === "mi") {
        d = d * 1609.344;
    }
    if (dUnit === "ft") {
        d = d * 0.3048;
    }
    if (dUnit === "yd") {
        d = d * 0.9144;
    }
    if (dUnit === "nm") {
        d = d * 1852;
    }
    if (dUnit === "mm") {
        d = d / 1000;
    }
    if (dUnit === "cm") {
        d = d / 100;
    }
    if (dUnit === "in") {
        d = d * 0.0254;
    }
    if (isNaN(d)) d = 0;

    // Time //
    const tUnit = document.getElementById("unitsTime").value;
    if (tUnit === "s") {
        t = t;
    }
    if (tUnit === "min") {
        t = t * 60;
    }
    if (tUnit === "h") {
        t = t * 3600;
    }
    if (tUnit === "d") {
        t = t * 86400;
    }
    if (tUnit === "wk") {
        t = t * 604800;
    }
    if (tUnit === "mo") {
        t = t * 2629800;
    }
    if (tUnit === "yr") {
        t = t * 31557600;
    }
    if (tUnit === "ms") {
        t = t / 1000;
    }
    if (tUnit === "μs") {
        t = t / 1000000;
    }
    if (tUnit === "ns") {
        t = t / 1000000000;
    }
    if (isNaN(t)) t = 0;

    if (!v1.checked && d1.checked && t1.checked) {
        //Equation 1 V unknown
        v = d / t;
        document.getElementById("inputVelocity").value = v.toFixed(3);
        document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " m/s";
        document.getElementById("distanceOutput").innerHTML = scientificNotation(d) + " m";
        document.getElementById("timeOutput").innerHTML = scientificNotation(t) + " s";
        document.getElementById("equation").innerHTML = String.raw`<span>$$\begin{gather} v=\frac{d}{t} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    if (v1.checked && !d1.checked && t1.checked) {
        //Equation 2 d unknown
        d = v * t;
        document.getElementById("inputDistance").value = d.toFixed(3);
        document.getElementById("distanceOutput").innerHTML = scientificNotation(d) + " m";
        document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " ms<sup>-1</sup>";
        document.getElementById("timeOutput").innerHTML = scientificNotation(t) + " s";
        document.getElementById("equation").innerHTML = String.raw`<span>$$\begin{gather} d=vt \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    if (v1.checked && d1.checked && !t1.checked) {
        //Equation 3 t unknown
        t = d / v;
        document.getElementById("inputDistance").value = d.toFixed(3);
        document.getElementById("distanceOutput").innerHTML = scientificNotation(d) + " m";
        document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " ms<sup>-1</sup>";
        document.getElementById("timeOutput").innerHTML = scientificNotation(t) + " s";
        document.getElementById("equation").innerHTML = String.raw`<span>$$\begin{gather} t=\frac{d}{v} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }
    // Scroll to the results section
    document.querySelector('#results_table_1').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Table 2 - results all converted
    // Update velocity values
    document.getElementById("v1x").innerHTML = scientificNotation(v) + " ms<sup>-1</sup>";
    document.getElementById("v2x").innerHTML = scientificNotation(v * 3.6) + " kmh<sup>-1</sup>";
    document.getElementById("v3x").innerHTML = scientificNotation(v * 3.281) + " fts<sup>-1</sup>";
    document.getElementById("v4x").innerHTML = scientificNotation(v * 1.944) + " knots";
    document.getElementById("v5x").innerHTML = scientificNotation(v / 1000) + " kms<sup>-1</sup>";
    document.getElementById("v6x").innerHTML = scientificNotation(v * 100) + " cms<sup>-1</sup>";

    // Update distance values
    document.getElementById("d1x").innerHTML = scientificNotation(d) + " m";
    document.getElementById("d2x").innerHTML = scientificNotation(d / 1000) + " km";
    document.getElementById("d3x").innerHTML = scientificNotation(d / 1609.344) + " mi";
    document.getElementById("d4x").innerHTML = scientificNotation(d / 0.3048) + " ft";
    document.getElementById("d5x").innerHTML = scientificNotation(d / 0.9144) + " yd";
    document.getElementById("d6x").innerHTML = scientificNotation(d / 0.000000001) + " nm";
    document.getElementById("d7x").innerHTML = scientificNotation(d / 0.001) + " mm";
    document.getElementById("d8x").innerHTML = scientificNotation(d / 0.01) + " cm";
    document.getElementById("d9x").innerHTML = scientificNotation(d / 0.0254) + " in";
    document.getElementById("d10x").innerHTML = scientificNotation(d / 0.000001) + " μm";

    // Update time values
    document.getElementById("t1x").innerHTML = scientificNotation(t) + " s";
    document.getElementById("t3x").innerHTML = scientificNotation(t / 60) + " min";
    document.getElementById("t4x").innerHTML = scientificNotation(t / 3600) + " hr";
    document.getElementById("t5x").innerHTML = scientificNotation(t / 86400) + " days";
    document.getElementById("t6x").innerHTML = scientificNotation(t / 604800) + " weeks";
    document.getElementById("t7x").innerHTML = scientificNotation(t / 2.628e+6) + " months";
    document.getElementById("t8x").innerHTML = scientificNotation(t / 3.154e+7) + " years";
    document.getElementById("t9x").innerHTML = scientificNotation(t * 1000) + " ms";
    document.getElementById("t10x").innerHTML = scientificNotation(t * 1e+6) + " &mu;s";
    document.getElementById("t11x").innerHTML = scientificNotation(t * 1e+9) + " ns";

    document.getElementById("resetButton1").addEventListener("click", resetForm);
    document.getElementById("resetButton2").addEventListener("click", resetForm);
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

const inputVelocity = document.getElementById('inputVelocity');
const unitsVelocity = document.getElementById('unitsVelocity');

unitsVelocity.addEventListener('change', function () {
    const selectedValue = unitsVelocity.value;
    let max = 300000000;
    let min = -300000000;
    let step = 0.0001;
    switch (selectedValue) {
        case 'ms':
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'kms':
            max = max / 1000;
            min = min / 1000;
            step = 0.0001;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'fts':
            max = max * 3.280839895;
            min = min * 3.280839895;
            step = 0.0001;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'mph':
            max = max * 2.236936292;
            min = min * 2.236936292;
            step = 0.0001;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'kmh':
            max = max * 3.6;
            min = min * 3.6;
            step = 0.0001;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'cms':
            max = max / 100;
            min = min / 100;
            step = 0.01;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        default:
            console.error('Invalid velocity unit');
    }
});

const inputDistance = document.getElementById('inputDistance');
const unitsDistance = document.getElementById('unitsDistance');

unitsDistance.addEventListener('change', function () {
    const selectedValue = unitsDistance.value;
    let max = 8.8e26; // 1 billion meters
    let min = -8.8e26; // -1 billion meters
    let step = 0.000000001;
    const meterToUnit = {
        m: 1,
        km: 1e3,
        mi: 1609.344,
        ft: 0.3048,
        yd: 0.9144,
        nm: 0.000000001,
        μm: 0.000001,
        mm: 0.001,
        cm: 0.01,
        in: 0.0254
    };
    switch (selectedValue) {
        case 'm':
            inputDistance.setAttribute('max', max);
            inputDistance.setAttribute('min', min);
            inputDistance.setAttribute('step', step);
            break;
        case 'km':
        case 'mi':
        case 'nm':
        case 'ft':
        case 'yd':
        case 'μm':
        case 'mm':
        case 'cm':
        case 'in':
            max = max / meterToUnit[selectedValue];
            min = min / meterToUnit[selectedValue];
            step = step;
            inputDistance.setAttribute('max', max);
            inputDistance.setAttribute('min', min);
            inputDistance.setAttribute('step', step);
            break;
        default:
            console.error('Invalid distance unit');
    }
});

const inputTime = document.getElementById('inputTime');
const unitsTime = document.getElementById('unitsTime');

unitsTime.addEventListener('change', function () {
    const selectedValue = unitsTime.value;
    let max = 1e15; // 1 quadrillion seconds
    let min = 1e-9; // 1 nanosecond
    let step = 1e-9;
    const secToUnit = {
        s: 1,
        min: 60,
        h: 3600,
        d: 86400,
        wk: 604800,
        mo: 2.628e+6, // average number of seconds in a month
        yr: 3.154e+7, // average number of seconds in a year
        ms: 0.001,
        μs: 1e-6,
        ns: 1e-9
    };
    switch (selectedValue) {
        case 's':
            inputTime.setAttribute('max', max);
            inputTime.setAttribute('min', min);
            inputTime.setAttribute('step', step);
            break;
        case 'min':
        case 'h':
        case 'd':
        case 'wk':
        case 'mo':
        case 'yr':
            max = max / secToUnit[selectedValue];
            min = min / secToUnit[selectedValue];
            step = 1e-6;
            inputTime.setAttribute('max', max);
            inputTime.setAttribute('min', min);
            inputTime.setAttribute('step', step);
            break;
        case 'ms':
        case 'μs':
        case 'ns':
            max = max / secToUnit[selectedValue];
            min = min / secToUnit[selectedValue];
            step = 1e-12;
            inputTime.setAttribute('max', max);
            inputTime.setAttribute('min', min);
            inputTime.setAttribute('step', step);
            break;
        default:
            console.error('Invalid time unit');
    }
});
