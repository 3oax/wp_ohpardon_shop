import skipLinkFocus from './../skip-link-focus-fix.js';
import Utils from './utils.js';

/* eslint-disable */

const Fixes = {
	init() {
		this.container = jQuery('#site__body').get(0);
		
		skipLinkFocus();

		this.loadPolyfills();
		this.iE.init.call( this );
		this.safari.init.call( this );
		this.firefox.init.call( this );
		this.chrome.init.call( this );
		this.iOS.init.call( this );
		this.android.init.call( this );
		this.mac.init.call( this );
		this.win.init.call( this );
	},

	reInit(container){
		this.container = container;

		this.updatePolyfills();
		this.iE.reInit.call( this );
		this.safari.reInit.call( this );
		this.firefox.reInit.call( this );
		this.chrome.reInit.call( this );
		this.iOS.reInit.call( this );
		this.android.reInit.call( this );
		this.mac.reInit.call( this );
		this.win.reInit.call( this );
	},

	loadPolyfills() {
		const self = this;

		this.polyfills = {
			csspositionsticky: false,
			objectfit: false
		};

		Modernizr.on( 'csspositionsticky', ( result ) => {
			if ( ! result ) {
				const stickyfillpolyfill = Utils.loadScript( 'https://cdnjs.cloudflare.com/ajax/libs/stickyfill/2.0.3/stickyfill.min.js' );

				self.polyfills.csspositionsticky = 'loading';

				stickyfillpolyfill.then( () => {
					self.polyfills.csspositionsticky = true;
					const elements = document.querySelectorAll( '.sticky' );
					Stickyfill.add( elements );
				} );
			}
		} );

		Modernizr.on( 'objectfit', ( result ) => {
			if ( ! result ){
				const objectfitpolyfill = Utils.loadScript( 'https://cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.3/ofi.min.js' );

				self.polyfills.objectfit = 'loading';

				objectfitpolyfill.then( () => {
					self.polyfills.objectfit = true;
					objectFitImages( 'img.object-fit-cover, img.object-cover' );
				} );
			}
		} );
	},

	updatePolyfills(){
		if(this.polyfills.objectfit === true){
			objectFitImages( 'img.object-fit-cover, img.object-cover' );
		}

		if(this.polyfills.csspositionsticky === true){
			const elements = this.container.querySelectorAll( '.sticky' );
			Stickyfill.add( elements );
		}
	},

	iE: {
		is(){
	    var ua = window.navigator.userAgent;
	
	    var msie = ua.indexOf('MSIE ');
	    if (msie > 0) {
	        // IE 10 or older => return version number
	        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	    }
	
	    var trident = ua.indexOf('Trident/');
	    if (trident > 0) {
	        // IE 11 => return version number
	        var rv = ua.indexOf('rv:');
	        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	    }
	
	    var edge = ua.indexOf('Edge/');
	    if (edge > 0) {
	       // Edge (IE 12+) => return version number
	       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	    }
	
	    // other browser
	    return false;
		},
		init(){
			if(this.iE.is() !== false){
				jQuery('html')
					.addClass('is-ie')
					.addClass('is-ie--' + this.iE.is());

				this.fixSVGInline(this.container);
			}
		},
		reInit(){
			if(this.iE.is() !== false){
				this.fixSVGInline(this.container);
			}
		}
	},
  
	safari: {
		is(){
			return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		},
		init(){
			if ( this.safari.is() !== false ){
				$('html').addClass('is-safari');
				
				this.fixViewportFontSize(this.container);
			}
		},
		reInit(){

		}
	},
  
	firefox: {
		is(){
			return !!navigator.userAgent.match(/firefox/i);
		},
		init(){
			if(this.firefox.is() !== false){
				$('html').addClass('is-firefox');
			}
		},
		reInit(){
			if(this.firefox.is() !== false){
				
			}			
		}
	},
  
	chrome: {
		is(){
			return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		},
		init(){
			if(this.chrome.is() !== false){
				$('html').addClass('is-chrome');
			}
		},
		reInit(){
			if(this.chrome.is() !== false){
				
			}			
		}
	},
  
	iOS: {
		is(){
			return [
				'iPad Simulator',
				'iPhone Simulator',
				'iPod Simulator',
				'iPad',
				'iPhone',
				'iPod'
			].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
		},
		init(){
			if ( this.iOS.is() !== false ){

				$('html').addClass('is-ios');
				this.fixVideoLoading( this.container );

				if(this.safari.is()){
					this.fixViewportHeightUnit();
				}
				
			}
		},
		reInit(){
			if ( this.iOS.is() !== false ){
				this.fixVideoLoading( this.container );
			}
		}
	},
  
	android: {
		is(){
			return navigator.userAgent.toLowerCase().indexOf("android") > -1;
		},
		init(){
			if( this.android.is() ){
				$('html').addClass('is-android');
			}
		},
		reInit(){}
	},
  
	mac: {
		is(){
			return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
		},
		init(){
			if( this.mac.is() ){
				$('html').addClass('is-mac');
			}			
		},
		reInit(){}
	},
  
	win: {
		is(){
			return navigator.platform.indexOf('Win') > -1;
		},
		init(){
			if(this.win.is()){
				$('html').addClass('is-windows');
			}
		},
		reInit(){}
	},

	fixSVGUrl(container, url){
		const selector_string = 'svg [mask^="url("], svg [fill^="url("], svg [clip-path^="url("]';		
		var url = url || location.href;
		let currentPath, currentHash;

		jQuery(container).find(selector_string).each(function(){
			
			var $item = jQuery(this);
			
			if($item.get(0).hasAttribute('mask')){
				currentPath = $item.attr('mask').replace('url(','').replace(')','').replace(/\"/gi, "");			
				currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
				$item.attr('mask', 'url('+ url +'#'+ currentHash +')');						
			} else if($item.get(0).hasAttribute('clip-path')){
				currentPath = $item.attr('clip-path').replace('url(','').replace(')','').replace(/\"/gi, "");			
				currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
				$item.attr('clip-path', 'url('+ url +'#'+ currentHash +')');							
			} else if($item.get(0).hasAttribute('fill')){
				currentPath = $item.attr('fill').replace('url(','').replace(')','').replace(/\"/gi, "");			
				currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
				$item.attr('fill', 'url('+ url +'#'+ currentHash +')');						
			}
			
		});
	},

	fixSVGInline( container ){
		jQuery( container ).find( 'svg:not(.injected-svg):not(.js--svg-inject)' ).each( function(i, el){
			const svg = el,
				$svg = jQuery(svg);

			if(svg.hasAttribute('viewbox')){
				jQuery( svg ).wrap( '<div class="o-svg-wrap relative"></div>' );
				jQuery( svg ).attr( 'width', '100%' );
				jQuery( svg ).css( {
					position: 'absolute',
					top: 0,
					left: 0
				} );				

				var viewBox = svg.getAttribute( 'viewBox' );

				if(Utils.isset(viewBox)){
					viewBox = viewBox.replace( /\s\s+/g, ' ' );
					var w = viewBox.split( ' ' )[2];
					var h = viewBox.split( ' ' )[3];
					var x = h / w * 100;
					svg.parentNode.setAttribute( 'style', `padding-bottom:${x}%;` );
				}
				
			}
		} );
	},

	fixViewportFontSize(container){
		$( container ).hide();
		setTimeout( () => {
			$( container ).show();			
		}, 10 );		
	},

	fixVideoLoading( container ){
		const $videos = $( container ).find('video:not(.video-js):not(.vjs-tech)');
		if($videos.length){
			$videos.each((i, vid) => {
				const playPromise = vid.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {
						// Automatic playback started!
						// Show playing UI.
						// We can now safely pause video...
						// .. if it has no autoplay attr
						if( ! Utils.isset($(vid).attr('autoplay')) ) vid.pause();
					})
					.catch(error => {
						// Auto-play was prevented
						// Show paused UI.
					});
				}			
			});
		}
	},

	fixViewportHeightUnit(){
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});		
	}
	
};

if ( Utils.isset( window.OAX ) && ! window.OAX.hasOwnProperty( 'Fixes' ) ){
	window.OAX.Fixes = Fixes;
}

export default Fixes;
