<?php
/**
 * My Account navigation
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/navigation.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 2.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_before_account_navigation' );
?>

<style>
	/**
	 * Navigation
	 */
	.woocommerce-MyAccount-navigation {
		border: 1px solid var(--color__grey);
	}
	.woocommerce-MyAccount-navigation-link.is-active {
		font-weight: bold;
	}
	@media (min-width: 992px){
		.woocommerce-MyAccount-navigation {
			border-right: 1px solid var(--color__grey);
			border-left: none;
			border-top: none;
			border-bottom: none;
			/*
			position: sticky;
			top: 5rem;
			*/

		}
	}	

	/**
	 * Content
	*/
	.woocommerce-MyAccount-content section section {
		padding: 1rem;
		border: 1px solid grey;
	}
	.woocommerce-MyAccount-content address {
		font-size: 0.8em;
	}
	.woocommerce-order-details,
	.woocommerce-MyAccount-content section section{
		margin-bottom: 2rem;
	}
	.woocommerce-column__title {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	.woocommerce-order-details__title {
		margin-bottom: 0.5rem;
	}
	@media (min-width: 992px){
		.woocommerce-columns--2 {
			display: flex;
		}
		.woocommerce-columns--2 > .woocommerce-column--1 {
			width: 50%;
		}
		.woocommerce-MyAccount-content section section address {
			margin-bottom: 0;
		}		
	}
</style>

<nav class="woocommerce-MyAccount-navigation w-full p-15 mb-2 md:mb-0 md:w-1/4 md:py-0 md:pl-0 md:pr-4" style="">
	<ul class="list-none p-0">
		<?php foreach ( wc_get_account_menu_items() as $endpoint => $label ) : ?>
			<li class="<?php echo wc_get_account_menu_item_classes( $endpoint ); ?>">
				<a class="py-025 block" href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>"><?php echo esc_html( $label ); ?></a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>

<?php do_action( 'woocommerce_after_account_navigation' ); ?>
