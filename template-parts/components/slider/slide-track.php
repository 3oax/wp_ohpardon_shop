<?php if(isset($items)): ?>
<?php 
  $ITEMS_SHOW_SM = isset($ITEMS_SHOW_SM) ? $ITEMS_SHOW_SM : 1.15;
  $ITEMS_SHOW_LG = isset($ITEMS_SHOW_LG) ? $ITEMS_SHOW_LG : 2.9;
  $ITEMS_STYLE = isset($ITEMS_STYLE) ? $ITEMS_STYLE : 'post';
  $ITEM_STYLES = isset($ITEM_STYLES) ? $ITEM_STYLES : [
    'header_tag' => 'h3'
  ];
  $SHOW_NAV = count($items) > 3;
  $random_int = rand(pow(10, 4-1), pow(10, 4)-1);
  // $IS_MOBILE = oax_is_mobile();
?>
<div class="c-slider c-slider--slide-track c-slider--slide-track--<?= $random_int ?> w-full relative" style="--slider-items-count: <?= count($items); ?>; --slider-items-show__sm: <?= $ITEMS_SHOW_SM; ?>; --slider-items-show__lg: <?= $ITEMS_SHOW_LG; ?>;" data-items-count="<?= count($items); ?>" data-items-show-lg="<?= $ITEMS_SHOW_LG; ?>">
  <div class="c-slider__inner pb-2<?= count($items) > 1 ? ' overflow-scroll' : ''; ?>">
    <div class="c-slider__track flex flex-wrap pl-05<?php if($SHOW_NAV): ?> md:pl-3<?php else: ?> md:pl-05<?php endif; ?> md:pr-3 items-end mb-2" style="width: <?= 100 * count($items) / $ITEMS_SHOW_SM; ?>%">
      <?php $item_i = 0; foreach($items as $item): ?>
        <div 
          class="
            c-slider__item c-slider__item--<?= $ITEMS_STYLE; ?> 
            mb-1 md:mb-0 relative
            <?php if($item_i < ceil($ITEMS_SHOW_SM)): ?> is-active<?php endif; ?>
          " 
          style="width: <?= 100 / count($items); ?>%;"
        >
          
          <?php if($ITEMS_STYLE === 'post'): ?>

            <?= oax_get_component('box', [
              'item' => $item,
              'styles' => $ITEM_STYLES
            ]); ?>
          
          <?php elseif($ITEMS_STYLE === 'event'): ?>

            <?= oax_get_component('card', [
              'item' => $item
            ]); ?>            

          <?php endif; ?>

        </div>
      <?php $item_i++; endforeach; ?>
    </div>
  </div>
  
  <?php if($SHOW_NAV): ?>
    <div class="c-slider__nav">
      <div class="c-slider__nav-btn c-slider__nav-btn--prev bg-white absolute left-0 -mt-4 ml-15 w-3 h-3 p-075 cursor-pointer" style="top: 50%; border-radius: 50%; opacity: 0; visibility: hidden; z-index: 1;">
        <svg class="w-full h-full">
          <use href="#icon-arrow-left"></use>
        </svg>
      </div>
      <div class="c-slider__nav-btn c-slider__nav-btn--next bg-white absolute right-0 -mt-4 mr-2 w-3 h-3 p-075 cursor-pointer" style="top: 50%; border-radius: 50%; opacity: 0; visibility: hidden; z-index: 1;">
        <svg class="w-full h-full">
          <use href="#icon-arrow-right"></use>
        </svg>
      </div>
    </div>
  <?php endif; ?>

</div>

<script type="text/javascript" id="oax-js-slider-track">
  (function(){
    var initSlider = function(){
      var $slider = $('.c-slider--slide-track--<?= $random_int ?>');
      var $sliderTrack = $slider.find('.c-slider__track');
      var $sliderNav = $slider.find('.c-slider__nav');

      if($sliderNav.length){
        var $sliderNavBtn = $sliderNav.find('.c-slider__nav-btn');
        
        $sliderNavBtn.css({
          'transition' : 'all .2s linear'
        });
        
        var $slideItems = $slider.find('.c-slider__item');

        var slidesCount = $slideItems.length;
        var slidesShow = $slider.data('itemsShowLg');
        var slideWidth = $slideItems.filter(':first').outerWidth();
        
        var translateX = slideWidth * -1;
        var $currentSlides = $slideItems.filter('.is-active');
        
        var prevSlide = function(){
          var $incomingSlide = $slideItems.filter('.is-active:first').prev();
          if($incomingSlide.length){
            var incomingIndex = $slideItems.index($incomingSlide);
            
            $currentSlides.last().removeClass('is-active');
            $incomingSlide.addClass('is-active');

            if( incomingIndex > 1 ) {
              translateX = slideWidth * (incomingIndex - 1) * -1;                
              
              $sliderNavBtn.first().css({
                opacity: 1,
                visibility: 'visible'
              });
              $sliderNavBtn.last().css({
                opacity: 1,
                visibility: 'visible'
              });              

            } else {

              translateX = 0;

              $slideItems.removeClass('is-active');
              $slideItems.filter(':nth-child(1)').addClass('is-active');
              $slideItems.filter(':nth-child(2)').addClass('is-active');
              
              $sliderTrack.css('transform', 'translateX(0px)'); 

              $sliderNavBtn.first().css({
                opacity: 0,
                visibility: 'hidden'
              });
              $sliderNavBtn.last().css({
                opacity: 1,
                visibility: 'visible'
              });              
                         
            }

            $sliderTrack.css('transform', 'translateX('+ translateX +'px)');            
          }

        };
        var nextSlide = function(){
          var $incomingSlide = $slideItems.filter('.is-active:last').next();
          
          if($incomingSlide.length){
            var incomingIndex = $slideItems.index($incomingSlide);
            
            $currentSlides.first().removeClass('is-active');
            $incomingSlide.addClass('is-active');
            
            if( incomingIndex < slidesCount ) {
              if( incomingIndex == slidesCount - 1){
                translateX = slideWidth / 1.25 * (incomingIndex - 1) * -1;
                
                $sliderNavBtn.last().css({
                  opacity: 0,
                  visibility: 'hidden'
                });                                  
                $sliderNavBtn.first().css({
                  opacity: 1,
                  visibility: 'visible'
                });

              } else {
                translateX = slideWidth * (incomingIndex - 1) * -1;
                
                $sliderNavBtn.first().css({
                  opacity: 1,
                  visibility: 'visible'
                });
                $sliderNavBtn.last().css({
                  opacity: 1,
                  visibility: 'visible'
                });
              }
              
              $sliderTrack.css('transform', 'translateX('+ translateX +'px)');
            }          
            
          }
        };

        $sliderNavBtn.on('click.oax::slider-nav-btn', function(event){
          var $target = $(event.target).is('.c-slider__nav-btn') ? $(event.target) : $(event.target).closest('.c-slider__nav-btn');
          var direction = $target.hasClass('c-slider__nav-btn--prev') ? 'prev' : 'next';

          $slideItems = $slider.find('.c-slider__item');
          $currentSlides = $slideItems.filter('.is-active'); 

          if(direction == 'next'){        
            nextSlide();
          } else {
            prevSlide();
          }

        });

        $sliderTrack.css({
          'transition': 'transform .75s cubic-bezier(0.55, 0, 0.1, 1)'
        });
        $sliderNavBtn.last().css({
          opacity: 1,
          visibility: 'visible'
        });        
        $slider.find('.c-slider__inner').removeClass('overflow-scroll').addClass('overflow-hidden');
        $slider.addClass('is-init');   
      }   
    };

    if( 
      $(window).width() > 992 && 
      !(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) 
    ) {
      initSlider();
    }

  })();
</script>
<?php endif; ?>