document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-form-feedback');

  let activeIndex = 0;

  function updateTestimonials() {
    testimonialCards.forEach((card, index) => {
      card.classList.toggle('active', index === activeIndex);
    });
  }

  function showNextTestimonial() {
    activeIndex = (activeIndex + 1) % testimonialCards.length;
    updateTestimonials();
  }

  function showPrevTestimonial() {
    activeIndex = (activeIndex - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonials();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('open');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', showNextTestimonial);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', showPrevTestimonial);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const fullName = document.getElementById('full-name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!fullName.value.trim() || !email.value.trim() || !message.value.trim()) {
        feedback.textContent = 'Please complete all required fields before sending.';
        feedback.style.color = '#e03e2d';
        return;
      }

      const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailPattern.test(email.value.trim())) {
        feedback.textContent = 'Enter a valid email address.';
        feedback.style.color = '#e03e2d';
        email.focus();
        return;
      }

      feedback.textContent = 'Thank you! Your message has been received. We will respond shortly.';
      feedback.style.color = '#88c720';
      contactForm.reset();
    });
  }

  updateTestimonials();

  if (window.AOS) {
    window.AOS.init({ duration: 800, once: true, offset: 120 });
  }
});
