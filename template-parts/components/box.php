<?php 
  $item = (array)$item;
  $itemObj = (object)$item;
  $item_categories = get_the_category($item['ID']); 
  $item_category = $item_categories[0];

  if( function_exists('yoast_get_primary_term_id')){
    $item_category_primary_id = yoast_get_primary_term_id( 'category', get_post($item['ID']) );
    if( $item_category_primary_id ){      
      $item_category = get_term( $item_category_primary_id );
    }
  } 

  $item_category->color = get_field('color', 'term_' . $item_category->term_id);
  $item_category->icon = !empty(get_field('icon', 'term_' . $item_category->term_id)) ? get_field('icon', 'term_' . $item_category->term_id) : false;
  $item_author_id = $item['post_author'];

  $item_header_tag = isset($styles) && isset($styles['header_tag']) ? $styles['header_tag'] : 'h3';
?>
<div style="--color__box-bg: <?= $item_category->color; ?>; --c-box__bg: <?= $item_category->color; ?>" class="c-box text-white-full block mx-075">
  <div class="c-box__header text-center px-15 w-full">
    <<?= $item_header_tag; ?> class="h1 my-0">
      <?= $item['post_title']; ?>
    </<?= $item_header_tag; ?>>
  </div>
  <div class="c-box__body pt-15 px-15">
    <p class="h4 text-center text-lead font-sans font-normal mt-0 pb-05"><?= $item_category->name ?></p>
    <p class="text-center font-sans italic">
      <?= get_the_author_meta('first_name', $item_author_id); ?>
      <?= get_the_author_meta('last_name', $item_author_id); ?>
    </p>
  </div>
  <div class="c-box__footer px-15 pt-2 pb-15">
    <figure class="c-box__figure ratio-rect-lg bg-lighten relative overflow-hidden">
      
      <?php if($item_category->icon != false): ?> 
        <div class="absolute c-box__icon-wrap" style="top: 50%; left: 50%; width: 5rem; height: 5rem; margin-left: -2.5rem; margin-top: -2.5rem;" aria-hidden="true">
          <?php if($item_category->icon['mime_type'] == 'image/svg+xml'): ?>
            <?= oax_inline_svg([
              'svg' => $item_category->icon,
              'xclass' => 'w-auto h-full c-box__icon',
              'xattr' => [
                'style' => 'fill: rgba(255,255,255,0.3)'
              ]
            ]); ?>            
          <?php else: ?>
            <?= oax_image([
              'img' => $item_category->icon,
              'xclass' => 'w-full h-auto c-box__icon'
            ]); ?>
          <?php endif; ?>
        </div>
      <?php endif; ?>      

      <?= oax_image([
        'post'  => $itemObj,
        'xclass' => 'object-fit-cover inset absolute c-box__img',
        'lazy' => true
      ]); ?>
    </figure>
  </div>

  <div class="c-box__hover-indicator">
    <svg class="w-full h-full pointer-events-none">
      <use href="#icon-eye" />
    </svg>    
  </div>

  <a href="<?= get_permalink($item['ID']); ?>" title="<?= $item['post_title']; ?>" class="absolute inset-0 z-content">
    <span class="sr-only">Beitrag <?= $item['post_title']; ?> ansehen</span>
  </a>
</div>