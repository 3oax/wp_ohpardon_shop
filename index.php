<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

get_header(); ?>
		<?php $blog_page_id = get_the_ID(); ?>
		
		<?php
		if ( have_posts() ) :

			if ( is_home() && ! is_front_page() ) : ?>
				
				<?php oax_get_template_part('template-parts/page-header', [
					'bg_color' => 'bg-red',
					
					'page_header_title' => __( 'Alle Artikel', 'oax-ohpardon' ),
					
					'xclass_section' => 'v-blog__header',
					'xclass_content' => '',
					'xclass_content_title' => '',
					'xclass_content_header' => '',
					'xclass_content_body' => '',
					'xclass_content_footer' => ''      
				]); ?>			
				
				<?php $shortcode_search_all_posts = get_field('shortcode_search_all_posts', 'options'); ?>
				<?php if(!empty($shortcode_search_all_posts)): ?>
				<div class="v-blog__search relative z-content pb-2">
					<div class="container -mt-2">
						<div class="flex justify-center">
							<div class="md:w-2/3">
								<?= do_shortcode($shortcode_search_all_posts); ?>
							</div>
						</div>
					</div>
				</div>
				<?php endif; ?>
			<?php endif; ?> 
			
			<section class="c-section">
				
				<?php /*
				<div class="container">
					<?php $categories = get_categories(); ?>
					<nav class="mt-5 v-blog__filter md:-mb-2">
						<ul class="list-reset p-0 m-0">
							<li class="inline-block mb-1 md:mb-0">
								<a href="<?= get_permalink(get_option( 'page_for_posts' )) ?>" data-post-filter="0" class="btn btn--sm btn--black is-active">
									<span>Alle</span>
								</a>
							</li>
							<?php foreach($categories as $cat): ?>
								<li class="inline-block ml-1 mb-1 md:mb-0">
									<a href="<?= get_category_link($cat->term_id); ?>" data-post-filter="<?php echo $cat->term_id; ?>" class="btn btn--sm btn--black">
										<span><?php echo $cat->name; ?></span>
									</a>
								</li>
							<?php endforeach; ?>
						</ul>
					</nav>
				</div>
				*/ ?>

				<div class="px-15 md:px-75 pb-5 v-blog__news-list-container">
					<div class="m-0 p-0 row flex flex-wrap md:-mx-1 list-reset v-blog__news-list">			
						<?php 
							$paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;
							$recent_posts_query = new WP_Query( array( 
								'post__not_in' => [],
								'posts_per_page' => get_option( 'posts_per_page' ),
								'paged' => $paged
							) );					
						?>
						<?php /* Start the Loop */ 
							while($recent_posts_query->have_posts()) : $recent_posts_query->the_post(); ?>
								
								<?php $post_categories = implode(',', array_map(function($c) {
									return $c->term_id;
								}, get_the_category())); ?>	

								<?php 
									$item_categories = get_the_category(get_the_ID()); 
									$item_category = $item_categories[0];
									if( function_exists('yoast_get_primary_term_id')){
										$item_category_primary_id = yoast_get_primary_term_id( 'category', get_post() );
										if($item_category_primary_id){
											$item_category = get_term( $item_category_primary_id );
										}
									}
									$item_category->color = get_field('color', 'term_' . $item_category->term_id);								
								?>					

								<article class="w-full md:w-1/2 md:px-1 v-blog__news-list-item flex flex-wrap flex-col mt-3" data-categories='[<?= $post_categories; ?>]'>
									<div class="w-full v-blog__news-list-item-img">
										<div class="ratio-rect-lg relative">
											<div class="inset" style="opacity: 0.8; background-color: <?= $item_category->color; ?>"></div>
											<?php $imgArgs = [
												'post' => get_post(),
												'lazy' => true,
												'xclass' => 'object-fit-cover inset'
											]; ?>
											<?= oax_image($imgArgs); ?>
											<a title="<?php get_the_title(); ?>" href="<?= get_permalink(); ?>" class="no-underline absolute inset"></a>
											<a href="<?= get_category_link($item_category); ?>" class="no-underline absolute bottom-0 left-0 px-1 py-05 uppercase text-white-full font-serif hover:text-white-full" style="background-color: <?= $item_category->color; ?>">
												<?= $item_category->name; ?>
											</a>
										</div>
									</div>
									<div class="w-full pt-2 v-blog__news-list-item-content flex flex-wrap w-full">
										<div class="self-start w-full">
											<h3 class="h2 mb-0 mt-0 font-serif">
												<a href="<?= get_permalink(); ?>" class="no-underline"><?php the_title(); ?></a>
											</h3>
											
											<?php
												$posttags = get_the_tags();
												if ($posttags): 
											?>						
											<ul class="w-full v-blog__news-list-item-tags pt-1 m-0 px-0">
												<?php $posttags_i = 0; foreach($posttags as $tag): ?>
													<li class="badge font-serif inline-block relative mt-05<?php echo $posttags_i > 0 ? ' ml-025' : ''; ?>">
														<div class="absolute inset" style="opacity: 0.7; background-color: <?= $item_category->color; ?>"></div>
														<a href="<?= get_tag_link($tag); ?>" class="relative py-025 px-1 inline-block text-sm no-underline text-white-full uppercase hover:text-white-full"><?php echo $tag->name; ?></a>
													</li>
												<?php $posttags_i++; endforeach; ?>								
											</ul>
											<?php endif; ?>	

											<?php 
												$teaser = !empty(get_field('teaser')) ? get_field('teaser') : get_the_excerpt(); 
											?>
											<div class="pt-15">
												<p class="">
													<?= wp_trim_words($teaser, 15); ?>
													<a href="<?= get_permalink(); ?>" class="font-bold uppercase italic no-underline">weiterlesen</a>
												</p>
											</div>

										</div>
									</div>
								</article>
							
						<?php endwhile; ?>
		
					</div>
					
					<div class="mt-4 w-full flex c-blog-pagination js--pagination justify-center">
						<?php 	
							$big = 999999999999;
							echo paginate_links( array(
								'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
								'end_size' => 0,
								'mid_size' => 4,
								'type' => 'plain',
								'current' => max(1, get_query_var('paged') ),
								'prev_text' => __('&laquo; Zurück'),
								'next_text' => __('Weiter &raquo;')
							) );
						?>
					</div>

				</div>
			</section>

		<?php	else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>

<?php
// get_sidebar();
get_footer();
