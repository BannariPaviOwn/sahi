document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll animations
  const animatedEls = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedEls.forEach((el) => observer.observe(el));

  // Hero Carousel
  const heroSlides = document.querySelectorAll(".hero-carousel .carousel-slide");
  const heroDotsContainer = document.querySelector(".hero-carousel .carousel-dots");
  let heroIndex = 0;
  let heroInterval;

  function showHeroSlide(i) {
    heroIndex = ((i % heroSlides.length) + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((s, idx) => s.classList.toggle("active", idx === heroIndex));
    heroDotsContainer?.querySelectorAll(".carousel-dot").forEach((d, idx) => d.classList.toggle("active", idx === heroIndex));
  }

  if (heroSlides.length && heroDotsContainer) {
    heroSlides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        showHeroSlide(i);
        resetHeroInterval();
      });
      heroDotsContainer.appendChild(dot);
    });

    document.querySelector(".hero-carousel .carousel-btn.prev")?.addEventListener("click", () => {
      showHeroSlide(heroIndex - 1);
      resetHeroInterval();
    });
    document.querySelector(".hero-carousel .carousel-btn.next")?.addEventListener("click", () => {
      showHeroSlide(heroIndex + 1);
      resetHeroInterval();
    });

    function resetHeroInterval() {
      clearInterval(heroInterval);
      heroInterval = setInterval(() => showHeroSlide(heroIndex + 1), 5000);
    }
    heroInterval = setInterval(() => showHeroSlide(heroIndex + 1), 5000);
  }

  // Services Carousel (horizontal scroll)
  const servicesTrack = document.querySelector(".services-track");
  const servicesPrev = document.querySelector(".services-carousel .carousel-btn.prev");
  const servicesNext = document.querySelector(".services-carousel .carousel-btn.next");

  if (servicesTrack && servicesPrev && servicesNext) {
    const scrollAmount = 360;
    servicesPrev.addEventListener("click", () => {
      servicesTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    servicesNext.addEventListener("click", () => {
      servicesTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  // Gallery Carousel
  const galleryTrack = document.querySelector(".gallery-track");
  const gallerySlides = document.querySelectorAll(".gallery-slide");
  const galleryPrev = document.querySelector(".gallery-carousel .carousel-btn.prev");
  const galleryNext = document.querySelector(".gallery-carousel .carousel-btn.next");
  const galleryDotsContainer = document.querySelector(".gallery-dots");
  let galleryIndex = 0;
  let galleryInterval;

  function showGallerySlide(i) {
    galleryIndex = ((i % gallerySlides.length) + gallerySlides.length) % gallerySlides.length;
    if (galleryTrack) {
      galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
    }
    galleryDotsContainer?.querySelectorAll(".carousel-dot").forEach((d, idx) => d.classList.toggle("active", idx === galleryIndex));
  }

  if (gallerySlides.length && galleryDotsContainer) {
    gallerySlides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        showGallerySlide(i);
        resetGalleryInterval();
      });
      galleryDotsContainer.appendChild(dot);
    });

    galleryPrev?.addEventListener("click", () => {
      showGallerySlide(galleryIndex - 1);
      resetGalleryInterval();
    });
    galleryNext?.addEventListener("click", () => {
      showGallerySlide(galleryIndex + 1);
      resetGalleryInterval();
    });

    function resetGalleryInterval() {
      clearInterval(galleryInterval);
      galleryInterval = setInterval(() => showGallerySlide(galleryIndex + 1), 4500);
    }
    galleryInterval = setInterval(() => showGallerySlide(galleryIndex + 1), 4500);
  }

  // Contact form
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = form?.querySelector("button[type='submit']");

  if (form && statusEl && submitBtn) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusEl.textContent = "";
      statusEl.className = "form-status";

      const payload = Object.fromEntries(new FormData(form).entries());
      if (!payload.name || !payload.email || !payload.message) {
        statusEl.textContent = "Please fill in your name, email, and message.";
        statusEl.classList.add("error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.classList.add("loading");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong.");

        statusEl.textContent = "Thank you for reaching out. We'll respond via email soon.";
        statusEl.classList.add("success");
        form.reset();
      } catch (err) {
        statusEl.textContent = "We couldn't send your message. Please try again or email us directly.";
        statusEl.classList.add("error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
      }
    });
  }
});
