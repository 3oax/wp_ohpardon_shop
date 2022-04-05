<style>
.lds-ellipsis{display:inline-block;position:absolute;font-size:4rem;left:50%;margin-left:-.5em;top:50%;margin-top:-.5em;width:1em;height:1em;z-index:900}.lds-ellipsis div{position:absolute;top:.39em;width:.19em;height:.19em;border-radius:50%;background:rgba(0,0,0,.75);animation-timing-function:cubic-bezier(0,1,1,0)}.lds-ellipsis div:nth-child(1){left:.1em;animation:lds-ellipsis1 .6s infinite}.lds-ellipsis div:nth-child(2){left:.1em;animation:lds-ellipsis2 .6s infinite}.lds-ellipsis div:nth-child(3){left:.4em;animation:lds-ellipsis2 .6s infinite}.lds-ellipsis div:nth-child(4){left:.6em;animation:lds-ellipsis3 .6s infinite}@keyframes lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes lds-ellipsis2{0%{transform:translate(0,0)}100%{transform:translate(.3em,0)}}
</style>

<style id="oax-section-product-teaser-css">
	.c-section--product-teaser a:not(.btn) img {
		transition: opacity .3s ease-in-out, visibility .3s ease-in-out;
		will-change: opacity, visibility;
	}
	.c-section--product-teaser a:not(.btn):hover img:first-child {
		opacity: 0;
		visibility: hidden;
	}
	.c-section--product-teaser a:not(.btn):hover img:last-child {
		opacity: 1 !important;
		visibility: visible !important;
	}	
</style>

<script id="oax-section-product-teaser-js">
	$(document).on('mouseenter', '.c-section--product-teaser a', function(event){
		if(event.type === 'mouseenter'){
			var imgElem = $(event.target).find('img:last-child');
			lazySizes.loader.unveil(imgElem);
		}
	})
</script>

<link href="<?= oax_asset('css/lib/glightbox.min.css'); ?>" rel="stylesheet" media="print" onload="this.media='all'">

<?php 
	/**
	 * Fake Checkout
	 */
	$is_fake_checkout = true;
?>
<?php if( is_checkout() && $is_fake_checkout ): ?>
	<?php
		$basketItems = [];
		foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
			$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
			$basketItems[] = [
				'id' => $_product->get_sku(),
				'anzahl' => $cart_item['quantity'],
				'gesamtsumme' => $_product->get_price() * $cart_item['quantity']
			];
		}	
	?>
	<div id="c-modal--fakeorder" class="fixed w-full h-full top-0 left-0 flex flex-wrap justify-center" style="display: none; z-index: 99999999999; background-color: rgba(0,0,0,0.2);">		
		<div class="pt-75 w-full md:w-1/3">
			<div class="px-1">
				<div class="p-2 bg-white relative">
					<div class="c-modal__close cursor-pointer absolute right-0 top-0 w-2 h-2 bg-grey-light no-underline text-black flex items-center justify-center text-center" onclick="$('#c-modal--fakeorder').hide();">&times;</div>
					<h6 class="h5">Leider ist momentan keine Bestellung möglich.</h6>
					<div class="mt-05 md:text-sm">
						<p>Versuche es zu einem späteren Zeitpunkt erneut.</p>
					</div>
					<div class="mt-05">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn" onclick="$('#c-modal--fakeorder').remove();">Zurück zur Startseite</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script id="oax-checkout-fake-js">
		let is_submitted = false;
		const $checkoutForm = $('form[name="checkout"].woocommerce-checkout');
		const submitBtnSelector = '.button[name="woocommerce_checkout_place_order"]';
		let $submitBtn = $(submitBtnSelector);
		
		const storeFakePlaceOrder = () => {
			// send to analytics
			if( typeof window.gtag != 'undefined' && !is_submitted ){
				const basketItems = <?= json_encode($basketItems); ?>;
				let basketItemsString = '';
				basketItems.forEach((bI, bIIndex) => {
					let fakePurchaseItemString = bI.id + ':' + bI.anzahl + ':' + bI.gesamtsumme;
					window.gtag('event', 'fakePurchaseItem', {'item' : bI.id + ':' + bI.anzahl + ':' + bI.gesamtsumme });
					// console.log('event', 'fakePurchaseItem', {'item' : bI.id + ':' + bI.anzahl + ':' + bI.gesamtsumme });
					if( bIIndex !== 0 ){
						basketItemsString += ':';
					}
					basketItemsString += fakePurchaseItemString;
				});
				
				window.gtag('event', 'fakePurchase', {'items' : basketItems});
				// console.log('event', 'fakePurchase', basketItemsString);
				is_submitted = true;
			}
		};
		const initFakeCheckout = () => {
			$( document.body ).off( 'init_checkout' );
			$( document.body ).off( 'update_checkout' );
			$checkoutForm.off('submit');
			
			const showFakeSubmit = (event) => {
				$('#c-modal--fakeorder').show();
				storeFakePlaceOrder();
				event.preventDefault();
				return false;
			};
			
			$checkoutForm.on('submit', showFakeSubmit);
			$('[data-barba-namespace="checkout"]').on('click', submitBtnSelector, showFakeSubmit);
		};

		setTimeout(initFakeCheckout, 2000);

	</script>
<?php endif; ?>