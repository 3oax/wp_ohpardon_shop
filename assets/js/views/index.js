/* eslint one-var: [0] */

import ViewHome from './home.js';
import Animations from '../app/animations.js';
import ViewportAnimations from '../components/viewportAnimations.js';

const vA = new ViewportAnimations();
const Views = {
	getAll(){
		return [
			ViewHome,
		];
	},

	beforeAppearAll( data ){
		// console.log( 'beforeAppearAll', data ); 
	},

	afterAppearAll( data ){
		// console.log( 'afterAppearAll', data ); 
	},

	beforeLeaveAll( data ){
		// console.log( 'beforeLeaveAll', data ); 
	},

	onLeaveAll( data ){

	},	

	afterLeaveAll( data ){
		// console.log( 'afterLeaveAll', data ); 
	},

	beforeEnterAll( data ){
		const namespace = data.next.namespace;
		
		if ( data.trigger === 'barba' ){
			if ( Animations.hasAnimation( namespace, 'initViewportFx' ) ){
				setTimeout( () => {
					Animations[namespace].initViewportFx( data.next.container );	
				}, 300 );
			}	
		}
		
		// console.log( 'beforeEnterAll', data ); 
	},

	onEnterAll( data ){
		const namespace = data.next.namespace;

		if ( Animations.hasAnimation( namespace, 'initViewportFx' ) ){
			setTimeout( () => {
				Animations[namespace].initViewportFx( data.next.container );	
			}, 300 );			
		}	
		
		/**
		 * Viewport Animations
		 */
		setTimeout( () => {
			vA.reInit( data.next.container );		
		}, 450 );	

		if ( Animations.hasAnimation( namespace, 'enter' ) ){
			setTimeout( () => {
				Animations[namespace].enter( { newContainer: data.next.container } );
			}, 500 );
		}

		return true;
	},

	afterEnterAll( data ){
		// console.log( 'afterEnterAll', data ); 
	},
};

export default Views;
