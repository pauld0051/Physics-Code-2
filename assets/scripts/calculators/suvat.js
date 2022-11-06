//disable checkboxes when a max 4 have been selected
var $checkboxes = $(".suvat-check input[type=checkbox]");
var $submitButton = $("#submitButton");
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



