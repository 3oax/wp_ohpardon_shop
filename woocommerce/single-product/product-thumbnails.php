<?php
/**
 * Single Product Thumbnails
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/product-thumbnails.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     3.5.1
 */

defined( 'ABSPATH' ) || exit;

// Note: `wc_get_gallery_image_html` was added in WC 3.3.2 and did not exist prior. This check protects against theme overrides being used on older versions of WC.
if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
	return;
}

global $product;

$attachment_ids = $product->get_gallery_image_ids();
$product_img_id = $product->get_image_id();

if ( $attachment_ids && $product->get_image_id() ) {
	echo '<div class="woocommerce-product-gallery__thumbs">';
		echo '<div data-init-by="product" class="woocommerce-product-gallery__thumbs-slider js--slider overflow-scroll h-full w-full flex flex-wrap pr-1 flex-control-nav" style="max-height: 30rem;" data-slick=\'{"vertical": true, "verticalSwiping": true, "arrows": false, "slidesToShow": 4, "infinite": true, "focusOnSelect": true}\'>';
			
			echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', wc_get_gallery_image_html( $product_img_id ), $product_img_id ); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped
			foreach ( $attachment_ids as $attachment_id ) {
				echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', wc_get_gallery_image_html( $attachment_id ), $attachment_id ); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped
			}
		
		echo '</div>';
	echo '</div>';
}
