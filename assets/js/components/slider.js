/* eslint one-var: [0]*/
/* eslint max-len: [0]*/
/* eslint max-params: [0]*/
/* eslint complexity: [0]*/
/* eslint no-multi-assign: [0]*/
import Utils from '../app/utils.js';

const Slider = {

	swiper: {
		options: {
			selector_slider: '.js--slider:not([data-init-by])',
			selector_slider_inner: '.c-slider__inner',
			selector_slider_track: '.c-slider__track',
			selector_slider_item: '.c-slider__item',
			selector_pagination: '.c-pagination',
			selector_pagination_next: '.c-pagination__next',
			selector_pagination_prev: '.c-pagination__prev',
			selector_pagination_nums: '.c-pagination__nums',
		},

		init( container ){
			this.options.container = container;
			this.initSlider();
		},

		initSlider(){
			const self = this;

			if ( 
				$( this.options.container ).find( this.options.selector_slider ).length
			){
				$( this.options.container ).find( this.options.selector_slider ).each( ( i, el ) => {
					self.prepareClasses( $( el ) );
					
					const $slideInner = $( el ).find( this.options.selector_slider_inner );
					const slidesPerViewLg = getComputedStyle( el ).getPropertyValue( '--slider-items-show__lg' );
					const slidesPerViewSm = getComputedStyle( el ).getPropertyValue( '--slider-items-show__sm' );
					const $sliderItems = $( el ).find( this.options.selector_slider_item );

					const spaceBetweenSlides = this.getSpaceBetween( el );
					const swiperParams = this.getParams( el );
					const slider = new Swiper( $slideInner[0], Object.assign( {
						// Optional parameters
						cssMode: Modernizr.scrollsnappoints,
						direction: 'horizontal',
						
						loop: false,						
						rewind: false,
						
						slidesPerView: Math.round( slidesPerViewSm ),
						spaceBetween: spaceBetweenSlides,
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},						
						breakpoints: {
							992: {
								slidesPerView: Math.round( slidesPerViewLg )							
							}
						},
						watchSlidesProgress: true,
						preloadImages: false,
						lazy: {
							checkInView: true,
							enabled: true,
							loadPrevNext: true,
						},
					}, swiperParams ) );
				} );
			}			
		},

		getParams( slider ){
			const $slider = $( slider );
			if ( Utils.isset( $slider.attr( 'data-swiper' ) ) ) {
				const params = $slider.data( 'swiper' );
				if ( $slider.hasClass( 'js--slider--carousel' ) ) {
					params.on = {
						init () {
							this.autoplay.stop();
						},
					};
					// params.centeredSlides = true;
				}

				return params;
			}
 
			return {};
		},

		getSpaceBetween( slider ){
			const $slider = $( slider );
			const $sliderItems = $slider.find( this.options.selector_slider_item );
			const sliderItem = $sliderItems[0];
			const sliderItemFigure = $( sliderItem ).find( '.c-image__figure' )[0];
			const sliderItemStyle = sliderItemFigure.currentStyle || window.getComputedStyle( sliderItemFigure );			
			
			const sliderItemMarginLeft = Math.round( sliderItemStyle.marginLeft.replace( 'px', '' ) );
			const sliderItemMarginRight = Math.round( sliderItemStyle.marginRight.replace( 'px', '' ) );

			if ( sliderItemMarginLeft > 0 || sliderItemMarginRight > 0 ){
				// $slider.addClass( 'is-space-between' );
			}

			return 0;

			// return parseInt( sliderItemMarginLeft + sliderItemMarginRight, 10 );
		},

		prepareClasses( $slider ){
			$slider.addClass( 'is-init' );
			$slider.addClass( 'overflow-hidden' );

			const $sliderTrack = $slider.find( this.options.selector_slider_track );
			const $sliderInner = $slider.find( this.options.selector_slider_inner );
			const $sliderItems = $slider.find( this.options.selector_slider_item );

			$sliderInner
				.removeClass( 'overflow-x-scroll' )
				.removeClass( 'overflow-y-hidden' );
			
			$sliderTrack.addClass( 'swiper-wrapper' );
			$sliderTrack.removeClass( 'flex-wrap' );
			
			$sliderItems.addClass( 'swiper-slide' );
			
			$sliderTrack.removeAttr( 'style' );
			$sliderItems.removeAttr( 'style' );			

			if ( ! $slider.hasClass( 'js--slider--carousel' ) ){
				$sliderInner.append( '<div class="c-slider__button c-slider__button--prev swiper-button-prev"></div>' );
				$sliderInner.append( '<div class="c-slider__button c-slider__button--next swiper-button-next"></div>' );
			}
		}
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
