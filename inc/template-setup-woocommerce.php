<?php
/**
 * Setup Woocommerce
 */
// require get_template_directory() . '/inc/woocommerce/woocommerce-coupon-email.php';

/******************************
 ****** WooCommerce START *****
 ******************************/
/* 
* Remove Styles and Scripts
*/
function oax_remove_wc_styles(){
	wp_dequeue_style( 'wc-blocks-style' );
	
	wp_dequeue_style( 'woocommerce-gzd-layout' );

	// Remove Filter CSS
	//
	if ( defined( 'YITH_WCAN' ) ){
		wp_dequeue_style( 'yith-wcan-shortcodes' );
		wp_dequeue_style( 'yith-wcan-frontend');
	}
}
add_action( 'wp_enqueue_scripts', 'oax_remove_wc_styles', PHP_INT_MAX - 1 );

function oax_dequeue_script() {
	wp_dequeue_script( 'the-neverending-homepage' );
	wp_enqueue_script( 'the-neverending-homepage' );
}
// add_action( 'wp_print_scripts', 'oax_dequeue_script', PHP_INT_MAX - 2 );

function oax_remove_and_add_wc_scripts(){

	// wp_dequeue_script( 'wc-checkout' );
	// wp_enqueue_script( 'wc-checkout' );

	// wp_dequeue_script( 'wc-country-select' );
	// wp_enqueue_script( 'wc-country-select' );

	// wp_dequeue_script( 'wc-address-i18n' );
	// wp_enqueue_script( 'wc-address-i18n' );

	wp_dequeue_script( 'wc-cart' );	
	// wp_enqueue_script( 'wc-cart' );	

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
	
		wp_dequeue_script( 'wc-gzd-checkout' );
		wp_enqueue_script( 'wc-gzd-checkout' );
	}

	if( defined( 'YITH_WCAN' ) ) {
		wp_dequeue_script( 'yith-wcan-script' );
		wp_dequeue_script( 'yith-wcan-shortcodes' );
	}

	// PayPal
	//
	wp_dequeue_script('ppcp-smart-button');
	wp_enqueue_script('ppcp-smart-button');
	wp_dequeue_script('paypal-checkout-sdk');
	wp_enqueue_script('paypal-checkout-sdk');

	// Iconic Variations (Linked Variations)
	//
	wp_dequeue_script('iconic-wlv');
}
add_action( 'wp_enqueue_scripts', 'oax_remove_and_add_wc_scripts', PHP_INT_MAX );

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
	$args['posts_per_page'] = 3; // for related products
	return $args;
}

add_action( 'before_woocommerce_init', function() {
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
	// remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
} );

add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
add_filter( 'woocommerce_show_page_title', '__return_false' );

function woocommerce_template_loop_product_title() {
	global $product;
	
	$title = get_the_title();
	$title_sr = false;

	$terms = wp_get_post_terms( $product->get_id(), 'product_tag' );
	if( isset($terms) && !empty($terms) ) {
		$first_term = $terms[0];
		$title_sr = str_replace($first_term->name, '', $title);
		$title = $first_term->name;
	}

	if($title_sr !== false){
		echo '<span class="sr-only">' . $title_sr . '</span>'; 
	}	
	echo '<span>'. $title .'</span>';
}

// Cart Items
//
function oax_woocommerce_cart_item_name( $title, $item, $item_key ) {
	// (maybe) modify $string.
	// return $string;
	$terms = wp_get_post_terms( $item['product_id'], 'product_tag' );
	if( isset($terms) && !empty($terms) ) {
		$first_term = $terms[0];
		$title_sr = str_replace($first_term->name, '', $title);
		$title = $first_term->name;
	}

	if( isset($title_sr) ){
		$_title = $title;
		$title = '<span class="block">';
			$title .= '<strong class="block">'. $_title .'</strong>';
			$title .= '<span class="block py-05">'. $title_sr .'</span>';
		$title .= '</span>'; 
		return $title;
	}

	return '<strong class="block">' . $title . '</strong>';
}
add_filter( 'woocommerce_cart_item_name', 'oax_woocommerce_cart_item_name', 10, 3 );
add_filter( 'woocommerce_order_item_name', 'oax_woocommerce_cart_item_name', 10, 3 );

/*
 * Move Templates 
 */
// -> Price
// remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
// add_action( 'woocommerce_after_variations_table', 'woocommerce_template_single_price', 45 );

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

// -> Move PayPal Buttons on Single Page
//
add_filter('woocommerce_paypal_payments_single_product_renderer_hook', function() {
	return 'woocommerce_after_add_to_cart_form';
});	

/**
 * Checkout Fields
 */
// remove Order Notes from checkout field in Woocommerce
add_filter( 'woocommerce_checkout_fields' , 'alter_woocommerce_checkout_fields' );
function alter_woocommerce_checkout_fields( $fields ) {
	unset($fields['order']['order_comments']);
	return $fields;
}

if( defined( 'YITH_WCWL' ) && ! function_exists( 'yith_wcwl_move_wishlist_button' ) ){
	function yith_wcwl_move_wishlist_button(){
		echo do_shortcode( '[yith_wcwl_add_to_wishlist]' );
	}
	add_action( 'woocommerce_after_add_to_cart_button', 'yith_wcwl_move_wishlist_button' );
}

// remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );
// add_action(  'woocommerce_review_order_before_payment', 'woocommerce_checkout_coupon_form', 10 );

add_action( 'init', 'oax_child_move_legal_checkboxes', 50 );
function oax_child_move_legal_checkboxes() {
	// Remove
	remove_action( 'woocommerce_review_order_after_payment', 'woocommerce_gzd_template_render_checkout_checkboxes', 10 );
	// Readd before submit button
	add_action( 'woocommerce_gzd_review_order_before_submit', 'woocommerce_gzd_template_render_checkout_checkboxes', 10 );
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

/**
 * Mini Cart (Basket on site)
 */
add_action( 'woocommerce_widget_shopping_cart_buttons', function(){
	// Removing Buttons
	remove_action( 'woocommerce_widget_shopping_cart_buttons', 'woocommerce_widget_shopping_cart_button_view_cart', 10 );
	remove_action( 'woocommerce_widget_shopping_cart_buttons', 'woocommerce_widget_shopping_cart_proceed_to_checkout', 20 );

	// Adding customized Buttons
	// add_action( 'woocommerce_widget_shopping_cart_buttons', 'custom_widget_shopping_cart_button_view_cart', 10 );
	add_action( 'woocommerce_widget_shopping_cart_buttons', 'custom_widget_shopping_cart_proceed_to_checkout', 20 );
}, 1 );

// Custom cart button
function custom_widget_shopping_cart_button_view_cart() {
	$original_link = wc_get_cart_url();
	echo '<a href="' . esc_url( $original_link ) . '" class="button wc-forward">' . esc_html__( 'View cart', 'woocommerce' ) . '</a>';
}

// Custom Checkout button
function custom_widget_shopping_cart_proceed_to_checkout() {
	$original_link = wc_get_checkout_url();
	$link_title = 'Zur Kasse';
	echo '<a href="' . esc_url( $original_link ) . '" class="button checkout wc-forward no-barba">' . $link_title . '</a>';
}

add_filter('iconic_wlv_group_attribute_term_data', 'oax_iconic_wlv_group_attribute_term_data', 10, 2);
function oax_iconic_wlv_group_attribute_term_data($term_data, $visible_product_id){
	$product_design = false;
	$product_id = $term_data['linked_variation_data']['variation']['id'];

	if( $term_data['has_image'] ){
		$design_terms = wp_get_post_terms( $product_id, 'product_tag' );
		if( isset($design_terms) && !empty($design_terms) ) {
			$product_design = $design_terms[0];
		}
		if( $product_design !== false ){				
			$design_image_id = get_term_meta( $product_design->term_id, 'thumbnail_id', true );
			$design_thumbnail_img = wp_get_attachment_image_src( $design_image_id, array(50, 50) );

			if( !$term_data['current'] ){
				$content = '<a class="iconic-wlv-terms__term-content iconic-wlv-terms__term-content--link" style="width: 50px;" href="';
				$content .= $term_data['url'];
				$content .= '">';
			} else {
				$content = '<span class="iconic-wlv-terms__term-content" style="width: 50px;">';
			}

			$content .= oax_image([
				'src' => $design_thumbnail_img[0],
				'lazy' => false,
				'holder' => true,
				'wrapper' => true,
				'xclass' => 'inset'
			]);

			if( !$term_data['current'] ){
				$content .= '</a>';
			} else {
				$content .= '</span>';
			}

			$term_data['content'] = $content;
		}
	}

	return $term_data;
}

// Fake Shop
function oax_fake_woocommerce_order_button_html( $html ){
	// print_r($html);
	
	return '<span name="woocommerce_checkout_place_order" class="button alt btn mt-1 md:mt-0 w-full md:w-1/2 text-center" style="text-align: center;">Jetzt Kaufen</span>';


}
add_filter('woocommerce_order_button_html', 'oax_fake_woocommerce_order_button_html', 10, 1);

/******************************
 ****** WooCommerce END *******
 ******************************/