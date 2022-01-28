/* eslint new-cap: [0] */
/* eslint one-var: [0] */
/* eslint require-jsdoc: [0] */
/* eslint no-use-before-define: [0] */
/* eslint brace-style: [0] */

jQuery.scrollLock = ( function scrollLockClosure() {
	var $html = jQuery( 'html' ),
		// State: unlocked by default
		locked = false,
		// State: scroll to revert to
		prevScroll = {
			scrollLeft: jQuery( window ).scrollLeft(),
			scrollTop: jQuery( window ).scrollTop()
		},
		// State: styles to revert to
		prevStyles = {},
		lockStyles = {
			'overflow-y': 'scroll',
			position: 'fixed',
			width: '100%'
		};

	// Instantiate cache in case someone tries to unlock before locking
	saveStyles();

	// Save context's inline styles in cache
	function saveStyles() {
		var styleAttr = $html.attr( 'style' ),
			styleStrs = [],
			styleHash = {};

		if ( ! styleAttr ){
			return;
		}

		styleStrs = styleAttr.split( /;\s/ );

		jQuery.each( styleStrs, ( styleString ) => {
			if ( ! styleString ) {
				return;
			}

			var keyValue = styleString.split( /\s:\s/ );

			if ( keyValue.length < 2 ) {
				return;
			}

			styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
		} );

		jQuery.extend( prevStyles, styleHash );
	}

	function lock() {
		var appliedLock = {};

		// Duplicate execution will break DOM statefulness
		if ( locked ) {
			return;
		}

		// Save scroll state...
		prevScroll = {
			scrollLeft: jQuery( window ).scrollLeft(),
			scrollTop: jQuery( window ).scrollTop()
		};

		// ...and styles
		saveStyles();

		// Compose our applied CSS
		jQuery.extend( appliedLock, lockStyles, {
			// And apply scroll state as styles
			left: `${-prevScroll.scrollLeft}px`,
			top: `${-prevScroll.scrollTop}px`
		} );

		// Then lock styles...
		$html.css( appliedLock );

		// ...and scroll state
		jQuery( window )
			.scrollLeft( 0 )
			.scrollTop( 0 );

		locked = true;
	}

	function unlock() {
		// Duplicate execution will break DOM statefulness
		if ( ! locked ) {
			return;
		}

		// Revert styles
		$html.attr( 'style', jQuery( '<x>' ).css( prevStyles ).attr( 'style' ) || '' );

		// Revert scroll values
		jQuery( window )
			.scrollLeft( prevScroll.scrollLeft )
			.scrollTop( prevScroll.scrollTop );

		locked = false;
	}

	return function scrollLock( on ) {
		// If an argument is passed, lock or unlock depending on truthiness
		if ( arguments.length ) {
			if ( on ) {
				lock();
			} else {
				unlock();
			}
		}
		// Otherwise, toggle
		else if ( locked ){
			unlock();
		} else {
			lock();
		}
	};
}() );
