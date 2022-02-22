/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Utils from '../utils';

const loaderTimeoutMS = 650;
const $loaderWrapper = $( '<div class="c-transition--timeout-loader"></div>' );
const	$loader = $( OAX.template.loader.html );
gsap.set( $loaderWrapper, {
	position: 'fixed',
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	backgroundColor: 'rgba(255,255,255,0.4)',
	autoAlpha: 0,
	zIndex: 999999999
} );
gsap.set( $loader, {
	position: 'absolute',
	top: '50%',
	left: '50%',
} );
$loaderWrapper.append( $loader );

const TransitionNone = {
	name: 'none',
	
	loaderTimeout: null,

	leave( data ) {
		const self = TransitionNone;
		const done = this.async();

		this.loaderTimeout = setTimeout( () => {			
			self.loaderWrapper = $loaderWrapper;
			$( 'body' ).append( self.loaderWrapper );
			gsap.to( self.loaderWrapper, {
				autoAlpha: 1,
				duration: 0.1
			} );
		}, loaderTimeoutMS );

		if ( Utils.isset( data.next.container ) ){
			gsap.set( data.next.container, {
				display: 'none'
			} );
		}

		done();
	},

	enter( data ) {
		const self = TransitionNone;
		const done = this.async();

		if ( Utils.isset( data.next.container ) ){
			Utils.scrollTo( 0, 0, false );
			
			gsap.set( data.next.container, {
				display: 'block'
			} );

			if ( this.loaderTimeout !== null ){
				clearTimeout( this.loaderTimeout );
				if ( $( '.c-transition--timeout-loader' ).length ){
					gsap.to( $( '.c-transition--timeout-loader' ), {
						autoAlpha: 0,
						duration: 0.2,
						onComplete(){
							$( '.c-transition--timeout-loader' ).remove();
						}
					} );					
				}
			}
		}

		done();
	}
};

export default TransitionNone;
