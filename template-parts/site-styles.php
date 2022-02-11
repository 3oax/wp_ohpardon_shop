<?php 
  $themeConfig = oax_get_theme_config_json(); 
?>
<style id="oax-css-config">
  <?php if(isset($themeConfig['colors'])): ?>
    :root {        
    <?php foreach($themeConfig['colors'] as $key => $val): ?>
      --color__<?= $key ?>: <?= $val ?>;
    <?php endforeach; ?>
    }
  <?php endif; ?>
</style>

<?php // get_template_part( 'template-parts/site-styles-critical' ); ?>