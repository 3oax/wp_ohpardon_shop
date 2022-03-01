/* eslint one-var: [0]*/
/* eslint max-len: [0]*/
/* eslint max-params: [0]*/
/* eslint complexity: [0]*/
/* eslint no-multi-assign: [0]*/
/* eslint require-jsdoc: [0]*/
/* eslint no-inner-declarations: [0]*/

/**
 * File woocommerce.js.
 *
 * Handles Woocommerce.
 */

import Utils from '../app/utils.js';

export default class WooCommerce {
	constructor( settings ) {
		const defaults = {
			features: {
				WooVariationSwatches: 1,
				Germanized: 1
			},
			container: 'body',
			product: {
				variationsForm: '.variations_form',
				buyBtn: '.single_add_to_cart_button',
				swatchesLoaded: 'wvs-loaded',
			},
			cart: {
				open: 'is-open',
				trigger: '.js--cart-trigger',
				trigger_product_count: '.js--cart-trigger__desc-count',
				selector: '.c-cart',
				close: '.c-cart__close',
				data_product_count: 'data-cart-product-count'
			},
			scripts: {
				base_path: 'wp-content/plugins/woocommerce/assets/js/frontend/',
				checkout: 'checkout.min.js',
				countrySelect: 'country-select.min.js',
				cart: 'cart.min.js'
			}
		};
    
		this._defaults = defaults;
		this.options = Object.assign( defaults, settings );
		
		this._addJQuerySerializeInput();
		this.addEventListener();

		window.OAX.WooCommerce = this;
	}

	init( _container ){
		let container = Utils.isset( _container ) ? _container : this.options.container;
		let $container = $( container );
		let namespace = Utils.isset( $container.data( 'barbaNamespace' ) ) ? $container.data( 'barbaNamespace' ) : null;

		if ( namespace !== null ){
			this.addEventListener( container ); 

			if ( namespace === 'product' ){
				this.initProductDetail( $container );
			}

			if ( namespace === 'archive' ){
				this.initJetpackInfiniteScroll();
			}

			if ( namespace === 'checkout' ){
				this.initCheckout();
			} else {
				wc_checkout_params.is_checkout = '0';
			}

			if ( namespace === 'cart' ){
				this.initCart();
			}
		} else {
			// only first init
			$container = $container.find( OAX.APP.options.selector.siteInner );
			container = $container[0];
			namespace = $container.data( 'barbaNamespace' );
			
			if ( namespace === 'product' ){
				this.addEventListener( container );
			}

			if ( namespace === 'checkout' ){
				wc_checkout_params.is_ajax_init = 1;
			}
	
			/*
			 * if ( Utils.isset( wpNotesIsJetpackClient ) && Utils.isset( wpNotesIsJetpackClientV2 ) ){
			 * // console.log
			 * }
			 */
		}

		/*
		 * --- wishlist support
		 * $(document).trigger( 'yith_wcwl_init' );
		 */    
	}

	initProductDetail( $container ){
		const $variationForm = $container.find( this.options.product.variationsForm );
		const $buyButton = $container.find( this.options.product.buyBtn );
		
		if ( $variationForm.length ) {
			if ( OAX.debug ) {
				console.log( 'init: wc_variation_form' ); 
			}
			$variationForm.wc_variation_form();  
			
			if ( this.options.features.Germanized ){
				if ( OAX.debug ) {
					console.log( 'init: GERMANIZED: wc_variation_form' ); 
				}
				if ( typeof wc_gzd_add_to_cart_variation_params !== 'undefined' ) { // eslint-disable-line          
					$variationForm.wc_germanized_variation_form();            
				}
			}

			if ( this.options.features.WooVariationSwatches && ! $variationForm.hasClass( this.options.product.swatchesLoaded ) ){          
				if ( OAX.debug ) {
					console.log( 'init: WooVariationSwatches' ); 
				}
				$variationForm.WooVariationSwatches(); // eslint-disable-line
			}
		}
		
		/* eslint-disable */
		if ( Utils.isset( paypal ) && Utils.isset( PayPalCommerceGateway ) ) {
			/*
			 * If PayPal Buttons Empty
			 */
			if ( ! $.trim( $container.find( PayPalCommerceGateway.button.wrapper ).html() ).length ){
				// paypal.Buttons( PayPalCommerceGateway.button.style ).render(	PayPalCommerceGateway.button.wrapper );
				paypal.Buttons().render( PayPalCommerceGateway.button.wrapper );
			}
		}
		/* eslint-enable */
	}
  
	initVariationAddToCart(){
		/**
		 * Stores the default text for an element so it can be reset later
		 */
		/*
		 * $.fn.wc_set_content
		 * $.fn.wc_variations_image_update
		 */
	}

	initCheckout(){
		const self = this;
		if ( Utils.isset( wc_checkout_params ) ){			
			wc_checkout_params.is_checkout = '1';

			/*
			 * Init Selectboxes
			 */
			if ( $().selectWoo ) {
				setTimeout( () => {
					$( document.body ).trigger( 'country_to_state_changed' );
				}, 200 );				
			}

			/*
			 * Remove Eventlistener on Body if already declared
			 */
			$( document.body ).off( 'init_checkout' );
			$( document.body ).off( 'update_checkout' );
			$( document.body ).off( 'click', 'a.showcoupon' );
			$( document.body ).off( 'click', '.woocommerce-remove-coupon' );
			$( document.body ).off( 'click', 'a.showlogin' );
			$( document.body ).off( 'click', 'a.woocommerce-terms-and-conditions-link' );
			
			// Get Checkout Script and init
			jQuery.getScript( `${OAX.config.url_base}${self.options.scripts.base_path}${self.options.scripts.checkout}`, () => {
				wc_checkout_params.is_ajax_init = 1;
				if ( self.options.features.Germanized ){
					germanized.checkout.init();
				}	
			} );

			$( document.body ).trigger( 'wc_address_i18n_ready' );
		}
	}

	initCart(){
		const self = this;
	}

	initJetpackInfiniteScroll(){
		if ( Utils.isset( window.infiniteScroll ) ){
			window.infiniteScroll.scroller = new infiniteScroll.scroller.constructor( infiniteScroll.settings, true );
		}
	}

	addEventListener( _container ){
		const container = Utils.isset( _container ) ? _container : null;
    
		if ( container === null ){
			$( document ).on( 'click.oax::add-to-cart', `${this.options.product.buyBtn}:not(.disabled)`, this.onVariationAddToCart );    
			$( document.body ).on( 'added_to_cart', $.proxy( this.onAddedToCard, this ) );
			$( document.body ).on( 'wc_fragments_loaded', $.proxy( this.onFragmentsLoaded, this ) );
			$( document ).on( 'click.oax::open-cart', this.options.cart.trigger, $.proxy( this.onToggleCart, this ) );
			$( document ).on( 'click.oax::change-cart-qty', '.js--cart-qty-change-btn', this.onItemQtyChange );
			$( document ).on( 'focusout.oax::change-cart-qty', '.js--cart-qty-change-input', this.onItemQtyChange );
		} else {
			const $container = $( container );
			const namespace = $container.data( 'barbaNamespace' );

			const $variationForm = $container.find( this.options.product.variationsForm );

			if ( namespace === 'product' ){
				$variationForm.on( 'show_variation', this.onShowVariation );
				if ( this.options.features.Germanized ){
					$variationForm.on( 'germanized_variation_data', this.onGermanizedVariationData );
				}
			}
		}
	}

	removeEventListener(){
		
	}
	
	onAddedToCard( event, fragments, cartHash, $button ){
		if ( OAX.debug ) {
			console.log( 'onaddadetocart', event, fragments, cartHash, $button );
		}
		this.openCart();
	}

	onFragmentsLoaded( event ){
		if ( OAX.debug ) {
			console.log( 'onFragmentsLoaded', event );
		}

		const productCount = $( this.options.cart.selector ).find( `[${this.options.cart.data_product_count}]` ).attr( this.options.cart.data_product_count );
		if ( typeof productCount !== 'undefined' ){
			$( this.options.cart.trigger_product_count ).text( productCount );
		} else {
			$( this.options.cart.trigger_product_count ).text( '' );
		}
	}

	onShowVariation( event, variationData, keineAhnung ){
		if ( OAX.debug ) {
			console.log( event, variationData );
		}
	}

	onGermanizedVariationData( event, variationData, $wrapper ){
		if ( OAX.debug ) {
			console.log( event, variationData );
		}
		const $container = $( event.target ).closest( '[data-barba="container"]' );
		if ( Utils.isset( variationData.price_html ) && variationData.price_html !== '' ) {
			$container.find( '.js--product-price' ).html( variationData.price_html );
		}
	}

	onVariationAddToCart( event ){
		const $thisbutton = $( event.target );
		const $form = $thisbutton.closest( 'form.cart' );
		/*
		 * quantity = $form.find('input[name=quantity]').val() || 1,
		 * product_id = $form.find('input[name=variation_id]').val() || $thisbutton.val(),
		 */
		const data = $form.find( 'input:not([name="product_id"]), select, button, textarea' ).serializeInputs() || 0;

		$.each( data, ( i, item ) => {
			if ( item.name === 'add-to-cart' ) {
				item.name = 'product_id';
				item.value = $form.find( 'input[name=variation_id]' ).val() || $thisbutton.val();
			}
		} );

		$( document.body ).trigger( 'adding_to_cart', [$thisbutton, data] );

		$.ajax( {
			type: 'POST',
			url: woocommerce_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'add_to_cart' ),
			data,
			beforeSend ( response ) {
				$thisbutton.removeClass( 'added' ).addClass( 'loading' );
			},
			complete ( response ) {
				$thisbutton.addClass( 'added' ).removeClass( 'loading' );
			},
			success ( response ) {
				if ( response.error && response.product_url ) {
					window.location = response.product_url;

					return;
				}

				$( document.body ).trigger( 'added_to_cart', [response.fragments, response.cart_hash, $thisbutton] );
			},
		} );

		event.preventDefault();
	}

	/*
	 * Shopping Cart
	 */
	onToggleCart( event ){
		const $target = $( event.target ).hasClass( this.options.cart.trigger ) ? $( event.target ) : $( event.target ).closest( this.options.cart.trigger );
		const $cart = $( this.options.cart.selector );
		this.toggleCart();
		event.preventDefault();
	}

	onOutsideCartClick( event ){
		const $target = $( event.target );
		if ( $target.is( this.options.cart.close ) || ! $target.closest( this.options.cart.selector ).length ){
			this.closeCart();
		}	
	}

	openCart(){
		const $cart = $( this.options.cart.selector );
		$( document ).on( 'click.oax::cart-outside', $.proxy( this.onOutsideCartClick, this ) );
		$cart.on( 'click.oax::link-inside', 'a:not(.remove_from_cart_button)', $.proxy( this.closeCart, this ) );
		$cart.addClass( this.options.cart.open );
	}

	closeCart(){
		const $cart = $( this.options.cart.selector );
		$( document ).off( 'click.oax::cart-outside', $.proxy( this.onOutsideCartClick, this ) );
		$cart.off( 'click.oax::link-inside', 'a:not(.remove_from_cart_button)', $.proxy( this.closeCart, this ) );
		$cart.removeClass( this.options.cart.open );
	}

	toggleCart(){
		const $cart = $( this.options.cart.selector );
		if ( $cart.hasClass( this.options.cart.open ) ){
			this.closeCart();
		} else {
			this.openCart();
		}	
	}

	onItemQtyChange( event ){
		const $target = $( event.target );
		const $item = $target.closest( '.woocommerce-mini-cart-item' );
		const $items = $item.siblings( '.woocommerce-mini-cart-item' );
		const $cart = $( '.c-cart' );
		const $siblingTargets = $item.find( '.js--cart-qty-change-btn, .js--cart-qty-change-input' );
		const cartItemKey = $item.data( 'cartItemKey' );
		let cartItemQty = parseInt( $item.find( '.js--cart-qty-change-input' ).val(), 10 );

		if ( $target.hasClass( 'js--cart-qty-change-btn' ) ){
			if ( $target.hasClass( 'js--cart-qty-change-btn--minus' ) ){
				cartItemQty = cartItemQty - 1 <= 0 ? 0 : cartItemQty - 1;
			} else {
				cartItemQty += 1;
			}
		}

		$cart.addClass( 'is-loading' );
		const $loader = $( OAX.template.loader.html );
		$cart.append( $loader.css( {
			position: 'absolute',
			left: '50%',
			top: '50%'
		} ) );
		$siblingTargets.prop( 'disabled', true );

		const data = {
			action: 'oax_ajax_cart_update_qty',
			cart_item_key: cartItemKey, // eslint-disable-line
			cart_item_qty: cartItemQty, // eslint-disable-line
		};

		$.post( OAX.config.url_ajax, data, ( response ) => {
			jQuery( document.body ).one( 'wc_fragments_refreshed', () => {
				$siblingTargets.prop( 'disabled', false );
				$cart.find( OAX.template.loader.selector ).remove();
				$cart.removeClass( 'is-loading' );
				jQuery( document.body ).trigger( 'wc_fragments_loaded' );	
				
				if ( $( 'form.woocommerce-checkout' ).length ){
					jQuery( document.body ).trigger( 'update_checkout' );
				}				
			} );

			jQuery( document.body ).trigger( 'wc_fragment_refresh' );				
		} );		

		if ( event.type === 'click' ){
			event.preventDefault();
		}
	}
  
	/* eslint-disable */
  _addJQuerySerializeInput(){
		$.fn.serializeInputs = function () {
			var rCRLF = /\r?\n/g;

			return this.map( function () {
				return this.elements ? jQuery.makeArray( this.elements ) : this;
			} ).map( function ( i, elem ) {
				var val = jQuery( this ).val();
				if ( val == null ) {
					return val == null;
				} else if ( this.type == 'checkbox' && this.checked === false ) {
					return {
						name: this.name,
						value: this.checked ? this.value : '' 
					};
				}
 
				return jQuery.isArray( val )
					? jQuery.map( val, ( val, i ) => ( {
						name: elem.name,
						value: val.replace( rCRLF, '\r\n' ) 
					} ) )
					: {
						name: elem.name,
						value: val.replace( rCRLF, '\r\n' ) 
					};
			} ).get();
		};
	}
  /* eslint-enable */
} 
