/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint max-len: [0] */

import Utils from '../utils';
import Fixes from '../fixes';

const AnimationTemplateStart = {
	enter( args ){
		console.log( args );
	},

	initViewportFx( container ){
		console.log( 'aniamtion', container );
	},
};

export default AnimationTemplateStart;
