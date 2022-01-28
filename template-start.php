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
    <header class="c-section c-section--header">
      <div class="v-start__slider">
        <div class="v-start__slider-item">
          <div class="flex items-center">
            <div class="w-2/3">
              <div class="ratio-rect-lg bg-black-light"></div>
            </div>
            <div class="w-1/3 px-4">
              <h1 class="mb-1 entry-title">„Future Rrrarri“<br>by Devin Liston</h1>
              <div>
                <p>December Limited Edition</p>                
              </div>
              <div class="mt-15">
                <a class="btn" href="<?= wc_get_page_permalink( 'shop' ); ?>">Shop now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center py-15">
        <?php
	        while ( have_posts() ) : the_post();              
            the_content();
          endwhile; // End of the loop.
        ?>
      </div>
    </header>

    <section class="c-section py-5">
      <div class="c-section__content">
        
        <?php $kallax_link = '#'; ?>
        <div class="container container-lg">
          <div class="flex flex-wrap items-center justify-center">
            <div class="md:w-1/4 flex justify-center items-center">
              <div class="text-center">
                <h2 class="h5">Kallax</h2>
                <a href="<?= $kallax_link; ?>" class="btn btn--sm mt-05">Shop now</a>
              </div>
            </div>
            <div class="md:w-2/5">
              <div class="">
                <a class="ratio-square bg-black-light block" href="<?= $kallax_link; ?>"></a>
              </div>
            </div>
            <div class="md:w-1/3">
              <div class="pl-3">
                <a class="ratio-square bg-black-light block" href="<?= $kallax_link; ?>"></a>
              </div>              
            </div>
            <div class="md:w-2/5 mt-3 mr-15">
              <a class="ratio-square bg-black-light block" href="<?= $kallax_link; ?>"></a>
            </div>
            <div class="md:w-1/4 mt-3 ml-15">
              <a class="ratio-square bg-black-light block" href="<?= $kallax_link; ?>"></a>              
            </div>
          </div>
        </div>

        <?php $malm_link = '#'; ?>
        <div class="container container-lg mt-3">
          <div class="flex flex-wrap items-center justify-center">
            <div class="md:w-1/3">
              <div class="pl-15">
                <a class="ratio-square bg-black-light block" href="<?= $malm_link; ?>"></a>
              </div>
            </div>
            <div class="md:w-1/3 flex justify-center items-center">
              <div class="text-center">
                <h3 class="h5">Malm</h3>
                <a href="#" class="btn btn--sm mt-05">Shop now</a>
              </div>
            </div>
            <div class="md:w-1/3">
              <div class="pr-3">
                <a class="ratio-square bg-black-light block" href="<?= $malm_link; ?>"></a>
              </div>              
            </div>     
            <div class="md:w-1/3 md:mt-3">
              <div class="pr-2">
                <a class="ratio-square bg-black-light block" href="<?= $malm_link; ?>"></a>
              </div>          
            </div>     
            <div class="md:w-1/3 md:mt-3">
              <div class="px-5">
                <a class="ratio-square bg-black-light block" href="<?= $malm_link; ?>"></a>
              </div>          
            </div>     
            <div class="md:w-1/3 md:mt-3">
              <a class="pl-2">
                <div class="ratio-rect-tall bg-black-light block" href="<?= $malm_link; ?>"></div>
              </a>          
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
