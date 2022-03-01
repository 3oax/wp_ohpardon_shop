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
	.woocommerce-MyAccount-navigation-link.is-active {
		font-weight: bold;
	}
	@media (min-width: 992px){
		.woocommerce-MyAccount-navigation {
			border-right: 1px solid var(--color__grey);
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
	/**
	 * Table
	 */
	table {
		--table__padding: 0.75rem;
		--table__border-color: var(--color__grey);
		font-size: 0.8rem;
		display: block;		
	}
	thead, tbody {
		display: flex;
		width: 100%;
		flex-wrap: wrap;	
	}
	tr {
		display: flex;
		width: 100%;
		align-items: center;
		padding-top: var(--table__padding);
		padding-bottom: var(--table__padding);
		border-top: 1px solid var(--table__border-color);
	}
	thead tr {
		border-bottom: 1px solid var(--table__border-color);
	}
	tr:first-child {
		border-top: 0;
	}

	th, td {
		display: flex;
		flex-grow: 1;
    flex-basis: 0;
	}
	tbody tr:hover {
		background-color: rgba(0,0,0,0.025);
	}
	th:last-child, td:last-child {
		justify-content: flex-end;
	}

	/**
	 * Orders Table
	 */
	table.woocommerce-orders-table th:last-child,
	table.woocommerce-orders-table td:last-child,
	table.woocommerce-shipments-table th:last-child,
	table.woocommerce-shipments-table td:last-child {
		display: none;
	}
	table.woocommerce-orders-table tr,
	table.woocommerce-shipments-table tr {
		position: relative;
	}

	table.woocommerce-orders-table thead th:first-child,
	table.woocommerce-orders-table tbody td:first-child {
		flex-grow: 0.3;
	}
	table.woocommerce-shipments-table thead th:first-child,
	table.woocommerce-shipments-table tbody td:first-child {
		flex-grow: 0.5;
	}	
	table.order_details td:last-child {
		flex-grow: 0.2;	
	}
	table.woocommerce-orders-table thead th:first-child > *,
	table.woocommerce-shipments-table thead th:first-child > * {
		display: none;
	}	
	table.woocommerce-orders-table .woocommerce-orders-table__cell-order-number a,
	table.woocommerce-shipments-table .woocommerce-shipments-table__cell-shipment-number a {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		text-align: left;
		display: flex;
		align-items: center;
		font-size: 0.75em;
		font-weight: bold;
	}
	.woocommerce-orders-table__cell-order-total,
	.woocommerce-orders-table__header-order-total {
		flex-direction: column;
		align-items: flex-end;
	}
	.woocommerce-orders-table__cell-order-total .woocommerce-Price-amount {
		font-weight: bold;
	}


	table.order_details td.woocommerce-table__product-name {
		flex-direction: column;
		position: relative;
	}
	table.order_details td.woocommerce-table__product-name a,
	table.order_details td.woocommerce-table__product-name ul {
		padding-right: 3rem;
	}
	table.order_details td.woocommerce-table__product-name a {
		font-family: var(--font__serif);
		font-size: 1.25em;	
		font-weight: bold;
	}
	table.order_details td.woocommerce-table__product-name ul {
		padding-left: 1rem;
		padding-top: 0.5rem;
	}
	table.order_details .product-quantity {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	table.order_details tfoot {
		align-self: flex-end;
	}
</style>
<nav class="woocommerce-MyAccount-navigation w-full md:w-1/4 md:pr-4" style="">
	<ul class="list-none p-0">
		<?php foreach ( wc_get_account_menu_items() as $endpoint => $label ) : ?>
			<li class="<?php echo wc_get_account_menu_item_classes( $endpoint ); ?>">
				<a class="py-025 block" href="<?php echo esc_url( wc_get_account_endpoint_url( $endpoint ) ); ?>"><?php echo esc_html( $label ); ?></a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>

<?php do_action( 'woocommerce_after_account_navigation' ); ?>
