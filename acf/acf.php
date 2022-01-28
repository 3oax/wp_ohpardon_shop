<?php include 'acf-blocks.php'; ?>
<?php
function oax_acf_gmaps_init() {
  if( function_exists('tribe_get_option') ){
	  acf_update_setting('google_api_key', tribe_get_option( 'google_maps_js_api_key' ));
  }
}
add_action('acf/init', 'oax_acf_gmaps_init');
