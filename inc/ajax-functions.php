<?php
function oax_ajax_stuff() {
  $request = $_REQUEST;
}
add_action('wp_ajax_oax_ajax_stuff', 'oax_ajax_stuff');
add_action('wp_ajax_nopriv_oax_ajax_stuff', 'oax_ajax_stuff');

add_action('wp_ajax_oax_ajax_cart_update_qty', 'oax_ajax_cart_update_qty');
add_action('wp_ajax_nopriv_oax_ajax_cart_update_qty', 'oax_ajax_cart_update_qty');

function oax_ajax_cart_update_qty(){
  if ( isset( $_POST['cart_item_key'], $_POST['cart_item_qty'] ) && ! empty( $_POST['cart_item_key'] ) ) {
    $cart_item = WC()->cart->get_cart_item( $_POST['cart_item_key'] );
    if ( $cart_item ) {

      $_old_qty_cart_item = $cart_item['quantity'];
      
      if ( (float) $_POST['cart_item_qty'] > 0 ) {
        WC()->cart->set_quantity( $_POST['cart_item_key'], (float) $_POST['cart_item_qty'] );
        
        $is_cart_ok = WC()->cart->check_cart_item_stock();

        if( $is_cart_ok !== true ){
          WC()->cart->set_quantity( $_POST['cart_item_key'], (float) $_old_qty_cart_item );          
          
          echo json_encode( array( 
            'action' => 'update_qty',
            'success' => false,
            'errors' => $is_cart_ok
          ) );         

          die();
        }

      } else {
        WC()->cart->remove_cart_item( $_POST['cart_item_key'] );
      }
    }

    echo json_encode( array( 
      'action' => 'update_qty',
      'success' => true,
      'errors' => false
    ) );

    die();
  }
}