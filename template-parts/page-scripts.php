<?php 
  // Get All Scripts for Ajax Handling.
  global $wp_scripts;
  $all_scripts_from_page = [];
  $all_inlinescripts_from_page = [];
  foreach( $wp_scripts->queue as $handle ){
    $obj = $wp_scripts->registered[$handle];
    $filename = $obj->src;
    $all_scripts_from_page[$obj->handle . '-js'] = $filename;
    if(!empty($obj->extra) && isset($obj->extra['data']) && !empty($obj->extra['data'])){
      $all_inlinescripts_from_page[$obj->handle . '-js-extra'] = $obj->extra['data'];
    }
  }
?>
<div class="oax-js-config--page-scripts hidden" style="display: none;" data-page-scripts='<?= json_encode($all_scripts_from_page); ?>'>
  <?php foreach($all_inlinescripts_from_page as $inlineScriptKey => $inlineScriptVal): ?>
    <script style="display: none;" type="text/html" data-id="<?= $inlineScriptKey; ?>"><?= $inlineScriptVal; ?></script>
  <?php endforeach; ?>
</div>