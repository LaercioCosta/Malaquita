// shortcut: contatos oficiais não foram fornecidos; preencha aqui para direcionar os links corretamente.
const contato = { whatsapp: "", email: "" };

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  if (contato.whatsapp) link.href = `https://wa.me/${contato.whatsapp}`;
});
document.querySelectorAll("[data-email]").forEach((link) => {
  if (contato.email) link.href = `mailto:${contato.email}?subject=${encodeURIComponent("Conversa sobre sua marca | Agência Malaquita")}`;
});
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const links = [...nav.querySelectorAll('a[href^="#"]')];
const sections = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
const markCurrent = (id) => links.forEach((link) => {
  if (link.hash === `#${id}`) link.setAttribute("aria-current", "page");
  else link.removeAttribute("aria-current");
});

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
  if (visible) markCurrent(visible.target.id);
}, { rootMargin: "-25% 0px -65% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

menu.addEventListener("click", () => {
  const aberto = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!aberto));
  menu.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
  nav.classList.toggle("is-open", !aberto);
});
nav.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link) {
    markCurrent(link.hash.slice(1));
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Abrir menu");
  }
});
