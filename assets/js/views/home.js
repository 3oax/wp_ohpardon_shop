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

const ViewHome = {
	namespace: 'template-start',
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
		this.addEventListener( data.next.container );
	},
	afterEnter( data ){
		// console.log( this.namespace, 'afterEnter', data );	
	},
	addEventListener( container ){
		const self = this;
	},
};

export default ViewHome;
