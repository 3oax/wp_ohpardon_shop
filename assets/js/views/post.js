/* eslint one-var: [0]*/
/* eslint max-len: [0]*/
/* eslint max-lines: [0]*/
/* eslint max-params: [0]*/
/* eslint complexity: [0]*/
/* eslint no-multi-assign: [0]*/
/* eslint prefer-const: [0]*/
/* eslint consistent-return: [0] */

import Modernizr from 'modernizr';
import Barba from 'barba.js';
import Utils from '../utils/utils.js';
import Api from '../utils/api.js';

const api = new Api();

export default Barba.BaseView.extend( {
	namespace: 'post',
	onEnter() {
		// The new Container is ready and attached to the DOM.
		this.isSinglePost = $( this.container ).find( '.entry-content--single' ).length !== 0;
	},

	onEnterCompleted() {
		// The Transition has just finished.
		const self = this;

		if ( self.isSinglePost ){
			self.initCodepen();
		}
		setTimeout( () => {
			self.initReadingProgressbar();
		}, 1 );
	},

	onLeave() {
		// A new Transition toward a new page has just started.
		this.removeReadingProgressbar();
	},

	onLeaveCompleted() {
		// The Container has just been removed from the DOM.
	},

	initCodepen(){
		$( this.container ).find( '.c-embed-codepen' ).each( ( i, el ) => {
			if ( ! $( el ).find( '.cp_embed_wrapper' ).length ) {
				$.getScript( $( el ).find( 'script' ).attr( 'src' ) ); 
			}
		} );
	},

	initReadingProgressbar(){
		const $bar = $( '<div class="c-reading-progress"></div>' );
		const $barInner = $( '<div class="c-reading-progress__inner"></div>' );

		if ( this.isSinglePost ){
			if ( $( '.c-reading-progress' ).length > 0 ){
				$( '.c-reading-progress' ).remove();
			} 

			TweenMax.set( $bar, {
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '1rem',
				zIndex: 99999
			} );

			TweenMax.set( $barInner, {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '0%',
				height: '0.25rem'
			} );  

			$bar.append( $barInner );
			$( 'body' ).append( $bar );
			this.readingProgressBar = $bar;

			if ( Utils.isset( OAX.Scrollbar ) ){
				OAX.Scrollbar.addListener( $.proxy( this.readingProgressbarOnScroll, this ) );
			} else {
				$( window ).on( 'scroll.oax::reading-progress', $.proxy( this.readingProgressbarOnScroll, this ) );
			}
		}
	},
  
	readingProgressbarOnScroll( status ){
		const self = this;
		let width = '0%';
		const correction = 1000;
		const minusHeight = $( '#site__footer' ).height() + $( 'form.wpcf7' ).height() + $( 'article.post footer' ).height() + correction;	
		
		if ( Utils.isset( OAX.Scrollbar ) ){
			width = `${status.offset.y / ( status.limit.y - minusHeight ) * 100}%`;
		} else {
			width = `${$( document ).scrollTop() / ( $( document ).height() - minusHeight ) * 100}%`;
		}		

		TweenMax.set( self.readingProgressBar.find( '> div' ), {
			width
		} );
	},
  
	removeReadingProgressbar(){
		if ( $( '.c-reading-progress' ).length !== 0 ){
			$( '.c-reading-progress' ).remove();
			if ( Utils.isset( OAX.Scrollbar ) ){
				OAX.Scrollbar.removeListener( $.proxy( this.readingProgressbarOnScroll, this ) );
			} else {
				$( window ).off( 'scroll.oax::reading-progress', $.proxy( this.readingProgressbarOnScroll, this ) );
			}
		}
	}
} );
