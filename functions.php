<?php
/**
 * Oax 2k19 functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package oax_ohpardon
 */

require get_template_directory() . '/inc/helper.php';

if ( ! function_exists( 'oax_template_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function oax_template_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Oax OhPardon, use a find and replace
		 * to change 'oax-ohpardon' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'oax-ohpardon', get_template_directory() . '/assets/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Add Image Sizes
		 */		
		add_image_size( 'medium-xl', 768, 768 );
		add_image_size( 'large-xl', 1500, 1500 );		
		add_image_size( 'thumbnail-blur', 10, 10 );

		/*
		 * Remove Medium Large IMG Size
		 */		
		add_filter( 'intermediate_image_sizes', function( $sizes )
		{
			return array_filter( $sizes, function( $val )
			{
					return 'medium_large' !== $val; // Filter out 'medium_large'
			} );
		} );

		// This theme uses wp_nav_menu() in ome location.
		register_nav_menus( array(
			'main' => esc_html__( 'Primary', 'oax-ohpardon' ),
			'mainsearch' => esc_html__( 'Search', 'oax-ohpardon' )
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Add theme support for selective refresh for widgets.
		// 
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );

		/*
		 * Add WooCommerce Support
		 */
		add_theme_support( 'woocommerce' );
	}
endif;
add_action( 'after_setup_theme', 'oax_template_setup' );

/**
 * Theme Support
 * ----------------------
 * 
 * SVG Support
 */
function oax_svg_support ( $svg_mime ){
	$svg_mime['svg'] = 'image/svg+xml';
	return $svg_mime;
}
add_filter( 'upload_mimes', 'oax_svg_support' );

function oax_ignore_upload_ext($checked, $file, $filename, $mimes){
	if(!$checked['type']){
		$wp_filetype = wp_check_filetype( $filename, $mimes );
		$ext = $wp_filetype['ext'];
		$type = $wp_filetype['type'];
		$proper_filename = $filename;
 
		if($type && 0 === strpos($type, 'image/') && $ext !== 'svg'){
			$ext = $type = false;
		}
 
		$checked = compact('ext','type','proper_filename');
	}
 
	return $checked;
 }
 add_filter('wp_check_filetype_and_ext', 'oax_ignore_upload_ext', 10, 4);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function oax_template_widgets_init() {
	register_sidebar( array(
		'name' => 'Footer Left',
		'id' => 'footer-left',
		'description' => 'Appears in the footer area',
		'before_widget' => '<div id="%1$s" class="">',
		'after_widget' => '</div>',
		'before_title' => '<h6 class="site__footer-col-title mb-15 mt-0">',
		'after_title' => '</h6>',
	) );
	register_sidebar( array(
		'name' => 'Footer Right',
		'id' => 'footer-right',
		'description' => 'Appears in the footer area',
		'before_widget' => '<div id="%1$s" class="">',
		'after_widget' => '</div>',
		'before_title' => '<h6 class="site__footer-col-title mb-15 mt-0">',
		'after_title' => '</h6>',
	) );	
	register_sidebar( array(
		'name' => 'Footer Bottom',
		'id' => 'footer-bottom',
		'description' => 'Appears in the footer area',
		'before_widget' => '<div id="%1$s" class="">',
		'after_widget' => '</div>',
		'before_title' => '<h6 class="site__footer-col-title sr-only">',
		'after_title' => '</h6>',
	) );	
}
add_action( 'widgets_init', 'oax_template_widgets_init' );

/**
 * Disable the emoji's
 */
function disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );	
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );	
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	
	// Remove from TinyMCE
	add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
}
add_action( 'init', 'disable_emojis' );

/**
 * Filter out the tinymce emoji plugin.
 */
function disable_emojis_tinymce( $plugins ) {
	if ( is_array( $plugins ) ) {
		return array_diff( $plugins, array( 'wpemoji' ) );
	} else {
		return array();
	}
}

/**
 * Enqueue scripts and styles.
 */
function oax_template_setup_scripts() {
	wp_enqueue_script('jquery');
	wp_add_inline_script( 'jquery-core', '$ = jQuery;' );

	// Remove CF7 Scripts
	//
	if( class_exists( 'WPCF7' ) ) {
		wp_dequeue_script( 'contact-form-7' );
		wp_enqueue_script( 'contact-form-7' );
		wp_deregister_style( 'contact-form-7' );
		wp_dequeue_style( 'contact-form-7' );
	}

	wp_deregister_style( 'jetpack_css' );
	wp_dequeue_style( 'jetpack_css' );

	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_deregister_script('wp-mediaelement');
	wp_deregister_style('wp-mediaelement');	
	
	wp_enqueue_style( 'oax-ohpardon-style', get_template_directory_uri() . '/build/css/main.css' );	
		
	// Polyfills
	//
	// wp_enqueue_script( 'oax-polyfills', '//cdn.polyfill.io/v2/polyfill.min.js', array(), '2', false);

	// Vendor Scripts
	//
	wp_enqueue_script( 'oax-ohpardon-vendor', get_template_directory_uri() . '/build/js/vendor.js', array(), '', true );
	wp_enqueue_script( 'oax-ohpardon-vendor-swiper', get_template_directory_uri() . '/assets/js/lib/swiper-bundle.min.js', array(), '', true );
	
	// Main Script
	//
	wp_enqueue_script( 'oax-ohpardon-app', get_template_directory_uri() . '/build/js/main.js', array(), '', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		// wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'oax_template_setup_scripts' );

function oax_custom_excerpt_length( $length ) {
	return 30;
}
add_filter( 'excerpt_length', 'oax_custom_excerpt_length', 999 );

// Remove Description like "Tag:", "Category" before archive
//
add_filter( 'get_the_archive_title', function ($title) {    
	if ( is_category() ) {    
		$title = single_cat_title( '', false );    
	} elseif ( is_tag() ) {    
		$title = single_tag_title( '', false );    
	} elseif ( is_author() ) {    
		$title = '<span class="vcard">' . get_the_author() . '</span>' ;    
	} elseif ( is_tax() ) { //for custom post types
		$title = sprintf( __( '%1$s' ), single_term_title( '', false ) );
	} elseif (is_post_type_archive()) {
		$title = post_type_archive_title( '', false );
	}
	return $title;    
});

/**
 * Setup Woocommerce
 */
require get_template_directory() . '/inc/template-setup-woocommerce.php';

/**
 * Required Plugins
 */
require get_template_directory() . '/inc/template-plugins.php';

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Shortcodes which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-shortcodes.php';

/**
 * Template Options.
 */
require get_template_directory() . '/inc/api-endpoints.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Core BLOCKS Customize
 */
require get_template_directory() . '/inc/template-blocks-customize.php';

/**
 * Generating dynamic sytles.
 */
require get_template_directory() . '/inc/dynamic-styles.php';

/**
 * Ajax Functions / Actions
 */
require get_template_directory() . '/inc/ajax-functions.php';

/**
 * Import ACF
 */
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page('Theme Settings');
}
require get_template_directory() . '/acf/acf.php';
