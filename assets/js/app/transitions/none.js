/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Utils from '../utils';

const TransitionNone = {
	name: 'none',
	leave( data ) {
		const self = TransitionNone;
		const done = this.async();

		if ( Utils.isset( data.next.container ) ){
			gsap.set( data.next.container, {
				display: 'none'
			} );
		}
		if ( Utils.isset( data.next.namespace ) ){
			Utils.scrollTo( 0, 0, true );
		}

		done();
	},
	enter( data ) {
		const self = TransitionNone;
		const done = this.async();
		if ( Utils.isset( data.next.container ) ){
			gsap.set( data.next.container, {
				display: 'block'
			} );
		}    
		done();
	}
};

export default TransitionNone;
