document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     POPUP BIENVENIDA
  ========================= */
  const popup = document.getElementById("welcomePopup");
  const closePopup = document.getElementById("closePopup");
  const popupImage = document.getElementById("popupImage");

  function openPopup(lang = "es") {
    if (!popup || !popupImage) return;

    const key = "popupShown_" + lang;

    if (sessionStorage.getItem(key)) return;

    if (lang === "en") {
      popupImage.src = "images/imagenpopin.png";
      popupImage.alt = "Glow experience for free";
    } else {
      popupImage.src = "images/imagenpopes.png";
      popupImage.alt = "Experiencia Glow gratis";
    }

    popup.classList.remove("hidden");
    sessionStorage.setItem(key, "true");
  }

  function closePopupBox() {
    if (!popup) return;
    popup.classList.add("hidden");
  }

  if (closePopup) {
    closePopup.addEventListener("click", closePopupBox);
  }

  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closePopupBox();
      }
    });
  }

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
      if (newText) {
        el.textContent = newText;
      }
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    updateHeroImage();
    startHeroSlider();
    updateLegalLinks();
    openPopup(lang);
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

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

  /* =========================
   FORMULARIO + GRACIAS
========================= */

const klaviyoForm = document.getElementById("klaviyo-form");

// 👇 AÑADE ESTO (te faltaba)
const thanksPopup = document.getElementById("thanksPopup");
const thanksTitle = document.getElementById("thanksTitle");
const thanksText = document.getElementById("thanksText");
const thanksBack = document.getElementById("thanksBack");
const closeThanksPopup = document.getElementById("closeThanksPopup");

// cerrar popup
if (closeThanksPopup) {
  closeThanksPopup.addEventListener("click", () => {
    thanksPopup.classList.add("hidden");
  });
}

if (thanksBack) {
  thanksBack.addEventListener("click", (e) => {
    e.preventDefault();
    thanksPopup.classList.add("hidden");
  });
}

klaviyoForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const lang = document.documentElement.lang || "es";

  const nombre = document.getElementById("nombre")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const telefono = document.getElementById("telefono")?.value.trim() || "";
  const ciudad = document.getElementById("ciudad")?.value.trim() || "";
  const asesor = document.querySelector('input[name="asesor"]:checked')?.value || "";

  // 🔑 TU API (ya la tienes)
  const KLAVIYO_COMPANY_ID = "XZjNH6";

  // ❗ AQUI TIENES QUE PONER TU LIST ID
  const KLAVIYO_LIST_ID = "TtUdz8";

  const payload = {
    data: {
      type: "subscription",
      attributes: {
        profile: {
          data: {
            type: "profile",
            attributes: {
              email: email,
              first_name: nombre,
              phone_number: telefono || undefined,
              properties: {
                ciudad: ciudad,
                asesor: asesor,
                source: "Landing RIMAN"
              }
            }
          }
        },
        subscriptions: {
          email: {
            marketing: {
              consent: "SUBSCRIBED"
            }
          }
        }
      },
      relationships: {
        list: {
          data: {
            type: "list",
            id: KLAVIYO_LIST_ID
          }
        }
      }
    }
  };

  try {
    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "revision": "2026-01-15"
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      console.error("Error Klaviyo");
      alert(lang === "en"
        ? "Error submitting form"
        : "Error al enviar el formulario");
      return;
    }

    // 👉 SOLO SI FUNCIONA → mostramos popup
    if (lang === "en") {
      thanksTitle.textContent = "Thank you for registering!";
      thanksText.textContent = "Your advisor will contact you soon to share all the details of your Riman experience.";
      thanksBack.textContent = "BACK TO PAGE";
    } else {
      thanksTitle.textContent = "¡Gracias por registrarte!";
      thanksText.textContent = "Muy pronto, tu asesor se pondrá en contacto contigo para compartirte todos los detalles de tu Experiencia con Riman.";
      thanksBack.textContent = "VOLVER A LA PÁGINA";
    }

    if (thanksPopup) {
      thanksPopup.classList.remove("hidden");
    }

    klaviyoForm.reset();

  } catch (error) {
    console.error(error);
    alert(lang === "en"
      ? "Connection error"
      : "Error de conexión");
  }
});
    
  /* =========================
     INICIO
  ========================= */
  setLanguage("es");

});
