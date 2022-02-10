<?php
/**
 * Single Product Image
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/product-image.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.1
 */

defined( 'ABSPATH' ) || exit;

// Note: `wc_get_gallery_image_html` was added in WC 3.3.2 and did not exist prior. This check protects against theme overrides being used on older versions of WC.
if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
	return;
}

global $product;

$columns           = apply_filters( 'woocommerce_product_thumbnails_columns', 4 );
$post_thumbnail_id = $product->get_image_id();
$wrapper_classes   = apply_filters(
	'woocommerce_single_product_image_gallery_classes',
	array(
		'woocommerce-product-gallery',
		'woocommerce-product-gallery--' . ( $product->get_image_id() ? 'with-images' : 'without-images' ),
		'woocommerce-product-gallery--columns-' . absint( $columns ),
		'images',
		'relative',
		'w-full'
	)
);
?>
<div class="<?php echo esc_attr( implode( ' ', array_map( 'sanitize_html_class', $wrapper_classes ) ) ); ?>" data-columns="<?php echo esc_attr( $columns ); ?>">
	<div class="woocommerce-product-gallery__wrapper w-full md:flex md:justify-center md:items-center md:flex-col">
			
		<div class="relative w-full md:w-3/5">
			<?php
			$thumbnails = $product->get_gallery_image_ids();

			if ( $product->get_image_id() ) {
				// $html = wc_get_gallery_image_html( $post_thumbnail_id, true );
				
				if( $thumbnails  ){
					$img_dim = oax_get_image_dimensions(wp_get_attachment_image_src($product->get_image_id(), 'large')[0]);

					echo '<div class="relative overflow-hidden" style="padding-bottom: ' . $img_dim['padding'] . ' ">';
						echo '<div class="inset overflow-x-scroll overflow-y-hidden">';
						echo '<div class="js--slider woocommerce-product-gallery__main-slider flex flex-wrap h-full" data-init-by="product" data-slick=\'{"arrows": false, "infinite": false, "slidesToShow": 1}\' style="width: '. ( count($thumbnails) + 1 ) * 100 .'%;">';
							echo '<div class="woocommerce-product-gallery__main-slider-item relative" style="width: '. ( 100 / (count($thumbnails) + 1) ) .'%;">';
								echo oax_image([
									'post' => get_post(),
									'xclass' => 'object-fit-cover inset wp-post-image',
									'wrapper' => true,
									'xclass_wrapper' => 'overflow-hidden inset woocommerce-product-gallery__image',
									// 'placeholder' => true,
									'lazy' => true
								]);
							echo '</div>';
						foreach ( $thumbnails as $thumbnail ) {
							echo '<div class="woocommerce-product-gallery__main-slider-item relative" style="width: '. ( 100 / (count($thumbnails) + 1) ) .'%;">';
								echo oax_image([
									'img' => $thumbnail,
									'xclass' => 'object-fit-cover inset wp-post-image',
									'wrapper' => true,
									'xclass_wrapper' => 'overflow-hidden inset woocommerce-product-gallery__image',
									'lazy' => true
								]);
							echo '</div>';
						}
						echo '</div>';
						echo '</div>';

					echo '</div>';
				} else {
					$html = oax_image([
						'post' => get_post(),
						'xclass' => 'object-fit-cover inset wp-post-image',
						'wrapper' => true,
						'xclass_wrapper' => 'overflow-hidden woocommerce-product-gallery__image',
						'holder' => true,
						'placeholder' => true,
						'lazy' => true
					]);
				}
			} else {
				$html  = '<div class="woocommerce-product-gallery__image--placeholder">';
				$html .= sprintf( '<img src="%s" alt="%s" class="wp-post-image" />', esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ), esc_html__( 'Awaiting product image', 'woocommerce' ) );
				$html .= '</div>';
			}

			if( !$thumbnails ){
				echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, $post_thumbnail_id ); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped
			}
			?>
		</div>
		
		<div class="w-full relative md:w-3/5">
			<div class="flex flex-wrap">
				<?php 
					do_action( 'woocommerce_product_thumbnails' );
				?>
			</div>
		</div>
	</div>
</div>
