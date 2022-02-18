/**
 * Load Modernizr
 */
import Modernizr from 'modernizr'; window.Modernizr = Modernizr;

if ( OAX.config.is_preloader === 'Y' ) {
	OAX.preloader_bar.go( 20 );
}

/**
 * Load Lazyload
 */
require( '../lib/lazysizes.js' );

if ( OAX.config.is_preloader === 'Y' ) {
	OAX.preloader_bar.go( 30 );
}

import barba from '@barba/core'; window.barba = barba;

/**
 * Import jQuery related scripts
 */
// require( 'is-in-viewport' );

/**
 * Import Smooth Scroll
 */
// import Scrollbar from 'smooth-scrollbar'; window.Scrollbar = Scrollbar;

/**
 * Paper.js
 */
// import paper from 'paper/dist/paper-full.js'; window.paper = paper;

/**
 * Load GSAP & Plugins
 */
import { gsap } from 'gsap'; window.gsap = gsap;
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'; window.ScrollTrigger = ScrollTrigger;
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; window.ScrollToPlugin = ScrollToPlugin;
import { SplitText } from 'gsap/SplitText.js'; window.SplitText = SplitText;
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin.js'; window.DrawSVGPlugin = DrawSVGPlugin;
gsap.defaults( {
	ease: 'power2.inOut', 
	duration: 1
} );
gsap.registerPlugin( SplitText );
gsap.registerPlugin( ScrollTrigger );
gsap.registerPlugin( ScrollToPlugin );
gsap.registerPlugin( DrawSVGPlugin );

if ( OAX.config.is_preloader === 'Y' ) {
	OAX.preloader_bar.go( 40 );
}

/**
 * Load Lightgallery
 */
// require( '../lib/lightgallery/dist/js/lightgallery.js' );

/**
 * Particles JS
 */
// require( 'particles.js/particles.js' );

/**
 * Load Instafeed
 */
// require( '../lib/jquery.instagramFeed.js' );

/**
 * Load Slick Slider
 */
// require( 'slick-carousel/slick/slick.js' );

/**
 * Load Swiper
 */
require( '../lib/swiper-bundle.min.js' );

/**
 * Load SVGInjector
 */
// import SVGInjector from 'svg-injector-2'; window.SVGInjector = SVGInjector;

/**
 * Load Plyr
 */
/*
 * import Plyr from 'plyr'; window.Plyr = Plyr;
 * require( '../lib/plyr.polyfilled.js' );
 */

if ( OAX.config.is_preloader === 'Y' ) {
	OAX.preloader_bar.go( 50 ); 
}
