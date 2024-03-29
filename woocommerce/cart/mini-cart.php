<?php
/**
 * Mini-cart
 *
 * Contains the markup for the mini-cart, used by the cart widget.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/mini-cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 5.2.0
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_mini_cart' ); ?>

<?php if ( ! WC()->cart->is_empty() ) : ?>
	<div class="c-cart__scroll -mr-05 overflow-y-scroll overflow-x-hidden" style="max-height: calc(100vh - 18.5rem);">
		<ul class="woocommerce-mini-cart cart_list product_list_widget <?php echo esc_attr( $args['list_class'] ); ?>" data-cart-product-count="<?= WC()->cart->get_cart_contents_count(); ?>">
			<?php
			do_action( 'woocommerce_before_mini_cart_contents' );

			foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
				$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
				$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

				if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
					$product_name      = apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key );
					$thumbnail         = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
					$product_price     = apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key );
					$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
					
					if ( WC()->cart->display_prices_including_tax() ) {
						$raw_price = wc_get_price_including_tax( $_product );
					} else {
						$raw_price = wc_get_price_excluding_tax( $_product );
					}
					
					$price_with_qty = $raw_price * $cart_item['quantity'];
					$product_price = apply_filters( 'woocommerce_cart_item_price', wc_price($price_with_qty), $cart_item, $cart_item_key );
					?>
					<li class="woocommerce-mini-cart-item mb-1 <?php echo esc_attr( apply_filters( 'woocommerce_mini_cart_item_class', 'mini_cart_item', $cart_item, $cart_item_key ) ); ?>" data-product-id="<?= esc_attr( $product_id ); ?>" data-cart-item-qty="<?= $cart_item['quantity'] ?>" data-cart-item-key="<?= esc_attr( $cart_item_key ); ?>">
						
						<?php
						echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							'woocommerce_cart_item_remove_link',
							sprintf(
								'<a href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s">&times;</a>',
								esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
								esc_attr__( 'Remove this item', 'woocommerce' ),
								esc_attr( $product_id ),
								esc_attr( $cart_item_key ),
								esc_attr( $_product->get_sku() )
							),
							$cart_item_key
						);
						?>

						<?php if ( empty( $product_permalink ) ) : ?>
							<?php echo $thumbnail . wp_kses_post( $product_name ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php else : ?>
							<a href="<?php echo esc_url( $product_permalink ); ?>">
								<?php echo $thumbnail . wp_kses_post( $product_name ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</a>
						<?php endif; ?>
						
						<?php echo wc_get_formatted_cart_item_data( $cart_item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						
						<div class="flex pr-2 justify-between items-center">
							<div class="js--cart-qty-change flex flex-wrap bg-grey-light justify-between" data-qty="<?= $cart_item['quantity'] ?>" style="width: calc(35% + 1px);">
								<button class="js--cart-qty-change-btn js--cart-qty-change-btn--minus inline-block w-2 h-2 flex items-center justify-center cursor-pointer bg-grey-light flex-shrink-0" style="border: none;">&minus;</button>
								<input type="text" style="border: none;" readonly value="<?= $cart_item['quantity'] ?>" class="js--cart-qty-change-input h-2 w-2 text-center flex-grow">
								<button class="js--cart-qty-change-btn js--cart-qty-change-btn--plus inline-block w-2 h-2 flex items-center justify-center cursor-pointer bg-grey-light flex-shrink-0" style="border: none;">&plus;</button>
							</div>
							<div>
								<?= $product_price ?>
							</div>
						</div>
						
						<?php // echo apply_filters( 'woocommerce_widget_cart_item_quantity', '<span class="quantity">' . sprintf( '%s &times; %s', $cart_item['quantity'], $product_price ) . '</span>', $cart_item, $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</li>
					<?php
				}
			}

			do_action( 'woocommerce_mini_cart_contents' );
			?>
		</ul>
  </div>

  <div>
    <p class="woocommerce-mini-cart__total total mb-0 flex flex-wrap justify-between">
      <?php
      /**
       * Hook: woocommerce_widget_shopping_cart_total.
       *
       * @hooked woocommerce_widget_shopping_cart_subtotal - 10
       */
      do_action( 'woocommerce_widget_shopping_cart_total' );
      ?>
    </p>
		<div class="text-xs text-right mb-1">
    	<?php do_action( 'woocommerce_widget_shopping_cart_before_buttons' ); ?>
		</div>
    <div class="woocommerce-mini-cart__buttons flex flex-wrap justify-start flex-row-reverse items-center">
			<?php do_action( 'woocommerce_widget_shopping_cart_buttons' ); ?>
			<?php 
				// Here is the PayPal Button	
				do_action( 'woocommerce_widget_shopping_cart_after_buttons' ); 
			?>
		</div>

  </div>
<?php else : ?>

  <div>
	  <p class="woocommerce-mini-cart__empty-message"><?php esc_html_e( 'No products in the cart.', 'woocommerce' ); ?></p>
  </div>
  
<?php endif; ?>

<?php do_action( 'woocommerce_after_mini_cart' ); ?>
