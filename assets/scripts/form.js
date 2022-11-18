// Validation - so long all constants and variables are named similarly
// this validation script should work for all pages

// ****************  FORMS and BUTTONS ******************** //
const formE = document.getElementById("SubmissionForm");
const calcButton = document.getElementById("submitButton");

// *************** Query Input Boxes ********************** //
const sE = document.getElementById("inputDistance");
const uE = document.getElementById("inputVi");
const vE = document.getElementById("inputVf");
const aE = document.getElementById("inputAcceleration");
const tE = document.getElementById("inputTime");

// *************** Query Check Boxes ********************** //
const cbs = document.querySelector("#Distance");
const cbu = document.querySelector("#initial_velocity");
const cbv = document.querySelector("#final_velocity");
const cba = document.querySelector("#acceleration");
const cbt = document.querySelector("#time");


// ************* Input Unit Selectors ********************* //
const selectS = document.getElementById("unitsDistance");
const selectU = document.getElementById("unitsVi");
const selectV = document.getElementById("unitsVf");
const selectA = document.getElementById("unitsAcceleration");
const selectT = document.getElementById("unitsTime");

// ******************* Input Max ************************** //

// Set speed of light maximum for all velocities

cbu.addEventListener("change", viSelect);
selectU.addEventListener("change", viSelect);
function viSelect() {
  if (selectU.value === "ms") {
    uE.setAttribute("max", 299792458);
  }
  if (selectU.value === "kmh") {
    uE.setAttribute("max", 1079252848.7999);
  }
  if (selectU.value === "mph") {
    uE.setAttribute("max", 670616629.3844);
  }
  if (selectU.value === "fts") {
    uE.setAttribute("max", 983571056.43045);
  }
}

cbv.addEventListener("change", vfSelect);
selectV.addEventListener("change", vfSelect);
function vfSelect() {
  if (selectV.value === "ms") {
    vE.setAttribute("max", 299792458);
  }
  if (selectV.value === "kmh") {
    vE.setAttribute("max", 1079252848.7999);
  }
  if (selectV.value === "mph") {
    vE.setAttribute("max", 670616629.3844);
  }
  if (selectV.value === "fts") {
    vE.setAttribute("max", 983571056.43045);
  }
}

// Limit maximum number based on the input's maximum
document.querySelector("#inputDistance").addEventListener("keydown", (e) => {
  if (e.target.valueAsNumber >= Number(e.target.max)) e.preventDefault();
});
document.querySelector("#inputVi").addEventListener("keydown", (e) => {
  if (e.target.valueAsNumber >= Number(e.target.max)) e.preventDefault();
});
document.querySelector("#inputVf").addEventListener("keydown", (e) => {
  if (e.target.valueAsNumber >= Number(e.target.max)) e.preventDefault();
});
document.querySelector("#inputAcceleration").addEventListener("keydown", (e) => {
  if (e.target.valueAsNumber >= Number(e.target.max)) e.preventDefault();
});
document.querySelector("#inputTime").addEventListener("keydown", (e) => {
  if (e.target.valueAsNumber >= Number(e.target.max)) e.preventDefault();
});


