/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Utils from '../utils';

const TransitionFilter = {
	name: 'filter',
	custom: ( { current, next, trigger } ) => trigger.classList && trigger.classList.contains( 'page-numbers' ) && ! $( trigger ).closest( '.c-blog-pagination--ajax' ).length,
	leave( data ) {
		const self = TransitionFilter;
		const done = this.async();
		const $itemsInViewport = $( '.v-blog__news-list-item' );
		const tlHideItems = gsap.timeline( {
			onComplete(){
				if ( Utils.isset( data.next.container ) ){
					gsap.set( data.next.container, {
						display: 'none'
					} );
				}
				if ( Utils.isset( data.next.namespace ) && data.next.namespace !== 'blog' ){
					Utils.scrollTo( 0, 0, true );
				}
				done();
			}
		} );
		
		tlHideItems.to( $itemsInViewport, {
			duration: 0.33,
			y: 15,
			autoAlpha: 0,
			stagger: 0.05
		} );
	},
	enter( data ) {
		const self = TransitionFilter;
		const done = this.async();
		const $itemsInViewport = $( data.next.container ).find( '.v-blog__news-list-item' );

		gsap.set( $itemsInViewport, {
			y: 15,
			autoAlpha: 0,
		} );
		gsap.set( data.next.container, {
			display: 'block'
		} );

		const tlShowItems = gsap.timeline( {
			paused: true,
		} );
		
		tlShowItems.to( $itemsInViewport, {
			duration: 0.33,
			y: 0,
			autoAlpha: 1,
			stagger: 0.05
		} );

		done();

		tlShowItems.play();
	}
};

export default TransitionFilter;
