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
  if (isNaN(vi)) vi = 0;
  document.getElementById("ms").innerHTML =
    result.toFixed(2) + "<span> ms<sup>-1</sup></span>";
  document.getElementById("kmh").innerHTML =
    (result * 3.6).toFixed(2) + "<span> kmh<sup>-1</sup></span>";
  document.getElementById("mph").innerHTML =
    (result / 0.44704).toFixed(2) + "<span> mph</span>";
  document.getElementById("fts").innerHTML =
    (result * 3.28084).toFixed(2) + "<span> fts<sup>-1</sup></span>";
}