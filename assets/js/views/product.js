/* eslint-disable */
/* eslint one-var: [0]*/
/* eslint max-len: [0]*/
/* eslint max-lines: [0]*/
/* eslint max-params: [0]*/
/* eslint complexity: [0]*/
/* eslint no-multi-assign: [0]*/
/* eslint prefer-const: [0]*/
/* eslint consistent-return: [0] */

import Animations from '../app/animations.js';
import Utils from '../app/utils.js';

const ViewProduct = {
	namespace: 'product',
	els: {},
	beforeAppear( data ){
		// console.log( this.namespace, 'beforeAppear', data );
	},
	afterAppear( data ){
		// console.log( this.namespace, 'afterAppear', data );
	},
	beforeLeave( data ){
		// console.log( this.namespace, 'beforeLeave', data );
	},
	afterLeave( data ){
		// console.log( this.namespace, 'afterLeave', data );
	},
	beforeEnter( data ){
		const self = this;
		this.initMainSlider( data.next.container );
		this.initThumbnailSlider( data.next.container );		
	},
	afterEnter( data ){
		// console.log( this.namespace, 'afterEnter', data );	
    this.addEventListener( data.next.container );
	},
	addEventListener( container ){
		const self = this;

	},

	initMainSlider(container){
		
	},
	
	initThumbnailSlider(container){

	}
};

export default ViewProduct;
