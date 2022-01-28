<?php
function oax_getTemplatePart( WP_REST_Request $request ){
  $requested_template = $request['template'];

  $template = new stdClass();
  
  $template_part = load_template_part( 'template-parts/' . $requested_template );
  
  $template->html = preg_replace('/(\>)\s*(\<)/m', '$1$2', trim($template_part));

  return $template;
}

/*
add_action( 'rest_api_init', function () {
  register_rest_route( 'oax/v1', '/templatepart/(?P<template>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => 'oax_getTemplatePart'
	) );  
} );
*/