<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

?>

<?php oax_get_template_part('template-parts/page-header', [
	'bg_color' => 'bg-blue',
	
	'page_header_title' => __( 'Nothing Found', 'oax-ohpardon' ),
	'page_header_bg_canvas' => false,

	'xclass_section' => ' v-kontakt__header',
	'xclass_content' => '',
	'xclass_content_title' => '',
	'xclass_content_header' => '',
	'xclass_content_body' => '',
	'xclass_content_footer' => ''      
]); ?> 

<section class="no-results not-found py-5">

	<div class="container">
		<?php
		if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>

			<p><?php
				printf(
					wp_kses(
						/* translators: 1: link to WP admin new post page. */
						__( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'oax-ohpardon' ),
						array(
							'a' => array(
								'href' => array(),
							),
						)
					),
					esc_url( admin_url( 'post-new.php' ) )
				);
			?></p>

		<?php elseif ( is_search() ) : ?>

			<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'oax-ohpardon' ); ?></p>
			<?php
				get_search_form();

		else : ?>

			<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'oax-ohpardon' ); ?></p>
			<?php
				get_search_form();

		endif; ?>
	</div><!-- .page-content -->
</section><!-- .no-results -->
