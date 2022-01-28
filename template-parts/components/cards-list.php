<?php 
  $items_count = count($items);
  $show_items = 1.15; // oax_is_mobile() ? 1.15 : 4.2;
?>
<div class="c-cards<?php if($stack): ?> c-cards--stack<?php endif; ?><?php // if($items_count <= $show_items): ?> md:pt-10<?php // endif; ?>">

  <?php if($items_count > $show_items): ?>
    <div class="c-scroll w-full overflow-scroll md:overflow-visible pb-2<?php if ($stack): ?> md:pt-10<?php endif; ?>">
  <?php endif; ?>
  
  <ul class="c-cards__list<?= $items_count > 4 ? ' c-cards__list--more-lg' : ''; ?> flex flex-wrap list-none m-0 px-075 py-0 js--viewport"<?php if($items_count > $show_items): ?> style="--cards-list__items-sm: 1.15; --cards-list__items-lg: 4.2; width: <?= $items_count * 100 / $show_items; ?>%"<?php endif; ?> data-animation="staggerFadeInUp" data-animation-stagger-items=".c-cards__list-item" data-animation-start="top bottom-=10%" data-animation-reverse="true">
    <?php for($i = 0; $i < $items_count; $i++): ?>
      <?php 
        $item = $items[$i];
        if(!isset($item['headline']) && !isset($item['content'])){
          $item = [
            'headline' => [
              'bottom' => 'Wohnen auf Gut Moorbeck'
            ],
            'button' => [
              'url' => '#',
              'title' => 'Mehr erfahren'
            ],
            'content' => '<p>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>'
          ];
        }
        $item_i = $i; 
      ?> 
      <?php 
        // define stacks
        if($stack):
          $stack_class = 'md:mt-0'; 
          if($item_i == 0 || $item_i == 4){
            $stack_class = 'md:-mt-4';
          }
          if($item_i == 1 || $item_i == 5){
            $stack_class = 'md:-mt-10';
          }            
          if($item_i == 3 || $item_i == 7){
            $stack_class = 'md:-mt-75';
          }          
        endif;              
      ?>
      <li class="c-cards__list-item w-full md:w-1/4 px-075 mb-2 md:mb-0<?= $stack ? ' ' . $stack_class : ''; ?>"<?php if($items_count > $show_items): ?> style="width: <?= 100 / $items_count; ?>%"<?php endif; ?>>
        <div class="c-card" data-href="">
          <div class="c-card__header">
            <figure class="ratio-rect-xxl relative w-full overflow-hidden <?= oax_get_random_bg_color_class(); ?>">
              <?php if(isset($item['post'])): ?>
                <?= oax_image([
                  'post' => $item['post'],
                  'xclass' => 'object-cover inset',
                  'lazy' => true,
                ]); ?>
              <?php else: ?>
                <?= oax_image([
                  'src' => 'https://source.unsplash.com/random/400x500?wellness,appartment,sauna',
                  'xclass' => 'object-cover inset ',
                  'lazy' => true,
                ]); ?>
              <?php endif; ?>
            </figure>
          </div>
          <div class="c-card__body px-3 md:px-4 bg-white pt-3 pb-5">
            <h5 class="h4 my-0 text-beige"><?= $item['headline']['bottom']; ?></h5>
            <div class="pt-15">
              <?= $item['content']; ?>
            </div>
          </div>
          <div class="c-card__footer -mt-15 text-center">
            <?= oax_get_component('button', [
              'link' => $item['button'],
              'glow' => false
            ]); ?>                 
          </div>
        </div>
      </li>
    <?php endfor; ?>
  </ul>

  <?php if($items_count > $show_items): ?>
    </div>
  <?php endif; ?>  
</div>