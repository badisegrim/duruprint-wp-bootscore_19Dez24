document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // Prüfen, ob der Modus im Local Storage gespeichert ist
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(currentTheme);

    // Logo anhand des Modus ändern
    updateLogo(currentTheme);

    // Event Listener für den Button
    themeSwitcher.addEventListener('click', function() {
        const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
        body.classList.remove('light', 'dark');
        body.classList.add(newTheme);

        // Logo anpassen
        updateLogo(newTheme);

        // Speichern des gewählten Themas
        localStorage.setItem('theme', newTheme);
    });

    function updateLogo(theme) {
        const logoElement = document.getElementById('site-logo');
        if (theme === 'dark') {
            logoElement.src = '<?php echo esc_url(get_stylesheet_directory_uri() . "/assets/img/logo/logo-theme-dark.svg"); ?>';
        } else {
            logoElement.src = '<?php echo esc_url(get_stylesheet_directory_uri() . "/assets/img/logo/logo.svg"); ?>';
        }
    }
});
