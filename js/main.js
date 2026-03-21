/* =========================
   HERO SLIDER
========================= */

let slides = document.querySelectorAll(".slide");
let slideIndex = 0;

function showNextSlide() {
  slides[slideIndex].classList.remove("active");

  slideIndex = (slideIndex + 1) % slides.length;

  slides[slideIndex].classList.add("active");
}

setInterval(showNextSlide, 4000);


/* =========================
   COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

  const target = +counter.getAttribute("data-target");

  const updateCounter = () => {

    const current = +counter.innerText;

    const increment = Math.ceil(target / 100);

    if (current < target) {
      counter.innerText = current + increment;
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }

  };

  updateCounter();

});


/* =========================
   TESTIMONIAL SLIDER
========================= */

let testimonials = document.querySelectorAll(".testimonial");
let testimonialIndex = 0;

function showNextTestimonial() {

  testimonials[testimonialIndex].classList.remove("active");

  testimonialIndex = (testimonialIndex + 1) % testimonials.length;

  testimonials[testimonialIndex].classList.add("active");

}

setInterval(showNextTestimonial, 5000);


/* =========================
   BACK TO TOP BUTTON
========================= */

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
