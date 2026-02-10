/* ========================================
   Navigation
   ======================================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll - navbar background
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/* ========================================
   Active Nav Link on Scroll
   ======================================== */
const sections = document.querySelectorAll('section');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

/* ========================================
   Typing Animation
   ======================================== */
const typingElement = document.getElementById('typing-text');
const phrases = [
  'Spatial-temporal Data Mining',
  'Topological Data Analysis',
  'Urban Informatics'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeEffect() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    typingElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 400; // pause before next phrase
  }

  setTimeout(typeEffect, typeSpeed);
}

typeEffect();

/* ========================================
   Scroll Reveal Animation
   ======================================== */
function initReveal() {
  const revealTargets = document.querySelectorAll(
    '.about-text, .about-details, .project-card, .publication-item, .skills-section, .timeline-section'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealTargets.forEach(el => observer.observe(el));
}

initReveal();
