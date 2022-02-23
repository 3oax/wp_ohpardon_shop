/* eslint one-var: [0]*/
/* eslint max-len: [0]*/
/* eslint max-params: [0]*/
/* eslint complexity: [0]*/
/* eslint no-multi-assign: [0]*/
/* eslint require-jsdoc: [0]*/
/* eslint no-inner-declarations: [0]*/
/**
 * Main JavaScript file.
 */

/*
 * Libs
 */
import Headroom from 'headroom.js';
// import { ScrollbarPlugin } from 'smooth-scrollbar';

// App Utils
import Utils from './app/utils.js';
import Api from './app/api.js';
// import Modal from './components/modal.js';
import Router from './app/router.js';
import Fixes from './app/fixes.js';
import Animations from './app/animations.js';

// App Components
import Navigation from './components/navigation.js';
import ViewportAnimations from './components/viewportAnimations.js';
import WooCommerce from './components/woocommerce';

// import NativeWPLightbox from './components/native-wp-lightbox.js';

/**
 * Move Preloader Bar
 */	
if ( OAX.config.is_preloader === 'Y' ) {
	OAX.preloader_bar.go( 60 );
}

/**
 * Helpers
 */
const initModals = ( container ) => {
	
};

/**
 * Init Classes
 */

/*
 * Extend SmoothScrollbar
 */
/*
 * class ScrollbarModalPlugin extends ScrollbarPlugin {
 * transformDelta( delta ) {
 * if ( this.options.open ){
 * return {
 * x: 0,
 * y: 0
 * };
 * }
 *
 * return delta;
 * }
 * }
 * ScrollbarModalPlugin.pluginName = 'modal';
 * ScrollbarModalPlugin.defaultOptions = {
 * open: false
 * };
 */

const navigation = new Navigation(),
	api = new Api(),
	vA = new ViewportAnimations(),
	WC = new WooCommerce(); // eslint-disable

const APP = {
	
	options: {
		selector: {
			wrapper: '#site',
			siteBody: '#site__body',
			siteInner: '.site__inner',
		},
		classes: {
			siteIsLoading: 'site--is-loading',
			siteIsReady: 'site--is-ready',
			pageIsTransition: 'page--is-transition',
			pageIsLoading: 'page--is-loading',
			pageIsReady: 'page--is-ready'	
		}
	},

	init(){
		/**
		 * Get Container
		 */	
		const container = jQuery( this.options.selector.siteBody ).find( `> ${this.options.selector.siteInner}` )[ 0 ];

		/**
		 * Apply Fixes
		 */
		Fixes.init();

		/**
		 * Init Smooth Scrollbar
		 */
		if ( ! Utils.isMobile() ){
			// this.initSmoothScroll();
		} 
		
		/**
		 * Add Global Event Listener
		 */
		this.addEventListener();

		/**
		 * Move Preloader Bar
		 */	
		if ( OAX.config.is_preloader === 'Y' ) {
			OAX.preloader_bar.go( 75 ); 
		}

		/**
		 * Init Router
		 */
		this.initRouter();
	
		/**
		 * Init Navigation
		 */
		navigation.setupNavigation();

		/**
		 * Init Headroom
		 */	
		this.initHeadroom();	
	
		/**
		 * Responsive Iframes
		 */
		Utils.responsiveIframes( container );
	
		/** 
		 * Inject YouTube
		 */
		Utils.injectYT( container );

		/**
		 * Init Sliders
		 */
		Utils.initSliders( container );
	
		/**
		 * Inject SVG's
		 */
		Utils.injectSVG( container );
	
		/**
		 * Init Lightbox
		 */
		// NativeWPLightbox.init( container );

		/**
		 * Init Instafeed
		 */
		// this.initInstafeed( $( '#site__footer' )[0] );

		/**
		 * Init Videos
		 */		
		Utils.initVideos( container );

		/**
		 * Init Modals
		 */	
		// initModals( container );
		
		/**
		 * Init WooCommerce
		 */	
		APP.initWoocommerce();

		/**
		 * Init First Page Visit
		 */
		$( window ).on( 'load', this.firstPageVisit( container ) );
	},

	/**
	 * Add Global Event Listener
	 */	
	addEventListener(){
		/*
		 * Img Loaded
		 */
		document.addEventListener( 'lazybeforeunveil', this.viewportLazyImage );		
		// document.addEventListener( 'lazyloaded', this.viewportLazyImage );

		/**
		 * Floating Inputs Labels
		 */	
		$( document ).on( 'input.oax::floating', 'p.form-row .input-text', ( event ) => {
			const $target = $( event.target );
			if ( $target.val().length && $.trim( $target.val() ) !== '' ){
				$target.closest( 'p.form-row' ).addClass( 'has-value' );
			} else {
				$target.closest( 'p.form-row' ).removeClass( 'has-value' );
			}
		} );		

		/**
		 * Contact Form 7
		 */	
		$( document ).on( 'wpcf7submit.oax::cf7', ( event ) => {
			gsap.to( 'form.wpcf7-form', {
				duration: 0.3,
				opacity: 1
			} );			
		} );
		$( document ).on( 'submit.oax::cf7', 'form.wpcf7-form', ( event ) => {
			const $form = $( event.target );
			gsap.to( $form, {
				duration: 0.3,
				opacity: 0.2
			} );
		} );
	},
	
	viewportLazyImage( event ){
		const $target = $( event.target );
		const $wrapper = $target.parent( 'figure.overflow-hidden.js--img-reveal' );

		if ( $wrapper.length ){
			const $reveal = $( '<div class="inset bg-green c-image__reveal"></div>' );
			$wrapper.append( $reveal );	
			gsap.to( $reveal, {
				duration: 1,
				yPercent: -100,
				ease: 'power2.inOut',
				scrollTrigger: $wrapper[0],
				start: 'top+=44% bottom'
			} );
		}
	},

	initSmoothScroll(){
		const scrollContainer = document.getElementById( 'site' );
		$( scrollContainer ).addClass( 'fixed' );
		if ( Utils.isMobile() ){
			$( scrollContainer ).height( $( window ).height() );
		} else {
			$( scrollContainer ).addClass( 'h-screen' );
		}
		$( 'html' ).addClass( 'is-fakescroll' );
		
		Scrollbar.use( ScrollbarModalPlugin );
		window.OAX.Scrollbar = Scrollbar.init( scrollContainer, {
			damping: 0.1,
			delegateTo: document,
			alwaysShowTracks: false 
		} );
		
		window.OAX.Scrollbar.track.xAxis.element.remove();

		ScrollTrigger.scrollerProxy( '#site', {
			scrollTop( value ) {
				if ( arguments.length ) {
					window.OAX.Scrollbar.scrollTop = value;
				}

				return window.OAX.Scrollbar.scrollTop;
			}
		} );		

		window.OAX.Scrollbar.addListener( ScrollTrigger.update );

		ScrollTrigger.defaults( { scroller: scrollContainer } );
	},

	initInstafeed( container ){
		if ( $( container ).find( '[data-instafeed]' ).length ){
			const $feedContainer = $( container ).find( '[data-instafeed]' );
			const username = /[^/]*$/.exec( $feedContainer.data( 'instafeed' ) )[0];
			
			$.instagramFeed( {
				username,
				container: $feedContainer[0],
				display_profile: false,
				display_biography: false,
				display_gallery: true,
				display_captions: false,
				max_tries: 30,
				callback: null,
				styling: true,
				items: 6,
				items_per_row: 6,
				margin: 0,
				lazy_load: true,
				on_error: console.error,
				host: `https://images${( Math.random() * 3333 )}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/`
			} );		
		}
	},

	/**
	 * Init Router
	 */	
	initRouter(){
		this.ROUTER = new Router( {
			debug: OAX.debug,
			onNewContainerLoaded: this.onNewContainerLoaded,
			onLinkClicked: this.onLinkClicked,
			onInitStateChange: this.onInitStateChange,
			onTransitionCompleted: this.onTransitionCompleted,
			onBrowserNav: this.onBrowserNav,
			preventLinks( el, event, href ){
				const selectorList = [
					'.remove_from_wishlist',
					'.remove[data-product_id]',
					'.restore-item',
					WC.options.cart.trigger
				];

				if ( $( el ).closest( '.js--pagination' ).length !== 0 ){
					return true;
				}

				if ( $( el ).closest( '.woocommerce-product-gallery__image' ).length !== 0 ){
					return true;
				}

				if ( $( el ).is( () => { // eslint-disable
					let _return = false;

					selectorList.forEach( ( sel ) => {
						if ( $( el ).is( sel ) ) {
							_return = true; 
						}
					} );

					return _return;
				} ) ){
					return true;
				}

				return false;
			},
			classes: {
				pageIsTransition: this.options.classes.pageIsTransition,
				pageIsReady: this.options.classes.pageIsReady,
				pageIsLoading: this.options.classes.pageIsLoading
			}
		} );		
		this.ROUTER.init();
	},

	/**
	 * First Page Visit
	 */	
	firstPageVisit( container ){
		const self = this;
		const namespace = $( container ).data( 'barbaNamespace' );
		let firstPageEnter = false;
		if ( Animations.hasAnimation( namespace, 'enter', 'tl' ) ){
			firstPageEnter = Animations[namespace].enter( { newContainer: container } );	
		}
		
		if ( OAX.config.is_preloader === 'Y' ) {
			const dfrLogo = $.Deferred(); // eslint-disable-line

			const preloaderTimeout = setTimeout( () => {
				dfrLogo.resolve();
			}, 4000 );

			$( OAX.preloader.options.logo ).on( Utils.onAnimationIteration(), () => {
				OAX.preloader_bar.go( 85 );
				$( OAX.preloader.options.logo ).css( 'animation', 'none' );
				clearTimeout( preloaderTimeout );
				dfrLogo.resolve();
			} );				

			/**
			 * Remove Preloader
			 */		
			dfrLogo.done( () => {
				/**
				 * Move Preloader Bar to 100% and remove
				 */		
				OAX.preloader_bar.go( 100 );
				
				self.removePreloader().then( () => {
					/**
					 * Remove Preloader bar
					 */
					$( 'html' ).removeClass( self.options.classes.pageIsLoading );
	
					self.onTransitionCompleted( container );

					if ( Utils.isset( firstPageEnter ) && firstPageEnter !== false ){
						firstPageEnter.play();
					}
					
					$( document ).trigger( 'OAX::preloader:removed' );
					$( '.c-preloader__bar' ).remove();
				} );
			} );
		} else if ( OAX.config.is_preloader === 'TRANSITION' ){
			const preloaderTransitionDuration = 0.75;
			
			gsap.to( $( '.c-preloader .c-page-transition' ), {
				duration: preloaderTransitionDuration,
				yPercent: -100,
				ease: 'circ.inOut',
				onComplete(){
					$( OAX.preloader.options.el ).remove();
					
					self.onTransitionCompleted( container );
					
					if ( ! Utils.cookie.hasItem( 'oax_preloader' ) ){
						Utils.cookie.setItem( 'oax_preloader', 'TRANSITION', 600, OAX.config.url_base, '' );
					}
				}
			} );

			$( 'html' ).removeClass( self.options.classes.siteIsLoading );	
			$( 'html' ).addClass( self.options.classes.siteIsReady );

			/**
			 * Viewport Animations
			 */
			vA.init();
			setTimeout( () => {
				$( 'html' ).removeClass( self.options.classes.pageIsLoading );	
				$( 'html' ).addClass( self.options.classes.pageIsReady );				
				if ( Utils.isset( firstPageEnter ) && firstPageEnter !== false ){
					firstPageEnter.play();
				}					
			}, preloaderTransitionDuration * 1000 / 2 );
			//
		} else {
			$( 'html' ).removeClass( self.options.classes.pageIsLoading );
			$( 'html' ).removeClass( self.options.classes.siteIsLoading );
			$( 'html' ).addClass( self.options.classes.pageIsReady );
			$( 'html' ).addClass( self.options.classes.siteIsReady );
			
			/**
			 * Viewport Animations
			 */
			setTimeout( () => {
				vA.init();	
			}, 500 );	

			this.onTransitionCompleted( container );
		}
	},

	/**
	 * Remove Preloader
	 */		
	removePreloader( ){
		const self = this;
		const preloaderDuration = 1.5;
		const tl = gsap.timeline( {
			onComplete(){
				$( OAX.preloader.options.el ).remove();
			}
		} );
	
		jQuery( 'html' ).removeClass( self.options.classes.siteIsLoading );
		jQuery( 'html' ).addClass( self.options.classes.siteIsReady );
		
		Utils.scrollTo( 0, 0 );
	
		tl.to( $( OAX.preloader.options.bg ), {
			duration: preloaderDuration,
			yPercent: -100,
			ease: 'expo.inOut'
		}, 0 );
		tl.to( $( OAX.preloader.options.logo ), {
			duration: 0.75,
			scale: 0,
			autoAlpha: 0,
			ease: 'expo.inOut'
		}, 0.3 );

		setTimeout( () => {
			vA.init();
			$( 'html' ).addClass( self.options.classes.pageIsReady );		
		}, preloaderDuration * 1000 / 2 );
		
		return Utils.timelinePromise( tl, 0.8 );
	},

	/**
	 * Init Headroom
	 */	
	initHeadroom(){
		const $siteHeader = $( '#site__header' );
		const $languageNav = $( '.wpm-language-switcher' );
		const siteHeader = $siteHeader.get( 0 );
		const headroom = new Headroom( siteHeader, {
			offset: 200,
			onPin() {
				if ( $languageNav.length ){
					$languageNav.addClass( this.classes.pinned ).removeClass( this.classes.unpinned ); 
				}
			},
			onUnpin() {
				if ( $languageNav.length ){
					$languageNav.addClass( this.classes.unpinned ).removeClass( this.classes.pinned ); 
				}
			},
			onTop() {
				if ( $languageNav.length ){
					$languageNav.addClass( this.classes.top ).removeClass( this.classes.notTop ); 
				}
			},
			onNotTop() {
				if ( $languageNav.length ){
					$languageNav.addClass( this.classes.notTop ).removeClass( this.classes.top ); 
				}
			},
			onBottom() {
				if ( $languageNav.length ){
					$languageNav.addClass( this.classes.bottom ).removeClass( this.classes.notBottom ); 
				}
			},
			onNotBottom() {
				if ( $languageNav.length ){
					$languageNav.addClass( this.classes.notBottom ).removeClass( this.classes.bottom ); 
				}
			}
		} );
		headroom.init();
	},

	initForms( container ){
		const $forms = $( container ).find( 'form.wpcf7-form' );
		if ( $forms.length > 0 && Utils.isset( window.wpcf7 ) ){
			$forms.each( ( i, el ) => {
				wpcf7.init( el );
			} );
		}
	},

	initWoocommerce( container ){
		WC.init( container );
	},

	/**
	 * On Link Clicked
	 */	
	onLinkClicked( HTMLElement ){
		Utils.progressBar( 'start' );
	},

	/**
	 * On Browser Buttons
	 */	
	onBrowserNav( url ) {
		// console.log( url );
	},	

	/**
	 * On Init State Change
	 */	
	onInitStateChange( url ){
		// console.log( url );
	},

	/**
	 * On Transition Completed
	 */	
	onTransitionCompleted( container ){
		const $container = $( container );
		const namespace = $container.data( 'barbaNamespace' );
		
		if ( ! $container.find( '.c-section--header' ).hasClass( 'is-in-view' ) ){
			$container.find( '.c-section--header' ).addClass( 'is-in-view' );
		}
	},	

	/**
	 * On New Container Loaded
	 */
	onNewContainerLoaded( container ){
		Utils.progressBar( 'stop' );
	
		/**
		 * Fixes
		 */
		Fixes.reInit( container );
	
		/**
		 * Navigation
		 */
		navigation.setActiveState();

		/**
		 * Woocommerce
		 */		
		APP.initWoocommerce( container );

		/**
		 * Forms
		 */
		APP.initForms( container );

		/**
		 * Responsive Iframes
		 */
		Utils.responsiveIframes( container );

		/** 
		 * Inject YouTube
		 */
		Utils.injectYT( container );

		/**
		 * Init Sliders
		 */
		Utils.initSliders( container );
	
		/**
		 * Inject SVG's
		 */
		Utils.injectSVG( container );		

		/**
		 * Init Videos
		 */
		Utils.initVideos( container );
	}
};

$( document ).ready( () => {
	APP.init(); 
} );

window.OAX.APP = APP;
