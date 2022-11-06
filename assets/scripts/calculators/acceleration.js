//convert accelerations into m/s/s regardless of choice of unit
aElement = document.getElementById("inputAcceleration");
aSecondElement = document.getElementById("aUnits");
aElement.addEventListener("keyup", aConvert);
aSecondElement.addEventListener("click", aConvert);

function aConvert() {
    let a = parseFloat(aElement.value);
    let unit = document.getElementById("aUnits").value;
    let aResult;
    if (unit === "mss") {
        aResult = a;
        if (isNaN(aResult)) aResult = 0;
        //results in Table 2
        document.getElementById("mss").innerHTML =
            aResult.toFixed(4) + "<span> ms<sup>-2</sup></span>";
        acceleration = aResult;
    }
}

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
        element.setAttribute("max", 299792458);
    }
    if (unit === "kmh") {
        result = vi / 3.6;
        element.setAttribute("max", 1079252848.7999);
    }
    if (unit === "mph") {
        result = vi * 0.44704;
        element.setAttribute("max", 670616628.89);
    }
    if (unit === "fts") {
        result = vi / 3.28084;
        element.setAttribute("max", 983571087.18);
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
const form = document.querySelector("#si_acceleration_calc");
form.addEventListener("change", siAnswer);
aElement.addEventListener("keyup", siAnswer);
aSecondElement.addEventListener("click", siAnswer);
element.addEventListener("keyup", siAnswer);
secondElement.addEventListener("click", siAnswer);
tElement.addEventListener("keyup", siAnswer);
tSecondElement.addEventListener("click", siAnswer);

function siAnswer() {
    if (document.getElementById("si_mss").checked) {
        document.getElementById("si_acceleration_answer").innerHTML =
            "<span>Answer = </span>" + (velocity / time).toFixed(4) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("inputAcceleration").value = (velocity / time).toFixed(4);
        document.getElementById("aUnits").selectedIndex = "0";
        aConvert();
        document.getElementById("si_acceleration_equation").innerHTML =
            "<span>v = &#x394v / t</span>" +
            "<br>" +
            "<span>&#x394velocity (&#x394v) = </span>" +
            velocity.toFixed(3) +
            " ms<sup>-1</sup>" +
            "<br>" +
            "<span>time (t) = </span>" +
            time.toFixed(3) +
            " s" +
            "<br>" +
            "<span>&#x394velocity (&#x394v) / time (t) = </span>" +
            velocity.toFixed(3) +
            " / " +
            time.toFixed(3) +
            " ms<sup>-2</sup>";
    }
    if (document.getElementById("si_ms").checked) {
        document.getElementById("si_acceleration_answer").innerHTML =
          "<span>Answer = </span>" +
          (acceleration * time).toFixed(3) +
          "<span> m</span>";
        document.getElementById("inputVelocity").value = (acceleration * time).toFixed(3);
        document.getElementById("units").selectedIndex = "1";
        convert();
        document.getElementById("si_acceleration_equation").innerHTML =
          "<span>&#x394v = a * t</span>" +
          "<br>" +
          "<span>acceleration (a) = </span>" +
          velocity.toFixed(3) +
          " ms<sup>-2</sup>" +
          "<br>" +
          "<span>time (t) = </span>" +
          time.toFixed(3) +
          " s" +
          "<br>" +
          "<span>acceleration (a) * time (t) = </span>" +
          velocity.toFixed(3) +
          " * " +
          time.toFixed(3) +
          " ms<sup>-1</sup>";
    }
    if (document.getElementById("si_s").checked) {
        document.getElementById("si_acceleration_answer").innerHTML =
          "<span>Answer = </span>" +
          (velocity / acceleration).toFixed(3) +
          "<span> s</span>";
        document.getElementById("inputTime").value = (velocity / acceleration).toFixed(3);
        document.getElementById("unitsTime").selectedIndex = "0";
        tConvert();
        document.getElementById("si_acceleration_equation").innerHTML =
          "<span>t = &#x394v / a</span>" +
          "<br>" +
          "<span>&#x394velocity (&#x394v) = </span>" +
          velocity.toFixed(3) +
          " ms<sup>-1</sup>" +
          "<br>" +
          "<span>acceleration (a) = </span>" +
          acceleration.toFixed(3) +
          " ms<sup>-2</sup>" +
          "<br>" +
          "<span>&#x394velocity (&#x394v) / acceleration (a) = </span>" +
          velocity.toFixed(3) +
          " / " +
          acceleration.toFixed(3) +
          " s";
    }
}