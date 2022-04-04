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
    <header class="c-section c-section--header pt-5">
      
      <?php if(!empty($hero_slider_items)): ?>
      <div class="v-start__slider<?php if(count($hero_slider_items) > 1): ?> js--slider<?php endif; ?>"<?php if(count($hero_slider_items) > 1): ?> data-init-by="start"<?php endif; ?>>
        <?php $hero_slider = 0; foreach($hero_slider_items as $hero_slider_item): ?>
        <div class="v-start__slider-item">
          <div class="flex flex-wrap items-center">
            <div class="w-full md:w-2/3">              
              <?= oax_image([
                'img' => $hero_slider_item['img'],
                'wrapper' => true,
                'holder' => true,
                'lazy' => count($hero_slider_items) > 1,
                'xclass' => 'inset object-cover',
                'xclass_wrapper' => 'bg-black-light'
              ]); ?>
            </div>
            <div class="w-full md:w-1/3 pb-3 md:pb-0 px-15 md:px-4">
              <h1 class="mb-1 entry-title mt-15 md:mt-0">
                <?= $hero_slider_item['headline']; ?>
              </h1>
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
      
      <!--
      <div class="container text-center pt-15 pb-3">
        <?php /*
	        while ( have_posts() ) : the_post();              
            the_content();
          endwhile; // End of the loop.
        */ ?>
      </div>
      -->

    </header>

    <?php 
      /**
       * USP Icons
       */    
      echo oax_get_component('list-usp-icons', [
        'xclass_icons' => 'px-2 md:px-2'
      ]); 
    ?>   

    <style>
      @media (max-width: 992px){
        .c-section--product-teaser {
          --padding-mobile: 6rem;
        }
        .c-section--product-teaser .c-section__col.relative {
          z-index: 5;
          padding-bottom: var(--padding-mobile);
        }
        .c-section--product-teaser .c-section__col:not(.relative) {
          top: 0;
          padding-top: 6rem;
        }
        .c-section--product-teaser .c-section__info {
          padding-top: 1rem;
          bottom: 0;
          z-index: 6;
        }

        /** Image Versatz */
        .c-section--product-teaser .c-section__container .c-section__col.relative a { overflow: visible; }
        .c-section--product-teaser .c-section__container .c-section__col.relative img {
          opacity: 1 !important;
          visibility: visible !important;
        }
        .c-section--product-teaser .c-section__container .c-section__col.relative img:first-child {
          z-index: 2;
        }
        .c-section--product-teaser .c-section__container:nth-child(odd) .c-section__col.relative img:last-child {
          position: absolute;
          left: -3rem;
          bottom: calc( var(--padding-mobile) * -1 );
          top: auto; 
          z-index: 1;         
        }
        .c-section--product-teaser .c-section__container:nth-child(even) .c-section__col.relative img:last-child {
          position: absolute;
          right: -3rem;
          left: auto;
          bottom: calc( var(--padding-mobile) * -1 );
          top: auto; 
          z-index: 1;         
        } 

        /* COlumns */
        
        .c-section--product-teaser .c-section__container .c-section__col:not(.relative) {
          display: none;
        }

        .c-section--product-teaser .c-section__container:nth-child(odd) .c-section__info {
          left: 0;
          text-align: left;
        }
        .c-section--product-teaser .c-section__container:nth-child(even) .c-section__info {
          right: 0;
          text-align: right;
        } 

        .c-section--product-teaser .c-section__container:nth-child(odd) .c-section__col.relative {
          padding-left: 3rem;
        }
        .c-section--product-teaser .c-section__container:nth-child(even) .c-section__col.relative {
          padding-right: 3rem;
        }        

        .c-section--product-teaser .c-section__container:nth-child(odd) .c-section__col:not(.relative) {          
          padding-right: 1.5rem;
        }
        .c-section--product-teaser .c-section__container:nth-child(even) .c-section__col:not(.relative) {
          padding-left: 1.5rem;
        }        
      } 
    </style>
    <section class="c-section c-section--product-teaser pb-5 pt-3 md:pt-3">
      <div class="c-section__content">
        <?php 
          $section_teasers = get_field('section_teasers', 'options'); 
          $show_option_teasers = !empty($section_teasers);
        ?>
        <?php if( !empty($section_teasers) && $show_option_teasers ): ?>
          <?php $section_teasers_i = 0; foreach($section_teasers as $section): ?>
            <?php 
              $section_headline = $section['headline'];
              if( !empty( $section['link'] ) ){
                $section_link = $section['link']['url'];
                $section_link_title = $section['link']['title'];                
              } else {
                $section_link = '#'; // $section['link']['url'];
                $section_link_title = 'Shop Now'; // $section['link']['title'];               
              }
            ?>
            <div class="c-section__container container container-lg<?= $section_teasers_i !== 0 ? ' mt-3 md:mt-3': ''; ?>">
              <div class="flex flex-wrap items-center justify-center relative w-full">
                <?php if( !empty($section['gallery']) ): ?>        
                  
                  <?php 
                    $section_gallery_arr = (array)$section['gallery']; 
                    if($section_teasers_i % 2 === 0) {
                      if( count($section_gallery_arr) > 4 ){
                        $section_gallery_arr = array_slice($section_gallery_arr, 4);
                      }
                    } else {
                      if( count($section_gallery_arr) > 5 ){
                        $section_gallery_arr = array_slice($section_gallery_arr, 5);
                      }
                    }                     
                  ?>  

                  <?php $gallery_item_i = 0; foreach($section_gallery_arr as $gallery_item_obj): ?>
                    <?php 
                      $gallery_item_type = $gallery_item_obj['acf_fc_layout']; 
                      $gallery_item = $gallery_item_obj['item_obj'];
                      $gallery_item_use_video = false; // $gallery_item['use_video'];
                      
                      $gallery_item_media = $gallery_item_obj['img'];
                      $gallery_item_media_hover = $gallery_item_obj['img_hover'];
                      
                      $gallery_item_link = get_permalink($gallery_item->ID);

                      $gallery_item_media_args = [
                        'xclass' => 'inset object-cover',
                        'lazy' => true                        
                      ];

                      $gallery_item_media_hover_args = [
                        'xclass' => 'inset object-cover',
                        'xattr' => [
                          'style' => 'opacity: 0; visibility: hidden;'
                        ],
                        'lazy' => true                     
                      ];                      

                      if( $gallery_item_type == 'product' ){
                        $gallery_product = $gallery_item;
                        $gallery_item_terms = wp_get_post_terms( $gallery_product->ID, 'product_tag' );
                        if( isset($gallery_item_terms) && !empty($gallery_item_terms) ) {
                          $gallery_product_design = $gallery_item_terms[0];  
                        }                       
                      }

                      $gallery_item_classes = 'c-section__col ';
                      $gallery_item_media_classes = 'c-section__col-media ';

                      // Gallery Item Classes
                      if($section_teasers_i % 2 === 0) {
                        if( $gallery_item_i === 0 ) $gallery_item_classes .= 'relative w-full md:w-2/5 md:order-1';
                        if( $gallery_item_i === 1 ) $gallery_item_classes .= 'absolute md:relative w-full md:w-1/3 md:order-1';
                        if( $gallery_item_i === 2 ) $gallery_item_classes .= 'absolute md:relative w-full md:w-2/5 md:mt-3 md:mr-15 md:order-1';
                        if( $gallery_item_i === 3 ) $gallery_item_classes .= 'absolute md:relative w-full md:w-1/4 md:mt-3 md:ml-15 md:order-1';
                      } else {
                        if( $gallery_item_i === 0 ) $gallery_item_classes .= 'relative w-full md:w-1/3 md:order-0';
                        if( $gallery_item_i === 1 ) $gallery_item_classes .= 'absolute md:relative w-full md:w-1/3 md:order-2';
                        if( $gallery_item_i === 2 ) $gallery_item_classes .= 'absolute md:relative w-full md:w-1/3 md:mt-3 md:order-2';
                        if( $gallery_item_i === 3 ) $gallery_item_classes .= 'absolute md:relative w-full md:w-1/3 md:mt-3 md:order-2';
                        if( $gallery_item_i === 4 ) $gallery_item_classes .= 'absolute md:relative w-full md:w-1/3 md:mt-3 md:order-2';
                      }

                      // Gallery Item Media Classes
                      if($section_teasers_i % 2 === 0) {
                        if( $gallery_item_i === 0 ) $gallery_item_media_classes .= '';
                        if( $gallery_item_i === 1 ) $gallery_item_media_classes .= 'md:pl-3';
                        if( $gallery_item_i === 2 ) $gallery_item_media_classes .= '';
                        if( $gallery_item_i === 3 ) $gallery_item_media_classes .= '';
                      } else {
                        if( $gallery_item_i === 0 ) $gallery_item_media_classes .= 'md:pl-15';
                        if( $gallery_item_i === 1 ) $gallery_item_media_classes .= 'md:pr-3';
                        if( $gallery_item_i === 2 ) $gallery_item_media_classes .= 'md:pr-2';
                        if( $gallery_item_i === 3 ) $gallery_item_media_classes .= 'md:px-5';
                        if( $gallery_item_i === 4 ) $gallery_item_media_classes .= 'md:pl-2';
                      }
                      
                      // Gallery Item Media Size
                      $gallery_item_media_size = 'ratio-square';
                      if($section_teasers_i % 2 === 0) {
                        if( $gallery_item_i === 0 ) $gallery_item_media_size .= '';
                        if( $gallery_item_i === 1 ) $gallery_item_media_size .= '';
                        if( $gallery_item_i === 2 ) $gallery_item_media_size .= '';
                        if( $gallery_item_i === 3 ) $gallery_item_media_size .= '';
                      } else {
                        if( $gallery_item_i === 0 ) $gallery_item_media_size .= '';
                        if( $gallery_item_i === 1 ) $gallery_item_media_size .= '';
                        if( $gallery_item_i === 2 ) $gallery_item_media_size .= '';
                        if( $gallery_item_i === 3 ) $gallery_item_media_size .= '';
                        if( $gallery_item_i === 4 ) $gallery_item_media_size .= ' md:ratio-rect-tall';
                      }                      
                    ?>
                    
                    <?php // Teaser Link (Shop now) # start ?>
                    <?php if($section_teasers_i % 2 === 0 && $gallery_item_i === 0): ?>
                      <div class="c-section__info w-full md:w-1/4 flex md:justify-center items-center order-last md:order-first">
                        <div class="w-full md:text-center">
                          <h2 class="h5"><?= $section_headline; ?></h2>
                          <?php if( !empty($section['content']) ): ?>
                            <div class="md:text-sm my-05"><?= $section['content'] ?></div>
                          <?php endif; ?>
                          <a href="<?= $section_link; ?>" class="btn mt-05"><?= $section_link_title; ?></a>
                        </div>
                      </div>
                    <?php elseif($section_teasers_i % 2 !== 0 && $gallery_item_i === 0): ?>
                      <div class="c-section__info w-full md:w-1/3 md:py-0 flex md:justify-center items-center order-last md:order-2">
                        <div class="w-full md:text-center">
                          <h2 class="h5"><?= $section_headline; ?></h2>
                          <?php if( !empty($section['content']) ): ?>
                            <div class="md:text-sm my-05"><?= $section['content'] ?></div>
                          <?php endif; ?>                          
                          <a href="<?= $section_link; ?>" class="btn mt-05"><?= $section_link_title; ?></a>
                        </div>
                      </div>                    
                    <?php endif; ?>
                    <?php // Teaser Link (Shop now) # end ?>
                    
                    <div class="<?= $gallery_item_classes; ?>">
                      
                      <?php if($gallery_item_type == 'product'): ?>
                        <?php 
                          if( empty( $gallery_item_media ) ) {
                            $gallery_item_media_args['post'] = $gallery_item;
                          } else {
                            $gallery_item_media_args['img'] = $gallery_item_media;
                          }                          
                          if( isset($gallery_product_design) && empty($gallery_item_media_hover) ){
                            $gallery_item_media_hover = true;
                            $gallery_item_media_hover_args['img'] = get_field('img', $gallery_product_design->taxonomy . '_' . $gallery_product_design->term_id);
                          }                        
                        ?>
                      <?php elseif($gallery_item_type == 'category'): ?>
                      <?php elseif($gallery_item_type == 'design'): ?>
                      <?php elseif($gallery_item_type == 'page'): ?>
                      <?php endif; ?>
                      
                      <div class="<?= $gallery_item_media_classes; ?>">
                        <a href="<?= $gallery_item_link; ?>" class="<?= $gallery_item_media_size; ?> bg-grey<?php if($gallery_item_i % 2 === 0): ?>-light<?php endif; ?> block relative overflow-hidden">
                          <?= oax_image($gallery_item_media_args); ?>
                          <?php if( !empty($gallery_item_media_hover) ): ?>
                            <?= oax_image($gallery_item_media_hover_args); ?>   
                          <?php endif; ?>                                            
                        </a>
                      </div>

                    </div>
                  <?php $gallery_item_i++; endforeach; ?>
                <?php endif; ?>
              </div>
            </div>
          <?php $section_teasers_i++; endforeach; ?>
        <?php endif; ?>

        <?php if( !$show_option_teasers ): ?>
          <?php 
            $kallax_teaser = get_field('kallax');

            if( !empty($kallax_teaser) && !empty($kallax_teaser['gallery']) ):

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
                  <a href="<?= $kallax_link; ?>" class="btn mt-05"><?= $kallax_link_title; ?></a>
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
                      'style' => 'opacity: 0; visibility: hidden;'
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
                        'style' => 'opacity: 0; visibility: hidden;'
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
                      'style' => 'opacity: 0; visibility: hidden;'
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
                      'style' => 'opacity: 0; visibility: hidden;'
                    ],
                    'lazy' => true
                  ]); ?>               
                </a>              
              </div>
            </div>
          </div>
          <?php endif; ?>

          <?php 
            $malm_teaser = get_field('malm');
            
            if( !empty($malm_teaser) && !empty($malm_teaser['gallery']) ):

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
                        'style' => 'opacity: 0; visibility: hidden;'
                      ],
                      'lazy' => true
                    ]); ?>                  
                  </a>
                </div>
              </div>
              <div class="w-full md:w-1/3 py-2 md:py-0 flex justify-center items-center">
                <div class="text-center">
                  <h3 class="h5"><?= $malm_teaser['headline']; ?></h3>
                  <a href="<?= $malm_link; ?>" class="btn mt-05"><?= $malm_link_title; ?></a>
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
                        'style' => 'opacity: 0; visibility: hidden;'
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
                        'style' => 'opacity: 0; visibility: hidden;'
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
                        'style' => 'opacity: 0; visibility: hidden;'
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
                        'style' => 'opacity: 0; visibility: hidden;'
                      ],
                      'lazy' => true
                    ]); ?>                 
                  </a>
                </div>          
              </div>                             
            </div>
          </div>
          <?php endif; ?>
        <?php endif; ?>
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
      // echo oax_get_component('section-special-editions'); 
	  ?>   

    <?php 
      /**
       * Get About Section
       */    
      echo oax_get_component('section-about'); 
    ?>
  </div>
<?php
get_footer();
