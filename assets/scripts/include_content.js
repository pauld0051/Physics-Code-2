function includeHTML(fileName, destination) {
    let xhr = new XMLHttpRequest();

    // Establish the callback:
    xhr.onreadystatechange = function() {
        // Is the response ready?
        if (this.readyState == 4) {
            // Was the response successful?
            if (this.status == 200) {
                destination.innerHTML = this.responseText;
            } else {
                console.log("Response was received but not successful.");
            }
        } else {
            console.log("Response is not ready.");
        }
    };

    // Initiate the request:
    xhr.open("GET", fileName, true);
    xhr.send();
}

// Validate inputs
function validateInputs() {
  const inputs = document.querySelectorAll('.maxAllow');
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.disabled) {
      continue;
    }
    const inputName = input.name.replace('input', '').replace(/([A-Z])/g, ' $1').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const step = parseFloat(input.step);
    const value = parseFloat(input.value);
    const stepDecimalPlaces = input.getAttribute('step') && input.getAttribute('step').split('.')[1] ? input.getAttribute('step').split('.')[1].length : 0;
    const valueDecimalPlaces = value.toString().split('.')[1] ? value.toString().split('.')[1].length : 0;
    if (!isNaN(step) && value < step || valueDecimalPlaces > stepDecimalPlaces) {
      showAlert(`Invalid input for ${inputName}. Please enter a value that is greater than or equal to ${step}.`, input.id);
      return false;
    }
    if (isNaN(value)) {
      showAlert(`Invalid input for ${inputName}. Please enter a valid number.`, input.id);
      return false;
    }
    if (value < min || value > max) {
      showAlert(`Invalid input for ${inputName}. Please enter a value between ${min} and ${max}.`, input.id);
      return false;
    }
    if (input.value.trim() === '') {
      showAlert(`Please enter a value for ${inputName}.`, input.id);
      return false;
    }
    const regex = /^-?\d*\.?\d+(e[-+]?\d+)?$/i;
    if (!regex.test(input.value)) {
      showAlert(`Invalid input for ${inputName}. Please enter a valid number.`, input.id);
      return false;
    }
    removeCardBorder();
  }
  return true;
}

// End of validate inputs


// Call the function with the file to include and a reference to the
// element to populate with the contents
includeHTML("header.html", document.querySelector(".header"));
includeHTML("footer.html", document.querySelector(".footer"));

// Call popovers into action and close them on next click
document.addEventListener("DOMContentLoaded", function () {
  try {
    const popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      const popover = new bootstrap.Popover(popoverTriggerEl, {
        html: true,
        trigger: 'click'
      });
      popoverTriggerEl.addEventListener('shown.bs.popover', function () {
        document.addEventListener('click', function onDocClick(event) {
          if (!popoverTriggerEl.contains(event.target)) {
            popover.hide();
            document.removeEventListener('click', onDocClick);
          }
        });
      });
      return popover;
    });
  } catch (e) {
    console.error(e);
  }
});

// disable mousewheel on an input number field when in focus
// (Prevents an accidental change in input values when scrolling on the page)
$("form").on("focus", "input[type=number]", function(e) {
    $(this).on("wheel.disableScroll", function(e) {
        e.preventDefault();
    });
});
$("form").on("blur", "input[type=number]", function(e) {
    $(this).off("wheel.disableScroll");
});

// Show Alert Boxes
let lastInvalidCard = null;

function showAlert(message, inputId) {
  const alertContainer = document.getElementById('alert-container');
  const alertBox = document.getElementById('alert-box');
  const alertMessage = document.getElementById('alert-message');
  const alertClose = document.getElementById('alert-close');

  alertMessage.innerText = message;
  alertBox.setAttribute('aria-label', `Alert: ${message}`);
  alertContainer.style.display = 'flex';

alertClose.addEventListener('click', () => {
  alertContainer.style.display = 'none';
  if (inputId) {
    const inputField = document.getElementById(inputId);
    inputField.focus();
    const newInvalidCard = inputField.closest('.card');
    if (lastInvalidCard !== null) {
      lastInvalidCard.classList.remove('border', 'border-danger', 'border-3', 'shadow-lg');
    }
    newInvalidCard.classList.add('border', 'border-3', 'border-danger', 'shadow-lg');
    lastInvalidCard = newInvalidCard;
  }
  // Scroll to the invalid input field
  const invalidInputField = document.getElementById(inputId);
  invalidInputField.scrollIntoView({
    behavior: 'smooth', block: 'center'
  });
});
}

// Remove any borders from cards
function removeCardBorder() {
  const cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.classList.remove('border', 'border-danger', 'border-3', 'shadow-lg');
  }
}

// Use scientific notation for big and small numbers:
const scientificNotation = (number) => {
  if (number === 0) {
    return "0";
  } else if (number < 0) {
    return "-" + scientificNotation(Math.abs(number));
  } else if (number < 0.01) {
    return number.toExponential(4).replace("e-", " x 10<sup>-") + "</sup>";
  } else if (number >= 10000) {
    return number.toExponential(4).replace("e+", " x 10<sup>") + "</sup>";
  } else {
    return number.toFixed(4);
  }
};

