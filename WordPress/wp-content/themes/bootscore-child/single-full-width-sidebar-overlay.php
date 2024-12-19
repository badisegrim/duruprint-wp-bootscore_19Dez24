<?php
/**
 * Template Name: Single Full Width with Overlay Sidebar
 * Template Post Type: post
 *
 * A custom template for single posts with full-width content and an overlay sidebar.
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
    <aside id="overlay-sidebar" class="offcanvas offcanvas-start" tabindex="-1" aria-labelledby="overlaySidebarLabel" data-bs-scroll="true" data-bs-backdrop="false"> <!--wenn aside eingeblendet data-bs-scroll=”true” ->scrollen mögl data-bs-backdrop="false" ->keine verdunkelung-->
   	 <div class="offcanvas-header">
        <h5 id="overlaySidebarLabel"><?php esc_html_e('Sidebar', 'bootscore'); ?></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
	 </div>
	 <div class="offcanvas-body">
		<?php dynamic_sidebar('sidebar-1'); ?>
	 </div>
	</aside>


    <!-- Sidebar Toggle Button -->
    <button class="btn btn-primary position-fixed" id="sideButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#overlay-sidebar" aria-controls="overlay-sidebar" style="top: 50%; left: 20px; z-index: 1050;padding: 6px 2px;">
  <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.8 44.35" width="45" height="85" fill="currentColor">
    <defs>
      <style>.cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:.75px;}</style>
    </defs>
    <path d="M3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0 1 19.005 21H4.995A1.995 1.995 0 0 1 3 19.005V4.995zM6.357 18h11.49a6.992 6.992 0 0 0-5.745-3 6.992 6.992 0 0 0-5.745 3zM12 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
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
