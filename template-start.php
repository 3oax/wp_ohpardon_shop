<?php
/**
 * Template Name: Startseite
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

get_header(); ?>
  <div class="v-start">
    <?php 
      $hero_slider_items = get_field('hero_slider');            
    ?>
    <header class="c-section c-section--header">
      
      <?php if(!empty($hero_slider_items)): ?>
      <div class="v-start__slider<?php if(count($hero_slider_items) > 1): ?> js--slider<?php endif; ?>"<?php if(count($hero_slider_items) > 1): ?> data-init-by="start"<?php endif; ?>>
        <?php $hero_slider = 0; foreach($hero_slider_items as $hero_slider_item): ?>
        <div class="v-start__slider-item">
          <div class="flex items-center">
            <div class="w-2/3">              
              <?= oax_image([
                'img' => $hero_slider_item['img'],
                'wrapper' => true,
                'holder' => true,
                'xclass' => 'inset object-cover',
                'xclass_wrapper' => 'bg-black-light'
              ]); ?>
            </div>
            <div class="w-1/3 px-4">
              <h1 class="mb-1 entry-title"><?= $hero_slider_item['headline']; ?></h1>
              <div>
                <?= $hero_slider_item['content']; ?>              
              </div>
              <div class="mt-15">
                <?php $hero_slider_item_link = $hero_slider_item['link']; ?>
                <a class="btn" href="<?= $hero_slider_item_link['url']; ?>"><?= $hero_slider_item_link['title']; ?></a>
              </div>
            </div>
          </div>
        </div>
        <?php $hero_slider++; endforeach; ?>
      </div>
      <?php endif; ?>

      <div class="container text-center pt-15 pb-3">
        <?php
	        while ( have_posts() ) : the_post();              
            the_content();
          endwhile; // End of the loop.
        ?>
      </div>

    </header>

    <section class="c-section pb-5">
      <div class="c-section__content">
        
        <?php 
          $kallax_teaser = get_field('kallax');
          $kallax_link = $kallax_teaser['link']['url'];
          $kallax_link_title = $kallax_teaser['link']['title'];
          $kallax_gallery = [
            'img' => $kallax_teaser['gallery'],
            'hover' => $kallax_teaser['gallery_hover']
          ];
        ?>
        <div class="container container-lg">
          <div class="flex flex-wrap items-center justify-center">
            <div class="w-full md:w-1/4 flex justify-center items-center">
              <div class="text-center pb-2 md:pb-0">
                <h2 class="h5"><?= $kallax_teaser['headline']; ?></h2>
                <a href="<?= $kallax_link; ?>" class="btn btn--sm mt-05"><?= $kallax_link_title; ?></a>
              </div>
            </div>
            <div class="w-1/2 md:w-2/5">
              <a class="ratio-square bg-black-light block relative overflow-hidden" href="<?= $kallax_link; ?>">
                <?= oax_image([
                  'img' => $kallax_gallery['img'][0],
                  'xclass' => 'inset object-cover',
                  'lazy' => true
                ]); ?>
                <?= oax_image([
                  'img' => $kallax_gallery['hover'][0],
                  'xclass' => 'inset object-cover',
                  'xattr' => [
                    'style' => 'display: none;'
                  ],
                  'lazy' => true
                ]); ?>                
              </a>
            </div>
            <div class="w-1/2 md:w-1/3">
              <div class="md:pl-3">
                <a class="ratio-square bg-black-light block overflow-hidden relative" href="<?= $kallax_link; ?>">
                  <?= oax_image([
                    'img' => $kallax_gallery['img'][1],
                    'xclass' => 'inset object-cover',
                    'lazy' => true
                  ]); ?>
                  <?= oax_image([
                    'img' => $kallax_gallery['hover'][1],
                    'xclass' => 'inset object-cover',
                    'xattr' => [
                      'style' => 'display: none;'
                    ],
                    'lazy' => true
                  ]); ?>                        
                </a>
              </div>              
            </div>
            <div class="w-1/2 md:w-2/5 md:mt-3 md:mr-15">
              <a class="ratio-square bg-black-light block overflow-hidden relative" href="<?= $kallax_link; ?>">
                <?= oax_image([
                  'img' => $kallax_gallery['img'][2],
                  'xclass' => 'inset object-cover',
                  'lazy' => true
                ]); ?>
                <?= oax_image([
                  'img' => $kallax_gallery['hover'][2],
                  'xclass' => 'inset object-cover',
                  'xattr' => [
                    'style' => 'display: none;'
                  ],
                  'lazy' => true
                ]); ?>                
              </a>
            </div>
            <div class="w-1/2 md:w-1/4 md:mt-3 md:ml-15">
              <a class="ratio-square bg-black-light block overflow-hidden relative" href="<?= $kallax_link; ?>">
                <?= oax_image([
                  'img' => $kallax_gallery['img'][3],
                  'xclass' => 'inset object-cover',
                  'lazy' => true
                ]); ?>
                <?= oax_image([
                  'img' => $kallax_gallery['hover'][3],
                  'xclass' => 'inset object-cover',
                  'xattr' => [
                    'style' => 'display: none;'
                  ],
                  'lazy' => true
                ]); ?>               
              </a>              
            </div>
          </div>
        </div>

        <?php 
          $malm_teaser = get_field('malm');
          $malm_link = $malm_teaser['link']['url'];
          $malm_link_title = $malm_teaser['link']['title'];
          $malm_gallery = [
            'img' => $malm_teaser['gallery'],
            'hover' => $malm_teaser['gallery_hover']
          ];
        ?>
        <div class="container container-lg mt-3">
          <div class="flex flex-wrap items-center justify-center">
            <div class="w-full md:w-1/3">
              <div class="md:pl-15">
                <a class="ratio-square bg-black-light block overflow-hidden relative" href="<?= $malm_link; ?>">
                  <?= oax_image([
                    'img' => $malm_gallery['img'][0],
                    'xclass' => 'inset object-cover',
                    'lazy' => true
                  ]); ?>
                  <?= oax_image([
                    'img' => $malm_gallery['hover'][0],
                    'xclass' => 'inset object-cover',
                    'xattr' => [
                      'style' => 'display: none;'
                    ],
                    'lazy' => true
                  ]); ?>                  
                </a>
              </div>
            </div>
            <div class="w-full md:w-1/3 py-2 md:py-0 flex justify-center items-center">
              <div class="text-center">
                <h3 class="h5"><?= $malm_teaser['headline']; ?></h3>
                <a href="<?= $malm_link; ?>" class="btn btn--sm mt-05"><?= $malm_link_title; ?></a>
              </div>
            </div>
            <div class="w-1/2 md:w-1/3">
              <div class="md:pr-3">
                <a class="ratio-square bg-black-light block overflow-hidden relative" href="<?= $malm_link; ?>">
                  <?= oax_image([
                    'img' => $malm_gallery['img'][1],
                    'xclass' => 'inset object-cover',
                    'lazy' => true
                  ]); ?>
                  <?= oax_image([
                    'img' => $malm_gallery['hover'][1],
                    'xclass' => 'inset object-cover',
                    'xattr' => [
                      'style' => 'display: none;'
                    ],
                    'lazy' => true
                  ]); ?>                 
                </a>
              </div>              
            </div>     
            <div class="w-1/2 md:w-1/3 md:mt-3">
              <div class="md:pr-2">
                <a class="ratio-square bg-black-light block overflow-hidden relative" href="<?= $malm_link; ?>">
                  <?= oax_image([
                    'img' => $malm_gallery['img'][2],
                    'xclass' => 'inset object-cover',
                    'lazy' => true
                  ]); ?>
                  <?= oax_image([
                    'img' => $malm_gallery['hover'][2],
                    'xclass' => 'inset object-cover',
                    'xattr' => [
                      'style' => 'display: none;'
                    ],
                    'lazy' => true
                  ]); ?>                 
                </a>
              </div>          
            </div>     
            <div class="w-1/2 md:w-1/3 md:mt-3">
              <div class="md:px-5">
                <a class="ratio-square bg-black-light block overflow-hidden relative" href="<?= $malm_link; ?>">
                  <?= oax_image([
                    'img' => $malm_gallery['img'][3],
                    'xclass' => 'inset object-cover',
                    'lazy' => true
                  ]); ?>
                  <?= oax_image([
                    'img' => $malm_gallery['hover'][3],
                    'xclass' => 'inset object-cover',
                    'xattr' => [
                      'style' => 'display: none;'
                    ],
                    'lazy' => true
                  ]); ?>              
                </a>
              </div>          
            </div>     
            <div class="w-1/2 md:w-1/3 md:mt-3">
              <div class="md:pl-2">
                <a class="ratio-square md:ratio-rect-tall bg-black-light block overflow-hidden relative" href="<?= $malm_link; ?>">
                  <?= oax_image([
                    'img' => $malm_gallery['img'][4],
                    'xclass' => 'inset object-cover',
                    'lazy' => true
                  ]); ?>
                  <?= oax_image([
                    'img' => $malm_gallery['hover'][4],
                    'xclass' => 'inset object-cover',
                    'xattr' => [
                      'style' => 'display: none;'
                    ],
                    'lazy' => true
                  ]); ?>                 
                </a>
              </div>          
            </div>                             
          </div>
        </div>

      </div>
    </section>

    <?php 
      /**
       * Get Design Section
       */
      echo oax_get_component('section-designs'); 
	  ?>   

    <?php 
      /**
       * Get Design Section
       */
      echo oax_get_component('section-special-editions'); 
	  ?>       

  </div>
<?php
get_footer();
