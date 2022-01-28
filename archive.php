<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

get_header(); ?>
		
		<?php $page_header_title = get_the_archive_title(); ?>
		<?php if( is_category() ): ?>
			<?php $category = array_reverse(get_the_category()); $current_category = $category[0]; ?>		
			<?php 
				$item_category = $current_category;
				
				if( function_exists('yoast_get_primary_term_id')){
					$item_category_primary_id = yoast_get_primary_term_id( 'category', get_post() );
					if($item_category_primary_id){
						$item_category = get_term( $item_category_primary_id );
					}
				}

				$item_category->color = get_field('color', 'term_' . $item_category->term_id);
				$item_category->icon = !empty(get_field('icon', 'term_' . $item_category->term_id)) ? get_field('icon', 'term_' . $item_category->term_id) : false;
        if( !empty( get_field('name_formatted', 'term_' . $item_category->term_id) ) ){
          $page_header_title = get_field('name_formatted' , 'term_' . $item_category->term_id);
        }				
			?>		
		<?php elseif( is_tag() ): ?>
			<?php 
				$currentTag = get_tag(get_query_var('tag_id'));
				$themeConfig = oax_get_theme_config_json();
				$item_category = new stdClass();
				$item_category->color = $themeConfig['colors']['blue'];
				$item_category->icon = false;
			?>
		<?php elseif( is_author() ): ?>
			<?php 
				$currentAuthor = get_tag(get_query_var('author_id'));
				$themeConfig = oax_get_theme_config_json();
				$item_category = new stdClass();
				$item_category->color = $themeConfig['colors']['blue'];
				$item_category->icon = false;
			?>			
		<?php endif; ?>

    <?php oax_get_template_part('template-parts/page-header', [
      'bg_color' => $item_category->color,
      
			'page_header_title_icon' => $item_category->icon,
      'page_header_title' => $page_header_title,
      
      'xclass_section' => 'v-blog__header',
      'xclass_content' => '',
      'xclass_content_title' => 'flex items-center justify-center',
      'xclass_content_header' => '',
      'xclass_content_body' => '',
      'xclass_content_footer' => ''      
    ]); ?>	

		<?php
		if ( have_posts() ) : ?>

			<?php if(is_tag()): ?>
				<?php $shortcode_category_search = get_field('search', 'term_' . $currentTag->term_id); ?>
			<?php elseif( is_author() ): ?>
				<?php $shortcode_category_search = get_field('search', 'user_' . get_the_author_meta('ID')); ?>
			<?php else: ?>
				<?php $shortcode_category_search = get_field('search', 'term_' . $item_category->term_id); ?>
			<?php endif; ?>
			
			<?php $shortcode_search_all_posts = get_field('shortcode_search_all_posts', 'options'); ?>
			
			<?php if(!empty($shortcode_category_search) || !empty($shortcode_search_all_posts)): ?>
				<div class="v-blog__search relative z-content pb-2">
					<div class="container -mt-2">
						<div class="flex justify-center">
							<div class="md:w-2/3">
								<?php if(!empty($shortcode_category_search)): ?>
									<?= do_shortcode($shortcode_category_search); ?>
								<?php else: ?>	
									<?= do_shortcode($shortcode_search_all_posts); ?>
								<?php endif; ?>	
							</div>
						</div>
					</div>
				</div>
			<?php endif; ?>

			<section class="c-section pt-0 pb-75">
				<div class="px-2 md:px-75">
					<div class="m-0 p-0 row flex flex-wrap md:-mx-1 list-reset v-blog__news-list">
						<?php while ( have_posts() ) : the_post(); ?>

							<?php $post_categories = implode(',', array_map(function($c) {
								return $c->term_id;
							}, get_the_category())); ?>	

							<?php if( is_tag() || is_author() ): ?>
								<?php 
									$item_categories = get_the_category(get_the_ID()); 
									$item_category = $item_categories[0];
									$item_category->color = get_field('color', 'term_' . $item_category->term_id);								
								?>							
							<?php endif; ?>

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
										<a title="<?= get_the_title(); ?>" href="<?= get_permalink(); ?>" class="no-underline absolute inset"></a>
										<a href="<?= get_category_link($item_category); ?>" class="no-underline absolute bottom-0 left-0 px-1 py-05 uppercase text-white-full font-serif hover:text-white-full" style="background-color: <?= $item_category->color; ?>">
											<?= $item_category->name; ?>
										</a>
									</div>
								</div>
								<div class="w-full pt-15 v-blog__news-list-item-content flex flex-wrap w-full">
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
					
					<div class="mt-4 w-full flex c-blog-pagination items-center js--pagination">
						<div>
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

				</div>
			</section>

			<?php 

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>

<?php
get_sidebar();
get_footer();
