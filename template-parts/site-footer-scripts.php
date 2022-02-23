<style>
.lds-ellipsis{display:inline-block;position:absolute;font-size:4rem;left:50%;margin-left:-.5em;top:50%;margin-top:-.5em;width:1em;height:1em;z-index:900}.lds-ellipsis div{position:absolute;top:.39em;width:.19em;height:.19em;border-radius:50%;background:rgba(0,0,0,.75);animation-timing-function:cubic-bezier(0,1,1,0)}.lds-ellipsis div:nth-child(1){left:.1em;animation:lds-ellipsis1 .6s infinite}.lds-ellipsis div:nth-child(2){left:.1em;animation:lds-ellipsis2 .6s infinite}.lds-ellipsis div:nth-child(3){left:.4em;animation:lds-ellipsis2 .6s infinite}.lds-ellipsis div:nth-child(4){left:.6em;animation:lds-ellipsis3 .6s infinite}@keyframes lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes lds-ellipsis2{0%{transform:translate(0,0)}100%{transform:translate(.3em,0)}}
</style>
<style>
	.c-section--product-teaser a:not(.btn) img {
		transition: opacity .3s ease-in-out, visibility .3s ease-in-out;
		will-change: opacity, visibility;
	}
	.c-section--product-teaser a:not(.btn):hover img:first-child {
		opacity: 0;
		visibility: hidden;
	}
	.c-section--product-teaser a:not(.btn):hover img:last-child {
		opacity: 1 !important;
		visibility: visible !important;
	}	
</style>
<script>
	$(document).on('mouseenter', '.c-section--product-teaser a', function(event){
		if(event.type === 'mouseenter'){
			var imgElem = $(event.target).find('img:last-child');
			lazySizes.loader.unveil(imgElem);
		}
	})
</script>