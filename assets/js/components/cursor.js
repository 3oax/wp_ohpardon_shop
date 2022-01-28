/* eslint-disable */
class Cursor {
	constructor( settings ) {
    const defaults = {};
    this.options = Object.assign( defaults, settings );
    this.events = [];

		this.initCursor();
    this.appendStyles();
  }
  
  appendStyles(){
    let css = 'body { cursor: none !important; } body a { cursor: none !important; }';

    const head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);    
  }

	initCursor() {
		const { Back } = window;
		this.outerCursor = document.querySelector( '.circle-cursor--outer' );
		this.innerCursor = document.querySelector( '.circle-cursor--inner' );
    this.outerCursorBox = this.outerCursor.getBoundingClientRect();
    this.outerCursorOriginals = {
      width: 32,
      height: 32
    };
		this.outerCursorSpeed = 0;
		this.easing = Back.easeOut.config( 1.7 );
		this.clientX = -100;
		this.clientY = -100;
		this.showCursor = false;

		const unveilCursor = () => {
			gsap.set( this.innerCursor, {
				x: this.clientX,
				y: this.clientY
			} );
			gsap.set( this.outerCursor, {
				x: this.clientX - this.outerCursorBox.width / 2,
				y: this.clientY - this.outerCursorBox.height / 2
			} );
			setTimeout( () => {
				this.outerCursorSpeed = 0.2;
			}, 100 );
			this.showCursor = true;
		};
		document.addEventListener( 'mousemove', unveilCursor );

		document.addEventListener( 'mousemove', ( e ) => {
			this.clientX = e.clientX;
			this.clientY = e.clientY;
		} );

		const render = () => {
			gsap.set( this.innerCursor, {
				x: this.clientX,
				y: this.clientY
			} );
			if ( ! this.isStuck ) {
        gsap.to( this.outerCursor, this.outerCursorSpeed, {
					x: this.clientX - this.outerCursorOriginals.width / 2,
					y: this.clientY - this.outerCursorOriginals.height / 2
        } );
			}
			if ( this.showCursor ) {
				document.removeEventListener( 'mousemove', unveilCursor );
			}
			requestAnimationFrame( render );
		};
		requestAnimationFrame( render );
  }
  
  refresh(settings){
    this.options = Object.assign( this.options, settings );
    this.removeAllHover();
    const _events = this.events;
    this.events = [];
    this.addHover(_events);
  }
  
  addHover(hoverObj){
    if(Array.isArray(hoverObj)){
      hoverObj.forEach( ( _item ) => {
        this.events.push(_item);
        document.querySelectorAll(_item.el).forEach( ( node ) => {
          node.addEventListener( 'mouseenter', $.proxy(_item.enter, this));
          node.addEventListener( 'mouseleave', $.proxy(_item.leave, this));
        });
      } );
    } else {
      this.events.push(hoverObj);
      document.querySelectorAll(hoverObj.el).forEach( ( node ) => {
        node.addEventListener( 'mouseenter', $.proxy(hoverObj.enter, this));
        node.addEventListener( 'mouseleave', $.proxy(hoverObj.leave, this));
      });
    }
  }

  removeAllHover(){
    this.events.forEach((item) => {
      document.querySelectorAll(item.el).forEach((node) => {
        node.removeEventListener( 'mouseenter', $.proxy(item.enter, this));
        node.removeEventListener( 'mouseleave', $.proxy(item.leave, this));      
      });
    });
  }
}

export default Cursor;
