/* eslint one-var: [0] */
/* eslint new-cap: [0] */
/* eslint max-len: [0] */

/**
 * File router.js.
 *
 * Handles script execution for specific pages
 */
import Barba from 'barba.js';
import Transitions from './transitions.js';
import Utils from './utils.js';
import Views from '../views';

const views = new Views();

export default class Router {
	constructor( settings ) {
		const defaults = {
			isPjax: true,
			pageAnimations: null,
			pageTransitions: null,
			onNewContainerLoaded: null,
			onLinkClicked: null,
			onInitStateChange: null,
			onTransitionCompleted: null,
			onBackBtn: null,
			baseTransition: null,
			Barba: {
				data_namespace: 'namespace',
				wrapper_id: 'site__body',
				container_class: 'site__inner'
			}
		};

		this.options = Object.assign( {}, defaults, settings );

		this.transitions = new Transitions( {
			router: this
		} );		
	}

	init() {
		const self = this;
		let i;

		// Configure Settings
		Barba.Pjax.Dom.dataNamespace 	= this.options.Barba.data_namespace;
		Barba.Pjax.Dom.wrapperId 			= this.options.Barba.wrapper_id;
		Barba.Pjax.Dom.containerClass = this.options.Barba.container_class;

		// Init Views
		const allViews = views.getAllViews();
		if ( allViews.length ){
			for ( var j = 0; j < allViews.length; j++ ){
				allViews[j].default.init();
			}
		}

		// Init Base Transition
		Barba.Pjax.getTransition = function(){
			return self.options.baseTransition !== null ? self.transitions[self.options.baseTransition]() : self.transitions.noTransition();
		};

		if ( this.options.isPjax === true ){
			// Init Prefetch
			Barba.Prefetch.init();
			
			// Start Pjax
			Barba.Pjax.start();
		}		

		this._body_classes = null;
		this.is_link_clicked = false;
		this.prev_scrolltop = 0;

		// On Link Clicked
		Barba.Dispatcher.on( 'linkClicked', ( HTMLElement, MouseEvent ) => {
			self.onLinkClicked( HTMLElement, MouseEvent );

			if ( self.options.onLinkClicked !== null ){
				// jQuery.proxy( self.options.onLinkClicked( HTMLElement, MouseEvent ), self );
				self.options.onLinkClicked( self, HTMLElement, MouseEvent );
			}	
			
			$( document ).triggerHandler( 'oax::page:link-clicked', [HTMLElement, MouseEvent] );
		} );

		// On Init State Change (URL Change)
		Barba.Dispatcher.on( 'initStateChange', ( currentStatus ) => {	
			self.onInitStateChange( currentStatus );
			
			if ( self.options.onInitStateChange !== null ){
				self.options.onInitStateChange( currentStatus );
			}	
			
			$( document ).triggerHandler( 'oax::page:state-change', [ currentStatus ] );
		} );

		// On New Page Ready
		Barba.Dispatcher.on( 'newPageReady', ( currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML ) => {
			self.onNewPageReady( currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML );
			$( document ).triggerHandler( 'oax::page:new-page-ready', [currentStatus, prevStatus] );
		} );

		// On Transition Completed
		Barba.Dispatcher.on( 'transitionCompleted', ( currentStatus, prevStatus ) => {
			self.onTransitionCompleted( currentStatus, prevStatus );
			
			if ( self.options.onTransitionCompleted !== null ){
				self.options.onTransitionCompleted( currentStatus, prevStatus );
			}	
			
			$( document ).triggerHandler( 'oax::page:transition-end', [currentStatus, prevStatus] );
		} );	
	}

	onLinkClicked( HTMLElement, MouseEvent ){
		const self = this;

		$( 'html' ).removeClass( 'page--is-ready' );
		$( 'html' ).addClass( 'page--is-transition' );

		// Utils.scrollLock( true );
		Utils.scrollDisable( true );

		self.is_link_clicked 	= true;			  
		self.is_back_btn 			= false;
		self.prev_scrolltop = jQuery( document ).scrollTop();	
	}
	
	onNewPageReady( currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML ){		
		const parser = new DOMParser();
		const DOC = parser.parseFromString( newPageRawHTML, 'text/html' );
		
		const bodyClasses = DOC.body.getAttribute( 'class' );
		this._body_classes = bodyClasses; // jQuery( 'body' ).attr( 'class', bodyClasses );

		this.onNewContainerLoaded( HTMLElementContainer );
	}

	onInitStateChange( currentStatus ){
		const self = this;

		// Utils.scrollLock( true );
		Utils.scrollDisable( true );

		// If is Back Button
		if ( ! self.is_link_clicked ) {
			self.is_back_btn = true;
		}

		if ( ! self.is_back_btn ) {
			if ( self.options.onBackBtn !== null ){
				self.options.onBackBtn( self, currentStatus );
			} else {
				Barba.Pjax.getTransition = function(){
					return self.transitions.noTransition();
				};				
			}
		}
				
		if ( typeof ga !== 'undefined' && typeof ga === 'function' ){
			ga( 'send', 'pageview', currentStatus.url );
		}

		if ( typeof _paq !== 'undefined' ){
			_paq.push( ['trackPageView'] );
		}
	}
	
	onTransitionCompleted( currentStatus, prevStatus ){
		this.is_link_clicked = false;
		
		// Utils.scrollLock( false );
		Utils.scrollDisable( false );

		if ( this._body_classes !== null ){
			jQuery( 'body' ).attr( 'class', this._body_classes );
		}

		$( 'html' ).removeClass( 'page--is-transition' );
		$( 'html' ).addClass( 'page--is-ready' );
	}

	onNewContainerLoaded( container ){
		const namespace = this._getNamespace( container );

		if ( this.options.onNewContainerLoaded !== null ){
			this.options.onNewContainerLoaded( container );
		}
	}	

	_getNamespace( container ){
		return container.getAttribute( `data-${this.options.Barba.data_namespace}` );
	}
}
