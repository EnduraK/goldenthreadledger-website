const header = document.getElementById("site-header") || document.querySelector("[data-header]");
const nav = document.getElementById("site-nav") || document.querySelector("[data-nav]");
const toggle = document.getElementById("nav-toggle") || document.querySelector("[data-nav-toggle]");
const links = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));

function syncHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 40);
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

toggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open") ?? false;
  nav?.classList.toggle("is-open", isOpen);
  header?.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open", "is-open");
    header?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.