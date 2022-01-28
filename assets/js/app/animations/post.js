/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Utils from '../utils';
import Fixes from '../fixes.js';

const AnimationPost = {
	enter( args ){
		const $headline = $( args.newContainer ).find( '.v-post__header .entry-title' );
		const $tags = $( args.newContainer ).find( '.v-post__tags > li' );
		const $meta = $( args.newContainer ).find( '.v-post__meta' );
		const $content = $( args.newContainer ).find( '.v-post__content' );
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

		$meta.addClass( 'overflow-hidden' );

		tl.from( Fixes.safari.is() ? tweenSplit.chars : tweenSplit.words, {
			yPercent: Fixes.chrome.is() ? 100 : 101,
			stagger: Fixes.safari.is() ? 0.02 : 0.1
		} );
		
		tl.addLabel( 'wordsDone' );

		tl.from( $meta.find( '> *' ), {
			yPercent: 100,
			stagger: 0.1,
		}, 'wordsDone-=0.6' );

		if ( $tags.length ){
			tl.from( $tags, {
				yPercent: 15,
				opacity: 0,
				stagger: 0.1
			}, 'wordsDone-=0.6' );
		}

		tl.from( $content, {
			y: 30,
			opacity: 0			
		}, 'wordsDone-=0.4' );		

		return tl;
	},

	initViewportFx( container ){
		this.viewportHeadline( container );
		/*
		 * this.viewportEntryTitle( {
		 * newContainer: container
		 * } );
		 */
	},

	viewportEntryTitle( args ){
		const $headline = $( args.newContainer ).find( '.v-post__header .entry-title' );
		const $tags = $( args.newContainer ).find( '.v-post__tags > li' );
		const $meta = $( args.newContainer ).find( '.v-post__meta' );
		const $content = $( args.newContainer ).find( '.v-post__content' );
		const tl = gsap.timeline( {
			defaults: {
				duration: 0.75
			},
			scrollTrigger: {
				trigger: $headline,
				toggleActions: 'play none none reverse',
				start: 'top bottom-=20%'
			}			
		} );
		const tweenSplit = new SplitText( $headline, {
			type: 'lines,words,chars',
			linesClass: 'overflow-hidden js--text-split--lines',
			wordsClass: 'overflow-hidden js--text-split--words',      
		} );

		$meta.addClass( 'overflow-hidden' );

		tl.from( tweenSplit.words, {
			yPercent: 100,
			stagger: 0.1
		} );
		
		tl.addLabel( 'wordsDone' );

		tl.from( $meta.find( '> *' ), {
			yPercent: 100,
			stagger: 0.1,
		}, 'wordsDone-=0.6' );

		if ( $tags.length ){
			tl.from( $tags, {
				yPercent: 15,
				opacity: 0,
				stagger: 0.1
			}, 'wordsDone-=0.6' );
		}

		return tl;
	},

	viewportHeadline( container ){
		const $headlines = $( container ).find( '.v-post__heading' );
		const duration = 0.5;

		if ( $headlines.length > 0 ){
			$headlines.each( ( i, el ) => {
				const $el = $( el );
				const tl = gsap.timeline( {
					defaults: {
						duration
					},
					scrollTrigger: {
						trigger: $el,
						toggleActions: 'play none none reverse',
						start: 'top bottom-=20%'
					}
				} );
				tl.from( $el.find( 'mask:nth-of-type(3)' ).find( '> g' ), {
					x: 0,
					scaleX: 0,
					transformOrigin: '0% 50%' 
				} ).from( $el.find( 'mask:nth-of-type(2)' ).find( '> g' ), {
					x: '100%',
					scaleX: 0,
					transformOrigin: '100% 50%' 
				}, '-=0.2' ).from( $el.find( 'mask:nth-of-type(1)' ).find( '> g' ), {
					x: 0,
					scaleX: 0,
					transformOrigin: '0% 50%' 
				}, '-=0.2' );
			} );	
		}
	}
};

export default AnimationPost;
