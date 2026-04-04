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

function getActiveLanguage() {
  const activeBtn = document.querySelector(".lang-btn.active");
  return activeBtn ? activeBtn.dataset.lang : "es";
}

function updateHeroImage() {
  const heroImg = document.getElementById("hero-slide-image");
  if (!heroImg) return;

  currentHeroLang = getActiveLanguage();
  heroImg.src = heroImages[currentHeroLang][currentHeroIndex];
}

function nextHeroSlide() {
  currentHeroLang = getActiveLanguage();
  currentHeroIndex = (currentHeroIndex + 1) % heroImages[currentHeroLang].length;
  updateHeroImage();
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeroImage();
  setInterval(nextHeroSlide, 4000);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentHeroIndex = 0;
      setTimeout(updateHeroImage, 100);
    });
  });
});
