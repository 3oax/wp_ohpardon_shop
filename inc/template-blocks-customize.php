<?php 
// Change Layout Rendering from Block
add_filter( 'render_block', function( $block_content, $block ) {
	
  /**
   * Heading
   */
	if ( 'core/heading' === $block['blockName'] ) {	
		/*
		$block_content_random_int = rand(pow(10, 4-1), pow(10, 4)-1);
    $block_content_random_id = 'v-post__heading-svg--' . $block_content_random_int;
		$block_content_html_id = 'v-post__heading--'. $block_content_random_int;
		$block_content_html_class = '';
		$block_heading_bg_svg = '<svg class="v-post__heading-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2344 272" width="2344" height="272" preserveAspectRatio="xMidYMid slice" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"><defs><clipPath id="'. $block_content_random_id  .'_77"><rect width="2344" height="272" x="0" y="0"></rect></clipPath><mask id="'. $block_content_random_id  .'_78" mask-type="alpha"><g transform="matrix(1,0,0,1,433,136.5)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-392.00628662109375,-14.885649681091309 C-408.559814453125,-15.224709510803223 -427.65447998046875,-3.3040554523468018 -434.6188049316406,11.717015266418457 C-434.6188049316406,11.717015266418457 -460.3811950683594,67.2829818725586 -460.3811950683594,67.2829818725586 C-467.34552001953125,82.3040542602539 -459.5591735839844,94.74154663085938 -443.0048522949219,95.03904724121094 C-443.0048522949219,95.03904724121094 1651.03125,132.67147827148438 1651.03125,132.67147827148438 C1667.5855712890625,132.96897888183594 1684.832763671875,120.31769561767578 1689.52099609375,104.43830108642578 C1689.52099609375,104.43830108642578 1703.53173828125,56.982749938964844 1703.53173828125,56.982749938964844 C1708.219970703125,41.10335922241211 1698.586181640625,27.93523406982422 1682.03271484375,27.596174240112305 C1682.03271484375,27.596174240112305 -392.00628662109375,-14.885649681091309 -392.00628662109375,-14.885649681091309z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(184,71,71)" stroke-opacity="1" stroke-width="0" d=" M-392.00628662109375,-14.885649681091309 C-408.559814453125,-15.224709510803223 -427.65447998046875,-3.3040554523468018 -434.6188049316406,11.717015266418457 C-434.6188049316406,11.717015266418457 -460.3811950683594,67.2829818725586 -460.3811950683594,67.2829818725586 C-467.34552001953125,82.3040542602539 -459.5591735839844,94.74154663085938 -443.0048522949219,95.03904724121094 C-443.0048522949219,95.03904724121094 1651.03125,132.67147827148438 1651.03125,132.67147827148438 C1667.5855712890625,132.96897888183594 1684.832763671875,120.31769561767578 1689.52099609375,104.43830108642578 C1689.52099609375,104.43830108642578 1703.53173828125,56.982749938964844 1703.53173828125,56.982749938964844 C1708.219970703125,41.10335922241211 1698.586181640625,27.93523406982422 1682.03271484375,27.596174240112305 C1682.03271484375,27.596174240112305 -392.00628662109375,-14.885649681091309 -392.00628662109375,-14.885649681091309z"></path></g></g></mask><mask id="'. $block_content_random_id  .'_82" mask-type="alpha"><g transform="matrix(1,0,0,1,1968,196.5)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-1923.52685546875,-79.84700012207031 C-1940.0689697265625,-79.1471939086914 -1957.509765625,-65.7479248046875 -1962.4482421875,-49.944602966308594 C-1962.4482421875,-49.944602966308594 -1979.5517578125,4.786602020263672 -1979.5517578125,4.786602020263672 C-1984.490234375,20.589927673339844 -1975.0699462890625,32.83058166503906 -1958.5289306640625,32.1033935546875 C-1958.5289306640625,32.1033935546875 368.0079650878906,-70.17739868164062 368.0079650878906,-70.17739868164062 C384.5489807128906,-70.90457916259766 402.0157470703125,-84.31759643554688 406.9875793457031,-100.11048126220703 C406.9875793457031,-100.11048126220703 422.9704284667969,-150.8795166015625 422.9704284667969,-150.8795166015625 C427.9422607421875,-166.67239379882812 418.5480041503906,-178.9268035888672 402.00579833984375,-178.2270050048828 C402.00579833984375,-178.2270050048828 -1923.52685546875,-79.84700012207031 -1923.52685546875,-79.84700012207031z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(184,71,71)" stroke-opacity="1" stroke-width="0" d=" M-1923.52685546875,-79.84700012207031 C-1940.0689697265625,-79.1471939086914 -1957.509765625,-65.7479248046875 -1962.4482421875,-49.944602966308594 C-1962.4482421875,-49.944602966308594 -1979.5517578125,4.786602020263672 -1979.5517578125,4.786602020263672 C-1984.490234375,20.589927673339844 -1975.0699462890625,32.83058166503906 -1958.5289306640625,32.1033935546875 C-1958.5289306640625,32.1033935546875 368.0079650878906,-70.17739868164062 368.0079650878906,-70.17739868164062 C384.5489807128906,-70.90457916259766 402.0157470703125,-84.31759643554688 406.9875793457031,-100.11048126220703 C406.9875793457031,-100.11048126220703 422.9704284667969,-150.8795166015625 422.9704284667969,-150.8795166015625 C427.9422607421875,-166.67239379882812 418.5480041503906,-178.9268035888672 402.00579833984375,-178.2270050048828 C402.00579833984375,-178.2270050048828 -1923.52685546875,-79.84700012207031 -1923.52685546875,-79.84700012207031z"></path></g></g></mask><mask id="'. $block_content_random_id  .'_86" mask-type="alpha"><g transform="matrix(1,0,0,1,435,136.5)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill-opacity="1" d=" M-399.0011901855469,-139.2324981689453 C-415.5575256347656,-139.380126953125 -433.5494689941406,-126.85023498535156 -439.1528015136719,-111.27022552490234 C-439.1528015136719,-111.27022552490234 -459.8471984863281,-53.72977828979492 -459.8471984863281,-53.72977828979492 C-465.4505310058594,-38.14976501464844 -456.5574035644531,-25.397340774536133 -440.0008850097656,-25.270902633666992 C-440.0008850097656,-25.270902633666992 1857.0008544921875,-7.729098320007324 1857.0008544921875,-7.729098320007324 C1873.557373046875,-7.602658748626709 1891.4561767578125,-20.182933807373047 1896.944580078125,-35.803802490234375 C1896.944580078125,-35.803802490234375 1916.055419921875,-90.19619750976562 1916.055419921875,-90.19619750976562 C1921.5438232421875,-105.81706237792969 1912.5574951171875,-118.61986541748047 1896.001220703125,-118.76750183105469 C1896.001220703125,-118.76750183105469 -399.0011901855469,-139.2324981689453 -399.0011901855469,-139.2324981689453z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(184,71,71)" stroke-opacity="1" stroke-width="0" d=" M-399.0011901855469,-139.2324981689453 C-415.5575256347656,-139.380126953125 -433.5494689941406,-126.85023498535156 -439.1528015136719,-111.27022552490234 C-439.1528015136719,-111.27022552490234 -459.8471984863281,-53.72977828979492 -459.8471984863281,-53.72977828979492 C-465.4505310058594,-38.14976501464844 -456.5574035644531,-25.397340774536133 -440.0008850097656,-25.270902633666992 C-440.0008850097656,-25.270902633666992 1857.0008544921875,-7.729098320007324 1857.0008544921875,-7.729098320007324 C1873.557373046875,-7.602658748626709 1891.4561767578125,-20.182933807373047 1896.944580078125,-35.803802490234375 C1896.944580078125,-35.803802490234375 1916.055419921875,-90.19619750976562 1916.055419921875,-90.19619750976562 C1921.5438232421875,-105.81706237792969 1912.5574951171875,-118.61986541748047 1896.001220703125,-118.76750183105469 C1896.001220703125,-118.76750183105469 -399.0011901855469,-139.2324981689453 -399.0011901855469,-139.2324981689453z"></path></g></g></mask></defs><g clip-path="url(#'. $block_content_random_id  .'_77)"><g mask="url(#'. $block_content_random_id  .'_86)" style="mix-blend-mode: multiply; display: block;"><g transform="matrix(1,0,0,1,1171.6590576171875,68.48699951171875)" opacity="1"><g opacity="1" transform="matrix(2.9997270107269287,0.040472958236932755,-0.040472958236932755,2.9997270107269287,0,0)"><path fill-opacity="1" d=" M-389.7460021972656,21.226999282836914 C-392.71099853515625,12.996000289916992 -382.9620056152344,-9.878000259399414 -377.3080139160156,-13.538000106811523 C-361.7850036621094,-13.538000106811523 375.6600036621094,-21.226999282836914 388.0989990234375,-21.226999282836914 C393.75299072265625,-16.652999877929688 388.0989990234375,8.963000297546387 375.6600036621094,12.623000144958496 C375.6600036621094,12.623000144958496 -389.7460021972656,21.226999282836914 -389.7460021972656,21.226999282836914z"></path></g></g></g><g mask="url(#'. $block_content_random_id  .'_82)" style="mix-blend-mode: multiply; display: block;"><g transform="matrix(0.9981347918510437,-0.061048541218042374,0.061048541218042374,0.9981347918510437,1168.6829833984375,125.01699829101562)" opacity="1"><g opacity="1" transform="matrix(2.9924750328063965,-0.2123510241508484,0.2123510241508484,2.9924750328063965,0,0)"><path fill-opacity="1" d=" M-389.7569885253906,-18.541000366210938 C-391.7929992675781,-26.020999908447266 -377.6419982910156,-45.185001373291016 -371.97198486328125,-48.68000030517578 C-356.4049987792969,-48.68000030517578 377.8529968261719,16.599000930786133 390.3269958496094,16.599000930786133 C395.2650146484375,19.82900047302246 388.0780029296875,44.85100173950195 374.4880065917969,48.30799865722656 C374.4880065917969,48.30799865722656 -389.7569885253906,-18.541000366210938 -389.7569885253906,-18.541000366210938z"></path></g></g></g><g mask="url(#'. $block_content_random_id  .'_78)" style="mix-blend-mode: multiply; display: block;"><g transform="matrix(0.9998477101325989,0.017452405765652657,-0.017452405765652657,0.9998477101325989,1124.97900390625,196.95799255371094)" opacity="1"><g opacity="1" transform="matrix(2.9986703395843506,0.08931275457143784,-0.08931275457143784,2.9986703395843506,0,0)"><path fill-opacity="1" d=" M-373.42401123046875,26.608999252319336 C-376.5849914550781,18.73900032043457 -366.1919860839844,-3.134999990463257 -360.1650085449219,-6.633999824523926 C-343.6189880371094,-6.633999824523926 357.6960144042969,-26.608999252319336 370.9549865722656,-26.608999252319336 C376.98199462890625,-22.235000610351562 373.281005859375,0.22599999606609344 366.8659973144531,5.461999893188477 C366.8659973144531,5.461999893188477 -373.42401123046875,26.608999252319336 -373.42401123046875,26.608999252319336z"></path></g></g></g></g></svg>';
		
		preg_match_all("/id=\"(.*?)\"/", $block_content, $block_matches_id);
		if( !empty($block_matches_id[1]) ){
			$block_content_html_id = $block_matches_id[1][0];	
			$block_content = preg_replace("/\s?id=\"(.*?)\"/", '', $block_content);
		}

		preg_match_all("/class=\"(.*?)\"/", $block_content, $block_matches_class);
		if( !empty($block_matches_class[1]) ){
			$block_content_html_class = ' ' . $block_matches_class[1][0];
			$block_content = preg_replace("/\s?class=\"(.*?)\"/", '', $block_content);
		}		

		$block_content = str_replace(
			array('<h1>','<h2>','<h3>','<h4>','<h5>','<h6>','</h1>','</h2>','</h3>','</h4>','</h5>','</h6>'),
			array(
				'<div id="'. $block_content_html_id .'" class="v-post__heading'. $block_content_html_class .'"><h1><span class="v-post__heading-bg">'.$block_heading_bg_svg.'</span><span class="v-post__heading-text">',
				'<div id="'. $block_content_html_id .'" class="v-post__heading'. $block_content_html_class .'"><h2><span class="v-post__heading-bg">'.$block_heading_bg_svg.'</span><span class="v-post__heading-text">',
				'<div id="'. $block_content_html_id .'" class="v-post__heading'. $block_content_html_class .'"><h3><span class="v-post__heading-bg">'.$block_heading_bg_svg.'</span><span class="v-post__heading-text">',
				'<div id="'. $block_content_html_id .'" class="v-post__heading'. $block_content_html_class .'"><h4><span class="v-post__heading-bg">'.$block_heading_bg_svg.'</span><span class="v-post__heading-text">',
				'<div id="'. $block_content_html_id .'" class="v-post__heading'. $block_content_html_class .'"><h5><span class="v-post__heading-bg">'.$block_heading_bg_svg.'</span><span class="v-post__heading-text">',
				'<div id="'. $block_content_html_id .'" class="v-post__heading'. $block_content_html_class .'"><h6><span class="v-post__heading-bg">'.$block_heading_bg_svg.'</span><span class="v-post__heading-text">',
				'</span></h1></div>',
				'</span></h2></div>',
				'</span></h3></div>',
				'</span></h4></div>',
				'</span></h5></div>',
				'</span></h6></div>'
			),
			$block_content
		);
		*/
	}

	if( 'core/paragraphcore/embed' === $block['blockName'] ){
		/*
		$dom = new DOMDocument;
		@$dom->loadHTML($block_content);
		$iFrameTag = $dom->getElementsByTagName('iframe');
		$iFrameObj = iterator_to_array($iFrameTag)[0];
		$iFrameAttr = iterator_to_array($iFrameObj->attributes);

		if(strpos($iFrameAttr['src'], 'youtu') !== false){
			
		}
		*/
	}

  /**
   * Video
   */
	if( 'core/video' === $block['blockName'] ) {
		
		$block_content_video = str_replace(
			[
				'<figure class="wp-block-video">',
				'</figure>'			
			], [
				'',
				''
			],
			$block_content
		);	
		
		$dom = new DOMDocument;
		@$dom->loadHTML($block_content_video);
		$videoTags = $dom->getElementsByTagName('video');
		$videoObj = iterator_to_array($videoTags)[0];
		$videoAttr = iterator_to_array($videoObj->attributes);

		$videoSrc = $videoAttr['src'];

		$videoBlock_enabled = [];
		$videoBlock_enabled['autoplay'] = 0;
		$videoBlock_enabled['controls'] = 0;
		$videoBlock_enabled['loop'] = 0;
		$videoBlock_enabled['playsinline'] = 0;

		$is_figcaption = false;
		$figcaptionTag = $dom->getElementsByTagName('figcaption');    
		$figcaptionObj = iterator_to_array($figcaptionTag)[0];

		foreach($videoAttr as $attrKey => $attrVal){
			if( array_key_exists( $attrKey, $videoBlock_enabled ) ){
				$videoBlock_enabled[ $attrKey ] = 1;
			}
		}

		if(isset($figcaptionObj->textContent) && !empty(trim($figcaptionObj->textContent))){
			$is_figcaption = true;
		}

		$block_content = '<div class="v-post__video mt-2 md:mt-3">';
		$block_content .= oax_video(
			array_merge([
				'src' => $videoSrc->value,
				'wrapper' => true,
				'xclass_wrapper' => 'mt-3' . $is_figcaption === false ? ' mb-15' : '',
				'holder' => true,
				'videojs' => true
			], $videoBlock_enabled)
		);

		$block_content .= '</div>';

    if($is_figcaption){
      $block_content .= '<div class="mt-05 font-serif text-sm mb-15"><p>';
      $block_content .= $figcaptionObj->textContent;
      $block_content .= '</p></div>';
    }

		return $block_content;
	}

  /**
   * Video
   */
	if( 'core/image' === $block['blockName'] ) {

		$block_content_img_is_svg = false;
		$block_content_img = str_replace(
			[
				'<figure class="wp-block-image size-'. $block['attrs']['sizeSlug'] .'">',
				'</figure>'			
			], [
				'',
				''
			],
			$block_content
		);	

		$dom = new DOMDocument;
		@$dom->loadHTML($block_content_img);

		$figcaptionTag = $dom->getElementsByTagName('figcaption');    
		$figcaptionObj = iterator_to_array($figcaptionTag);
		if(!empty($figcaptionObj)){
			$figcaptionObj = $figcaptionObj[0];
		}

    $block_content_img_options = [
      'img' => $block['attrs']['id'],
      'lazy' => true,
      'xclass_wrapper' => '',
      'wrapper' => true,
      'holder' => true,
      'xclass' => 'inset',
      'placeholder' => true
    ];

    if(isset($figcaptionObj->textContent) && !empty(trim($figcaptionObj->textContent))){
      $block_content_img_options['caption'] = $figcaptionObj->textContent;
    }


		$img_obj = get_post( $block['attrs']['id'] );
		if($img_obj->post_mime_type === 'image/svg+xml'){
			$block_content_img_is_svg = true;
		}		

    $block_content = '<div class="v-post__img v-post__img--'. $block['attrs']['sizeSlug'] .'">';
    if( $block_content_img_is_svg ){
			$block_content .= oax_inline_svg([
				'svg' => $img_obj->guid,
				'xclass' => 'w-full h-full'
			]);
		} else {
			$block_content .= oax_image($block_content_img_options);
		}
    $block_content .= '</div>';

    return $block_content;
  }  

	return $block_content;
}, 10, 2 );