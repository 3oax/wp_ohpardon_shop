/* eslint one-var: [0]*/
/* eslint max-len: [0]*/
/* eslint max-lines: [0]*/
/* eslint max-params: [0]*/
/* eslint complexity: [0]*/
/* eslint no-multi-assign: [0]*/

import Utils from './utils.js';
import AnimationTemplateStart from './animations/template-start';

const Animations = {
	/**
	 * Start Page
	 */
	'template-start': AnimationTemplateStart,	

	hasAnimation( view, fn, _type ){
		let checkAnimation = false;
		const type = Utils.isset( _type ) ? _type : false; // eslint-disable-line

		if ( Utils.isset( Animations[view] ) && Animations[view].hasOwnProperty( fn ) ){
			checkAnimation = true;
		}

		if ( checkAnimation === true && type !== false ){
			checkAnimation = true;
		}

		return checkAnimation;
	}
};

export default Animations;
