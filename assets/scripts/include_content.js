function includeHTML(fileName, destination) {
  let xhr = new XMLHttpRequest();

  // Establish the callback:
  xhr.onreadystatechange = function () {
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

// Popovers (Bootstrap)
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
// Allow popover entries to accept HTML mark-up.
$(function() {
  $('[data-toggle="popover"]').popover({
    html: true
  });
  $('[title="popover"]').popover({
    html: true
  });
});

// disable mousewheel on an input number field when in focus
// (Prevents an accidental change in input values when scrolling on the page)
$('form').on('focus', 'input[type=number]', function(e) {
  $(this).on('wheel.disableScroll', function(e) {
    e.preventDefault();
  });
});
$('form').on('blur', 'input[type=number]', function(e) {
  $(this).off('wheel.disableScroll');
})
