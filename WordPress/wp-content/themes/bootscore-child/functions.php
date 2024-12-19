<?php

/**
 * @package Bootscore Child
 *
 * @version 6.0.0
 */

// Exit if accessed directly
defined('ABSPATH') || exit;

/**
 * Enqueue scripts and styles
 */
require_once get_stylesheet_directory() . '/inc/class-wp-bootstrap-navwalker.php';

add_action('wp_enqueue_scripts', 'bootscore_child_enqueue_styles');
function bootscore_child_enqueue_styles() {

  // Compiled main.css
  $modified_bootscoreChildCss = date('YmdHi', filemtime(get_stylesheet_directory() . '/assets/css/main.css')); //Es wird eine Datei main.css aus dem Verzeichnis /assets/css/ eingebunden
  wp_enqueue_style('main', get_stylesheet_directory_uri() . '/assets/css/main.css', array('parent-style'), $modified_bootscoreChildCss); //korrekte Reihenfolge: CSS wird korrekt mit array('parent-style') als Abhängigkeit eingebunden.
  
  // style.css
  wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css'); // parent-style-Verknüpfung, damit die Stile des Eltern-Themes (Bootscore) geladen werden.
  $modified_customCSS = date('YmdHi', filemtime(get_stylesheet_directory() . '/assets/css/custom.css')); // Komplexe eigene Styles (komplett oder nach und nach einzufügen). Vor allem dann sinnvoll, wenn größere Projekte und CSS-Dateien thematisch oder nach Funktionalität aufgeteilt sein sollen. Für kleine Projekte oder schnelle Anpassungen -> style.css deines Child-Themes.
  wp_enqueue_style('custom-style', get_stylesheet_directory_uri() . '/assets/css/custom.css', array('main'), $modified_customCSS);
  
  // custom.js
  $modificated_CustomJS = date('YmdHi', filemtime(get_stylesheet_directory() . '/assets/js/custom.js')); //Es wird ein Zeitstempel basierend auf der letzten Änderungszeit hinzugefügt (filemtime()), um Cache-Probleme zu vermeiden.
  wp_enqueue_script('custom-js', get_stylesheet_directory_uri() . '/assets/js/custom.js', array('jquery'), $modificated_CustomJS, true); //Eine Datei custom.js aus dem Verzeichnis /assets/js/ wird eingebunden. korrekte Reihenfolge: JS wird mit der Option true im Footer eingebunden, was gut für die Performance ist.
  
  wp_enqueue_script('navAndSide-js', get_stylesheet_directory_uri() . '/assets/js/navAndSide.js', array('jquery'), date('YmdHi', filemtime(get_stylesheet_directory() . '/assets/js/navAndSide.js')), true);
  wp_enqueue_script('dynamicVorschauBild-js', get_stylesheet_directory_uri() . '/assets/js/dynamicVorschauBild.js', array('jquery'), date('YmdHi', filemtime(get_stylesheet_directory() . '/assets/js/dynamicVorschauBild.js')), true); 	
}

/**
 * Register menus for the child theme
 */
function register_child_theme_menus() {
  register_nav_menus(array(
      // wird auch über einen anderen code, wahrscheinlich navwalker eingefügt, deshalb wird primary menu auskommentiert 'primary'      => __('Main Menu', 'bootscore-child'),    // Hauptmenü
      // wird auch über einen anderen code, wahrscheinlich navwalker eingefügt, deshalb wird secondary menu auskommentiert 'secondary'    => __('Footer Menu', 'bootscore-child'),  // Footer-Menü
      'left-menu'    => __('Left Menu', 'bootscore-child'),    // Menü links vom Logo
      'right-menu'   => __('Right Menu', 'bootscore-child'),   // Menü rechts vom Logo
  ));
}
add_action('init', 'register_child_theme_menus');
function enqueue_bootstrap_scripts() {
    // Bootstrap JavaScript
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', array('jquery'), '5.3.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_bootstrap_scripts');
  
   // Filter-Logik, um die Beiträge basierend auf den Filtern anzuzeigen
function filter_posts_query($query) {
    if (!is_admin() && $query->is_main_query()) {
        if (isset($_GET['category']) && !empty($_GET['category'])) {
            $query->set('category_name', sanitize_text_field($_GET['category']));
        }

        if (isset($_GET['date']) && !empty($_GET['date'])) {
            $date_parts = explode('-', sanitize_text_field($_GET['date']));
            if (count($date_parts) == 2) {
                $query->set('year', $date_parts[0]);
                $query->set('monthnum', $date_parts[1]);
            }
        }
    }
}
add_action('pre_get_posts', 'filter_posts_query'); //Die pre_get_posts-Logik aus Ihrer functions.php verarbeitet die ausgewählten Filter und zeigt die gefilterten Beiträge auf der gleichen Seite an

   //macht das Filter-Formular als Shortcode verfügbar
function filter_posts_shortcode() {
    ob_start();
    include locate_template('filter-form.php'); // Datei, die das HTML-Formular enthält
    return ob_get_clean();
}
add_shortcode('filter_posts', 'filter_posts_shortcode');



