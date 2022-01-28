/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

import Utils from '../app/utils.js';

export default class Navigation {
	constructor() {
		this.isOffcanvas = false;
		this.container = document.getElementById( 'site__navigation' );
		this.button = this.container.getElementsByTagName( 'button' )[0];
		// this.menu = this.container.getElementsByClassName( 'site__navigation-menu' )[0];
		this.menu = this.container.getElementsByClassName( 'l-navigation-main' )[0];
		this.offcanvas = document.getElementsByClassName( 'site__navigation-offcanvas' )[0];
		
		if ( Utils.isset( this.offcanvas ) ){
			this.container = document.body;
			this.menu = this.offcanvas;
			this.isOffcanvas = true;
		}
	}

	setupNavigation() {
		if ( ! this.container || 'undefined' === typeof this.button ) {
			return;
		}

		// Hide menu toggle button if menu is empty and return early.
		if ( 'undefined' === typeof this.menu ) {
			/*
			 * this.button.style.display = 'none';
			 * return;
			 */
		}

		// Have menu closed by default
		this.menu.setAttribute( 'aria-expanded', 'false' );
		if ( -1 === this.menu.className.indexOf( 'nav-menu' ) ) {
			this.menu.className += ' nav-menu';
		}

		if ( typeof this.offcanvas !== 'undefined' ){
			this.isOffcanvas = true;
			this.offcanvas.setAttribute( 'aria-expanded', 'false' );
		}

		// Toggle mobile navigation
		jQuery( this.button ).on( 'click.oax::navigation-toggle', () => {
			if ( -1 !== this.container.className.indexOf( 'is-open' ) ) {
				this.closeNavigation();
			} else {
				this.openNavigation();
			}	
		} );

		if ( jQuery( '.wpm-language-switcher' ).length ){
			jQuery( '.wpm-language-switcher' ).find( 'a[href]' ).addClass( 'no-barba' );
		}

		this.setupButtonAnimation();
		// this.navAccessibilitySupport();
	}

	/**
	 * Allow keyboard users to use multi-level navigation
	 */
	navAccessibilitySupport() {
	// Get all the link elements within the menu.
		const links = this.menu.getElementsByTagName( 'a' );

		/*
		 * @todo test if this is working
		 * Each time a menu link is focused or blurred, toggle focus.
		 */
		links.forEach( ( link ) => {
			link.addEventListener( 'focus', link.toggleFocus, true );
			link.addEventListener( 'blur', link.toggleFocus, true );
		} );
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	enableTouchFocus() {
		const parentLink = this.container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			const touchStartFn = ( e ) => {
				const menuItem = this.parentNode;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( let i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem !== menuItem.parentNode.children[i] ) {
							menuItem.parentNode.children[i].classList.remove( 'focus' );
						}
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( let i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}

	openNavigation(){
		if ( this.isOffcanvas ){
			// Utils.scrollLock( true );
		}

		$( 'body' ).addClass( 'is-navigation--open' );
		this.container.className += ' is-open';
		this.button.setAttribute( 'aria-expanded', 'true' );
		this.menu.setAttribute( 'aria-expanded', 'true' );
		
		// this.tl.play();	
		
		jQuery( this.menu ).on( 'click.oax::navigation-link-click', 'a', jQuery.proxy( this.closeNavigation, this ) );
	}

	closeNavigation(){
		if ( this.isOffcanvas ){
			// Utils.scrollLock( false );
		}

		$( 'body' ).removeClass( 'is-navigation--open' );
		this.container.className = this.container.className.replace( ' is-open', '' );
		this.button.setAttribute( 'aria-expanded', 'false' );
		this.menu.setAttribute( 'aria-expanded', 'false' );
		
		// this.tl.reverse();

		jQuery( this.menu ).off( 'click.oax::navigation-link-click', 'a', jQuery.proxy( this.closeNavigation, this ) );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	toggleFocus() {
		let self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {
			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	setActiveState() {
		const classActive = 'current-menu-item',
			$links = jQuery( this.menu ).find( ' a[href] ' );

		$links.each( function(){
			let $el = jQuery(this); // eslint-disable-line
			$el.parent( 'li' ).removeClass( classActive ); 
		} );

		$links.filter( function(){
			const $el = jQuery( this ); // eslint-disable-line
			const href = $el.attr( 'href' );
			if ( window.location.href.includes( href ) ){
				return true;
			}

			return false;
		} ).parent().addClass( classActive );
	}

	setupButtonAnimation(){

	}
}

