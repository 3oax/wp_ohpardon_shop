/* eslint one-var: [0]*/

import Utils from '../utils/utils.js';
import Api from '../utils/api.js';

const api = new Api();

export default class Search {
	init(){
		this.appendSearchResultOverlay();
		this.initEvents();
	}

	initEvents(){
		const self = this;
		
		this.$searchForm = jQuery( '.site__search .search-form' );
		this.$searchField = jQuery( '.site__search .search-field' );
		
		jQuery( document ).on( 'click.oax::search-toggle', '.js--search-toggle', ( event ) => {
			const $target = jQuery( event.target ).is( 'button' ) ? jQuery( event.target ) : jQuery( event.target ).closest( 'button' ),
				$searchForm = $target.parent().find( '.search-form' );
    
			$searchForm.on( Utils.onTransitionEnd(), () => {
				self.$searchField.focus();
			} );
			$searchForm.addClass( 'is-open' );
      
			event.preventDefault();
		} );
    
		jQuery( document ).on( 'focus.oax::search-form', self.$searchField.selector, jQuery.proxy( this.openSearch, this ) );
		
		document.addEventListener( 'hidekeyboard', () => {
			console.log( 'dsa' );
		}, false );

		jQuery( document ).on( 'blur.oax::search-form', self.$searchField.selector, jQuery.proxy( this.closeSearch, this ) );
    
		jQuery( document ).on( 'submit.oax::search-form', self.$searchForm.selector, ( event ) => {
			const $form = jQuery( event.target );
			
			if ( $form.find( '.search-field' ).val() !== '' ){
				Utils.progressBar( 'start' );

				api.getSearchResults( $form.find( '.search-field' ).val() ).then( ( results ) => {
					Utils.progressBar( 'stop' );

					if ( results !== false ){
						self.showResults( results );
					} else {
						self.showNoResults();
					}
				} );
			}

			event.preventDefault();
		} );    
	}

	openSearch( event ){
		const self = this,
			$target = typeof event !== 'undefined' ? jQuery( event.target ) : self.$searchField,
			$form = $target.closest( 'form' );
	
		$form.addClass( 'is-open' );
	}

	closeSearch( event ){
		const self = this,
			$target = typeof event !== 'undefined' ? jQuery( event.target ) : self.$searchField,
			$form = $target.closest( 'form' );
	
		$form.removeClass( 'is-open' );
		this.clearSearch();
	}

	clearSearch(){
		this.$searchField.val( '' );
	}

	appendSearchResultOverlay(){
		const resultContainer = jQuery( '<div class="c-search-results pin-t pin-l fixed w-screen h-screen bg-theme-base text-white z-overlay hidden"></div>' ),
			resultInner = jQuery( '<div class="c-search-results__inner pt-2 md:pt-5 pl-2 md:pl-5 min-h-screen"></div>' ),
			resultInnerRow = jQuery( '<div class="c-search-results__row clearfix"></div>' ),
			resultScrollContainer = jQuery( '<div class="c-search-results__scroll-container w-full h-full overflow-scroll"></div>' ),
			resultContainerClose = jQuery( '<button href="javascript:void(0)" class="c-btn-size absolute pin-r pin-t no-underline bg-white text-black hover:text-black">X</button>' ),
			resultEventsContainer = jQuery( '<div class="c-search-results__col c-search-results__col--events md:w-1/2 md:float-left md:pr-2"></div>' ),
			resultPagesContainer = jQuery( '<div class="c-search-results__col c-search-results__col--pages md:w-1/2 md:float-left md:pl-2"></div>' ),
			resultPostsContainer = jQuery( '<div class="c-search-results__col c-search-results__col--posts"></div>' );
		
		resultInnerRow.append( resultEventsContainer );
		resultInnerRow.append( resultPagesContainer );
		resultInner.append( resultInnerRow );
		resultScrollContainer.append( resultInner );
		resultContainer.append( resultContainerClose );
		resultContainer.append( resultScrollContainer );
		
		resultContainerClose.on( 'click.oax::close-search-results', jQuery.proxy( this.hideResults, this ) );

		jQuery( 'body' ).append( resultContainer );

		this.resultContainer = resultContainer;
		this.resultInner = resultInner;
		this.resultInnerRow = resultInnerRow;		
		this.resultEventsContainer = resultEventsContainer;
		this.resultPostsContainer = resultPostsContainer;
		this.resultPagesContainer = resultPagesContainer;
		this.resultScrollContainer = resultScrollContainer;
	}
  
	showResults( resultObj ){
		const self = this;

		const _months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
		const _days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

		this.resultEventsContainer.empty();		
		this.resultEventsContainer.append( '<h2>Veranstaltungen:</h2>' );

		if ( resultObj.events.length ){
			const eventsList = jQuery( '<ul class="list-reset m-0"></ul>' );		
			resultObj.events.forEach( ( el ) => {
				const dateTimeRaw = jQuery( el.content.rendered ).find( '.c-event-single__aside' ).find( '[itemprop="startDate"]' ).attr( 'content' );
				const dateStr = dateTimeRaw.split( 'T' )[0];
				const dateObj = new Date( dateStr );
				const listEl = `<li><a href="${el.link}">${el.title.rendered}</a> (${dateObj.getDate()} ${_months[dateObj.getMonth()]})</li>`;
				eventsList.append( listEl );
			} );
			this.resultEventsContainer.append( eventsList );
		} else {
			this.resultPagesContainer.append( '<p>Keine Veranstaltungen gefunden.</p>' );
		}

		this.resultPagesContainer.empty();
		this.resultPagesContainer.append( '<h2>Seiten:</h2>' );

		if ( resultObj.pages.length ){
			const pagesList = jQuery( '<ul class="list-reset m-0"></ul>' );		
			resultObj.pages.forEach( ( el ) => {
				const pageEl = `<li><a href="${el.link}">${el.title.rendered}</a></li>`;
				pagesList.append( pageEl );
			} );
			this.resultPagesContainer.append( pagesList );
		} else {
			this.resultPagesContainer.append( '<p>Keine Seiten gefunden.</p>' );
		}

		this.resultContainer.one( 'click.oax::link-search-results', 'a[href]', jQuery.proxy( this.hideResults, this ) );

		this.resultContainer.removeClass( 'hidden' );
		setTimeout( () => {
			self.resultContainer.addClass( 'is-open' );
		}, 100 );
	}

	hideResults(){
		const self = this;
		this.resultContainer.one( Utils.onTransitionEnd(), () => {
			self.resultContainer.addClass( 'hidden' );
		} );
		this.resultContainer.removeClass( 'is-open' );
	}
  
	showNoResults(){
		alert( ' Keine Ergebnisse gefunden. ' );
	}
}
