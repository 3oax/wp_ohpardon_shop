<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package oax_ohpardon
 */

get_header(); ?>

	<?php
	if ( have_posts() ) : ?>
		
    <?php oax_get_template_part('template-parts/page-header', [
      'bg_color' => 'bg-blue',
      
      'page_header_title' => sprintf( esc_html__( 'Search Results for: %s', 'oax-ohpardon' ), '<span>' . get_search_query() . '</span>' ),
      
      'xclass_section' => 'v-blog__header',
      'xclass_content' => '',
      'xclass_content_title' => 'leading-none',
      'xclass_content_header' => '',
      'xclass_content_body' => '',
      'xclass_content_footer' => ''      
    ]); ?>	

		<section class="c-section pt-0 pb-75">
			<div class="px-2 md:px-75">
				<div class="m-0 p-0 row flex flex-wrap md:-mx-1 list-reset v-blog__news-list">

					<?php
						/* Start the Loop */
						while ( have_posts() ) : the_post();
					?>

						<?php
							/**
							 * Run the loop for the search to output the results.
							 * If you want to overload this in a child theme then include a file
							 * called content-search.php and that will be used instead.
							 */
							get_template_part( 'template-parts/content', 'search' );
						?>
					
					<?php endwhile; ?>
				</div>
			</div>
		</section>

		<?php
		the_posts_navigation();

	else :

		get_template_part( 'template-parts/content', 'none' );

	endif; ?>

<?php
get_footer();
