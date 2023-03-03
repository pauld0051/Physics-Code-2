// Get the input fields and units
const qInput = document.getElementById('q-input');
const qUnit = document.getElementById('q-unit');
const mInput = document.getElementById('m-input');
const mUnit = document.getElementById('m-unit');
const cInput = document.getElementById('c-input');
const cUnit = document.getElementById('c-unit');
const dtInput = document.getElementById('dt-input');
const dtUnit = document.getElementById('dt-unit');

// Define a function to convert between units
function convert(value, fromUnit, toUnit) {
    // Define conversion factors
    const factors = {
        'J': 1,
        'kJ': 1000,
        'Btu': 1055,
        'g': 1,
        'kg': 1000,
        'lb': 453.592,
        'J/kg·K': 1,
        'J/g·K': 1000,
        'J/mol·K': 1,
        'cal/g·K': 4.184,
        'Btu/lb·°F': 4186.8 / 453.592 / 1.8,
        'kJ/kg·K': 1,
        'cal/mol·K': 4.184,
        '°C': 1,
        '°F': 5 / 9,
        'K': 1
    };

    // Convert value from fromUnit to J or K
    const valueInJ = value * factors[fromUnit];

    // Convert value from J or K to toUnit
    const valueInToUnit = valueInJ / factors[toUnit];

    // Return the converted value
    return valueInToUnit;
}

// Define a function to calculate the specific heat
function calculateSpecificHeat() {
    // Get the input values and units
    const q = qInput.value;
    const qUnitValue = qUnit.value;
    const m = mInput.value;
    const mUnitValue = mUnit.value;
    const c = cInput.value;
    const cUnitValue = cUnit.value;
    const dt = dtInput.value;
    const dtUnitValue = dtUnit.value;

    // Convert the input values to SI units
    const qInJ = convert(q, qUnitValue, 'J');
    const mInKg = convert(m, mUnitValue, 'kg');
    const dtInK = convert(dt, dtUnitValue, 'K');
    const cInJPerKgK = convert(c, cUnitValue, 'J/kg·K');

    // Calculate the specific heat
    const specificHeat = qInJ / (mInKg * dtInK);

    // Display the result
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Specific Heat: ${specificHeat.toFixed(2)} J/kg·K`;
}

// Call the calculateSpecificHeat function whenever a change occurs in the input fields
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => input.addEventListener('change', calculateSpecificHeat));
