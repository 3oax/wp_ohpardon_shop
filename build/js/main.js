/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp_ohpardon/wordpress/wp-content/themes/oax-ohpardon/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@barba/prefetch/dist/barba-prefetch.umd.js":
/*!******************************************************************!*\
  !*** ../node_modules/@barba/prefetch/dist/barba-prefetch.umd.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,i){ true?module.exports=i():undefined}(this,function(){var t="2.1.10",i=window.requestIdleCallback||function(t){var i=Date.now();return setTimeout(function(){t({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-i))}})},1)};return new(function(){function n(){this.name="@barba/prefetch",this.version=t,this.toPrefetch=new Set}var e=n.prototype;return e.install=function(t,i){var n=void 0===i?{}:i,e=n.root,o=void 0===e?document.body:e,r=n.timeout,s=void 0===r?2e3:r;this.logger=new t.Logger(this.name),this.logger.info(this.version),this.barba=t,this.root=o,this.timeout=s},e.init=function(){var t=this;this.barba.prefetchIgnore?this.logger.warn("barba.prefetchIgnore is enabled"):this.barba.cacheIgnore?this.logger.warn("barba.cacheIgnore is enabled"):(this.observer=new IntersectionObserver(function(i){i.forEach(function(i){if(i.isIntersecting){var n=i.target,e=t.barba.dom.getHref(n);t.toPrefetch.has(e)&&(t.observer.unobserve(n),t.barba.cache.has(e)?t.barba.cache.update(e,{action:"prefetch"}):t.barba.cache.set(e,t.barba.request(e,t.barba.timeout,t.barba.onRequestError.bind(t.barba,"barba")).catch(function(i){t.logger.error(i)}),"prefetch"))}})}),this.observe(),this.barba.hooks.after(this.observe,this))},e.observe=function(){var t=this;i(function(){t.root.querySelectorAll("a").forEach(function(i){var n=i,e=t.barba.dom.getHref(n);t.barba.cache.has(e)||t.barba.prevent.checkHref(e)||t.barba.prevent.checkLink(n,{},e)||(t.observer.observe(i),t.toPrefetch.add(e))})},{timeout:this.timeout})},n}())});
//# sourceMappingURL=barba-prefetch.umd.js.map


/***/ }),

/***/ "../node_modules/ev-emitter/ev-emitter.js":
/*!************************************************!*\
  !*** ../node_modules/ev-emitter/ev-emitter.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),

/***/ "../node_modules/headroom.js/dist/headroom.js":
/*!****************************************************!*\
  !*** ../node_modules/headroom.js/dist/headroom.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * headroom.js v0.9.4 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function(root, factory) {
  'use strict';

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  else {}
}(this, function() {
  'use strict';

  /* exported features */
  
  var features = {
    bind : !!(function(){}.bind),
    classList : 'classList' in document.documentElement,
    rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
  };
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  
  /**
   * Handles debouncing of events via requestAnimationFrame
   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
   * @param {Function} callback The callback to handle whichever event
   */
  function Debouncer (callback) {
    this.callback = callback;
    this.ticking = false;
  }
  Debouncer.prototype = {
    constructor : Debouncer,
  
    /**
     * dispatches the event to the supplied callback
     * @private
     */
    update : function() {
      this.callback && this.callback();
      this.ticking = false;
    },
  
    /**
     * ensures events don't get stacked
     * @private
     */
    requestTick : function() {
      if(!this.ticking) {
        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
        this.ticking = true;
      }
    },
  
    /**
     * Attach this as the event listeners
     */
    handleEvent : function() {
      this.requestTick();
    }
  };
  /**
   * Check if object is part of the DOM
   * @constructor
   * @param {Object} obj element to check
   */
  function isDOMElement(obj) {
    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
  }
  
  /**
   * Helper function for extending objects
   */
  function extend (object /*, objectN ... */) {
    if(arguments.length <= 0) {
      throw new Error('Missing arguments in extend function');
    }
  
    var result = object || {},
        key,
        i;
  
    for (i = 1; i < arguments.length; i++) {
      var replacement = arguments[i] || {};
  
      for (key in replacement) {
        // Recurse into object except if the object is a DOM element
        if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
          result[key] = extend(result[key], replacement[key]);
        }
        else {
          result[key] = result[key] || replacement[key];
        }
      }
    }
  
    return result;
  }
  
  /**
   * Helper function for normalizing tolerance option to object format
   */
  function normalizeTolerance (t) {
    return t === Object(t) ? t : { down : t, up : t };
  }
  
  /**
   * UI enhancement for fixed headers.
   * Hides header when scrolling down
   * Shows header when scrolling up
   * @constructor
   * @param {DOMElement} elem the header element
   * @param {Object} options options for the widget
   */
  function Headroom (elem, options) {
    options = extend(options, Headroom.options);
  
    this.lastKnownScrollY = 0;
    this.elem             = elem;
    this.tolerance        = normalizeTolerance(options.tolerance);
    this.classes          = options.classes;
    this.offset           = options.offset;
    this.scroller         = options.scroller;
    this.initialised      = false;
    this.onPin            = options.onPin;
    this.onUnpin          = options.onUnpin;
    this.onTop            = options.onTop;
    this.onNotTop         = options.onNotTop;
    this.onBottom         = options.onBottom;
    this.onNotBottom      = options.onNotBottom;
  }
  Headroom.prototype = {
    constructor : Headroom,
  
    /**
     * Initialises the widget
     */
    init : function() {
      if(!Headroom.cutsTheMustard) {
        return;
      }
  
      this.debouncer = new Debouncer(this.update.bind(this));
      this.elem.classList.add(this.classes.initial);
  
      // defer event registration to handle browser
      // potentially restoring previous scroll position
      setTimeout(this.attachEvent.bind(this), 100);
  
      return this;
    },
  
    /**
     * Unattaches events and removes any classes that were added
     */
    destroy : function() {
      var classes = this.classes;
  
      this.initialised = false;
  
      for (var key in classes) {
        if(classes.hasOwnProperty(key)) {
          this.elem.classList.remove(classes[key]);
        }
      }
  
      this.scroller.removeEventListener('scroll', this.debouncer, false);
    },
  
    /**
     * Attaches the scroll event
     * @private
     */
    attachEvent : function() {
      if(!this.initialised){
        this.lastKnownScrollY = this.getScrollY();
        this.initialised = true;
        this.scroller.addEventListener('scroll', this.debouncer, false);
  
        this.debouncer.handleEvent();
      }
    },
  
    /**
     * Unpins the header if it's currently pinned
     */
    unpin : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
        classList.add(classes.unpinned);
        classList.remove(classes.pinned);
        this.onUnpin && this.onUnpin.call(this);
      }
    },
  
    /**
     * Pins the header if it's currently unpinned
     */
    pin : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(classList.contains(classes.unpinned)) {
        classList.remove(classes.unpinned);
        classList.add(classes.pinned);
        this.onPin && this.onPin.call(this);
      }
    },
  
    /**
     * Handles the top states
     */
    top : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.top)) {
        classList.add(classes.top);
        classList.remove(classes.notTop);
        this.onTop && this.onTop.call(this);
      }
    },
  
    /**
     * Handles the not top state
     */
    notTop : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.notTop)) {
        classList.add(classes.notTop);
        classList.remove(classes.top);
        this.onNotTop && this.onNotTop.call(this);
      }
    },
  
    bottom : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.bottom)) {
        classList.add(classes.bottom);
        classList.remove(classes.notBottom);
        this.onBottom && this.onBottom.call(this);
      }
    },
  
    /**
     * Handles the not top state
     */
    notBottom : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.notBottom)) {
        classList.add(classes.notBottom);
        classList.remove(classes.bottom);
        this.onNotBottom && this.onNotBottom.call(this);
      }
    },
  
    /**
     * Gets the Y scroll position
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
     * @return {Number} pixels the page has scrolled along the Y-axis
     */
    getScrollY : function() {
      return (this.scroller.pageYOffset !== undefined)
        ? this.scroller.pageYOffset
        : (this.scroller.scrollTop !== undefined)
          ? this.scroller.scrollTop
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },
  
    /**
     * Gets the height of the viewport
     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
     * @return {int} the height of the viewport in pixels
     */
    getViewportHeight : function () {
      return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    },
  
    /**
     * Gets the physical height of the DOM element
     * @param  {Object}  elm the element to calculate the physical height of which
     * @return {int}     the physical height of the element in pixels
     */
    getElementPhysicalHeight : function (elm) {
      return Math.max(
        elm.offsetHeight,
        elm.clientHeight
      );
    },
  
    /**
     * Gets the physical height of the scroller element
     * @return {int} the physical height of the scroller element in pixels
     */
    getScrollerPhysicalHeight : function () {
      return (this.scroller === window || this.scroller === document.body)
        ? this.getViewportHeight()
        : this.getElementPhysicalHeight(this.scroller);
    },
  
    /**
     * Gets the height of the document
     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
     * @return {int} the height of the document in pixels
     */
    getDocumentHeight : function () {
      var body = document.body,
        documentElement = document.documentElement;
  
      return Math.max(
        body.scrollHeight, documentElement.scrollHeight,
        body.offsetHeight, documentElement.offsetHeight,
        body.clientHeight, documentElement.clientHeight
      );
    },
  
    /**
     * Gets the height of the DOM element
     * @param  {Object}  elm the element to calculate the height of which
     * @return {int}     the height of the element in pixels
     */
    getElementHeight : function (elm) {
      return Math.max(
        elm.scrollHeight,
        elm.offsetHeight,
        elm.clientHeight
      );
    },
  
    /**
     * Gets the height of the scroller element
     * @return {int} the height of the scroller element in pixels
     */
    getScrollerHeight : function () {
      return (this.scroller === window || this.scroller === document.body)
        ? this.getDocumentHeight()
        : this.getElementHeight(this.scroller);
    },
  
    /**
     * determines if the scroll position is outside of document boundaries
     * @param  {int}  currentScrollY the current y scroll position
     * @return {bool} true if out of bounds, false otherwise
     */
    isOutOfBounds : function (currentScrollY) {
      var pastTop  = currentScrollY < 0,
        pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
  
      return pastTop || pastBottom;
    },
  
    /**
     * determines if the tolerance has been exceeded
     * @param  {int} currentScrollY the current scroll y position
     * @return {bool} true if tolerance exceeded, false otherwise
     */
    toleranceExceeded : function (currentScrollY, direction) {
      return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
    },
  
    /**
     * determine if it is appropriate to unpin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should unpin, false otherwise
     */
    shouldUnpin : function (currentScrollY, toleranceExceeded) {
      var scrollingDown = currentScrollY > this.lastKnownScrollY,
        pastOffset = currentScrollY >= this.offset;
  
      return scrollingDown && pastOffset && toleranceExceeded;
    },
  
    /**
     * determine if it is appropriate to pin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should pin, false otherwise
     */
    shouldPin : function (currentScrollY, toleranceExceeded) {
      var scrollingUp  = currentScrollY < this.lastKnownScrollY,
        pastOffset = currentScrollY <= this.offset;
  
      return (scrollingUp && toleranceExceeded) || pastOffset;
    },
  
    /**
     * Handles updating the state of the widget
     */
    update : function() {
      var currentScrollY  = this.getScrollY(),
        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);
  
      if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
        return;
      }
  
      if (currentScrollY <= this.offset ) {
        this.top();
      } else {
        this.notTop();
      }
  
      if(currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
        this.bottom();
      }
      else {
        this.notBottom();
      }
  
      if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
        this.unpin();
      }
      else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
        this.pin();
      }
  
      this.lastKnownScrollY = currentScrollY;
    }
  };
  /**
   * Default options
   * @type {Object}
   */
  Headroom.options = {
    tolerance : {
      up : 0,
      down : 0
    },
    offset : 0,
    scroller: window,
    classes : {
      pinned : 'headroom--pinned',
      unpinned : 'headroom--unpinned',
      top : 'headroom--top',
      notTop : 'headroom--not-top',
      bottom : 'headroom--bottom',
      notBottom : 'headroom--not-bottom',
      initial : 'headroom'
    }
  };
  Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

  return Headroom;
}));

/***/ }),

/***/ "../node_modules/imagesloaded/imagesloaded.js":
/*!****************************************************!*\
  !*** ../node_modules/imagesloaded/imagesloaded.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(/*! ev-emitter/ev-emitter */ "../node_modules/ev-emitter/ev-emitter.js")
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter ) {
      return factory( window, EvEmitter );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});


/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./js/app/animations.js":
/*!******************************!*\
  !*** ./js/app/animations.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./js/app/utils.js");
/* harmony import */ var _animations_template_start__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animations/template-start */ "./js/app/animations/template-start.js");
/* harmony import */ var _animations_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animations/post */ "./js/app/animations/post.js");
/* harmony import */ var _animations_tribe_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animations/tribe_events */ "./js/app/animations/tribe_events.js");
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-lines: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/




var Animations = {
  /**
   * Start Page
   */
  'template-start': _animations_template_start__WEBPACK_IMPORTED_MODULE_1__["default"],

  /**
   * Post
   */
  post: _animations_post__WEBPACK_IMPORTED_MODULE_2__["default"],

  /**
   * Event
   */
  tribe_events: _animations_tribe_events__WEBPACK_IMPORTED_MODULE_3__["default"],
  hasAnimation: function hasAnimation(view, fn, _type) {
    var checkAnimation = false;
    var type = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(_type) ? _type : false; // eslint-disable-line

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(Animations[view]) && Animations[view].hasOwnProperty(fn)) {
      checkAnimation = true;
    }

    if (checkAnimation === true && type !== false) {
      checkAnimation = true;
    }

    return checkAnimation;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Animations);

/***/ }),

/***/ "./js/app/animations/post.js":
/*!***********************************!*\
  !*** ./js/app/animations/post.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./js/app/utils.js");
/* harmony import */ var _fixes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fixes.js */ "./js/app/fixes.js");
/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint max-len: [0] */


var AnimationPost = {
  enter: function enter(args) {
    var $headline = $(args.newContainer).find('.v-post__header .entry-title');
    var $tags = $(args.newContainer).find('.v-post__tags > li');
    var $meta = $(args.newContainer).find('.v-post__meta');
    var $content = $(args.newContainer).find('.v-post__content');
    var tl = gsap.timeline({
      defaults: {
        duration: 0.75
      },
      paused: true
    });
    var tweenSplit = new SplitText($headline, {
      type: 'lines,words,chars',
      linesClass: 'overflow-hidden js--text-split--line',
      wordsClass: 'overflow-hidden js--text-split--word'
    });
    $meta.addClass('overflow-hidden');
    tl.from(_fixes_js__WEBPACK_IMPORTED_MODULE_1__["default"].safari.is() ? tweenSplit.chars : tweenSplit.words, {
      yPercent: _fixes_js__WEBPACK_IMPORTED_MODULE_1__["default"].chrome.is() ? 100 : 101,
      stagger: _fixes_js__WEBPACK_IMPORTED_MODULE_1__["default"].safari.is() ? 0.02 : 0.1
    });
    tl.addLabel('wordsDone');
    tl.from($meta.find('> *'), {
      yPercent: 100,
      stagger: 0.1
    }, 'wordsDone-=0.6');

    if ($tags.length) {
      tl.from($tags, {
        yPercent: 15,
        opacity: 0,
        stagger: 0.1
      }, 'wordsDone-=0.6');
    }

    tl.from($content, {
      y: 30,
      opacity: 0
    }, 'wordsDone-=0.4');
    return tl;
  },
  initViewportFx: function initViewportFx(container) {
    this.viewportHeadline(container);
    /*
     * this.viewportEntryTitle( {
     * newContainer: container
     * } );
     */
  },
  viewportEntryTitle: function viewportEntryTitle(args) {
    var $headline = $(args.newContainer).find('.v-post__header .entry-title');
    var $tags = $(args.newContainer).find('.v-post__tags > li');
    var $meta = $(args.newContainer).find('.v-post__meta');
    var $content = $(args.newContainer).find('.v-post__content');
    var tl = gsap.timeline({
      defaults: {
        duration: 0.75
      },
      scrollTrigger: {
        trigger: $headline,
        toggleActions: 'play none none reverse',
        start: 'top bottom-=20%'
      }
    });
    var tweenSplit = new SplitText($headline, {
      type: 'lines,words,chars',
      linesClass: 'overflow-hidden js--text-split--lines',
      wordsClass: 'overflow-hidden js--text-split--words'
    });
    $meta.addClass('overflow-hidden');
    tl.from(tweenSplit.words, {
      yPercent: 100,
      stagger: 0.1
    });
    tl.addLabel('wordsDone');
    tl.from($meta.find('> *'), {
      yPercent: 100,
      stagger: 0.1
    }, 'wordsDone-=0.6');

    if ($tags.length) {
      tl.from($tags, {
        yPercent: 15,
        opacity: 0,
        stagger: 0.1
      }, 'wordsDone-=0.6');
    }

    return tl;
  },
  viewportHeadline: function viewportHeadline(container) {
    var $headlines = $(container).find('.v-post__heading');
    var duration = 0.5;

    if ($headlines.length > 0) {
      $headlines.each(function (i, el) {
        var $el = $(el);
        var tl = gsap.timeline({
          defaults: {
            duration: duration
          },
          scrollTrigger: {
            trigger: $el,
            toggleActions: 'play none none reverse',
            start: 'top bottom-=20%'
          }
        });
        tl.from($el.find('mask:nth-of-type(3)').find('> g'), {
          x: 0,
          scaleX: 0,
          transformOrigin: '0% 50%'
        }).from($el.find('mask:nth-of-type(2)').find('> g'), {
          x: '100%',
          scaleX: 0,
          transformOrigin: '100% 50%'
        }, '-=0.2').from($el.find('mask:nth-of-type(1)').find('> g'), {
          x: 0,
          scaleX: 0,
          transformOrigin: '0% 50%'
        }, '-=0.2');
      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (AnimationPost);

/***/ }),

/***/ "./js/app/animations/template-start.js":
/*!*********************************************!*\
  !*** ./js/app/animations/template-start.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./js/app/utils.js");
/* harmony import */ var _fixes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fixes */ "./js/app/fixes.js");
/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint max-len: [0] */


var AnimationTemplateStart = {
  enter: function enter(args) {
    console.log(args);
  },
  initViewportFx: function initViewportFx(container) {
    console.log('aniamtion', container);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (AnimationTemplateStart);

/***/ }),

/***/ "./js/app/animations/tribe_events.js":
/*!*******************************************!*\
  !*** ./js/app/animations/tribe_events.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./js/app/utils.js");
/* harmony import */ var _fixes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fixes.js */ "./js/app/fixes.js");
/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint max-len: [0] */


var AnimationEvent = {
  enter: function enter(args) {
    var $headline = $(args.newContainer).find('.v-event__header .entry-title');
    var $date = $headline.find(' + div');
    var $price = $(args.newContainer).find('.v-event__price');
    var $content = $(args.newContainer).find('.tribe_events');
    var tl = gsap.timeline({
      defaults: {
        duration: 0.75
      },
      paused: true
    });
    var tweenSplit = new SplitText($headline, {
      type: 'lines,words,chars',
      linesClass: 'overflow-hidden js--text-split--line',
      wordsClass: 'overflow-hidden js--text-split--word'
    });
    tl.from(_fixes_js__WEBPACK_IMPORTED_MODULE_1__["default"].safari.is() ? tweenSplit.chars : tweenSplit.words, {
      yPercent: 100,
      stagger: _fixes_js__WEBPACK_IMPORTED_MODULE_1__["default"].safari.is() ? 0.02 : 0.1
    });
    tl.addLabel('wordsDone');
    tl.from($date, {
      y: 20,
      opacity: 0
    }, 'wordsDone-=0.6');
    tl.from($price, {
      y: 20,
      opacity: 0
    }, 'wordsDone-=0.4');
    tl.from($content, {
      y: 30,
      opacity: 0
    }, 'wordsDone-=0.2');
    return tl;
  },
  initViewportFx: function initViewportFx(container) {}
};
/* harmony default export */ __webpack_exports__["default"] = (AnimationEvent);

/***/ }),

/***/ "./js/app/api.js":
/*!***********************!*\
  !*** ./js/app/api.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Api =
/*#__PURE__*/
function () {
  function Api(settings) {
    _classCallCheck(this, Api);

    var defaults = {
      url_api: "".concat(OAX.config.url_api, "wp/v2/"),
      url_acf: "".concat(OAX.config.url_api, "acf/v3/"),
      url_search: "".concat(OAX.config.url_api, "swp_api/"),
      url_oax: "".concat(OAX.config.url_api, "oax/v1/"),
      url_ajax: OAX.config.url_ajax,
      path_categories: 'categories',
      path_pages: 'pages',
      path_posts: 'posts'
    };
    this.options = Object.assign(defaults, settings);
  }

  _createClass(Api, [{
    key: "getTemplatePart",
    value: function getTemplatePart(template) {
      return fetch("".concat(this.options.url_oax, "templatepart/").concat(template)).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return false;
      });
    }
  }, {
    key: "getPost",
    value: function getPost(id) {
      return fetch("".concat(this.options.url_api).concat(this.options.path_posts, "/").concat(id, "?_embed")).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return false;
      });
    }
  }, {
    key: "getPostsByCategory",
    value: function getPostsByCategory(categoryId, page) {
      var fetchUrl = "".concat(this.options.url_api).concat(this.options.path_posts, "?_embed");

      if (categoryId !== 0) {
        fetchUrl += "&categories=".concat(categoryId);
      }

      if (page !== -1) {
        fetchUrl += "&page=".concat(page);
      }

      return fetch("".concat(fetchUrl, "&per_page=4")).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return false;
      });
    }
  }, {
    key: "getCategory",
    value: function getCategory(categoryId) {
      return fetch("".concat(this.options.url_api).concat(this.options.path_categories, "?include=").concat(categoryId)).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return false;
      });
    }
  }, {
    key: "setUserLocation",
    value: function setUserLocation(userlocation) {
      return $.ajax({
        type: 'POST',
        url: this.options.url_ajax,
        cache: false,
        data: {
          action: 'oax_ajax_set_user_location',
          data: userlocation
        }
      });
    }
  }, {
    key: "setUserEventDate",
    value: function setUserEventDate(userdate) {
      return $.ajax({
        type: 'POST',
        url: this.options.url_ajax,
        cache: false,
        data: {
          action: 'oax_ajax_set_user_event_date',
          data: userdate
        }
      });
    }
  }]);

  return Api;
}();



/***/ }),

/***/ "./js/app/fixes.js":
/*!*************************!*\
  !*** ./js/app/fixes.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _skip_link_focus_fix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../skip-link-focus-fix.js */ "./js/skip-link-focus-fix.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./js/app/utils.js");


/* eslint-disable */

var Fixes = {
  init: function init() {
    this.container = jQuery('#site__body').get(0);
    Object(_skip_link_focus_fix_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.loadPolyfills();
    this.iE.init.call(this);
    this.safari.init.call(this);
    this.firefox.init.call(this);
    this.chrome.init.call(this);
    this.iOS.init.call(this);
    this.android.init.call(this);
    this.mac.init.call(this);
    this.win.init.call(this);
  },
  reInit: function reInit(container) {
    this.container = container;
    this.updatePolyfills();
    this.iE.reInit.call(this);
    this.safari.reInit.call(this);
    this.firefox.reInit.call(this);
    this.chrome.reInit.call(this);
    this.iOS.reInit.call(this);
    this.android.reInit.call(this);
    this.mac.reInit.call(this);
    this.win.reInit.call(this);
  },
  loadPolyfills: function loadPolyfills() {
    var self = this;
    this.polyfills = {
      csspositionsticky: false,
      objectfit: false
    };
    Modernizr.on('csspositionsticky', function (result) {
      if (!result) {
        var stickyfillpolyfill = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript('https://cdnjs.cloudflare.com/ajax/libs/stickyfill/2.0.3/stickyfill.min.js');
        self.polyfills.csspositionsticky = 'loading';
        stickyfillpolyfill.then(function () {
          self.polyfills.csspositionsticky = true;
          var elements = document.querySelectorAll('.sticky');
          Stickyfill.add(elements);
        });
      }
    });
    Modernizr.on('objectfit', function (result) {
      if (!result) {
        var objectfitpolyfill = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript('https://cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.3/ofi.min.js');
        self.polyfills.objectfit = 'loading';
        objectfitpolyfill.then(function () {
          self.polyfills.objectfit = true;
          objectFitImages('img.object-fit-cover, img.object-cover');
        });
      }
    });
  },
  updatePolyfills: function updatePolyfills() {
    if (this.polyfills.objectfit === true) {
      objectFitImages('img.object-fit-cover, img.object-cover');
    }

    if (this.polyfills.csspositionsticky === true) {
      var elements = this.container.querySelectorAll('.sticky');
      Stickyfill.add(elements);
    }
  },
  iE: {
    is: function is() {
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
      } // other browser


      return false;
    },
    init: function init() {
      if (this.iE.is() !== false) {
        jQuery('html').addClass('is-ie').addClass('is-ie--' + this.iE.is());
        this.fixSVGInline(this.container);
      }
    },
    reInit: function reInit() {
      if (this.iE.is() !== false) {
        this.fixSVGInline(this.container);
      }
    }
  },
  safari: {
    is: function is() {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },
    init: function init() {
      if (this.safari.is() !== false) {
        $('html').addClass('is-safari');
        this.fixViewportFontSize(this.container);
      }
    },
    reInit: function reInit() {}
  },
  firefox: {
    is: function is() {
      return !!navigator.userAgent.match(/firefox/i);
    },
    init: function init() {
      if (this.firefox.is() !== false) {
        $('html').addClass('is-firefox');
      }
    },
    reInit: function reInit() {
      if (this.firefox.is() !== false) {}
    }
  },
  chrome: {
    is: function is() {
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    },
    init: function init() {
      if (this.chrome.is() !== false) {
        $('html').addClass('is-chrome');
      }
    },
    reInit: function reInit() {
      if (this.chrome.is() !== false) {}
    }
  },
  iOS: {
    is: function is() {
      return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
    },
    init: function init() {
      if (this.iOS.is() !== false) {
        $('html').addClass('is-ios');
        this.fixVideoLoading(this.container);

        if (this.safari.is()) {
          this.fixViewportHeightUnit();
        }
      }
    },
    reInit: function reInit() {
      if (this.iOS.is() !== false) {
        this.fixVideoLoading(this.container);
      }
    }
  },
  android: {
    is: function is() {
      return navigator.userAgent.toLowerCase().indexOf("android") > -1;
    },
    init: function init() {
      if (this.android.is()) {
        $('html').addClass('is-android');
      }
    },
    reInit: function reInit() {}
  },
  mac: {
    is: function is() {
      return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    },
    init: function init() {
      if (this.mac.is()) {
        $('html').addClass('is-mac');
      }
    },
    reInit: function reInit() {}
  },
  win: {
    is: function is() {
      return navigator.platform.indexOf('Win') > -1;
    },
    init: function init() {
      if (this.win.is()) {
        $('html').addClass('is-windows');
      }
    },
    reInit: function reInit() {}
  },
  fixSVGUrl: function fixSVGUrl(container, url) {
    var selector_string = 'svg [mask^="url("], svg [fill^="url("], svg [clip-path^="url("]';
    var url = url || location.href;
    var currentPath, currentHash;
    jQuery(container).find(selector_string).each(function () {
      var $item = jQuery(this);

      if ($item.get(0).hasAttribute('mask')) {
        currentPath = $item.attr('mask').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
        $item.attr('mask', 'url(' + url + '#' + currentHash + ')');
      } else if ($item.get(0).hasAttribute('clip-path')) {
        currentPath = $item.attr('clip-path').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
        $item.attr('clip-path', 'url(' + url + '#' + currentHash + ')');
      } else if ($item.get(0).hasAttribute('fill')) {
        currentPath = $item.attr('fill').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
        $item.attr('fill', 'url(' + url + '#' + currentHash + ')');
      }
    });
  },
  fixSVGInline: function fixSVGInline(container) {
    jQuery(container).find('svg:not(.injected-svg):not(.js--svg-inject)').each(function (i, el) {
      var svg = el,
          $svg = jQuery(svg);

      if (svg.hasAttribute('viewbox')) {
        jQuery(svg).wrap('<div class="o-svg-wrap relative"></div>');
        jQuery(svg).attr('width', '100%');
        jQuery(svg).css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        var viewBox = svg.getAttribute('viewBox');

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(viewBox)) {
          viewBox = viewBox.replace(/\s\s+/g, ' ');
          var w = viewBox.split(' ')[2];
          var h = viewBox.split(' ')[3];
          var x = h / w * 100;
          svg.parentNode.setAttribute('style', "padding-bottom:".concat(x, "%;"));
        }
      }
    });
  },
  fixViewportFontSize: function fixViewportFontSize(container) {
    $(container).hide();
    setTimeout(function () {
      $(container).show();
    }, 10);
  },
  fixVideoLoading: function fixVideoLoading(container) {
    var $videos = $(container).find('video:not(.video-js):not(.vjs-tech)');

    if ($videos.length) {
      $videos.each(function (i, vid) {
        var playPromise = vid.play();

        if (playPromise !== undefined) {
          playPromise.then(function (_) {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            // .. if it has no autoplay attr
            if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset($(vid).attr('autoplay'))) vid.pause();
          }).catch(function (error) {// Auto-play was prevented
            // Show paused UI.
          });
        }
      });
    }
  },
  fixViewportHeightUnit: function fixViewportHeightUnit() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    window.addEventListener('resize', function () {
      // We execute the same script as before
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    });
  }
};

if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(window.OAX) && !window.OAX.hasOwnProperty('Fixes')) {
  window.OAX.Fixes = Fixes;
}

/* harmony default export */ __webpack_exports__["default"] = (Fixes);

/***/ }),

/***/ "./js/app/router.js":
/*!**************************!*\
  !*** ./js/app/router.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Router; });
/* harmony import */ var _transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitions.js */ "./js/app/transitions.js");
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views */ "./js/views/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./js/app/utils.js");
/* harmony import */ var _barba_prefetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @barba/prefetch */ "../node_modules/@barba/prefetch/dist/barba-prefetch.umd.js");
/* harmony import */ var _barba_prefetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_barba_prefetch__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint one-var: [0] */

/* eslint new-cap: [0] */

/* eslint max-len: [0] */

/**
 * File router.js.
 *
 * Handles script execution for specific pages
 */





var Router =
/*#__PURE__*/
function () {
  function Router(settings) {
    _classCallCheck(this, Router);

    var defaults = {
      debug: false,
      onNewContainerLoaded: null,
      onLinkClicked: null,
      onInitStateChange: null,
      onTransitionCompleted: null,
      onBrowserNav: null,
      baseTransition: null,
      preventLinks: null,
      isUpdateScripts: false,
      classes: {
        pageIsTransition: 'page--is-transition',
        pageIsLoading: 'page--is-loading',
        pageIsReady: 'page--is-ready'
      }
    };
    this.options = Object.assign({}, defaults, settings);
  }

  _createClass(Router, [{
    key: "init",
    value: function init() {
      var self = this;
      var views = _views__WEBPACK_IMPORTED_MODULE_1__["default"].getAll();
      var transitions = _transitions_js__WEBPACK_IMPORTED_MODULE_0__["default"].getAll();
      this.is_linkclick = false;
      this.prev_scrolltop = 0;
      $(document).on('click.oax::scrollTo', 'a[href^="#"]', function (event) {
        var $target = $(event.target).is('a') ? $(event.target) : $(event.target).closest('a');

        if (/^#/.test($target.attr('href')) && $target.attr('href') !== '#') {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollTo($target.attr('href'));
        }

        event.preventDefault();
      });
      this.initHooks();
      barba.use(_barba_prefetch__WEBPACK_IMPORTED_MODULE_3___default.a);
      barba.init({
        debug: this.options.debug,
        prevent: this.preventLinks.bind(this),
        views: views,
        transitions: transitions,
        timeout: 5000
      });
    }
  }, {
    key: "initHooks",
    value: function initHooks() {
      var self = this;
      var debug = this.options.debug; // 0.

      barba.hooks.ready(function (data) {
        if (debug) {
          console.log('ready', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].beforeAppearAll(data);
      }); // 1.

      barba.hooks.page(function (data) {
        if (debug) {
          console.log('page', data.next.url.href, data.current, data.next);
        }

        if (data.trigger !== 'popstate' && data.trigger !== 'barba') {
          self.is_linkclick = true;
          self.is_popstate = false;
          self.onLinkClicked(data.trigger);
        } else if (data.trigger === 'popstate') {
          self.is_linkclick = false;
          self.is_popstate = true;

          if (self.options.onBrowserNav !== null) {
            self.options.onBrowserNav(data.next.url);
          }
        }

        self.onInitStateChange(data.next.url);
      }); // 2.

      barba.hooks.before(function (data) {
        if (debug) {
          console.log('before', data.next.url.href, data.current, data.next);
        }
      }); // 3.

      barba.hooks.beforeLeave(function (data) {
        if (debug) {
          console.log('beforeLeave', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].beforeLeaveAll(data);
      }); // 4.

      barba.hooks.leave(function (data) {
        if (debug) {
          console.log('leave [transition]', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].onLeaveAll(data);
      }); // 5.

      barba.hooks.afterLeave(function (data) {
        if (debug) {
          console.log('afterLeave', data.current, data.next);
        }

        self._changeBodyClasses(data.next.html);

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].afterLeaveAll(data);
      }); // 6.

      barba.hooks.nextAdded(function (data) {
        if (debug) {
          console.log('nextAdded', data.current, data.next);
        }

        self.onNewPageReady(data.next.container, data.next.html);
      }); // 7.

      barba.hooks.beforeEnter(function (data) {
        if (debug) {
          console.log('beforeEnter', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].beforeEnterAll(data);
      }); // 8.

      barba.hooks.enter(function (data) {
        if (debug) {
          console.log('enter [transition]', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].onEnterAll(data);
      }); // 9.

      barba.hooks.afterEnter(function (data) {
        if (debug) {
          console.log('afterEnter', data.current, data.next);
        }

        if (self.is_popstate) {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollTo(0, self.prev_scrolltop, true);
        } else if (_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isset(data.next.url.hash)) {
          var $scrollToContainer = $(data.next.container).find("#".concat(data.next.url.hash));

          if ($scrollToContainer.length) {
            _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollTo(0, $scrollToContainer.offset().top, true);
          }
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].afterEnterAll(data);
      }); // 10.

      barba.hooks.after(function (data) {
        if (debug) {
          console.log('after', data.current, data.next);
        }

        self.onTransitionCompleted(data.next.container);
      }); // 11.

      barba.hooks.currentRemoved(function (data) {
        if (debug) {
          console.log('currentRemoved', data.current, data.next);
        }
      }); // -1 & 12.

      barba.hooks.reset(function (data) {
        if (debug) {
          console.log('reset', data.current, data.next);
        }
      });
      /*
       * dunno the order of the follow
       */

      barba.hooks.currentAdded(function (data) {
        if (debug) {
          console.log('currentAdded', data.current, data.next);
        }
      });
      barba.hooks.nextRemoved(function (data) {
        if (debug) {
          console.log('nextRemoved', data.current, data.next);
        }
      });
    }
  }, {
    key: "onLinkClicked",
    value: function onLinkClicked(HTMLElement) {
      var self = this;
      $('html').addClass(this.options.classes.pageIsTransition);

      if (OAX.template.config.is_ajax) {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollDisable(true); // Utils.scrollLock( true );
      }

      self.prev_scrolltop = jQuery(document).scrollTop();
    }
  }, {
    key: "onNewPageReady",
    value: function onNewPageReady(HTMLElementContainer, newPageRawHTML) {
      if (this.options.isUpdateScripts) {
        this._initPageScripts(HTMLElementContainer);
      }

      this.onNewContainerLoaded(HTMLElementContainer);
    }
  }, {
    key: "onInitStateChange",
    value: function onInitStateChange(url) {
      var self = this;

      if (OAX.template.config.is_ajax) {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollDisable(true);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trackPageView(url.href);
      }

      $('html').addClass(this.options.classes.pageIsLoading);

      if (this.options.onInitStateChange !== null) {
        this.options.onInitStateChange(url);
      }
    }
  }, {
    key: "onTransitionCompleted",
    value: function onTransitionCompleted(container) {
      this.is_linkclick = false;
      _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollDisable(false);
      $('html').removeClass(this.options.classes.pageIsTransition);
      $('html').addClass(this.options.classes.pageIsReady);

      if (this.options.onTransitionCompleted !== null) {
        this.options.onTransitionCompleted(container);
      }
    }
  }, {
    key: "onNewContainerLoaded",
    value: function onNewContainerLoaded(container) {
      $('html').removeClass(this.options.classes.pageIsLoading);

      if (this.options.onNewContainerLoaded !== null) {
        this.options.onNewContainerLoaded(container);
      }
    }
  }, {
    key: "preventLinks",
    value: function preventLinks(_ref) {
      var el = _ref.el;
      var check = false;

      if (el.classList && el.classList.contains('no-barba')) {
        check = true;
      }

      if ($(el).attr('href').toLowerCase().match(/\.(pdf)/g)) {
        check = true;
      }

      if ($(el).attr('href').toLowerCase() === '#') {
        check = true;
      }

      if (/^#/.test($(el).attr('href'))) {
        check = true;
      }

      if ($(el).attr('target') === '_blank') {
        check = true;
      }

      if ($(el).closest('#wpadminbar').length) {
        check = true;
      }

      if (check === false && this.options.preventLinks !== null) {
        check = this.options.preventLinks(el);
      }

      return check;
    }
  }, {
    key: "_changeBodyClasses",
    value: function _changeBodyClasses(newPageRawHTML) {
      var parser = new DOMParser();
      var DOC = parser.parseFromString(newPageRawHTML, 'text/html');
      var bodyClasses = DOC.body.getAttribute('class');
      $('html').removeClass(this.options.classes.pageIsReady);

      if ($('body').hasClass('overflow-hidden')) {
        bodyClasses += ' overflow-hidden';
      }

      $('body').attr('class', bodyClasses);
    }
  }, {
    key: "_initPageScripts",
    value: function _initPageScripts(container) {
      var $scriptsEl = $(container).find('.oax-js-config--page-scripts[data-page-scripts]');

      if ($scriptsEl.length) {
        var scripts = $scriptsEl.data('pageScripts');
        var $inlineScripts = $scriptsEl.find('> script');
        var isDev = location.host === 'localhost:3000';

        if (Object.keys(scripts).length) {
          var $currentScripts = $('script[id][src]');
          var currentScripts = {};
          $currentScripts.each(function (i, el) {
            currentScripts[$(el).attr('id')] = $(el).attr('src');
          }); // console.log( scripts, currentScripts );

          for (var _i = 0, _Object$entries = Object.entries(scripts); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            if (currentScripts[key] === undefined) {
              var $belongingInlineScript = $inlineScripts.filter("[data-id=\"".concat(key, "-extra\"]"));

              if ($belongingInlineScript.length) {
                console.log($belongingInlineScript[0].innerText); // eval.call( window, $belongingInlineScript[0].innerText ); // eslint-disable-line
              }

              console.log(value, key);
              _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].loadScript(value, key);
            }
          }

          $(document).trigger('ready');
        }
      }
    }
  }, {
    key: "_getNamespace",
    value: function _getNamespace(container) {
      return container.getAttribute("data-barba-namespace");
    }
  }]);

  return Router;
}();



/***/ }),

/***/ "./js/app/transitions.js":
/*!*******************************!*\
  !*** ./js/app/transitions.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transitions_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitions/default */ "./js/app/transitions/default.js");
/* harmony import */ var _transitions_none__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitions/none */ "./js/app/transitions/none.js");
/*
 * import TransitionFilter from './transitions/filter';
 */


var Transitions = {
  getAll: function getAll() {
    return [_transitions_none__WEBPACK_IMPORTED_MODULE_1__["default"]];
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Transitions);

/***/ }),

/***/ "./js/app/transitions/default.js":
/*!***************************************!*\
  !*** ./js/app/transitions/default.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./js/app/utils.js");
/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint max-len: [0] */

var TransitionDefault = {
  beforeAppear: function beforeAppear() {},
  appear: function appear() {},
  afterAppear: function afterAppear() {},
  beforeLeave: function beforeLeave() {},
  leave: function leave(data) {
    var self = TransitionDefault;
    var done = this.async();
    var tlSlideIn = gsap.timeline({
      onComplete: function onComplete() {
        if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isset(data.next.container)) {
          gsap.set(data.next.container, {
            visibility: 'visible'
          });
        }

        if (!OAX.template.config.is_ajax) {
          window.location.href = window.location.href;

          if (!_utils__WEBPACK_IMPORTED_MODULE_0__["default"].cookie.hasItem('oax_preloader')) {
            _utils__WEBPACK_IMPORTED_MODULE_0__["default"].cookie.setItem('oax_preloader', 'TRANSITION', 600, OAX.config.url_base, '');
          }
        } else {
          _utils__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTo(0, 0);
          done();
        }
      }
    });
    self.$el = $('.c-page-transition');
    tlSlideIn.set(self.$el, {
      autoAlpha: 1,
      yPercent: 100
    });
    tlSlideIn.to(self.$el, {
      yPercent: 0,
      duration: 0.5,
      autoAlpha: 1,
      ease: 'circ.inOut'
    }, 0);
  },
  afterLeave: function afterLeave() {},
  beforeEnter: function beforeEnter() {},
  enter: function enter(data) {
    var self = TransitionDefault;
    var done = this.async();
    var tlSlideOut = gsap.timeline({
      paused: false,
      onStart: function onStart() {
        jQuery(data.current.container).hide();
      },
      onComplete: function onComplete() {
        gsap.set(self.$el, {
          autoAlpha: 0,
          yPercent: 100
        });
        done();
      }
    });
    tlSlideOut.to(self.$el, {
      duration: 0.75,
      yPercent: -100,
      ease: 'circ.inOut',
      delay: 0.5
    });
  },
  afterEnter: function afterEnter() {}
};
/* harmony default export */ __webpack_exports__["default"] = (TransitionDefault);

/***/ }),

/***/ "./js/app/transitions/none.js":
/*!************************************!*\
  !*** ./js/app/transitions/none.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./js/app/utils.js");
/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint max-len: [0] */

var TransitionNone = {
  name: 'none',
  leave: function leave(data) {
    var self = TransitionNone;
    var done = this.async();

    if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isset(data.next.container)) {
      gsap.set(data.next.container, {
        display: 'none'
      });
    }

    if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isset(data.next.namespace)) {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTo(0, 0, true);
    }

    done();
  },
  enter: function enter(data) {
    var self = TransitionNone;
    var done = this.async();

    if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isset(data.next.container)) {
      gsap.set(data.next.container, {
        display: 'block'
      });
    }

    done();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (TransitionNone);

/***/ }),

/***/ "./js/app/utils.js":
/*!*************************!*\
  !*** ./js/app/utils.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/slider.js */ "./js/components/slider.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! imagesloaded */ "../node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_1__);
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint no-irregular-whitespace: [0] */

/* eslint no-useless-escape: [0] */



__webpack_require__(/*! ../lib/jquery.serializeObject.js */ "./js/lib/jquery.serializeObject.js");

__webpack_require__(/*! ../lib/jquery.scrolllock.js */ "./js/lib/jquery.scrolllock.js");

__webpack_require__(/*! ../lib/pace.min.js */ "./js/lib/pace.min.js");

var Utils = {
  isset: function isset(obj) {
    var i, max_i; // eslint-disable-line

    if (obj === undefined) {
      return false;
    }

    for (i = 1, max_i = arguments.length; i < max_i; i++) {
      // eslint-disable-line
      if (obj[arguments[i]] === undefined) {
        // eslint-disable-line
        return false;
      }

      obj = obj[arguments[i]]; // eslint-disable-line
    }

    return true;
  },
  initSliders: function initSliders(container) {
    /**
     * Slick Slider
     */
    _components_slider_js__WEBPACK_IMPORTED_MODULE_0__["default"].slick.init(container);
  },
  scrollTo: function scrollTo(_x, _y, _animation, _duration) {
    var x = this.isset(_x) ? _x : 0;
    var y = this.isset(_y) ? _y : 0;
    var duration = this.isset(_duration) ? _duration : 500;
    var animation = this.isset(_animation) ? _animation : false;

    if (typeof _x === 'string' || _x instanceof String) {
      if ($(_x).length) {
        var headerHeight = $('#site__header').outerHeight();
        y = $(_x).offset().top - headerHeight;
        animation = true;
      }

      x = 0;
    }

    if (this.isset(OAX.Scrollbar)) {
      if (animation) {
        window.OAX.Scrollbar.scrollTo(x, y, duration);
      } else if (typeof window.OAX.Scrollbar.snapTo === 'function') {
        window.OAX.Scrollbar.snapTo(x, y);
      } else if (typeof window.OAX.Scrollbar.setPosition === 'function') {
        window.OAX.Scrollbar.setPosition(x, y);
      }
    } else if (animation) {
      $('html,body').animate({
        scrollTop: y
      }, duration);
    } else {
      window.scrollTo(x, y);
    }
  },
  scrollLock: function scrollLock(lock) {
    var _lock = typeof lock === 'undefined' ? 'auto' : lock,
        $html = jQuery('html');

    if (_lock === true) {
      if (!$html.hasClass('is-fixed')) {
        jQuery.scrollLock(true);
        $html.addClass('is-fixed');
      }
    } else if (_lock === false) {
      if ($html.hasClass('is-fixed')) {
        jQuery.scrollLock(false);
        $html.removeClass('is-fixed');
      }
    } else if (_lock === 'auto') {
      if ($html.hasClass('is-fixed')) {
        jQuery.scrollLock(false);
      } else {
        jQuery.scrollLock(true);
      }

      $html.toggleClass('is-fixed');
    }
  },
  scrollDisable: function scrollDisable(disable) {
    var $body = jQuery('body'),
        _disable = typeof disable !== 'undefined' ? disable : 'auto';

    if (_disable === true) {
      $body.addClass(' overflow-hidden ');
    } else if (_disable === false) {
      $body.removeClass(' overflow-hidden ');
    } else if (_disable === 'auto') {
      if ($body.hasClass(' overflow-hidden ')) {
        $body.removeClass(' overflow-hidden ');
      } else {
        $body.addClass(' overflow-hidden ');
      }
    }
  },
  disableLinks: function disableLinks(exceptContainer) {
    var $allLinks = jQuery('a[href]');
    $allLinks.filter(function (index, el) {
      return !jQuery(el).closest(exceptContainer.selector).length;
    }).attr('disabled', true).addClass('pointer-events-none').addClass('is-disabled');
  },
  enableLinks: function enableLinks() {
    var $allLinks = jQuery('a[href][disabled].is-disabled');
    $allLinks.removeAttr('disabled').removeClass('pointer-events-none').removeClass('is-disabled');
  },
  initVideos: function initVideos(container) {
    var self = this;

    var hideOnPlay = function hideOnPlay(vidEl, vidPlayer) {
      var $el = $(vidEl);

      if (self.isset($el.data('hideOnPlay'))) {
        var $hideEl = $($el.data('hideOnPlay'));

        if (!vidPlayer.paused()) {
          gsap.to($hideEl, {
            duration: 0.5,
            autoAlpha: 0
          });
        } else {
          gsap.to($hideEl, {
            duration: 0.5,
            autoAlpha: 1
          });
        }
      }
    };

    if ($(container).find('.js--player').length > 0) {
      $(container).find('.js--player').each(function (i, el) {
        var videoPlayer = new Plyr(el);
      });
    }
  },
  playVideo: function playVideo($el) {
    var el = $el[0];

    if ($el.hasClass('vjs-tech')) {
      var videoPlayer = videojs.getPlayer(el);

      if (videoPlayer.paused()) {
        videoPlayer.play();
      }
    } else {
      el.play();
    }
  },
  pauseVideo: function pauseVideo($el) {
    if ($el.hasClass('vjs-tech')) {
      var videoPlayer;

      if ($el.length > 0) {
        if ($el.length === 1) {
          videoPlayer = videojs.getPlayer($el[0]);
          videoPlayer.pause();
        } else if ($el.length > 1) {
          $el.each(function (i, ell) {
            videoPlayer = videojs.getPlayer(ell);
            videoPlayer.pause();
          });
        }
      }
    } else {
      $el[0].pause();
    }
  },
  progressBar: function progressBar(action) {
    if (action === 'start') {
      Pace.start();
    } else if (action === 'stop') {// Pace.stop();
    }
  },
  debounce: function debounce(func, wait) {
    // we need to save these in the closure
    var timeout, args, context, timestamp;
    return function () {
      // save details of latest call
      context = this; // eslint-disable-line

      args = [].slice.call(arguments, 0); // eslint-disable-line

      timestamp = new Date(); // this is where the magic happens

      var later = function later() {
        // eslint-disable-line
        // how long ago was the last call
        var last = new Date() - timestamp;
        /*
         * if the latest call was less that the wait period ago
         * then we reset the timeout to wait for the difference
         */

        if (last < wait) {
          timeout = setTimeout(later, wait - last); // or if not we can null out the timer and run the latest
        } else {
          timeout = null;
          func.apply(context, args); // eslint-disable-line
        }
      }; // we only need to set the timer now if one isn't already running


      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  },
  cookie: {
    getItem: function getItem(sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*".concat(encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&'), "\\s*\\=\\s*([^;]*).*$)|^.*$")), '$1')) || null;
    },
    setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }

      var sExpires = '';

      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : "; max-age=".concat(vEnd);
            break;

          case String:
            sExpires = "; expires=".concat(vEnd);
            break;

          case Date:
            sExpires = "; expires=".concat(vEnd.toUTCString());
            break;
        }
      }

      document.cookie = "".concat(encodeURIComponent(sKey), "=").concat(encodeURIComponent(sValue)).concat(sExpires).concat(sDomain ? "; domain=".concat(sDomain) : '').concat(sPath ? "; path=".concat(sPath) : '').concat(bSecure ? '; secure' : '');
      return true;
    },
    removeItem: function removeItem(sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) {
        return false;
      }

      document.cookie = "".concat(encodeURIComponent(sKey), "=; expires=Thu, 01 Jan 1970 00:00:00 GMT").concat(sDomain ? "; domain=".concat(sDomain) : '').concat(sPath ? "; path=".concat(sPath) : '');
      return true;
    },
    hasItem: function hasItem(sKey) {
      return new RegExp("(?:^|;\\s*)".concat(encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&'), "\\s*\\=")).test(document.cookie);
    },
    keys: function keys() {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);

      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }

      return aKeys;
    }
  },
  responsiveIframes: function responsiveIframes(container) {
    var $iframes = jQuery(container).find('iframe:not(.c-yt__iframe):not(.no-init):not(.h5p-iframe)');

    if ($iframes.length > 0) {
      $iframes.each(function (index, el) {
        var height = jQuery(el).height(),
            width = jQuery(el).width();
        var ratio = height / width * 100;

        if (jQuery(el).attr('src').includes('youtube')) {
          ratio = 9 / 16 * 100; // 16/9
        }

        jQuery(el).addClass('absolute inset');
        jQuery(el).wrap("<div class=\"c-iframe relative\" style=\"padding-bottom: ".concat(ratio, "%\"></div>"));
      });
    }
  },
  injectYT: function injectYT(_container) {
    var container = this.isset(_container) ? _container : document;
    var youtube = container.querySelectorAll('.js--yt');

    if ($(youtube).length > 0) {
      var _loop = function _loop() {
        /*
         * Medium Quality: http://img.youtube.com/vi/{video-id}/mqdefault.jpg (320×180 pixels)
         * High Quality: http://img.youtube.com/vi/G0wGs3useV8/hqdefault.jpg (480×360 pixels)
         * Standard Definition (SD): http://img.youtube.com/vi/G0wGs3useV8/sddefault.jpg (640×480 pixels)
         * Maximum Resolution: http://img.youtube.com/vi/G0wGs3useV8/maxresdefault.jpg (1920×1080 pixels)			        
         */
        var source = "https://img.youtube.com/vi/".concat($(youtube[i]).data('embed'), "/sddefault.jpg");
        var image = new Image();
        image.src = source;
        $(image).addClass('c-yt__poster absolute left-0 top-0 w-full h-full object-fit-cover');
        image.addEventListener('load', function () {
          // eslint-disable-line
          youtube[i].appendChild(image);
        }(i));
        youtube[i].addEventListener('click', function (event) {
          // eslint-disable-line
          var iframe = document.createElement('iframe');
          var $target = $(event.target).is('.js--yt') ? $(event.target) : $(event.target).closest('.js--yt');
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allowfullscreen', '');
          $(iframe).addClass('c-yt__iframe absolute left-0 top-0 w-full h-full');
          iframe.setAttribute('src', "https://www.youtube.com/embed/".concat($target.data('embed'), "?rel=0&showinfo=0&autoplay=1"));
          $target.html('');
          $target.append(iframe);
        });
        $(youtube[i]).append('<div class="js--yt__play-button"></div>');
      };

      for (var i = 0; i < youtube.length; i++) {
        _loop();
      }
    }
  },
  injectSVG: function injectSVG(container, selector) {
    var injectEls = container.querySelectorAll(typeof selector === 'undefined' ? '.js--svg-inject' : selector);

    if (jQuery(injectEls).length) {
      SVGInjector(injectEls, {
        // eslint-disable-line
        each: function each(svg) {
          jQuery(container).trigger('OAX::svg-loaded:single', [svg]);
        }
      }, function (totalSVGsInjected) {
        jQuery(container).trigger('OAX::svg-loaded:all', [totalSVGsInjected]);
      });
    }
  },
  imagesLoaded: function imagesLoaded(_container) {
    var container = this.isset(_container) ? _container : document;
    var dfr = $.Deferred(); // eslint-disable-line

    imagesloaded__WEBPACK_IMPORTED_MODULE_1___default()(container, function () {
      dfr.resolve();
    });

    return dfr.promise();
  },
  timelinePromise: function timelinePromise(timeline, onUpdateParam) {
    var _onUpdateParam = typeof onUpdateParam === 'undefined' ? false : onUpdateParam,
        _oldOnComplete = typeof timeline.vars.onComplete !== 'undefined' ? timeline.vars.onComplete : false;

    var _triggerPromise = true;
    return new Promise(function (resolve) {
      if (_onUpdateParam === false) {
        // alternate syntax for adding a callback
        timeline.eventCallback('onComplete', function () {
          if (_oldOnComplete !== false) {
            _oldOnComplete();
          }

          resolve(true);
        });
      } else if (jQuery.isNumeric(_onUpdateParam)) {
        timeline.eventCallback('onUpdate', function (tl) {
          if (tl === '{self}') {
            tl = timeline;
          }

          var fxd = tl.progress().toFixed(1);

          if (fxd == _onUpdateParam && _triggerPromise) {
            // eslint-disable-line
            _triggerPromise = false;

            if (_oldOnComplete !== false) {
              _oldOnComplete();
            }

            resolve(true);
          }

          if (fxd == _onUpdateParam + 0.1 && _triggerPromise) {
            // eslint-disable-line
            if (_oldOnComplete !== false) {
              _oldOnComplete();
            }

            resolve(true);
          }
        }, ['{self}']);
        timeline.eventCallback('onComplete', function () {});
      }
    });
  },
  loadScript: function loadScript(url, _id) {
    var _this = this;

    var scriptPromise = new Promise(function (resolve, reject) {
      var scripts = document.getElementsByTagName('script'),
          desiredSource = url;
      var alreadyLoaded = false;
      var id = _this.isset(_id) ? _id : false;

      if (scripts.length) {
        for (var scriptIndex in scripts) {
          // eslint-disable-line
          if (!alreadyLoaded && desiredSource === scripts[scriptIndex].src) {
            alreadyLoaded = true;
            resolve(true);
          }
        }
      }

      if (!alreadyLoaded) {
        var script = document.createElement('script');
        document.head.appendChild(script);
        script.onload = resolve;
        script.onerror = reject;

        if (id !== false) {
          script.id = id;
        } // script.async = true;


        script.src = url;
      }
    });
    return scriptPromise;
  },
  loadCSS: function loadCSS(url) {},
  loadSVG: function loadSVG(url) {
    return fetch(url).then(function (response) {
      return response.text();
    });
  },
  hint: function hint(container, action) {
    var wrapper = "<div class=\"c-hint\" style=\"pointer-events:none; position: absolute; width: 5rem; height: 5rem; top: 50%; left: 50%; margin: -2.5rem 0 0 -2.5rem; background-color: rgba(255,255,255,0.5); border-radius: 100%; padding: 1rem;\"></div>";
    var icons = {
      swipe: "<svg class=\"c-hint__swipe\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 120 120\" enable-background=\"new 0 0 120 120\" xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<path class=\"c-hint__swipe-arrow\" fill=\"#231F20\" d=\"M54.5,27c0-1-1-2-2-2H23v-3.125c0-0.606-0.615-1.153-1.176-1.386s-1.456-0.104-1.885,0.325L15,26.375\n\t\t\t\t\t\t\t\t\t\tc-0.586,0.586-0.586,1.414,0,2l4.939,5.561c0.429,0.429,1.324,0.558,1.885,0.325S23,33.481,23,32.875V29h29.5\n\t\t\t\t\t\t\t\t\t\tC53.5,29,54.5,28,54.5,27z\"/>\n\t\t\t\t\t\t\t\t\t<path class=\"c-hint__swipe-arrow\" fill=\"#231F20\" d=\"M27.5,19H58v3.875c0,0.606,0.115,1.153,0.676,1.386s0.956,0.104,1.385-0.325L66,18.375\n\t\t\t\t\t\t\t\t\t\tc0.586-0.586,0.586-1.414,0-2l-5.939-5.561c-0.429-0.429-0.824-0.558-1.385-0.325S58,11.268,58,11.875V15H27.5c-1,0-2,1-2,2\n\t\t\t\t\t\t\t\t\t\tS26.5,19,27.5,19z\"/>\n\t\t\t\t\t\t\t\t\t<path class=\"c-hint__swipe-hand\" fill=\"#231F20\" d=\"M98.482,60.875c-0.407,0-1.44,0.14-2.502,0.47c-0.271-3.613-3.299-6.47-6.98-6.47\n\t\t\t\t\t\t\t\t\t\tc-1.657,0-3.182,0.579-4.382,1.545c-0.887-2.708-3.232-4.545-6.136-4.545c-1.923,0-3.634,0.791-4.854,2.083l-0.664-18.583\n\t\t\t\t\t\t\t\t\t\tc0-4.276-3.011-7.5-7.004-7.5s-7.004,3.224-7.004,7.532l0.686,32.025c-0.808,0.439-2.034,1.242-3.603,2.667\n\t\t\t\t\t\t\t\t\t\tc-5.429,4.934-7.206,16.868-1.075,26.105c6.825,10.282,14.822,14.671,26.742,14.671c12.629,0,16.854-6.338,20.1-12.83\n\t\t\t\t\t\t\t\t\t\tc3.122-6.244,3.158-30.156,3.158-31.17C104.965,63.678,101.936,60.875,98.482,60.875z M99.123,96.703\n\t\t\t\t\t\t\t\t\t\tc-3.056,6.112-6.475,11.172-17.416,11.172c-10.936,0-17.959-3.862-24.242-13.33c-3.661-5.516-5.25-16.916,0.593-22.227\n\t\t\t\t\t\t\t\t\t\tc0.631-0.573,1.188-1.022,1.66-1.371l0.224,10.459c0.019,0.828,0.712,1.494,1.532,1.468c0.828-0.018,1.485-0.703,1.468-1.532\n\t\t\t\t\t\t\t\t\t\tl-0.984-45.967c0-2.649,1.646-4.5,4.004-4.5s4.004,1.851,4.005,4.554l1,28c0.027,0.77,0.633,1.393,1.4,1.443\n\t\t\t\t\t\t\t\t\t\tc0.76,0.051,1.449-0.488,1.578-1.247l0.759-4.5c0.014-0.083,0.021-0.166,0.021-0.25c0-2.28,1.616-4,3.759-4\n\t\t\t\t\t\t\t\t\t\tc2.417,0,3.518,2.073,3.518,4v3c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5c0-2.206,1.794-4,4-4s4,1.794,4,4v6.5\n\t\t\t\t\t\t\t\t\t\tc0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3.82c0.6-0.292,1.776-0.68,2.482-0.68c1.79,0,3.482,1.457,3.482,3\n\t\t\t\t\t\t\t\t\t\tC101.965,73.591,101.453,92.043,99.123,96.703z\"/>\n\t\t\t\t\t\t\t\t</g>\n\t \t\t\t\t\t\t</svg>"
    };
    var actions = {
      swipe: function swipe(_container) {
        var tl = gsap.timeline({
          yoyo: true,
          repeat: -1,
          repeatDelay: 1
        });
        tl.fromTo($(_container).find('.c-hint__swipe-hand'), 1, {
          x: 0
        }, {
          x: 15
        });
      },
      destroy: function destroy(_container) {
        if ($(_container).find('.c-hint').length > 0) {
          TweenMax.to($(_container).find('.c-hint'), 0.5, {
            autoAlpha: 0,
            onComplete: function onComplete() {
              $(_container).find('.c-hint').remove();
            }
          });
        }
      }
    };

    if (action === 'swipe') {
      $(container).append($(wrapper).append(icons.swipe));
      actions[action](container);
    } else if (action === 'destroy') {
      actions[action](container);
    }
  },
  getComputedStyle: function getComputedStyle($el, value) {
    return window.getComputedStyle($el instanceof jQuery ? $el.get(0) : $el, null).getPropertyValue(value);
  },
  onTransitionEnd: function onTransitionEnd() {
    return 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
  },
  onAnimationEnd: function onAnimationEnd() {
    var animEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      MozAnimation: 'animationend',
      OAnimation: 'oanimationend',
      msAnimation: 'MSAnimationEnd',
      animation: 'animationend'
    };
    return animEndEventNames[Modernizr.prefixed('animation')];
  },
  onAnimationIteration: function onAnimationIteration() {
    return 'MSAnimationIteration webkitAnimationIteration animationiteration';
  },
  goToUrl: function goToUrl(url) {
    // Barba.Pjax.goTo( url );
    window.location = url;
  },
  trackPageView: function trackPageView(url) {
    /** Analytics */
    if (typeof ga !== 'undefined' && typeof ga === 'function') {
      ga('send', 'pageview', url);
    }

    if (typeof _gaq !== 'undefined') {
      _gaq.push(['_trackPageview', url.replace(OAX.config.url_base, '')]);
    }
    /** Facebook */


    if (typeof fbq !== 'undefined' && typeof fbq === 'function') {
      fbq('track', 'ViewContent');
    }
    /** PIWIK */


    if (typeof _paq !== 'undefined') {
      _paq.push(['trackPageView']);
    }
  },
  isMobile: function isMobile() {
    return !Modernizr.mq('(min-width: 992px)');
  }
};

if (Utils.isset(window.OAX) && !window.OAX.hasOwnProperty('Utils')) {
  window.OAX.Utils = Utils;
}

/* harmony default export */ __webpack_exports__["default"] = (Utils);

/***/ }),

/***/ "./js/components/navigation.js":
/*!*************************************!*\
  !*** ./js/components/navigation.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigation; });
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */


var Navigation =
/*#__PURE__*/
function () {
  function Navigation() {
    _classCallCheck(this, Navigation);

    this.isOffcanvas = false;
    this.container = document.getElementById('site__navigation');
    this.button = this.container.getElementsByTagName('button')[0]; // this.menu = this.container.getElementsByClassName( 'site__navigation-menu' )[0];

    this.menu = this.container.getElementsByClassName('l-navigation-main')[0];
    this.offcanvas = document.getElementsByClassName('site__navigation-offcanvas')[0];

    if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(this.offcanvas)) {
      this.container = document.body;
      this.menu = this.offcanvas;
      this.isOffcanvas = true;
    }
  }

  _createClass(Navigation, [{
    key: "setupNavigation",
    value: function setupNavigation() {
      var _this = this;

      if (!this.container || 'undefined' === typeof this.button) {
        return;
      } // Hide menu toggle button if menu is empty and return early.


      if ('undefined' === typeof this.menu) {}
      /*
       * this.button.style.display = 'none';
       * return;
       */
      // Have menu closed by default


      this.menu.setAttribute('aria-expanded', 'false');

      if (-1 === this.menu.className.indexOf('nav-menu')) {
        this.menu.className += ' nav-menu';
      }

      if (typeof this.offcanvas !== 'undefined') {
        this.isOffcanvas = true;
        this.offcanvas.setAttribute('aria-expanded', 'false');
      } // Toggle mobile navigation


      jQuery(this.button).on('click.oax::navigation-toggle', function () {
        if (-1 !== _this.container.className.indexOf('is-open')) {
          _this.closeNavigation();
        } else {
          _this.openNavigation();
        }
      });

      if (jQuery('.wpm-language-switcher').length) {
        jQuery('.wpm-language-switcher').find('a[href]').addClass('no-barba');
      }

      this.setupButtonAnimation(); // this.navAccessibilitySupport();
    }
    /**
     * Allow keyboard users to use multi-level navigation
     */

  }, {
    key: "navAccessibilitySupport",
    value: function navAccessibilitySupport() {
      // Get all the link elements within the menu.
      var links = this.menu.getElementsByTagName('a');
      /*
       * @todo test if this is working
       * Each time a menu link is focused or blurred, toggle focus.
       */

      links.forEach(function (link) {
        link.addEventListener('focus', link.toggleFocus, true);
        link.addEventListener('blur', link.toggleFocus, true);
      });
    }
    /**
     * Toggles `focus` class to allow submenu access on tablets.
     */

  }, {
    key: "enableTouchFocus",
    value: function enableTouchFocus() {
      var _this2 = this;

      var parentLink = this.container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

      if ('ontouchstart' in window) {
        var touchStartFn = function touchStartFn(e) {
          var menuItem = _this2.parentNode;

          if (!menuItem.classList.contains('focus')) {
            e.preventDefault();

            for (var i = 0; i < menuItem.parentNode.children.length; ++i) {
              if (menuItem !== menuItem.parentNode.children[i]) {
                menuItem.parentNode.children[i].classList.remove('focus');
              }
            }

            menuItem.classList.add('focus');
          } else {
            menuItem.classList.remove('focus');
          }
        };

        for (var i = 0; i < parentLink.length; ++i) {
          parentLink[i].addEventListener('touchstart', touchStartFn, false);
        }
      }
    }
  }, {
    key: "openNavigation",
    value: function openNavigation() {
      if (this.isOffcanvas) {// Utils.scrollLock( true );
      }

      $('body').addClass('is-navigation--open');
      this.container.className += ' is-open';
      this.button.setAttribute('aria-expanded', 'true');
      this.menu.setAttribute('aria-expanded', 'true'); // this.tl.play();	

      jQuery(this.menu).on('click.oax::navigation-link-click', 'a', jQuery.proxy(this.closeNavigation, this));
    }
  }, {
    key: "closeNavigation",
    value: function closeNavigation() {
      if (this.isOffcanvas) {// Utils.scrollLock( false );
      }

      $('body').removeClass('is-navigation--open');
      this.container.className = this.container.className.replace(' is-open', '');
      this.button.setAttribute('aria-expanded', 'false');
      this.menu.setAttribute('aria-expanded', 'false'); // this.tl.reverse();

      jQuery(this.menu).off('click.oax::navigation-link-click', 'a', jQuery.proxy(this.closeNavigation, this));
    }
    /**
     * Sets or removes .focus class on an element.
     */

  }, {
    key: "toggleFocus",
    value: function toggleFocus() {
      var self = this; // Move up through the ancestors of the current link until we hit .nav-menu.

      while (-1 === self.className.indexOf('nav-menu')) {
        // On li elements toggle the class .focus.
        if ('li' === self.tagName.toLowerCase()) {
          if (-1 !== self.className.indexOf('focus')) {
            self.className = self.className.replace(' focus', '');
          } else {
            self.className += ' focus';
          }
        }

        self = self.parentElement;
      }
    }
  }, {
    key: "setActiveState",
    value: function setActiveState() {
      var classActive = 'current-menu-item',
          $links = jQuery(this.menu).find(' a[href] ');
      $links.each(function () {
        var $el = jQuery(this); // eslint-disable-line

        $el.parent('li').removeClass(classActive);
      });
      $links.filter(function () {
        var $el = jQuery(this); // eslint-disable-line

        var href = $el.attr('href');

        if (window.location.href.includes(href)) {
          return true;
        }

        return false;
      }).parent().addClass(classActive);
    }
  }, {
    key: "setupButtonAnimation",
    value: function setupButtonAnimation() {}
  }]);

  return Navigation;
}();



/***/ }),

/***/ "./js/components/slider.js":
/*!*********************************!*\
  !*** ./js/components/slider.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

var Slider = {
  slick: {
    options: {
      selector_slider: '.js--slider:not([data-init-by])',
      selector_pagination: '.c-pagination',
      selector_pagination_next: '.c-pagination__next',
      selector_pagination_prev: '.c-pagination__prev',
      selector_pagination_nums: '.c-pagination__nums'
    },
    init: function init(container) {
      var self = this;

      if ($(container).find(self.options.selector_slider)) {
        var $sliders = $(container).find(self.options.selector_slider);
        $sliders.each(function (i, el) {
          var options = {
            speed: 1000,
            cssEase: 'cubic-bezier(0.55, 0, 0.1, 1)',
            rows: 0,
            prevArrow: "<button class=\"w-3 h-3 slick-prev js--slider-arrow js--slider-arrow--prev text-white\"><svg class=\"w-2 h-2 fill-current\"><use xlink:href=\"#icon-arrow-left\"></use></svg></button>",
            nextArrow: "<button class=\"w-3 h-3 slick-next js--slider-arrow js--slider-arrow--next text-white\"><svg class=\"w-2 h-2 fill-current\"><use xlink:href=\"#icon-arrow-right\"></use></svg></button>"
          };
          var $slider = $(el);

          if ($slider.parent().find(self.options.selector_pagination_next).length) {
            options.nextArrow = $slider.parent().find(self.options.selector_pagination_next);
          }

          if ($slider.parent().find(self.options.selector_pagination_prev).length) {
            options.prevArrow = $slider.parent().find(self.options.selector_pagination_prev);
          }

          if ($slider.parent().find(self.options.selector_pagination_nums).length) {
            $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              Slider.updatePagination($slider.parent().find(self.options.selector_pagination), nextSlide + 1);
            });
          }

          if ($slider.find('video').length) {
            $slider.on('afterChange', function (event, slick, currentSlide) {
              var $currentSlide = $(slick.$slides[currentSlide]);
              _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].pauseVideo($slider.find('video'));

              if ($currentSlide.find('video').length) {
                _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].playVideo($currentSlide.find('video'));
              }
            });
          }

          if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile() && !$slider.hasClass('js--slider--no-hint')) {
            $slider.on('swipe', function () {
              _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hint($slider.parent().get(0), 'destroy');
            });
            $slider.on('afterChange', function () {
              _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hint($slider.parent().get(0), 'destroy');
            });
            _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hint($slider.parent().get(0), 'swipe');
          }

          if ($slider.hasClass('js--slider--overflow')) {// console.log()
          }

          $slider.slick(options);
        });
      }
    }
  },
  slideTrack: {
    options: {
      selector_slider: '.c-slider--slide-track',
      selector_slider_item: '.c-slider__item',
      selector_nav_btn: '.c-slider__nav-btn',
      selector_nav_btn_prev: '.c-slider__nav-btn--prev',
      selector_nav_btn_next: '.c-slider__nav-btn--next'
    },
    init: function init(container) {
      this.options.container = container; // this.initSlider();
    },
    initSlider: function initSlider() {
      if ($(this.options.container).find(this.options.selector_slider).length && $(this.options.container).find(this.options.selector_slider).find(this.options.selector_nav_btn).length) {
        this.addStyles();
        this.initBtns();
      }
    },
    addStyles: function addStyles() {},
    removeStyles: function removeStyles() {},
    initBtns: function initBtns() {
      var self = this;
      var $sliderBtns = $(this.options.container).find(this.options.selector_slider).find(this.options.selector_nav_btn);
      $sliderNavBtns.on('click.oax::slider-nav-btn', function (event) {
        var $target = $(event.target).is('.c-slider__nav-btn') ? $(event.target) : $(event.target).closest('.c-slider__nav-btn');
        var direction = $target.hasClass('c-slider__nav-btn--prev') ? 'prev' : 'next';
        $slideItems = $slider.find('.c-slider__item');
        $currentSlides = $slideItems.filter('.is-active');

        if (direction === 'next') {
          nextSlide();
        } else {
          prevSlide();
        }
      });
    },
    prevSlide: function prevSlide() {},
    nextSlide: function nextSlide() {}
  },
  initPagination: function initPagination(ctx, $slider, fnNextName, fnPrevName) {
    var $pagination = $slider.hasClass('c-pagination') ? $slider : $slider.find('.c-pagination');
    $pagination.on('click.oax::slider:next', '.c-pagination__next', $.proxy(ctx[fnNextName], ctx));
    $pagination.on('click.oax::slider:prev', '.c-pagination__prev', $.proxy(ctx[fnPrevName], ctx));
  },
  updatePagination: function updatePagination($slider, $items, $currentItem) {
    var $pagination = $slider.hasClass('c-pagination') ? $slider : $slider.find('.c-pagination');
    var updateValue;
    var $paginationCurrent = $pagination.find('.c-pagination__current');

    if (jQuery.isNumeric($items)) {
      updateValue = $items;
    } else {
      updateValue = $items.index($currentItem) + 1;
    }

    $paginationCurrent.text(updateValue);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Slider);

/***/ }),

/***/ "./js/components/viewportAnimations.js":
/*!*********************************************!*\
  !*** ./js/components/viewportAnimations.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewportAnimations; });
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* harmony import */ var _app_fixes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/fixes.js */ "./js/app/fixes.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint one-var: [0]*/



var ViewportAnimations =
/*#__PURE__*/
function () {
  function ViewportAnimations(settings) {
    _classCallCheck(this, ViewportAnimations);

    var defaults = {
      container: 'body',
      selector: '.js--viewport',
      selector_not: ':not([data-slick])',
      selector_animation: {
        header: '.js--anim-header',
        body: '.js--anim-body',
        footer: '.js--anim-footer',
        xtra: '.js--anim-xtra'
      },
      data_duration: 'animationDuration',
      data_start: 'animationStart',
      data_end: 'animationEnd',
      data_reverse: 'animationReverse',
      data_animation_item_header: 'animationItemHeader',
      data_animation_item_body: 'animationItemBody',
      data_animation_item_footer: 'animationItemFooter',
      data_animation_item_xtra: 'animationItemXtra',
      data_animation: 'animation',
      data_animation_device: 'animationDevice',
      data_stagger_items: 'animationStaggerItems',
      data_offset: 'animationOffset'
    };
    this._defaults = defaults;
    this.options = Object.assign(defaults, settings);
    this.y = 0;
    this.scenes = [];
  }

  _createClass(ViewportAnimations, [{
    key: "init",
    value: function init() {
      var self = this;
      this.$items = $(this.options.container).find(this.options.selector + this.options.selector_not);
      this.tweenItems = []; // this.initSliderAutoplay();

      this.initEvents();
      this.initInViewClass();

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(window.OAX)) {
        OAX.vA = this;
      }
    }
  }, {
    key: "reInit",
    value: function reInit(container) {
      var self = this;
      this.options.container = container;
      this.destroy();
      this.init();
    }
  }, {
    key: "initView",
    value: function initView() {
      var self = this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$items = null;
      this.scenes = [];
      this.removeEvents();
    }
  }, {
    key: "initInViewClass",
    value: function initInViewClass() {
      var self = this;
      var $itemsSections = $(this.options.container).find('.c-section');

      if ($itemsSections.length) {
        $itemsSections.each(function (i, el) {
          var trigger = $(el).parent('.pin-spacer').length ? $(el).parent('.pin-spacer') : el;
          ScrollTrigger.create({
            trigger: trigger,
            onToggle: function onToggle(_self) {
              $(el)[_self.isActive ? 'addClass' : 'removeClass']('is-in-view');
            },
            start: 'top bottom',
            end: 'bottom top'
          });
        });
      }

      var $addClassEls = $(this.options.container).find("".concat(this.options.selector, "--class[data-animation-class]"));

      if ($addClassEls.length) {
        $addClassEls.each(function (i, el) {
          var trigger = $(el).parent('.pin-spacer').length ? $(el).parent('.pin-spacer') : el;
          var triggerClass = $(trigger).data('animationClass');
          ScrollTrigger.create({
            trigger: trigger,
            onToggle: function onToggle(_self) {
              $(el)[_self.isActive ? 'addClass' : 'removeClass'](triggerClass);
            },
            start: 'top bottom',
            end: 'bottom top'
          });
        });
      }

      $(document).trigger('OAX::viewport-animations:init-general', [this.$items]);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var self = this;
      var y = 0;
      var justPlayVideos = true;
      this.$items.each(function (i, el) {
        var $item = $(el);
        var isMarkers = Boolean(_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationMarkers')));
        var duration = self.getAnimationOption($item, self.options.data_duration, 0.85);
        var offset = self.getAnimationOption($item, self.options.data_offset, 0);
        var reverse = self.getAnimationOption($item, self.options.data_reverse, false);
        var animationType = self.getAnimationOption($item, self.options.data_animation, 'fadeIn');
        var tween = gsap.timeline({
          defaults: {
            duration: duration,
            ease: 'power2'
          }
        });
        var animationStart = self.getAnimationOption($item, self.options.data_start, 'top+=17.5% bottom');
        var animationEnd = self.getAnimationOption($item, self.options.data_end, 'bottom top');
        var tweenOnStart = false;
        var tweenOnToggle = false;
        var tweenOnUpdate = false;
        var tweenOverwrite = false;
        var tweenItem = el;
        var scrollTriggerOptions = {};
        var tweenOptions;
        /**
         * Animation Types (Tweens)
         */

        if (animationType === 'fadeInUp') {
          tweenOptions = {
            y: 30,
            autoAlpha: 0
          };
        } else if (animationType === 'staggerFadeInUp' && _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data(self.options.data_stagger_items))) {
          tweenItem = $($item).find($item.data(self.options.data_stagger_items));
          tweenOptions = {
            y: 30,
            autoAlpha: 0,
            stagger: self.getAnimationOption($item, "".concat(self.options.data_duration, "Item"), 0.2)
          };
        } else if (animationType === 'fadeInDown') {
          tweenOptions = {
            y: -30,
            autoAlpha: 0
          };
        } else if (animationType === 'fadeInLeft') {
          tweenOptions = {
            x: -30,
            autoAlpha: 0
          };
        } else if (animationType === 'fadeInRight') {
          tweenOptions = {
            x: 30,
            autoAlpha: 0
          };
        } else if (animationType === 'splitWords') {
          var tweenSplit;
          gsap.set(tweenItem, {
            overflow: 'hidden'
          });

          if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationChilds'))) {
            tweenSplit = {};
            tweenSplit.chars = [];
            tweenSplit.lines = [];
            tweenSplit.words = [];
            $item.find('> *').each(function (_i, _el) {
              var _tweenSplit = new SplitText(_el, {
                type: 'lines,words,chars',
                linesClass: 'overflow-hidden js--text-split--line',
                wordsClass: 'overflow-hidden js--text-split--word'
              });

              tweenSplit.chars.push(_tweenSplit.chars);
              tweenSplit.words.push(_tweenSplit.words);
              tweenSplit.lines.push(_tweenSplit.lines);
            });
            tweenItem = tweenSplit.words;
          } else {
            tweenSplit = new SplitText(tweenItem, {
              type: 'lines,words,chars',
              linesClass: 'overflow-hidden js--text-split--lines',
              wordsClass: 'overflow-hidden js--text-split--words'
            });
            tweenItem = tweenSplit.words;
          }

          tweenOptions = {
            y: '100%',
            stagger: 0.1
          };
        } else if (animationType === 'content') {
          tweenOverwrite = true;

          var _tweenSplit2;

          var tweenHeader = [];
          var animHeader = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationItemHeader')) ? $item.find($item.data('animationItemHeader')) : $item.find('.js--anim-header');
          var animContent = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationItemContent')) ? $item.find($item.data('animationItemContent')) : $item.find('.js--anim-content');
          var animFooter = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationItemFooter')) ? $item.find($item.data('animationItemFooter')) : $item.find('.js--anim-footer');
          var animXtra = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationItemXtra')) ? $item.find($item.data('animationItemXtra')) : $item.find('.js--anim-xtra'); // console.log( animContent, animFooter, animHeader );

          if (animHeader.length) {
            _tweenSplit2 = {};
            _tweenSplit2.chars = [];
            _tweenSplit2.lines = [];
            _tweenSplit2.words = [];
            var animHeaderItems = animHeader.find('> *');

            if (!animHeaderItems.length) {
              animHeaderItems = animHeader;
            }

            if (animHeader.find(' > br ').length) {
              animHeaderItems = animHeader;
            }

            animHeaderItems.each(function (_i, _el) {
              /*
               * const _tweenSplit = new SplitText( _el, {
               * type: 'lines,words,chars',
               * linesClass: 'overflow-hidden js--text-split--lines',
               * wordsClass: 'overflow-hidden whitespace-no-wrap js--text-split--words',      
               * } );
               * tweenSplit.chars.push( _tweenSplit.chars );
               * tweenSplit.words.push( _tweenSplit.words );
               * tweenSplit.lines.push( _tweenSplit.lines );
               */
              tweenHeader.push(_el);
            });
            tween.addLabel('start').from(tweenHeader, {
              y: 20,
              autoAlpha: 0,
              stagger: 0.075
            }, 0).addLabel('animHeader');
          }

          if (animContent.length) {
            tween.from(animContent, {
              y: 20,
              autoAlpha: 0
            }, self.getAnimationOption(animContent, 'animationContentTiming', 'start+=0.2')).addLabel('animContent');
          }

          if (animFooter.length) {
            tween.from(animFooter, {
              y: 20,
              autoAlpha: 0
            }, self.getAnimationOption(animFooter, 'animationFooterTiming', 'start+=0.35')).addLabel('animFooter');
          }

          if (animXtra.length) {
            tween.from(animXtra, {
              y: 30,
              autoAlpha: 0
            }, self.getAnimationOption(animXtra, 'animationXtraTiming', 'start+=0.2')).addLabel('animXtra');
          }
        } else {
          tweenOptions = {
            autoAlpha: 0
          };
        }

        if (!tweenOverwrite) {
          tween.from(tweenItem, tweenOptions);
        }

        scrollTriggerOptions = {
          animation: tween,
          trigger: $item,
          markers: Boolean(isMarkers),
          start: animationStart,
          end: animationEnd
        };

        if (reverse && tweenOnUpdate === false) {
          scrollTriggerOptions.toggleActions = 'play none none reverse';
        }

        if (tweenOnUpdate !== false) {
          delete scrollTriggerOptions.animation;
          scrollTriggerOptions.onUpdate = tweenOnUpdate;

          if (animationType === 'videoScrub') {
            scrollTriggerOptions.scrub = true;
            scrollTriggerOptions.pin = true;

            if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(justPlayVideos) && justPlayVideos === true) {
              scrollTriggerOptions.scrub = false;
              scrollTriggerOptions.pin = false;
              delete scrollTriggerOptions.onUpdate;
              scrollTriggerOptions.onToggle = tweenOnToggle;
            }
          }

          if (tweenOnStart !== false) {
            scrollTriggerOptions.onStart = tweenOnStart;
          }
        } // self.createScrolltrigger( scrollTriggerOptions );


        var tweenTriggerItem = ScrollTrigger.create(scrollTriggerOptions);
        self.tweenItems.push(tweenTriggerItem);
      });
      $(document).trigger('OAX::viewport-animations:init-elements', [this.$items]);
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {}
  }, {
    key: "initSliderAutoplay",
    value: function initSliderAutoplay() {
      var self = this;
      var $slickSliders = $('.js--viewport.js--slider[data-slick]');

      if ($slickSliders.length) {
        $slickSliders.each(function (i, el) {
          var $item = $(el);
          var triggerHook = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('triggerHook')) ? $item.data('triggerHook') : 0.85;
          var triggerDelay = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('viewportDelay')) ? $item.data('viewportDelay') : 1;
        });
      }
    }
  }, {
    key: "getAnimationOption",
    value: function getAnimationOption($item) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _default = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var optionsArr = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data(option)) ? $item.data(option) : _default;

      var _return;

      if ($.isArray(optionsArr)) {
        if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile()) {
          if (_typeof(optionsArr[1]) === 'object' && optionsArr[1] !== null) {
            _return = JSON.parse(optionsArr[1]);
          } else {
            _return = optionsArr[1];
          }
        } else if (_typeof(optionsArr[0]) === 'object' && optionsArr[0] !== null) {
          _return = JSON.parse(optionsArr[0]);
        } else {
          _return = optionsArr[0];
        }
      } else if (_typeof(optionsArr) === 'object' && optionsArr !== null) {
        _return = JSON.parse(optionsArr);
      } else {
        _return = optionsArr;
      }

      return _return;
    }
  }, {
    key: "createScrolltrigger",
    value: function createScrolltrigger() {}
  }, {
    key: "setupAnimation",
    value: function setupAnimation(item, options) {}
  }, {
    key: "addScene",
    value: function addScene(scene) {// deprecated
    }
  }]);

  return ViewportAnimations;
}();



/***/ }),

/***/ "./js/components/woocommerce.js":
/*!**************************************!*\
  !*** ./js/components/woocommerce.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WooCommerce; });
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint require-jsdoc: [0]*/

/* eslint no-inner-declarations: [0]*/

/**
 * File woocommerce.js.
 *
 * Handles Woocommerce.
 */


var WooCommerce =
/*#__PURE__*/
function () {
  function WooCommerce(settings) {
    _classCallCheck(this, WooCommerce);

    var defaults = {
      features: {
        WooVariationSwatches: 1,
        Germanized: 1
      },
      container: 'body',
      product: {
        variationsForm: '.variations_form',
        buyBtn: '.single_add_to_cart_button',
        swatchesLoaded: 'wvs-loaded'
      }
    };
    this._defaults = defaults;
    this.options = Object.assign(defaults, settings);

    this._addJQuerySerializeInput();

    this.addEventListener();
  }

  _createClass(WooCommerce, [{
    key: "init",
    value: function init(_container) {
      var container = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(_container) ? _container : this.options.container;
      var $container = $(container);
      var namespace = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($container.data('barbaNamespace')) ? $container.data('barbaNamespace') : null;

      if (namespace !== null) {
        this.addEventListener(container);

        if (namespace === 'product') {
          this.initProductDetail($container);
        }
      } else {
        // only first init
        $container = $container.find(OAX.APP.options.selector.siteInner);
        container = $container[0];
        namespace = $container.data('barbaNamespace');

        if (namespace === 'product') {
          this.addEventListener(container);
        }
      }
      /*
       * --- wishlist support
       * $(document).trigger( 'yith_wcwl_init' );
       */

    }
  }, {
    key: "initProductDetail",
    value: function initProductDetail($container) {
      var $variationForm = $container.find(this.options.product.variationsForm);
      var $buyButton = $container.find(this.options.product.buyBtn);

      if ($variationForm.length) {
        if (OAX.debug) {
          console.log('init: wc_variation_form');
        }

        $variationForm.wc_variation_form();

        if (this.options.features.Germanized) {
          if (OAX.debug) {
            console.log('init: GERMANIZED: wc_variation_form');
          }

          if (typeof wc_gzd_add_to_cart_variation_params !== 'undefined') {
            // eslint-disable-line          
            $variationForm.wc_germanized_variation_form();
          }
        }

        if (this.options.features.WooVariationSwatches && !$variationForm.hasClass(this.options.product.swatchesLoaded)) {
          if (OAX.debug) {
            console.log('init: WooVariationSwatches');
          }

          $variationForm.WooVariationSwatches(); // eslint-disable-line
        }
      }
    }
  }, {
    key: "initVariationAddToCart",
    value: function initVariationAddToCart() {
      /**
       * Stores the default text for an element so it can be reset later
       */

      /*
       * $.fn.wc_set_content
       * $.fn.wc_variations_image_update
       */
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(_container) {
      var container = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(_container) ? _container : null;

      if (container === null) {
        $(document).on('click.oax::add-to-cart', '.single_add_to_cart_button:not(.disabled)', this.onVariationAddToCart);
        $(document.body).on('added_to_cart', this.onAddedToCard);
      } else {
        var $container = $(container);
        var namespace = $container.data('barbaNamespace');
        var $variationForm = $container.find(this.options.product.variationsForm);

        if (namespace === 'product') {
          $variationForm.on('show_variation', this.onShowVariation);

          if (this.options.features.Germanized) {
            $variationForm.on('germanized_variation_data', this.onGermanizedVariationData);
          }
        }
      }
    }
  }, {
    key: "onAddedToCard",
    value: function onAddedToCard(event, fragments, cartHash, $button) {
      console.log('onaddadetocart', event, fragments, cartHash, $button);
    }
  }, {
    key: "onShowVariation",
    value: function onShowVariation(event, variationData, keineAhnung) {
      console.log(event, variationData);
    }
  }, {
    key: "onGermanizedVariationData",
    value: function onGermanizedVariationData(event, variationData, $wrapper) {
      console.log(event, variationData);
      var $container = $(event.target).closest('[data-barba="container"]');

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(variationData.price_html) && variationData.price_html !== '') {
        $container.find('.js--product-price').html(variationData.price_html);
      }
    }
  }, {
    key: "onVariationAddToCart",
    value: function onVariationAddToCart(event) {
      var $thisbutton = $(event.target);
      var $form = $thisbutton.closest('form.cart');
      /*
       * quantity = $form.find('input[name=quantity]').val() || 1,
       * product_id = $form.find('input[name=variation_id]').val() || $thisbutton.val(),
       */

      var data = $form.find('input:not([name="product_id"]), select, button, textarea').serializeInputs() || 0;
      $.each(data, function (i, item) {
        if (item.name === 'add-to-cart') {
          item.name = 'product_id';
          item.value = $form.find('input[name=variation_id]').val() || $thisbutton.val();
        }
      });
      $(document.body).trigger('adding_to_cart', [$thisbutton, data]);
      $.ajax({
        type: 'POST',
        url: woocommerce_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'),
        data: data,
        beforeSend: function beforeSend(response) {
          $thisbutton.removeClass('added').addClass('loading');
        },
        complete: function complete(response) {
          $thisbutton.addClass('added').removeClass('loading');
        },
        success: function success(response) {
          if (response.error && response.product_url) {
            window.location = response.product_url;
            return;
          }

          $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $thisbutton]);
        }
      });
      event.preventDefault();
    }
    /* eslint-disable */

  }, {
    key: "_addJQuerySerializeInput",
    value: function _addJQuerySerializeInput() {
      $.fn.serializeInputs = function () {
        var rCRLF = /\r?\n/g;
        return this.map(function () {
          return this.elements ? jQuery.makeArray(this.elements) : this;
        }).map(function (i, elem) {
          var val = jQuery(this).val();

          if (val == null) {
            return val == null;
          } else if (this.type == 'checkbox' && this.checked === false) {
            return {
              name: this.name,
              value: this.checked ? this.value : ''
            };
          }

          return jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, '\r\n')
            };
          }) : {
            name: elem.name,
            value: val.replace(rCRLF, '\r\n')
          };
        }).get();
      };
    }
    /* eslint-enable */

  }]);

  return WooCommerce;
}();



/***/ }),

/***/ "./js/lib/jquery.scrolllock.js":
/*!*************************************!*\
  !*** ./js/lib/jquery.scrolllock.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint require-jsdoc: [0] */

/* eslint no-use-before-define: [0] */

/* eslint brace-style: [0] */
jQuery.scrollLock = function scrollLockClosure() {
  var $html = jQuery('html'),
      // State: unlocked by default
  locked = false,
      // State: scroll to revert to
  prevScroll = {
    scrollLeft: jQuery(window).scrollLeft(),
    scrollTop: jQuery(window).scrollTop()
  },
      // State: styles to revert to
  prevStyles = {},
      lockStyles = {
    'overflow-y': 'scroll',
    position: 'fixed',
    width: '100%'
  }; // Instantiate cache in case someone tries to unlock before locking

  saveStyles(); // Save context's inline styles in cache

  function saveStyles() {
    var styleAttr = $html.attr('style'),
        styleStrs = [],
        styleHash = {};

    if (!styleAttr) {
      return;
    }

    styleStrs = styleAttr.split(/;\s/);
    jQuery.each(styleStrs, function (styleString) {
      if (!styleString) {
        return;
      }

      var keyValue = styleString.split(/\s:\s/);

      if (keyValue.length < 2) {
        return;
      }

      styleHash[keyValue[0]] = keyValue[1];
    });
    jQuery.extend(prevStyles, styleHash);
  }

  function lock() {
    var appliedLock = {}; // Duplicate execution will break DOM statefulness

    if (locked) {
      return;
    } // Save scroll state...


    prevScroll = {
      scrollLeft: jQuery(window).scrollLeft(),
      scrollTop: jQuery(window).scrollTop()
    }; // ...and styles

    saveStyles(); // Compose our applied CSS

    jQuery.extend(appliedLock, lockStyles, {
      // And apply scroll state as styles
      left: "".concat(-prevScroll.scrollLeft, "px"),
      top: "".concat(-prevScroll.scrollTop, "px")
    }); // Then lock styles...

    $html.css(appliedLock); // ...and scroll state

    jQuery(window).scrollLeft(0).scrollTop(0);
    locked = true;
  }

  function unlock() {
    // Duplicate execution will break DOM statefulness
    if (!locked) {
      return;
    } // Revert styles


    $html.attr('style', jQuery('<x>').css(prevStyles).attr('style') || ''); // Revert scroll values

    jQuery(window).scrollLeft(prevScroll.scrollLeft).scrollTop(prevScroll.scrollTop);
    locked = false;
  }

  return function scrollLock(on) {
    // If an argument is passed, lock or unlock depending on truthiness
    if (arguments.length) {
      if (on) {
        lock();
      } else {
        unlock();
      }
    } // Otherwise, toggle
    else if (locked) {
        unlock();
      } else {
        lock();
      }
  };
}();

/***/ }),

/***/ "./js/lib/jquery.serializeObject.js":
/*!******************************************!*\
  !*** ./js/lib/jquery.serializeObject.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$.fn.serializeObject = function () {
  "use strict";

  var a = {},
      b = function b(_b, c) {
    var d = a[c.name];
    "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value;
  };

  return $.each(this.serializeArray(), b), a;
};

/***/ }),

/***/ "./js/lib/pace.min.js":
/*!****************************!*\
  !*** ./js/lib/pace.min.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable */

/*!
 * pace.js v1.2.4
 * https://github.com/CodeByZach/pace/
 * Licensed MIT © HubSpot, Inc.
 */
!function () {
  function o(t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  }

  var u,
      c,
      i,
      s,
      n,
      y,
      t,
      l,
      v,
      r,
      a,
      p,
      e,
      h,
      w,
      b,
      f,
      g,
      _d,
      m,
      k,
      S,
      q,
      L,
      x,
      P,
      T,
      R,
      j,
      O,
      E,
      M,
      A,
      C,
      N,
      _,
      F,
      U,
      W,
      X,
      D,
      H,
      I,
      z,
      G,
      B,
      J = [].slice,
      K = {}.hasOwnProperty,
      Q = function Q(t, e) {
    for (var n in e) {
      K.call(e, n) && (t[n] = e[n]);
    }

    function r() {
      this.constructor = t;
    }

    return r.prototype = e.prototype, t.prototype = new r(), t.__super__ = e.prototype, t;
  },
      V = [].indexOf || function (t) {
    for (var e = 0, n = this.length; e < n; e++) {
      if (e in this && this[e] === t) return e;
    }

    return -1;
  };

  function Y() {}

  for (g = {
    className: "",
    catchupTime: 100,
    initialRate: .03,
    minTime: 250,
    ghostTime: 100,
    maxProgressPerFrame: 20,
    easeFactor: 1.25,
    startOnPageLoad: !0,
    restartOnPushState: !0,
    restartOnRequestAfter: 500,
    target: "body",
    elements: {
      checkInterval: 100,
      selectors: ["body"]
    },
    eventLag: {
      minSamples: 10,
      sampleCount: 3,
      lagThreshold: 3
    },
    ajax: {
      trackMethods: ["GET"],
      trackWebSockets: !0,
      ignoreURLs: []
    }
  }, P = function P() {
    var t;
    return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date();
  }, R = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, f = window.cancelAnimationFrame || window.mozCancelAnimationFrame, p = function p(t, e, n) {
    if ("function" == typeof t.addEventListener) return t.addEventListener(e, n, !1);
    var r;
    "function" != typeof t["on" + e] || "object" != _typeof(t["on" + e].eventListeners) ? (r = new s(), "function" == typeof t["on" + e] && r.on(e, t["on" + e]), t["on" + e] = function (t) {
      return r.trigger(e, t);
    }, t["on" + e].eventListeners = r) : r = t["on" + e].eventListeners, r.on(e, n);
  }, null == R && (R = function R(t) {
    return setTimeout(t, 50);
  }, f = function f(t) {
    return clearTimeout(t);
  }), O = function O(e) {
    var n = P(),
        r = function r() {
      var t = P() - n;
      return 33 <= t ? (n = P(), e(t, function () {
        return R(r);
      })) : setTimeout(r, 33 - t);
    };

    return r();
  }, j = function j() {
    var t = arguments[0],
        e = arguments[1],
        n = 3 <= arguments.length ? J.call(arguments, 2) : [];
    return "function" == typeof t[e] ? t[e].apply(t, n) : t[e];
  }, _d = function d() {
    for (var t, e, n, r = arguments[0], s = 2 <= arguments.length ? J.call(arguments, 1) : [], o = 0, i = s.length; o < i; o++) {
      if (e = s[o]) for (t in e) {
        K.call(e, t) && (n = e[t], null != r[t] && "object" == _typeof(r[t]) && null != n && "object" == _typeof(n) ? _d(r[t], n) : r[t] = n);
      }
    }

    return r;
  }, h = function h(t) {
    for (var e, n, r = e = 0, s = 0, o = t.length; s < o; s++) {
      n = t[s], r += Math.abs(n), e++;
    }

    return r / e;
  }, k = function k(t, e) {
    var n, r;

    if (null == t && (t = "options"), null == e && (e = !0), r = document.querySelector("[data-pace-" + t + "]")) {
      if (n = r.getAttribute("data-pace-" + t), !e) return n;

      try {
        return JSON.parse(n);
      } catch (t) {
        return "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", t) : void 0;
      }
    }
  }, Y.prototype.on = function (t, e, n, r) {
    var s;
    return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (s = this.bindings)[t] && (s[t] = []), this.bindings[t].push({
      handler: e,
      ctx: n,
      once: r
    });
  }, Y.prototype.once = function (t, e, n) {
    return this.on(t, e, n, !0);
  }, Y.prototype.off = function (t, e) {
    var n, r, s;

    if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
      if (null == e) return delete this.bindings[t];

      for (n = 0, s = []; n < this.bindings[t].length;) {
        this.bindings[t][n].handler === e ? s.push(this.bindings[t].splice(n, 1)) : s.push(n++);
      }

      return s;
    }
  }, Y.prototype.trigger = function () {
    var t,
        e,
        n,
        r,
        s,
        o,
        i = arguments[0],
        a = 2 <= arguments.length ? J.call(arguments, 1) : [];

    if (null != (r = this.bindings) && r[i]) {
      for (n = 0, o = []; n < this.bindings[i].length;) {
        e = (s = this.bindings[i][n]).handler, t = s.ctx, s = s.once, e.apply(null != t ? t : this, a), s ? o.push(this.bindings[i].splice(n, 1)) : o.push(n++);
      }

      return o;
    }
  }, B = Y, y = window.Pace || {}, window.Pace = y, _d(y, B.prototype), T = y.options = _d({}, g, window.paceOptions, k()), X = 0, H = (z = ["ajax", "document", "eventLag", "elements"]).length; X < H; X++) {
    !0 === T[C = z[X]] && (T[C] = g[C]);
  }

  function Z() {
    return Z.__super__.constructor.apply(this, arguments);
  }

  function $() {
    this.progress = 0;
  }

  function tt() {
    this.bindings = {};
  }

  function et() {
    var e,
        o = this;
    et.__super__.constructor.apply(this, arguments), e = function e(r) {
      var s = r.open;
      return r.open = function (t, e, n) {
        return A(t) && o.trigger("request", {
          type: t,
          url: e,
          request: r
        }), s.apply(r, arguments);
      };
    }, window.XMLHttpRequest = function (t) {
      t = new W(t);
      return e(t), t;
    };

    try {
      m(window.XMLHttpRequest, W);
    } catch (t) {}

    if (null != U) {
      window.XDomainRequest = function () {
        var t = new U();
        return e(t), t;
      };

      try {
        m(window.XDomainRequest, U);
      } catch (t) {}
    }

    if (null != F && T.ajax.trackWebSockets) {
      window.WebSocket = function (t, e) {
        var n = null != e ? new F(t, e) : new F(t);
        return A("socket") && o.trigger("request", {
          type: "socket",
          url: t,
          protocols: e,
          request: n
        }), n;
      };

      try {
        m(window.WebSocket, F);
      } catch (t) {}
    }
  }

  function nt() {
    this.complete = o(this.complete, this);
    var t = this;
    this.elements = [], S().on("request", function () {
      return t.watch.apply(t, arguments);
    });
  }

  function rt(t) {
    var e, n, r, s;

    for (null == t && (t = {}), this.complete = o(this.complete, this), this.elements = [], null == t.selectors && (t.selectors = []), n = 0, r = (s = t.selectors).length; n < r; n++) {
      e = s[n], this.elements.push(new i(e, this.complete));
    }
  }

  function st(t, e) {
    this.selector = t, this.completeCallback = e, this.progress = 0, this.check();
  }

  function ot() {
    var t,
        e,
        n = this;
    this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function () {
      return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0;
    };
  }

  function it(t) {
    this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = T.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = j(this.source, "progress"));
  }

  B = Error, Q(Z, B), n = Z, $.prototype.getElement = function () {
    var t;

    if (null == this.el) {
      if (!(t = document.querySelector(T.target))) throw new n();
      this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/(pace-done )|/, "pace-running ");
      var e = "" !== T.className ? " " + T.className : "";
      this.el.innerHTML = '<div class="pace-progress' + e + '">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el);
    }

    return this.el;
  }, $.prototype.finish = function () {
    var t = this.getElement();
    return t.className = t.className.replace("pace-active", "pace-inactive"), document.body.className = document.body.className.replace("pace-running ", "pace-done ");
  }, $.prototype.update = function (t) {
    return this.progress = t, y.trigger("progress", t), this.render();
  }, $.prototype.destroy = function () {
    try {
      this.getElement().parentNode.removeChild(this.getElement());
    } catch (t) {
      n = t;
    }

    return this.el = void 0;
  }, $.prototype.render = function () {
    var t, e, n, r, s, o, i;
    if (null == document.querySelector(T.target)) return !1;

    for (t = this.getElement(), r = "translate3d(" + this.progress + "%, 0, 0)", s = 0, o = (i = ["webkitTransform", "msTransform", "transform"]).length; s < o; s++) {
      e = i[s], t.children[0].style[e] = r;
    }

    return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), 100 <= this.progress ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + n)), y.trigger("change", this.progress), this.lastRenderedProgress = this.progress;
  }, $.prototype.done = function () {
    return 100 <= this.progress;
  }, c = $, tt.prototype.trigger = function (t, e) {
    var n, r, s, o, i;

    if (null != this.bindings[t]) {
      for (i = [], r = 0, s = (o = this.bindings[t]).length; r < s; r++) {
        n = o[r], i.push(n.call(this, e));
      }

      return i;
    }
  }, tt.prototype.on = function (t, e) {
    var n;
    return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e);
  }, s = tt, W = window.XMLHttpRequest, U = window.XDomainRequest, F = window.WebSocket, m = function m(t, e) {
    var n,
        r = [];

    for (n in e.prototype) {
      try {
        null == t[n] && "function" != typeof e[n] ? "function" == typeof Object.defineProperty ? r.push(Object.defineProperty(t, n, {
          get: function (t) {
            return function () {
              return e.prototype[t];
            };
          }(n),
          configurable: !0,
          enumerable: !0
        })) : r.push(t[n] = e.prototype[n]) : r.push(void 0);
      } catch (t) {
        0;
      }
    }

    return r;
  }, L = [], y.ignore = function () {
    var t = arguments[0],
        e = 2 <= arguments.length ? J.call(arguments, 1) : [];
    return L.unshift("ignore"), e = t.apply(null, e), L.shift(), e;
  }, y.track = function () {
    var t = arguments[0],
        e = 2 <= arguments.length ? J.call(arguments, 1) : [];
    return L.unshift("track"), e = t.apply(null, e), L.shift(), e;
  }, A = function A(t) {
    if (null == t && (t = "GET"), "track" === L[0]) return "force";

    if (!L.length && T.ajax) {
      if ("socket" === t && T.ajax.trackWebSockets) return !0;
      if (t = t.toUpperCase(), 0 <= V.call(T.ajax.trackMethods, t)) return !0;
    }

    return !1;
  }, Q(et, s), t = et, D = null, M = function M(t) {
    for (var e, n = T.ajax.ignoreURLs, r = 0, s = n.length; r < s; r++) {
      if ("string" == typeof (e = n[r])) {
        if (-1 !== t.indexOf(e)) return !0;
      } else if (e.test(t)) return !0;
    }

    return !1;
  }, (S = function S() {
    return D = null == D ? new t() : D;
  })().on("request", function (t) {
    var o,
        i = t.type,
        a = t.request,
        e = t.url;
    if (!M(e)) return y.running || !1 === T.restartOnRequestAfter && "force" !== A(i) ? void 0 : (o = arguments, "boolean" == typeof (e = T.restartOnRequestAfter || 0) && (e = 0), setTimeout(function () {
      var t,
          e,
          n,
          r,
          s = "socket" === i ? a.readyState < 1 : 0 < (s = a.readyState) && s < 4;

      if (s) {
        for (y.restart(), r = [], t = 0, e = (n = y.sources).length; t < e; t++) {
          if ((C = n[t]) instanceof u) {
            C.watch.apply(C, o);
            break;
          }

          r.push(void 0);
        }

        return r;
      }
    }, e));
  }), nt.prototype.watch = function (t) {
    var e = t.type,
        n = t.request,
        t = t.url;
    if (!M(t)) return n = new ("socket" === e ? r : a)(n, this.complete), this.elements.push(n);
  }, nt.prototype.complete = function (e) {
    return this.elements = this.elements.filter(function (t) {
      return t !== e;
    });
  }, u = nt, a = function a(e, n) {
    var t,
        r,
        s,
        o,
        i = this;
    if (this.progress = 0, null != window.ProgressEvent) for (p(e, "progress", function (t) {
      return t.lengthComputable ? i.progress = 100 * t.loaded / t.total : i.progress = i.progress + (100 - i.progress) / 2;
    }), t = 0, r = (o = ["load", "abort", "timeout", "error"]).length; t < r; t++) {
      p(e, o[t], function () {
        return n(i), i.progress = 100;
      });
    } else s = e.onreadystatechange, e.onreadystatechange = function () {
      var t;
      return 0 === (t = e.readyState) || 4 === t ? (n(i), i.progress = 100) : 3 === e.readyState && (i.progress = 50), "function" == typeof s ? s.apply(null, arguments) : void 0;
    };
  }, r = function r(t, e) {
    for (var n, r = this, s = this.progress = 0, o = (n = ["error", "open"]).length; s < o; s++) {
      p(t, n[s], function () {
        return e(r), r.progress = 100;
      });
    }
  }, rt.prototype.complete = function (e) {
    return this.elements = this.elements.filter(function (t) {
      return t !== e;
    });
  }, k = rt, st.prototype.check = function () {
    var t = this;
    return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
      return t.check();
    }, T.elements.checkInterval);
  }, st.prototype.done = function () {
    return this.completeCallback(this), this.completeCallback = null, this.progress = 100;
  }, i = st, ot.prototype.states = {
    loading: 0,
    interactive: 50,
    complete: 100
  }, B = ot, Q = function Q() {
    var e,
        n,
        r,
        s,
        o,
        i = this;
    this.progress = 0, o = [], s = 0, r = P(), n = setInterval(function () {
      var t = P() - r - 50;
      return r = P(), o.push(t), o.length > T.eventLag.sampleCount && o.shift(), e = h(o), ++s >= T.eventLag.minSamples && e < T.eventLag.lagThreshold ? (i.progress = 100, clearInterval(n)) : i.progress = 3 / (e + 3) * 100;
    }, 50);
  }, it.prototype.tick = function (t, e) {
    return 100 <= (e = null == e ? j(this.source, "progress") : e) && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / T.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), e = 1 - Math.pow(this.progress / 100, T.easeFactor), this.progress += e * this.rate * t, this.progress = Math.min(this.lastProgress + T.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress;
  }, v = it, b = e = _ = w = E = N = null, y.running = !1, q = function q() {
    if (T.restartOnPushState) return y.restart();
  }, null != window.history.pushState && (I = window.history.pushState, window.history.pushState = function () {
    return q(), I.apply(window.history, arguments);
  }), null != window.history.replaceState && (G = window.history.replaceState, window.history.replaceState = function () {
    return q(), G.apply(window.history, arguments);
  }), l = {
    ajax: u,
    elements: k,
    document: B,
    eventLag: Q
  }, (x = function x() {
    var t, e, n, r, s, o, i, a;

    for (y.sources = N = [], e = 0, r = (o = ["ajax", "elements", "document", "eventLag"]).length; e < r; e++) {
      !1 !== T[t = o[e]] && N.push(new l[t](T[t]));
    }

    for (n = 0, s = (a = null != (i = T.extraSources) ? i : []).length; n < s; n++) {
      C = a[n], N.push(new C(T));
    }

    return y.bar = w = new c(), E = [], _ = new v();
  })(), y.stop = function () {
    return y.trigger("stop"), y.running = !1, w.destroy(), b = !0, null != e && ("function" == typeof f && f(e), e = null), x();
  }, y.restart = function () {
    return y.trigger("restart"), y.stop(), y.start();
  }, y.go = function () {
    var m;
    return y.running = !0, w.render(), m = P(), b = !1, e = O(function (t, e) {
      w.progress;

      for (var n, r, s, o, i, a, u, c, l, p, h = a = 0, f = !0, g = u = 0, d = N.length; u < d; g = ++u) {
        for (C = N[g], i = null != E[g] ? E[g] : E[g] = [], s = c = 0, l = (r = null != (p = C.elements) ? p : [C]).length; c < l; s = ++c) {
          o = r[s], f &= (o = null != i[s] ? i[s] : i[s] = new v(o)).done, o.done || (h++, a += o.tick(t));
        }
      }

      return n = a / h, w.update(_.tick(t, n)), w.done() || f || b ? (w.update(100), y.trigger("done"), setTimeout(function () {
        return w.finish(), y.running = !1, y.trigger("hide");
      }, Math.max(T.ghostTime, Math.max(T.minTime - (P() - m), 0)))) : e();
    });
  }, y.start = function (t) {
    _d(T, t), y.running = !0;

    try {
      w.render();
    } catch (t) {
      n = t;
    }

    return document.querySelector(".pace") ? (y.trigger("start"), y.go()) : setTimeout(y.start, 50);
  },  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return y;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}.call(this);

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! headroom.js */ "../node_modules/headroom.js/dist/headroom.js");
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(headroom_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/utils.js */ "./js/app/utils.js");
/* harmony import */ var _app_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/api.js */ "./js/app/api.js");
/* harmony import */ var _app_router_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/router.js */ "./js/app/router.js");
/* harmony import */ var _app_fixes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/fixes.js */ "./js/app/fixes.js");
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _components_navigation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/navigation.js */ "./js/components/navigation.js");
/* harmony import */ var _components_viewportAnimations_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/viewportAnimations.js */ "./js/components/viewportAnimations.js");
/* harmony import */ var _components_woocommerce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/woocommerce */ "./js/components/woocommerce.js");
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint require-jsdoc: [0]*/

/* eslint no-inner-declarations: [0]*/

/**
 * Main JavaScript file.
 */

/*
 * Libs
 */
 // import { ScrollbarPlugin } from 'smooth-scrollbar';
// App Utils


 // import Modal from './components/modal.js';



 // App Components



 // import NativeWPLightbox from './components/native-wp-lightbox.js';

/**
 * Move Preloader Bar
 */

if (OAX.config.is_preloader === 'Y') {
  OAX.preloader_bar.go(60);
}
/**
 * Helpers
 */


var initModals = function initModals(container) {};
/**
 * Init Classes
 */

/*
 * Extend SmoothScrollbar
 */

/*
 * class ScrollbarModalPlugin extends ScrollbarPlugin {
 * transformDelta( delta ) {
 * if ( this.options.open ){
 * return {
 * x: 0,
 * y: 0
 * };
 * }
 *
 * return delta;
 * }
 * }
 * ScrollbarModalPlugin.pluginName = 'modal';
 * ScrollbarModalPlugin.defaultOptions = {
 * open: false
 * };
 */


var navigation = new _components_navigation_js__WEBPACK_IMPORTED_MODULE_6__["default"](),
    api = new _app_api_js__WEBPACK_IMPORTED_MODULE_2__["default"](),
    vA = new _components_viewportAnimations_js__WEBPACK_IMPORTED_MODULE_7__["default"](),
    WC = new _components_woocommerce__WEBPACK_IMPORTED_MODULE_8__["default"](); // eslint-disable

var APP = {
  options: {
    selector: {
      wrapper: '#site',
      siteBody: '#site__body',
      siteInner: '.site__inner'
    },
    classes: {
      siteIsLoading: 'site--is-loading',
      siteIsReady: 'site--is-ready',
      pageIsTransition: 'page--is-transition',
      pageIsLoading: 'page--is-loading',
      pageIsReady: 'page--is-ready'
    }
  },
  init: function init() {
    /**
     * Get Container
     */
    var container = jQuery(this.options.selector.siteBody).find("> ".concat(this.options.selector.siteInner))[0];
    /**
     * Apply Fixes
     */

    _app_fixes_js__WEBPACK_IMPORTED_MODULE_4__["default"].init();
    /**
     * Init Smooth Scrollbar
     */

    if (!_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile()) {} // this.initSmoothScroll();

    /**
     * Add Global Event Listener
     */


    this.addEventListener();
    /**
     * Move Preloader Bar
     */

    if (OAX.config.is_preloader === 'Y') {
      OAX.preloader_bar.go(75);
    }
    /**
     * Init Router
     */


    this.initRouter();
    /**
     * Init Navigation
     */

    navigation.setupNavigation();
    /**
     * Init Headroom
     */

    this.initHeadroom();
    /**
     * Responsive Iframes
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].responsiveIframes(container);
    /** 
     * Inject YouTube
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectYT(container);
    /**
     * Init Sliders
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initSliders(container);
    /**
     * Inject SVG's
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectSVG(container);
    /**
     * Init Lightbox
     */
    // NativeWPLightbox.init( container );

    /**
     * Init Instafeed
     */
    // this.initInstafeed( $( '#site__footer' )[0] );

    /**
     * Init Videos
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initVideos(container);
    /**
     * Init Modals
     */
    // initModals( container );

    /**
     * Init WooCommerce
     */

    APP.initWoocommerce();
    /**
     * Init First Page Visit
     */

    $(window).on('load', this.firstPageVisit(container));
  },

  /**
   * Add Global Event Listener
   */
  addEventListener: function addEventListener() {
    /*
     * Img Loaded
     */
    document.addEventListener('lazybeforeunveil', this.viewportLazyImage); // document.addEventListener( 'lazyloaded', this.viewportLazyImage );

    /**
     * Floating Inputs Labels
     */

    $(document).on('input.oax::floating', '.c-form__floating input', function (event) {
      var $target = $(event.target);

      if ($target.val().length && $.trim($target.val()) !== '') {
        $target.closest('.c-form__floating').addClass('has-value');
      } else {
        $target.closest('.c-form__floating').removeClass('has-value');
      }
    });
    /**
     * Contact Form 7
     */

    $(document).on('wpcf7submit.oax::cf7', function (event) {
      gsap.to('form.wpcf7-form', {
        duration: 0.3,
        opacity: 1
      });
    });
    $(document).on('submit.oax::cf7', 'form.wpcf7-form', function (event) {
      var $form = $(event.target);
      gsap.to($form, {
        duration: 0.3,
        opacity: 0.2
      });
    });
  },
  viewportLazyImage: function viewportLazyImage(event) {
    var $target = $(event.target);
    var $wrapper = $target.parent('figure.overflow-hidden.js--img-reveal');

    if ($wrapper.length) {
      var $reveal = $('<div class="inset bg-green c-image__reveal"></div>');
      $wrapper.append($reveal);
      gsap.to($reveal, {
        duration: 1,
        yPercent: -100,
        ease: 'power2.inOut',
        scrollTrigger: $wrapper[0],
        start: 'top+=44% bottom'
      });
    }
  },
  initSmoothScroll: function initSmoothScroll() {
    var scrollContainer = document.getElementById('site');
    $(scrollContainer).addClass('fixed');

    if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile()) {
      $(scrollContainer).height($(window).height());
    } else {
      $(scrollContainer).addClass('h-screen');
    }

    $('html').addClass('is-fakescroll');
    Scrollbar.use(ScrollbarModalPlugin);
    window.OAX.Scrollbar = Scrollbar.init(scrollContainer, {
      damping: 0.1,
      delegateTo: document,
      alwaysShowTracks: false
    });
    window.OAX.Scrollbar.track.xAxis.element.remove();
    ScrollTrigger.scrollerProxy('#site', {
      scrollTop: function scrollTop(value) {
        if (arguments.length) {
          window.OAX.Scrollbar.scrollTop = value;
        }

        return window.OAX.Scrollbar.scrollTop;
      }
    });
    window.OAX.Scrollbar.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({
      scroller: scrollContainer
    });
  },
  initInstafeed: function initInstafeed(container) {
    if ($(container).find('[data-instafeed]').length) {
      var $feedContainer = $(container).find('[data-instafeed]');
      var username = /[^/]*$/.exec($feedContainer.data('instafeed'))[0];
      $.instagramFeed({
        username: username,
        container: $feedContainer[0],
        display_profile: false,
        display_biography: false,
        display_gallery: true,
        display_captions: false,
        max_tries: 30,
        callback: null,
        styling: true,
        items: 6,
        items_per_row: 6,
        margin: 0,
        lazy_load: true,
        on_error: console.error,
        host: "https://images".concat(Math.random() * 3333, "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/")
      });
    }
  },

  /**
   * Init Router
   */
  initRouter: function initRouter() {
    this.ROUTER = new _app_router_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      debug: OAX.debug,
      onNewContainerLoaded: this.onNewContainerLoaded,
      onLinkClicked: this.onLinkClicked,
      onInitStateChange: this.onInitStateChange,
      onTransitionCompleted: this.onTransitionCompleted,
      onBrowserNav: this.onBrowserNav,
      preventLinks: function preventLinks(el) {
        var selectorList = ['.remove_from_wishlist', '.remove[data-product_id]', '.restore-item'];

        if ($(el).closest('.js--pagination').length !== 0) {
          return true;
        }

        if ($(el).closest('.woocommerce-product-gallery__image').length !== 0) {
          return true;
        }

        if ($(el).is(function () {
          // eslint-disable
          var _return = false;
          selectorList.forEach(function (sel) {
            if ($(el).is(sel)) {
              _return = true;
            }
          });
          return _return;
        })) {
          return true;
        }

        return false;
      },
      classes: {
        pageIsTransition: this.options.classes.pageIsTransition,
        pageIsReady: this.options.classes.pageIsReady,
        pageIsLoading: this.options.classes.pageIsLoading
      }
    });
    this.ROUTER.init();
  },

  /**
   * First Page Visit
   */
  firstPageVisit: function firstPageVisit(container) {
    var self = this;
    var namespace = $(container).data('barbaNamespace');
    var firstPageEnter = false;

    if (_app_animations_js__WEBPACK_IMPORTED_MODULE_5__["default"].hasAnimation(namespace, 'enter', 'tl')) {
      firstPageEnter = _app_animations_js__WEBPACK_IMPORTED_MODULE_5__["default"][namespace].enter({
        newContainer: container
      });
    }

    if (OAX.config.is_preloader === 'Y') {
      var dfrLogo = $.Deferred(); // eslint-disable-line

      var preloaderTimeout = setTimeout(function () {
        dfrLogo.resolve();
      }, 4000);
      $(OAX.preloader.options.logo).on(_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].onAnimationIteration(), function () {
        OAX.preloader_bar.go(85);
        $(OAX.preloader.options.logo).css('animation', 'none');
        clearTimeout(preloaderTimeout);
        dfrLogo.resolve();
      });
      /**
       * Remove Preloader
       */

      dfrLogo.done(function () {
        /**
         * Move Preloader Bar to 100% and remove
         */
        OAX.preloader_bar.go(100);
        self.removePreloader().then(function () {
          /**
           * Remove Preloader bar
           */
          $('html').removeClass(self.options.classes.pageIsLoading);
          self.onTransitionCompleted(container);

          if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(firstPageEnter) && firstPageEnter !== false) {
            firstPageEnter.play();
          }

          $(document).trigger('OAX::preloader:removed');
          $('.c-preloader__bar').remove();
        });
      });
    } else if (OAX.config.is_preloader === 'TRANSITION') {
      var preloaderTransitionDuration = 0.75;
      gsap.to($('.c-preloader .c-page-transition'), {
        duration: preloaderTransitionDuration,
        yPercent: -100,
        ease: 'circ.inOut',
        onComplete: function onComplete() {
          $(OAX.preloader.options.el).remove();
          self.onTransitionCompleted(container);

          if (!_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].cookie.hasItem('oax_preloader')) {
            _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].cookie.setItem('oax_preloader', 'TRANSITION', 600, OAX.config.url_base, '');
          }
        }
      });
      $('html').removeClass(self.options.classes.siteIsLoading);
      $('html').addClass(self.options.classes.siteIsReady);
      /**
       * Viewport Animations
       */

      vA.init();
      setTimeout(function () {
        $('html').removeClass(self.options.classes.pageIsLoading);
        $('html').addClass(self.options.classes.pageIsReady);

        if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(firstPageEnter) && firstPageEnter !== false) {
          firstPageEnter.play();
        }
      }, preloaderTransitionDuration * 1000 / 2); //
    } else {
      $('html').removeClass(self.options.classes.pageIsLoading);
      $('html').removeClass(self.options.classes.siteIsLoading);
      $('html').addClass(self.options.classes.pageIsReady);
      $('html').addClass(self.options.classes.siteIsReady);
      /**
       * Viewport Animations
       */

      setTimeout(function () {
        vA.init();
      }, 500);
      this.onTransitionCompleted(container);
    }
  },

  /**
   * Remove Preloader
   */
  removePreloader: function removePreloader() {
    var self = this;
    var preloaderDuration = 1.5;
    var tl = gsap.timeline({
      onComplete: function onComplete() {
        $(OAX.preloader.options.el).remove();
      }
    });
    jQuery('html').removeClass(self.options.classes.siteIsLoading);
    jQuery('html').addClass(self.options.classes.siteIsReady);
    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].scrollTo(0, 0);
    tl.to($(OAX.preloader.options.bg), {
      duration: preloaderDuration,
      yPercent: -100,
      ease: 'expo.inOut'
    }, 0);
    tl.to($(OAX.preloader.options.logo), {
      duration: 0.75,
      scale: 0,
      autoAlpha: 0,
      ease: 'expo.inOut'
    }, 0.3);
    setTimeout(function () {
      vA.init();
      $('html').addClass(self.options.classes.pageIsReady);
    }, preloaderDuration * 1000 / 2);
    return _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].timelinePromise(tl, 0.8);
  },

  /**
   * Init Headroom
   */
  initHeadroom: function initHeadroom() {
    var $siteHeader = $('#site__header');
    var $languageNav = $('.wpm-language-switcher');
    var siteHeader = $siteHeader.get(0);
    var headroom = new headroom_js__WEBPACK_IMPORTED_MODULE_0___default.a(siteHeader, {
      offset: 200,
      onPin: function onPin() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.pinned).removeClass(this.classes.unpinned);
        }
      },
      onUnpin: function onUnpin() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.unpinned).removeClass(this.classes.pinned);
        }
      },
      onTop: function onTop() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.top).removeClass(this.classes.notTop);
        }
      },
      onNotTop: function onNotTop() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.notTop).removeClass(this.classes.top);
        }
      },
      onBottom: function onBottom() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.bottom).removeClass(this.classes.notBottom);
        }
      },
      onNotBottom: function onNotBottom() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.notBottom).removeClass(this.classes.bottom);
        }
      }
    });
    headroom.init();
  },
  initForms: function initForms(container) {
    var $forms = $(container).find('form.wpcf7-form');

    if ($forms.length > 0 && _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(window.wpcf7)) {
      $forms.each(function (i, el) {
        wpcf7.init(el);
      });

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(window.initDragDrop) && typeof window.initDragDrop === 'function') {
        window.initDragDrop();
      }
    }
  },
  initWoocommerce: function initWoocommerce(container) {
    WC.init(container);
  },

  /**
   * On Link Clicked
   */
  onLinkClicked: function onLinkClicked(HTMLElement) {
    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].progressBar('start');
  },

  /**
   * On Browser Buttons
   */
  onBrowserNav: function onBrowserNav(url) {// console.log( url );
  },

  /**
   * On Init State Change
   */
  onInitStateChange: function onInitStateChange(url) {// console.log( url );
  },

  /**
   * On Transition Completed
   */
  onTransitionCompleted: function onTransitionCompleted(container) {
    var $container = $(container);
    var namespace = $container.data('barbaNamespace');

    if (!$container.find('.c-section--header').hasClass('is-in-view')) {
      $container.find('.c-section--header').addClass('is-in-view');
    }
  },

  /**
   * On New Container Loaded
   */
  onNewContainerLoaded: function onNewContainerLoaded(container) {
    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].progressBar('stop');
    /**
     * Fixes
     */

    _app_fixes_js__WEBPACK_IMPORTED_MODULE_4__["default"].reInit(container);
    /**
     * Navigation
     */

    navigation.setActiveState();
    /**
     * Woocommerce
     */

    APP.initWoocommerce(container);
    /**
     * Forms
     */

    APP.initForms(container);
    /**
     * Responsive Iframes
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].responsiveIframes(container);
    /** 
     * Inject YouTube
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectYT(container);
    /**
     * Init Sliders
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initSliders(container);
    /**
     * Inject SVG's
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectSVG(container);
    /**
     * Init Videos
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initVideos(container);
  }
};
$(document).ready(function () {
  APP.init();
});
window.OAX.APP = APP;

/***/ }),

/***/ "./js/skip-link-focus-fix.js":
/*!***********************************!*\
  !*** ./js/skip-link-focus-fix.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return skipLinkFocus; });
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
function skipLinkFocus() {
  var isIe = /(trident|msie)/i.test(navigator.userAgent);

  if (isIe && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
          element = document.getElementById(id);

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
}

/***/ }),

/***/ "./js/views/contact.js":
/*!*****************************!*\
  !*** ./js/views/contact.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-lines: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint prefer-const: [0]*/

/* eslint consistent-return: [0] */


var ViewContact = {
  namespace: 'template-kontakt',
  beforeAppear: function beforeAppear(data) {// console.log( this.namespace, 'beforeAppear', data );
  },
  afterAppear: function afterAppear(data) {// console.log( this.namespace, 'afterAppear', data );
  },
  beforeLeave: function beforeLeave(data) {// console.log( this.namespace, 'beforeLeave', data );
  },
  afterLeave: function afterLeave(data) {// console.log( this.namespace, 'afterLeave', data );
  },
  beforeEnter: function beforeEnter(data) {//		
  },
  afterEnter: function afterEnter(data) {// console.log( this.namespace, 'afterEnter', data );	
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ViewContact);

/***/ }),

/***/ "./js/views/home.js":
/*!**************************!*\
  !*** ./js/views/home.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* eslint-disable */

/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-lines: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint prefer-const: [0]*/

/* eslint consistent-return: [0] */


var ViewHome = {
  namespace: 'template-start',
  beforeAppear: function beforeAppear(data) {// console.log( this.namespace, 'beforeAppear', data );
  },
  afterAppear: function afterAppear(data) {// console.log( this.namespace, 'afterAppear', data );
  },
  beforeLeave: function beforeLeave(data) {// console.log( this.namespace, 'beforeLeave', data );
  },
  afterLeave: function afterLeave(data) {// console.log( this.namespace, 'afterLeave', data );
  },
  beforeEnter: function beforeEnter(data) {
    this.addEventListener(data.next.container);
  },
  afterEnter: function afterEnter(data) {// console.log( this.namespace, 'afterEnter', data );	
  },
  addEventListener: function addEventListener(container) {
    var self = this;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ViewHome);

/***/ }),

/***/ "./js/views/index.js":
/*!***************************!*\
  !*** ./js/views/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/views/home.js");
/* harmony import */ var _contact_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact.js */ "./js/views/contact.js");
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product.js */ "./js/views/product.js");
/* harmony import */ var _product_cat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-cat.js */ "./js/views/product-cat.js");
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _components_viewportAnimations_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/viewportAnimations.js */ "./js/components/viewportAnimations.js");
/* eslint one-var: [0] */






var vA = new _components_viewportAnimations_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
var Views = {
  getAll: function getAll() {
    return [_home_js__WEBPACK_IMPORTED_MODULE_0__["default"], _contact_js__WEBPACK_IMPORTED_MODULE_1__["default"], _product_js__WEBPACK_IMPORTED_MODULE_2__["default"], _product_cat_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
  },
  beforeAppearAll: function beforeAppearAll(data) {// console.log( 'beforeAppearAll', data ); 
  },
  afterAppearAll: function afterAppearAll(data) {// console.log( 'afterAppearAll', data ); 
  },
  beforeLeaveAll: function beforeLeaveAll(data) {// console.log( 'beforeLeaveAll', data ); 
  },
  onLeaveAll: function onLeaveAll(data) {},
  afterLeaveAll: function afterLeaveAll(data) {// console.log( 'afterLeaveAll', data ); 
  },
  beforeEnterAll: function beforeEnterAll(data) {
    var namespace = data.next.namespace;

    if (data.trigger === 'barba') {
      if (_app_animations_js__WEBPACK_IMPORTED_MODULE_4__["default"].hasAnimation(namespace, 'initViewportFx')) {
        setTimeout(function () {
          _app_animations_js__WEBPACK_IMPORTED_MODULE_4__["default"][namespace].initViewportFx(data.next.container);
        }, 300);
      }
    } // console.log( 'beforeEnterAll', data ); 

  },
  onEnterAll: function onEnterAll(data) {
    var namespace = data.next.namespace;

    if (_app_animations_js__WEBPACK_IMPORTED_MODULE_4__["default"].hasAnimation(namespace, 'initViewportFx')) {
      setTimeout(function () {
        _app_animations_js__WEBPACK_IMPORTED_MODULE_4__["default"][namespace].initViewportFx(data.next.container);
      }, 300);
    }
    /**
     * Viewport Animations
     */


    setTimeout(function () {
      vA.reInit(data.next.container);
    }, 450);

    if (_app_animations_js__WEBPACK_IMPORTED_MODULE_4__["default"].hasAnimation(namespace, 'enter')) {
      setTimeout(function () {
        _app_animations_js__WEBPACK_IMPORTED_MODULE_4__["default"][namespace].enter({
          newContainer: data.next.container
        });
      }, 500);
    }

    return true;
  },
  afterEnterAll: function afterEnterAll(data) {// console.log( 'afterEnterAll', data ); 
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Views);

/***/ }),

/***/ "./js/views/product-cat.js":
/*!*********************************!*\
  !*** ./js/views/product-cat.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* eslint-disable */

/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-lines: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint prefer-const: [0]*/

/* eslint consistent-return: [0] */


var ViewProductCat = {
  namespace: 'product-cat',
  beforeAppear: function beforeAppear(data) {// console.log( this.namespace, 'beforeAppear', data );
  },
  afterAppear: function afterAppear(data) {// console.log( this.namespace, 'afterAppear', data );
  },
  beforeLeave: function beforeLeave(data) {// console.log( this.namespace, 'beforeLeave', data );
  },
  afterLeave: function afterLeave(data) {// console.log( this.namespace, 'afterLeave', data );
  },
  beforeEnter: function beforeEnter(data) {
    this.addEventListener(data.next.container);
    this.initFilter(data.next.container);
  },
  afterEnter: function afterEnter(data) {// console.log( this.namespace, 'afterEnter', data );	
  },
  addEventListener: function addEventListener(container) {
    var self = this;
  },
  initFilter: function initFilter(container) {
    var $filters = $(container).find('.yith-wcan-filter');

    if ($filters.length && !$filters.find('.yith-wcan-dropdown').length) {
      $(document).trigger('yith_wcan_init_shortcodes');

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(yith_wcan_shortcodes)) {
        yith_wcan_shortcodes.base_url = location.href;
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ViewProductCat);

/***/ }),

/***/ "./js/views/product.js":
/*!*****************************!*\
  !*** ./js/views/product.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* eslint-disable */

/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-lines: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint prefer-const: [0]*/

/* eslint consistent-return: [0] */


var ViewProduct = {
  namespace: 'product',
  els: {},
  beforeAppear: function beforeAppear(data) {// console.log( this.namespace, 'beforeAppear', data );
  },
  afterAppear: function afterAppear(data) {// console.log( this.namespace, 'afterAppear', data );
  },
  beforeLeave: function beforeLeave(data) {// console.log( this.namespace, 'beforeLeave', data );
  },
  afterLeave: function afterLeave(data) {// console.log( this.namespace, 'afterLeave', data );
  },
  beforeEnter: function beforeEnter(data) {
    var self = this;
    this.initMainSlider(data.next.container);
    this.initThumbnailSlider(data.next.container);
  },
  afterEnter: function afterEnter(data) {
    // console.log( this.namespace, 'afterEnter', data );	
    this.addEventListener(data.next.container);
  },
  addEventListener: function addEventListener(container) {
    var self = this;
  },
  initMainSlider: function initMainSlider(container) {},
  initThumbnailSlider: function initThumbnailSlider(container) {}
};
/* harmony default export */ __webpack_exports__["default"] = (ViewProduct);

/***/ }),

/***/ 3:
/*!*******************************************!*\
  !*** multi ./js/main.js ./css/style.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./js/main.js */"./js/main.js");
module.exports = __webpack_require__(/*! ./css/style.scss */"./css/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map