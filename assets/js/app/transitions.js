/*
 * import TransitionFilter from './transitions/filter';
 */
import TransitionDefault from './transitions/default';
import TransitionNone from './transitions/none';

const Transitions = {
	getAll(){
		return [
			TransitionNone,
			/* TransitionFilter */
		];
	}
};

export default Transitions;
