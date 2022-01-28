/* eslint-disable */

const NativeWPLightbox = {
  init(container){
    this.container = container;
    this.$container = jQuery(container);

    this.initLightBox();
  },
  
  reInit(container){
    this.init(container); 
  },

  initLightBox(){
    if(this.$container.find('.gallery').length){
      this.$container.find('.gallery').each(function(i, el){
        lightGallery(el, {
          selector : 'a',
          subHtmlSelectorRelative : true,
          subHtml : '+ .gallery-caption'
        });
        jQuery(el).find('a').addClass('no-barba');
      });
    }    
  }
};

export default NativeWPLightbox;