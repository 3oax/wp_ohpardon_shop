<?php
/**
 * Template Name: Tags
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

get_header();

$terms = get_terms( 'product_tag', [ 'hide_empty' => false ] );

$term_array = array();
if ( ! empty( $terms ) ){
	foreach ( $terms as $term ) {
		$term_array[] = [
			'obj' => $term,
			'name' => $term->name,
			'img' => get_field('img', $term->taxonomy . '_' . $term->term_id)
		];
	}
}
?>

<section class="c-section c-section--products pt-75">
	<div class="c-section__content">

		<div class="container container-lg">
			
			<ul class="list-none p-0 m-0 flex flex-wrap items-center -mx-05 -mt-1">
				<?php foreach($term_array as $term): ?>
					<li class="px-05 w-1/2 md:w-1/3 pt-1">
						<a href="<?= get_term_link($term['obj']); ?>" class="ratio-square block relative overflow-hidden">
							<?= oax_image([
								'img' => $term['img'],
								'xclass' => 'inset object-fit',
								'lazy' => true
							]); ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
			
		</div>
	</div>
</section>

<?php
get_footer();
