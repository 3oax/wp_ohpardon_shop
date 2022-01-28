<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oax_ohpardon
 */

?>

<div class="v-page" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <?php $page_header = get_field('page_header'); ?>

  <?php if(!empty($page_header) && !empty($page_header['headline']) ): ?>
    
    <?php oax_get_template_part('template-parts/page-header', [
      'bg_color' => 'bg-green',
      
      'page_header_title' => $page_header['headline'],
      'page_header_content' => $page_header['content'],
      
      'xclass_section' => ' v-page__header',
      'xclass_content' => 'text-lead-lg font-serif',
      'xclass_content_title' => '',
      'xclass_content_header' => '',
      'xclass_content_body' => '',
      'xclass_content_footer' => ''  
    ]); ?> 
  
  <?php else: ?>
  
    <?php oax_get_template_part('template-parts/page-header', [
      'bg_color' => 'bg-green',
      
      'page_header_title' => get_the_title(),
      
      'xclass_section' => ' v-page__header',
      'xclass_content' => 'text-lead-lg font-serif',
      'xclass_content_title' => '',
      'xclass_content_header' => '',
      'xclass_content_body' => '',
      'xclass_content_footer' => ''      
    ]); ?>	  

	<?php endif; ?>

	<section class="c-section pt-3 pb-1 v-page__body">
		<div class="container">
      <div class="v-page__content">
			  <?php the_content(); ?>
      </div>
		</div>
	</section>
</div>