<?php
/*
Plugin Name: duruprint-Favoriten Plugin
Description: Ermöglicht Nutzern, Favoriten zu speichern und anzuzeigen.
Version: 1.1
Author: huhakhay.de
*/

if ( ! defined( 'ABSPATH' ) ) exit;

// Shortcodes einbinden
require_once plugin_dir_path( __FILE__ ) . 'includes/shortcodes.php';

// Skripte und Styles registrieren
function favoriten_enqueue_scripts() {
    wp_enqueue_script('favoriten-js', plugins_url('js/favoriten.js', __FILE__), array('jquery'), '1.0', true);
    wp_enqueue_style('favoriten-css', plugins_url('css/favoriten.css', __FILE__));
    wp_localize_script('favoriten-js', 'favoritenAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('favoriten_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'favoriten_enqueue_scripts');

// AJAX-Handler
require_once plugin_dir_path( __FILE__ ) . 'includes/database.php';
add_action('wp_ajax_toggle_favorite', 'toggle_favorite');
add_action('wp_ajax_nopriv_toggle_favorite', 'toggle_favorite');
