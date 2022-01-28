<?php
/******************************
 ****** WooCommerce START *****
 ******************************/

/* 
* Remove Styles and Scripts
*/
function oax_remove_wc_styles(){
	// Remove Filter CSS
	//
	if ( defined( 'YITH_WCAN' ) ){
		wp_dequeue_style( 'yith-wcan-shortcodes' );
		wp_dequeue_style( 'yith-wcan-frontend');
	}
}
add_action( 'wp_enqueue_scripts', 'oax_remove_wc_styles', PHP_INT_MAX - 1 );

function oax_remove_wc_scripts(){
	// Remove VariationFormJs and enable again
	//
	if ( class_exists( 'Woo_Variation_Swatches' ) ){
		wp_dequeue_script( 'woo-variation-swatches' );
		wp_enqueue_script( 'woo-variation-swatches' );
	}

	// Germanized
	//
	if ( class_exists( 'WooCommerce_Germanized' ) ){
		wp_dequeue_script( 'wc-gzd-add-to-cart-variation' );
		wp_enqueue_script( 'wc-gzd-add-to-cart-variation' );
	}

	if( defined( 'YITH_WCAN' ) ) {
		wp_dequeue_script( 'yith-wcan-script' );
		wp_dequeue_script( 'yith-wcan-shortcodes' );
	}
}
add_action( 'wp_enqueue_scripts', 'oax_remove_wc_scripts', PHP_INT_MAX );

/* 
 * Remove Functions and Templates 
 */
add_action('init', function(){
	remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
	add_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );

	remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
});

if ( ! function_exists( 'woocommerce_template_loop_product_thumbnail' ) ) {
	function woocommerce_template_loop_product_thumbnail() {
		echo woocommerce_get_product_thumbnail();
	} 
}

if ( ! function_exists( 'woocommerce_get_product_thumbnail' ) ) {   
	function woocommerce_get_product_thumbnail( $size = 'shop_catalog' ) {
			global $post, $woocommerce;
			
			$output = '<figure class="ratio-square relative overflow-hidden bg-black-light">';

				if ( has_post_thumbnail() ) {
					$output .= oax_image([
						'post' => $post,
						'xclass' => 'inset object-cover',
						'lazy' => true
					]);
				} else {
					$output .= oax_image([
						'src' => wc_placeholder_img_src( $size ),
						'xclass' => 'inset object-cover',
						'lazy' => true
					]);
				}                       

			$output .= '</figure>';

			return $output;
	}
}

add_action( 'before_woocommerce_init', function() {
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
	// remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
} );

add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
add_filter( 'woocommerce_show_page_title', '__return_false' );

function woocommerce_template_loop_product_title() {
	echo '<h3 class="mt-0 mb-0 text-primary-green h5 leading-relaxed ' . esc_attr( apply_filters( 'woocommerce_product_loop_title_classes', 'woocommerce-loop-product__title' ) ) . '">' . get_the_title() . '</h3>'; 
}

/*
 * Move Templates 
 */

// -> Price
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
add_action( 'woocommerce_after_variations_table', 'woocommerce_template_single_price', 45 );

// -> META (Sku / Kategorie)
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 60 );

// -> Add To Card
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 50 );

// -> Remove Data Tabs
remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);

if( defined( 'YITH_WCWL' ) && ! function_exists( 'yith_wcwl_move_wishlist_button' ) ){
	function yith_wcwl_move_wishlist_button(){
		echo do_shortcode( '[yith_wcwl_add_to_wishlist]' );
	}
	add_action( 'woocommerce_after_add_to_cart_button', 'yith_wcwl_move_wishlist_button' );
}

function oax_yith_wcan_content_selector( $selector ){
	$selector = '[data-barba="shop-container"]';
	return $selector;
}
add_filter( 'yith_wcan_content_selector', 'oax_yith_wcan_content_selector' );


/******************************
 ****** WooCommerce END *******
 ******************************/