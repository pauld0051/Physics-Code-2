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
    if ($checkedCheckboxes.length === 3) {
        $fontawesomeIcon.removeClass("text-warning").addClass("text-success");
    } else {
        $fontawesomeIcon.removeClass("text-success").addClass("text-warning");
    }
});

//Equation Variables
//Checkbox selection
const n1 = document.querySelector("#moles");
const N1 = document.querySelector("#particles");
const NA1 = document.querySelector("#avogadros");

document.getElementById("submitButton").addEventListener("click", function () {
    if (validateInputs()) {
        calculateMoles();
    }
});

function calculateMoles() {
    //User input values
    let n = parseFloat(document.getElementById("inputMoles").value);
    let N = parseFloat(document.getElementById("inputParticles").value);
    let NA = parseFloat(document.getElementById("inputAvogadro").value);

    // *************************************************************** //
    // User input units - change everything to metric for calculations //
    // *************************************************************** //

    // Moles //
    const molesUnit = document.getElementById("unitsMoles").value;
    if (molesUnit === "mol") {
        n = n;
    }
    if (molesUnit === "mmol") {
        n = n * 1000;
    }
    if (molesUnit === "μmol") {
        n = n * 1000000;
    }
    if (molesUnit === "nmol") {
        n = n * 1000000000;
    }
    if (isNaN(n)) {
        n = 0;
    }

    const particleUnit = document.getElementById("unitsParticles").value;
    const particleUnitText = particleUnit === "atoms" ? "atoms" : "ions";

    if (!n1.checked && N1.checked) {
        //Equation 1, solving for n
        n = N / NA;
        document.getElementById("inputMoles").value = n.toExponential(3);
        document.getElementById("molesOutput").innerHTML = scientificNotation(n) + " mol";
        document.getElementById("particlesOutput").innerHTML = scientificNotation(N) + " " + particleUnitText;
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} n=\frac{N}{N_A} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    // calculate N from n
    if (n1.checked && !N1.checked) {
        // equation 1 with N unknown
        N = n * NA;
        document.getElementById("inputParticles").value = N.toExponential(4);
        document.getElementById("molesOutput").innerHTML = scientificNotation(n) + " mol";
        document.getElementById("particlesOutput").innerHTML = scientificNotation(N) + " " + particleUnitText;
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} N=nN_A \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    // Scroll to the results section
    document.querySelector('#results_table_1').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Update moles values
    document.getElementById("n1x").innerHTML = scientificNotation(n) + " mol";
    document.getElementById("n2x").innerHTML = scientificNotation(n * 1000) + " mmol";
    document.getElementById("n3x").innerHTML = scientificNotation(n * 1000000) + " μmol";
    document.getElementById("n4x").innerHTML = scientificNotation(n * 1000000000) + " nmol";

    // Update particle values
    document.getElementById("n5x").innerHTML = scientificNotation(N) + " " + particleUnitText;
    // Update Avogadros
    document.getElementById("a1x").innerHTML = scientificNotation(NA);
}

// Remove the global reset event listeners
document.getElementById("resetButton1").removeEventListener("click", resetForm);
document.getElementById("resetButton2").removeEventListener("click", resetForm);

// Add the moles calculator-specific reset event listeners
document.getElementById("resetButton1").addEventListener("click", resetMolesForm);
document.getElementById("resetButton2").addEventListener("click", resetMolesForm);


// Reset specifically for the moles calculator
function resetMolesForm() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        // Skip the Avogadro's number checkbox
        if (checkbox.id === 'avogadros') {
            checkbox.checked = false;
            return;
        }

        checkbox.checked = false;
        checkbox.disabled = false;
    });
    document.querySelectorAll('.maxAllow').forEach((input) => {
        input.value = '';
        input.disabled = true;
    });
    document.querySelectorAll('select').forEach((select) => {
        select.selectedIndex = 0; // reset to default selected option
        select.disabled = true;
    });
}
