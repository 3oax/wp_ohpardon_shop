<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

?>

<?php if( is_single() ): ?>		
	<?php 
		$item_categories = get_the_category(); 
		$item_category = $item_categories[0];

		if( function_exists('yoast_get_primary_term_id')){
			$item_category_primary_id = yoast_get_primary_term_id( 'category', get_post() );
			if($item_category_primary_id){
				$item_category = get_term( $item_category_primary_id );
			}
		}
				
		$item_category->color = get_field('color', 'term_' . $item_category->term_id);		
	?>
<?php endif; ?>

<article id="post-<?php the_ID(); ?>" <?php post_class('v-post bg-white-full'); ?><?php if( is_single() ): ?> style="--highlight-color: <?= $item_category->color; ?>; --plyr-color-main: <?= $item_category->color; ?>"<?php endif; ?>>
	
	<?php if( is_single() ): ?>		

		<header class="v-post__header c-section c-section--header flex md:block items-end pb-3 pt-75 md:pt-10 md:pb-3 relative">
			<div class="c-section__content relative">
				<div class="container">
					<div class="row">	
						<div class="w-full flex flex-col-reverse">									
							<h1 class="my-0 font-serif leading-none entry-title entry-title--md">
								<?php /*
								<?= implode(array_map(function($value){
									return '<span>' . $value . '</span>';
								}, explode(' ',get_the_title())), ' '); ?>
								*/ ?>
								<?= get_the_title(); ?>
							</h1>
							<div class="v-post__meta font-bold font-sans mb-15" style="color: rgb(229,229,229)">
								<a href="<?= get_category_link($item_category); ?>" class="inline-block no-underline v-post__category"><?= $item_category->name; ?></a>
								<span class="inline-block v-post__date"> &ndash; <?= get_the_date(); ?></span>
							</div>
						</div>
						<?php
							$posttags = get_the_tags();
							if ($posttags): 
						?>						
						<ul class="w-full v-post__tags mt-1 ml-0 p-0">
							<?php $posttags_i = 0; foreach($posttags as $tag): ?>
								<li class="badge font-serif inline-block list-none<?php echo $posttags_i > 0 ? ' ml-025' : ''; ?>">
									<a href="<?= get_tag_link($tag); ?>" class="relative py-025 px-1 inline-block text-sm no-underline text-white-full hover:text-white-full"><?php echo $tag->name; ?></a>
								</li>
							<?php $posttags_i++; endforeach; ?>								
						</ul>
						<?php endif; ?>						
					</div>
				</div>
			</div>			
		
		</header>		

	<?php else: ?>
		
	<?php endif; ?>

	<div class="c-section pb-5">
		<div class="container relative">
			
			<?php /*		
			<div class="entry-header">
				<?php
				if ( 'post' === get_post_type() ) : ?>
				<div class="entry-meta mt-2">
					<?php oax_ohpardon_posted_on(); ?>
				</div><!-- .entry-meta -->
				<?php
				endif; ?>
			</div><!-- .entry-header -->
			*/ ?>
			<?php if( is_single() ): ?>
				
				<?php 
					// Post Navigation
					// 
					$content_blocks = parse_blocks(get_the_content());
					$post_nav = []; 

					foreach($content_blocks as $cblocks){
						if($cblocks['blockName'] == 'core/heading'){							
							preg_match_all("/id=\"(.*?)\"/", $cblocks['innerHTML'], $block_matches);
							if( !empty($block_matches[1]) ){
								$block_content_html_id = $block_matches[1][0];			
								$post_nav[$block_content_html_id] = strip_tags($cblocks['innerHTML']);
							}							
						}
					}
				?>
				<?php if(!empty($post_nav)): ?>
					
					<nav class="v-post__nav relative left-0 top-0 mb-2 md:mb-0 md:-ml-75">
						<ul class="list-none flex m-0 p-0 flex-wrap md:flex-row-reverse text-sm">
							<?php $post_nav_i = 0; foreach($post_nav as $post_nav_item_key => $post_nav_item_val): ?>
								<li class="block md:inline <?php if($post_nav_i > 0): ?>md:mr-1<?php endif; ?>">
									<a href="#<?= $post_nav_item_key; ?>" class="font-bold"><?= $post_nav_item_val; ?></a>
								</li>
							<?php $post_nav_i++; endforeach; ?>
						</ul>
					</nav>

				<?php endif; ?>
			<?php endif; ?>

			<div class="v-post__content">
				<?php
					the_content( sprintf(
						wp_kses(
							/* translators: %s: Name of current post. Only visible to screen readers */
							__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'oax-ohpardon' ),
							array(
								'span' => array(
									'class' => array(),
								),
							)
						),
						get_the_title()
					) );
				?>
				
				<?php
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'oax-ohpardon' ),
						'after'  => '</div>',
					) );
				?>
			</div><!-- .entry-content -->

		</div>
	</div>

	<?php if( is_single() ): ?>
				
		<footer class="entry-footer mt-1">
			<div class="container">
				
				<?php /*
				<div class="flex align-center justify-between">
					<?php // oax_ohpardon_entry_footer(); ?>
					<?= oax_get_component('button', [
						'link' => 'javascript:history.back()',
						'text' => '« Zurück',
						'type' => 'round'
					]); ?>
					<?= oax_get_component('button', [
						'link' => get_permalink(get_option( 'page_for_posts' )),
						'text' => 'Alle Blogartikel',
						'type' => 'round'
					]); ?>	
				</div>
				*/ ?>

				<?php 
					$item_author_id = get_the_author_meta('ID');
					$item_author_img = get_field('user_img', 'user_' . $item_author_id);
				?>
				<div class="pb-3">
					<div class="flex flex-wrap items-center bg-blue-2-40">
						<div class="w-1/2 md:w-1/4 overflow-hidden order-first">
							<a href="<?= get_author_posts_url( $item_author_id ); ?>" title="Authorseite: <?= get_the_author_meta( 'first_name' , $item_author_id ) ?> <?= get_the_author_meta( 'last_name' , $item_author_id ) ?>">
								<?php if( !empty( $item_author_img ) ): ?>
									<?= oax_image([
										'img' => $item_author_img,
										'wrapper' => true,
										'xclass_wrapper' => 'relative overflow-hidden ratio-square',
										'xclass' => 'object-fit-cover inset'
									]) ?>								
								<?php else: ?>
									<?= oax_image([
										'src' => get_avatar_url( $item_author_id, [
											'size' => 330
										] ),
										'wrapper' => true,
										'holder' => false,
										'xclass_wrapper' => 'ratio-square',
										'xclass' => 'object-fit-cover inset'
									]) ?>
								<?php endif; ?>
							</a>
						</div>
						<div class="w-full md:w-1/2 px-2 mt-2 pb-2 md:pb-0 md:mt-0 flex justify-center md:items-center order-last md:order-2">
							<div class="text-center md:text-left">
								<h5 class="h3 mb-05">
									<?= get_the_author_meta( 'first_name' , $item_author_id ) ?>
									<?= get_the_author_meta( 'last_name' , $item_author_id ) ?>
								</h5>
								<?= get_the_author_meta( 'description' , $item_author_id ) ?>
							</div>
						</div>
						<div class="w-1/2 md:w-1/4 flex items-center order-2 md:order-last">
							<ul class="m-0 py-0 pr-0 pl-2 md:pl-0 list-none text-sm">
								<?php if(!empty(get_the_author_meta( 'user_url' , $item_author_id ))): ?>
									<li><a rel="nofollow,noopener" target="_blank" href="<?= get_the_author_meta( 'user_url' , $item_author_id ) ?>">Website</a></li>
								<?php endif; ?>
								<?php if(!empty(get_the_author_meta( 'facebook' , $item_author_id ))): ?>
									<li><a rel="nofollow,noopener" target="_blank" href="<?= get_the_author_meta( 'facebook' , $item_author_id ) ?>">Facebook</a></li>
								<?php endif; ?>
								<?php if(!empty(get_the_author_meta( 'instagram' , $item_author_id ))): ?>
									<li><a rel="nofollow,noopener" target="_blank" href="<?= get_the_author_meta( 'instagram' , $item_author_id ) ?>">Instagram</a></li>
								<?php endif; ?>
								<?php if(!empty(get_field('email_public', 'user_' . $item_author_id))): ?>
									<li><a rel="nofollow,noopener" href="mailto:<?= get_field('email_public', 'user_' . $item_author_id) ?>">E-Mail</a></li>
								<?php endif; ?>
							</ul>
						</div>
					</div>
				</div>
			</div>	
			
			<div class="c-section v-post__recommended">
				<div class="c-section__bg bg-white"></div>
				<div class="c-section__content">
					<div class="py-10 text-center bg-blue">
						<h5 class="entry-title text-white-full pb-3"><?= __( 'Passende Artikel', 'oax-ohpardon' ); ?></h5>
					</div>
					<div class="-mt-5">
					<?php						
						$recommendedPosts = [];
						$recommendedPostsPerPage = 5;
						$recommendedPosts_raw = get_field('recommended_posts');
						
						if(isset($recommendedPosts_raw) && !empty($recommendedPosts_raw)){
						
							foreach( $recommendedPosts_raw as $rP ){
								$recommendedPosts[] = $rP['post'];
							}
						
						} else {
							$post_tagArray = array();
							
							$post_tags = get_the_tags( get_the_ID() );
							if(!empty($post_tags)){
								foreach($post_tags as $tagkey => $tagvalue) {
									$post_tagArray[$tagkey] = $tagvalue->slug;
								}
							}

							$recommendedArgs = array(
								'orderby' => 'rand',
								'tax_query' => array(
										'relation' => 'OR',
										array(
												'taxonomy' => 'category',
												'field' => 'id',
												'terms' => wp_get_post_categories( get_the_ID() ),
												'include_children' => false 
										),
										array(
												'taxonomy' => 'post_tag',
												'field' => 'slug',
												'terms' => $post_tagArray,
										)
								),				
								'post_status' => array('publish'),		
								'post__not_in' => array( get_the_ID() ),
								'posts_per_page' => $recommendedPostsPerPage,
							);
							$recommendedQuery = new WP_Query($recommendedArgs);							
							$recommendedPosts = $recommendedQuery->posts;
							wp_reset_postdata();

							if(count($recommendedPosts) != $recommendedPostsPerPage){

								$recommendedPostIds = [];
								foreach($recommendedPosts as $rP ){
									$recommendedPostIds[] = $rP->ID;
								}
	
								$recommendedArgs_fillup = array(
									'orderby' => 'rand',
									'post_status' => array('publish'),					
									'post__not_in' => array_merge( array( get_the_ID() ), $recommendedPostIds),
									'posts_per_page' => $recommendedPostsPerPage - count($recommendedPosts),
								);
								$recommendedQuery_fillup = new WP_Query($recommendedArgs_fillup);
								$recommendedPosts = array_merge($recommendedPosts, $recommendedQuery_fillup->posts);
								wp_reset_postdata();
							}
						}

						echo oax_get_component('slider/slide-track', [
							'items' => $recommendedPosts
						]); 
					?>						
					</div>
				</div>
			</div>

		</footer><!-- .entry-footer -->

    <?php 
      echo oax_get_component('section-beratungsmap', []);     
    ?>

	<?php endif; ?>

</article><!-- #post-<?php the_ID(); ?> -->
