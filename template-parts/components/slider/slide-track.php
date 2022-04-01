<?php if(isset($items)): ?>
<?php 
  $ITEMS_SHOW_SM = isset($ITEMS_SHOW_SM) ? $ITEMS_SHOW_SM : 1.15;
  $ITEMS_SHOW_LG = isset($ITEMS_SHOW_LG) ? $ITEMS_SHOW_LG : 2.9;
  $ITEMS_STYLE = isset($ITEMS_STYLE) ? $ITEMS_STYLE : 'img';
  $ITEM_STYLES = isset($ITEM_STYLES) ? $ITEM_STYLES : [
    'header_tag' => 'h3'
  ];
  $SHOW_NAV = count($items) > 3;
  $random_int = rand(pow(10, 4-1), pow(10, 4)-1);
  $xdata = isset($xdata) ? $xdata : false; 
  // $IS_MOBILE = oax_is_mobile();
?>
<div class="c-slider c-slider--slide-track c-slider--slide-track--<?= $random_int ?> w-full relative<?php if(isset($xclass) && isset($xclass['main'])): ?> <?= $xclass['main']; ?><?php endif; ?><?php if(count($items) > 1): ?> js--slider<?php endif; ?>" style="--slider-items-count: <?= count($items); ?>; --slider-items-show__sm: <?= $ITEMS_SHOW_SM; ?>; --slider-items-show__lg: <?= $ITEMS_SHOW_LG; ?>;" data-items-count="<?= count($items); ?>" data-items-show-lg="<?= $ITEMS_SHOW_LG; ?>"<?php if($xdata !== false): ?><?php foreach($xdata as $datakey => $datavalue): ?> data-<?= $datakey ?>='<?= json_encode($datavalue) ?>'<?php endforeach; ?><?php endif; ?>>
  <div class="c-slider__inner<?php if(isset($xclass) && isset($xclass['inner'])): ?> <?= $xclass['inner']; ?><?php else: ?> pb-1<?php endif; ?><?= count($items) > 1 ? ' overflow-x-scroll overflow-y-hidden' : ''; ?>">
    <div class="c-slider__track flex flex-wrap<?php if(isset($xclass) && isset($xclass['track'])): ?> <?= $xclass['track']; ?><?php else: ?> items-end pl-05<?php if($ITEMS_STYLE === 'img'): ?> md:pl-05 md:pr-05<?php else: ?> md:pl-2 md:pr-2<?php endif; ?><?php endif; ?>" style="width: <?= 100 * count($items) / $ITEMS_SHOW_SM; ?>%">
      <?php $item_i = 0; foreach($items as $item): ?>
        <div 
          class="
            c-slider__item c-slider__item--<?= $ITEMS_STYLE; ?> 
            relative
            <?php if($item_i < ceil($ITEMS_SHOW_SM)): ?> is-active<?php endif; ?>
          " 
          style="width: <?= 100 / count($items); ?>%;"
        >
          
          <?php if($ITEMS_STYLE === 'img'): ?>
            <?php echo oax_image($item); ?>
          <?php endif; ?>

        </div>
      <?php $item_i++; endforeach; ?>
    </div>
  </div>
  
  <?php /*
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
  */ ?>
</div>
<?php endif; ?>