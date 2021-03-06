<?php
/**
 * Template Name: About
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

get_header(); ?>

  <div class="v-about">
    
    <?php $section_intro = get_field('section_intro'); ?>
    <?php if(!empty($section_intro)): ?>
    <section class="v-about__intro c-section pt-75 md:pt-10">
      
      <div class="container pb-3">
        <div class="row flex flex-wrap justify-center">
          <div class="w-full md:w-1/2 text-center flex flex-wrap justify-center">
            <figure class="block mb-2 w-1/2 md:w-1/4">
              <?php get_template_part( 'template-parts/site-logo' ); ?>
            </figure>
            <div>
              <?= $section_intro['content']; ?>
            </div>
          </div>
        </div>
      </div>

      <?php if(!empty($section_intro['slider'])): ?>
      <div class="v-about__intro-slider">
        <?php
          $section_intro_slider_items = [];
          foreach($section_intro['slider'] as $slide_img){
            $section_intro_slider_items[] = [
              'img' => $slide_img,
              'xclass' => 'inset',
              'xclass_wrapper' => 'mx-05 bg-grey-light',
              'wrapper' => true,
              'holder' => true,
              'lazy' => 'slider'
            ];
          }
          echo oax_get_component('slider/slide-track', [
            'items' => $section_intro_slider_items,
            'ITEMS_SHOW_LG' => 3,
            'xclass' => [
              'main' => 'js--viewport js--slider--carousel',
              'track' => 'px-0 items-end'
            ],
            'xdata' => [
              'swiper' => [
                'cssMode' => false,
                'loop' => true,
                'speed' => 10000,
                'autoplay' => [
                  'delay' => 0,
                  'disableOnInteraction' => false
                ],
                'noSwiping' => true,
                'noSwipingClass' => 'swiper-slide'
              ]
            ]
          ]);
        ?>
      </div>
      <?php endif; ?>
    </section>
    <?php endif; ?>

    <?php $section_gentrification = get_field('section_gentrification'); ?>
    <?php if(!empty($section_gentrification)): ?>    
    <section class="v-about__gentrification c-section pt-75 md:pt-10">
      <div class="container">
        <div class="row flex flex-wrap md:items-end md:flex-row-reverse">
          <div class="w-full md:w-1/2 md:pl-2 md:text-left text-center">
            <div class="pb-2 md:pr-2 md:pl-2">
              <?= oax_image([
                'img' => $section_gentrification['headline_img'],
                'wrapper' => true,
                'holder' => true,
                'xclass' => 'inset'
              ]); ?>
            </div>
            <h2 class="entry-title">
              <?= $section_gentrification['headline']; ?>
            </h2>
            <div class="mt-2 pb-3 md:pb-0">
              <?= $section_gentrification['content']; ?>
            </div>            
          </div>
          <div class="w-full md:w-1/2 md:pr-2">
            <?php if(!empty($section_gentrification['slider'])): ?>
              <?php
                if( count($section_gentrification['slider']) > 1 ){
                  $section_gentrification_slider_items = [];
                  foreach($section_gentrification['slider'] as $slide_img){
                    $section_gentrification_slider_items[] = [
                      'img' => $slide_img,
                      'xclass' => 'inset',
                      'xclass_wrapper' => 'mx-05 bg-grey-light',
                      'wrapper' => true,
                      'holder' => true,
                      'lazy' => 'slider'
                    ];
                  }
                  echo oax_get_component('slider/slide-track', [
                    'items' => $section_gentrification_slider_items,
                    'xclass' => [
                      'main' => 'js--viewport js--slider--bottom-nav',
                    ]                    
                  ]);
                } else {
                  echo oax_image([
                    'img' => $section_gentrification['slider'][0],
                    'wrapper' => true,
                    'holder' => true,
                    'xclass' => 'inset'
                  ]);
                }
              ?>              
            <?php endif; ?>
          </div>
        </div>
      </div>
    </section>  
    <?php endif; ?>
    
    <?php $section_reclaim = get_field('section_reclaim'); ?>
    <?php if(!empty($section_reclaim)): ?>       
    <section class="v-about__reclaim c-section pt-75 md:pt-10">
      <div class="container">
        <div class="row flex flex-wrap justify-center">
          <div class="w-full md:w-1/2 text-center">
            <h3 class="entry-title">
              <?= $section_reclaim['headline']; ?>
            </h3>
            <div class="mt-2">
              <?= $section_reclaim['content']; ?>
            </div>
          </div>
        </div>
      </div>
      <?php if(!empty($section_reclaim['slider'])): ?>
      <div class="v-about__reclaim-slider mt-3">
        <?php
          $section_reclaim_slider_items = [];
          foreach($section_reclaim['slider'] as $slide_img){
            $section_reclaim_slider_items[] = [
              'img' => $slide_img,
              'xclass' => 'inset',
              'xclass_wrapper' => 'mx-05 bg-grey-light',
              'wrapper' => true,
              'holder' => true,
              'lazy' => 'slider'
            ];
          }
          echo oax_get_component('slider/slide-track', [
            'items' => $section_reclaim_slider_items,
            'ITEMS_SHOW_LG' => 2,
            'xclass' => [
              'track' => 'px-0 items-end',
              'main' => 'js--viewport js--slider--carousel',
            ],
            'xdata' => [
              'swiper' => [
                'cssMode' => false,
                'loop' => true,
                'speed' => 10000,
                'autoplay' => [
                  'delay' => 0,
                  'disableOnInteraction' => false
                ]
              ]
            ]            
          ]);
        ?>
      </div>
      <?php endif; ?> 
    </section>
    <?php endif; ?>   
    
    <?php $section_leerstand = get_field('section_leerstand'); ?>
    <?php if(!empty($section_leerstand)): ?>       
    <section class="v-about__leerstand c-section pt-75 md:pt-10">
      <div class="md:px-4">
        <div class="row flex flex-wrap items-center">
          <div class="w-full md:w-1/2 px-15 pb-3 md:pb-0 md:pl-5 md:pr-5">      
            <h3 class="entry-title">
              <?= $section_leerstand['headline']; ?>              
            </h3>
            <div class="mt-2">
              <?= $section_leerstand['content']; ?>
            </div>
          </div>
          <div class="w-full md:w-1/2">      
            <?php if(!empty($section_leerstand['slider'])): ?>
              <?php
                if( count($section_leerstand['slider']) > 1 ){
                  $section_leerstand_slider_items = [];
                  foreach($section_leerstand['slider'] as $slide_img){
                    $section_leerstand_slider_items[] = [
                      'img' => $slide_img,
                      'xclass' => 'inset',
                      'xclass_wrapper' => 'bg-grey-light',
                      'wrapper' => true,
                      'holder' => true,
                      'lazy' => 'slider'
                    ];
                  }
                  echo oax_get_component('slider/slide-track', [
                    'items' => $section_leerstand_slider_items,
                    'ITEMS_SHOW_LG' => 1,
                    'xclass' => [
                      'inner' => 'pb-0',
                      'track' => 'px-0 mx-0 flex-end',
                      'main' => 'js--viewport js--slider--bottom-nav',
                    ]
                  ]);
                } else {
                  echo oax_image([
                    'img' => $section_leerstand['slider'][0],
                    'wrapper' => true,
                    'holder' => true,
                    'xclass' => 'inset'
                  ]);
                }
              ?>              
            <?php endif; ?>
          </div>
        </div>
      </div>          
    </section> 
    <?php endif; ?>
    
    <?php $section_parasite = get_field('section_parasite'); ?>
    <?php if(!empty($section_parasite)): ?>    
    <section class="v-about__parasite c-section pt-75 md:pt-10">
      <div class="container">
        <div class="row flex flex-wrap items-center md:flex-row-reverse">
          <div class="w-full md:w-1/2 pb-3 md:pb-0 md:pl-4">      
            <h3 class="entry-title">
              <?= $section_parasite['headline']; ?>
            </h3>
            <div class="mt-2">
              <?= $section_parasite['content']; ?>
            </div>
          </div>
          <div class="w-full md:w-1/2 md:pr-4">      
            <?php if(!empty($section_parasite['slider'])): ?>
              <?php
                if( count($section_parasite['slider']) > 1 ){
                  $section_parasite_slider_items = [];
                  foreach($section_parasite['slider'] as $slide_img){
                    $section_parasite_slider_items[] = [
                      'img' => $slide_img,
                      'xclass' => 'inset',
                      'xclass_wrapper' => 'bg-grey-light',
                      'wrapper' => true,
                      'holder' => true,
                      'lazy' => 'slider'
                    ];
                  }
                  echo oax_get_component('slider/slide-track', [
                    'items' => $section_parasite_slider_items,
                    'ITEMS_SHOW_LG' => 1,
                    'xclass' => [
                      'inner' => 'pb-0',
                      'track' => 'px-0 mx-0 flex-end',
                      'main' => 'js--viewport js--slider--bottom-nav',
                    ]
                  ]);
                } else {
                  echo oax_image([
                    'img' => $section_leerstand['slider'][0],
                    'wrapper' => true,
                    'holder' => true,
                    'xclass' => 'inset'
                  ]);
                }
              ?>              
            <?php endif; ?>
          </div>
        </div>
      </div>  
    </section> 
    <?php endif; ?>
    
    <?php $section_recycling = get_field('section_recycling'); ?>
    <?php if(!empty($section_recycling)): ?>        
    <section class="v-about__recycling c-section pt-75 md:pt-10 pb-75 md:pb-10">
      <div class="container">
        <h3 class="entry-title text-center">
          <?= $section_recycling['headline']; ?>
        </h3>
        <div class="row flex flex-wrap justify-center">
          <div class="w-full md:w-1/2 text-center">
            <div class="mt-2">
              <?= $section_recycling['content']; ?>
            </div>
          </div>
        </div>
      </div>
      <?php if(!empty($section_recycling['slider'])): ?>
      <div class="v-about__recycling-slider mt-3 md:-ml-05">
        <?php
          $section_recycling_slider_items = [];
          foreach($section_recycling['slider'] as $slide_img){
            $section_recycling_slider_items[] = [
              'img' => $slide_img,
              'xclass' => 'inset',
              'xclass_wrapper' => 'mx-05 bg-grey-light',
              'wrapper' => true,
              'holder' => true,
              'lazy' => true
            ];
          }
          echo oax_get_component('slider/slide-track', [
            'items' => $section_recycling_slider_items,
            'ITEMS_SHOW_LG' => 2,
            'xclass' => [
              'track' => 'px-0 items-end',
              'main' => 'js--viewport js--slider--carousel',
            ],
            'xdata' => [
              'swiper' => [
                'cssMode' => false,
                'loop' => true,
                'speed' => 10000,
                'autoplay' => [
                  'delay' => 0,
                  'disableOnInteraction' => false
                ]
              ]
            ]                  
          ]);
        ?>
      </div>
      <?php endif; ?>      
    </section>  
    <?php endif; ?>
    
    <?php 
      /**
       * Get Design Section
       */
      echo oax_get_component('section-designs'); 
	  ?>      

  </div>

<?php
get_footer();
