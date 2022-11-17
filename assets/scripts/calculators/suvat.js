//prevent the browser from showing default error bubble / hint
document.querySelector("form").addEventListener(
    "invalid",
    function(event) {
        event.preventDefault();
    },
    true
);

//disable checkboxes when a max 3 have been selected
var $checkboxes = $(".suvat-check input[type=checkbox]");
var $submitButton = $("#submitButton");
var $accelerationSelect = $("#acceleration");
$checkboxes.on("change", function() {
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

//enable inputs based on checked box (up to 3 possible)
document.getElementById("displacement").onchange = function() {
    document.getElementById("inputDistance").disabled = !this.checked;
};
document.getElementById("initial_velocity").onchange = function() {
    document.getElementById("inputVi").disabled = !this.checked;
};
document.getElementById("final_velocity").onchange = function() {
    document.getElementById("inputVf").disabled = !this.checked;
};
document.getElementById("acceleration").onchange = function() {
    document.getElementById("inputAcceleration").disabled = !this.checked;
};
document.getElementById("time").onchange = function() {
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
//if vf is 0 then a must be a negative
document
    .getElementById("inputVf")
    .addEventListener("keyup", negativeAcceleration);
document
    .getElementById("inputVf")
    .addEventListener("click", negativeAcceleration);
document
    .getElementById("inputVf")
    .addEventListener("change", negativeAcceleration);
document
    .getElementById("inputAcceleration")
    .addEventListener("keyup", negativeAcceleration);
document
    .getElementById("inputAcceleration")
    .addEventListener("click", negativeAcceleration);
document
    .getElementById("inputAcceleration")
    .addEventListener("change", negativeAcceleration);

function negativeAcceleration() {
    const v = parseFloat(document.getElementById("inputVf").value);
    const a = parseFloat(document.getElementById("inputAcceleration").value);
    const s = parseFloat(document.getElementById("inputDistance").value);
    if (
        (v1.checked && a1.checked && v === 0 && a > 0) ||
        (v1.checked && a1.checked && Math.pow(v, 2) < 2 * a * s && a > 0)
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
    let s = parseFloat(document.getElementById("inputDistance").value);
    let u = parseFloat(document.getElementById("inputVi").value);
    let v = parseFloat(document.getElementById("inputVf").value);
    let a = parseFloat(document.getElementById("inputAcceleration").value);
    let t = parseFloat(document.getElementById("inputTime").value);

    // *************************************************************** //
    // User input units - change everything to metric for calculations //
    // *************************************************************** //

    // Distance/Displacement //
    const dUnit = document.getElementById("unitsDistance").value;
    if (dUnit === "km") {
        s = s * 1000;
    }
    if (dUnit === "yd") {
        s = s / 1.09361;
    }
    if (dUnit === "mi") {
        s = s / 0.000621371;
    }
    if (dUnit === "ft") {
        s = s / 3.28084;
    }
    if (isNaN(s)) s = 0;

    // Initial Velocity //
    const uUnit = document.getElementById("unitsVi").value;
    const uMax = document.getElementById("inputVi");
    if (uUnit === "ms") {
        u = u;
        uMax.setAttribute("max", 299792458);
    }
    if (uUnit === "kmh") {
        u = u / 3.6;
        uMax.setAttribute("max", 1079252848.7999);
    }
    if (uUnit === "mph") {
        u = u * 0.44704;
        uMax.setAttribute("max", 670616628.89);
    }
    if (uUnit === "fts") {
        u = u / 3.28084;
        uMax.setAttribute("max", 983571087.18);
    }
    if (isNaN(u)) u = 0;

    // Final Velocity //
    const vUnit = document.getElementById("unitsVf").value;
    const vMax = document.getElementById("inputVf");
    if (vUnit === "ms") {
        v = v;
        vMax.setAttribute("max", 299792458);
    }
    if (vUnit === "kmh") {
        v = v / 3.6;
        vMax.setAttribute("max", 1079252848.7999);
    }
    if (vUnit === "mph") {
        v = v * 0.44704;
        vMax.setAttribute("max", 670616628.89);
    }
    if (vUnit === "fts") {
        v = v / 3.28084;
        vMax.setAttribute("max", 983571087.18);
    }
    if (isNaN(v)) v = 0;

    // Time //
    const tUnit = document.getElementById("unitsTime").value;
    if (tUnit === "min") {
        t = t * 60;
    }
    if (tUnit === "hr") {
        t = t * 3600;
    }
    if (tUnit === "days") {
        t = t * 86400;
    }
    if (isNaN(t)) t = 0;
    if (!s1.checked && u1.checked && v1.checked && a1.checked && t1.checked) {
        //**************//
        // Calculations //
        //**************//

        //Equation 1 s only - not used
        s = u * t + 0.5 * a * Math.pow(t, 2);
        document.getElementById("inputDistance").value = s.toFixed(3);
        document.getElementById("s").innerHTML =
            result.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} s = ut + \frac{1}{2}  at^{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (!s1.checked &&
        !u1.checked &&
        v1.checked &&
        a1.checked &&
        t1.checked
    ) {
        //equation 2 s and u only
        u = v - a * t;
        s = u * t + 0.5 * a * Math.pow(t, 2);
        document.getElementById("inputVi").value = u.toFixed(3);
        document.getElementById("inputDistance").value = s.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} s\ =\ ut\ +\ \frac{1}{2} \ at^{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (!s1.checked &&
        u1.checked &&
        !v1.checked &&
        a1.checked &&
        t1.checked
    ) {
        //equation 3 s and v only
        v = u + a * t;
        s = u * t + 0.5 * a * Math.pow(t, 2);
        document.getElementById("inputVf").value = v.toFixed(3);
        document.getElementById("inputDistance").value = s.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} s\ =\ ut\ +\ \frac{1}{2} \ at^{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (!s1.checked &&
        u1.checked &&
        v1.checked &&
        !a1.checked &&
        t1.checked
    ) {
        //equation 4 s and a only
        a = (v - u) / t;
        s = u * t + 0.5 * a * Math.pow(t, 2);
        document.getElementById("inputAcceleration").value = a.toFixed(3);
        document.getElementById("inputDistance").value = s.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} s\ =\ ut\ +\ \frac{1}{2} \ at^{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (!s1.checked &&
        u1.checked &&
        v1.checked &&
        a1.checked &&
        !t1.checked
    ) {
        //equation 5 s and t only
        t = (v - u) / a;
        s = u * t + 0.5 * a * Math.pow(t, 2);
        document.getElementById("inputTime").value = t.toFixed(3);
        document.getElementById("inputDistance").value = s.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} s\ =\ ut\ +\ \frac{1}{2} \ at^{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (
        s1.checked &&
        !u1.checked &&
        v1.checked &&
        a1.checked &&
        t1.checked
    ) {
        //equation 6 u only - not used
        u = v - a * t;
        document.getElementById("inputVi").value = u.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
    } else if (
        s1.checked &&
        !u1.checked &&
        !v1.checked &&
        a1.checked &&
        t1.checked
    ) {
        //equation 7 u and v only
        u = s / t - (a * t) / 2;
        v = u + a * t;
        document.getElementById("inputVi").value = u.toFixed(3);
        document.getElementById("inputVf").value = v.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} s\ =\ ut\ +\ \frac{1}{2} \ at^{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (
        s1.checked &&
        !u1.checked &&
        v1.checked &&
        !a1.checked &&
        t1.checked
    ) {
        //equation 8 u and a only
        u = (2 * s) / t - v;
        a = (v - u) / t;
        document.getElementById("inputVi").value = u.toFixed(3);
        document.getElementById("inputAcceleration").value = a.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} s=\frac{( u\ +\ v) \ t}{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (
        s1.checked &&
        !u1.checked &&
        v1.checked &&
        a1.checked &&
        !t1.checked
    ) {
        //equation 9 u and t only - if this outputs negative, this is a massive issue!
        u = Math.sqrt(Math.pow(v, 2) - 2 * a * s);
        t = (v - u) / a;
        document.getElementById("inputVi").value = u.toFixed(3);
        document.getElementById("inputTime").value = t.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} v^{2} =u^{2} +2as\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (
        s1.checked &&
        u1.checked &&
        !v1.checked &&
        a1.checked &&
        t1.checked
    ) {
        //equation 10 v only - not used
        v = u + a * t;
        document.getElementById("inputVf").value = v.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            result.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
    } else if (
        s1.checked &&
        u1.checked &&
        !v1.checked &&
        !a1.checked &&
        t1.checked
    ) {
        //equation 11 v and a only
        v = (2 * s) / t - u;
        a = (v - u) / t;
        document.getElementById("inputVf").value = v.toFixed(3);
        document.getElementById("inputAcceleration").value = a.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} v\ =\ u+at\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} v^{2} =u^{2} +2as\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (
        s1.checked &&
        u1.checked &&
        !v1.checked &&
        a1.checked &&
        !t1.checked
    ) {
        //equation 12 v and t only
        v = Math.sqrt(Math.pow(u, 2) + 2 * a * s);
        t = (v - u) / a;
        document.getElementById("inputVf").value = v.toFixed(3);
        document.getElementById("inputTime").value = t.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} s=\frac{( u\ +\ v) \ t}{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} v^{2} =u^{2} +2as\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (
        s1.checked &&
        u1.checked &&
        v1.checked &&
        !a1.checked &&
        t1.checked
    ) {
        //equation 13 a only - not used
        a = (v - u) / t;
        document.getElementById("inputAcceleration").value = a.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
    } else if (
        s1.checked &&
        u1.checked &&
        v1.checked &&
        !a1.checked &&
        !t1.checked
    ) {
        //equation 14 a and t only
        a = ((v - u) * (v + u)) / (2 * s);
        t = (v - u) / a;
        document.getElementById("inputAcceleration").value = a.toFixed(3);
        document.getElementById("inputTime").value = t.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
        //MathJax insertion
        document.getElementById(
            "si_suvat_equation2"
        ).innerHTML = String.raw `<span>$$\begin{gather} s=\frac{( u\ +\ v) \ t}{2}\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
        document.getElementById(
            "si_suvat_equation"
        ).innerHTML = String.raw `<span>$$\begin{gather} v^{2} =u^{2} +2as\\ \notag \end{gather}$$</span>`;
        MathJax.typeset();
    } else if (
        s1.checked &&
        u1.checked &&
        v1.checked &&
        a1.checked &&
        !t1.checked
    ) {
        //equation 15 t only - not used
        t = (v - u) / a;
        document.getElementById("inputTime").value = t.toFixed(3);
        document.getElementById("s").innerHTML = s.toFixed(3) + "<span> m</span>";
        document.getElementById("u").innerHTML =
            u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("v").innerHTML =
            v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
        document.getElementById("a").innerHTML =
            a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
        document.getElementById("t").innerHTML = t.toFixed(3) + "<span> s</span>";
    }
    //*************************************************** */
    //               Populate Table 2                     */
    //*************************************************** */
    // SI Units //
    document.getElementById("sx").innerHTML = s.toFixed(3) + "<span> m</span>";
    document.getElementById("ux").innerHTML =
        u.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("vx").innerHTML =
        v.toFixed(3) + "<span> ms<sup>-1</sup></span>";
    document.getElementById("ax").innerHTML =
        a.toFixed(3) + "<span> ms<sup>-2</sup></span>";
    document.getElementById("tx").innerHTML = t.toFixed(3) + "<span> s</span>";
    // km, km/h, min //
    document.getElementById("s1x").innerHTML =
        (s / 1000).toFixed(3) + "<span> km</span>";
    document.getElementById("u1x").innerHTML =
        (u * 3.6).toFixed(3) + "<span> kmh<sup>-1</sup></span>";
    document.getElementById("v1x").innerHTML =
        (v * 3.6).toFixed(3) + "<span> kmh<sup>-1</sup></span>";
    document.getElementById("t1x").innerHTML =
        (t / 60).toFixed(3) + "<span> min</span>";
    // mi, mph, hr //
    document.getElementById("s2x").innerHTML =
        (s * 0.0006213712).toFixed(3) + "<span> mi</span>";
    document.getElementById("u2x").innerHTML =
        (u * 2.2369362921).toFixed(3) + "<span> mph</span>";
    document.getElementById("v2x").innerHTML =
        (v * 2.2369362921).toFixed(3) + "<span> mph</span>";
    document.getElementById("t2x").innerHTML =
        (t / 3600).toFixed(3) + "<span> hr</span>";
    // yd, ft/s, day, ft //
    document.getElementById("s3x").innerHTML =
        (s * 1.0936132983).toFixed(3) + "<span> yd</span>";
    document.getElementById("u3x").innerHTML =
        (u * 3.280839895).toFixed(3) + "<span> fts<sup>-1</sup></span>";
    document.getElementById("v3x").innerHTML =
        (v * 3.280839895).toFixed(3) + "<span> fts<sup>-1</sup></span>";
    document.getElementById("t3x").innerHTML =
        (t / 86400).toFixed(3) + "<span> day</span>";
    document.getElementById("s4x").innerHTML =
        (s * 3.280839895).toFixed(3) + "<span> ft</span>";
}

//reset the form including checkboxes for new entry
const form = document.querySelector("form");
form.addEventListener("reset", (e) => {
    form.lastElementChild.disabled = false;
    form.querySelectorAll("input").forEach((inp) => (inp.disabled = true));
    form
        .querySelectorAll("[type=checkbox]:disabled")
        .forEach((cb) => (cb.disabled = false));
});