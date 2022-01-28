<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package oax_ohpardon
 */

get_header(); ?>

  <?php /* oax_get_template_part('template-parts/page-header', [
    'content_v' => 'center',
    'content_h' => 'center',
    'page_header_title' => esc_html( 'Oops! That page can&rsquo;t be found.', 'oax-ohpardon' ),
    'page_header_content' => esc_html( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'oax-ohpardon' ),
    'page_header_footer' => [
	    'url' => '/',
	    'title' => 'Zurück zur Startseite'
    ],    
    'xclass_section' => 'pb-2 items-center',
    'xclass_content_footer' => 'text-center',
    'xclass_content_header' => 'text-center',
    'xclass_content_body' => 'text-center',
    'xclass_img' => 'absolute pin-r pin-t w-full h-full',
    'img' => oax_image([
      'post' => $post,
      'xclass' => 'object-cover absolute pin-l pin-t h-full w-full'
    ])
  ]); */ ?>  
  
  <?php /* oax_get_template_part('template-parts/page-header', [
		'style' => 'split',
		'page_header_title' => esc_html( 'Oops! Diese Seite existiert nicht.', 'oax-ohpardon' ),
		'page_header_content' => esc_html( 'An dieser Stelle wurde anscheinend nichts gefunden. Vielleicht versuchen Sie es mit einem der untenstehenden Links.', 'oax-ohpardon' ),  	
		'page_header_footer' => '<a href="/">Startseite</a>',
		'bg_color' => 'bg-beige-lightest',
		'xclass_section' => 'v-kontakt__header',
		'xclass_content' => 'w-4/5 md:w-full pb-4 md:pb-0 pt-2 md:pt-0 bg-white md:bg-transparent',
		'xclass_content_footer' => 'pt-2',
		'xclass_content_header' => '',
		'xclass_content_body' => 'text-green pt-1',
		'xclass_content_title' => 'text-green h4'
	]); */ ?>  

  <?php /* oax_get_template_part('template-parts/section-more-offers', [
    'bg' => 'bg-green-light',
    'stack' => true
  ]); */ ?>    
	
<?php
get_footer();
