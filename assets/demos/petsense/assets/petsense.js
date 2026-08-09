const menuButton = document.querySelector(".ps-menu");
const navigation = document.querySelector(".ps-nav");
const navigationLinks = [...document.querySelectorAll(".ps-nav a")];

function closeNavigation() {
  navigation?.classList.remove("is-open");
  menuButton?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("ps-menu-open");
}

menuButton?.addEventListener("click", () => {
  const willOpen = !navigation?.classList.contains("is-open");
  navigation?.classList.toggle("is-open", willOpen);
  menuButton.classList.toggle("is-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  document.body.classList.toggle("ps-menu-open", willOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeNavigation));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

const observedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateNavigation() {
  const marker = window.scrollY + window.innerHeight * 0.34;
  const orderedSections = [...observedSections].sort((first, second) => first.offsetTop - second.offsetTop);
  let activeId = orderedSections[0]?.id;

  orderedSections.forEach((section) => {
    if (section.offsetTop <= marker) activeId = section.id;
  });

  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

let navigationFrame = 0;
window.addEventListener(
  "scroll",
  () => {
    if (navigationFrame) return;
    navigationFrame = window.requestAnimationFrame(() => {
      updateNavigation();
      navigationFrame = 0;
    });
  },
  { passive: true },
);

window.addEventListener("resize", updateNavigation);
updateNavigation();

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-phone-tab]");
  if (tab) {
    const tabList = tab.closest("[role='tablist']");
    tabList?.querySelectorAll("[data-phone-tab]").forEach((button) => {
      const selected = button === tab;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
  }

  const toggle = event.target.closest("[data-phone-toggle]");
  if (toggle) {
    const enabled = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(enabled));
    toggle.classList.toggle("is-on", enabled);
  }
});
