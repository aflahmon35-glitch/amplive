
/* =========================================================
   AMP LIVE - APP JS (Part 1)
   Global UI Controls
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       THEME SYSTEM
    ------------------------- */

    const themeToggle = document.getElementById("themeToggle");
    const root = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem("amp_theme");

    if (savedTheme) {
        root.setAttribute("data-theme", savedTheme);

        if (themeToggle) {
            themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
        }
    }

    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            const currentTheme = root.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            root.setAttribute("data-theme", newTheme);
            localStorage.setItem("amp_theme", newTheme);

            themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
        });
    }

    /* -------------------------
       POPUP SYSTEM
    ------------------------- */

    const popup = document.getElementById("popupOverlay");
    const popupClose = document.getElementById("popupClose");

    if (popup) {
        setTimeout(() => {
            popup.classList.add("active");
        }, 300);
    }

    if (popupClose && popup) {
        popupClose.addEventListener("click", () => {
            popup.classList.remove("active");
        });
    }

});


/* =========================================================
   AMP LIVE - APP JS (Part 2)
   Mobile Menu + Dropdown Controls
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       MOBILE MENU TOGGLE
    ------------------------- */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    /* -------------------------
       DROPDOWN TOGGLE (MOBILE)
    ------------------------- */

    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");

    if (dropdown && dropdownToggle) {
        dropdownToggle.addEventListener("click", (e) => {
            e.preventDefault();
            dropdown.classList.toggle("active");
        });
    }

    /* -------------------------
       CLOSE MENU ON LINK CLICK (MOBILE)
    ------------------------- */

    const allNavLinks = document.querySelectorAll(".nav-links a");

    allNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks) {
                navLinks.classList.remove("active");
            }
        });
    });

    /* -------------------------
       CLICK OUTSIDE TO CLOSE MENU
    ------------------------- */

    document.addEventListener("click", (e) => {

        const isClickInsideNav = e.target.closest(".navbar");
        const isClickOnToggle = e.target.closest("#menuToggle");

        if (!isClickInsideNav && !isClickOnToggle && navLinks) {
            navLinks.classList.remove("active");
        }

    });

});