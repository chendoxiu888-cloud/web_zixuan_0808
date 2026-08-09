const header = document.querySelector(".site-header");
const nav = document.querySelector(".glass-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".glass-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function closeMenu() {
  if (!nav || !menuToggle) return;
  nav.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const willOpen = !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", willOpen);
  menuToggle.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  document.body.classList.toggle("menu-open", willOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

function setActiveSection(id) {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function updateActiveSection() {
  const marker = window.scrollY + window.innerHeight * .34;
  let current = sections[0]?.id;

  sections.forEach((section) => {
    if (marker >= section.offsetTop) current = section.id;
  });

  if (current) setActiveSection(current);
}

let scrollFrame = 0;
window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      updateActiveSection();
      scrollFrame = 0;
    });
  },
  { passive: true },
);

window.addEventListener("resize", updateActiveSection);
updateActiveSection();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -5%" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const hero = document.querySelector(".hero");

if (hero && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--spot-x", `${x.toFixed(2)}%`);
    hero.style.setProperty("--spot-y", `${y.toFixed(2)}%`);
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--spot-x", "50%");
    hero.style.setProperty("--spot-y", "52%");
  });
}

/* ===== Connect 个人信息卡：点击展开/收起 ===== */
(function () {
  var toggle = document.getElementById("info-toggle");
  var card = document.getElementById("contact-card");
  if (!toggle || !card) return;

  toggle.addEventListener("click", function () {
    var willOpen = card.hasAttribute("hidden");
    if (willOpen) {
      card.removeAttribute("hidden");
      // 强制回流后加动画类，触发展开过渡
      void card.offsetHeight;
      card.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    } else {
      card.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      // 过渡结束后再真正隐藏
      var onEnd = function () {
        if (!card.classList.contains("is-open")) card.setAttribute("hidden", "");
        card.removeEventListener("transitionend", onEnd);
      };
      card.addEventListener("transitionend", onEnd);
    }
  });
})();
