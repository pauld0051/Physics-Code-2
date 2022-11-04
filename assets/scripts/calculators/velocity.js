//prevent the browser from showing default error bubble / hint
document.querySelector("form").addEventListener(
    "invalid",
    function(event) {
        event.preventDefault();
    },
    true
);

//convert velocities into m/s regardless of choice of unit
element = document.getElementById("inputVelocity");
secondElement = document.getElementById("units");
element.addEventListener("keyup", convert);
secondElement.addEventListener("click", convert);
function convert() {
  let vi = parseFloat(element.value);
  let unit = document.getElementById("units").value;
  let result;
  if (unit === "ms") {
    result = vi;
  }
  if (unit === "kmh") {
    result = vi / 3.6;
  }
  if (unit === "mph") {
    result = vi * 0.44704;
  }
  if (unit === "fts") {
    result = vi / 3.28084;
  }
  if (isNaN(result)) result = 0;
  document.getElementById("ms").innerHTML =
    result.toFixed(2) + "<span> ms<sup>-1</sup></span>";
  document.getElementById("kmh").innerHTML =
    (result * 3.6).toFixed(2) + "<span> kmh<sup>-1</sup></span>";
  document.getElementById("mph").innerHTML =
    (result / 0.44704).toFixed(2) + "<span> mph</span>";
  document.getElementById("fts").innerHTML =
    (result * 3.28084).toFixed(2) + "<span> fts<sup>-1</sup></span>";
  velocity = result;
}

//convert distances into m regardless of choice of unit
dElement = document.getElementById("inputDistance");
dSecondElement = document.getElementById("unitsDistance");
dElement.addEventListener("keyup", dConvert);
dSecondElement.addEventListener("click", dConvert);
function dConvert() {
  let di = parseFloat(dElement.value);
  let dUnit = document.getElementById("unitsDistance").value;
  let dResult;
  if (dUnit === "m") {
    dResult = di;
  }
  if (dUnit === "km") {
    dResult = di * 1000;
  }
  if (dUnit === "yd") {
    dResult = di / 1.09361;
  }
  if (dUnit === "mi") {
    dResult = di / 0.000621371;
  }
   if (dUnit === "ft") {
     dResult = di / 3.28084;
   }
  if (isNaN(dResult)) dResult = 0;
  document.getElementById("m").innerHTML =
    dResult.toFixed(2) + "<span> m<span>";
  document.getElementById("km").innerHTML =
    (dResult / 1000).toFixed(2) + "<span> km</span>";
  document.getElementById("yd").innerHTML =
    (dResult * 1.09361).toFixed(2) + "<span> yd</span>";
  document.getElementById("mi").innerHTML =
    (dResult * 0.000621371).toFixed(2) + "<span> mi</span>";
  document.getElementById("ft").innerHTML =
    (dResult * 3.28084).toFixed(2) + "<span> ft</span>";
  distance = dResult;
}

//convert time into s regardless of choice of unit
tElement = document.getElementById("inputTime");
tSecondElement = document.getElementById("unitsTime");
tElement.addEventListener("keyup", tConvert);
tSecondElement.addEventListener("click", tConvert);
function tConvert() {
  let ti = parseFloat(tElement.value);
  let tUnit = document.getElementById("unitsTime").value;
  let tResult;
  if (tUnit === "s") {
    tResult = ti;
  }
  if (tUnit === "min") {
    tResult = ti * 60;
  }
  if (tUnit === "hr") {
    tResult = ti * 3600;
  }
  if (tUnit === "days") {
    tResult = ti * 86400;
  }
  if (isNaN(tResult)) tResult = 0;
  document.getElementById("s").innerHTML =
    tResult.toFixed(2) + "<span> s<span>";
  document.getElementById("min").innerHTML =
    (tResult / 60).toFixed(2) + "<span> min</span>";
  document.getElementById("hr").innerHTML =
    (tResult / 3600).toFixed(2) + "<span> hr</span>";
  document.getElementById("days").innerHTML =
    (tResult / 86400).toFixed(2) + "<span> days</span>";
  time = tResult
}

//supply answer in SI units
const form = document.querySelector("#si_velocity_calc");
form.addEventListener("change", siAnswer);
element.addEventListener("keyup", siAnswer);
secondElement.addEventListener("click", siAnswer);
dElement.addEventListener("keyup", siAnswer);
dSecondElement.addEventListener("click", siAnswer);
tElement.addEventListener("keyup", siAnswer);
tSecondElement.addEventListener("click", siAnswer);
function siAnswer() {
  if (document.getElementById("si_ms").checked) {
    document.getElementById("si_velocity_answer").innerHTML =
      (distance / time).toFixed(3) + "<span> ms<sup>-1</sup></span>";
  }
  if (document.getElementById("si_m").checked) {
    document.getElementById("si_velocity_answer").innerHTML =
      (velocity * time).toFixed(3) + "<span> m</span>";
  }
  if (document.getElementById("si_s").checked) {
    document.getElementById("si_velocity_answer").innerHTML =
      (distance * velocity).toFixed(3) + "<span> s</span>";
  }
}