<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package oax_ohpardon
 */

$themeConfig = json_decode( file_get_contents( get_template_directory() . "/config-theme.json" ) );
require_once('lib/getID3-1.9.20/getid3/getid3.php');

 /**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function oax_ohpardon_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	return $classes;
}
add_filter( 'body_class', 'oax_ohpardon_body_classes' );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function oax_ohpardon_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'oax_ohpardon_pingback_header' );

/**
 * Get Request Headers
 */
function oax_getRequestHeaders() {
  $headers = array();
  foreach($_SERVER as $key => $value) {
    if (substr($key, 0, 5) <> 'HTTP_') {
        continue;
    }
    $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
    $headers[$header] = $value;
  }
  return $headers;
}

/**
 * Is Ajax?
 */
function oax_is_ajax(){
	$all_headers = oax_getRequestHeaders();
	if((isset($all_headers['x-barba']) && $all_headers['x-barba'] == 'yes') || 
		(isset($all_headers['X-Barba']) && $all_headers['X-Barba'] == 'yes')){
		return true;
	}
	return false;
}

function oax_is_mobile(){
	$useragent = $_SERVER['HTTP_USER_AGENT'];
	return preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4));
}

function oax_get_current_namespace(){
	global $post;
	$namespace = 'page';
	$current_template = str_replace('.php', '', basename(get_page_template()));

	if($namespace === $current_template){
		if($namespace != get_post_type()){
			$namespace = get_post_type();
		}
	} else {
		$namespace = $current_template;
	}
	
	if( is_tax() ){
		$namespace = str_replace('_', '-', get_queried_object()->taxonomy);
	}
	if( is_archive() ){
		$namespace = 'archive';
	}
	if( is_author() ){
		$namespace = 'author';
	}
	if ( is_home() && ! is_front_page() ){
		$namespace = 'blog';
	}
	if ( class_exists( 'woocommerce' ) && is_checkout() ) {
		$namespace = 'checkout';
	}
	if ( class_exists( 'woocommerce' ) && is_cart() ) {
		$namespace = 'cart';
	}
	if ( class_exists( 'woocommerce' ) && is_account_page() ){
		$namespace = 'account';
	}

	return $namespace;
}

/**
 * Get Current URL
 */
function oax_get_current_url($inkl_params = true){
	if($inkl_params == false){
		$current_url = explode("?", $_SERVER['REQUEST_URI']);
		return (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$current_url[0]";
	}
	return (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}

/**
 * Load Template Parts with 
 */
function load_template_part($template_name, $part_name = null) {
	ob_start();
	get_template_part($template_name, $part_name);
	$var = ob_get_contents();
	ob_end_clean();
	return $var;
}

/**
 * Like get_template_part() put lets you pass args to the template file
 * Args are available in the tempalte as key from params
 */
function oax_get_template_part( $slug, array $params = array(), $output = true ) {
	if(!$output) ob_start();
	if (!$template_file = locate_template("{$slug}.php", false, false)) {
		trigger_error(sprintf(__('Error locating %s for inclusion', 'sage'), $file), E_USER_ERROR);
	}
	extract($params, EXTR_SKIP);
	require($template_file);
	if(!$output) return ob_get_clean();
}

/**
 * Like oax_get_template_part() but gets component put lets you pass args to the template file
 * Args are available in the tempalte as key from params
 */
function oax_get_component( $slug, array $params = array(), $output = true ) {
	if(!$output) ob_start();
	if (!$template_file = locate_template("template-parts/components/{$slug}.php", false, false)) {
		trigger_error(sprintf(__('Error locating %s for inclusion', 'sage'), $file), E_USER_ERROR);
	}
	extract($params, EXTR_SKIP);
	require($template_file);
	if(!$output) return ob_get_clean();
}

/**
 * Get Asset
 */
function oax_asset($path = '', $asset_dir = '/assets/'){
	$asset_path = get_template_directory_uri() . $asset_dir . $path;
	return $asset_path;
}

function oax_get_attachment( $attachment_id = 0 ) {
	$attachment = get_post( $attachment_id );
	return array(
		'alt' => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
		'caption' => $attachment->post_excerpt,
		'description' => $attachment->post_content,
		'href' => get_permalink( $attachment->ID ),
		'src' => $attachment->guid,
		'title' => $attachment->post_title
	);
}

function oax_get_image_obj($attachment_id = 0) {
	$sizes = get_intermediate_image_sizes();
	if(!$attachment_id) $attachment_id = get_post_thumbnail_id();

	$images = array();
	foreach ( $sizes as $size ) {
			$images[] = wp_get_attachment_image_src( $attachment_id, $size );
	}

	return $images;
}

/**
 * Build image
 */
function oax_image($args){
	$url = isset($args['url']) ? $args['url'] : '';

	$has_wrapper = isset($args['wrapper']) && $args['wrapper'] == true;
	$has_holder = isset($args['holder']) && $args['holder'] == true;
	$has_caption = (isset($args['caption']) && $args['caption'] != false) ? $args['caption'] : false;
	$has_placeholder = isset($args['placeholder']) && $args['placeholder'] == true;

	$is_post = isset($args['post']) && !empty($args['post']);
	$is_img = isset($args['img']) && !empty($args['img']);
	// $is_lazy = isset($args['lazy']) && $args['lazy'] != false; // deprecated
	$is_lazy = isset($args['lazy']) && $args['lazy'] !== true ? $args['lazy'] : true; 
	$is_lazy_slider = $is_lazy && isset($args['lazy']) && $args['lazy'] === 'slider';
	$is_sizes = isset($args['sizes']) ? $args['sizes'] : false;
	$is_srcset = isset($args['srcset']) ? $args['srcset'] : false;

	if(!isset($args['url']) && isset($args['src'])){
		$url = $args['src'];
	}

	if($is_post){
		$post = $args['post'];
		$url = array(
			'thumbnail-blur' => get_the_post_thumbnail_url($post, 'thumbnail-blur'),
			'thumbnail' => get_the_post_thumbnail_url($post, 'thumbnail'),
			'medium' => get_the_post_thumbnail_url($post, 'medium'),
			'medium-xl' => get_the_post_thumbnail_url($post, 'medium-xl'),
			'large' => get_the_post_thumbnail_url($post, 'large'),
			'large-xl' => get_the_post_thumbnail_url($post, 'large-xl'),
		);
		
		if(empty($url['thumbnail'])){
			$url = '';
		}
	}

	if($is_img){
		if(is_int($args['img'])){
			$url = array(
				'thumbnail-blur' => wp_get_attachment_image_src($args['img'], 'thumbnail-blur' )[0],
				'thumbnail' => wp_get_attachment_image_src($args['img'], 'thumbnail')[0],
				'medium' => wp_get_attachment_image_src($args['img'], 'medium')[0],
				'medium-xl' => wp_get_attachment_image_src($args['img'], 'medium-xl')[0],
				'large' => wp_get_attachment_image_src($args['img'], 'large')[0],
				'large-xl' => wp_get_attachment_image_src($args['img'], 'large-xl')[0],
			);		
		} else {			
			$url = array(
				'thumbnail-blur' => $args['img']['sizes']['thumbnail-blur'],
				'thumbnail' => $args['img']['sizes']['thumbnail'],
				'medium' => $args['img']['sizes']['medium'],
				'medium-xl' => $args['img']['sizes']['medium-xl'],
				'large' => $args['img']['sizes']['large'],
				'large-xl' => $args['img']['sizes']['large-xl'],
			);

			if(!empty($args['img']['alt'])) $args['alt'] = $args['img']['alt'];
			if(!empty($args['img']['alt'])) $args['alt'] = $args['img']['alt'];
		}
	}

	if($url != ''){
		$img = '';

		if($has_wrapper){
			$img .= '<figure';
			$img .= ' class="overflow-hidden relative c-image__figure';
			if(isset($args['xclass_wrapper'])){
				$img .= ' '. $args['xclass_wrapper'];
			}
			if($has_holder){
				$img_dim = oax_get_image_dimensions($url);

				if(!$has_caption) {
					$img .= ' relative" style="padding-bottom: '. $img_dim['padding'];					
				}
			}
			$img .= '">';
		}
		
		if($has_wrapper && $has_holder && $has_caption){
			$img .= '<div class="relative" style="padding-bottom: '. $img_dim['padding'] . '">';					
		}

		$img .= '<img';
		
		if($is_lazy){
			if($has_placeholder && ($is_post || $is_img)){
				$img .= ' src="'. $url['thumbnail-blur'] .'"';
			} else {
				$img .= ' src="'. oax_get_empty_img_src() .'"';
			}
		}

		if(!$is_post && !$is_img){
			if(!$is_lazy){
				$img .= ' src="'. $url .'"';
			} else {				
				$img .= ' data-src="'. $url .'"';
			}
		} else {
			
			$default_src = $url['thumbnail'];
			
			$default_srcset = $url['thumbnail'] .' 150w, ';
			$default_srcset .= $url['medium'] .' 300w, ';
			$default_srcset .= $url['medium-xl'] .' 768w, ';
			$default_srcset .= $url['large'] .' 1024w, ';
			$default_srcset .= $url['large-xl'] .' 1500w';

			if($is_srcset !== false){
				$default_srcset = '';
				$ii = 1; foreach($is_srcset as $size => $src){
					$default_srcset .= $url[$src] . ' ' . $size;
					if($ii < count($is_srcset)){
						$default_srcset .= ', ';	
					}
					$ii++;
				}
			}

			if(!$is_lazy){
				$img .= ' src="'. $default_src .'"';
				$img .= ' srcset="'. $default_srcset .'"';
			} else {
				$img .= ' data-src="'. $default_src .'"';
				$img .= ' data-srcset="'. $default_srcset .'"';
			}
			
			
			if($is_sizes !== false){
				$img .= ' sizes="';
				if($is_sizes !== 'default'){
					$img .= $is_sizes;					
				} else {
					$img .= '(min-width: 992px) 50vw, 100vw';
				}
				$img .= '"';	
			}
			
		}

		$img .= ' class="c-image';
		
		if($is_lazy){
			if(!$is_lazy_slider){
				$img .= ' js--lazy';
			} else {
				$img .= ' swiper-lazy';
			}
			if($has_placeholder){
				$img .= ' has-placeholder';
			}
		}

		if($has_holder){
			$img .= ' ratio-inner';
		}

		if(isset($args['xclass']) && !empty($args['xclass'])){
			$img .= ' ' . $args['xclass'];
		}
		
		$img .= '"';
		
		if(isset($args['data'])){
			foreach($args['data'] as $data_key => $data_value){
				$img .= ' data-' . $data_key . '="' . $data_value . '"';
			}
		}

		if(isset($args['xattr'])){
			foreach($args['xattr'] as $attr_key => $attr_value){
				$img .= ' ' . $attr_key . '="' . $attr_value . '"';
			}			
		}

		if(isset($args['alt'])){
			$img .= ' alt="';
				$img .= $args['alt'];
			$img .= '"';
		}

		$img .= '>';

		if($is_lazy_slider){
			$img .= '<div class="swiper-lazy-preloader"></div>';
		}

		if($has_wrapper && $has_holder && $has_caption){
			$img .= '</div>';
		}

		if($has_wrapper && $has_caption !== false){
			$img .= '<figcaption class="c-image__caption';
			if(isset($args['xclass_caption'])){
				$img .= ' ' . $args['xclass_caption'];
			}
			$img .= '">';
				$img .= $has_caption;
			$img .= '</figcaption>';
		}
		
		if($has_wrapper){
			$img .= '</figure>';
		}

		return $img;
	}

	return false;
}

function oax_get_empty_img_src(){
	return "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
}

function oax_get_image_dimensions($src){
	$dim = [];

	if(is_array($src) && isset($src['width']) && isset($src['height'])){
	
		$width = $src['width'];
		$height = $src['height'];
	
	} else {
		
		if(is_array($src) && isset($src['large-xl'])){
			$src = $src['large-xl'];
		}

		$replaceUrl = esc_url( home_url( '/' ));
		if( function_exists('icl_object_id') && null !== ICL_LANGUAGE_CODE && ICL_LANGUAGE_CODE !== 'de'){
			$replaceUrl = str_replace( ICL_LANGUAGE_CODE . '/', '', $replaceUrl);
		}	
		$src = str_replace($replaceUrl, ABSPATH, $src);

		list($width, $height, $type, $attr) = getimagesize($src);
	}
	
	$dim['width'] 	= $width;
	$dim['height'] 	= $height;
	$dim['padding'] = ($height / $width * 100) . '%';

	return $dim;
}

function oax_inline_svg($args){
	
	if(gettype($args['svg']) === 'string'){
		$svg_url = $args['svg'];
	} else if(gettype($args['svg']) === 'array') {
		$svg_url = $args['svg']['url'];
	}

	$svg = file_get_contents(ABSPATH . str_replace(get_site_url(), '', $svg_url));
	$svg = preg_replace('#\s(id)="[^"]+"#', '', $svg);
	
	if(isset($args['xclass'])){
		$svg = str_replace('<svg', '<svg class="'. $args['xclass'] .'"', $svg);
	}
	
	// remove html comments
	$svg = preg_replace('/<!--(.|\s)*?-->/', '', $svg);
	$svg = preg_replace('/<\?xml.*?\/>/im', '', $svg);
	$svg = str_replace('<?xml version="1.0" encoding="utf-8"?>', '', $svg);
	
	return $svg;
}

function oax_video($args){
	if( !empty($args['src']) || !empty($args['video']) ){
		
		$src = '';
		$video = '';
		$has_wrapper = isset($args['wrapper']) ? $args['wrapper'] : false;
		$has_holder = isset($args['holder']) ? $args['holder'] : false;
		$is_playbtn = isset($args['playbtn']) ? $args['playbtn'] : true;
		$is_muted = isset($args['muted']) ? $args['muted'] : true;
		$is_autoplay = isset($args['autoplay']) ? $args['autoplay'] : true;
		$is_loop = isset($args['loop']) ? $args['loop'] : true;
		$is_controls = isset($args['controls']) ? $args['controls'] : false;
		$is_playsinline = isset($args['playsinline']) ? $args['playsinline'] : true;
		$is_poster = isset($args['poster']) ? $args['poster'] : false;
		$is_preload = isset($args['preload']) ? $args['preload'] : true;
		$is_videojs = isset($args['videojs']) ? $args['videojs'] : false;
		$is_plyr = isset($args['videojs']) ? $args['videojs'] : false;
		$is_lazy = isset($args['lazy']) ? $args['lazy'] : false;
		$mime_type = isset($args['video']) && isset($args['video']['mime_type']) ? $args['video']['mime_type'] : 'video/mp4';

		if(!empty($args['src'])){
			if(is_array($args['src'])){

			} else { 
				$src = $args['src'];
			}
		}

		if(!empty($args['video'])){
			if(is_array($args['video'])){
				$src = $args['video']['url'];
			} else {

			}
		}

		$video_info = oax_get_video_info($src);
		
		if($has_wrapper){
			$video .= '<figure';
			$video .= ' class="overflow-hidden relative c-video__figure';
			if(isset($args['xclass_wrapper'])){
				$video .= ' '. $args['xclass_wrapper'];
			}
			$video .= '"';

			if($has_holder){
				$vid_dim = $video_info;
				$video .= ' style="padding-bottom: '. $vid_dim['padding'] .'"';
			}

			$video .= '>';
		}

		$video .= '<video';

		$video .= ' class="c-video ';

		if($has_holder){
			$video .= 'absolute pin-l pin-t w-full h-full object-fit-cover ';
		}

		if($is_lazy){
			$video .= 'js--lazy ';
		}

		if(isset($args['xclass'])){
			$video .= $args['xclass'];
		}
		if($is_videojs){
			$video .= ' video-js';
		}
		if($is_plyr){
			$video .= ' js--player';
		}
		if(!$is_playbtn){
			$video .= ' c-video--no-playbtn';
		}
		$video .= '"';

		if(isset($args['data'])){
			foreach($args['data'] as $data_key => $data_value){
				$video .= ' data-' . $data_key . '="' . $data_value . '"';
			}
		}

		$video .= ' data-duration="' . $video_info['duration'] . '"';

		if(isset($args['id'])){
			$video .= ' id="' . $args['id'] . '"';
		}

		if(isset($args['xattr'])){
			foreach($args['xattr'] as $data_key => $data_value){
				$video .= ' '. $data_key . '="' . $data_value . '"';
			}
		}		

		if($is_muted){
			$video .= ' muted';
		}
		if($is_autoplay){
			$video .= ' autoplay';
		}
		if($is_loop){
			$video .= ' loop';
		}
		if($is_controls){
			$video .= ' controls';
		}		
		if($is_playsinline){
			$video .= ' playsinline';
		}
		if($is_lazy || !$is_preload){
			$video .= ' preload="none"';
		} else {
			$video .= ' preload="auto"';
		}
		if($is_poster != false){
			if($is_lazy){
				$video .= ' data-poster="';
			} else{
				$video .= ' poster="';
			}
			if(is_array($is_poster)){
				$video .= $is_poster['url'];
			} else { 
				$video .= $is_poster;
			}
			$video .= '"';
		}

		$video .= '>';

		$video .= '<source ';
		if($is_lazy === 'fail'){
			$video .= 'data-src="';
		} else {
			$video .= 'src="';
		}
		$video .= $src;
		$video .= '" type="';
		$video .= $mime_type;
		$video .= '">';
		
		$video .= '</video>';

		if($has_wrapper){
			$video .= '</figure>';
		}

		return $video;

	}
}

function oax_get_video_info($src){
	$dim = [];

	$getID3 = new getID3;

	$replaceUrl = esc_url( home_url( '/' ));
	if( null !== ICL_LANGUAGE_CODE && ICL_LANGUAGE_CODE !== 'de'){
		$replaceUrl = str_replace( ICL_LANGUAGE_CODE . '/', '', $replaceUrl);
	}
	$src = str_replace( $replaceUrl, ABSPATH, $src);

	$video_info = $getID3->analyze($src);

	return [
		'width' => $video_info['video']['resolution_x'],
		'height' => $video_info['video']['resolution_y'],
		'padding' => $video_info['video']['resolution_y'] / $video_info['video']['resolution_x'] * 100 . '%',
		'ratio' => $video_info['video']['resolution_y'] . '/' . $video_info['video']['resolution_x'],
		'duration' => $video_info['playtime_seconds']
	];
}

function oax_yt($args){
	$url = $src;

	if(is_array($args) && !empty($args['src'])){
		$url = $args['src'];
	}

	$is_lazy = isset($args['lazy']) && $args['lazy'] === true ? true : false;

	preg_match("#(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\/)[^&\n]+|(?<=v=)[^&\n]+|(?<=youtu.be/)[^&\n]+#", $url, $matches);
	$id = $matches[0];
	
	$youtube = '<figure class="c-yt c-yt--iframe ratio-16/9 overflow-hidden relative';

	if($is_lazy){ $youtube .= ' js--yt'; }

	if(isset($args['xclass'])){
		$youtube .= ' ' . $args['xclass'];
	}

	$youtube .= '"';

	if($is_lazy){ $youtube .= ' data-embed="'. $id .'"'; }

	$youtube .= '>';

	if(!$is_lazy){
		$youtube .= '<iframe class="c-yt__iframe absolute pin-l pin-t w-full h-full" frameborder="0" allow="autoplay; encrypted-media"';
			$youtube .= ' src="https://www.youtube.com/embed/'. $id .'"';
			$youtube .= ' allowfullscreen>';
		$youtube .= '</iframe>';
	}
	$youtube .= '</figure>';
	
	return $youtube;
}

function oax_get_theme_config_json(){
	return json_decode(file_get_contents( get_template_directory() . "/config-theme.json"), true);
}

function oax_get_theme_part($part){
	return file_get_contents(get_template_directory_uri() . '/' . $part);
}

function oax_breadcrumb(){
 
	$delimiter = '&raquo;';
	$home = 'Home'; 
	$homeLink = get_bloginfo('url');
	$before = '<li class="current-page">'; 
	$after = '</li>'; 
	
	$breadcrumb_items = array(
		[
			'name' => $home,
			'url' => $homeLink 
		]
	);
	
	if ( !is_home() && !is_front_page() || is_paged() ) {
		
		global $post;

		// echo '<a href="' . $homeLink . '">' . $home . '</a> ' . $delimiter . ' ';
	
		if ( is_category()) {
			
			global $wp_query;
			$cat_obj = $wp_query->get_queried_object();
			$thisCat = $cat_obj->term_id;
			$thisCat = get_category($thisCat);
			$parentCat = get_category($thisCat->parent);

			// if ($thisCat->parent != 0) echo(get_category_parents($parentCat, TRUE, ' ' . $delimiter . ' '));
			// echo $before . single_cat_title('', false) . $after;
			
			$breadcrumb_items[] = array(
				'name' => single_cat_title('', false)
			);
				
		} elseif ( is_day() ) {

			$breadcrumb_items[] = array(
				'name' => get_the_time('Y'),
				'url' => get_year_link(get_the_time('Y'))
			);	
			$breadcrumb_items[] = array(
				'name' => get_the_time('F'),
				'url' => get_month_link(get_the_time('Y'),get_the_time('m'))
			);		
			$breadcrumb_items[] = array(
				'name' => get_the_time('d')
			);									
			
		} elseif ( is_month() ) {

			$breadcrumb_items[] = array(
				'name' => get_the_time('Y'),
				'url' => get_year_link(get_the_time('Y'))
			);
			$breadcrumb_items[] = array(
				'name' => get_the_time('F')
			);					
			
		} elseif ( is_year() ) {
			
			$breadcrumb_items[] = array(
				'name' => get_the_time('Y')
			);
			
		} elseif ( is_single() && !is_attachment() ) {
			
			if ( get_post_type() != 'post' ) {
				$post_type = get_post_type_object(get_post_type());
				$slug = $post_type->rewrite;

				// @OAX: Custom.
				//
				/*
				if($post_type->name === 'portfolio' && !empty(get_field('page_work', 'option'))){
					$breadcrumb_items[] = array(
						'name' => get_field('page_work', 'option')->post_title,
						'url' => get_permalink(get_field('page_work', 'option')->ID)
					);
				} elseif($post_type->name === 'people' && !empty(get_field('page_about_us', 'option'))){
					$breadcrumb_items[] = array(
						'name' => get_field('page_about_us', 'option')->post_title,
						'url' => get_permalink(get_field('page_about_us', 'option')->ID)
					);
				} else {
					$breadcrumb_items[] = array(
						'name' => $post_type->labels->singular_name,
						'url' => $homeLink . '/' . $slug['slug'] . '/'
					);	
				}
				*/

				$breadcrumb_items[] = array(
					'name' => get_the_title()
				);							

			} else {
				$post_type = get_post_type_object(get_post_type());
				$slug = $post_type->rewrite;				
				$cat = get_the_category(); $cat = $cat[0];
				
				/** Blog Page: */
				/*
				$breadcrumb_items[] = array(
					'name' => get_the_title(get_option( 'page_for_posts' )),
					'url' => get_permalink(get_option( 'page_for_posts' ))
				);
				*/
				
				$breadcrumb_items[] = array(
					'name' => get_the_title()
				);						
				
			}

		} elseif( is_tax() ){
			$queried_object = get_queried_object();
			$breadcrumb_items[] = array(
				'name' => $queried_object->name
			);	

		} elseif ( !is_single() && !is_page() && get_post_type() != 'post' && !is_404() ) {

			if( function_exists('is_woocommerce') && is_woocommerce()){
				
				if(is_shop()){
					$breadcrumb_items[] = array(
						'name' => get_the_title(get_option( 'woocommerce_shop_page_id' ))
					);
				} else {

				}
				
			} else {
				$post_type = get_post_type_object(get_post_type());
				if($post_type){
					$breadcrumb_items[] = array(
						'name' => $post_type->labels->singular_name
					);
				}
			}

		} elseif ( is_attachment() ) {

			$parent = get_post($post->post_parent);
			$cat = get_the_category($parent->ID); $cat = $cat[0];
			// echo get_category_parents($cat, TRUE, ' ' . $delimiter . ' ');
			
			$breadcrumb_items[] = array(
				'name' => $parent->post_title,
				'url' => get_permalink($parent)
			);	
			$breadcrumb_items[] = array(
				'name' => get_the_title()
			);
	
		} elseif ( is_page() && !$post->post_parent ) {
			
			$breadcrumb_items[] = array(
				'name' => get_the_title()
			);
	
		} elseif ( is_page() && $post->post_parent ) {

			$parent_id = $post->post_parent;
			$breadcrumbs = array();
			while ($parent_id) {
				$page = get_page($parent_id);
				$breadcrumbs[] = ['url' => get_permalink($page->ID), 'name' => get_the_title($page->ID)];
				$parent_id = $page->post_parent;
			}
		
			$breadcrumbs = array_reverse($breadcrumbs);

			foreach ($breadcrumbs as $crumb) $breadcrumb_items[] = $crumb;
		
			$breadcrumb_items[] = array(
				'name' => get_the_title()
			);
	
		} elseif ( is_search() ) {
			
			// echo $before . 'Ergebnisse für Ihre Suche nach "' . get_search_query() . '"' . $after;
	
		} elseif ( is_tag() ) {
			
			// echo $before . 'Beiträge mit dem Schlagwort "' . single_tag_title('', false) . '"' . $after;
	
		} elseif ( is_404() ) {
			
			// echo $before . 'Fehler 404' . $after;
			
		}
	
		if ( get_query_var('paged') ) {
			
			/*
			if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ' (';
			
				echo ': ' . __('Seite') . ' ' . get_query_var('paged');
			
			if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ')';
			*/
		}

		echo '<nav class="c-breadcrumb sr-only">';
		echo '<ol class="c-breadcrumb__list" itemscope itemtype="http://schema.org/BreadcrumbList">';		

		foreach($breadcrumb_items as $key => $item){
			echo '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
				if(isset($item['url'])){
					echo '<a itemprop="item" href="'. $item['url'] .'">';	
				} else {
					echo '<span itemprop="item">';
				}
				
				echo '<span itemprop="name">'. $item['name'] .'</span>';
				echo '<meta itemprop="position" content="' . ($key + 1) . '" />';
				
				if(isset($item['url'])){
					echo '</a>';	
				} else {
					echo '</span>';
				}
									
			echo '</li>';
		}
	
		echo '</ol>';
		echo '</nav>';
	
	} 	
}

function oax_get_random_bg_color_class(){
	$bg_colors = [];
	
	if( isset($themeConfig->colors) ){
		foreach($themeConfig->colors as $key => $val){
			$bg_colors[] = 'bg-' . $key;
		}
	}

	return $bg_colors[array_rand($bg_colors)];	
}

function oax_show_preloader(){
	
	global $post;
	
	/*
	$pageRefreshed = (isset($_SERVER['HTTP_CACHE_CONTROL']) && $_SERVER['HTTP_CACHE_CONTROL'] == 'max-age=0');	
	$isNotFirstSession = (isset($_SESSION["oax_preloader"]) && $_SESSION["oax_preloader"] == "TRANSITION");

	if(!$isNotFirstSession){
		return true;
	} else if( isset( $_COOKIE['oax_preloader'] ) && strtoupper( $_COOKIE['oax_preloader'] ) == 'TRANSITION' ){
		return 'TRANSITION';
	} else if( isset( $_COOKIE['oax_preloader'] ) && strtoupper( $_COOKIE['oax_preloader'] ) == 'PRELOADER' ){
		return true;
	} else if( $isNotFirstSession ){
		return 'TRANSITION';
	} else */
	if( is_admin_bar_showing() ){
		return false;
	} else if( isset($_GET) && isset($_GET['nopreloader']) ){
		return false;
	} else if( isset($_REQUEST) && isset($_REQUEST['nopreloader']) ){
		return false;
	}
	
	return false;
}

function oax_get_client_ip(){
	$ipaddress = '';
	if (isset($_SERVER['HTTP_CLIENT_IP'])) {
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
	} else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else if (isset($_SERVER['HTTP_X_FORWARDED'])) {
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
	} else if (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
	} else if (isset($_SERVER['HTTP_FORWARDED'])) {
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
	} else if (isset($_SERVER['REMOTE_ADDR'])) {
			$ipaddress = $_SERVER['REMOTE_ADDR'];
	} else {
			$ipaddress = 'UNKNOWN';
	}

	return $ipaddress;
}

function oax_get_current_user_location(){
	if( !session_id() ) session_start();

	if( !isset($_SESSION['userlocation']) ){
		$user_public_ip = oax_get_client_ip();
		
		// get nur mit allow_url_include
		//

		// $json     = file_get_contents("http://ipinfo.io/$user_public_ip/geo");
		// $json		= $user_public_ip !== 'UNKNOWN' ? file_get_contents("https://ipapi.co/$user_public_ip/json/") : [];
		$json			= array();
		// $json     = json_decode($json, true);

		$country  = isset($json['country']) ? $json['country'] : 'DE';
		$region   = isset($json['region']) ? $json['region'] : 'Niedersachsen';
		$city     = isset($json['city']) ? $json['city'] : 'Oldenburg (Oldb)';
		// $loc 			= isset($json['loc']) ? $json['loc'] : '53.14118,8.21467';
		$loc 			= isset($json['latitude']) && isset($json['longitude']) ? $json['latitude'] . ',' . $json['longitude'] : '53.14118,8.21467';
		$_SESSION['userlocation'] = [
			'country' => $country,
			'region' 	=> $region,
			'city' 		=> $city,
			'loc' 		=> $loc,
			'setby'		=> 'APP'
		];
	}

	return $_SESSION['userlocation'];
}

function oax_get_distance_between_user_and_coords( $lat_to, $lng_to ) {
	$userLocation = oax_get_current_user_location();
	$userLocation['lat'] = explode(',', $userLocation['loc'])[0];
	$userLocation['lng'] = explode(',', $userLocation['loc'])[1];
	$lat_from = $userLocation['lat'];
	$lng_from = $userLocation['lng'];

	/*
	$tribeGeo = new Tribe__Events__Pro__Geo_Loc();
	$distance = $tribeGeo->get_distance_between_coords($userLocation['lat'], $userLocation['lng'], $userLocation['lat'], $userLocation['lng']);
	return $distance;
	*/

	$delta_lat = $lat_to - $lat_from;
	$delta_lng = $lng_to - $lng_from;
	$earth_radio = 6371;

	$a        = sin( deg2rad( (double) ( $delta_lat / 2 ) ) ) * sin( deg2rad( (double) ( $delta_lat / 2 ) ) ) + cos( deg2rad( (double) $lat_from ) ) * cos( deg2rad( (double) $lat_to ) ) * sin( deg2rad( (double) ( $delta_lng / 2 ) ) ) * sin( deg2rad( (double) ( $delta_lng / 2 ) ) );
	$c        = asin( min( 1, sqrt( $a ) ) );
	$distance = 2 * $earth_radio * $c;
	$distance = round( $distance, 0 );

	return $distance;	
}

function oax_get_user_event_date(){
	if( !session_id() ) session_start();

	if(!isset($_SESSION['usereventdate'])){
		$_SESSION['usereventdate'] = [];
		$_SESSION['usereventdate']['start_date'] = date('Y-m-d');
		$_SESSION['usereventdate']['formatted'] = date('d. M Y');
	}
	
	return $_SESSION['usereventdate'];
}