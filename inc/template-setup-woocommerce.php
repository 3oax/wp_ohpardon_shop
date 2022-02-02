<?php
/******************************
 ****** WooCommerce START *****
 ******************************/

/* 
* Remove Styles and Scripts
*/
function oax_remove_wc_styles(){
	wp_dequeue_style( 'wc-blocks-style' );
	
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

/**
 * Change number of related products output
 */ 
add_filter( 'woocommerce_output_related_products_args', 'oax_related_products_args', 20 );
function oax_related_products_args( $args ) {
	$args['posts_per_page'] = 3; // 4 related products
	return $args;
}

add_filter('wvs_variable_item', function( $args ){
	$variable_items_string = $args;		
	
	$dom = new DOMDocument;
	@$dom->loadHTML($args);
	$imgTags = $dom->getElementsByTagName('img');
	$imgObjArr = iterator_to_array($imgTags);

	if(count($imgObjArr) > 0){
		return $args;
	}

	return $args;

}, 20);

add_action( 'before_woocommerce_init', function() {
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
	// remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
} );

add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
add_filter( 'woocommerce_show_page_title', '__return_false' );

/**
 * RETURNS MINIMUM PRICE AND HIDES MAXIMUM PRICE FOR VARIABLE PRODUCTS
 **/
// add_filter( 'woocommerce_variable_sale_price_html', 'oax_variation_price_format', 10, 2 );
// add_filter( 'woocommerce_variable_price_html', 'oax_variation_price_format', 10, 2 );
function oax_variation_price_format( $price, $product ) {
	// Main Price
	$prices = array( $product->get_variation_price( 'min', true ), $product->get_variation_price( 'max', true ) );
	$price = $prices[0] !== $prices[1] ? sprintf( __( 'Starting at %1$s', 'woocommerce' ), wc_price( $prices[0] ) ) : wc_price( $prices[0] );
	
	// Sale Price
	$prices = array( $product->get_variation_regular_price( 'min', true ), $product->get_variation_regular_price( 'max', true ) );
	sort( $prices );
	
	$saleprice = $prices[0] !== $prices[1] ? sprintf( __( 'Starting at %1$s', 'woocommerce' ), wc_price( $prices[0] ) ) : wc_price( $prices[0] );
	
	if ( $price !== $saleprice ) {
		$price = '' . $saleprice . ' ' . $price . '';
	}

	return $price;
}

function woocommerce_template_loop_product_title() {
	echo '<span class="sr-only">' . get_the_title() . '</span>'; 
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

// -> Remove Variation wählen and add to card in loop
remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);

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

function oax_yith_wcan_filter_title_tag(){
	return '';
}
add_filter( 'yith_wcan_filter_title_tag', 'yith_wcan_filter_title_tag' );

/******************************
 ****** WooCommerce END *******
 ******************************/