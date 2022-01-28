<?php    
  $current_user_location = oax_get_current_user_location();
  $xclass_prefix = 'c-event-list__filter-item';  
?>    
<span class="btn no-underline <?= $xclass_prefix; ?> <?= $xclass_prefix; ?>--location inline-flex items-center js--user-location<?= isset($xclass) ? ' ' . $xclass : '' ?>">
  <svg class="<?= $xclass_prefix; ?>-icon h-1 w-1 text-red fill-current mr-025 md:mr-0">
    <use href="#icon-marker" />
  </svg>
  <span class="ml-05 mr-025 hidden md:inline">
    <?php if( $current_user_location['setby'] === 'USER' ): ?>
      Eingabe:
    <?php else: ?>
      Erkannt:
    <?php endif; ?>
  </span>
  <span data-event-filter-location="<?= $current_user_location['city']; ?>" data-user-location="<?= $current_user_location['city']; ?>">
    <span><?= $current_user_location['city']; ?></span>
  </span>
  <svg class="<?= $xclass_prefix; ?>-icon <?= $xclass_prefix; ?>-icon--reload js--user-location__icon js--user-location__icon--reload w-1 h-1 relative z-content fill-current text-blue-2-80 ml-05">
    <use href="#icon-reload" />
  </svg>
</span>