//disable checkboxes when a max 4 have been selected
var $checkboxes = $(".suvat-check input[type=checkbox]");
var $submitButton = $("#submitButton");
var $accelerationSelect = $("#acceleration").prop("checked");
$checkboxes.on("change", function () {
  if ($checkboxes.filter(":checked").length >= 3) {
    $checkboxes.filter(":not(:checked)").prop("disabled", true);
  } else {
    $checkboxes.prop("disabled", false);
    }
    if ($checkboxes.filter(":checked").length <= 2) {
        $submitButton.prop("disabled", true);
    } else {
        $submitButton.prop("disabled", false);
  }
  if ($accelerationSelect.prop(":checked")) {
    $("#aUnits").prop("disabled", false);
  }
});

//enable inputs based on checked box (up to 4 possible)
document.getElementById("displacement").onchange = function () {
document.getElementById("inputDistance").disabled = !this.checked;
};
document.getElementById("initial_velocity").onchange = function () {
document.getElementById("inputVi").disabled = !this.checked;
};
document.getElementById("final_velocity").onchange = function () {
document.getElementById("inputVf").disabled = !this.checked;
};
document.getElementById("acceleration").onchange = function () {
document.getElementById("inputAcceleration").disabled = !this.checked;
};
document.getElementById("time").onchange = function () {
document.getElementById("inputTime").disabled = !this.checked;
};

//Enable or disable selection of gravity based on user variable selection.
document.querySelector("#acceleration").addEventListener("change", gravSelect);
function gravSelect() {
  if (document.getElementById("acceleration").checked) {
    document.getElementById("gOnly").disabled = false;
    document.getElementById("-gOnly").disabled = false;
  }
}

//If Acceleration is chosen and gravity is the chosen acceleration update the input
//to reflect this.
const unitsSelect = document.getElementById("aUnits"),
gravityInput = document.getElementById("inputAcceleration");
unitsSelect.addEventListener("change", (evt) => {
  const unitSelected = unitsSelect.value;
  if (unitSelected === "g") {
    gravityInput.value = "9.81";
  } else if (unitSelected === "-g") {
    gravityInput.value = "-9.81";
  } else {
    gravityInput.value = "";
  }
});

//Equation Variables
//Checkbox selection
const s1 = document.querySelector("#displacement");
const u1 = document.querySelector("#initial_velocity");
const v1 = document.querySelector("#final_velocity");
const a1 = document.querySelector("#acceleration");
const t1 = document.querySelector("#time");
//if vf is 0 then a must be a negative ** Still needs work
document.getElementById("inputVf").addEventListener("keyup", negativeAcceleration);
document.getElementById("inputVf").addEventListener("click", negativeAcceleration);
document.getElementById("inputVf").addEventListener("change", negativeAcceleration);
document.getElementById("inputAcceleration").addEventListener("keyup", negativeAcceleration);
document.getElementById("inputAcceleration").addEventListener("click", negativeAcceleration);
document.getElementById("inputAcceleration").addEventListener("change", negativeAcceleration);
function negativeAcceleration() {
  const v = parseFloat(document.getElementById("inputVf").value);
  const a = parseFloat(document.getElementById("inputAcceleration").value);
  const s = parseFloat(document.getElementById("inputDistance").value);
  if (
    (v1.checked && a1.checked && v === 0 && a > 0 ||
     v1.checked && a1.checked && Math.pow(v,2) < (2 * a * s) && a > 0)
  ) {
    document.getElementById("submitButton").disabled = true;
    alert(
      "If Final Velocity is 0 then acceleration must be negative. Adjust that to calculate."
    );
  }
}
//Determine the equation and evaluate
//s.checked === false, et al. can be reduced to !s.checked and
//u.checked === true can be reduced to u.checked
document.getElementById("submitButton").addEventListener("click", calculateMe);
function calculateMe() {
  //User input values
  const s = parseFloat(document.getElementById("inputDistance").value);
  const u = parseFloat(document.getElementById("inputVi").value);
  const v = parseFloat(document.getElementById("inputVf").value);
  const a = parseFloat(document.getElementById("inputAcceleration").value);
  const t = parseFloat(document.getElementById("inputTime").value);
  let result;
  let result2;
  if (
    !s1.checked &&
    u1.checked &&
    v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //Equation 1 s only - not used
    result = u * t + 0.5 * a * (Math.pow(t,2));
    document.getElementById("inputDistance").value = result.toFixed(3);
    document.getElementById("s").innerHTML = result.toFixed(3) + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
    document.getElementById(
      "si_suvat_equation"
    ).innerHTML = String.raw`<span>$$\begin{gather} s = ut + \frac{1}{2}  at^{2}\\ \notag \end{gather}$$</span>`;
    MathJax.typeset();
  } else if (
    !s1.checked &&
    !u1.checked &&
    v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 2 s and u only
    result = v - a * t;
    result2 = result * t + 0.5 * a * (Math.pow(t,2));
    document.getElementById("inputVi").value = result.toFixed(3);
    document.getElementById("inputDistance").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = result2.toFixed(3) + "<span> m</span>";
    document.getElementById("u").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
    document.getElementById(
      "si_suvat_equation"
    ).innerHTML = String.raw`<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
    MathJax.typeset();
    document.getElementById(
      "si_suvat_equation2"
    ).innerHTML = String.raw`<span>$$\begin{gather} s\ =\ ut\ +\ \frac{1}{2} \ at^{2}\\ \notag \end{gather}$$</span>`;
    MathJax.typeset();
  } else if (
    !s1.checked &&
    u1.checked &&
    !v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 3 s and v only
    result = u + a * t;
    result2 = u * t + 0.5 * a * Math.pow(t, 2);
    document.getElementById("inputVf").value = result.toFixed(3);
    document.getElementById("inputDistance").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = result2.toFixed(3) + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
  } else if (
    !s1.checked &&
    u1.checked &&
    v1.checked &&
    !a1.checked &&
    t1.checked
  ) {
    //equation 4 s and a only
    result = (v - u) / t;
    result2 = u * t + 0.5 * result * Math.pow(t, 2);
    document.getElementById("inputAcceleration").value = result.toFixed(3);
    document.getElementById("inputDistance").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = result2.toFixed(3) + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = result.toFixed(3) + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
  } else if (
    !s1.checked &&
    u1.checked &&
    v1.checked &&
    a1.checked &&
    !t1.checked
  ) {
    //equation 5 s and t only
    result = (v - u) / a;
    result2 = u * result + 0.5 * a * Math.pow(result, 2);
    document.getElementById("inputTime").value = result.toFixed(3);
    document.getElementById("inputDistance").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = result2.toFixed(3) + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = result.toFixed(3) + "<span> s</span>";
  } else if (
    s1.checked &&
    !u1.checked &&
    v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 6 u only - not used
    result = v - a * t;
    document.getElementById("inputVi").value = result.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
  } else if (
    s1.checked &&
    !u1.checked &&
    !v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 7 u and v only
    result = s / t - a * t / 2;
    result2 = result + a * t;
    document.getElementById("inputVi").value = result.toFixed(3);
    document.getElementById("inputVf").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = result2.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
  } else if (
    s1.checked &&
    !u1.checked &&
    v1.checked &&
    !a1.checked &&
    t1.checked
  ) {
    //equation 8 u and a only
    result = (2 * s / t) - v;
    result2 = (v - result) / t;
    document.getElementById("inputVi").value = result.toFixed(3);
    document.getElementById("inputAcceleration").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = result2.toFixed(3) + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
  } else if (
    s1.checked &&
    !u1.checked &&
    v1.checked &&
    a1.checked &&
    !t1.checked
  ) {
    //equation 9 u and t only - if this outputs negative, this is a massive issue!
    result = Math.sqrt(Math.pow(v, 2) - 2 * a * s);
    result2 = (v - result) / a;
    document.getElementById("inputVi").value = result.toFixed(3);
    document.getElementById("inputTime").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = result2.toFixed(3) + "<span> s</span>";
  } else if (
    s1.checked &&
    u1.checked &&
    !v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 10 v only - not used
    result = u + a * t;
    document.getElementById("inputVf").value = result.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
  } else if (
    s1.checked &&
    u1.checked &&
    !v1.checked &&
    !a1.checked &&
    t1.checked
  ) {
    //equation 11 v and a only
    result = (2 * s / t) - u;
    result2 = (result - u) / t;
    document.getElementById("inputVf").value = result.toFixed(3);
    document.getElementById("inputAcceleration").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = result2.toFixed(3) + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
  } else if (
    s1.checked &&
    u1.checked &&
    !v1.checked &&
    a1.checked &&
    !t1.checked
  ) {
    //equation 12 v and t only
    result = Math.sqrt(Math.pow(u, 2) + 2 * a * s);
    result2 = (result - u) / a;
    document.getElementById("inputVf").value = result.toFixed(3);
    document.getElementById("inputTime").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = result2.toFixed(3) + "<span> s</span>";
  } else if (
    s1.checked &&
    u1.checked &&
    v1.checked &&
    !a1.checked &&
    t1.checked
  ) {
    //equation 13 a only - not used
    result = (v - u) / t;
    document.getElementById("inputAcceleration").value = result.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = result.toFixed(3) + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = t + "<span> s</span>";
  } else if (
    s1.checked &&
    u1.checked &&
    v1.checked &&
    !a1.checked &&
    !t1.checked
  ) {
    //equation 14 a and t only
    result = (v - u) * (v + u) / (2 * s);
    result2 = (v - u) / result;
    document.getElementById("inputAcceleration").value = result.toFixed(3);
    document.getElementById("inputTime").value = result2.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = result.toFixed(3) + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = result2.toFixed(3) + "<span> s</span>";
  } else if (
    s1.checked &&
    u1.checked &&
    v1.checked &&
    a1.checked &&
    !t1.checked
  ) {
    //equation 15 t only - not used
    result = (v - u) / a;
    document.getElementById("inputTime").value = result.toFixed(3);
    document.getElementById("s").innerHTML = s + "<span> m</span>";
    document.getElementById("u").innerHTML = u + "<span> ms<sup>-1</sup></span>";
    document.getElementById("v").innerHTML = v + "<span> ms<sup>-1</sup></span>";
    document.getElementById("a").innerHTML = a + "<span> ms<sup>-2</sup></span>";
    document.getElementById("t").innerHTML = result.toFixed(3) + "<span> s</span>";
  }
}

//Reset the sheet
//reset the form for new entry
document.getElementById("resetButton").addEventListener("click", resetForms);
function resetForms() {
  document.getElementById("kinematicCheckBox").reset();
  document.getElementById("suvat_calc").reset();
}