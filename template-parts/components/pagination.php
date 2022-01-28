
<?php 
  $hide_content = (isset($only_buttons) && !empty($only_buttons)) ? $only_buttons : false; 
  $only_button = (isset($which_button) && !empty($which_button)) ? $which_button : 'both';
?>

<?php if(!$hide_content): ?> <div class="c-pagination <?= $xclass ?>" data-for="<?= $for; ?>"> <?php endif; ?>

  <?php if($only_button !== 'next'): ?>
  <button class="c-pagination__prev c-pagination__arrow">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve">
	    <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>
    </svg>
  </button>
  <?php endif; ?>
  
  <?php if(!$hide_content): ?>
    <div class="c-pagination__nums">
      <div class="c-pagination__nums-inner">
        <span class="c-pagination__current"><?php echo isset($item_current) ? $item_current : 1 ?> </span>
        <span class="c-pagination__count"><?= $item_count; ?></span>
      </div>
    </div>
  <?php endif; ?>

  <?php if($only_button !== 'prev'): ?>
  <button class="c-pagination__next c-pagination__arrow">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve">
	    <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   "/>
    </svg>     
  </button>
  <?php endif; ?>

<?php if(!$hide_content): ?> </div> <?php endif; ?>