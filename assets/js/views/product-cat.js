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

const ViewProductCat = {
	namespace: 'product-cat',
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
		this.initFilter(data.next.container);
	},
	afterEnter( data ){
		// console.log( this.namespace, 'afterEnter', data );	
	},
	addEventListener( container ){
		const self = this;
	},
	initFilter(container){
		const $filters = $(container).find('.yith-wcan-filter');
		if($filters.length && !$filters.find('.yith-wcan-dropdown').length){
			$(document).trigger('yith_wcan_init_shortcodes');
			if(Utils.isset(yith_wcan_shortcodes)){
				yith_wcan_shortcodes.base_url = location.href;
			}
		}
	}
};

export default ViewProductCat;
