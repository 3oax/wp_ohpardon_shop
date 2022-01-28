<?php 
  $categories = array_reverse(get_categories());
?>
<?php if(count($categories) > 0): ?>
<section class="c-section c-categories">
  <div class="c-categories__nav w-full flex flex-wrap flex-col items-center relative">
    <button class="c-categories__nav-item btn -ml-2 js--search-trigger inline-flex items-center">
      <span><?= __( 'Artikel durchsuchen', 'oax-ohpardon' ); ?></span>
      <svg class="w-1 h-1 ml-05 pointer-events-none fill-current">
        <use href="#icon-search" />
      </svg>      
    </button>
    <a href="<?= get_permalink( get_option( 'page_for_posts' ) ); ?>" class="c-categories__nav-item btn btn--white -mr-2 inline-flex items-center">
      <svg class="w-1 h-1 mr-05" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M25.814 31H6.185A3.19 3.19 0 0 1 3 27.814V4.185A3.19 3.19 0 0 1 6.185 1h19.63A3.19 3.19 0 0 1 29 4.185v23.63A3.19 3.19 0 0 1 25.814 31zM6.185 3C5.532 3 5 3.532 5 4.185v23.63C5 28.467 5.532 29 6.185 29h19.63c.653 0 1.185-.532 1.185-1.185V4.185C27 3.533 26.468 3 25.815 3z"/><path d="M16 13H9a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2zM23 8H9a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2z"/></svg>
      <span><?= __( 'Alle Artikel & Themen', 'oax-ohpardon' ); ?></span>
    </a>
  </div>
  <ul class="c-categories__list list-none p-0 m-0 w-100 flex flex-wrap">
    <?php foreach($categories as $category): ?>
      <?php 
        $category->color = get_field('color', 'term_' . $category->term_id);   
        $category->icon = !empty(get_field('icon', 'term_' . $category->term_id)) ? get_field('icon', 'term_' . $category->term_id) : false;
        if( !empty( get_field('name_formatted', 'term_' . $category->term_id) ) ){
          $category->name = get_field('name_formatted' , 'term_' . $category->term_id);
        }
      ?>
      <li class="c-categories__list-item w-1/2 md:w-1/3 px-15 pb-2 pt-2 flex items-end relative overflow-hidden" style="--c-categories__list-item-bg: <?= $category->color; ?>; background-color: <?= $category->color; ?>;">
        <div class="c-categories__list-item-bubble"></div>
        <div class="c-categories__list-item-icon<?= $category->icon != false ? ' has-icon' : ''; ?>">
          <?php if($category->icon != false): ?> 
            <?php if($category->icon['mime_type'] == 'image/svg+xml'): ?>
              <?= oax_inline_svg([
                'svg' => $category->icon,
                'xclass' => 'w-auto h-full',
                'xattr' => [
                  'style' => 'fill: rgba(255,255,255,0.3)'
                ]
              ]); ?>            
            <?php else: ?>
              <?= oax_image([
                'img' => $category->icon,
                'xclass' => 'w-full h-auto'
              ]); ?>
            <?php endif; ?>
          <?php endif; ?>
        </div>
        <h3 class="text-white-full pt-lg md:pt-xl relative w-full"><?= $category->name; ?></h3>
        <a href="<?= get_category_link($category); ?>" class="absolute inset-0" title="<?= $category->name; ?>"></a>
      </li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endif; ?>