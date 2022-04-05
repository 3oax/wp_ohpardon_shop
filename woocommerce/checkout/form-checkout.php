<?php
/**
 * Checkout Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-checkout.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout.
if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}

?>

<style>
	/* Damit Safari iPhone nicht reinzoomt */
	@media (max-width: 500px){
		.is-ios.is-safari p.form-row input[type=text], 
		.is-ios.is-safari p.form-row input[type=password], 
		.is-ios.is-safari p.form-row input[type=email], 
		.is-ios.is-safari p.form-row input[type=tel], 
		.is-ios.is-safari p.form-row textarea,
		.is-ios.is-safari .select2-container .select2-selection--single, 
		.is-ios.is-safari .select2-results, .woocommerce-input-wrapper select {
			font-size: 16px;
		}
	}
	p.form-row.mailchimp-newsletter  {
		font-size: .75rem;
		margin-top: 0.5rem;
		padding: 1rem !important;
		display: flex !important;
	}
	p.form-row.mailchimp-newsletter input {
		margin-top: 0;
	}
	p.form-row.mailchimp-newsletter label {
		padding: 0 !important;
		margin-left: 0.25rem !important
	}
	@media (min-width: 992px) {
		.woocommerce-checkout .wc-gzd-checkbox-placeholder {
			width: 50%;
		}
		.woocommerce-checkout .wc-gzd-checkbox-placeholder p.form-row
		{
			width: 100%;
		}
		.wc-gzd-place-order > *:not(button) {
			padding-right: 1rem;	
		}			
	}

	.wc-gzd-checkbox-placeholder > p {
		margin-bottom: 0; 
	}
	.wc-gzd-place-order {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-end;
	}
	.wc-gzd-place-order > *:not(button) {
		text-align: left;	
	}
	.wc-gzd-place-order > *:empty {
		display: none;
	}
	.wc-gzd-place-order > *:nth-child(2n):not(button) {
		padding-left: 0;
		padding-right: 0;
	}

	.woocommerce-checkout-review-order-table tr.order-tax { display: none; }
	.woocommerce-checkout-review-order-table #shipping_method input[type="radio"] { margin-right: 0.25rem; }
	.woocommerce-checkout-review-order-table #shipping_method li + li { margin-top: 0.5rem; }
</style>

<form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">

	<?php if ( $checkout->get_checkout_fields() ) : ?>

		<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

		<div class="col2-set" id="customer_details">
			<div class="col-1">
				<?php do_action( 'woocommerce_checkout_billing' ); ?>
			</div>

			<div class="col-2">
				<?php do_action( 'woocommerce_checkout_shipping' ); ?>
			</div>
		</div>

		<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>

	<?php endif; ?>
	
	<?php do_action( 'woocommerce_checkout_before_order_review_heading' ); ?>
	
	<h3 id="order_review_heading" class="mt-3 mb-1"><?php esc_html_e( 'Your order', 'woocommerce' ); ?></h3>
	
	<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>

	<div id="order_review" class="woocommerce-checkout-review-order pt-2">
		<?php do_action( 'woocommerce_checkout_order_review' ); ?>
	</div>

	<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>

</form>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
