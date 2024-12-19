<?php

function toggle_favorite() {
    check_ajax_referer('favoriten_nonce', 'nonce');

    $user_id = get_current_user_id();
    $favorite_id = sanitize_text_field($_POST['id']);
    $action = sanitize_text_field($_POST['action_type']); // add or remove

    if ($user_id) {
        $favorites = get_user_meta($user_id, 'user_favorites', true) ?: array();

        if ($action === 'add') {
            if (!in_array($favorite_id, $favorites)) {
                $favorites[] = $favorite_id;
            }
        } elseif ($action === 'remove') {
            $favorites = array_diff($favorites, array($favorite_id));
        }

        update_user_meta($user_id, 'user_favorites', $favorites);
    } else {
        // Für nicht eingeloggte Benutzer: localStorage oder Cookies
        wp_send_json_error('Bitte anmelden oder localStorage verwenden.');
    }

    wp_send_json_success(array('favorites' => $favorites));
}
