<?php
/**
 * Template Name: Full Width with Overlay Sidebar
 *
 * A custom template for full-width content with an overlay sidebar.
 *
 * @package Bootscore
 * @version 6.0.0
 */

// Exit if accessed directly
defined('ABSPATH') || exit;

get_header();
?>

<!-- Full Width Content Wrapper -->
<div id="content" class="site-content container-fluid pt-4 pb-5">
  <div id="primary" class="content-area position-relative">

    <!-- Sidebar (Overlay) -->
    <aside id="overlay-sidebar" class="offcanvas offcanvas-start" tabindex="-1" aria-labelledby="overlaySidebarLabel">
      <div class="offcanvas-header">
        <h5 id="overlaySidebarLabel"><?php esc_html_e('Sidebar', 'bootscore'); ?></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <?php dynamic_sidebar('sidebar-1'); ?>
      </div>
    </aside>

	<!-- Sidebar Toggle Button -->
<button class="btn btn-primary position-fixed" type="button" data-bs-toggle="offcanvas" data-bs-target="#overlay-sidebar" aria-controls="overlay-sidebar" style="top: 50%; left: 20px; z-index: 1050;padding: 6px 2px;">
  <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.8 44.35" width="45" height="85" fill="currentColor">
    <defs>
      <style>.cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:.75px;}</style>
    </defs>
    <path class="cls-1" d="M20.54.38H1.27C.78.38.38.92.38,1.58v41.16c0,.68.41,1.24.92,1.24h19.24c.49,0,.89-.54.89-1.2V1.56c0-.66-.39-1.19-.88-1.19ZM15.76,12.35c-.44-.67-1.19-1.12-2.06-1.12s-1.62.45-2.06,1.12H2.83v2.83h8.94c.45.58,1.14.96,1.93.96s1.48-.38,1.93-.96h2.44v-2.83h-2.31ZM13.7,15.34c-.92,0-1.66-.74-1.66-1.66s.74-1.66,1.66-1.66,1.66.74,1.66,1.66-.74,1.66-1.66,1.66ZM7.76,18.86c-.44-.67-1.19-1.12-2.06-1.12s-1.62.45-2.06,1.12h-.65v2.83h.77c.45.58,1.14.96,1.93.96s1.48-.38,1.93-.96h10.61v-2.83H7.76ZM5.7,21.85c-.92,0-1.66-.74-1.66-1.66s.74-1.66,1.66-1.66,1.66.74,1.66,1.66-.74,1.66-1.66,1.66ZM12.62,25.54c-.44-.63-1.17-1.04-2-1.04s-1.55.41-2,1.04H3v2.83h5.62c.44.63,1.17,1.04,2,1.04s1.55-.41,2-1.04h5.62v-2.83h-5.62ZM10.62,28.62c-.92,0-1.66-.74-1.66-1.66s.74-1.66,1.66-1.66,1.66.74,1.66,1.66-.74,1.66-1.66,1.66ZM16.97,32.15c-.44-.67-1.19-1.12-2.06-1.12s-1.62.45-2.06,1.12H3v2.83h9.99c.45.58,1.14.96,1.93.96s1.48-.38,1.93-.96h1.4v-2.83h-1.27ZM14.91,35.15c-.92,0-1.66-.74-1.66-1.66s.74-1.66,1.66-1.66,1.66.74,1.66,1.66-.74,1.66-1.66,1.66ZM8.98,40.59c0,.59-.48,1.06-1.06,1.06s-1.06-.48-1.06-1.06.48-1.06,1.06-1.06,1.06.48,1.06,1.06ZM11.79,40.59c0,.59-.48,1.06-1.06,1.06s-1.06-.48-1.06-1.06.48-1.06,1.06-1.06,1.06.48,1.06,1.06ZM14.59,40.59c0,.59-.48,1.06-1.06,1.06s-1.06-.48-1.06-1.06.48-1.06,1.06-1.06,1.06.48,1.06,1.06ZM5.72,6.21c0,.59-.48,1.06-1.06,1.06s-1.06-.48-1.06-1.06.48-1.06,1.06-1.06,1.06.48,1.06,1.06ZM8.62,6.21c0,.59-.48,1.06-1.06,1.06s-1.06-.48-1.06-1.06.48-1.06,1.06-1.06,1.06.48,1.06,1.06ZM11.51,6.21c0,.59-.48,1.06-1.06,1.06s-1.06-.48-1.06-1.06.48-1.06,1.06-1.06,1.06.48,1.06,1.06ZM14.41,6.21c0,.59-.48,1.06-1.06,1.06s-1.06-.48-1.06-1.06.48-1.06,1.06-1.06,1.06.48,1.06,1.06ZM17.31,6.21c0,.59-.48,1.06-1.06,1.06s-1.06-.48-1.06-1.06.48-1.06,1.06-1.06,1.06.48,1.06,1.06Z"/>
  </svg>
</button>

    <!-- Main Content -->
    <div class="row">
      <div class="col-12">
        <main id="main" class="site-main">
          <div class="entry-header">
            <?php the_post(); ?>
            <h1><?php the_title(); ?></h1>
            <?php bootscore_post_thumbnail(); ?>
          </div>
          <div class="entry-content">
            <?php the_content(); ?>
          </div>
          <div class="entry-footer">
            <?php comments_template(); ?>
          </div>
        </main>
      </div>
    </div>

  </div>
</div>

<?php get_footer(); ?>
