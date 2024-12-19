<?php
/*
Plugin Name: Custom Fullwidth Slider
Description: Ein Fullwidth-Slider mit mehreren Slides für WordPress, gesteuert durch Shortcodes.
Version: 2.0
Author: huhakhay.de
*/

// Sicherheitscheck: Direkter Zugriff verhindern
if (!defined('ABSPATH')) exit;

// Custom Post Type registrieren
function custom_slider_post_type() {
    $labels = [
        'name'               => 'Slider',
        'singular_name'      => 'Slider',
        'menu_name'          => 'Slider',
        'add_new'            => 'Neuen Slider hinzufügen',
        'add_new_item'       => 'Neuen Slider erstellen',
        'edit_item'          => 'Slider bearbeiten',
    ];

    $args = [
        'labels'             => $labels,
        'public'             => true,
        'show_in_menu'       => true,
        'supports'           => ['title'],
    ];

    register_post_type('custom_slider', $args);
}
add_action('init', 'custom_slider_post_type');

// Metaboxen für Slider-Inhalte
function custom_slider_meta_box() {
    add_meta_box(
        'custom_slider_content',
        'Slider-Inhalte',
        'custom_slider_meta_box_callback',
        'custom_slider',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'custom_slider_meta_box');

// Metabox-Callback
function custom_slider_meta_box_callback($post) {
    $slides = get_post_meta($post->ID, '_custom_slider_slides', true);
    wp_nonce_field('custom_slider_save_meta_box', 'custom_slider_meta_box_nonce');
    ?>
    <div id="custom-slider-slides-container">
        <?php if (!empty($slides)) : ?>
            <?php foreach ($slides as $index => $slide) : ?>
                <div class="custom-slider-slide">
                    <h4>Slide <?php echo ($index + 1); ?></h4>
                    <label>Hintergrundbild:</label>
                    <input type="text" name="custom_slider_slides[<?php echo $index; ?>][background]" value="<?php echo esc_url($slide['background']); ?>" style="width: 100%;" />
                    
                    <label>Kleines Bild:</label>
                    <input type="text" name="custom_slider_slides[<?php echo $index; ?>][foreground]" value="<?php echo esc_url($slide['foreground']); ?>" style="width: 100%;" />
                    
                    <label>Text (Überschrift):</label>
                    <input type="text" name="custom_slider_slides[<?php echo $index; ?>][title]" value="<?php echo esc_attr($slide['title']); ?>" style="width: 100%;" />

                    <label>Text (Beschreibung):</label>
                    <textarea name="custom_slider_slides[<?php echo $index; ?>][description]" style="width: 100%;" rows="3"><?php echo esc_textarea($slide['description']); ?></textarea>
                    
                    <label>Button-Beschriftung:</label>
                    <input type="text" name="custom_slider_slides[<?php echo $index; ?>][button_text]" value="<?php echo esc_attr($slide['button_text'] ?? 'Mehr erfahren'); ?>" style="width: 100%;" placeholder="Button-Beschriftung" />

                    <label>Button-Link:</label>
                    <input type="text" name="custom_slider_slides[<?php echo $index; ?>][button_link]" value="<?php echo esc_url($slide['button_link']); ?>" style="width: 100%;" />
                    <button type="button" class="button remove-slider-slide">Slide entfernen</button>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
    <button type="button" id="add-slider-slide" class="button">Slide hinzufügen</button>
    <?php
}

// Speichert die Slider-Daten
function custom_slider_save_meta_box($post_id) {
    if (!isset($_POST['custom_slider_meta_box_nonce']) || !wp_verify_nonce($_POST['custom_slider_meta_box_nonce'], 'custom_slider_save_meta_box')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['custom_slider_slides'])) {
        $slides = array_filter($_POST['custom_slider_slides'], function ($slide) {
            return !empty($slide['background']) || !empty($slide['foreground']) || !empty($slide['title']) || !empty($slide['description']) || !empty($slide['button_link']);
        });

        $sanitized_slides = array_map(function ($slide) {
            return [
                'background' => esc_url_raw($slide['background']),
                'foreground' => esc_url_raw($slide['foreground']),
                'title' => sanitize_text_field($slide['title']),
                'description' => sanitize_textarea_field($slide['description']),
                'button_link' => esc_url_raw($slide['button_link']),
                'button_text' => sanitize_text_field($slide['button_text'] ?? 'Mehr erfahren'),
            ];
        }, $slides);        

        update_post_meta($post_id, '_custom_slider_slides', $sanitized_slides);
    } else {
        delete_post_meta($post_id, '_custom_slider_slides');
    }
}
add_action('save_post', 'custom_slider_save_meta_box');

// Shortcode
function custom_fullwidth_slider_shortcode($atts) {
    $atts = shortcode_atts(['id' => ''], $atts, 'custom_fullwidth_slider');
    $post_id = intval($atts['id']);
    if (!$post_id) return 'Kein Slider ausgewählt.';

    $slides = get_post_meta($post_id, '_custom_slider_slides', true);
    if (empty($slides)) return 'Keine Inhalte im Slider.';

    ob_start(); ?>
    <div id="customFullwidthSlider-<?php echo esc_attr($post_id); ?>" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
            <?php foreach ($slides as $index => $slide): ?>
                <div class="carousel-item <?php echo $index === 0 ? 'active' : ''; ?>" style="background-image: url('<?php echo esc_url($slide['background']); ?>');">
                    <div class="foreground-container">
                        <img src="<?php echo esc_url($slide['foreground']); ?>" class="foreground-image" alt="Slide Image">
                        <div class="text-content">
                            <h2><?php echo esc_html($slide['title']); ?></h2>
                            <p><?php echo esc_html($slide['description']); ?></p>
                            <?php if (!empty($slide['button_link'])) : ?>
                                <a href="<?php echo esc_url($slide['button_link']); ?>" class="btn btn-primary">
                                    <?php echo esc_html($slide['button_text'] ?? 'Mehr erfahren'); ?>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#customFullwidthSlider-<?php echo esc_attr($post_id); ?>" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#customFullwidthSlider-<?php echo esc_attr($post_id); ?>" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('custom_fullwidth_slider', 'custom_fullwidth_slider_shortcode');

// Frontend CSS und JS einbinden
function custom_slider_enqueue_assets() {
    wp_enqueue_style('custom-slider-frontend', plugin_dir_url(__FILE__) . 'assets/css/slider-frontend-styles.css');
    wp_enqueue_script('custom-slider-frontend', plugin_dir_url(__FILE__) . 'assets/js/slider-frontend-scripts.js', ['jquery'], null, true);
}
add_action('wp_enqueue_scripts', 'custom_slider_enqueue_assets');

// Admin CSS und JS einbinden
function custom_slider_enqueue_admin_assets($hook_suffix) {
    if ('post.php' === $hook_suffix || 'post-new.php' === $hook_suffix) {
        wp_enqueue_style('custom-slider-admin', plugin_dir_url(__FILE__) . 'assets/css/slider-admin-styles.css');
        wp_enqueue_script('custom-slider-admin', plugin_dir_url(__FILE__) . 'assets/js/slider-admin-scripts.js', ['jquery'], null, true);
    }
}
add_action('admin_enqueue_scripts', 'custom_slider_enqueue_admin_assets');
?>
