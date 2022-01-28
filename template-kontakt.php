<?php
/**
 * Template Name: Kontakt
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

get_header(); ?>
  <div class="v-kontakt overflow-hidden">

    <?php $page_header = get_field('page_header'); ?>
    <?php if(!empty($page_header)): ?>  
      <?php oax_get_template_part('template-parts/page-header', [
        'bg_color' => 'bg-blue',
        
        'page_header_title' => $page_header['headline'],
        'page_header_content' => $page_header['content'],
        'page_header_bg_canvas' => false,

        'xclass_section' => ' v-kontakt__header',
        'xclass_content' => '',
        'xclass_content_title' => '',
        'xclass_content_header' => '',
        'xclass_content_body' => '',
        'xclass_content_footer' => ''      
      ]); ?>
    <?php else: ?>
      <?php oax_get_template_part('template-parts/page-header', [
        'bg_color' => 'bg-blue',
        
        'page_header_title' => get_the_title(),
        'page_header_content' => '<div class="h1 px-1 md:px-5 pt-3 text-black">' . '<p>32321 leute in deiner gegend wollen dich treffen. finde heraus wer.</p>' . '</div>',
        'page_header_bg_canvas' => false,

        'xclass_section' => ' v-kontakt__header',
        'xclass_section_padding' => 'pt-75 pb-2',
        'xclass_content' => '',
        'xclass_content_title' => 'text-black',
        'xclass_content_header' => '',
        'xclass_content_body' => '',
        'xclass_content_footer' => ''      
      ]); ?>    
    <?php endif; ?>
    
    <?php while ( have_posts() ) : the_post(); ?>

      <section class="v-kontakt__body pt-3">
        <div class="container">
          <div class="v-kontakt__content v-page__content">
            <?php
              the_content( );
            ?>  
          </div>
        </div>
      </section>  

      <section class="pt-3 pb-2">
        <div class="container">
          <div class="row flex flex-wrap">
            <div class="w-full md:w-1/2 md:pr-2">
              <h3 class="mb-1"><?= __( 'Schnellkontakt', 'oax-ohpardon' ); ?>:</h3>
              <?php if(!empty(get_field('site_address_mail', 'option'))): ?>
                <a href="mailto:<?= get_field('site_address_mail', 'option') ?>"><?= get_field('site_address_mail', 'option'); ?></a>
              <?php else: ?>
                <a href="">E-Mail (ersetzen)</a>
              <?php endif; ?>
              <br>
              <?php if(!empty(get_field('site_address_phone', 'option'))): ?>
                <a href="tel:<?= get_field('site_address_phone', 'option'); ?>"><?= get_field('site_address_phone', 'option'); ?></a>
              <?php else: ?>
                <a href="">Telefonnummer (ersetzen)</a>
              <?php endif; ?>              
            </div>
            <div class="w-full md:w-1/2 md:pl-2 mt-2 md:mt-0">
              <h3><?= __( 'Adresse', 'oax-ohpardon' ); ?>:</h3>
              <address class="mt-1">
                <?= get_field('site_address', 'option'); ?>
              </address>
            </div>
          </div>
        </div>
      </section>

    <?php endwhile; ?>

  </div>
<?php
get_footer();
