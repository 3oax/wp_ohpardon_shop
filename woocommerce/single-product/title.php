<?php
/**
 * Single Product title
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/title.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see        https://docs.woocommerce.com/document/template-structure/
 * @package    WooCommerce\Templates
 * @version    1.6.4
 */
global $product;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// the_title( '<h1 class="product_title entry-title">', '</h1>' );

// get an array of the WP_Term objects for a defined product ID
//
$terms = wp_get_post_terms( $product->get_id(), 'product_tag' );

if(!empty($terms)){
	$first_term = $terms[0];
	echo '<h1 class="product_title entry-title">';
		echo '<span class="sr-only">';
			echo str_replace($first_term->name, '', get_the_title());
		echo '</span>';
		echo $first_term->name;
	echo '</h1>';
} else {
	the_title( '<h1 class="product_title entry-title">', '</h1>' );
}