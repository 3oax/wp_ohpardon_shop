/* eslint-disable */
class Modal {
	constructor( settings ) {
    const defaults = {
      container : document.body,
      selector : '.c-modal',
      onOpen: null,
      onClose: null
    };
    this.options = Object.assign( defaults, settings );
		this.initModal();
  }

  initModal(){
    this.isOpen = false;
    this.modal = this.options.container.querySelector(this.options.selector);
    this.initEventListener();
  }

  initEventListener(){
    const self = this;
    $(this.modal).on('click', '.c-modal__close', () => {
      self.close();
    });
  }

  open(){
    this.isOpen = true;
    
    $('body').css({
      'overflow': 'hidden'
    });

    if(this.options.onOpen !== null) this.options.onOpen();
    $(this.modal).addClass('is-open');
  }

  close(){
    this.isOpen = false;

    $('body').removeAttr('style');
    
    if(this.options.onClose !== null) this.options.onClose();
    $(this.modal).removeClass('is-open');
  }

  toggle(){
    if(this.isOpen){
      this.close();
    } else {
      this.open();
    }
  }
}

export default Modal;
