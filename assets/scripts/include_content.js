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

