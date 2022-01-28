/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Utils from '../utils';
import Fixes from '../fixes.js';

const AnimationEvent = {
	enter( args ){
		const $headline = $( args.newContainer ).find( '.v-event__header .entry-title' );
		const $date = $headline.find( ' + div' );
		const $price = $( args.newContainer ).find( '.v-event__price' );
		const $content = $( args.newContainer ).find( '.tribe_events' );
		const tl = gsap.timeline( {
			defaults: {
				duration: 0.75
			},
			paused: true
		} );
		const tweenSplit = new SplitText( $headline, {
			type: 'lines,words,chars',
			linesClass: 'overflow-hidden js--text-split--line',
			wordsClass: 'overflow-hidden js--text-split--word',      
		} );

		tl.from( Fixes.safari.is() ? tweenSplit.chars : tweenSplit.words, {
			yPercent: 100,
			stagger: Fixes.safari.is() ? 0.02 : 0.1
		} );

		tl.addLabel( 'wordsDone' );

		tl.from( $date, {
			y: 20,
			opacity: 0
		}, 'wordsDone-=0.6' );
		tl.from( $price, {
			y: 20,
			opacity: 0
		}, 'wordsDone-=0.4' );	
		tl.from( $content, {
			y: 30,
			opacity: 0			
		}, 'wordsDone-=0.2' );

		return tl;
	},

	initViewportFx( container ){

	},
};

export default AnimationEvent;
