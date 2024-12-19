jQuery(document).ready(function($) {
    let userLoggedIn = typeof favoritenAjax !== 'undefined' && favoritenAjax.loggedIn;

    // Favoriten aus localStorage für Gäste laden
    let localFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Funktion: Favoritenliste aktualisieren
    function updateFavoriteList(favorites) {
        let list = $('.favorite-list');
        list.empty();
        favorites.forEach(function(fav) {
            // URL direkt aus dem Button finden
            let button = $(`.favorite-button[data-id="${fav}"]`);
            let url = button.data('href') || '#';
            
            // Liste mit Link generieren
            list.append(`
                <div class="favorite-item">
                    <button class="remove-favorite" data-id="${fav}" style="color: red; 0px; background-color: transparent;border: none;}">⊖</button>
                    <a href="${url}" class="favorite-link" target="_blank">${fav}</a>
                </div>
            `);
        });
    }
    

    // Favoriten-Button-Klick
    $('.favorite-button').on('click', function() {
        let button = $(this);
        let id = button.data('id');

        if (userLoggedIn) {
            // Benutzer ist eingeloggt - Favoriten über AJAX speichern
            let action = button.hasClass('active') ? 'remove' : 'add';

            $.ajax({
                url: favoritenAjax.ajaxurl,
                type: 'POST',
                data: {
                    action: 'toggle_favorite',
                    id: id,
                    action_type: action,
                    nonce: favoritenAjax.nonce
                },
                success: function(response) {
                    if (response.success) {
                        button.toggleClass('active');
                    }
                }
            });
        } else {
            // Benutzer ist nicht eingeloggt - Favoriten in localStorage speichern
            if (localFavorites.includes(id)) {
                // Entfernen
                localFavorites = localFavorites.filter(fav => fav !== id);
                button.removeClass('active');
            } else {
                // Hinzufügen
                localFavorites.push(id);
                button.addClass('active');
            }

            // Aktualisierung von localStorage
            localStorage.setItem('favorites', JSON.stringify(localFavorites));
        }
        // Favoritenliste aktualisieren
        updateFavoriteList(localFavorites);
    });

    // Löschen-Funktion in der Favoritenliste
    $(document).on('click', '.remove-favorite', function() {
        let id = $(this).data('id');

        if (userLoggedIn) {
            // Favorit aus der Liste via AJAX entfernen
            $.ajax({
                url: favoritenAjax.ajaxurl,
                type: 'POST',
                data: {
                    action: 'toggle_favorite',
                    id: id,
                    action_type: 'remove',
                    nonce: favoritenAjax.nonce
                },
                success: function(response) {
                    if (response.success) {
                        updateFavoriteList(response.data.favorites);
                        // Deaktiviere den zugehörigen Button
                        $(`.favorite-button[data-id="${id}"]`).removeClass('active');
                    }
                }
            });
        } else {
            // Favorit aus localStorage entfernen
            localFavorites = localFavorites.filter(fav => fav !== id);
            localStorage.setItem('favorites', JSON.stringify(localFavorites));
            updateFavoriteList(localFavorites);
            // Deaktiviere den zugehörigen Button
            $(`.favorite-button[data-id="${id}"]`).removeClass('active');
        }
    });

    // Initiale Synchronisation für Gäste
    if (!userLoggedIn) {
        // Markiere bereits gespeicherte Favoriten
        $('.favorite-button').each(function() {
            let button = $(this);
            let id = button.data('id');
            if (localFavorites.includes(id)) {
                button.addClass('active');
            }
        });

        // Favoritenliste aktualisieren
        updateFavoriteList(localFavorites);
    }
});
