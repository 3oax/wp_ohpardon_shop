/* eslint one-var: [0] */
/* eslint new-cap: [0] */
/* eslint max-len: [0] */

/**
 * File router.js.
 *
 * Handles script execution for specific pages
 */
import Transitions from './transitions.js';
import Views from '../views';
import Utils from './utils.js';
// import barbaPrefetch from '@barba/prefetch';

export default class Router {
	constructor( settings ) {
		const defaults = {
			debug: false,
			onNewContainerLoaded: null,
			onLinkClicked: null,
			onInitStateChange: null,
			onTransitionCompleted: null,
			onBrowserNav: null,
			baseTransition: null,
			preventLinks: null,
			isUpdateScripts: false,
			classes: {
				pageIsTransition: 'page--is-transition',
				pageIsLoading: 'page--is-loading',
				pageIsReady: 'page--is-ready'				
			}
		};

		this.options = Object.assign( {}, defaults, settings );		
	}

	init(){
		const self = this;
		const views = Views.getAll();
		const transitions = Transitions.getAll();

		this.is_linkclick = false;
		this.prev_scrolltop = 0;

		$( document ).on( 'click.oax::scrollTo', 'a[href^="#"]', ( event ) => {
			const $target = $( event.target ).is( 'a' ) ? $( event.target ) : $( event.target ).closest( 'a' );
			if ( /^#/.test( $target.attr( 'href' ) ) && $target.attr( 'href' ) !== '#' ){
				Utils.scrollTo( $target.attr( 'href' ) );
			}
			event.preventDefault();
		} );

		this.initHooks();
		// barba.use( barbaPrefetch );
		barba.init( {
			debug: this.options.debug,
			prevent: this.preventLinks.bind( this ),
			views,
			transitions,
			timeout: 5000			
		} );
	}

	initHooks(){
		const self = this;
		const debug = this.options.debug;
		
		// 0.
		barba.hooks.ready( ( data ) => {
			if ( debug ) {
				console.log( 'ready', data.current, data.next );
			}
			Views.beforeAppearAll( data );
		} );

		// 1.
		barba.hooks.page( ( data ) => {
			if ( debug ) {
				console.log( 'page', data.next.url.href, data.current, data.next );
			}	

			if ( data.trigger !== 'popstate' && data.trigger !== 'barba' ){
				self.is_linkclick 		= true;			  
				self.is_popstate 			= false;				
				self.onLinkClicked( data.trigger );
			}	else if ( data.trigger === 'popstate' ){
				self.is_linkclick 		= false;			  
				self.is_popstate 			= true;
				if ( self.options.onBrowserNav !== null ){
					self.options.onBrowserNav( data.next.url );
				}
			}

			self.onInitStateChange( data.next.url );	
		} );

		// 2.
		barba.hooks.before( ( data ) => {
			if ( debug ) {
				console.log( 'before', data.next.url.href, data.current, data.next );
			}			
		} );

		// 3.
		barba.hooks.beforeLeave( ( data ) => {
			if ( debug ) {
				console.log( 'beforeLeave', data.current, data.next ); 
			}		

			Views.beforeLeaveAll( data );	
		} );

		// 4.
		barba.hooks.leave( ( data ) => {
			if ( debug ) {
				console.log( 'leave [transition]', data.current, data.next );
			}		
			Views.onLeaveAll( data );
		} );

		// 5.
		barba.hooks.afterLeave( ( data ) => {
			if ( debug ) {
				console.log( 'afterLeave', data.current, data.next ); 
			}

			self._changeBodyClasses( data.next.html );
			Views.afterLeaveAll( data );						
		} );

		// 6.
		barba.hooks.nextAdded( ( data ) => {
			if ( debug ) {
				console.log( 'nextAdded', data.current, data.next );
			}

			self.onNewPageReady( data.next.container, data.next.html );			
		} );	

		// 7.
		barba.hooks.beforeEnter( ( data ) => {
			if ( debug ) {
				console.log( 'beforeEnter', data.current, data.next ); 
			}

			Views.beforeEnterAll( data );
		} );

		// 8.
		barba.hooks.enter( ( data ) => {
			if ( debug ) {
				console.log( 'enter [transition]', data.current, data.next ); 
			}		
			
			Views.onEnterAll( data );
		} );

		// 9.
		barba.hooks.afterEnter( ( data ) => {
			if ( debug ) {
				console.log( 'afterEnter', data.current, data.next ); 
			}

			if ( self.is_popstate ){
				Utils.scrollTo( 0, self.prev_scrolltop, true );
			} else if ( Utils.isset( data.next.url.hash ) ){
				const $scrollToContainer = $( data.next.container ).find( `#${data.next.url.hash}` );
				if ( $scrollToContainer.length ){
					Utils.scrollTo( 0, $scrollToContainer.offset().top, true );
				}
			}
			
			Views.afterEnterAll( data );
		} );

		// 10.
		barba.hooks.after( ( data ) => {
			if ( debug ) {
				console.log( 'after', data.current, data.next ); 
			}
			self.onTransitionCompleted( data.next.container );
		} );

		// 11.
		barba.hooks.currentRemoved( ( data ) => {
			if ( debug ) {
				console.log( 'currentRemoved', data.current, data.next );
			}
		} );

		// -1 & 12.
		barba.hooks.reset( ( data ) => {
			if ( debug ) {
				console.log( 'reset', data.current, data.next );
			}			
		} );	

		/*
		 * dunno the order of the follow
		 */
		barba.hooks.currentAdded( ( data ) => {
			if ( debug ) {
				console.log( 'currentAdded', data.current, data.next ); 
			}			
		} );
		barba.hooks.nextRemoved( ( data ) => {
			if ( debug ) {
				console.log( 'nextRemoved', data.current, data.next );
			}			
		} );
	}

	onLinkClicked( HTMLElement ){
		const self = this;

		$( 'html' ).addClass( this.options.classes.pageIsTransition );

		if ( OAX.template.config.is_ajax ){
			Utils.scrollDisable( true );
			// Utils.scrollLock( true );
		}

		if ( self.options.onLinkClicked !== null ){
			self.options.onLinkClicked( HTMLElement );
		}

		self.prev_scrolltop = jQuery( document ).scrollTop();
	}
	
	onNewPageReady( HTMLElementContainer, newPageRawHTML ){
		if ( this.options.isUpdateScripts ){
			this._initPageScripts( HTMLElementContainer );
		}
		this.onNewContainerLoaded( HTMLElementContainer );
	}
	
	onInitStateChange( url ){
		const self = this;
		
		if ( OAX.template.config.is_ajax ){
			Utils.scrollDisable( true );
			Utils.trackPageView( url.href );
		}

		$( 'html' ).addClass( this.options.classes.pageIsLoading );

		if ( this.options.onInitStateChange !== null ){
			this.options.onInitStateChange( url );
		}
	}
	
	onTransitionCompleted( container ){
		this.is_linkclick = false;
		
		Utils.scrollDisable( false );

		$( 'html' ).removeClass( this.options.classes.pageIsTransition );
		$( 'html' ).addClass( this.options.classes.pageIsReady );

		if ( this.options.onTransitionCompleted !== null ){
			this.options.onTransitionCompleted( container );
		}	
	}

	onNewContainerLoaded( container ){
		$( 'html' ).removeClass( this.options.classes.pageIsLoading );
		
		if ( this.options.onNewContainerLoaded !== null ){
			this.options.onNewContainerLoaded( container );
		}
	}	

	preventLinks( { el, event, href } ){
		let check = false;

		if ( el.classList && el.classList.contains( 'no-barba' ) ){
			check = true;
		}

		if ( $( el ).attr( 'href' ).toLowerCase().match( /\.(pdf)/g ) ){
			check = true;
		}

		if ( $( el ).attr( 'href' ).toLowerCase() === '#' ){
			check = true;
		}

		if ( /^#/.test( $( el ).attr( 'href' ) ) ){
			check = true;
		}

		if ( $( el ).attr( 'target' ) === '_blank' ){
			check = true;
		}

		if ( $( el ).closest( '#wpadminbar' ).length ){
			check = true;
		}

		if ( Utils.isset( event ) && event.type === 'click' && window.location.href.includes( href ) ){
			event.preventDefault();
		}

		if ( check === false && this.options.preventLinks !== null ){
			check = this.options.preventLinks( el, event, href );
		}

		return check;
	}

	_changeBodyClasses( newPageRawHTML ){
		const parser = new DOMParser();
		const DOC = parser.parseFromString( newPageRawHTML, 'text/html' );		
		let bodyClasses = DOC.body.getAttribute( 'class' );
		
		$( 'html' ).removeClass( this.options.classes.pageIsReady );

		if ( $( 'body' ).hasClass( 'overflow-hidden' ) ){
			bodyClasses += ' overflow-hidden';
		}

		$( 'body' ).attr( 'class', bodyClasses );	
	}

	_initPageScripts( container ){
		const $scriptsEl = $( container ).find( '.oax-js-config--page-scripts[data-page-scripts]' );
		if ( $scriptsEl.length ){
			const scripts = $scriptsEl.data( 'pageScripts' );
			const $inlineScripts = $scriptsEl.find( '> script' );			
			const isDev = location.host === 'localhost:3000';
			
			if ( Object.keys( scripts ).length ){
				const $currentScripts = $( 'script[id][src]' );
				const currentScripts = {};

				$currentScripts.each( ( i, el ) => {
					currentScripts[$( el ).attr( 'id' )] = $( el ).attr( 'src' );
				} );

				// console.log( scripts, currentScripts );

				for ( const [key, value] of Object.entries( scripts ) ) {
					if ( currentScripts[key] === undefined ){
						const $belongingInlineScript = $inlineScripts.filter( `[data-id="${key}-extra"]` );
						
						if ( $belongingInlineScript.length ){
							console.log( $belongingInlineScript[0].innerText );
							// eval.call( window, $belongingInlineScript[0].innerText ); // eslint-disable-line
						}

						console.log( value, key );
						Utils.loadScript( value, key );
					}
				}

				$( document ).trigger( 'ready' );
			}
		}
	}

	_getNamespace( container ){
		return container.getAttribute( `data-barba-namespace` );
	}
}
