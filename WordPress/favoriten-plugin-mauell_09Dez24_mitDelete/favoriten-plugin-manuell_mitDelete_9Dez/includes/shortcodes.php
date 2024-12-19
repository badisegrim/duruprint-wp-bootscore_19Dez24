<?php

// Shortcode für den Favoriten-Button
function favorite_button_shortcode($atts) {
    $atts = shortcode_atts(array('id' => uniqid('fav-')), $atts);
    return '<button class="favorite-button" data-id="' . esc_attr($atts['id']) . '">Favorit</button>';
}
add_shortcode('favorite-button', 'favorite_button_shortcode');

// Shortcode für die Favoritenliste
function favorite_list_shortcode() {
    return '<div class="favorite-list"></div>';
}
add_shortcode('favorite-list', 'favorite_list_shortcode');
