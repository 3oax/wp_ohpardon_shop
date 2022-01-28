<?php
/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

?>

<?php $post_categories = implode(',', array_map(function($c) {
	return $c->term_id;
}, get_the_category())); ?>	

<?php $category = array_reverse(get_the_category()); $current_category = $category[0]; ?>		
<?php 
	$item_category = $current_category;
	$item_category->color = get_field('color', 'term_' . $item_category->term_id);								
?>					

<article class="w-full md:w-1/2 md:px-1 v-blog__news-list-item flex flex-wrap flex-col mt-3" data-categories='[<?= $post_categories; ?>]'>
	<?php if(get_post_type() == 'post'): ?>
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
	<?php endif; ?>
	<div class="w-full pt-15 v-blog__news-list-item-content flex flex-wrap w-full">
		<div class="self-start w-full">
			<h3 class="h2 mb-0 mt-0 font-serif">
				<a href="<?= get_permalink(); ?>" class="no-underline"><?php the_title(); ?></a>
			</h3>
			
			<?php
				$posttags = get_the_tags();
				if ($posttags): 
			?>						
			<ul class="w-full v-blog__news-list-item-tags pt-15 m-0 px-0">
				<?php foreach($posttags as $tag): ?>
					<li class="badge font-serif inline-block relative">
						<div class="absolute inset" style="opacity: 0.7; background-color: <?= $item_category->color; ?>"></div>
						<a href="<?= get_tag_link($tag); ?>" class="relative py-025 px-1 inline-block text-sm no-underline text-white-full uppercase hover:text-white-full"><?php echo $tag->name; ?></a>
					</li>
				<?php endforeach; ?>								
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

