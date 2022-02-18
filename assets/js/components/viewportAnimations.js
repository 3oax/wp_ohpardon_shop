/* eslint one-var: [0]*/

import Utils from '../app/utils.js';
import Fixes from '../app/fixes.js';

export default class ViewportAnimations {
	constructor( settings ) {
		const defaults = {
			container: 'body',
			selector: '.js--viewport',
			selector_not: ':not([data-slick])',
			selector_animation: {
				header: '.js--anim-header',
				body: '.js--anim-body',
				footer: '.js--anim-footer',
				xtra: '.js--anim-xtra',
			},
			data_duration: 'animationDuration',
			data_start: 'animationStart',
			data_end: 'animationEnd',
			data_reverse: 'animationReverse',
			data_animation_item_header: 'animationItemHeader',
			data_animation_item_body: 'animationItemBody',
			data_animation_item_footer: 'animationItemFooter',
			data_animation_item_xtra: 'animationItemXtra',
			data_animation: 'animation',
			data_animation_device: 'animationDevice',
			data_stagger_items: 'animationStaggerItems',
			data_offset: 'animationOffset'
		};
    
		this._defaults = defaults;
		this.options = Object.assign( defaults, settings );

		this.y = 0;
		this.scenes = [];
	}

	init(){
		const self = this;

		this.$items = $( this.options.container ).find( this.options.selector + this.options.selector_not );
		this.tweenItems = [];

		this.initSliderAutoplay();
		this.initEvents();
		this.initInViewClass();	

		if ( Utils.isset( window.OAX ) ){
			OAX.vA = this;
		}
	}
	
	reInit( container ){
		const self = this;
		this.options.container = container;
		
		this.destroy();
		this.init();		
	}

	initView(){
		const self = this;	
	}
  
	destroy(){
		this.$items = null;
		this.scenes = [];		
		this.removeEvents();
	}

	initInViewClass(){
		const self = this;
		
		const $itemsSections = $( this.options.container ).find( '.c-section' );
		if ( $itemsSections.length ){
			$itemsSections.each( ( i, el ) => {
				const trigger = $( el ).parent( '.pin-spacer' ).length ? $( el ).parent( '.pin-spacer' ) : el;
				ScrollTrigger.create( {
					trigger,
					onToggle: ( _self ) => {
						$( el )[_self.isActive ? 'addClass' : 'removeClass']( 'is-in-view' );
					},
					start: 'top bottom',
					end: 'bottom top'
				} );
			} );
		}

		const $addClassEls = $( this.options.container ).find( `${this.options.selector}--class[data-animation-class]` );
		if ( $addClassEls.length ){
			$addClassEls.each( ( i, el ) => {
				const trigger = $( el ).parent( '.pin-spacer' ).length ? $( el ).parent( '.pin-spacer' ) : el;
				const triggerClass = $( trigger ).data( 'animationClass' );
				ScrollTrigger.create( {
					trigger,
					onToggle: ( _self ) => {
						$( el )[_self.isActive ? 'addClass' : 'removeClass']( triggerClass );
					},
					start: 'top bottom',
					end: 'bottom top'
				} );
			} );
		}		

		$( document ).trigger( 'OAX::viewport-animations:init-general', [this.$items] );
	}

	initEvents(){
		const self = this;
		const y = 0;
		const justPlayVideos = true;

		this.$items.each( ( i, el ) => {
			const $item = $( el );
			
			const isMarkers = Boolean( Utils.isset( $item.data( 'animationMarkers' ) ) );
			const duration = self.getAnimationOption( $item, self.options.data_duration, 0.85 );
			const offset = self.getAnimationOption( $item, self.options.data_offset, 0 );
			const reverse = self.getAnimationOption( $item, self.options.data_reverse, false );
			const animationType = self.getAnimationOption( $item, self.options.data_animation, 'fadeIn' );

			const tween = gsap.timeline( { 
				defaults: {
					duration, 
					ease: 'power2'
				} 
			} );

			const animationStart = self.getAnimationOption( $item, self.options.data_start, 'top+=17.5% bottom' );
			const animationEnd = self.getAnimationOption( $item, self.options.data_end, 'bottom top' );			
			const tweenOnStart = false;
			const tweenOnToggle = false;
			const tweenOnUpdate = false;
			let tweenOverwrite = false;			
			let tweenItem = el;

			let scrollTriggerOptions = {};
			let tweenOptions;
			
			/**
			 * Animation Types (Tweens)
			 */	      
			if ( animationType === 'fadeInUp' ){
				tweenOptions = {
					y: 30,
					autoAlpha: 0
				};
			} else if ( animationType === 'staggerFadeInUp' && Utils.isset( $item.data( self.options.data_stagger_items ) ) ){
				tweenItem = $( $item ).find( $item.data( self.options.data_stagger_items ) );
				tweenOptions = {
					y: 30,
					autoAlpha: 0,
					stagger: self.getAnimationOption( $item, `${self.options.data_duration}Item`, 0.2 )
				};
			} else if ( animationType === 'fadeInDown' ) {
				tweenOptions = {
					y: -30,
					autoAlpha: 0
				};
			} else if ( animationType === 'fadeInLeft' ) {
				tweenOptions = {
					x: -30,
					autoAlpha: 0
				};
			} else if ( animationType === 'fadeInRight' ) {
				tweenOptions = {
					x: 30,
					autoAlpha: 0
				};
			} else if ( animationType === 'splitWords' ) {
				let tweenSplit;
				gsap.set( tweenItem, { overflow: 'hidden' } );

				if ( Utils.isset( $item.data( 'animationChilds' ) ) ){
					tweenSplit = {};
					tweenSplit.chars = [];
					tweenSplit.lines = [];
					tweenSplit.words = [];
					$item.find( '> *' ).each( ( _i, _el ) => {
						const _tweenSplit = new SplitText( _el, {
							type: 'lines,words,chars',
							linesClass: 'overflow-hidden js--text-split--line',
							wordsClass: 'overflow-hidden js--text-split--word',      
						} );
						tweenSplit.chars.push( _tweenSplit.chars );
						tweenSplit.words.push( _tweenSplit.words );
						tweenSplit.lines.push( _tweenSplit.lines );
					} );

					tweenItem = tweenSplit.words;
				} else {
					tweenSplit = new SplitText( tweenItem, {
						type: 'lines,words,chars',
						linesClass: 'overflow-hidden js--text-split--lines',
						wordsClass: 'overflow-hidden js--text-split--words',      
					} );
					tweenItem = tweenSplit.words;
				}

				tweenOptions = {
					y: '100%',
					stagger: 0.1
				};
			} else if ( animationType === 'content' ) {
				tweenOverwrite = true;
				
				let tweenSplit;
				const tweenHeader = [];
				const animHeader = Utils.isset( $item.data( 'animationItemHeader' ) ) ? $item.find( $item.data( 'animationItemHeader' ) ) : $item.find( '.js--anim-header' );
				const animContent = Utils.isset( $item.data( 'animationItemContent' ) ) ? $item.find( $item.data( 'animationItemContent' ) ) : $item.find( '.js--anim-content' );
				const animFooter = Utils.isset( $item.data( 'animationItemFooter' ) ) ? $item.find( $item.data( 'animationItemFooter' ) ) : $item.find( '.js--anim-footer' );
				const animXtra = Utils.isset( $item.data( 'animationItemXtra' ) ) ? $item.find( $item.data( 'animationItemXtra' ) ) : $item.find( '.js--anim-xtra' );
				
				// console.log( animContent, animFooter, animHeader );

				if ( animHeader.length ){
					tweenSplit = {};
					tweenSplit.chars = [];
					tweenSplit.lines = [];
					tweenSplit.words = [];
					
					let animHeaderItems = animHeader.find( '> *' );
					if ( ! animHeaderItems.length ){
						animHeaderItems = animHeader; 
					}
					if ( animHeader.find( ' > br ' ).length ){
						animHeaderItems = animHeader; 
					}
					
					animHeaderItems.each( ( _i, _el ) => {
						/*
						 * const _tweenSplit = new SplitText( _el, {
						 * type: 'lines,words,chars',
						 * linesClass: 'overflow-hidden js--text-split--lines',
						 * wordsClass: 'overflow-hidden whitespace-no-wrap js--text-split--words',      
						 * } );
						 * tweenSplit.chars.push( _tweenSplit.chars );
						 * tweenSplit.words.push( _tweenSplit.words );
						 * tweenSplit.lines.push( _tweenSplit.lines );
						 */
						tweenHeader.push( _el );
					} );

					tween.addLabel( 'start' ).from( tweenHeader, {
						y: 20,
						autoAlpha: 0,
						stagger: 0.075						
					}, 0 ).addLabel( 'animHeader' );
				}

				if ( animContent.length ){
					tween.from( animContent, {
						y: 20,
						autoAlpha: 0					
					}, self.getAnimationOption( animContent, 'animationContentTiming', 'start+=0.2' ) )
						.addLabel( 'animContent' );
				}

				if ( animFooter.length ){
					tween.from( animFooter, {
						y: 20,
						autoAlpha: 0					
					}, self.getAnimationOption( animFooter, 'animationFooterTiming', 'start+=0.35' ) )
						.addLabel( 'animFooter' );				
				}

				if ( animXtra.length ){
					tween.from( animXtra, {
						y: 30,
						autoAlpha: 0					
					}, self.getAnimationOption( animXtra, 'animationXtraTiming', 'start+=0.2' ) )
						.addLabel( 'animXtra' );						
				}
			} else {
				tweenOptions = {
					autoAlpha: 0
				};
			}

			if ( ! tweenOverwrite ){
				tween.from( tweenItem, tweenOptions );
			}

			scrollTriggerOptions = {
				animation: tween,
				trigger: $item,
				markers: Boolean( isMarkers ),
				start: animationStart,
				end: animationEnd
			};

			if ( reverse && tweenOnUpdate === false ){
				scrollTriggerOptions.toggleActions = 'play none none reverse';
			}

			if ( tweenOnUpdate !== false ){
				delete scrollTriggerOptions.animation;
				scrollTriggerOptions.onUpdate = tweenOnUpdate;
				if ( animationType === 'videoScrub' ){
					scrollTriggerOptions.scrub = true;
					scrollTriggerOptions.pin = true;

					if ( Utils.isset( justPlayVideos ) && justPlayVideos === true ){
						scrollTriggerOptions.scrub = false;
						scrollTriggerOptions.pin = false;		
						delete scrollTriggerOptions.onUpdate;
						scrollTriggerOptions.onToggle = tweenOnToggle;
					}
				}

				if ( tweenOnStart !== false ){
					scrollTriggerOptions.onStart = tweenOnStart;
				}
			}

			// self.createScrolltrigger( scrollTriggerOptions );
			const tweenTriggerItem = ScrollTrigger.create( scrollTriggerOptions );
			self.tweenItems.push( tweenTriggerItem );
		} );

		$( document ).trigger( 'OAX::viewport-animations:init-elements', [this.$items] );
	}
  
	removeEvents(){
	
	}

	initSliderAutoplay(){
		const self = this;

		const $swiperSliders = $( '.js--viewport.js--slider' );

		if ( $swiperSliders.length ){
			$swiperSliders.each( ( i, el ) => {
				const swiper = $( el ).find( '.swiper-initialized' )[0].swiper;
				ScrollTrigger.create( {					
					trigger: el,
					start: 'top center',
					onToggle: ( _self ) => {
						if ( _self.isActive && _self.direction === 1 ) {
							swiper.slideNext(); 
						}			
					},
				} );
			} );
		}
	}

	getAnimationOption( $item, option = false, _default = false ){
		const optionsArr = Utils.isset( $item.data( option ) ) ? $item.data( option ) : _default;
		let _return;
		
		if ( $.isArray( optionsArr ) ){
			if ( Utils.isMobile() ){
				if ( typeof optionsArr[1] === 'object' && optionsArr[1] !== null ){
					_return = JSON.parse( optionsArr[1] );
				} else {
					_return = optionsArr[1];
				}
			} else if ( typeof optionsArr[0] === 'object' && optionsArr[0] !== null ){
				_return = JSON.parse( optionsArr[0] );
			} else {
				_return = optionsArr[0];
			}
		} else if ( typeof optionsArr === 'object' && optionsArr !== null ){
			_return = JSON.parse( optionsArr );
		} else {
			_return = optionsArr;
		}

		return _return;
	}

	createScrolltrigger(){

	}

	setupAnimation( item, options ){

	}

	addScene( scene ){
		// deprecated
	}
}
