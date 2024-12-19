/* 04Dez24 navAndSide.js - Navigation, Sidebar, Layout-Management und Theme-Switcher */

document.addEventListener("DOMContentLoaded", function () {
    // **1. Header Navigation - Scroll Verhalten**
    window.onscroll = function () {
        adjustHeaderOnScroll();
    };

    function adjustHeaderOnScroll() {
        const header = document.getElementById("nav-main");
        if (document.documentElement.scrollTop > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        header.style.width = "100%"; // Sicherstellen, dass der Header die volle Breite hat
    }

    // **2. Navbar-Menü - Dropdowns und Mega-Menüs per Hover mit Verzögerung**
    const menus = document.querySelectorAll(".dropdown, .mega-menu");

    menus.forEach(menu => {
        let timeout;

        menu.addEventListener("mouseenter", function () {
            clearTimeout(timeout); // Falls ein Timeout läuft, abbrechen
            const submenu = this.querySelector(".dropdown-menu");
            if (submenu) {
                submenu.classList.add("show");
                submenu.style.display = this.classList.contains("mega-menu") ? "flex" : "block";
            }
        });

        menu.addEventListener("mouseleave", function () {
            const submenu = this.querySelector(".dropdown-menu");
            if (submenu) {
                timeout = setTimeout(() => {
                    submenu.classList.remove("show");
                    submenu.style.display = "";
                }, 300); // Zeit in Millisekunden (300 ms)
            }
        });
    });

    // **3. Layout-Management - Spaltenanzahl der Produktdarstellung anpassen**
    const layoutButtons = document.querySelectorAll(".change-layout");
    const container = document.querySelector(".product-container");

    layoutButtons.forEach(button => {
        button.addEventListener("click", function () {
            const columns = this.getAttribute("data-columns");
            container.className = `row product-container`; // Bestehende Klassen zurücksetzen
            container.classList.add(`columns-${columns}`);
            const children = container.children;
            for (let child of children) {
                child.className = `col-custom col-${12 / columns}`;
            }
        });
    });

    // **4. Theme-Switcher: Dark/Light-Mode**
    const themeSwitcher = document.getElementById("theme-switcher1");
    const body = document.body;
    const navbar = document.getElementById("masthead"); // Navbar-Element für Dark/Light-Klasse
    const logoElement = document.getElementById("site-logo");

    // Prüfen, ob der Modus im Local Storage gespeichert ist
    const currentTheme = localStorage.getItem("theme") || "light";
    body.classList.add(currentTheme);
    navbar.classList.add(currentTheme); // Klasse auch zur Navbar hinzufügen
    updateLogo(currentTheme);

    // Event Listener für den Theme-Switcher
    themeSwitcher.addEventListener("click", function () {
        const newTheme = body.classList.contains("dark") ? "light" : "dark";
        body.classList.remove("light", "dark");
        navbar.classList.remove("light", "dark");
        body.classList.add(newTheme);
        navbar.classList.add(newTheme); // Klasse auch zur Navbar hinzufügen
        updateLogo(newTheme);
        localStorage.setItem("theme", newTheme); // Speichern des gewählten Themas
    });

    function updateLogo(theme) {
        // Holen der richtigen Logo-URL aus den data-Attributen
        if (theme === "dark") {
            logoElement.src = logoElement.getAttribute("data-logo-dark");
        } else {
            logoElement.src = logoElement.getAttribute("data-logo-light");
        }
    }

    // **5. Sidebar-Logik - Steuerung des Sidebar-Buttons**
    const sidebar = document.getElementById("overlay-sidebar");
    const toggleButton = document.getElementById("sidebar-toggle");
    const closeButton = sidebar ? sidebar.querySelector(".btn-close") : null;
    const sidebarButton = document.getElementById("sideButton");

    if (sidebar && sidebarButton) {
        // Überwachung des Status der Sidebar
        sidebar.addEventListener("shown.bs.offcanvas", function () {
            sidebarButton.style.display = "none"; // Button ausblenden, wenn Sidebar geöffnet ist
        });

        sidebar.addEventListener("hidden.bs.offcanvas", function () {
            sidebarButton.style.display = "block"; // Button anzeigen, wenn Sidebar geschlossen ist
        });
    }

    if (toggleButton && sidebar) {
        // Sidebar öffnen
        toggleButton.addEventListener("click", function () {
            sidebar.classList.toggle("show");
            body.classList.toggle("sidebar-open");
        });
    }

    if (closeButton && sidebar) {
        // Sidebar schließen
        closeButton.addEventListener("click", function () {
            sidebar.classList.remove("show");
            body.classList.remove("sidebar-open");
        });
    }

    if (sidebar) {
        // Schließen der Sidebar, wenn außerhalb geklickt wird
        document.addEventListener("click", function (event) {
            if (!sidebar.contains(event.target) &&
                !toggleButton.contains(event.target) &&
                sidebar.classList.contains("show")) {
                sidebar.classList.remove("show");
                body.classList.remove("sidebar-open");
            }
        });
    }
});
