// Check the users are clicking the right number of checkboxes
const $checkboxes = $(".ideal-check input[type=checkbox]");
const $submitButton = $("#submitButton");

$checkboxes.on("change", function () {
    const $checkedCheckboxes = $checkboxes.filter(":checked");

    // Disable unchecked checkboxes
    $checkboxes.filter(":not(:checked)").prop("disabled", $checkedCheckboxes.length >= 1);

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
    $submitButton.prop("disabled", $checkedCheckboxes.length < 1);

    // Change colour of checkbox icon when valid
    const $fontawesomeIcon = $(".fas.fa-check-square");
    if ($checkedCheckboxes.length === 1) {
        $fontawesomeIcon.removeClass("text-warning").addClass("text-success");
    } else {
        $fontawesomeIcon.removeClass("text-success").addClass("text-warning");
    }
});

//Equation Variables
//Checkbox selection
const v1 = document.querySelector("#velocity");
const g1 = document.querySelector("#gamma");
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
 let g = parseFloat(document.getElementById("inputGamma").value);

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

    const gUnit = document.getElementById("unitsGamma").value;
    if (gUnit === "g") {
        g = g;
    }
    if (isNaN(g)) g = 0;

    if (!v1.checked && g1.checked) {
        //Equation 1 v unknown
        v = Math.sqrt(1 - 1 / Math.pow(g, 2));
        if (v > 1) {
            document.getElementById("velocityOutput").innerHTML = "greater than the speed of light... Impossible.";
        } else {
            document.getElementById("inputVelocity").value = v.toFixed(3);
            document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
        }
        document.getElementById("gammaOutput").innerHTML = scientificNotation(g);
        document.getElementById("equation").innerHTML = String.raw `<span>$$v = c\sqrt{1-\frac{1}{\gamma^2}}$$</span>`;
        MathJax.typeset();
    }
    if (v1.checked && !g1.checked) {
      //Equation 2 Gamma unknown
        g = 1 / Math.sqrt(1 - Math.pow(v, 2));
        document.getElementById("inputGamma").value = g.toFixed(6);
        document.getElementById("gammaOutput").innerHTML = g.toFixed(6);
        document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\gamma = \frac{1}{\sqrt{1-\frac{v^2}{c^2}}}$$</span>`;
        MathJax.typeset();
    }
    // Scroll to the results section
    document.querySelector('#results_table_1').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    // Table 2 - results all converted
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

