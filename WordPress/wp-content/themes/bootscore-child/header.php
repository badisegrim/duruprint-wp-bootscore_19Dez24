<?php
/**
 * The header for our child theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Bootscore
 * @version 6.0.0
 */

// Exit if accessed directly
// Ensure that this file is not accessed directly for security reasons
defined('ABSPATH') || exit;

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); // Hook for including the header-specific scripts and styles ?>
</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); // Hook to open the body tag, useful for accessibility and tracking codes ?>

<div id="page" class="site">
  
  <a class="skip-link visually-hidden-focusable" href="#primary"><?php esc_html_e('Skip to content', 'bootscore'); ?></a> <!-- Link to skip directly to the main content for accessibility -->

  <!-- Top Bar Widget -->
  <?php if (is_active_sidebar('top-bar')) : ?>
    <?php dynamic_sidebar('top-bar'); // Display the top bar widget if it is active ?>
  <?php endif; ?>  

  <header id="masthead" class="<?= apply_filters('bootscore/class/header', 'sticky-top bg-body-tertiary'); ?> site-header">

    <nav id="nav-main" class="navbar <?= apply_filters('bootscore/class/header/navbar/breakpoint', 'navbar-expand-lg'); ?>">

      <div class="<?= apply_filters('bootscore/class/container', 'container', 'header'); ?>">
        
        <!-- Navbar Menu -->
        <div class="d-flex align-items-center justify-content-between w-100">

          <!-- Navbar Toggler (Mobile View) -->
          <button class="<?= apply_filters('bootscore/class/header/button', 'btn btn-outline-secondary', 'nav-toggler'); ?> <?= apply_filters('bootscore/class/header/navbar/toggler/breakpoint', 'd-lg-none'); ?> ms-1 ms-md-2 nav-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-navbar" aria-controls="offcanvas-navbar">
            <i class="fa-solid fa-bars"></i><span class="visually-hidden-focusable">Menu</span> <!-- Hamburger icon for mobile navigation -->
          </button>

        </div>

        <!-- Offcanvas Navbar for Mobile View -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas-navbar">
          <div class="offcanvas-header">
            <span class="h5 offcanvas-title"><?= apply_filters('bootscore/offcanvas/navbar/title', __('Menu', 'bootscore')); ?></span>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button> <!-- Close button for the offcanvas menu -->
          </div>
          <div class="offcanvas-body text-center">
            <!-- Offcanvas Left and Right Menus -->
            <ul class="navbar-nav me-auto d-flex flex-lg-row flex-column align-items-lg-center"> <!-- Display menus in row for large screens and column for mobile -->
              <?php
              wp_nav_menu(array(
                'theme_location' => 'left-menu', // Define the location of the left menu
                'container' => false,
                'items_wrap' => '%3$s', // Remove the default wrapping <ul> tag
                'depth' => 5, // Allow dropdown menus up to 5 levels deep
                'walker' => new WP_Bootstrap_Navwalker(), // Use custom Navwalker to remove dropdown indicators
              ));
              ?>
            </ul>

			  
			  
            <!-- Navbar Brand (Logo) -->
            
			<a class="navbar-brand mx-auto d-none d-sm-block" id="site-logo-link" href="<?php echo esc_url(home_url()); ?>">
				<img id="site-logo" src="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/img/logo/logo.svg'); ?>" 
					 alt="50 Jahre – Duruprint Druckerei Logo" 
					 class="me-2" 
					 data-logo-light="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/img/logo/logo.svg'); ?>" 
					 data-logo-dark="<?php echo esc_url(get_stylesheet_directory_uri() . '/assets/img/logo/logo-theme-dark.svg'); ?>" />
			</a>





            <ul class="navbar-nav ms-auto d-flex flex-lg-row flex-column align-items-lg-center"> <!-- Display menus in row for large screens and column for mobile -->
              <?php
              wp_nav_menu(array(
                'theme_location' => 'right-menu', // Define the location of the right menu
                'container' => false,
                'items_wrap' => '%3$s', // Remove the default wrapping <ul> tag
                'depth' => 5, // Allow dropdown menus up to 5 levels deep
                'walker' => new WP_Bootstrap_Navwalker(), // Use custom Navwalker (for better compatibility with Bootstrap) to remove dropdown indicators
              ));
              ?>
            </ul>

            <!-- Top Nav 2 Widget (Optional) -->
            <?php if (is_active_sidebar('top-nav-2')) : ?>
              <?php dynamic_sidebar('top-nav-2'); // Display the second top nav widget if it is active ?>
            <?php endif; ?>

          </div>
        </div>

        <div class="header-actions d-flex align-items-center">

          <!-- Top Nav Widget (Optional) -->
          <?php if (is_active_sidebar('top-nav')) : ?>
            <?php dynamic_sidebar('top-nav'); // Display the top nav widget if it is active ?>
          <?php endif; ?>

          <?php
          if (class_exists('WooCommerce')) :
            get_template_part('template-parts/header/actions', 'woocommerce'); // Display WooCommerce actions if WooCommerce is active
          else :
            get_template_part('template-parts/header/actions'); // Display default actions if WooCommerce is not active
          endif;
          ?>

        </div><!-- .header-actions -->

      </div><!-- .container -->

    </nav><!-- .navbar -->

    <?php
    if (class_exists('WooCommerce')) :
      get_template_part('template-parts/header/collapse-search', 'woocommerce'); // Display WooCommerce search if WooCommerce is active
    else :
      get_template_part('template-parts/header/collapse-search'); // Display default search if WooCommerce is not active
    endif;
    ?>

    <!-- Offcanvas User and Cart (WooCommerce) -->
    <?php
    if (class_exists('WooCommerce')) :
      get_template_part('template-parts/header/offcanvas', 'woocommerce'); // Display WooCommerce offcanvas user and cart if WooCommerce is active
    endif;
    ?>

  </header><!-- #masthead -->
