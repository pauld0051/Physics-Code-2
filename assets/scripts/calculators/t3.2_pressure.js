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
const p1 = document.querySelector("#pressure");
const f1 = document.querySelector("#force");
const a1 = document.querySelector("#area");

document.getElementById("submitButton").addEventListener("click", function () {
    if (validateInputs()) {
        calculatePressure();
    }
});

function calculatePressure() {
    //User input values
    let p = parseFloat(document.getElementById("inputPressure").value);
    let f = parseFloat(document.getElementById("inputForce").value);
    let a = parseFloat(document.getElementById("inputArea").value);

    // *************************************************************** //
    // User input units - change everything to metric for calculations //
    // *************************************************************** //

    // Pressure //
    const pUnit = document.getElementById("unitsPressure").value;
    if (pUnit === "N/m^2") {
        p = p;
    }
    if (pUnit === "atm") {
        p = p * 101325;
    }
    if (pUnit === "Pa") {
        p = p * 1;
    }
    if (pUnit === "bar") {
        p = p * 100000;
    }
    if (pUnit === "psi") {
        p = p * 6894.76;
    }
    if (pUnit === "mmHg") {
        p = p * 133.322;
    }
    if (pUnit === "torr") {
        p = p * 133.322;
    }
    if (pUnit === "hpa") {
        p = p * 100;
    }
    if (pUnit === "kpa") {
        p = p * 1000;
    }
    if (pUnit === "mpa") {
        p = p * 1000000;
    }
    if (pUnit === "mbar") {
        p = p * 100;
    }
    if (isNaN(p)) p = 0;

    // Force //
    const fUnit = document.getElementById("unitsForce").value;
    if (fUnit === "N") {
        f = f;
    }
    if (fUnit === "kN") {
        f = f * 1000;
    }
    if (fUnit === "MN") {
        f = f * 1000000;
    }
    if (fUnit === "dyn") {
        f = f * 0.00001;
    }
    if (fUnit === "lbf") {
        f = f * 4.44822;
    }
    if (fUnit === "ozf") {
        f = f * 0.2780139;
    }
    if (fUnit === "lb") {
        f = f * 4.44822;
    }
    if (fUnit === "kgf") {
        f = f * 9.80665;
    }
    if (isNaN(f)) f = 0;

    // Area //
    const aUnit = document.getElementById("unitsArea").value;
    if (aUnit === "m2") {
        a = a;
    }
    if (aUnit === "cm2") {
        a = a * 0.0001;
    }
    if (aUnit === "km2") {
        a = a * 1000000;
    }
    if (aUnit === "mm2") {
        a = a * 0.000001;
    }
    if (aUnit === "um2") {
        a = a * 0.000000000001;
    }
    if (aUnit === "mi2") {
        a = a * 2589988.110336;
    }
    if (aUnit === "yd2") {
        a = a * 0.83612736;
    }
    if (aUnit === "ft2") {
        a = a * 0.09290304;
    }
    if (aUnit === "in2") {
        a = a * 0.00064516;
    }
    if (aUnit === "ac") {
        a = a * 4046.8564224;
    }
    if (aUnit === "ha") {
        a = a * 10000;
    }
    if (isNaN(a)) a = 0;

    if (p1.checked && f1.checked && !a1.checked) {
        //Equation 1: A unknown
        a = f / p;
        document.getElementById("inputArea").value = a.toFixed(3);
        document.getElementById("areaOutput").innerHTML = scientificNotation(a) + " m<sup>2</sup>";
        document.getElementById("pressureOutput").innerHTML = scientificNotation(p) + " Nm<sup>-2</sup>";
        document.getElementById("forceOutput").innerHTML = scientificNotation(f) + " N";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} P=\frac{F}{A} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    if (!p1.checked && f1.checked && a1.checked) {
        //Equation 2: P unknown
        p = f / a;
        document.getElementById("inputPressure").value = p.toFixed(3);
        document.getElementById("pressureOutput").innerHTML = scientificNotation(p) + " Nm<sup>-2</sup>";
        document.getElementById("forceOutput").innerHTML = scientificNotation(f) + " N";
        document.getElementById("areaOutput").innerHTML = scientificNotation(a) + " m<sup>2</sup>";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} F=PA \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    if (p1.checked && !f1.checked && a1.checked) {
        //Equation 3: F unknown
        f = p * a;
        document.getElementById("inputForce").value = f.toFixed(3);
        document.getElementById("forceOutput").innerHTML = scientificNotation(f) + " N";
        document.getElementById("pressureOutput").innerHTML = scientificNotation(p) + " Nm<sup>-2</sup>";
        document.getElementById("areaOutput").innerHTML = scientificNotation(a) + " m<sup>2</sup>";
        document.getElementById("equation").innerHTML = String.raw `<span>$$\begin{gather} A=\frac{F}{P} \\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    }

    // Update pressure values
    document.getElementById("p1x").innerHTML = scientificNotation(p) + " Nm&#x207b;&sup2;";
    document.getElementById("p2x").innerHTML = scientificNotation(p / 1e3) + " Pa";
    document.getElementById("p3x").innerHTML = scientificNotation(p / 1e3) + " kPa";
    document.getElementById("p4x").innerHTML = scientificNotation(p / 1e6) + " MPa";
    document.getElementById("p5x").innerHTML = scientificNotation(p / 1e9) + " GPa";
    document.getElementById("p6x").innerHTML = scientificNotation(p / 1e5) + " bar";
    document.getElementById("p7x").innerHTML = scientificNotation(p / 1e2) + " mbar";
    document.getElementById("p8x").innerHTML = scientificNotation(p / 1e2) + " hPa";
    document.getElementById("p9x").innerHTML = scientificNotation(p / 133.3224) + " mmHg";
    document.getElementById("p10x").innerHTML = scientificNotation(p / 3386.39) + " inHg";
    document.getElementById("p11x").innerHTML = scientificNotation(p / 6894.757) + " psi";

    // Update force values
    document.getElementById("f1x").innerHTML = scientificNotation(f) + " N";
    document.getElementById("f2x").innerHTML = scientificNotation(f / 1000) + " kN";
    document.getElementById("f3x").innerHTML = scientificNotation(f / 1000000) + " MN";
    document.getElementById("f4x").innerHTML = scientificNotation(f * 100000) + " dyn";
    document.getElementById("f5x").innerHTML = scientificNotation(f / 4.44822) + " lbf";
    document.getElementById("f6x").innerHTML = scientificNotation(f / 0.278014) + " ozf";
    document.getElementById("f7x").innerHTML = scientificNotation(f / 4.44822) + " lb";
    document.getElementById("f8x").innerHTML = scientificNotation(f / 9.80665) + " kgf";

    // update the area output values
    document.getElementById("a1x").innerHTML = scientificNotation(a) + " m<sup>2</sup>";
    document.getElementById("a2x").innerHTML = scientificNotation(a * 1000000) + " mm<sup>2</sup>";
    document.getElementById("a3x").innerHTML = scientificNotation(a * 10000) + " cm<sup>2</sup>";
    document.getElementById("a4x").innerHTML = scientificNotation(a / 1000000) + " km<sup>2</sup>";
    document.getElementById("a5x").innerHTML = scientificNotation(a * 1000000000000) + " μm<sup>2</sup>";
    document.getElementById("a6x").innerHTML = scientificNotation(a / 2589988.110336) + " mi<sup>2</sup>";
    document.getElementById("a7x").innerHTML = scientificNotation(a * 1.19599) + " yd<sup>2</sup>";
    document.getElementById("a8x").innerHTML = scientificNotation(a * 10.763910417) + " ft<sup>2</sup>";
    document.getElementById("a9x").innerHTML = scientificNotation(a * 1550.003100006) + " in<sup>2</sup>";
    document.getElementById("a10x").innerHTML = scientificNotation(a * 0.00024710538146717) + " acres";
    document.getElementById("a11x").innerHTML = scientificNotation(a * 0.0001) + " hectares";

}

// Set Min - Max - Step //
const inputPressure = document.getElementById('inputPressure');
const unitsPressure = document.getElementById('unitsPressure');

unitsPressure.addEventListener('change', function () {
            const selectedValue = unitsPressure.value;
            let max = 1.00e24;
            let min = -1.00e12;
            let step = "any";
                switch (selectedValue) {
                    case 'N/m^2':
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'atm':
                        max = max / 101324.99766353;
                        min = min / 101324.99766353;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'Pa':
                        max = max;
                        min = min;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'bar':
                        max = max / 1000;
                        min = min / -1000;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'psi':
                        max = max * 0.0001450377;
                        min = min * 0.0001450377;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'mmHg':
                        max = max / 133.32236534674;
                        min = max / 133.32236534674;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'torr':
                         max = max / 133.32236534674;
                         min = max / 133.32236534674;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'hpa':
                        max = max * 0.01;
                        min = max * 0.01;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'kpa':
                        max = max * 0.001 ;
                        min = max * 0.001;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'mpa':
                        max = max * 0.000001;
                        min = min * 0.000001;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    case 'mbar':
                        max = max / 100;
                        min = min / 100;
                        step = step;
                        inputPressure.setAttribute('max', max);
                        inputPressure.setAttribute('min', min);
                        inputPressure.setAttribute('step', step);
                        break;
                    default:
                        console.error('Invalid pressure unit');
                }
});

const inputForce = document.getElementById('inputForce');
const unitsForce = document.getElementById('unitsForce');

unitsForce.addEventListener('change', function () {
    const selectedValue = unitsForce.value;
    let max = 3e8;
    let min = -3e8;
    let step = min;
    switch (selectedValue) {
        case 'N':
            inputForce.setAttribute('max', max);
            inputForce.setAttribute('min', min);
            inputForce.setAttribute('step', step);
            break;
        case 'kN':
            max = max / 1000;
            min = min / 1000;
            step = min;
            inputForce.setAttribute('max', max);
            inputForce.setAttribute('min', min);
            inputForce.setAttribute('step', step);
            break;
        case 'MN':
            max = max / 1000000;
            min = min / 1000000;
            step = min;
            inputForce.setAttribute('max', max);
            inputForce.setAttribute('min', min);
            inputForce.setAttribute('step', step);
            break;
        case 'dyn':
            max = max / 100000;
            min = min / 100000;
            step = min;
            inputForce.setAttribute('max', max);
            inputForce.setAttribute('min', min);
            inputForce.setAttribute('step', step);
            break;
        case 'lbf':
            max = max / 4.448221615;
            min = min / 4.448221615;
            step = min;
            inputForce.setAttribute('max', max);
            inputForce.setAttribute('min', min);
            inputForce.setAttribute('step', step);
            break;
        case 'ozf':
            max = max / 0.2780138509;
            min = min / 0.2780138509;
            step = min;
            inputForce.setAttribute('max', max);
            inputForce.setAttribute('min', min);
            inputForce.setAttribute('step', step);
            break;
        case 'lb':
            max = max / 0.2248089431;
            min = min / 0.2248089431;
            step = min;
            inputForce.setAttribute('max', max);
            inputForce.setAttribute('min', min);
            inputForce.setAttribute('step', step);
            break;
        case 'kgf':
            max = max / 9.80665;
            min = min / 9.80665;
            step = min;
            inputForce.setAttribute('max', max);
            inputForce.setAttribute('min', min);
            inputForce.setAttribute('step', step);
            break;
        default:
            console.error('Invalid force unit');
    }
});

const inputArea = document.getElementById('inputArea');
const unitsArea = document.getElementById('unitsArea');

unitsArea.addEventListener('change', function () {
    const selectedValue = unitsArea.value;
    let max = 1.00e+30;
    let min = 0;
    let step = 0.00000000001;
    switch (selectedValue) {
        case 'm2':
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'cm2':
            max = max / 10000;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'km2':
            max = max / 1000000;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'mm2':
            max = max * 1000000;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'um2':
            max = max * 1.00e+24;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'mi2':
            max = max / 2589988.110336;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'yd2':
            max = max / 1.19599;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'ft2':
            max = max / 10.763910417;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'in2':
            max = max * 1550.00310001;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'ac':
            max = max / 4046.8564224;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        case 'ha':
            max = max / 10000;
            step = 0.00000000001;
            inputArea.setAttribute('max', max);
            inputArea.setAttribute('min', min);
            inputArea.setAttribute('step', step);
            break;
        default:
            console.error('Invalid area unit');
    }
});
