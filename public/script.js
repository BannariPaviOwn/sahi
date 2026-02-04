document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

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
    {
      threshold: 0.2,
    }
  );

  animatedEls.forEach((el) => observer.observe(el));

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = form?.querySelector("button[type='submit']");

  if (form && statusEl && submitBtn) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      statusEl.textContent = "";
      statusEl.className = "form-status";

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Something went wrong.");
        }

        statusEl.textContent = "Thank you for reaching out. We’ll respond to you via email soon.";
        statusEl.classList.add("success");
        form.reset();
      } catch (error) {
        console.error(error);
        statusEl.textContent =
          "We couldn’t send your message right now. Please try again in a moment or email us directly.";
        statusEl.classList.add("error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
      }
    });
  }
});

