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
     let mol = parseFloat(document.getElementById("inputMoles").value);
     const molesUnit = document.getElementById("unitsMoles").value;
     if (molesUnit === "mol") {
         mol = mol;
     }
     if (molesUnit === "mmol") {
         mol = mol * 1000;
     }
     if (molesUnit === "μmol") {
         mol = mol * 1000000;
     }
     if (molesUnit === "nmol") {
         mol = mol * 1000000000;
     }
     if (isNaN(mol)) {
         mol = 0;
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

