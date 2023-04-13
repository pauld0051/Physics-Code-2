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
const l1 = document.querySelector("#length");
const pl1 = document.querySelector("#properLength");
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
    let l = parseFloat(document.getElementById("inputLength").value);
    let pl = parseFloat(document.getElementById("inputProperLength").value);

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

    // Contracted Length //
    const mUnit = document.getElementById("unitsLength").value;
    if (mUnit === "m") {
        l = l;
    }
    if (mUnit === "km") {
        l = l * 1000;
    }
    if (mUnit === "mi") {
        l = l * 1609.34;
    }
    if (mUnit === "ft") {
        l = l * 0.3048;
    }
    if (mUnit === "yd") {
        l = l * 0.9144;
    }
    if (mUnit === "μm") {
        l = l * 1e-6;
    }
    if (mUnit === "nm") {
        l = l * 1e-9;
    }
    if (mUnit === "mm") {
        l = l * 1e-3;
    }
    if (mUnit === "cm") {
        m = m * 1e-2;
    }
    if (mUnit === "in") {
        l = l * 0.0254;
    }
    if (mUnit === "au") {
        l = l * 149597870700;
    }
    if (mUnit === "ly") {
        l = l * 9.4607e+15;
    }
    if (mUnit === "pc") {
        l = l * 3.0857e+16;
    }
    if (mUnit === "kpc") {
        l = l * 3.0857e+19;
    }
    if (mUnit === "Mpc") {
        l = l * 3.0857e+22;
    }
    if (mUnit === "Gpc") {
        l = l * 3.0857e+25;
    }
    if (isNaN(l)) l = 0;

    // Proper Length //
    const pmUnit = document.getElementById("unitsProperLength").value;
    if (pmUnit === "pm") {
        pl = pl;
    }
    if (pmUnit === "pkm") {
        pl = pl * 1000;
    }
    if (pmUnit === "pmi") {
        pl = pl * 1609.34;
    }
    if (pmUnit === "pft") {
        pl = pl * 0.3048;
    }
    if (pmUnit === "pyd") {
        pl = pl * 0.9144;
    }
    if (pmUnit === "pμm") {
        pl = pl * 1e-6;
    }
    if (pmUnit === "pnm") {
        pl = pl * 1e-9;
    }
    if (pmUnit === "pmm") {
        pl = pl * 1e-3;
    }
    if (pmUnit === "pcm") {
        pl = pl * 1e-2;
    }
    if (pmUnit === "pin") {
        pl = pl * 0.0254;
    }
    if (pmUnit === "pau") {
        pl = pl * 149597870700;
    }
    if (pmUnit === "ply") {
        pl = pl * 9.4607e+15;
    }
    if (pmUnit === "ppc") {
        pl = pl * 3.0857e+16;
    }
    if (pmUnit === "pkpc") {
        pl = pl * 3.0857e+19;
    }
    if (pmUnit === "pMpc") {
        pl = pl * 3.0857e+22;
    }
    if (pmUnit === "pGpc") {
        pl = pl * 3.0857e+25;
    }
    if (isNaN(pl)) pl = 0;

    if (!v1.checked && l1.checked && pl1.checked) {
        if (l > pl) {
            document.getElementById("velocityOutput").innerHTML = "Contracted length (l) cannot be greater than the proper length (pl). Please check your input values.";
            document.getElementById("inputVelocity").value = "";
            document.getElementById("lengthOutput").innerHTML = "";
            document.getElementById("properLengthOutput").innerHTML = "";
            document.getElementById("gammaOutput").innerHTML = "";
            document.getElementById("equation").innerHTML = "";
            MathJax.typeset();
        } else {
            // Equation for v unknown when l and pl are known
            v = Math.sqrt(1 - Math.pow(l / pl, 2));
            g = 1 / Math.sqrt(1 - Math.pow(v, 2));
            if (v > 1) {
                document.getElementById("velocityOutput").innerHTML = "greater than the speed of light... Impossible.";
            } else {
                document.getElementById("inputVelocity").value = v.toFixed(3);
                document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
                document.getElementById("lengthOutput").innerHTML = scientificNotation(l) + " m";
                document.getElementById("properLengthOutput").innerHTML = scientificNotation(pl) + " m";
                document.getElementById("gammaOutput").innerHTML = scientificNotation(g);
            }
            document.getElementById("equation").innerHTML = String.raw `<span>$$v = \sqrt{1 - \left(\frac{L}{L_0}\right)^2}$$</span>`;
            MathJax.typeset();
        }
    }
    if (v1.checked && !l1.checked && pl1.checked) {
        // Equation 2 l unknown
        g = 1 / Math.sqrt(1 - Math.pow(v, 2));
        l = pl * Math.sqrt(1 - Math.pow(v, 2));

        if (v > 1) {
            document.getElementById("velocityOutput").innerHTML = "greater than the speed of light... Impossible.";
        } else {
            document.getElementById("inputLength").value = l.toFixed(3);
            document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
            document.getElementById("lengthOutput").innerHTML = scientificNotation(l) + " m";
            document.getElementById("properLengthOutput").innerHTML = scientificNotation(pl) + " m";
            document.getElementById("gammaOutput").innerHTML = scientificNotation(g);
        }
        document.getElementById("equation").innerHTML = String.raw `<span>$$L = L_0 \cdot \sqrt{1 - \left(\frac{v}{c}\right)^2}$$</span>`;
        MathJax.typeset();
    }
    if (v1.checked && l1.checked && !pl1.checked) {
        // Equation 3 pl unknown
        g = 1 / Math.sqrt(1 - Math.pow(v, 2));
        pl = l / Math.sqrt(1 - Math.pow(v, 2));

        if (v > 1) {
            document.getElementById("velocityOutput").innerHTML = "greater than the speed of light... Impossible.";
        } else {
            document.getElementById("inputProperLength").value = pl.toFixed(3);
            document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
            document.getElementById("lengthOutput").innerHTML = scientificNotation(l) + " m";
            document.getElementById("properLengthOutput").innerHTML = scientificNotation(pl) + " m";
            document.getElementById("gammaOutput").innerHTML = scientificNotation(g);
        }
        document.getElementById("equation").innerHTML = String.raw `<span>$$L_0 = \frac{L}{\sqrt{1 - \left(\frac{v}{c}\right)^2}}$$</span>`;
        MathJax.typeset();
    }
    // Scroll to the results section
    document.querySelector('#results_table_1').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    // Table 2 - results all converted
    // Contracted Length
    document.getElementById("l1x").innerHTML = scientificNotation(l) + " m";
    document.getElementById("l2x").innerHTML = scientificNotation(l / 1000) + " km";
    document.getElementById("l3x").innerHTML = scientificNotation(l / 1609.34) + " mi";
    document.getElementById("l4x").innerHTML = scientificNotation(l * 3.28084) + " ft";
    document.getElementById("l5x").innerHTML = scientificNotation(l * 1.09361) + " yd";
    document.getElementById("l6x").innerHTML = scientificNotation(l * 1e6) + " &mu;m";
    document.getElementById("l7x").innerHTML = scientificNotation(l * 1e9) + " nm";
    document.getElementById("l8x").innerHTML = scientificNotation(l * 1000) + " mm";
    document.getElementById("l9x").innerHTML = scientificNotation(l * 100) + " cm";
    document.getElementById("l10x").innerHTML = scientificNotation(l * 39.3701) + " in";
    document.getElementById("l11x").innerHTML = scientificNotation(l / 1.496e+11) + " au";
    document.getElementById("l12x").innerHTML = scientificNotation(l / 9.461e+15) + " ly";
    document.getElementById("l13x").innerHTML = scientificNotation(l / 3.086e+16) + " pc";
    document.getElementById("l14x").innerHTML = scientificNotation(l / 3.086e+19) + " kpc";
    document.getElementById("l15x").innerHTML = scientificNotation(l / 3.086e+22) + " Mpc";
    document.getElementById("l16x").innerHTML = scientificNotation(l / 3.086e+25) + " Gpc";

    // Proper Length
    document.getElementById("pl1x").innerHTML = scientificNotation(pl) + " m";
    document.getElementById("pl2x").innerHTML = scientificNotation(pl / 1000) + " km";
    document.getElementById("pl3x").innerHTML = scientificNotation(pl / 1609.34) + " mi";
    document.getElementById("pl4x").innerHTML = scientificNotation(pl * 3.28084) + " ft";
    document.getElementById("pl5x").innerHTML = scientificNotation(pl * 1.09361) + " yd";
    document.getElementById("pl6x").innerHTML = scientificNotation(pl * 1e6) + " &mu;m";
    document.getElementById("pl7x").innerHTML = scientificNotation(pl * 1e9) + " nm";
    document.getElementById("pl8x").innerHTML = scientificNotation(pl * 1000) + " mm";
    document.getElementById("pl9x").innerHTML = scientificNotation(pl * 100) + " cm";
    document.getElementById("pl10x").innerHTML = scientificNotation(pl * 39.3701) + " in";
    document.getElementById("pl11x").innerHTML = scientificNotation(pl / 1.496e+11) + " au";
    document.getElementById("pl12x").innerHTML = scientificNotation(pl / 9.461e+15) + " ly";
    document.getElementById("pl13x").innerHTML = scientificNotation(pl / 3.086e+16) + " pc";
    document.getElementById("pl14x").innerHTML = scientificNotation(pl / 3.086e+19) + " kpc";
    document.getElementById("pl15x").innerHTML = scientificNotation(pl / 3.086e+22) + " Mpc";
    document.getElementById("pl16x").innerHTML = scientificNotation(pl / 3.086e+25) + " Gpc";

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
 document.getElementById("g1x").innerHTML = g;

}

const unitsLength = document.getElementById('unitsLength');

unitsLength.addEventListener('change', function () {
    const selectedValue = unitsLength.value;
    const maxMeters = 8.8e26;
    let max = maxMeters;
    let min = 0;
    let step = 'any';

    switch (selectedValue) {
        case 'm':
            break;
        case 'km':
            max = maxMeters / 1000;
            break;
        case 'mi':
            max = maxMeters / 1609.34;
            break;
        case 'ft':
            max = maxMeters * 3.28084;
            break;
        case 'yd':
            max = maxMeters * 1.09361;
            break;
        case 'μm':
            max = maxMeters * 1e6;
            break;
        case 'nm':
            max = maxMeters * 1e9;
            break;
        case 'mm':
            max = maxMeters * 1000;
            break;
        case 'cm':
            max = maxMeters * 100;
            break;
        case 'in':
            max = maxMeters * 39.3701;
            break;
        case 'au':
            max = maxMeters / 1.496e+11;
            break;
        case 'ly':
            max = maxMeters / 9.461e+15;
            break;
        case 'pc':
            max = maxMeters / 3.086e+16;
            break;
        case 'kpc':
            max = maxMeters / 3.086e+19;
            break;
        case 'Mpc':
            max = maxMeters / 3.086e+22;
            break;
        case 'Gpc':
            max = maxMeters / 3.086e+25;
            break;
        default:
            console.error('Invalid length unit');
    }

    inputLength.setAttribute('max', max);
    inputLength.setAttribute('min', min);
    inputLength.setAttribute('step', step);
});

const unitsProperLength = document.getElementById('unitsProperLength');

unitsProperLength.addEventListener('change', function () {
    const selectedValue = unitsProperLength.value;
    const maxMeters = 8.8e26;
    let max = maxMeters;
    let min = 0;
    let step = 'any';

    switch (selectedValue) {
        case 'pm':
            break;
        case 'pkm':
            max = maxMeters / 1000;
            break;
        case 'pmi':
            max = maxMeters / 1609.34;
            break;
        case 'pft':
            max = maxMeters * 3.28084;
            break;
        case 'pyd':
            max = maxMeters * 1.09361;
            break;
        case 'pμm':
            max = maxMeters * 1e6;
            break;
        case 'pnm':
            max = maxMeters * 1e9;
            break;
        case 'pmm':
            max = maxMeters * 1000;
            break;
        case 'pcm':
            max = maxMeters * 100;
            break;
        case 'pin':
            max = maxMeters * 39.3701;
            break;
        case 'pau':
            max = maxMeters / 1.496e+11;
            break;
        case 'ply':
            max = maxMeters / 9.461e+15;
            break;
        case 'ppc':
            max = maxMeters / 3.086e+16;
            break;
        case 'pkpc':
            max = maxMeters / 3.086e+19;
            break;
        case 'pMpc':
            max = maxMeters / 3.086e+22;
            break;
        case 'pGpc':
            max = maxMeters / 3.086e+25;
            break;
        default:
            console.error('Invalid proper length unit');
    }

    inputProperLength.setAttribute('max', max);
    inputProperLength.setAttribute('min', min);
    inputProperLength.setAttribute('step', step);
});

const unitsVelocity = document.getElementById('unitsVelocity');

unitsVelocity.addEventListener('change', function () {
    const selectedValue = unitsVelocity.value;
    let max = 299792458;
    let min = 0;
    let step = 'any';
    switch (selectedValue) {
        case 'c':
            max = 1;
            min = 0;
            step = 'any';
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'ms':
            max = max;
            step = 'any';
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'kms':
            max = max / 1000;
            step = 'any';
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'mph':
            max = max / 447.04;
            step = 'any';
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        case 'kmh':
            max = 1079252848.8;
            step = 'any';
            inputVelocity.setAttribute('max', max);
            inputVelocity.setAttribute('min', min);
            inputVelocity.setAttribute('step', step);
            break;
        default:
            console.error('Invalid velocity unit');
    }
});