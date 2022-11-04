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
    dResult = di * 0.44704;
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
}