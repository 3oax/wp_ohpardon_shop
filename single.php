<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package oax_ohpardon
 */

get_header(); ?>

	<?php
	while ( have_posts() ) : the_post();

		get_template_part( 'template-parts/content', get_post_type() );

	?>
	
	<?php /*
	<div class="container">
	<?php
		
		the_post_navigation( array(
			'prev_text' => '<span class="nav-subtitle">' . __( 'Previous:', 'oax-ohpardon' ) . '</span> <span class="nav-title">%title</span>',
			'next_text' => '<span class="nav-subtitle">' . __( 'Next:', 'oax-ohpardon' ) . '</span> <span class="nav-title">%title</span>',
		) );

		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;

	endwhile; // End of the loop.
	?>
	</div>
	*/ ?>

	<?php endwhile; // End of the loop. ?>
<?php
// get_sidebar();
get_footer();
