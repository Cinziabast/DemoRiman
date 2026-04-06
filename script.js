document.addEventListener("DOMContentLoaded", () => {
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

  function setLanguage(lang) {
    currentHeroLang = lang;
    currentHeroIndex = 0;

    document.documentElement.lang = lang;
    document.body.classList.toggle("english", lang === "en");

    translatableElements.forEach((el) => {
      const newText = el.getAttribute(`data-${lang}`);
      if (newText) {
        el.textContent = newText;
      }
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    updateHeroImage();
    startHeroSlider();
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  setLanguage("es");
});
