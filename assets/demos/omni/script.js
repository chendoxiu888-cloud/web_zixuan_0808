// Reveal-on-scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

// Hero window: switching between 解释 / 总结 / 翻译 / 润色
const promptRows = document.querySelectorAll(".prompt-row");
const response = document.getElementById("hero-response");

promptRows.forEach((row) => {
  row.addEventListener("click", () => {
    promptRows.forEach((r) => r.classList.remove("active"));
    row.classList.add("active");
    if (response) {
      response.style.opacity = "0";
      window.setTimeout(() => {
        response.textContent = row.dataset.copy;
        response.style.opacity = "1";
      }, 120);
    }
  });
});

if (response) {
  response.style.transition = "opacity 0.15s ease";
}
