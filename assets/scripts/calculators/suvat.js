//disable checkboxes when a max 4 have been selected
var $checkboxes = $(".suvat-check input[type=checkbox]");
var $submitButton = $("#submitButton");
var $accelerationSelect = $("#acceleration").prop("checked");
$checkboxes.on("change", function () {
  if ($checkboxes.filter(":checked").length >= 4) {
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
    //Equation 1
    result = u * t + 0.5 * a * (Math.pow(t,2));
    document.getElementById("trial").innerHTML = result;
  } else if (
    !s1.checked &&
    !u1.checked &&
    v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 2
    result = v - a * t;
    result2 = result * t + 0.5 * a * (Math.pow(t,2));
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    !s1.checked &&
    u1.checked &&
    !v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 3
    result = u + a * t;
    result2 = u * t + 0.5 * a * Math.pow(t, 2);
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    !s1.checked &&
    u1.checked &&
    v1.checked &&
    !a1.checked &&
    t1.checked
  ) {
    //equation 4
    result = (v - u) / t;
    result2 = u * t + 0.5 * result * Math.pow(t, 2);
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    !s1.checked &&
    u1.checked &&
    v1.checked &&
    a1.checked &&
    !t1.checked
  ) {
    //equation 5
    result = (v - u) / a;
    result2 = u * result + 0.5 * a * Math.pow(result, 2);
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    s1.checked &&
    !u1.checked &&
    v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 6
    result = v - a * t;
    document.getElementById("trial").innerHTML = result;
  } else if (
    s1.checked &&
    !u1.checked &&
    !v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 7
    result = s / t - a * t / 2;
    result2 = result + a * t;
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    s1.checked &&
    !u1.checked &&
    v1.checked &&
    !a1.checked &&
    t1.checked
  ) {
    //equation 8
    result = (2 * s / t) - v;
    result2 = (v - result) / t;
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    s1.checked &&
    !u1.checked &&
    v1.checked &&
    a1.checked &&
    !t1.checked
  ) {
    //equation 9
    result = Math.sqrt(Math.pow(v, 2) - 2 * a * s);
    result2 = (v - result) / a;
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    s1.checked &&
    u1.checked &&
    !v1.checked &&
    a1.checked &&
    t1.checked
  ) {
    //equation 10
    result = u + a * t;
    document.getElementById("trial").innerHTML = result;
  } else if (
    s1.checked &&
    u1.checked &&
    !v1.checked &&
    !a1.checked &&
    t1.checked
  ) {
    //equation 11
    result = (2 * s / t) - u;
    result2 = (result - u) / t;
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    s1.checked &&
    u1.checked &&
    !v1.checked &&
    a1.checked &&
    !t1.checked
  ) {
    //equation 12
    result = Math.sqrt(Math.pow(u, 2) + 2 * a * s);
    result2 = (result - u) / a;
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    s1.checked &&
    u1.checked &&
    v1.checked &&
    !a1.checked &&
    t1.checked
  ) {
    //equation 13
    result = (v - u) / t;
    document.getElementById("trial").innerHTML = result;
  } else if (
    s1.checked &&
    u1.checked &&
    v1.checked &&
    !a1.checked &&
    !t1.checked
  ) {
    //equation 14
    result = (v - u) * (v + u) / (2 * s);
    result2 = (v - u) / result;
    document.getElementById("trial").innerHTML = result;
    document.getElementById("trial2").innerHTML = result2;
  } else if (
    s1.checked &&
    u1.checked &&
    v1.checked &&
    a1.checked &&
    !t1.checked
  ) {
    //equation 15
    result = (v - u) / a;
    document.getElementById("trial").innerHTML = result;
  }
}