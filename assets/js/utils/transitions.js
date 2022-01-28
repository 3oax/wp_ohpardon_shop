/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Barba from 'barba.js';
import Utils from './utils.js';
import Animations from './animations.js';

export default class Transitions {
	constructor( settings ) {
		this.router = null;
		if ( typeof settings !== 'undefined' && settings.hasOwnProperty( 'router' ) ){
			this.router = settings.router;
		}	
	}

	_fixWrapper( transition ){
		/*
		 * const $wrapper = jQuery( `#${Barba.Pjax.Dom.wrapperId}` );
		 * $wrapper.addClass( 'is-fixed' );
		 * TweenMax.set( $wrapper, {
		 * height: jQuery( transition.oldContainer ).height()
		 * } );		
		 */
	}

	_unfixWrapper(){
		/*
		 * const $wrapper = jQuery( `#${Barba.Pjax.Dom.wrapperId}` );
		 * if ( $wrapper.hasClass( 'is-fixed' ) ){
		 * $wrapper.attr( 'style', '' ).removeClass( 'is-fixed' );	
		 * }
		 */
	}

	_normalize( transition ){
		/*
		 * if ( jQuery( transition.newContainer ).data( 'namespace' ) !== 'event' ){
		 * this._unfixWrapper();
		 * Utils.scrollLock( false );
		 * }
		 */
	}

	_wrapper( transition, fnNameTransitionOut, fnNameTransitionIn ){
		const self = this,
			onInitTransition = [transition.newContainerLoading],
			onOldPageLeave = [transition[fnNameTransitionOut].call( transition )], // eslint-disable-line
			onNewPageEnter = []; // empty at start

		let oldPageAnimationLeave = false,
			newPageAnimationEnter = false;
		
		if ( self._hasLeave( transition.oldContainer ) ){
			oldPageAnimationLeave = self._getLeave( transition );
			
			if ( oldPageAnimationLeave.hasOwnProperty( 'timeline' ) ){
				oldPageAnimationLeave = Utils.timelinePromise( oldPageAnimationLeave );
			}
			
			onInitTransition.push( oldPageAnimationLeave );
		}

		Promise
			.all( onInitTransition )
			.then( () => Promise.all( onOldPageLeave ) )
			.then( () => {
				// Push transition in to promises
				onNewPageEnter.push( transition[fnNameTransitionIn].call( transition ) ); // eslint-disable-line

				// check if new page has enter animation
				newPageAnimationEnter = self._getEnter( transition );

				return Promise.all( onNewPageEnter );
			} )
			.then( () => {
				// if new page has enter animation -> fire animation
				if ( newPageAnimationEnter !== false ){
					newPageAnimationEnter.play();
				}
				
				transition.done();
			} );
	}

	_hasEnter( newContainer ){
		if ( Animations.hasOwnProperty( jQuery( newContainer ).data( Barba.Pjax.Dom.dataNamespace ) ) 
		&& Animations[jQuery( newContainer ).data( Barba.Pjax.Dom.dataNamespace )].hasOwnProperty( 'enter' ) ){
			return true;
		}

		return false;
	}

	_getEnter( ctx ){
		if ( this._hasEnter( ctx.newContainer ) ){
			return Animations[jQuery( ctx.newContainer ).data( Barba.Pjax.Dom.dataNamespace )].enter( ctx );
		}

		return false;
	}

	_hasLeave( oldContainer ){
		if ( Animations.hasOwnProperty( jQuery( oldContainer ).data( Barba.Pjax.Dom.dataNamespace ) ) 
		&& Animations[jQuery( oldContainer ).data( Barba.Pjax.Dom.dataNamespace )].hasOwnProperty( 'leave' ) ){
			return true;
		}

		return false;
	}

	_getLeave( ctx ){
		if ( this._hasLeave( ctx.oldContainer ) ){
			return Animations[jQuery( ctx.oldContainer ).data( Barba.Pjax.Dom.dataNamespace )].leave( ctx );
		}

		return false;
	}

	_fireLeave(){

	}

	noTransition() {
		const self = this;
    
		return Barba.BaseTransition.extend( {
			start() {
				this.newContainerLoading.then( this.finish.bind( this ) );
			},
		
			finish() {
				const _this = this;
				
				if ( Utils.isset( OAX.Scrollbar ) ){
					OAX.Scrollbar.scrollTo( 0, 0 );
				} else {
					window.scrollTo( 0, 0 );
				}
				
				self._normalize( _this );

				this.done();
			}
		} );
	}

	fadeTransition() {
		const self = this;

		return Barba.BaseTransition.extend( {
			start(){
				const _this = this;
				self._wrapper( this, 'fadeOut', 'fadeIn' );
			},
			fadeOut(){
				const _this = this,
					tlFadeOut = new TimelineMax( {
						paused: false
					} );

				tlFadeOut.to( this.oldContainer, 0.5, {
					autoAlpha: 0
				} );

				return Utils.timelinePromise( tlFadeOut );
			},			
			fadeIn(){
				const _this = this,
					tlFadeIn = new TimelineMax( {
						paused: false,
						onStart(){
							jQuery( _this.oldContainer ).hide();
						},
						onComplete(){
							self._normalize( _this );
						}
					} );

				TweenMax.set( this.newContainer, {
					visibility: 'visible',
					opacity: 0,
				} );

				tlFadeIn.to( this.newContainer, 0.5, {
					autoAlpha: 1
				} );

				return Utils.timelinePromise( tlFadeIn );
			}
		} );
	}

	layerTransition(){
		const self = this;
		const $el = $( '.c-page-transition' );
		
		return Barba.BaseTransition.extend( {
			start(){
				const _this = this;
				self._wrapper( this, 'layerIn', 'layerOut' );
			},
			layerIn(){
				const _this = this;
				const tl = new TimelineMax( {
					onStart(){
						TweenMax.set( $el, {
							autoAlpha: 1
						} );
					},
					onComplete(){
						TweenMax.set( _this.newContainer, {
							visibility: 'visible'
						} );
						TweenMax.set( _this.oldContainer, {
							visibility: 'hidden'
						} );												
						if ( Utils.isset( OAX.Scrollbar ) ){
							OAX.Scrollbar.scrollTo( 0, 0 );
						} else {
							window.scrollTo( 0, 0 );
						}
					}
				} );
				
				let start = 0;
				
				$el.find( '.c-page-transition__shape' ).each( ( i, el ) => {
					const shape = $( el );
					const layers = shape.find( '.c-page-transition__layer' );
		
					tl.fromTo(
						layers.eq( 0 ),
						0.8,
						{
							x: -shape.width() - 1
						},
						{
							x: 0,
							ease: Power2.easeInOut
						},
						start
					);
		
					tl.fromTo(
						layers.eq( 1 ),
						0.8,
						{
							x: -shape.width() - 1
						},
						{
							x: 0,
							ease: Power2.easeInOut
						},
						start + 0.2
					);
		
					start += 0.1;
				} );

				return Utils.timelinePromise( tl, 1 );
			},			
			layerOut(){
				const _this = this;
				const tl = new TimelineMax( {
					onComplete(){
						TweenMax.set( $el, {
							autoAlpha: 0
						} );		
						_this.done();				
					}
				} );

				let start = 0;

				$el.find( '.c-page-transition__shape' ).each( ( i, el ) => {
					const shape = $( el );
					const layers = shape.find( '.c-page-transition__layer' );
		
					tl.fromTo(
						layers.eq( 1 ),
						0.8,
						{
							x: 0
						},
						{
							x: shape.width() + 1,
							ease: Power2.easeInOut
						},
						start
					);
		
					tl.fromTo(
						layers.eq( 0 ),
						0.8,
						{
							x: 0
						},
						{
							x: shape.width() + 1,
							ease: Power2.easeInOut
						},
						start + 0.2
					);
		
					start += 0.10;
				} );

				setTimeout( () => {
					const $container = $( _this.newContainer );
					if ( ! $container.find( '.entry-header' ).hasClass( 'is-in-view' ) ){
						$container.find( '.entry-header' ).addClass( 'is-in-view' );
					}
				}, 500 );

				return Utils.timelinePromise( tl, 1 );
			}
		} );		
	}
}
