document.getElementById("year").textContent = new Date().getFullYear();

const FORM_ENDPOINT = "https://formspree.io/f/xyegqdow";

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!FORM_ENDPOINT) {
    status.textContent = "Form isn't connected yet — set FORM_ENDPOINT in script.js.";
    status.style.color = "#b08d57";
    return;
  }

  const data = new FormData(form);
  status.textContent = "Sending...";
  status.style.color = "#6b6b6b";

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    if (res.ok) {
      form.reset();
      status.textContent = "Thanks — we'll be in touch soon.";
      status.style.color = "#1a7a3c";
    } else {
      status.textContent = "Something went wrong. Please try again.";
      status.style.color = "#b3261e";
    }
  } catch (err) {
    status.textContent = "Something went wrong. Please try again.";
    status.style.color = "#b3261e";
  }
});
