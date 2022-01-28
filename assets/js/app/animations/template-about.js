/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Utils from '../utils';
import Fixes from '../fixes';

const AnimationTemplateAbout = {
	enter( args ){
		// console.log(args);
	},

	initViewportFx( container ){
		// this.initDrawSVGHaus( container );
	},

	initDrawSVGHaus( container ){
		const $section = $( container ).find( '.v-about__history' );
		const $trigger = $section.find( '.v-about__history-img-top' );
		const $svg = $section.find( '.v-about__history-svg' );
		const animation = gsap.fromTo( $svg.find( 'path' ), {
			drawSVG: '0%',
			duration: 10
		}, {
			drawSVG: '100%',
			duration: 10
		} );
		ScrollTrigger.create( {
			trigger: $trigger[0],
			start: 'top bottom',
			toggleActions: 'play none none reverse',
			animation
		} );	
	}
};

export default AnimationTemplateAbout;
