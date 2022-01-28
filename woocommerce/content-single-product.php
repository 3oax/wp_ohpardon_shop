<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( 'v-product', $product ); ?>>

	<div class="row flex flex-wrap">
		<div class="w-full md:w-3/5 bg-grey-light flex justify-center md:pt-75 md:pb-5">
			<?php
			/**
			 * Hook: woocommerce_before_single_product_summary.
			 *
			 * @hooked woocommerce_show_product_sale_flash - 10
			 * @hooked woocommerce_show_product_images - 20
			 */
			do_action( 'woocommerce_before_single_product_summary' );
			?>
		</div>
		<div class="w-full md:w-2/5 md:pt-5">
			<div class="summary entry-summary px-15 md:px-3">
				<?php
				/**
				 * Hook: woocommerce_single_product_summary.
				 *
				 * @hooked woocommerce_template_single_title - 5
				 * @hooked woocommerce_template_single_rating - 10
				 * @hooked woocommerce_template_single_price - 10
				 * @hooked woocommerce_template_single_excerpt - 20
				 * @hooked woocommerce_template_single_add_to_cart - 30
				 * @hooked woocommerce_template_single_meta - 40
				 * @hooked woocommerce_template_single_sharing - 50
				 * @hooked WC_Structured_Data::generate_product_data() - 60
				 */
				do_action( 'woocommerce_single_product_summary' );
				?>
			</div>
		</div>
	</div>

	<?php $section_pimp = get_field('section_pimp'); ?>
	
	<?php if(!empty($section_pimp)): ?>
		<section class="c-section v-product__pimp py-5 md:py-0 md:-mt-3">
			<div class="c-section__content">
				<div class="container container-lg">
					<div class="row flex flex-wrap flex-row-reverse md:flex-row md:items-center">
						
						<div class="w-full md:w-1/2 md:pr-10 md:pl-3">
							<h2 class=""><?= $section_pimp['headline']; ?></h2>			
							<div class="md:pr-2 pt-1">
								<?= $section_pimp['content']; ?>
							</div>
						</div>

						<div class="w-full md:w-1/2 mt-2 md:mt-0">
							<?php $pimp_slider = $section_pimp['slider']; if(!empty($pimp_slider)): ?>
								<?php $img_dim = oax_get_image_dimensions($pimp_slider[0]['url']); ?>
								<div class="relative overflow-hidden" style="padding-bottom: <?= $img_dim['padding']; ?>">
									<div class="inset overflow-scroll">
										<div class="js--slider flex flex-wrap h-full" data-init-by="product" style="width: <?= ( count($pimp_slider) ) * 100 ?>%">
											<?php foreach($pimp_slider as $pimp_slider_img): ?>
												<div class="js--slider-item relative" style="width: <?= ( 100 / (count($pimp_slider)) ); ?>%">
													<?= oax_image([
														'img' => $pimp_slider_img,
														'xclass' => 'object-fit-cover inset',
														'wrapper' => true,
														'xclass_wrapper' => 'overflow-hidden inset',
														// 'placeholder' => true,
														'lazy' => true
													]); ?>
												</div>
											<?php endforeach; ?>
										</div>
									</div>
								</div>
							<?php else: ?>
								<div class="ratio-rect-tall overflow-hidden relative bg-black-light">
									<span class="absolute inset text-white">BILD FEHLT</span>
								</div>
							<?php endif; ?>
						</div>

					</div>
				</div>
			</div>
		</section>
	<?php endif; ?>
	

	<?php 
		/**
		 * Get Materialien Section
		 */
		echo oax_get_component('section-materialien'); 
	?>


	<?php 
		/**
		 * Get Design Section
		 */
		echo oax_get_component('section-designs'); 
	?>

	<div>
		<?php
		/**
		 * Hook: woocommerce_after_single_product_summary.
		 *
		 * @hooked woocommerce_output_product_data_tabs - 10
		 * @hooked woocommerce_upsell_display - 15
		 * @hooked woocommerce_output_related_products - 20
		 */
		do_action( 'woocommerce_after_single_product_summary' );
		?>
	</div>


</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>
