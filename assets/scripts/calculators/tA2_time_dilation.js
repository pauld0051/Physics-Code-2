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
    const $uncheckedInputs = $("[data-input]").not($checkedInputs);
    $uncheckedInputs.prop("disabled", true);
    $checkedInputs.each(function () {
        $(this).prop("disabled", false);
        $(this).siblings("select").prop("disabled", false);
    });

    // Reset inputs and select options for unchecked checkboxes
    const $uncheckedCheckboxes = $checkboxes.filter(":not(:checked)");
    $uncheckedCheckboxes.each(function () {
        const $uncheckedInputs = $("[data-input='" + this.id + "']");
        if ($uncheckedInputs.is(":input")) {
            $uncheckedInputs.val("").attr("placeholder", $uncheckedInputs.attr("placeholder"));
        }
        if ($uncheckedInputs.is("select")) {
            $uncheckedInputs.prop('selectedIndex', 0); // reset to default selected option
            $uncheckedInputs.siblings(".form-select").find("option[selected]").prop("selected", true); // reset the selected option
            $uncheckedInputs.siblings(".form-select").find("option[selected]").siblings().show(); // show the placeholder
        }
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
const t1 = document.querySelector("#time");
const pt1 = document.querySelector("#properTime");
// Define speed of light
const c = 1;

document.getElementById("submitButton").addEventListener("click", function () {
    if (validateInputs()) {
        calculateGamma();
    }
});

function calculateGamma() {
    //User input values
    let v = parseFloat(document.getElementById("inputVelocity").value);
    let t = parseFloat(document.getElementById("inputTime").value);
    let pt = parseFloat(document.getElementById("inputProperTime").value);

    // *************************************************************** //
    // User input units - change everything to metric for calculations //
    // *************************************************************** //

    // Velocity //
    const vUnit = document.getElementById("unitsVelocity").value;
    const c1 = 299792458; // Speed of light in meters per second

    if (vUnit === "c") {
        v = v;
    }
    if (vUnit === "ms") {
        v = v / c1;
    }
    if (vUnit === "kmh") {
        v = (v * 1000 / 3600) / c1;
    }
    if (vUnit === "mph") {
        v = (v * 1609.34 / 3600) / c1;
    }
    if (vUnit === "kms") {
        v = (v * 1000) / c1;
    }
    if (isNaN(v)) v = 0;

    // Dilated Time //
    const tUnit = document.getElementById("unitsTime").value;
    if (tUnit === "yr") {
        t = t;
    }
    if (tUnit === "min") {
        t = t / (60 * 60 * 24 * 365.25);
    }
    if (tUnit === "h") {
        t = t / (24 * 365.25);
    }
    if (tUnit === "d") {
        t = t / 365.25;
    }
    if (tUnit === "wk") {
        t = t / 52.1775;
    }
    if (tUnit === "mo") {
        t = t / 12;
    }
    if (tUnit === "s") {
        t = t / (60 * 60 * 24 * 365.25);
    }
    if (tUnit === "ms") {
        t = t / (1000 * 60 * 60 * 24 * 365.25);
    }
    if (tUnit === "μs") {
        t = t / (1000000 * 60 * 60 * 24 * 365.25);
    }
    if (tUnit === "ns") {
        t = t / (1000000000 * 60 * 60 * 24 * 365.25);
    }
    if (isNaN(t)) t = 0;

    // Proper Time //
    const ptUnit = document.getElementById("unitsProperTime").value;
    if (ptUnit === "yrp") {
        pt = pt;
    }
    if (ptUnit === "minp") {
        pt = pt / (60 * 60 * 24 * 365.25);
    }
    if (ptUnit === "hp") {
        pt = pt / (24 * 365.25);
    }
    if (ptUnit === "dp") {
        pt = pt / 365.25;
    }
    if (ptUnit === "wkp") {
        pt = pt / 52.1775;
    }
    if (ptUnit === "mop") {
        pt = pt / 12;
    }
    if (ptUnit === "sp") {
        pt = pt / (60 * 60 * 24 * 365.25);
    }
    if (ptUnit === "msp") {
        pt = pt / (1000 * 60 * 60 * 24 * 365.25);
    }
    if (ptUnit === "μsp") {
        pt = pt / (1000000 * 60 * 60 * 24 * 365.25);
    }
    if (ptUnit === "nsp") {
        pt = pt / (1000000000 * 60 * 60 * 24 * 365.25);
    }
    if (isNaN(pt)) pt = 0;

    if (!v1.checked && t1.checked && pt1.checked) {
        if (t < pt) {
            document.getElementById("velocityOutput").innerHTML = "Dilated time (Δt) cannot be less than the proper time (Δt₀). Please check your input values.";
            document.getElementById("inputVelocity").value = "";
            document.getElementById("timeOutput").innerHTML = "";
            document.getElementById("properTimeOutput").innerHTML = "";
            document.getElementById("gammaOutput").innerHTML = "";
            document.getElementById("equation").innerHTML = "";
            MathJax.typeset();
        } else {
            // Equation 1 v unknown
            v = Math.sqrt(1 - Math.pow(pt / t, 2));
            g = 1 / Math.sqrt(1 - Math.pow(v, 2));
            if (v > 1) {
                document.getElementById("velocityOutput").innerHTML = "greater than the speed of light... Impossible.";
            } else {
                document.getElementById("inputVelocity").value = v.toFixed(3);
                document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
                document.getElementById("timeOutput").innerHTML = scientificNotation(t) + " yr";
                document.getElementById("properTimeOutput").innerHTML = scientificNotation(pt) + " yr";
                document.getElementById("gammaOutput").innerHTML = g.toFixed(6);
            }
            document.getElementById("equation").innerHTML = String.raw `<span>$$v = \sqrt{1 - \left(\frac{\Delta t_0}{\Delta t}\right)^2}$$</span>`;
            MathJax.typeset();
        }
    }
    if (v1.checked && !t1.checked && pt1.checked) {
        // Equation 2 t unknown
        g = 1 / Math.sqrt(1 - Math.pow(v, 2));
        t = pt / Math.sqrt(1 - Math.pow(v, 2));

        if (v > 1) {
            document.getElementById("velocityOutput").innerHTML = "greater than the speed of light... Impossible.";
        } else {
            document.getElementById("inputTime").value = t.toFixed(3);
            document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
            document.getElementById("timeOutput").innerHTML = scientificNotation(t) + " yr";
            document.getElementById("properTimeOutput").innerHTML = scientificNotation(pt) + " yr";
            document.getElementById("gammaOutput").innerHTML = g.toFixed(6);
        }
        document.getElementById("equation").innerHTML = String.raw `<span>$$\Delta t = \frac{\Delta t_0}{\sqrt{1 - \left(\frac{v}{c}\right)^2}}$$</span>`;
        MathJax.typeset();
    }
    if (v1.checked && t1.checked && !pt1.checked) {
        // Equation 3 pt unknown
        g = 1 / Math.sqrt(1 - Math.pow(v, 2));
        pt = t * Math.sqrt(1 - Math.pow(v, 2));

        if (v > 1) {
            document.getElementById("velocityOutput").innerHTML = "greater than the speed of light... Impossible.";
        } else {
            document.getElementById("inputProperTime").value = pt.toFixed(3);
            document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
            document.getElementById("timeOutput").innerHTML = scientificNotation(t) + " yr";
            document.getElementById("properTimeOutput").innerHTML = scientificNotation(pt) + " yr";
            document.getElementById("gammaOutput").innerHTML = g.toFixed(6);
        }
        document.getElementById("equation").innerHTML = String.raw `<span>$$\Delta t_0 = \Delta t \cdot \sqrt{1 - \left(\frac{v}{c}\right)^2}$$</span>`;
        MathJax.typeset();
    }
    // Scroll to the results section
    document.querySelector('#results_table_1').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    // Table 2 - results all converted
    // Dilated Time
    document.getElementById("t1x").innerHTML = scientificNotation(t * 31536000) + " s";
    document.getElementById("t3x").innerHTML = scientificNotation(t * 525600) + " min";
    document.getElementById("t4x").innerHTML = scientificNotation(t * 8760) + " hr";
    document.getElementById("t5x").innerHTML = scientificNotation(t * 365) + " days";
    document.getElementById("t6x").innerHTML = scientificNotation(t * 52.1429) + " weeks";
    document.getElementById("t7x").innerHTML = scientificNotation(t / 12) + " months";
    document.getElementById("t8x").innerHTML = scientificNotation(t) + " years";
    document.getElementById("t9x").innerHTML = scientificNotation(t * 31536000000) + " ms";
    document.getElementById("t10x").innerHTML = scientificNotation(t * 31536000000000) + " &mu;s";
    document.getElementById("t11x").innerHTML = scientificNotation(t * 31536000000000000) + " ns";

    // Proper time
    document.getElementById("pt1x").innerHTML = scientificNotation(pt * 31536000) + " s";
    document.getElementById("pt3x").innerHTML = scientificNotation(pt * 525600) + " min";
    document.getElementById("pt4x").innerHTML = scientificNotation(pt * 8760) + " hr";
    document.getElementById("pt5x").innerHTML = scientificNotation(pt * 365) + " days";
    document.getElementById("pt6x").innerHTML = scientificNotation(pt * 52.1429) + " weeks";
    document.getElementById("pt7x").innerHTML = scientificNotation(pt / 12) + " months";
    document.getElementById("pt8x").innerHTML = scientificNotation(pt) + " years";
    document.getElementById("pt9x").innerHTML = scientificNotation(pt * 31536000000) + " ms";
    document.getElementById("pt10x").innerHTML = scientificNotation(pt * 31536000000000) + " &mu;s";
    document.getElementById("pt11x").innerHTML = scientificNotation(pt * 31536000000000000) + " ns";

    // Update velocity values
    if (v > 1) {
        document.getElementById("v0x").innerHTML = "greater than the speed of light... Impossible.";
        document.getElementById("v1x").innerHTML = "&nbsp;";
        document.getElementById("v2x").innerHTML = "&nbsp;";
        document.getElementById("v3x").innerHTML = "&nbsp;";
        document.getElementById("v4x").innerHTML = "&nbsp;";
        document.getElementById("v5x").innerHTML = "&nbsp;";
        document.getElementById("v6x").innerHTML = "&nbsp;";
    } else {
        const v_ms = v * 299792458;
        const v_kmh = v_ms * 3.6;
        const v_fts = v_ms * 3.281;
        const v_knots = v_ms * 1.944;
        const v_kms = v_ms / 1000;
        const v_cms = v_ms * 100;

        document.getElementById("v0x").innerHTML = scientificNotation(v) + " c";
        document.getElementById("v1x").innerHTML = scientificNotation(v_ms) + " ms<sup>-1</sup>";
        document.getElementById("v2x").innerHTML = scientificNotation(v_kmh) + " kmh<sup>-1</sup>";
        document.getElementById("v3x").innerHTML = scientificNotation(v_fts) + " fts<sup>-1</sup>";
        document.getElementById("v4x").innerHTML = scientificNotation(v_knots) + " knots";
        document.getElementById("v5x").innerHTML = scientificNotation(v_kms) + " kms<sup>-1</sup>";
        document.getElementById("v6x").innerHTML = scientificNotation(v_cms) + " cms<sup>-1</sup>";
    }

    // Update gamma values
    document.getElementById("g1x").innerHTML = g.toFixed(8);
}

const unitsVelocity = document.getElementById('unitsVelocity');

unitsVelocity.addEventListener('change', function () {
    const selectedValue = unitsVelocity.value;
    let max = 299792458;
    let min = 0;
    let step = 1e-16;
    switch (selectedValue) {
        case 'c':
            max = 0.999999999999999;
            min = 0;
            step = step;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'ms':
            max = max;
            step = step;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'kms':
            max = max / 1000;
            step = step;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'mph':
            max = max / 447.04;
            step = step;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'kmh':
            max = 1079252848.8;
            step = step;
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        default:
            console.error('Invalid velocity unit');
    }
});

const inputTime = document.getElementById('inputTime');
const unitsTime = document.getElementById('unitsTime');

unitsTime.addEventListener('change', function () {
    const selectedValue = unitsTime.value;
    let max = 1e15; // Maximum time in years
    let min = 1e-24; // Minimum time in years
    let step = 'any'; // Default step size

    // Conversion factors for different time units
    const secToUnit = {
        s: 1,
        min: 60,
        h: 3600,
        d: 86400,
        wk: 604800,
        mo: 2.628e+6, // average number of seconds in a month
        yr: 3.154e+7, // average number of seconds in a year,
        ps: 1e-12, // picoseconds
        ns: 1e-9, // nanoseconds
        μs: 1e-6, // microseconds
        ms: 0.001, // milliseconds
    };

    // Set the max, min, and step attributes based on the selected unit
    switch (selectedValue) {
        case 's':
        case 'min':
        case 'h':
        case 'd':
        case 'wk':
        case 'mo':
        case 'yr':
            max = max / secToUnit.yr * secToUnit[selectedValue];
            min = min / secToUnit.yr * secToUnit[selectedValue];
            inputTime.setAttribute('max', max);
            inputTime.setAttribute('min', min);
            inputTime.setAttribute('step', step);
            break;
        case 'ms':
        case 'μs':
        case 'ns':
        case 'ps':
            max = max / secToUnit.yr / secToUnit[selectedValue];
            min = min / secToUnit.yr / secToUnit[selectedValue];
            step = 'any';
            inputTime.setAttribute('max', max);
            inputTime.setAttribute('min', min);
            inputTime.setAttribute('step', step);
            break;
        default:
            console.error('Invalid time unit');
    }
});

const inputProperTime = document.getElementById('inputProperTime');
const unitsProperTime = document.getElementById('unitsProperTime');

unitsProperTime.addEventListener('change', function () {
    const selectedValueP = unitsProperTime.value;
    let max = 1e15; // Maximum time in years
    let min = 1e-24; // Minimum time in years
    let step = 'any'; // Default step size

    // Conversion factors for different time units
    const secToUnitP = {
        sp: 1,
        minp: 60,
        hp: 3600,
        dp: 86400,
        wkp: 604800,
        mop: 2.628e+6, // average number of seconds in a month
        yrp: 3.154e+7, // average number of seconds in a year,
        psp: 1e-12, // picoseconds
        nsp: 1e-9, // nanoseconds
        μsp: 1e-6, // microseconds
        msp: 0.001, // milliseconds
    };

    // Set the max, min, and step attributes based on the selected unit
    switch (selectedValueP) {
        case 'sp':
        case 'minp':
        case 'hp':
        case 'dp':
        case 'wkp':
        case 'mop':
        case 'yrp':
            max = max / secToUnitP.yrp * secToUnitP[selectedValueP];
            min = min / secToUnitP.yrp * secToUnitP[selectedValueP];
            inputProperTime.setAttribute('max', max);
            inputProperTime.setAttribute('min', min);
            inputProperTime.setAttribute('step', step);
            break;
        case 'msp':
        case 'μsp':
        case 'nsp':
        case 'psp':
            max = max / secToUnitP.yrp / secToUnitP[selectedValueP];
            min = min / secToUnitP.yrp / secToUnitP[selectedValueP];
            step = 'any';
            inputProperTime.setAttribute('max', max);
            inputProperTime.setAttribute('min', min);
            inputProperTime.setAttribute('step', step);
            break;
        default:
            console.error('Invalid time unit');
    }
});