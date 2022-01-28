/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Utils from '../utils';

const TransitionDefault = {
	beforeAppear() {},
	appear() {},
	afterAppear() {},
	beforeLeave() {},
	leave( data ) {
		const self = TransitionDefault;
		const done = this.async();
		const tlSlideIn = gsap.timeline( {
			onComplete(){
				if ( Utils.isset( data.next.container ) ){
					gsap.set( data.next.container, {
						visibility: 'visible'
					} );
				}

				if ( ! OAX.template.config.is_ajax ){
					window.location.href = window.location.href;
										
					if ( ! Utils.cookie.hasItem( 'oax_preloader' ) ){
						Utils.cookie.setItem( 'oax_preloader', 'TRANSITION', 600, OAX.config.url_base, '' );
					}
				} else {
					Utils.scrollTo( 0, 0 );
					done();
				}
			}
		} );
		self.$el = $( '.c-page-transition' );

		tlSlideIn.set( self.$el, {
			autoAlpha: 1,
			yPercent: 100 
		} );
		tlSlideIn.to( self.$el, {
			yPercent: 0,
			duration: 0.5,
			autoAlpha: 1,
			ease: 'circ.inOut'
		}, 0 );
	},
	afterLeave() {},
	beforeEnter() {},
	enter( data ) {
		const self = TransitionDefault;
		const done = this.async();
		const tlSlideOut = gsap.timeline( {
			paused: false,
			onStart(){
				jQuery( data.current.container ).hide();
			},
			onComplete(){
				gsap.set( self.$el, {
					autoAlpha: 0,
					yPercent: 100
				} );
				done();
			}
		} );
			
		tlSlideOut.to( self.$el, {
			duration: 0.75,
			yPercent: -100,
			ease: 'circ.inOut',
			delay: 0.5
		} );
	}, 
	afterEnter() {},
};

export default TransitionDefault;
