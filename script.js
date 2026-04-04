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
let heroTimer = null;

function getActiveLanguage() {
  const activeBtn = document.querySelector(".lang-btn.active");
  return activeBtn ? activeBtn.dataset.lang : "es";
}

function updateHeroImage() {
  const heroImg = document.getElementById("hero-slide-image");
  if (!heroImg) return;

  const images = heroImages[currentHeroLang];
  heroImg.src = images[currentHeroIndex];
}

function startHeroSlider() {
  clearInterval(heroTimer);

  currentHeroLang = getActiveLanguage();
  currentHeroIndex = 0;
  updateHeroImage();

  heroTimer = setInterval(() => {
    const langNow = getActiveLanguage();

    if (langNow !== currentHeroLang) {
      currentHeroLang = langNow;
      currentHeroIndex = 0;
      updateHeroImage();
      return;
    }

    currentHeroIndex = (currentHeroIndex + 1) % heroImages[currentHeroLang].length;
    updateHeroImage();
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  startHeroSlider();

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        startHeroSlider();
      }, 50);
    });
  });
});
