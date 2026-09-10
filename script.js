document.documentElement.classList.add("js");

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.getElementById("nav-toggle");
const headerNav = document.getElementById("header-nav");

navToggle.addEventListener("click", () => {
  const isOpen = headerNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

headerNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    headerNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Header shadow once the page scrolls
const header = document.getElementById("site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Reveal-on-scroll; also triggers the progress bars and donut inside revealed blocks
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
    io.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Contact form → Formspree
const FORM_ENDPOINT = "https://formspree.io/f/xyegqdow";

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  status.textContent = "Sending...";
  status.style.color = "#55657d";

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    if (res.ok) {
      form.reset();
      status.textContent = "Thanks — we'll be in touch soon.";
      status.style.color = "#16a34a";
    } else {
      status.textContent = "Something went wrong. Please try again.";
      status.style.color = "#b3261e";
    }
  } catch (err) {
    status.textContent = "Something went wrong. Please try again.";
    status.style.color = "#b3261e";
  }
});
