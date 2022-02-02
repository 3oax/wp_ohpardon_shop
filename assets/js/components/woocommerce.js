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
			}
		};
    
		this._defaults = defaults;
		this.options = Object.assign( defaults, settings );
		
		this._addJQuerySerializeInput();
		this.addEventListener();
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
		} else {
			// only first init
			$container = $container.find( OAX.APP.options.selector.siteInner );
			container = $container[0];
			namespace = $container.data( 'barbaNamespace' );
			
			if ( namespace === 'product' ){
				this.addEventListener( container );
			}
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

	addEventListener( _container ){
		const container = Utils.isset( _container ) ? _container : null;
    
		if ( container === null ){
			$( document ).on( 'click.oax::add-to-cart', '.single_add_to_cart_button:not(.disabled)', this.onVariationAddToCart );    
			$( document.body ).on( 'added_to_cart', this.onAddedToCard );    
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
	
	onAddedToCard( event, fragments, cartHash, $button ){
		console.log( 'onaddadetocart', event, fragments, cartHash, $button );
	}

	onShowVariation( event, variationData, keineAhnung ){
		console.log( event, variationData );
	}

	onGermanizedVariationData( event, variationData, $wrapper ){
		console.log( event, variationData );
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
