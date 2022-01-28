/* eslint one-var: [0]*/
/* eslint max-len: [0]*/
/* eslint max-params: [0]*/
/* eslint complexity: [0]*/
/* eslint no-multi-assign: [0]*/
import Utils from '../app/utils.js';

const Slider = {
	slick: {

		options: {
			selector_slider: '.js--slider:not([data-init-by])',
			selector_pagination: '.c-pagination',
			selector_pagination_next: '.c-pagination__next',
			selector_pagination_prev: '.c-pagination__prev',
			selector_pagination_nums: '.c-pagination__nums',
		},

		init( container ){
			const self = this;

			if ( $( container ).find( self.options.selector_slider ) ){
				const $sliders = $( container ).find( self.options.selector_slider );
				$sliders.each( ( i, el ) => {
					const options = {
						speed: 1000,
						cssEase: 'cubic-bezier(0.55, 0, 0.1, 1)',
						rows: 0,
						prevArrow: `<button class="w-3 h-3 slick-prev js--slider-arrow js--slider-arrow--prev text-white"><svg class="w-2 h-2 fill-current"><use xlink:href="#icon-arrow-left"></use></svg></button>`,
						nextArrow: `<button class="w-3 h-3 slick-next js--slider-arrow js--slider-arrow--next text-white"><svg class="w-2 h-2 fill-current"><use xlink:href="#icon-arrow-right"></use></svg></button>`,
					};
					const $slider = $( el );

					if ( $slider.parent().find( self.options.selector_pagination_next ).length ){
						options.nextArrow = $slider.parent().find( self.options.selector_pagination_next );
					}
          
					if ( $slider.parent().find( self.options.selector_pagination_prev ).length ){
						options.prevArrow = $slider.parent().find( self.options.selector_pagination_prev );
					} 

					if ( $slider.parent().find( self.options.selector_pagination_nums ).length ){
						$slider.on( 'beforeChange', ( event, slick, currentSlide, nextSlide ) => {
							Slider.updatePagination( $slider.parent().find( self.options.selector_pagination ), nextSlide + 1 );
						} );
					}

					if ( $slider.find( 'video' ).length ){
						$slider.on( 'afterChange', ( event, slick, currentSlide ) => {
							const $currentSlide = $( slick.$slides[currentSlide] );
							Utils.pauseVideo( $slider.find( 'video' ) );
							if ( $currentSlide.find( 'video' ).length ){
								Utils.playVideo( $currentSlide.find( 'video' ) );
							}
						} );						
					}

					if ( Utils.isMobile() && ! $slider.hasClass( 'js--slider--no-hint' ) ){
						$slider.on( 'swipe', () => {
							Utils.hint( $slider.parent().get( 0 ), 'destroy' );
						} );
						$slider.on( 'afterChange', () => {
							Utils.hint( $slider.parent().get( 0 ), 'destroy' );
						} );						
						Utils.hint( $slider.parent().get( 0 ), 'swipe' );
					}

					if ( $slider.hasClass( 'js--slider--overflow' ) ){
						// console.log()
					}

					$slider.slick( options );
				} );
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

		init( container ){
			this.options.container = container;
			// this.initSlider();
		},

		initSlider(){
			if ( 
				$( this.options.container ).find( this.options.selector_slider ).length
				&& $( this.options.container ).find( this.options.selector_slider ).find( this.options.selector_nav_btn ).length
			){
				this.addStyles();
				this.initBtns();
			}
		},

		addStyles(){

		},

		removeStyles(){

		},

		initBtns(){
			const self = this;
			const $sliderBtns = $( this.options.container ).find( this.options.selector_slider ).find( this.options.selector_nav_btn );
			
			$sliderNavBtns.on( 'click.oax::slider-nav-btn', ( event ) => {
				const $target = $( event.target ).is( '.c-slider__nav-btn' ) ? $( event.target ) : $( event.target ).closest( '.c-slider__nav-btn' );
				const direction = $target.hasClass( 'c-slider__nav-btn--prev' ) ? 'prev' : 'next';

				$slideItems = $slider.find( '.c-slider__item' );
				$currentSlides = $slideItems.filter( '.is-active' ); 

				if ( direction === 'next' ){        
					nextSlide();
				} else {
					prevSlide();
				}
			} );
		},

		prevSlide(){

		},

		nextSlide(){

		},
	},

	initPagination( ctx, $slider, fnNextName, fnPrevName ){
		const $pagination = $slider.hasClass( 'c-pagination' ) ? $slider : $slider.find( '.c-pagination' );
		$pagination.on( 'click.oax::slider:next', '.c-pagination__next', $.proxy( ctx[fnNextName], ctx ) );    
		$pagination.on( 'click.oax::slider:prev', '.c-pagination__prev', $.proxy( ctx[fnPrevName], ctx ) );
	},

	updatePagination( $slider, $items, $currentItem ){
		const $pagination = $slider.hasClass( 'c-pagination' ) ? $slider : $slider.find( '.c-pagination' );
		let updateValue;
    
		const $paginationCurrent = $pagination.find( '.c-pagination__current' );   

		if ( jQuery.isNumeric( $items ) ){
			updateValue = $items;
		} else {
			updateValue = $items.index( $currentItem ) + 1;
		}

		$paginationCurrent.text( updateValue );
	}
};

export default Slider;
