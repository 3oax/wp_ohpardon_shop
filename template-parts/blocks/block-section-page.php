<?php 
  $style = 'container';
  if(!empty(get_field('style'))){
    $style = get_field('style');
  }

  $type = 'content';
  if(!empty(get_field('type'))){
    $type = get_field('type');
  }

  $content_position = 'left';
  if(!empty(get_field('content_position'))){
    $content_position = get_field('content_position');  
  }

  $padding_code = 1;
  if(!empty(get_field('padding_code'))){
    $padding_code = get_field('padding_code');
  }

  $padding_class = 'py-1 md:py-1';
  if($padding_code == 2){
    $padding_class = 'py-2 md:py-2';
  }
  if($padding_code == 3){
    $padding_class = 'py-3 md:py-3';
  }
  if($padding_code == 4){
    $padding_class = 'py-3 md:py-4';
  }  
  if($padding_code == 5){
    $padding_class = 'py-4 md:py-5';
  }
?>

<section class="c-section c-section--page flex items-center <?= $padding_class; ?> overflow-hidden <?= !empty($block['className']) ? ' ' . $block['className'] : ''; ?>" data-wp-block-id="<?= $block['id']; ?>">
  <div class="c-section__bg"<?php if(!empty(get_field('bg_color')) && !is_admin()): ?> style="background-color: <?= get_field('bg_color'); ?>"<?php endif; ?>>    
    <?php if(get_field('bg') === 'img' || get_field('bg') === 'img-color'): ?>
      <?= oax_image([
        'img' => get_field('bg_img'),
        'lazy' => true,
        'xclass' => 'absolute top-0 left-0 w-full h-full object-fit-cover c-section__bg-img',
        'xattr' => [
          'aria-hidden' => 'true'
        ]
      ]); ?>
    <?php endif; ?>
  </div>
  
  
  <div class="<?php if($style === 'container'): ?>container<?php else: ?>px-1 md:px-5<?php endif; ?> relative z-content">
  
    <?php if($type == 'gallery' && !empty(get_field('gallery'))): ?>

      <?php 
        $cols = get_field('gallery_cols'); 
        $cols_class = 'w-1/2 md:w-1/2';
        if($cols == 3){
          $cols_class = 'w-1/2 md:w-1/3';  
        }
        if($cols == 4){
          $cols_class = 'w-1/2 md:w-1/4';  
        }          
        if($cols == 5){
          $cols_class = 'w-1/2 md:w-1/5';  
        }                      
        if($cols == 6){
          $cols_class = 'w-1/2 md:w-1/6';  
        }                      
      ?>
      <div class="c-section__gallery clearfix flex flex-wrap md:-mx-1 md:items-center md:justify-center<?php if(!empty(get_field('headline')) || !empty(get_field('content'))): ?> mb-1<?php endif; ?>">
        <?php foreach(get_field('gallery') as $item): ?>
          <div class="<?= $cols_class; ?> py-1 md:px-1">
            <?= oax_image([
              'img' => $item,
              'wrapper' => true,
              'holder' => true,
              'lazy' => true,
              'xclass' => 'ratio-inner object-fit'
            ]); ?>
          </div>
        <?php endforeach; ?>
      </div>

    <?php endif; ?>

    <?php if(!empty(get_field('headline'))): ?>
    <div class="c-section__header relative w-full<?php if($content_position === 'center'): ?> md:w-4/5 md:mx-auto text-center<?php endif; ?>">
      <h1 class="my-0 leading-tight text-2xl md:text-3xl"<?php if(!empty(get_field('text_color')) && !is_admin()): ?> style="color: <?= get_field('text_color') ?>"<?php endif; ?>>
        <?= get_field('headline'); ?>
      </h1>
    </div>
    <?php endif; ?>

      <div class="c-section__body flex md:justify-center w-full<?php if(!empty(get_field('headline'))): ?> pt-1<?php endif; ?><?php if($content_position === 'center'): ?> md:w-3/4 md:mx-auto text-center<?php endif; ?><?php if(!empty(get_field('gallery'))): ?> pb-1<?php endif; ?>"<?php if(!empty(get_field('text_color')) && !is_admin()): ?> style="color: <?= get_field('text_color'); ?>"<?php endif; ?>>

      <?php if(!empty(get_field('content'))): ?>
        <div class=""<?php if(!empty(get_field('text_color')) && !is_admin()): ?> style="color: <?= get_field('text_color') ?>"<?php endif; ?>>
          <?= get_field('content'); ?>
        </div>
      <?php endif; ?>

    </div>
  </div>  
</section>