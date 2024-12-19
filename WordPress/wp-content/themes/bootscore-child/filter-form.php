<form method="get" action="<?php echo esc_url(home_url('/')); ?>">
    <!-- Filter nach Kategorie -->
    <label for="filter-category"><?php _e('Filter by Category', 'textdomain'); ?></label>
    <select name="category" id="filter-category">
        <option value=""><?php _e('All Categories', 'textdomain'); ?></option>
        <?php
        $categories = get_categories();
        foreach ($categories as $category) {
            echo '<option value="' . esc_attr($category->slug) . '">' . esc_html($category->name) . '</option>';
        }
        ?>
    </select>

    <!-- Filter nach Datum -->
    <label for="filter-date"><?php _e('Filter by Date', 'textdomain'); ?></label>
    <select name="date" id="filter-date">
        <option value=""><?php _e('All Dates', 'textdomain'); ?></option>
        <?php
        global $wpdb;
        $dates = $wpdb->get_results("
            SELECT DISTINCT YEAR(post_date) AS year, MONTH(post_date) AS month
            FROM $wpdb->posts
            WHERE post_type = 'post' AND post_status = 'publish'
            ORDER BY post_date DESC
        ");
        foreach ($dates as $date) {
            echo '<option value="' . esc_attr($date->year . '-' . $date->month) . '">' . esc_html(date("F Y", mktime(0, 0, 0, $date->month, 1, $date->year))) . '</option>';
        }
        ?>
    </select>

    <!-- Filter nach Tags -->
    <label for="filter-tag"><?php _e('Filter by Tag', 'textdomain'); ?></label>
    <select name="tag" id="filter-tag">
        <option value=""><?php _e('All Tags', 'textdomain'); ?></option>
        <?php
        $tags = get_tags();
        foreach ($tags as $tag) {
            echo '<option value="' . esc_attr($tag->slug) . '">' . esc_html($tag->name) . '</option>';
        }
        ?>
    </select>

    <!-- Filter nach Autor -->
    <label for="filter-author"><?php _e('Filter by Author', 'textdomain'); ?></label>
    <select name="author" id="filter-author">
        <option value=""><?php _e('All Authors', 'textdomain'); ?></option>
        <?php
        $authors = get_users(array('who' => 'authors'));
        foreach ($authors as $author) {
            echo '<option value="' . esc_attr($author->ID) . '">' . esc_html($author->display_name) . '</option>';
        }
        ?>
    </select>

    <!-- Filter nach Custom Post Types -->
    <label for="filter-post-type"><?php _e('Filter by Post Type', 'textdomain'); ?></label>
    <select name="post_type" id="filter-post-type">
        <option value=""><?php _e('All Post Types', 'textdomain'); ?></option>
        <?php
        $post_types = get_post_types(array('public' => true), 'objects');
        foreach ($post_types as $post_type) {
            echo '<option value="' . esc_attr($post_type->name) . '">' . esc_html($post_type->label) . '</option>';
        }
        ?>
    </select>

    <!-- Filter nach Benutzerdefinierten Taxonomien -->
    <label for="filter-taxonomy"><?php _e('Filter by Custom Taxonomy', 'textdomain'); ?></label>
    <select name="taxonomy" id="filter-taxonomy">
        <option value=""><?php _e('All Taxonomies', 'textdomain'); ?></option>
        <?php
        $taxonomies = get_taxonomies(array('public' => true, '_builtin' => false), 'objects');
        foreach ($taxonomies as $taxonomy) {
            echo '<option value="' . esc_attr($taxonomy->name) . '">' . esc_html($taxonomy->label) . '</option>';
        }
        ?>
    </select>

    <!-- Filter nach Meta-Daten -->
    <label for="filter-meta"><?php _e('Filter by Meta Key', 'textdomain'); ?></label>
    <select name="meta_key" id="filter-meta">
        <option value=""><?php _e('All Meta Keys', 'textdomain'); ?></option>
        <?php
        // Beispiel für Meta-Schlüssel: Diese Liste kann angepasst werden.
        $meta_keys = array('meta_key_1', 'meta_key_2', 'meta_key_3');
        foreach ($meta_keys as $meta_key) {
            echo '<option value="' . esc_attr($meta_key) . '">' . esc_html($meta_key) . '</option>';
        }
        ?>
    </select>
    <input type="text" name="meta_value" placeholder="<?php _e('Enter Meta Value', 'textdomain'); ?>" />

    <!-- Submit-Button -->
    <button type="submit"><?php _e('Filter', 'textdomain'); ?></button>
</form>
