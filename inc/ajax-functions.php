<?php
function oax_ajax_stuff() {
  $request = $_REQUEST;
}
add_action('wp_ajax_oax_ajax_stuff', 'oax_ajax_stuff');
add_action('wp_ajax_nopriv_oax_ajax_stuff', 'oax_ajax_stuff');

function oax_ajax_set_user_location() {
  $request = $_REQUEST;
  $data = $request['data'];
  
  session_start();

  if( isset($data) ){
    if( isset($data['lat']) && isset($data['lng']) && isset($data['country']) && $data['city'] ){
      
      $_SESSION['userlocation']['loc']      = $data['lat'] . ',' . $data['lng'];       
      $_SESSION['userlocation']['country']  = isset($data['country']) ? $data['country'] : '';
      $_SESSION['userlocation']['region']   = isset($data['region']) ? $data['region'] : '';
      $_SESSION['userlocation']['city']     = isset($data['city']) ? $data['city'] : '';
      
      $_SESSION['userlocation']['setby']    = $data['setby'];
  
    }
  }

  header('Content-Type: application/json');
  echo json_encode( $_SESSION['userlocation'] );  

  die();
}
add_action('wp_ajax_oax_ajax_set_user_location', 'oax_ajax_set_user_location');
add_action('wp_ajax_nopriv_oax_ajax_set_user_location', 'oax_ajax_set_user_location');

function oax_ajax_set_user_event_date() {
  $request = $_REQUEST;
  $data = $request['data'];
  
  if( !session_id() ) session_start();

  if( isset($data) ){
    
    if(isset($data['start_date'])){
      $_SESSION['usereventdate']['start_date'] = $data['start_date'];
      $_SESSION['usereventdate']['formatted'] = $data['formatted'];
    }

    if(isset($data['getDom'])){
      
      if(function_exists('w3tc_flush_posts')) w3tc_flush_posts();
      
      oax_ajax_get_section_events();

      die();
    }

  }

  header('Content-Type: application/json');
  echo json_encode( $_SESSION['usereventdate'] );   
  die();
}

add_action('wp_ajax_oax_ajax_set_user_event_date', 'oax_ajax_set_user_event_date');
add_action('wp_ajax_nopriv_oax_ajax_set_user_event_date', 'oax_ajax_set_user_event_date');

function oax_ajax_get_section_events(){
  $usereventdate = oax_get_user_event_date();

  $upcomingEvents = tribe_get_events([
    'posts_per_page' => 5,
    'eventDisplay' => 'custom',
    'start_date' => $usereventdate['start_date'],
  ]);

  $returnArr = [];
  $returnArr['date'] = $usereventdate;

  if(count($upcomingEvents) > 0){
    
    $returnArr['template'] = oax_get_component(
      'slider/slide-track', [
        'items' => $upcomingEvents,
        'ITEMS_STYLE' => 'event'
      ], 
      false
    );

  } else {
    
    $emptyTpl = '<div class="c-slider c-slider--slide-track w-full text-center pt-2 pb-2">';
      $emptyTpl .= 'Keine Veranstaltungen in diesem Zeitraum';
    $emptyTpl .= '</div>';

    $returnArr['template'] = $emptyTpl;
  }

  header('Content-Type: application/json');
  echo utf8_encode( json_encode( $returnArr ) );

  die();
}

add_action('wp_ajax_oax_ajax_cart_update_qty', 'oax_ajax_cart_update_qty');
add_action('wp_ajax_nopriv_oax_ajax_cart_update_qty', 'oax_ajax_cart_update_qty');

function oax_ajax_cart_update_qty(){
  if ( isset( $_POST['cart_item_key'], $_POST['cart_item_qty'] ) && ! empty( $_POST['cart_item_key'] ) ) {
    if ( WC()->cart->get_cart_item( $_POST['cart_item_key'] ) ) {
      if ( (float) $_POST['cart_item_qty'] > 0 ) {
        WC()->cart->set_quantity( $_POST['cart_item_key'], (float) $_POST['cart_item_qty'] );
      } else {
        WC()->cart->remove_cart_item( $_POST['cart_item_key'] );
      }
    }

    echo json_encode( array( 'action' => 'update_qty' ) );

    die();
  }
}