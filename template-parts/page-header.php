<?php 
  /**
   * Defaults
   */
  $page_header_bg_color = isset($bg_color) ? $bg_color : 'bg-green';
  $page_header_footer = !isset($page_header_footer) ? false : $page_header_footer;
  $headline_split = false;
?>

<header class="c-section c-section--header flex items-center justify-center<?php if(isset($xclass_section_padding) && !empty($xclass_section_padding)): ?> <?= $xclass_section_padding; ?><?php else: ?> pt-5 md:pt-75 pb-3 md:pb-4 <?php endif; ?><?= isset($xclass_section) ? $xclass_section : ''; ?>">
	<div class="c-section__bg inset<?php echo substr($page_header_bg_color, 0, 1) !== '#' ? ' ' . $page_header_bg_color : ''; ?>"<?php if(substr($page_header_bg_color, 0, 1) === '#'): ?> style="background-color: <?= $page_header_bg_color; ?>"<?php endif; ?>>
  </div>
  <div class="c-section__content <?= isset($xclass_content) ? $xclass_content : ''; ?>">
    <div class="container text-center text-white-full py-1">
      
      <?php 
        $page_header_title_char_count = strlen(trim(str_replace('&shy;', '', $page_header_title))); 
      ?>      

      <h1 class="entry-title <?php if( $headline_split ): ?> entry-title--split<?php else: ?> leading-tight<?php endif; ?> c-section__content-title <?= isset($xclass_content_title) ? $xclass_content_title : ''; ?><?php if($page_header_title_char_count > 15 && substr($page_header_title, 0, 1) !== '<'): ?> entry-title--sm<?php endif; ?>">
        <?php if(isset($page_header_title_icon) && $page_header_title_icon != false): ?> 
          <i class="inline-flex items-center mr-075" style="width: 0.75em; height: 0.7em;">
            <?php if($page_header_title_icon['mime_type'] == 'image/svg+xml'): ?>
              <?= oax_inline_svg([
                'svg' => $page_header_title_icon,
                'xclass' => 'w-full h-full',
              ]); ?>            
            <?php else: ?>
              <?= oax_image([
                'img' => $page_header_title_icon,
                'xclass' => 'w-full h-full'
              ]); ?>
            <?php endif; ?>
          </i>
        <?php endif; ?>        
        
        <?php if( $page_header_title != false): ?>
          <?php if( $headline_split && substr($page_header_title, 0, 1) !== '<'): ?>

            <?php 
              $page_header_title_arr = explode(' ', $page_header_title);
              $page_header_title_arr = array_map(function($value){
                return '<span>' . $value . '</span>';
              }, $page_header_title_arr);
            ?>
            <?= implode(' ', $page_header_title_arr); ?>

          <?php else: ?>
            <?= $page_header_title ?>
          <?php endif; ?>
        <?php endif; ?>        
      </h1>	
      <?php if(isset($page_header_content) && !empty($page_header_content)): ?>
        <div class="c-section__content-copy mt-1 <?= isset($xclass_content_body) ? $xclass_content_body : ''; ?>">
          <?= $page_header_content; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</header>