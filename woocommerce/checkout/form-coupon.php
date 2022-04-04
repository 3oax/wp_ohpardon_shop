<?php
/**
 * Checkout coupon form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-coupon.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.4
 */

defined( 'ABSPATH' ) || exit;

if ( ! wc_coupons_enabled() ) { // @codingStandardsIgnoreLine.
	return;
}

?>
<div class="woocommerce-form-coupon-toggle p-1 lg:p-2 bg-grey-light text-center">
	<?php wc_print_notice( apply_filters( 'woocommerce_checkout_coupon_message', esc_html__( 'Have a coupon?', 'woocommerce' ) . ' <br><a href="#" class="showcoupon font-bold">' . esc_html__( 'Click here to enter your code', 'woocommerce' ) . '</a>' ), 'notice' ); ?>
</div>

<form class="checkout_coupon woocommerce-form-coupon px-1 pb-1 lg:px-2 lg:pb-1 bg-grey-light flex flex-wrap justify-center" method="post" style="display:none">
	<hr class="mb-15 w-full mt-0">
	
	<div class="w-full text-center">
		<p><?php esc_html_e( 'If you have a coupon code, please apply it below.', 'woocommerce' ); ?></p>
	</div>

	<div class="flex flex-wrap justify-center items-center w-full md:w-2/3">
		<!--
		<p class="form-row form-row-first">
			<input type="text" name="coupon_code" class="input-text w-full" placeholder="<?php esc_attr_e( 'Coupon code', 'woocommerce' ); ?>" id="coupon_code" value="" />
		</p>

		<p class="form-row form-row-last">
			<button type="submit" class="btn button" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>"><?php esc_html_e( 'Apply coupon', 'woocommerce' ); ?></button>
		</p>
		-->

		<div class="relative w-full mt-1 mb-05">
			<p class="form-row text-left" style="margin-bottom: 0;">
				<label for="coupon_code"><?php esc_html_e( 'Coupon:', 'woocommerce' ); ?></label> 
				<input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="<?php esc_attr_e( 'Coupon code', 'woocommerce' ); ?>" /> 
			</p>
			<button type="submit" style="position: absolute; height: auto; bottom: 0; top: -0.25rem;" class="btn button absolute w-3 right-0 top-0" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>">
				<span aria-hidden="true" style="font-size: 2.4em; display: inline-block; width: 1em; height: 1em; transform: rotate(120deg); position: absolute; left: 50%; top: 50%; margin-left: -0.5em; margin-top: -0.5em; transform-origin: 50% 50%; text-align: center; line-height: 0.85em;">&not;</span>
				<span class="sr-only"><?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?></span>
			</button>
		</div>		
	</div>

	<div class="clear"></div>
</form>
