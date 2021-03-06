/* eslint one-var: [0]*/
/* eslint max-len: [0]*/
/* eslint max-params: [0]*/
/* eslint complexity: [0]*/
/* eslint no-multi-assign: [0]*/
/* eslint no-irregular-whitespace: [0] */
/* eslint no-useless-escape: [0] */

import Slider from '../components/slider.js';
import imagesLoaded from 'imagesloaded';
require( '../lib/jquery.serializeObject.js' );
require( '../lib/jquery.scrolllock.js' );
require( '../lib/pace.min.js' );

const Utils = {

	isset( obj ){
		var i, 
			max_i; // eslint-disable-line
		if ( obj === undefined ) {
			return false;
		}
		for ( i = 1, max_i = arguments.length; i < max_i; i++ ) { // eslint-disable-line
			if ( obj[arguments[i]] === undefined ) { // eslint-disable-line
				return false;
			}
			obj = obj[arguments[i]]; // eslint-disable-line
		}

		return true;	    
	},

	initSliders( container ) {		
		/**
		 * Swiper
		 */
		Slider.swiper.init( container );
	},

	initLightbox( container ){
		if ( $( container ).find( '.glightbox' ) ){
			const lightBox = new GLightbox();
			lightBox.on( 'open', () => {
				// Do something
				
			} );
		}
	},

	scrollTo( _x, _y, _animation, _duration ){
		let x = this.isset( _x ) ? _x : 0;
		let y = this.isset( _y ) ? _y : 0;
		const duration = this.isset( _duration ) ? _duration : 500;
		let animation = this.isset( _animation ) ? _animation : false;
		
		if ( typeof _x === 'string' || _x instanceof String ){
			if ( $( _x ).length ){
				const headerHeight = $( '#site__header' ).outerHeight();
				y = $( _x ).offset().top - headerHeight;				
				animation = true;
			}
			x = 0;			
		}
		
		if ( this.isset( OAX.Scrollbar ) ){
			if ( animation ){
				window.OAX.Scrollbar.scrollTo( x, y, duration );
			} else if ( typeof window.OAX.Scrollbar.snapTo === 'function' ){
				window.OAX.Scrollbar.snapTo( x, y );
			} else if ( typeof window.OAX.Scrollbar.setPosition === 'function' ) {
				window.OAX.Scrollbar.setPosition( x, y );
			}
		} else if ( animation ){
			$( 'html,body' ).animate( {
				scrollTop: y
			}, duration );
		} else {
			window.scrollTo( x, y );
		}		
	},

	scrollLock( lock ){
		const _lock = typeof lock === 'undefined' ? 'auto' : lock,
			$html = jQuery( 'html' );

		if ( _lock === true ){
			if ( ! $html.hasClass( 'is-fixed' ) ){
				jQuery.scrollLock( true );
				$html.addClass( 'is-fixed' );
			}
		} else if ( _lock === false ) {
			if ( $html.hasClass( 'is-fixed' ) ){
				jQuery.scrollLock( false );
				$html.removeClass( 'is-fixed' );
			}
		} else if ( _lock === 'auto' ){
			if ( $html.hasClass( 'is-fixed' ) ){
				jQuery.scrollLock( false );
			} else {
				jQuery.scrollLock( true );
			}
			
			$html.toggleClass( 'is-fixed' );
		}
	},

	scrollDisable( disable ){
		const $body = jQuery( 'body' ),
			_disable = typeof disable !== 'undefined' ? disable : 'auto';

		if ( _disable === true ){
			$body.addClass( ' overflow-hidden ' );
		} else if ( _disable === false ) {
			$body.removeClass( ' overflow-hidden ' );
		} else if ( _disable === 'auto' ) {
			if ( $body.hasClass( ' overflow-hidden ' ) ) {
				$body.removeClass( ' overflow-hidden ' );
			} else {
				$body.addClass( ' overflow-hidden ' );
			}
		}
	},

	disableLinks( exceptContainer ){
		const $allLinks = jQuery( 'a[href]' );
		$allLinks.filter( ( index, el ) => ! jQuery( el ).closest( exceptContainer.selector ).length ).attr( 'disabled', true ).addClass( 'pointer-events-none' ).addClass( 'is-disabled' );
	},

	enableLinks(){
		const $allLinks = jQuery( 'a[href][disabled].is-disabled' );
		$allLinks.removeAttr( 'disabled' ).removeClass( 'pointer-events-none' ).removeClass( 'is-disabled' );
	},

	initVideos( container ) {
		const self = this;
		const hideOnPlay = ( vidEl, vidPlayer ) => {
			const $el = $( vidEl );
			if ( self.isset( $el.data( 'hideOnPlay' ) ) ){
				const $hideEl = $( $el.data( 'hideOnPlay' ) );
				if ( ! vidPlayer.paused() ){
					gsap.to( $hideEl, {
						duration: 0.5,
						autoAlpha: 0
					} );
				} else {
					gsap.to( $hideEl, {
						duration: 0.5,
						autoAlpha: 1
					} );
				}
			}
		};

		if ( $( container ).find( '.js--player' ).length > 0 ){
			$( container ).find( '.js--player' ).each( ( i, el ) => {
				const videoPlayer = new Plyr( el );
			} );
		}
	},

	playVideo( $el ){
		const el = $el[0];
		if ( $el.hasClass( 'vjs-tech' ) ){			
			const videoPlayer = videojs.getPlayer( el );
			if ( videoPlayer.paused() ) {
				videoPlayer.play();
			}
		} else {
			el.play();
		}
	},

	pauseVideo( $el ){
		if ( $el.hasClass( 'vjs-tech' ) ){
			let videoPlayer;
			if ( $el.length > 0 ){
				if ( $el.length === 1 ){
					videoPlayer = videojs.getPlayer( $el[0] );
					videoPlayer.pause();
				} else if ( $el.length > 1 ){
					$el.each( ( i, ell ) => {
						videoPlayer = videojs.getPlayer( ell );
						videoPlayer.pause();
					} );
				}
			}
		} else {
			$el[0].pause();
		}
	},

	progressBar( action ) {
		if ( action === 'start' ){
			Pace.start();
		} else if ( action === 'stop' ){
			// Pace.stop();
		}
	},
	
	debounce ( func, wait ) {
		// we need to save these in the closure
		var timeout, 
			args, 
			context, 
			timestamp;
		
		return function() {
			// save details of latest call
			context = this; // eslint-disable-line
			args = [].slice.call( arguments, 0 ); // eslint-disable-line
			timestamp = new Date();
		
			// this is where the magic happens
			var later = function() { // eslint-disable-line
				// how long ago was the last call
				var last = new Date() - timestamp;

				/*
				 * if the latest call was less that the wait period ago
				 * then we reset the timeout to wait for the difference
				 */
				if ( last < wait ) {
					timeout = setTimeout( later, wait - last );
		
				// or if not we can null out the timer and run the latest
				} else {
					timeout = null;
					func.apply( context, args ); // eslint-disable-line
				}
			};

			// we only need to set the timer now if one isn't already running
			if ( ! timeout ) {
				timeout = setTimeout( later, wait );
			}
		};
	},	

	cookie: {
		getItem ( sKey ) {
			return decodeURIComponent( document.cookie.replace( new RegExp( `(?:(?:^|.*;)\\s*${encodeURIComponent( sKey ).replace( /[\-\.\+\*]/g, '\\$&' )}\\s*\\=\\s*([^;]*).*$)|^.*$` ), '$1' ) ) || null;
		},
		setItem ( sKey, sValue, vEnd, sPath, sDomain, bSecure ) {
			if ( ! sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test( sKey ) ) {
				return false; 
			}
			var sExpires = '';
			if ( vEnd ) {
				switch ( vEnd.constructor ) {
					case Number:
						sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${vEnd}`;
						break;
					case String:
						sExpires = `; expires=${vEnd}`;
						break;
					case Date:
						sExpires = `; expires=${vEnd.toUTCString()}`;
						break;
				}
			}
			document.cookie = `${encodeURIComponent( sKey )}=${encodeURIComponent( sValue )}${sExpires}${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`;

			return true;
		},
		removeItem ( sKey, sPath, sDomain ) {
			if ( ! sKey || ! this.hasItem( sKey ) ) {
				return false; 
			}
			document.cookie = `${encodeURIComponent( sKey )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}`;

			return true;
		},
		hasItem ( sKey ) {
			return ( new RegExp( `(?:^|;\\s*)${encodeURIComponent( sKey ).replace( /[\-\.\+\*]/g, '\\$&' )}\\s*\\=` ) ).test( document.cookie );
		},
		keys () {
			var aKeys = document.cookie.replace( /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '' ).split( /\s*(?:\=[^;]*)?;\s*/ );
			for ( var nIdx = 0; nIdx < aKeys.length; nIdx++ ) {
				aKeys[nIdx] = decodeURIComponent( aKeys[nIdx] ); 
			}

			return aKeys;
		}
	},

	responsiveIframes( container ){
		const $iframes = jQuery( container ).find( 'iframe:not(.c-yt__iframe):not(.no-init):not(.h5p-iframe)' );
		if ( $iframes.length > 0 ){
			$iframes.each( ( index, el ) => {
				const height = jQuery( el ).height(),
					width = jQuery( el ).width();
				
				let ratio = height / width * 100;

				if ( jQuery( el ).attr( 'src' ).includes( 'youtube' ) ){
					ratio = 9 / 16 * 100; // 16/9
				}

				jQuery( el ).addClass( 'absolute inset' );
				jQuery( el ).wrap( `<div class="c-iframe relative" style="padding-bottom: ${ratio}%"></div>` );
			} );
		}
	},
	
	injectYT( _container ) {
		const container = this.isset( _container ) ? _container : document;
		const youtube = container.querySelectorAll( '.js--yt' );	    
		if ( $( youtube ).length > 0 ){
			for ( var i = 0; i < youtube.length; i++ ) {
				/*
				 * Medium Quality: http://img.youtube.com/vi/{video-id}/mqdefault.jpg (320×180 pixels)
				 * High Quality: http://img.youtube.com/vi/G0wGs3useV8/hqdefault.jpg (480×360 pixels)
				 * Standard Definition (SD): http://img.youtube.com/vi/G0wGs3useV8/sddefault.jpg (640×480 pixels)
				 * Maximum Resolution: http://img.youtube.com/vi/G0wGs3useV8/maxresdefault.jpg (1920×1080 pixels)			        
				 */
				const source = `https://img.youtube.com/vi/${$( youtube[i] ).data( 'embed' )}/sddefault.jpg`;
				const image = new Image();
        
				image.src = source;
				$( image ).addClass( 'c-yt__poster absolute left-0 top-0 w-full h-full object-fit-cover' );
				image.addEventListener( 'load', ( function() { // eslint-disable-line
					youtube[ i ].appendChild( image );
				}( i ) ) );

				youtube[i].addEventListener( 'click', (event) => { // eslint-disable-line
					const iframe = document.createElement( 'iframe' );
					const $target = $( event.target ).is( '.js--yt' ) ? $( event.target ) : $( event.target ).closest( '.js--yt' );

					iframe.setAttribute( 'frameborder', '0' );
					iframe.setAttribute( 'allowfullscreen', '' );
					$( iframe ).addClass( 'c-yt__iframe absolute left-0 top-0 w-full h-full' );
					iframe.setAttribute( 'src', `https://www.youtube.com/embed/${$target.data( 'embed' )}?rel=0&showinfo=0&autoplay=1` );
					
					$target.html( '' );
					$target.append( iframe );
				} );
				
				$( youtube[i] ).append( '<div class="js--yt__play-button"></div>' );
			}
		}		
	},

	injectSVG( container, selector ){
		const injectEls = container.querySelectorAll( typeof selector === 'undefined' ? '.js--svg-inject' : selector );
		
		if ( jQuery( injectEls ).length ){
			SVGInjector( injectEls, { // eslint-disable-line
				each( svg ){
					jQuery( container ).trigger( 'OAX::svg-loaded:single', [svg] );
				}
			}, ( totalSVGsInjected ) => {
				jQuery( container ).trigger( 'OAX::svg-loaded:all', [totalSVGsInjected ] );
			} );
		}
	},

	imagesLoaded( _container ){
		const container = this.isset( _container ) ? _container : document;
		const dfr = $.Deferred(); // eslint-disable-line
		imagesLoaded( container, () => {
			dfr.resolve();
		} );

		return dfr.promise();
	},

	timelinePromise( timeline, onUpdateParam ) {
		const _onUpdateParam = typeof onUpdateParam === 'undefined' ? false : onUpdateParam, 
			_oldOnComplete = typeof timeline.vars.onComplete !== 'undefined' ? timeline.vars.onComplete : false;
		
		let _triggerPromise = true;

		return new Promise( ( resolve ) => {
			if ( _onUpdateParam === false ){
				// alternate syntax for adding a callback
				timeline.eventCallback( 'onComplete', () => {
					if ( _oldOnComplete !== false ) {
						_oldOnComplete();
					}
					resolve( true );
				} );
			} else if ( jQuery.isNumeric( _onUpdateParam ) ){
				timeline.eventCallback( 'onUpdate', ( tl ) => {
					if ( tl === '{self}' ) {
						tl = timeline; 
					}

					var fxd = tl.progress().toFixed( 1 );
					if ( fxd == _onUpdateParam && _triggerPromise ){ // eslint-disable-line
						_triggerPromise = false;

						if ( _oldOnComplete !== false ) {
							_oldOnComplete();
						}
						resolve( true );
					}
					if ( fxd == _onUpdateParam + 0.1 && _triggerPromise ){ // eslint-disable-line
						if ( _oldOnComplete !== false ) {
							_oldOnComplete();
						}
						resolve( true );
					}
				}, ['{self}'] );
				timeline.eventCallback( 'onComplete', () => {} );
			}
		} );
	},

	loadScript( url, _id ){
		const scriptPromise = new Promise( ( resolve, reject ) => {
			const scripts = document.getElementsByTagName( 'script' ),
				desiredSource = url;
			let alreadyLoaded = false;
			const id = this.isset( _id ) ? _id : false;
			
			if ( scripts.length ){
				for ( var scriptIndex in scripts ) { // eslint-disable-line
					if ( ! alreadyLoaded && desiredSource === scripts[scriptIndex].src ) {
						alreadyLoaded = true;
						resolve( true );
					}
				}
			}

			if ( ! alreadyLoaded ){
				const script = document.createElement( 'script' );
				document.head.appendChild( script );
				script.onload = resolve;
				script.onerror = reject;
				if ( id !== false ) {
					script.id = id;
				}
				// script.async = true;
				script.src = url;
			}
		} );
    
		return scriptPromise;    
	},
	
	loadCSS( url ){

	},
	
	loadSVG( url ){
		return fetch( url )
			.then( ( response ) => response.text() );
	},

	hint( container, action ){
		const wrapper = `<div class="c-hint" style="pointer-events:none; position: absolute; width: 5rem; height: 5rem; top: 50%; left: 50%; margin: -2.5rem 0 0 -2.5rem; background-color: rgba(255,255,255,0.5); border-radius: 100%; padding: 1rem;"></div>`;
		const icons = {
			swipe: `<svg class="c-hint__swipe" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 120 120" enable-background="new 0 0 120 120" xml:space="preserve">
								<g>
									<path class="c-hint__swipe-arrow" fill="#231F20" d="M54.5,27c0-1-1-2-2-2H23v-3.125c0-0.606-0.615-1.153-1.176-1.386s-1.456-0.104-1.885,0.325L15,26.375
										c-0.586,0.586-0.586,1.414,0,2l4.939,5.561c0.429,0.429,1.324,0.558,1.885,0.325S23,33.481,23,32.875V29h29.5
										C53.5,29,54.5,28,54.5,27z"/>
									<path class="c-hint__swipe-arrow" fill="#231F20" d="M27.5,19H58v3.875c0,0.606,0.115,1.153,0.676,1.386s0.956,0.104,1.385-0.325L66,18.375
										c0.586-0.586,0.586-1.414,0-2l-5.939-5.561c-0.429-0.429-0.824-0.558-1.385-0.325S58,11.268,58,11.875V15H27.5c-1,0-2,1-2,2
										S26.5,19,27.5,19z"/>
									<path class="c-hint__swipe-hand" fill="#231F20" d="M98.482,60.875c-0.407,0-1.44,0.14-2.502,0.47c-0.271-3.613-3.299-6.47-6.98-6.47
										c-1.657,0-3.182,0.579-4.382,1.545c-0.887-2.708-3.232-4.545-6.136-4.545c-1.923,0-3.634,0.791-4.854,2.083l-0.664-18.583
										c0-4.276-3.011-7.5-7.004-7.5s-7.004,3.224-7.004,7.532l0.686,32.025c-0.808,0.439-2.034,1.242-3.603,2.667
										c-5.429,4.934-7.206,16.868-1.075,26.105c6.825,10.282,14.822,14.671,26.742,14.671c12.629,0,16.854-6.338,20.1-12.83
										c3.122-6.244,3.158-30.156,3.158-31.17C104.965,63.678,101.936,60.875,98.482,60.875z M99.123,96.703
										c-3.056,6.112-6.475,11.172-17.416,11.172c-10.936,0-17.959-3.862-24.242-13.33c-3.661-5.516-5.25-16.916,0.593-22.227
										c0.631-0.573,1.188-1.022,1.66-1.371l0.224,10.459c0.019,0.828,0.712,1.494,1.532,1.468c0.828-0.018,1.485-0.703,1.468-1.532
										l-0.984-45.967c0-2.649,1.646-4.5,4.004-4.5s4.004,1.851,4.005,4.554l1,28c0.027,0.77,0.633,1.393,1.4,1.443
										c0.76,0.051,1.449-0.488,1.578-1.247l0.759-4.5c0.014-0.083,0.021-0.166,0.021-0.25c0-2.28,1.616-4,3.759-4
										c2.417,0,3.518,2.073,3.518,4v3c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5c0-2.206,1.794-4,4-4s4,1.794,4,4v6.5
										c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3.82c0.6-0.292,1.776-0.68,2.482-0.68c1.79,0,3.482,1.457,3.482,3
										C101.965,73.591,101.453,92.043,99.123,96.703z"/>
								</g>
	 						</svg>`
		};

		const actions = {
			swipe: ( _container ) => {
				const tl = gsap.timeline( {
					yoyo: true,
					repeat: -1,
					repeatDelay: 1
				} );
				tl.fromTo(
					$( _container ).find( '.c-hint__swipe-hand' ),
					1,
					{
						x: 0
					},
					{
						x: 15
					}
				);
			},
			destroy: ( _container ) => {
				if ( $( _container ).find( '.c-hint' ).length > 0 ){
					TweenMax.to( $( _container ).find( '.c-hint' ), 0.5, {
						autoAlpha: 0,
						onComplete(){
							$( _container ).find( '.c-hint' ).remove();
						}

					} );
				}
			}
		};

		if ( action === 'swipe' ){
			$( container ).append( $( wrapper ).append( icons.swipe ) );
			actions[action]( container );
		} else if ( action === 'destroy' ){
			actions[action]( container );
		}
	},

	getComputedStyle( $el, value ){
		return window.getComputedStyle( $el instanceof jQuery ? $el.get( 0 ) : $el, null ).getPropertyValue( value );
	},

	onTransitionEnd(){
		return 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	},

	onAnimationEnd(){
		const animEndEventNames = {
			WebkitAnimation: 'webkitAnimationEnd',
			MozAnimation: 'animationend',
			OAnimation: 'oanimationend',
			msAnimation: 'MSAnimationEnd',
			animation: 'animationend'
		};

		return animEndEventNames[ Modernizr.prefixed( 'animation' ) ];		
	},

	onAnimationIteration(){
		return 'MSAnimationIteration webkitAnimationIteration animationiteration';
	},

	goToUrl( url ){
		// Barba.Pjax.goTo( url );
		window.location = url;
	},

	trackPageView( url ){
		/** Analytics */
		if ( typeof ga !== 'undefined' && typeof ga === 'function' ){
			ga( 'send', 'pageview', url );
		}
		if ( typeof _gaq !== 'undefined' ){
			_gaq.push( ['_trackPageview', url.replace( OAX.config.url_base, '' )] );
		}		
		if ( typeof gtag !== 'undefined' ){
			gtag( 'event', 'page_view' );
		}
		
		/** Facebook */
		if ( typeof fbq !== 'undefined' && typeof fbq === 'function' ){
			fbq( 'track', 'ViewContent' );
		}

		/** PIWIK */
		if ( typeof _paq !== 'undefined' ){
			_paq.push( ['trackPageView'] );
		}
	},	

	isMobile(){
		return ! Modernizr.mq( '(min-width: 992px)' );
	}
};

if ( Utils.isset( window.OAX ) && ! window.OAX.hasOwnProperty( 'Utils' ) ){
	window.OAX.Utils = Utils;
}
export default Utils;
