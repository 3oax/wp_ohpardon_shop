<?php 
  $categories = [1,2,3,4];
?>

<section class="c-section c-section--special-editions pt-10 pb-75">
  <div class="c-section__content">
    
    <h4 class="js--headline-move w-full leading-none uppercase" style="font-size: 5rem;">
      <span class="js--headline-move__item block whitespace-nowrap -ml-lg">Special Editions Special Editions Special Editions</span>
      <span class="js--headline-move__item block whitespace-nowrap -ml-2">Special Editions Special Editions Special Editions</span>
    </h4>

    <div class="container mt-75">
      <div class="flex flex-wrap -mt-3">
        <?php $categories_i = 0; foreach($categories as $cat): ?>
        <div class="w-full mt-15 md:w-1/2 <?= $categories_i % 2 === 0 ? 'md:pr-15' : 'md:pl-15' ?> md:mt-3">
          <?php 
            $link = '#';
            $title = 'Limitierte Drucke';
          ?>
          <a href="<?= $link; ?>" class="ratio-square block bg-black-light relative">
            <span class="absolute bottom-0 right-0 mb-1 mr-1">
              <span class="btn"><?= $title; ?></span>
            </span>
          </a>  
        </div>
        <?php $categories_i++; endforeach; ?>
      </div>
    </div>
  </div>
</section>