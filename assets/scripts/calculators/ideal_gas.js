const $checkboxes = $(".ideal-check input[type=checkbox]");
const $submitButton = $("#submitButton");

$checkboxes.on("change", function() {
  const $checkedCheckboxes = $checkboxes.filter(":checked");

  // Disable unchecked checkboxes
  $checkboxes.filter(":not(:checked)").prop("disabled", $checkedCheckboxes.length >= 3);

  // Enable corresponding inputs for checked checkboxes
  const $checkedInputs = $checkedCheckboxes.map(function() {
    return $("[data-input='" + this.id + "']");
  });
  const $allInputs = $(".reset_form");
  $allInputs.prop("disabled", true);
  $checkedInputs.each(function() {
    $(this).prop("disabled", false);
  });

  // Disable submit button if less than 3 checkboxes are checked
  $submitButton.prop("disabled", $checkedCheckboxes.length < 3);
});

//Equation Variables
//Checkbox selection
const p1 = document.querySelector("#pressure");
const v1 = document.querySelector("#volume");
const n1 = document.querySelector("#moles");
const t1 = document.querySelector("#temperature");

//Determine the equation and evaluate
document.getElementById("submitButton").addEventListener("click", calculateMe);

function calculateMe(event) {
  event.stopPropagation();
  //User input values
  let p = parseFloat(document.getElementById("inputPressure").value);
  let v = parseFloat(document.getElementById("inputVolume").value);
  let n = parseFloat(document.getElementById("inputMole").value);
  let r = parseFloat(document.getElementById("inputGasConstant").value);
  let t = parseFloat(document.getElementById("inputTemperature").value);

  // *************************************************************** //
  // User input units - change everything to metric for calculations //
  // *************************************************************** //

  // Pressure //
  const pUnit = document.getElementById("unitsPressure").value;
  if (pUnit === "pa") {
    p = p;
  }
  if (pUnit === "bar") {
    p = p * 100000;
  }
  if (pUnit === "atm") {
    p = p * 101325;
  }
  if (pUnit === "mmHg") {
    p = p * 133.322;
  }
    if (isNaN(p)) p = 0;

  // Volume //
  const vUnit = document.getElementById("unitsVolume").value;
if (vUnit === "m3") {
    v = v;
}
if (vUnit === "cm3") {
v = v / 1000000
}
if (vUnit === "L") {
    v = v / 1000
}
if (vUnit === "mL") {
    v = v / 1000000
}
if (isNaN(v)) v = 0;

    // Temperature //
 const tUnit = document.getElementById("unitsTemperature").value;
 if (tUnit === "k") {
   t = t;
 }
 if (vUnit === "c") {
   t = t + 273.15;
 }
 if (vUnit === "f") {
   t = (t * 32 - 32) * 5/9 + 273.15;
 }
 if (isNaN(v)) v = 0;
}

//**************//
// Calculations //
//**************//
if (!p1.checked &&
    v1.checked &&
    n1.checked &&
    t1.checked) {

  //Equation 1 P unknown
  p = n * r * t / v;
  document.getElementById("inputPressure").value = s.toFixed(3);
  document.getElementById("p").innerHTML =
    p.toFixed(3) + "<span> m</span>";
  document.getElementById("v").innerHTML =
    v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
  document.getElementById("n").innerHTML =
    n.toFixed(3) + "<span> ms<sup>-1</sup></span>";
  document.getElementById("r").innerHTML =
    r.toFixed(3) + "<span> ms<sup>-2</sup></span>";
  document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
  document.getElementById(
    "si_suvat_equation"
  ).innerHTML = String.raw`<span>$$\begin{gather} s = ut + \frac{1}{2}  at^{2}\\ \notag \end{gather}$$</span>`;
  MathJax.typeset();
} else if (
  p1.checked &&
  !v1.checked &&
  n1.checked &&
  t1.checked
) {
  //equation 2 s and u only
  v = n * r * t / v;
  document.getElementById("inputVolume").value = v.toFixed(3);
  document.getElementById("inputPressure").value = p.toFixed(3);
  document.getElementById("p").innerHTML = p.toFixed(3) + "<span> m</span>";
  document.getElementById("n").innerHTML =
    n.toFixed(3) + "<span> ms<sup>-1</sup></span>";
  document.getElementById("r").innerHTML =
    r.toFixed(3) + "<span> ms<sup>-1</sup></span>";
  document.getElementById("r").innerHTML =
    t.toFixed(3) + "<span> ms<sup>-2</sup></span>";
  document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
  //MathJax insertion
  document.getElementById(
    "si_suvat_equation"
  ).innerHTML = String.raw`<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
  MathJax.typeset();
  document.getElementById(
    "si_suvat_equation2"
  ).innerHTML = String.raw`<span>$$\begin{gather} s\ =\ ut\ +\ \frac{1}{2} \ at^{2}\\ \notag \end{gather}$$</span>`;
  MathJax.typeset();
}