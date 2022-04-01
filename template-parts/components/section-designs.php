<?php
  $terms = get_terms( [ 
    'taxonomy' => 'product_tag',
    'hide_empty' => false,
    'number' => 10
  ] );
  $slider_items = $terms;  
  // $slider_items_prep = array_slice($slider_items, 0, 10); 
  $link = '/designs';
  $link_title = __('Zur Übersicht', 'oax-ohpardon');
  $headline = __('30+ Designs', 'oax-ohpardon');
?>
<section class="c-section c-section--designs">
  <style>@media( max-width: 992px){ 
    .c-section--designs .c-section__col:nth-child(7){ display: none; } 
    .c-section--designs .c-section__col:nth-child(8){ order: 1; } 
  }</style>
  <div class="flex flex-wrap">
    <?php $slider_i = 0; foreach($slider_items as $slider_item): ?>

      <?php if($slider_i == 8): ?>
        <div class="c-section__col c-section__col--content">
          <div class="ratio-rect relative bg-white">
            <div class="inset flex text-center items-center justify-center">
              <div>
                <h3 class="w-full pb-1"><?= $headline; ?></h3>
                <a href="<?= $link; ?>" class="btn"><?= $link_title; ?></a>
              </div>
            </div>
          </div>
        </div>
      <?php endif; ?>

      <div class="c-section__col">
        <a class="ratio-square bg-<?= $slider_i % 2 === 0 ? 'black' : 'black-light'; ?> block relative" href="<?= get_term_link($slider_item); ?>">
          <?= oax_image([
            'img' => get_field('img', $slider_item->taxonomy . '_' . $slider_item->term_id),
            'xclass' => 'inset object-fit',
            'lazy' => true
          ]); ?>
        </a>
      </div>        
      
    <?php $slider_i++; endforeach; ?>
  </div>
</section>