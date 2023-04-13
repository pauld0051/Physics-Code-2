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

const xunitsSpecificLatentHeat = document.getElementById('unitsSpecificLatentHeat');
const xinputSpecificLatentHeat = document.getElementById('inputSpecificLatentHeat');

xunitsSpecificLatentHeat.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
        case 'c6':
            xinputSpecificLatentHeat.value = 334;
            break;
        case 'c7':
            xinputSpecificLatentHeat.value = 2360;
            break;
        case 'c8':
            xinputSpecificLatentHeat.value = 571;
            break;
        case 'c9':
            xinputSpecificLatentHeat.value = 206;
            break;
        case 'c10':
            xinputSpecificLatentHeat.value = 4688;
            break;
        case 'c11':
            xinputSpecificLatentHeat.value = 105;
            break;
        case 'c12':
            xinputSpecificLatentHeat.value = 846;
            break;
        case 'c13':
            xinputSpecificLatentHeat.value = 63;
            break;
        case 'c14':
            xinputSpecificLatentHeat.value = 1595;
            break;
        case 'c15':
            xinputSpecificLatentHeat.value = 272;
            break;
        case 'c16':
            xinputSpecificLatentHeat.value = 6868;
            break;
        case 'c17':
            xinputSpecificLatentHeat.value = 24.5;
            break;
        case 'c18':
        xinputSpecificLatentHeat.value = 871;
            break;
        case 'c19':
        xinputSpecificLatentHeat.value = 25.7;
            break;
        case 'c20':
        xinputSpecificLatentHeat.value = 199;
            break;
        case 'c21':
        xinputSpecificLatentHeat.value = 14.7;
            break;
        case 'c22':
        xinputSpecificLatentHeat.value = 213;
            break;
        case 'c23':
        xinputSpecificLatentHeat.value = 88;
            break;
        case 'c24':
        xinputSpecificLatentHeat.value = 2452;
        break;
        default:
            break;
    }

    if (selectedValue === 'c1') {
        xinputSpecificLatentHeat.placeholder = 'J kg⁻¹';
    } else {
        xinputSpecificLatentHeat.placeholder = '';
    }

    xinputSpecificLatentHeat.disabled = (selectedValue !== 'c1' && selectedValue !== 'c2' && selectedValue !== 'c3' && selectedValue !== 'c4' && selectedValue !== 'c5');
});

//Equation Variables
//Checkbox selection
const q1 = document.querySelector("#heat");
const m1 = document.querySelector("#mass");
const l1 = document.querySelector("#specificLatentHeat");

document.getElementById("submitButton").addEventListener("click", function () {
    if (validateInputs()) {
        calculateIdealGas();
    }
});

function calculateIdealGas() {
    //User input values
    let q = parseFloat(document.getElementById("inputHeat").value);
    let m = parseFloat(document.getElementById("inputMass").value);
    let l = parseFloat(document.getElementById("inputSpecificLatentHeat").value);

     // *************************************************************** //
     // User input units - change everything to metric for calculations //
     // *************************************************************** //

    // Heat //
    const heatUnit = document.getElementById("unitsHeat").value;
    if (heatUnit === "kj") {
        heat = heat;
    }
    if (heatUnit === "cal") {
        heat = heat * 0.004184;
    }
    if (heatUnit === "j") {
        heat = heat * 0.001;
    }
    if (heatUnit === "kcal") {
        heat = heat * 4.184;
    }
    if (heatUnit === "btu") {
        heat = heat * 1.055056;
    }
    if (heatUnit === "ev") {
        heat = heat * 6.24150913e+15 * 0.001;
    }
    if (heatUnit === "mj") {
        heat = heat * 1000;
    }
    if (isNaN(heat)) {
        heat = 0;
    }

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

    // Specific Latent Heat //
    const lUnit = document.getElementById("unitsSpecificLatentHeat").value;
    if (lUnit === "c1") {
        l = l;
    }
    if (lUnit === "c2") {
        l = l * 1000;
    }
    if (lUnit === "c3") {
        l = l * 4.186;
    }
    if (lUnit === "c4") {
        l = l * 2326;
    }
    if (lUnit === "c5") {
        l = l / 1000;
    }
    if (lUnit === "c6") {
        l = 334;
    }
    if (lUnit === "c7") {
        l = 2260;
    }
    if (lUnit === "c8") {
        l = 571;
    }
    if (lUnit === "c9") {
        l = 206;
    }
    if (lUnit === "c10") {
        l = 4688;
    }
    if (lUnit === "c11") {
        l = 105;
    }
    if (lUnit === "c12") {
        l = 846;
    }
    if (lUnit === "c13") {
        l = 63;
    }
    if (lUnit === "c14") {
        l = 1595;
    }
    if (lUnit === "c15") {
        l = 272;
    }
    if (lUnit === "c16") {
        l = 6868;
    }
    if (lUnit === "c17") {
        l = 24.5;
    }
    if (lUnit === "c18") {
        l = 871;
    }
    if (lUnit === "c19") {
        l = 25.7;
    }
    if (lUnit === "c20") {
        l = 199;
    }
    if (lUnit === "c21") {
        l = 14.7;
    }
    if (lUnit === "c22") {
        l = 213;
    }
    if (lUnit === "c23") {
        l = 88;
    }
    if (lUnit === "c24") {
        l = 2452;
    }
    if (isNaN(l)) l = 0;

    //**************//
    // Calculations //
    //**************//

    if (!q1.checked && m1.checked && l1.checked) {
        //Equation 1 q unknown
        q = m * l;
        document.getElementById("inputHeat").value = q.toFixed(3);
        document.getElementById("massOutput").innerHTML = scientificNotation(m) + " kg";
        document.getElementById("heatOutput").innerHTML = scientificNotation(q) + " kJ";
        document.getElementById("specificLatentHeatOutput").innerHTML = scientificNotation(l) + " J kg⁻¹";
        document.getElementById("equation").innerHTML = String.raw`<span>$$\begin{gather} Q=mL \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    if (q1.checked && !m1.checked && l1.checked) {
        //Equation 2 m unknown
        m = q / l;
        document.getElementById("massOutput").innerHTML = scientificNotation(m) + " kg";
        document.getElementById("inputMass").value = m.toFixed(3);
        document.getElementById("heatOutput").innerHTML = scientificNotation(q) + " kJ";
        document.getElementById("specificLatentHeatOutput").innerHTML = scientificNotation(l) + " J kg⁻¹";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} Q=mL \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    if (q1.checked && m1.checked && !l1.checked) {
        //Equation 2 L unknown
        l = q / m;
        document.getElementById("inputSpecificLatentHeat").value = l.toFixed(3);
        document.getElementById("massOutput").innerHTML = scientificNotation(m) + " kg";
        document.getElementById("heatOutput").innerHTML = scientificNotation(q) + " kJ";
        document.getElementById("specificLatentHeatOutput").innerHTML = scientificNotation(l) + " J kg⁻¹";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} L=\frac{Q}{m} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }
// Scroll to the results section
document.querySelector('#results_table_1').scrollIntoView({
    behavior: 'smooth',
    block: 'center'
});

// Table 2 - results all converted
// Update heat values
document.getElementById("q1x").innerHTML = scientificNotation(q) + " kJ";
document.getElementById("q2x").innerHTML = scientificNotation(q / 4184) + " cal";
document.getElementById("q3x").innerHTML = scientificNotation(q * 1000) + " J";
document.getElementById("q4x").innerHTML = scientificNotation(q / 4.184) + " kcal";
document.getElementById("q5x").innerHTML = scientificNotation(q / 0.947817) + " BTUs";
document.getElementById("q6x").innerHTML = scientificNotation(q / 1.602e-19) + " eV";
document.getElementById("q7x").innerHTML = scientificNotation(q / 1000) + " MJ";

// Update mass values
document.getElementById("m1x").innerHTML = scientificNotation(m) + " kg";
document.getElementById("m2x").innerHTML = scientificNotation(m * 1000) + " g";
document.getElementById("m3x").innerHTML = scientificNotation(m * 1e+6) + " mg";
document.getElementById("m4x").innerHTML = scientificNotation(m * 1e+9) + " μg";
document.getElementById("m5x").innerHTML = scientificNotation(m * 2.20462) + " lb";
document.getElementById("m6x").innerHTML = scientificNotation(m * 35.274) + " oz";
document.getElementById("m7x").innerHTML = scientificNotation(m * 32.1507) + " t oz";

// Update specific latent heat values
document.getElementById("c1x").innerHTML = scientificNotation(l) + " kJ kg<sup>-1</sup>";
document.getElementById("c2x").innerHTML = scientificNotation(l * 1000) + " J kg<sup>-1</sup>";
document.getElementById("c3x").innerHTML = scientificNotation(l / 4184) + " cal kg<sup>-1</sup>";
document.getElementById("c4x").innerHTML = scientificNotation(l * 0.429923) + " BTU lb<sup>-1</sup>";
document.getElementById("c5x").innerHTML = scientificNotation(l / 1000) + " kJ g<sup>-1</sup>";

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

const inputSpecificLatentHeat = document.getElementById('inputSpecificLatentHeat');
const unitsSpecificLatentHeat = document.getElementById('unitsSpecificLatentHeat');

unitsSpecificLatentHeat.addEventListener('change', function () {
    const selectedValue = unitsSpecificLatentHeat.value;
    let max = 5000000;
    let min = 0.000000000001;
    let step = any;

    switch (selectedValue) {
        case 'c2':
        case 'c3':
            max = max;
            min = min;
            step = step;
            break;
        case 'c4':
            max = max;
            min = min;
            step = step;
            break;
        case 'c5':
            max = max;
            min = min;
            step = step;
            break;
        case 'c6':
        case 'c7':
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
        case 'c21':
        case 'c22':
        case 'c23':
        case 'c24':
            max = max;
            min = min;
            step = step;
            break;
        default:
            console.error('Invalid specific heat capacity unit');
            break;
    }

    inputSpecificLatentHeat.setAttribute('max', max);
    inputSpecificLatentHeat.setAttribute('min', min);
    inputSpecificLatentHeat.setAttribute('step', step);
});

