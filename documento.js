(() => {
  const navigation = document.querySelector("#navigation");
  const toggle = document.querySelector(".navigation-toggle");
  const panel = document.querySelector("#navigation-panel");

  if (!navigation || !toggle || !panel) {
    return;
  }

  const mobileMedia = window.matchMedia("(max-width: 768px)");

  const setMenu = (open) => {
    navigation.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
  };

  toggle.addEventListener("click", () => {
    setMenu(!navigation.classList.contains("is-open"));
  });

  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target)) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  mobileMedia.addEventListener("change", () => {
    setMenu(false);
  });

  const sectionLinks = Array.from(panel.querySelectorAll('a[href^="#"]'));

  const targets = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = (link, active) => {
    link.classList.toggle("is-active", active);

    if (active) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  };

  if ("IntersectionObserver" in window && targets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const current = sectionLinks.find(
            (link) => link.getAttribute("href") === `#${entry.target.id}`
          );

          if (!current) {
            return;
          }

          if (entry.isIntersecting) {
            sectionLinks.forEach((link) => setActive(link, link === current));
          } else {
            setActive(current, false);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
  }
})();
