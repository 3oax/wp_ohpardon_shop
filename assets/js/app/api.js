export default class Api {
	constructor( settings ){
		const defaults = {
			url_api: `${OAX.config.url_api}wp/v2/`,
			url_acf: `${OAX.config.url_api}acf/v3/`,
			url_search: `${OAX.config.url_api}swp_api/`,
			url_oax: `${OAX.config.url_api}oax/v1/`,
			url_ajax: OAX.config.url_ajax,
			path_categories: 'categories',
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

	getPost( id ){
		return fetch( `${this.options.url_api}${this.options.path_posts}/${id}?_embed` )
			.then( ( response ) => response.json() )
			.catch( ( error ) => false );		
	}

	getPostsByCategory( categoryId, page ){
		let fetchUrl = `${this.options.url_api}${this.options.path_posts}?_embed`;
		if ( categoryId !== 0 ){
			fetchUrl += `&categories=${categoryId}`;
		}
		if ( page !== -1 ){
			fetchUrl += `&page=${page}`;
		}

		return fetch( `${fetchUrl}&per_page=4` )
			.then( ( response ) => response.json() )
			.catch( ( error ) => false );			
	}

	getCategory( categoryId ){
		return fetch( `${this.options.url_api}${this.options.path_categories}?include=${categoryId}` )
			.then( ( response ) => response.json() )
			.catch( ( error ) => false );			
	}

	setUserLocation( userlocation ){
		return $.ajax( {
			type: 'POST',
			url: this.options.url_ajax,
			cache: false,
			data: {
				action: 'oax_ajax_set_user_location',
				data: userlocation
			}
		} );
	}

	setUserEventDate( userdate ) {
		return $.ajax( {
			type: 'POST',
			url: this.options.url_ajax,
			cache: false,
			data: {
				action: 'oax_ajax_set_user_event_date',
				data: userdate
			}
		} );		
	}
}
