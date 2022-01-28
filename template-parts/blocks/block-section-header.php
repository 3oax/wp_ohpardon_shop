<?php
/**
 * Block Name: Section Header
 */
$has_headline = empty(get_field('headline')) ? false : true;
$content_position = empty(get_field('content_position')) ? 'center' : get_field('content_position');
?>
<section class="c-section c-section--header min-h-screen flex items-center py-10 md:py-75 overflow-hidden" data-wp-block-id="<?= $block['id']; ?>">
  
  <div class="c-section__bg bg-black"<?php if(!empty(get_field('bg_color')) && !is_admin()): ?> style="background-color: <?= get_field('bg_color'); ?>"<?php endif; ?>>    
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
  
  <div class="container container-lg relative z-content"<?php if(!empty(get_field('text_color')) && !is_admin()): ?> style="color: <?= get_field('text_color'); ?>"<?php endif; ?>>
    <div class="c-section__header relative w-full<?php if($content_position === 'center'): ?> md:w-4/5 md:mx-auto text-center<?php endif; ?>">
      <?php if(!is_admin()): ?>
        <?php if(is_front_page()): ?>
          
          <div class="v-start__header-svg-wrapper">
            <svg class="w-full v-start__header-svg" viewBox="0 0 1000 170">
              <defs>
                <clipPath id="v-start__headline-shape">
                  <rect x="430" y="50" width="130" height="130" fill="#0048bd"></rect>
                </clipPath>
              </defs>
              <g>
                <rect x="410" y="0" width="170" height="170" fill="#0062ff"></rect>
                <rect x="420" y="10" width="150" height="150" fill="#0053d9"></rect>
                <rect x="430" y="20" width="130" height="130" fill="#0048bd"></rect>
                <text fill="<?php if(!empty(get_field('text_color')) && !is_admin()): ?><?= get_field('text_color'); ?><?php else: ?>black<?php endif; ?>" text-anchor="middle" x="504" y="140" font-family="Volte" font-weight="bold" font-size="77px"><?php echo get_field('headline'); ?></text>              
                <text fill="white" aria-hidden="true" clip-path="url(#v-start__headline-shape)" text-anchor="middle" x="504" y="140" font-family="Volte" font-weight="bold" font-size="77px"><?php echo get_field('headline'); ?></text>
              </g>
            </svg>   
          </div>

        <?php else: ?>
          <h1 class="my-0 text-2xl md:text-3xl"<?php if(!empty(get_field('text_color')) && !is_admin()): ?> style="color: <?= get_field('text_color') ?>"<?php endif; ?>>
            <?= get_field('headline'); ?>
          </h1>          
        <?php endif; ?>
      <?php endif; ?>

    </div>
    <?php if(is_front_page()): ?>
      <div class="c-section__body flex md:justify-center w-full pt-0<?php if($content_position === 'center'): ?> md:w-3/4 md:mx-auto text-center<?php endif; ?>">
        <div class=""<?php if(!empty(get_field('text_color')) && !is_admin()): ?> style="color: <?= get_field('text_color') ?>"<?php endif; ?>><?= get_field('content'); ?></div>
      </div>
      <?php else: ?>
      <div class="c-section__body flex md:justify-center w-full pt-1<?php if($content_position === 'center'): ?> md:w-3/4 md:mx-auto text-center<?php endif; ?>">
        <div class=""<?php if(!empty(get_field('text_color')) && !is_admin()): ?> style="color: <?= get_field('text_color') ?>"<?php endif; ?>><?= get_field('content'); ?></div>
      </div>
    <?php endif; ?>
  </div>
  
  <?php if(!is_admin()): ?>
    <?php if(is_front_page()): ?>
      <?php // echo oax_get_template_part('template-parts/components/hint-scroll-led'); ?>
    <?php else: ?>
      <?php echo oax_get_template_part('template-parts/components/hint-scroll'); ?>
    <?php endif; ?>
  <?php endif; ?>
</section>