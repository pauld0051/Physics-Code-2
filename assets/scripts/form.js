const formE = document.getElementById("SubmissionForm");

const sE = document.getElementById("inputDistance");
const uE = document.getElementById("inputVi");
const vE = document.getElementById("inputVf");
const aE = document.getElementById("inputAcceleration");
const tE = document.getElementById("inputTime");

const errorElement = document.getElementById("error");

formE.addEventListener("submit", (e) => {
let messages = [];
if (sE.value === "" || s.value == null) {
messages.push("Displacement is required");
}

if (uE.value === "" || u.value == null) {
messages.push("Displacement is required");
}

if (vE.value === "" || v.value == null) {
messages.push("Displacement is required");
}

if (aE.value === "" || a.value == null) {
messages.push("Displacement is required");
}

if (tE.value === "" || t.value == null) {
messages.push("Displacement is required");
}

if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(", ");
  }
});