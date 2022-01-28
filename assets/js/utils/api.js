export default class Api {
	constructor( settings ){
		const defaults = {
			url_api: `${OAX.config.url_api}wp/v2/`,
			url_acf: `${OAX.config.url_api}acf/v3/`,
			url_search: `${OAX.config.url_api}swp_api/`,
			url_oax: `${OAX.config.url_api}oax/v1/`,
			path_pages: 'pages',
			path_posts: 'posts'
		};
		this.options = Object.assign( defaults, settings );
	}

	getTemplatePart( template ){
		return fetch( `${this.options.url_oax}templatepart/${template}` )
			.then( ( response ) => response.json() )
			.catch( ( error ) => false );		
	}	

	getSearchResults( value ){
		const urls = [
			this.options.path_pages,
			this.options.path_posts
		];

		return Promise.all( urls.map( ( url ) => 
			fetch( `${this.options.url_api}${url}?search=${value}` )
				.then( ( response ) => response.json() )
				.catch( ( error ) => false ) ) )
			.then( ( result ) => {
				const hasResults = false,
					hasNoResults = ( obj ) => obj.length === 0;
        
				/*
				 * result[0] => pages
				 * result[1] => posts
				 */
				const resultObj = { // eslint-disable-line
					pages: result[0],
					posts: result[1]
				};
        
				if ( result.every( hasNoResults ) ) {
					return false;
				}
 
				return resultObj;
			} );    
	}

	loadPageTypeEvent( event ){
		const $target = jQuery( event.target ).is( '[data-load-event]' ) ? jQuery( event.target ) : jQuery( event.target ).closest( ' [data-load-event] ' ),
			eventId = $target.data( 'loadEvent' ),
			href = $target.attr( 'href' );

		Utils.progressBar( 'start' );

		fetch( `${this.options.url_api}${this.options.path_events}/${eventId}` )
			.then( ( response ) => response.json() )
			.then( ( result ) => {
				const $eventOverlay = jQuery( '<div>' ).append( result.content.rendered );

				Utils.progressBar( 'stop' );
				Utils.scrollLock( true );

				window.history.pushState( null, null, href );
				Barba.HistoryManager.add(
					href,
					'event'
				);
				Barba.Dispatcher.trigger( 'initStateChange', Barba.HistoryManager.currentStatus() );

				TweenMax.set( $eventOverlay, {
					position: 'fixed',
					top: 0,
					left: 0,
					height: '100vh',
					overflow: 'scroll',
					width: '100vw',
					x: '100%',
					zIndex: 999999
				} );

				$eventOverlay.appendTo( 'body' );

				onNewContainerLoaded( $eventOverlay );

				TweenMax.to( $eventOverlay, 0.5, {
					x: '0%',
					ease: Power2.easeOut,
					onComplete(){
						const $backBtn = $eventOverlay.find( '.c-page-back-btn' );
						$backBtn.attr( 'onclick', '' );
            
						$eventOverlay.one( 'click.oax::close-event', '.c-page-back-btn', ( e ) => {
							window.history.go( -1 );

							TweenMax.to( $eventOverlay, 0.5, {
								x: '100%',
								ease: Power2.easeOut,
								onComplete(){
									$eventOverlay.remove();
									Utils.scrollLock( false );
								}
							} );
							e.preventDefault();
						} );
					}
				} );
			} );

		event.preventDefault();	    
	}
}
