<?php
function oax_getTemplatePart( WP_REST_Request $request ){
  $requested_template = $request['template'];

  $template = new stdClass();
  
  $template_part = load_template_part( 'template-parts/' . $requested_template );
  
  $template->html = preg_replace('/(\>)\s*(\<)/m', '$1$2', trim($template_part));

  return $template;
}

/*
add_action( 'rest_api_init', function () {
  register_rest_route( 'oax/v1', '/templatepart/(?P<template>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => 'oax_getTemplatePart'
	) );  
} );
*/

// this function creates the coupon, for the newly registered user
function createDiscountCouponForNewSubsciber(){
  $random_digits = 3;
  $random_code = str_pad(rand(0, pow(10, $random_digits)-1), $random_digits, '0', STR_PAD_LEFT);
  
  if( isset($_POST['data']) && $_POST['data']['email'] ){
    $email = explode('@', $_POST['data']['email']);
    $email_cleaned = preg_replace("/[^a-zA-Z]/", "", $email[0]);
    $random_code = $email_cleaned . '-' . $random_code;
  } else {
    return "false";
  }

  $coupon_code = 'yo-' . $random_code; // Code
  $amount = '10'; // Amount
  $discount_type = 'percent'; // Type: fixed_cart, percent, fixed_product, percent_product
  $coupon_desc = 'Schön das du dabei bist!';

  $coupon = array(
      'post_title' => $coupon_code,
      'post_content' => $coupon_desc,
      'post_status' => 'publish',
      'post_author' => 1,
      'post_type' => 'shop_coupon'
  );
  
  $new_coupon_id = wp_insert_post($coupon);
  
  // Add meta
  update_post_meta($new_coupon_id, 'discount_type', $discount_type);
  update_post_meta($new_coupon_id, 'coupon_amount', $amount);
  update_post_meta($new_coupon_id, 'individual_use', 'no');
  update_post_meta($new_coupon_id, 'product_ids', '');
  update_post_meta($new_coupon_id, 'exclude_product_ids', '');
  update_post_meta($new_coupon_id, 'usage_limit', '1');
  update_post_meta($new_coupon_id, 'expiry_date', '');
  update_post_meta($new_coupon_id, 'apply_before_tax', 'yes');
  update_post_meta($new_coupon_id, 'free_shipping', 'no');
  
  return "ok";
}

add_action('rest_api_init', function () {
  // here we are telling wordpress to use "webhook" namespace.
  // This could be anything, but since it's a custom webhook receiver,
  // it makes sense to call it webhook
  // next is our "newMailChimpSubscriber" endpoint or route name
  register_rest_route('webhook', '/newMailChimpSubscriber/', array(
      'methods' => ['POST','GET'],
      // and this is name of the function that will be called,
      // when our /wp-json/webhook/newMailChimpSubscriber/ endpoint is called
      'callback' => 'createDiscountCouponForNewSubsciber',
  ));
});