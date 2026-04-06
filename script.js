document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HERO SLIDER + IDIOMA
  ========================= */
  const heroImages = {
    es: [
      "images/hero/hero-es-1.png",
      "images/hero/hero-es-2.png",
      "images/hero/hero-es-3.png"
    ],
    en: [
      "images/hero/hero-en-1.png",
      "images/hero/hero-en-2.png",
      "images/hero/hero-en-3.png"
    ]
  };

  let currentHeroIndex = 0;
  let currentHeroLang = "es";
  let heroInterval;

  const heroImg = document.getElementById("hero-slide-image");
  const langButtons = document.querySelectorAll(".lang-btn");
  const translatableElements = document.querySelectorAll("[data-es][data-en]");

  function updateHeroImage() {
    if (!heroImg) return;
    heroImg.src = heroImages[currentHeroLang][currentHeroIndex];
  }

  function nextHeroSlide() {
    currentHeroIndex = (currentHeroIndex + 1) % heroImages[currentHeroLang].length;
    updateHeroImage();
  }

  function startHeroSlider() {
    clearInterval(heroInterval);
    heroInterval = setInterval(nextHeroSlide, 5000);
  }

  function updateLegalLinks() {
    document.querySelectorAll(".footer-legal a").forEach((link) => {
      const href = link.getAttribute("href");

      if (document.body.classList.contains("english")) {
        if (href === "aviso-legal.html") {
          link.setAttribute("href", "legal-notice.html");
        }
        if (href === "privacidad.html") {
          link.setAttribute("href", "privacy-policy.html");
        }
        if (href === "cookies.html") {
          link.setAttribute("href", "cookies-policy.html");
        }
      } else {
        if (href === "legal-notice.html") {
          link.setAttribute("href", "aviso-legal.html");
        }
        if (href === "privacy-policy.html") {
          link.setAttribute("href", "privacidad.html");
        }
        if (href === "cookies-policy.html") {
          link.setAttribute("href", "cookies.html");
        }
      }
    });
  }

  function setLanguage(lang) {
    currentHeroLang = lang;
    currentHeroIndex = 0;

    document.documentElement.lang = lang;
    document.body.classList.toggle("english", lang === "en");

    translatableElements.forEach((el) => {
      const newText = el.getAttribute(`data-${lang}`);
      if (newText) el.textContent = newText;
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    updateHeroImage();
    startHeroSlider();
    updateLegalLinks();
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  setLanguage("es");


  /* =========================
     CARRUSEL PRODUCTOS
  ========================= */
  document.querySelectorAll(".products-carousel").forEach((carousel) => {
    const slider = carousel.querySelector(".products-slider");
    const btnLeft = carousel.querySelector(".carousel-arrow-left");
    const btnRight = carousel.querySelector(".carousel-arrow-right");

    if (!slider || !btnLeft || !btnRight) return;

    btnLeft.addEventListener("click", () => {
      slider.scrollBy({
        left: -slider.clientWidth,
        behavior: "smooth"
      });
    });

    btnRight.addEventListener("click", () => {
      slider.scrollBy({
        left: slider.clientWidth,
        behavior: "smooth"
      });
    });
  });


  /* =========================
     CARRUSEL TESTIMONIOS
  ========================= */
  const testimonialSlider = document.querySelector(".testimonials-slider");
  const testimonialPrev = document.querySelector(".testimonials-arrow.prev");
  const testimonialNext = document.querySelector(".testimonials-arrow.next");

  if (testimonialSlider && testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener("click", () => {
      testimonialSlider.scrollBy({
        left: -testimonialSlider.clientWidth,
        behavior: "smooth"
      });
    });

    testimonialNext.addEventListener("click", () => {
      testimonialSlider.scrollBy({
        left: testimonialSlider.clientWidth,
        behavior: "smooth"
      });
    });
  }

});
