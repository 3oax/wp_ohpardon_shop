<?php
function oax_acf_block_render_callback( $block ) {
	
	// convert name ("acf/testimonial") into path friendly slug ("testimonial")
	$slug = str_replace('acf/', '', $block['name']);
	
	// include a template part from within the "template-parts/block" folder
	if( file_exists( get_theme_file_path("/template-parts/blocks/block-{$slug}.php") ) ) {
		include( get_theme_file_path("/template-parts/blocks/block-{$slug}.php") );
	}
}

add_action('acf/init', 'oax_acf_init');
function oax_acf_init() {
	
	// check function exists
	if( function_exists('acf_register_block') ) {
		
		// register a section header
		/*
		acf_register_block(array(
			'name'				    => 'section-header',
			'title'				    => __('Header Section'),
			'description'		  => __('Header Section'),
			'render_callback'	=> 'oax_acf_block_render_callback',
			'category'			  => 'layout',
			'icon'				    => 'align-center',
			'keywords'			  => array( 'oax', 'section', 'header' ),
		));	
		
		acf_register_block(array(
			'name'				    => 'oax-video',
			'title'				    => __('Video'),
			'description'		  => __('Video'),
			// 'render_callback'	=> 'oax_acf_block_render_callback',
			'render_template'	=> 'template-parts/blocks/block-video.php',
			'category'			  => 'media',
			'icon'				    => 'video-alt3',
			'keywords'			  => array( 'oax', 'video' ),
		));
		*/
		
	}
}
