<?php 
  $slider_items = [1,1,1,1,1,1,1,1,1,1];
  $slider_items_prep = array_slice($slider_items, 0, 10); 
  $link = '#';
  $link_title = 'Zur Übersicht';
  $headline = '30+ Designs';
?>
<section class="c-section c-section--designs">
  <div class="flex flex-wrap">
    <?php $slider_i = 0; foreach($slider_items_prep as $slider_item): ?>

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
        <a class="ratio-square bg-<?= $slider_i % 2 === 0 ? 'black' : 'black-light'; ?> block" href="#"></a>
      </div>        
      
    <?php $slider_i++; endforeach; ?>
  </div>
</section>