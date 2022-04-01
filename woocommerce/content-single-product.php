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
		<div class="w-full md:w-3/5 bg-grey-light flex justify-center pt-5 md:pt-75 md:pb-5">
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
		<div class="w-full md:w-2/5 md:pt-5 md:pb-5">
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
	
	<?php // if(!empty($section_pimp)): ?>
		<section class="c-section c-section--product-layout c-section--product-layout--1 v-product__pimp pt-0 pb-5 md:py-0 md:-mt-3">
			<div class="c-section__content">
				<div class="container container-lg">
					<div class="row flex flex-wrap flex-row-reverse md:flex-row md:items-center md:justify-end">
						
						<?php if( !empty($section_pimp['headline']) ): ?>
							<div class="w-full md:w-1/2 md:pr-10 md:pl-3">
								<h2 class=""><?= $section_pimp['headline']; ?></h2>			
								<div class="md:pr-2 pt-1">
									<?= $section_pimp['content']; ?>
								</div>
							</div>
						<?php endif; ?>
						
						<div class="w-full md:w-1/2 mt-2 md:mt-0">
							<?php $pimp_slider = $section_pimp['slider']; if(!empty($pimp_slider)): ?>
								<?php 
									$pimp_slider_items = [];
									foreach($pimp_slider as $slide_img){
										$pimp_slider_items[] = [
											'img' => $slide_img,
											'xclass' => 'inset',
											'xclass_wrapper' => 'mx-0 bg-grey-light',
											'wrapper' => true,
											'holder' => true,
											'lazy' => 'slider'
										];
									}								
									echo oax_get_component('slider/slide-track', [
										'items' => $pimp_slider_items,
										'ITEMS_SHOW_LG' => 1,
										'ITEMS_SHOW_SM' => 1,
                    'xclass' => [
                      'inner' => 'pb-0',
                      'track' => 'px-0 mx-0 flex-end',
                      'main' => 'js--slider--bottom-nav',
                    ]
									]);								
								?>
							<?php else: ?>
								<?php 
									do_action( 'woocommerce_product_thumbnails' );
								?>
							<?php endif; ?>
						</div>

					</div>
				</div>
			</div>
		</section>
	<?php // endif; ?>

	<?php // Video Section ?>
	<section class="c-section c-section--product-layout c-section--product-layout--4">
		<?= oax_video([
			'src' => 'http://shop.ohpardon.art/wp-content/uploads/2022/04/Untitled.mov',
			'wrapper' => true,
			'xclass_wrapper' => 'bg-grey',
			'holder' => true,
			'lazy' => true
		]); ?>
		<div class="inset flex flex-wrap items-center md:items-end justify-center md:justify-end text-white">
			<div class="w-4/5 md:w-1/3 md:pb-2 md:pb-4 md:pr-2">
				<h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
			</div>
		</div>
	</section>

	<?php 
		/**
		 * USP Icons
		 */    
		echo oax_get_component('list-usp-icons', [
			'xclass_icons' => 'px-2 md:px-2'
		]); 
	?>   

	<?php // Section ?>
	<section class="c-section c-section--product-layout c-section--product-layout--2 py-5 md:py-75">
		<div class="c-section__content">
			<div class="container container-lg">
				<div class="row flex flex-wrap flex-row md:-mx-05">
					<div class="w-full md:w-2/5 px-05">
						<figure>
							<div class="ratio-square bg-grey">

							</div>
							<figcaption class="mt-1">
								<div><strong>Selbsklebende Rückseite</strong></div>
								<div class="mt-05">
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								</div>
							</figcaption>
						</figure>
					</div>
					<div class="w-full mt-2 md:mt-0 md:w-3/5 px-05">
					<figure>
							<div class="ratio-square bg-grey">

							</div>
							<figcaption class="mt-1">
								<div><strong>Selbsklebende Rückseite</strong></div>
								<div class="mt-05">
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								</div>
							</figcaption>
						</figure>						
					</div>					
				</div>
			</div>
		</div>
	</section>

	<?php 
		/**
		 * Get Instagram Section
		 */
		echo oax_get_component('section-instagram'); 
	?>

	<?php 
		/**
		 * Get Materialien Section
		 */
		// echo oax_get_component('section-materialien'); 
	?>


	<?php 
		/**
		 * Get Design Section
		 */
		echo oax_get_component('section-designs'); 
	?>

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

<?php do_action( 'woocommerce_after_single_product' ); ?>
