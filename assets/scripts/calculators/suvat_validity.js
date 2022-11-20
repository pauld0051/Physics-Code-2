// Validation - so long all constants and variables are named similarly
// this validation script should work for all pages

// ************** Prevent Default Error ******************* //
document.querySelector("form").addEventListener(
    "invalid",
    function(event) {
        event.preventDefault();
    },
    true
);

// **************** FORMS and BUTTONS ********************* //
const formE = document.getElementById("SubmissionForm");
const calcButton = document.getElementById("submitButton");

// *************** Query Input Boxes ********************** //
const sE = document.getElementById("inputDistance");
const uE = document.getElementById("inputVi");
const vE = document.getElementById("inputVf");
const aE = document.getElementById("inputAcceleration");
const tE = document.getElementById("inputTime");

// *************** Query Check Boxes ********************** //
const cbs = document.querySelector("#displacement");
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

// ******** Count Checkboxes and Check Validity ********** //
cbs.onchange = function() {
    if (isNaN(sE.value));
    calcButton.disabled = true;
    sE.disabled = !this.checked;
    sE.required = this.checked;
    selectS.disabled = !this.checked;
    selectS.value = "m";
    sE.value = "";
};
cbu.onchange = function() {
    if (isNaN(uE.value));
    calcButton.disabled = true;
    uE.disabled = !this.checked;
    uE.required = this.checked;
    selectU.disabled = !this.checked;
    selectU.value = "ms";
    uE.value = "";
};
cbv.onchange = function() {
    if (isNaN(vE.value));
    calcButton.disabled = true;
    vE.disabled = !this.checked;
    vE.required = this.checked;
    selectV.disabled = !this.checked;
    selectV.value = "ms";
    vE.value = "";
};
cba.onchange = function() {
    if (isNaN(aE.value));
    calcButton.disabled = true;
    aE.disabled = !this.checked;
    aE.required = this.checked;
    selectA.disabled = !this.checked;
    selectA.value = "mss";
    aE.value = "";
};
cbt.onchange = function() {
    if (isNaN(tE.value));
    calcButton.disabled = true;
    tE.disabled = !this.checked;
    tE.required = this.checked;
    selectT.disabled = !this.checked;
    selectT.value = "s";
    tE.value = "";
};

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
// Listen for displacement changes
sE.addEventListener("input", (e) => {
    let reportS = sE.reportValidity();
    let reportU = uE.reportValidity();
    let reportV = vE.reportValidity();
    let reportA = aE.reportValidity();
    let reportT = tE.reportValidity();
    let selector = '[type="number"]:disabled';
    let disabled = document.querySelectorAll(selector);
    if (
        reportS === false ||
        reportU === false ||
        reportV === false ||
        reportA === false ||
        reportT === false ||
        disabled.length > 2
    ) {
        e.preventDefault();
        calcButton.disabled = true;
    } else {
        calcButton.disabled = false;
    }
});
// Listen for initial velocity changes
uE.addEventListener("input", (e) => {
    let reportS = sE.reportValidity();
    let reportU = uE.reportValidity();
    let reportV = vE.reportValidity();
    let reportA = aE.reportValidity();
    let reportT = tE.reportValidity();
    let selector = '[type="number"]:disabled';
    let disabled = document.querySelectorAll(selector);
    if (
        reportS === false ||
        reportU === false ||
        reportV === false ||
        reportA === false ||
        reportT === false ||
        disabled.length > 2
    ) {
        e.preventDefault();
        calcButton.disabled = true;
    } else {
        calcButton.disabled = false;
    }
});
// Listen for final velocity changes
vE.addEventListener("input", (e) => {
    let reportS = sE.reportValidity();
    let reportU = uE.reportValidity();
    let reportV = vE.reportValidity();
    let reportA = aE.reportValidity();
    let reportT = tE.reportValidity();
    let selector = '[type="number"]:disabled';
    let disabled = document.querySelectorAll(selector);
    if (
        reportS === false ||
        reportU === false ||
        reportV === false ||
        reportA === false ||
        reportT === false ||
        disabled.length > 2
    ) {
        e.preventDefault();
        calcButton.disabled = true;
    } else {
        calcButton.disabled = false;
    }
});
// Listen for selection changes for gravity
selectA.addEventListener("change", (e) => {
    let reportS = sE.reportValidity();
    let reportU = uE.reportValidity();
    let reportV = vE.reportValidity();
    let reportA = aE.reportValidity();
    let reportT = tE.reportValidity();
    let selector = '[type="number"]:disabled';
    let disabled = document.querySelectorAll(selector);
    if (
        reportS === false ||
        reportU === false ||
        reportV === false ||
        reportA === false ||
        reportT === false ||
        aE.value === 0 ||
        disabled.length > 2
    ) {
        e.preventDefault();
        calcButton.disabled = true;
    } else {
        calcButton.disabled = false;
    }
});
// Listen for acceleration changes
aE.addEventListener("input", (e) => {
    let reportS = sE.reportValidity();
    let reportU = uE.reportValidity();
    let reportV = vE.reportValidity();
    let reportA = aE.reportValidity();
    let reportT = tE.reportValidity();
    let selector = '[type="number"]:disabled';
    let disabled = document.querySelectorAll(selector);
    if (
        reportS === false ||
        reportU === false ||
        reportV === false ||
        reportA === false ||
        reportT === false ||
        disabled.length > 2
    ) {
        e.preventDefault();
        calcButton.disabled = true;
    } else {
        calcButton.disabled = false;
    }
});
// Listen for time changes
tE.addEventListener("input", (e) => {
    let reportS = sE.reportValidity();
    let reportU = uE.reportValidity();
    let reportV = vE.reportValidity();
    let reportA = aE.reportValidity();
    let reportT = tE.reportValidity();
    let selector = '[type="number"]:disabled';
    let disabled = document.querySelectorAll(selector);
    if (
        reportS === false ||
        reportU === false ||
        reportV === false ||
        reportA === false ||
        reportT === false ||
        disabled.length > 2
    ) {
        e.preventDefault();
        calcButton.disabled = true;
    } else {
        calcButton.disabled = false;
    }
});