// AOS
AOS.init({
  once: true,
  startEvent: 'DOMContentLoaded',
  duration: 1000,
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("hamburger-icon");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  var x = window.matchMedia("(max-width: 865px)");
  if (x.matches) modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Swiper
//   all ------------------
function initParadoxWay() {
  "use strict";

  if ($(".testimonials-carousel").length > 0) {
    var j2 = new Swiper(".testimonials-carousel .swiper-container", {
      preloadImages: false,
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      mousewheel: false,
      centeredSlides: true,
      pagination: {
        el: ".tc-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".listing-carousel-button-next",
        prevEl: ".listing-carousel-button-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }

  // bubbles -----------------

  setInterval(function () {
    // var size = randomValue(sArray);
    $(".bubbles").append(
      '<div class="individual-bubble" style="left: ' +
        5 +
        "px; width: " +
        5 +
        "px; height:" +
        5 +
        'px;"></div>'
    );
    $(".individual-bubble").animate(
      {
        bottom: "100%",
        opacity: "-=0.7",
      },
      4000,
      function () {
        $(this).remove();
      }
    );
  }, 350);
}

//   Init All ------------------
$(document).ready(function () {
  initParadoxWay();
});

const gallery_col = document.querySelectorAll(".column");

// scroll to top
//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$(document).ready(function () {
  // let date = new Date();
  // let year = date.getFullYear();
  // let month = date.getMonth() + 1;
  // let dt = date.getDate();

  // if (dt < 10) {
  //   dt = "0" + dt;
  // }
  // if (month < 10) {
  //   month = "0" + month;
  // }

  // let new_date = year+'-' + month + '-'+dt

  // $('#date').min = new_date;
  // Send mail
  const appointment_form = $("#book-appointment-form");

  appointment_form.on("submit", function (e) {
    e.preventDefault();

    let spinner = `<div class="d-flex align-items-center justify-content-center">
      <div class="spinner-border spinner-border-sm text-light" role="status">
          <span class="sr-only">Loading...</span>
          </div>
          <span class="ml-2" style="font-size: 0.9rem;">Confirming...</span>
      </div>`;

    $("#confirm-booking").attr("disabled", true);
    $("#confirm-booking").html(spinner);

    const nameOfClient = $("#name").val();
    const phone = $("#phone").val();
    const date = $("#date").val();
    const time = $("#time").val();
    const service_needed = $("#service-needed").val();

    const output = `<h2>New Appointment</h2>
                    <p><strong>Name: </strong>${nameOfClient}</p>
                    <p><strong>Phone: </strong>${phone}</p>
                    <p><strong>Date: </strong>${date}</p>
                    <p><strong>Time: </strong>${time}</p>
                    <p><strong>Service Needed: </strong>${service_needed}</p>`;

    const data = {
      to: "mail@riyazbarbers.com",
      subject: `Appointment from ${nameOfClient}`,
      output: output,
    };

    $.ajax({
      url: "https://kay-mail-sender.herokuapp.com/send",
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: "Appointment booked successfully!",
          confirmButtonColor: "#ce9f2b",
        });

        $("#confirm-booking").attr("disabled", false);
        $("#confirm-booking").html("Confirm Booking");
        appointment_form[0].reset();
      },
      error: function (xhr, status) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Appointment booking failed! Kindly try again",
          confirmButtonColor: "#e01919",
        });

        $("#confirm-booking").attr("disabled", false);
        $("#confirm-booking").html("Confirm Booking");
      },
    });
  });

  // contact form
  const contact_form = $("#contact-us-form");

  contact_form.on("submit", function (e) {
    e.preventDefault();

    let spinner = `<div class="d-flex align-items-center justify-content-center">
      <div class="spinner-border spinner-border-sm text-light" role="status">
          <span class="sr-only">Loading...</span>
          </div>
          <span class="ml-2" style="font-size: 0.9rem;">Sending...</span>
      </div>`;

    $("#contact-us-button").attr("disabled", true);
    $("#contact-us-button").html(spinner);

    const nameOfClient = $("#contact-us-name").val();
    const emailOfCient = $("#contact-us-email").val();
    const phone = $("#contact-us-phone").val();
    const subject = $("#contact-us-subject").val();
    const message = $("#contact-us-message").val();

    const output = `<h2>New Contact</h2>
                    <p><strong>Name: </strong>${nameOfClient}</p>
                    <p><strong>Email: </strong>${emailOfCient}</p>
                    <p><strong>Phone: </strong>${phone}</p>
                    <p><strong>Date: </strong>${new Date()}</p>
                    <p><strong>Subject: </strong>${subject}</p>
                    <p><strong>Message: </strong>${message}</p>`;

    const data = {
      to: "mail@riyazbarbers.com",
      subject: `Contact from ${nameOfClient}`,
      output: output,
    };

    $.ajax({
      url: "https://kay-mail-sender.herokuapp.com/send",
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: "Your message has been sent!",
          confirmButtonColor: "#ce9f2b",
        });

        $("#contact-us-button").attr("disabled", false);
        $("#contact-us-button").html("Send");
        contact_form[0].reset();
      },
      error: function (xhr, status) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Failed! Kindly try again",
          confirmButtonColor: "#e01919",
        });

        $("#contact-us-button").attr("disabled", false);
        $("#contact-us-button").html("Send");
      },
    });
  });
});
