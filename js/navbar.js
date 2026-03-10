document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".navbarToggle");
  const overlay = document.querySelector(".navbarOverlay");
  const closeBtn = document.querySelector(".navbarOverlayClose");
  const navbar = document.querySelector(".myNavbar");

  function closeMenu() {
    if (overlay) overlay.classList.remove("is-open");
    if (navbar) navbar.classList.remove("is-menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (overlay) overlay.classList.add("is-open");
    if (navbar) navbar.classList.add("is-menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  if (toggle && overlay) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = overlay.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", closeMenu);
  }

  if (overlay) {
    overlay.querySelectorAll(".navbarOverlayLink").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeMenu();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900 && overlay && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });
});
