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
    if ($checkedCheckboxes.length === 1) {
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
    if (vUnit === "c") {
        v = v;
    }
    if (vUnit === "ms") {
        v = v / 299792458;
    }
    if (vUnit === "kmh") {
        v = v * 0.00000092656;
    }
    if (vUnit === "mph") {
        v = v * 0.00000044704;
    }
    if (vUnit === "kms") {
        v = v * 0.00333564;
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
        //Equation 1 v unknown
        v = Math.sqrt(1 - Math.pow(pt / t, 2));
        g = 1 / Math.sqrt(1 - Math.pow(v, 2));
        if (v > 1) {
            document.getElementById("velocityOutput").innerHTML = "greater than the speed of light... Impossible.";
        } else {
            document.getElementById("inputVelocity").value = v.toFixed(3);
            document.getElementById("velocityOutput").innerHTML = scientificNotation(v) + " c";
            document.getElementById("timeOutput").innerHTML = scientificNotation(t) + " yr";
            document.getElementById("properTimeOutput").innerHTML = scientificNotation(pt) + " yr";
            document.getElementById("gammaOutput").innerHTML = scientificNotation(g);
        }
        document.getElementById("equation").innerHTML = String.raw `<span>$$v = \sqrt{1 - \left(\frac{\Delta t_0}{\Delta t}\right)^2}$$</span>`;
        MathJax.typeset();
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
            document.getElementById("gammaOutput").innerHTML = scientificNotation(g);
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
           document.getElementById("gammaOutput").innerHTML = scientificNotation(g);
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
        document.getElementById("v1x").innerHTML = "greater than the speed of light... Impossible.";
        document.getElementById("v2x").innerHTML = "&nbsp;";
        document.getElementById("v3x").innerHTML = "&nbsp;";
        document.getElementById("v4x").innerHTML = "&nbsp;";
        document.getElementById("v5x").innerHTML = "&nbsp;";
        document.getElementById("v6x").innerHTML = "&nbsp;";
    } else {
        document.getElementById("v0x").innerHTML = scientificNotation(v) + " c";
        document.getElementById("v1x").innerHTML = scientificNotation(v * 299792458) + " ms<sup>-1</sup>";
        document.getElementById("v2x").innerHTML = scientificNotation(v * 299792458 * 3.6 / 1000) + " kmh<sup>-1</sup>";
        document.getElementById("v3x").innerHTML = scientificNotation(v * 299792458 * 3.281 / 1000) + " fts<sup>-1</sup>";
        document.getElementById("v4x").innerHTML = scientificNotation(v * 299792458 * 1.944 / 1000) + " knots";
        document.getElementById("v5x").innerHTML = scientificNotation(v * 299792.458) + " kms<sup>-1</sup>";
        document.getElementById("v6x").innerHTML = scientificNotation(v * 29979245800) + " cms<sup>-1</sup>";
    }

    // Update gamma values
    document.getElementById("g1x").innerHTML = g;

} //closing } //