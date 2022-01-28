<?php global $post; ?>
<script id="oax-js-config">
  window.OAX = window.OAX || {};

  <?php 
    $themeConfig = oax_get_theme_config_json(); 
  ?>

  OAX.debug = <?= $themeConfig['debug']; ?>;

  // Main Config
  OAX.config = {};
  OAX.config.url_base = "<?php echo esc_url( home_url( '/' ) ); ?>";
  OAX.config.url_api = "<?php echo esc_url_raw( rest_url() ) ?>";
  OAX.config.url_template = "<?php echo get_template_directory_uri() ?>/";
  OAX.config.url_assets = "<?php echo get_template_directory_uri() ?>/assets/";
  OAX.config.url_fonts = "<?php echo get_template_directory_uri() ?>/assets/fonts/";
  OAX.config.url_ajax = "<?php echo admin_url( 'admin-ajax.php' )  ?>";
  
  <?php 
    if(oax_show_preloader() !== 'TRANSITION'){
      $is_preloader = oax_show_preloader() ? 'Y' : 'N';
    } else {
      $is_preloader = oax_show_preloader();
    }
  ?>
  OAX.config.is_preloader = "<?php echo $is_preloader; ?>";

  OAX.template = {};

  OAX.template.config = {};
  OAX.template.config.is_ajax = <?= $themeConfig['is_ajax'] ?>;
  
  <?php if(isset($themeConfig['colors'])): ?>
    // Colors
    OAX.template.colors = {};
    <?php foreach($themeConfig['colors'] as $key => $val): ?>
      OAX.template.colors.<?= str_replace('-', '_', $key) ?> = '<?= $val ?>';
    <?php endforeach; ?>
  <?php endif; ?>
  
  OAX.template.loader = {};
  OAX.template.loader.selector = '.lds-ellipsis';
  OAX.template.loader.html = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

  // Preloader
  OAX.preloader = OAX.preloader || {};
  OAX.preloader.is = '<?php echo $is_preloader; ?>';
  OAX.preloader.options = {
    el: '.c-preloader',
    bg: '.c-preloader__bg',
    inner: '.c-preloader__inner',
    logo: '.c-preloader__inner-svg'
  };
</script>

<script id="oax-js-pace">
  paceOptions = {
    initialRate: 0.8,
    ajax: false,    
    restartOnPushState: false,
    restartOnRequestAfter: false,
    elements : {
      selectors : ['body', '.site__inner']
    }
  };
</script>

<script id="oax-js-lazysizes">
  window.lazySizesConfig = window.lazySizesConfig || {};

  // use .js--lazy instead of .lazyload
  window.lazySizesConfig.lazyClass = 'js--lazy';

  //page is optimized for fast onload event
  lazySizesConfig.loadMode = 1;	
</script>