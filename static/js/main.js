const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const siteHeader = document.querySelector(".site-header");
const heroImage = document.querySelector(".hero-image");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -35px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}

let scrollFrame = null;
const updateScrollEffects = () => {
  const scrollY = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (scrollY / scrollableHeight) * 100 : 0;

  siteHeader.classList.toggle("is-scrolled", scrollY > 40);
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);

  if (heroImage && scrollY < window.innerHeight) {
    heroImage.style.setProperty("--hero-parallax", `${scrollY * 0.18}px`);
  }

  scrollFrame = null;
};

window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame === null) {
      scrollFrame = window.requestAnimationFrame(updateScrollEffects);
    }
  },
  { passive: true },
);
updateScrollEffects();

const setMenuOpen = (isOpen, restoreFocus = true) => {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  siteHeader.classList.toggle("menu-open", isOpen);
  navigation.inert = !isOpen;
  document.body.classList.toggle("menu-open", isOpen);

  if (isOpen) {
    navigation.querySelector("a")?.focus();
  } else if (restoreFocus) {
    menuToggle.focus();
  }
};

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false, false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && detailDialog?.open) {
    event.preventDefault();
    detailDialog.close();
    return;
  }

  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
  }
});

const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");
const detailDialog = document.querySelector(".detail-dialog");

if (detailDialog) {
  menuCards.forEach((card) => {
    const button = card.querySelector(".menu-card-button");
    button.addEventListener("click", () => {
      const image = button.querySelector(".menu-image");
      const title = button.querySelector(".menu-card-title").textContent.trim();
      const description = button.querySelector(".menu-card-description").textContent.trim();

      detailDialog.querySelector("#detail-title").textContent = title;
      detailDialog.querySelector(".detail-price").textContent = button.dataset.price;
      detailDialog.querySelector(".detail-description").textContent = description;
      detailDialog.querySelector(".detail-notes p").textContent = button.dataset.notes;

      const detailImage = detailDialog.querySelector(".detail-image");
      detailImage.className = `detail-image ${[...image.classList].filter((name) => name.startsWith("menu-image-")).join(" ")}`;
      detailImage.setAttribute("aria-label", image.getAttribute("aria-label"));
      detailDialog.showModal();
    });
  });

  const closeDetailDialog = () => detailDialog.close();
  detailDialog.querySelector(".dialog-close").addEventListener("click", closeDetailDialog);
  detailDialog.querySelector(".dialog-done").addEventListener("click", closeDetailDialog);
  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) {
      closeDetailDialog();
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    menuCards.forEach((card) => {
      const shouldHide = filter !== "todos" && card.dataset.category !== filter;
      card.hidden = shouldHide;
      if (!shouldHide && !reducedMotion) {
        card.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 420, easing: "cubic-bezier(0.2, 0.65, 0.3, 1)" },
        );
      }
      if (!shouldHide) {
        card.classList.add("is-visible");
      }
    });
  });
});

const slides = [...document.querySelectorAll(".moment-slide")];
const carouselDots = [...document.querySelectorAll(".carousel-dot")];
const currentSlideLabel = document.querySelector("[data-current-slide]");
let currentSlide = 0;

const showSlide = (nextIndex) => {
  currentSlide = (nextIndex + slides.length) % slides.length;

  slides.forEach((slide, index) => {
    const isActive = index === currentSlide;
    slide.hidden = !isActive;
    slide.classList.toggle("is-active", isActive);
  });

  carouselDots.forEach((dot, index) => {
    const isActive = index === currentSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });

  currentSlideLabel.textContent = String(currentSlide + 1).padStart(2, "0");
};

document.querySelectorAll("[data-carousel-step]").forEach((button) => {
  button.addEventListener("click", () => {
    showSlide(currentSlide + Number(button.dataset.carouselStep));
  });
});

carouselDots.forEach((button) => {
  button.addEventListener("click", () => {
    showSlide(Number(button.dataset.carouselGo));
  });
});

const carousel = document.querySelector(".moments-section");
let carouselPaused = reducedMotion;
let touchStartX = null;

if (carousel && slides.length && currentSlideLabel) {
  if (!reducedMotion) {
  window.setInterval(() => {
    if (!carouselPaused && !document.hidden) {
      showSlide(currentSlide + 1);
    }
  }, 7000);

  carousel.addEventListener("mouseenter", () => {
    carouselPaused = true;
  });
  carousel.addEventListener("mouseleave", () => {
    carouselPaused = false;
  });
  carousel.addEventListener("focusin", () => {
    carouselPaused = true;
  });
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      carouselPaused = false;
    }
  });

  carousel.addEventListener("pointerdown", (event) => {
    if (!event.target.closest("a, button")) {
      touchStartX = event.clientX;
    }
  });
  carousel.addEventListener("pointerup", (event) => {
    if (touchStartX === null) {
      return;
    }

    const distance = event.clientX - touchStartX;
    if (Math.abs(distance) > 55) {
      showSlide(currentSlide + (distance < 0 ? 1 : -1));
    }
    touchStartX = null;
  });
  carousel.addEventListener("pointercancel", () => {
    touchStartX = null;
  });
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentSlide + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  }
}
