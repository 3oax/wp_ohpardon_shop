<?php if(!empty(get_field('shortcode_search_all_posts_spotlight', 'options'))): ?>
  <div class="c-modal c-modal--search c-spotlight-search c-spotlight-search--artikel">
    <div class="c-modal__bg"></div>
    <div class="c-modal__close absolute right-0 top-0 px-1 py-1 bg-white-full leading-none cursor-pointer">
      <span style="display: inline-block; transform: rotate(45deg); transform-origin: 50% 50%;">&plus;</span>    
    </div>
    <div class="c-modal__content c-spotlight-search__wrap">
      <div class="container">
        <div class="c-spotlight-search__form-wrap">
          <?= do_shortcode(get_field('shortcode_search_all_posts_spotlight', 'options')); ?>
        </div>
      </div>
    </div>
  </div>
<?php endif; ?>

<?php if(!empty(get_field('shortcode_search_all_spotlight', 'options'))): ?>
  <div class="c-modal c-modal--search c-spotlight-search c-spotlight-search--all">
    <div class="c-modal__bg"></div>
    <div class="c-modal__close absolute right-0 top-0 px-1 py-1 bg-white-full leading-none cursor-pointer">
      <span style="display: inline-block; transform: rotate(45deg); transform-origin: 50% 50%;">&plus;</span>    
    </div>
    <div class="c-modal__content c-spotlight-search__wrap">
      <div class="container">
        <div class="c-spotlight-search__form-wrap">
          <?= do_shortcode(get_field('shortcode_search_all_spotlight', 'options')); ?>
        </div>
      </div>
    </div>
  </div>
<?php endif; ?>