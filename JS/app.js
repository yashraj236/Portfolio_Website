document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const tabs = Array.from(document.querySelectorAll(".tab-link"));
  tabs.forEach((t) =>
    t.addEventListener("click", (e) => {
      tabs.forEach((x) => x.classList.remove("active"));
      e.currentTarget.classList.add("active");
    })
  );

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Scroll-spy: highlight active tab while scrolling
  const sections = ["#about", "#resume", "#projects", "#certs", "#extra", "#contact"].map((id) => document.querySelector(id));
  const tabById = new Map(tabs.map((t) => [t.getAttribute("href"), t]));

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const href = `#${entry.target.id}`;
        const tab = tabById.get(href);
        if (tab) {
          if (entry.isIntersecting) {
            tabs.forEach((x) => x.classList.remove("active"));
            tab.classList.add("active");
          }
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.5, 1] }
  );

  sections.forEach((s) => s && spy.observe(s));
});
