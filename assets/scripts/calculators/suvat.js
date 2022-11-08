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



