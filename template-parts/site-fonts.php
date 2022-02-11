<script id="oax-js-fonts" type="text/javascript">
	WebFontConfig = {
  	custom: {
      families: ['Roboto Mono', 'Raisonne Pro'],
			urls: [
				'<?= oax_asset('fonts/RobotoMono/stylesheet.min.css'); ?>',
				'<?= oax_asset('fonts/RaisonnePro/stylesheet.min.css'); ?>'
			]
    },
  };

	(function(d) {
		var wf = d.createElement('script'), s = d.scripts[0];
		wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
		wf.async = true;
		s.parentNode.insertBefore(wf, s);
	})(document);	
</script>