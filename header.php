<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div class="site__inner">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package oax_ohpardon
 */
session_start();

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
if ( is_checkout() ) {
	$namespace = 'checkout';
}
?><!doctype html>
<?php get_template_part( 'template-parts/site-html-ascii-brand' ); ?>
<!--[if IE 9]>
<html <?php language_attributes(); ?> class="oldie no-js">
<![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!-->
<html <?php language_attributes(); ?> class="no-js">
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<script id="oax-js-classes">(function(H){H.className=H.className.replace(/\bno-js\b/,'js site--is-loading page--is-loading')})(document.documentElement);</script>
		
	<script id="oax-js-preloader">
		window.OAX = window.OAX || {};
		window.OAX.preloader = {};
	</script>

	<?php if(oax_show_preloader() !== false) get_template_part( 'template-parts/site-preloader-styles' ); ?> 

	<link rel="profile" href="http://gmpg.org/xfn/11">
	
	<?php get_template_part( 'template-parts/site-js-config' ); ?>	
	<?php get_template_part( 'template-parts/site-fonts' ); ?>
	<?php get_template_part( 'template-parts/site-styles' ); ?>

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php if(oax_show_preloader() !== false) get_template_part( 'template-parts/site-preloader-dom' ); ?>
<?php // if(oax_show_preloader() === 'TRANSITION') get_template_part( 'template-parts/site-preloader-transition' ); ?>

<?php get_template_part( 'template-parts/site-icon-set' ); ?>

<header id="site__header" class="site__header">
	<div class="pl-15 pr-1 pt-05 md:pt-0 md:px-0 flex relative items-center w-full">
		
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site__brand" title="<?= get_bloginfo('name'); ?>">
			<span class="site__brand-sign block">
				<?php get_template_part( 'template-parts/site-logo' ); ?>
			</span>
		</a>

		<div id="site__navigation" class="site__navigation flex items-center">
			<?php
				wp_nav_menu( array(
					'theme_location' => 'main',
					'menu_id'        => 'l-navigation-main',
					'menu_class'		 => 'l-navigation-main',
					'container'			 => false
				) );
			?>			

			<?php /*
			<ul class="site__navigation-social flex items-center list-none m-0 p-0">
				<li class="site__navigation-lang-switch">					
					<?php do_action('wpml_add_language_selector'); ?>
				</li>
				<li class="mr-0">
					<a href="#" target="_blank" class="block js--search-trigger" role="button" title="Suche Öffnen">
						<svg class="p-05">
							<use href="#icon-search" />
						</svg>
					</a>
				</li>
				<?php if(!empty(get_field('social_yt', 'option'))): ?>
				<li class="ml-0">
					<a href="<?= get_field('social_yt', 'option'); ?>" target="_blank" rel="nofollow,noopener" class="block" title="YouTube">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52">
							<path fill="#FFFFFF" d="M26 41c-3.92 0-4.44 0-6-.09-5.49-.25-8.66-3.41-8.91-8.91-.09-1.56-.09-2.08-.09-6s0-4.45.09-6c.25-5.49 3.42-8.65 8.91-8.9 1.55-.1 2.07-.1 6-.1s4.45 0 6 .09c5.5.25 8.66 3.41 8.91 8.91.07 1.55.09 2.07.09 6s0 4.46-.09 6c-.25 5.49-3.41 8.66-8.91 8.9-1.55.1-2.07.1-6 .1zm0-29c-3.91 0-4.42 0-6 .08-5 .23-7.76 3-8 8V26c0 3.91 0 4.42.09 6 .23 5 3 7.75 8 8 1.55.07 2.06.08 6 .08s4.42 0 6-.08c5-.23 7.76-3 8-8 .07-1.53.09-2 .09-6S40 21.57 40 20c-.22-5-3-7.76-8-8zm0 20.25A6.23 6.23 0 1132.23 26 6.23 6.23 0 0126 32.25zm0-11.48A5.26 5.26 0 1031.26 26 5.25 5.25 0 0026 20.74zm7.75-.26A2.23 2.23 0 1136 18.25a2.23 2.23 0 01-2.25 2.26zm0-3.49A1.26 1.26 0 1035 18.29 1.26 1.26 0 0033.77 17z"/>
						</svg>					
					</a>
				</li>
				<?php endif; ?>
				<li class="ml-0">
					<a href="<?= get_field('social_ig', 'option'); ?>" target="_blank" rel="nofollow,noopener" class="block" title="Instagram">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52">
							<path fill="#FFFFFF" d="M26 41c-3.92 0-4.44 0-6-.09-5.49-.25-8.66-3.41-8.91-8.91-.09-1.56-.09-2.08-.09-6s0-4.45.09-6c.25-5.49 3.42-8.65 8.91-8.9 1.55-.1 2.07-.1 6-.1s4.45 0 6 .09c5.5.25 8.66 3.41 8.91 8.91.07 1.55.09 2.07.09 6s0 4.46-.09 6c-.25 5.49-3.41 8.66-8.91 8.9-1.55.1-2.07.1-6 .1zm0-29c-3.91 0-4.42 0-6 .08-5 .23-7.76 3-8 8V26c0 3.91 0 4.42.09 6 .23 5 3 7.75 8 8 1.55.07 2.06.08 6 .08s4.42 0 6-.08c5-.23 7.76-3 8-8 .07-1.53.09-2 .09-6S40 21.57 40 20c-.22-5-3-7.76-8-8zm0 20.25A6.23 6.23 0 1132.23 26 6.23 6.23 0 0126 32.25zm0-11.48A5.26 5.26 0 1031.26 26 5.25 5.25 0 0026 20.74zm7.75-.26A2.23 2.23 0 1136 18.25a2.23 2.23 0 01-2.25 2.26zm0-3.49A1.26 1.26 0 1035 18.29 1.26 1.26 0 0033.77 17z"/>
						</svg>					
					</a>
				</li>
				<li class="mr-0">
					<a href="<?= get_field('social_fb', 'option'); ?>" target="_blank" rel="nofollow,noopener" class="block" title="Facebook">	
						<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 52 52" viewBox="0 0 52 52">
							<path fill="#FFFFFF" d="M26 41c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15zm0-29c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm1.7 21.8h-4.6v-7.3h-2.4v-3.4h2.4v-1.6c0-1.5.6-3.3 3.6-3.3h3.4v4H27.7v.8h2.5l-.3 3.4h-2.2v7.4zm-3.6-1h2.7v-7.2H29l.1-1.5h-2.4v-1.5c0-.4 0-1.3 1.2-1.3h1.3v-2.1h-2.4c-1.9 0-2.7.7-2.7 2.3V24h-2.4v1.5h2.4v7.3z"/>
						</svg>		
					</a>			
				</li>
			</ul>		
			*/ ?>	

			<ul class="site__navigation-user flex items-center list-none m-0 p-0">
				<li>
					<a href="<?php echo get_permalink( get_option('woocommerce_myaccount_page_id') ); ?>">
						<svg class="w-1 h-1" xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
							<circle cx="10.5" cy="5.5" r="4.5" stroke="black" stroke-width="2"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10.893 13.0007C13.0901 12.9771 15.2567 13.5163 17.1865 14.5668C19.1163 15.6174 20.745 17.1445 21.9177 19.0026L20.2263 20.07C19.2359 18.5006 17.8602 17.2108 16.2302 16.3234C14.6002 15.436 12.7703 14.9807 10.9145 15.0006C9.05879 15.0206 7.23904 15.5152 5.62854 16.4374C4.01804 17.3596 2.6704 18.6787 1.71392 20.2691L0 19.2383C1.13242 17.3554 2.72796 15.7937 4.6347 14.7018C6.54144 13.61 8.69593 13.0244 10.893 13.0007Z" fill="black"/>
						</svg>
					</a>
				</li>
				<li class="ml-1">
					<a href="<?= wc_get_cart_url(); ?>" class="js--cart-trigger relative block no-underline">
						<span class="js--cart-trigger__desc absolute bottom-0 w-full text-center" id="js--cart-trigger__desc">
							<span class="js--cart-trigger__desc-text sr-only"><?= __('Produkte im Warenkorb', 'oax-ohpardon'); ?>:</span>
							<span class="js--cart-trigger__desc-count relative" style="font-size: 0.6em; top: -0.3rem;">								
								<?php echo WC()->cart->get_cart_contents_count() > 0 ? WC()->cart->get_cart_contents_count() : ''; ?>
							</span>
						</span>
						<svg aria-labelledby="js--cart-trigger__desc" class="js--cart-trigger__icon" fill="none" class="w-1 h-1" viewBox="0 0 24 29" xmlns="http://www.w3.org/2000/svg" width="23">
							<rect x="1" y="6" width="22" height="22" rx="3" stroke="#000" stroke-width="2"></rect>							
							<path d="M16.5 5s-.5-4-5-4S6 5 6 5" stroke="#000" stroke-linecap="round" stroke-width="2"></path>
						</svg>
					</a>					
				</li>
			</ul>

			<button class="site__navigation-toggle md:none" aria-expanded="false" aria-controls="l-navigation-main">
				<svg class="o-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82" width="82" height="82">
					<path class="o-menu__line o-menu__line--1" d="M25.5 47h31v2h-31z" fill="#FFFFFF"/>
					<path class="o-menu__line o-menu__line--2" d="M25.5 40h31v2h-31z" fill="#FFFFFF"/>
					<path class="o-menu__line o-menu__line--3" d="M25.5 33h31v2h-31z" fill="#FFFFFF"/>
					<circle class="o-menu__line o-menu__outline" cx="41" cy="41" r="29.5" stroke="#FFFFFF" fill="none" stroke-width="2"/>
				</svg>
				<span class="sr-only">Menu</span>
			</button>
		</div><!-- #site__navigation -->
	</div>
</header><!-- #site__header -->

<aside class="c-cart bg-white fixed right-0 h-screen bg-white overflow-hidden" style="transform: translateX(100%); width: 100%; min-width: 300px; max-width: 30rem; z-index: 999999; box-shadow: 0 0 10px -4px rgb(0 0 0 / 40%);">
	<span class="c-cart__close absolute top-0 right-0 h-2 w-2 text-center bg-grey-light flex items-center justify-center cursor-pointer">&times;</span>
	<div class="c-cart__header w-full pt-1 lg:pt-2 px-1 lg:px-2">
		<span class="h2 c-cart__title"><?= __( 'Cart', 'woocommerce' ); ?></span>
	</div>
	<div class="c-cart__scroll h-full w-full p-1 lg:p-2 overflow-scroll">
		<div class="widget_shopping_cart_content">
			<?php woocommerce_mini_cart(); ?>
		</div>	
	</div>
</aside>

<?php /*
<?php $show_shop_nav = false; ?>
<nav id="site__navigation-offcanvas" class="site__navigation-offcanvas clearfix text-center md:text-left" aria-expanded="false">
	<div class="w-full text-beige mt-auto site__navigation-offcanvas-top">
		<div class="container">
			<?php
				wp_nav_menu( array(
					'theme_location' => 'main',
					'menu_id'        => 'l-navigation-main',
					'menu_class'		 => 'l-navigation-main',
					'container'			 => false
				) );
			?>
		</div>
	</div>
	<div class="mb-auto text-white w-full site__navigation-offcanvas-bottom">
		<div class="container container-lg">
			<hr class="w-full my-2 md:mt-1 md:mb-3 site__navigation-offcanvas-bottom-seperator" style="background-color: var(--color__red-pastel-light);">
			<div class="w-full flex flex-wrap">
				<div class="w-full md:w-1/3 mb-2 md:mb-0<?php if($show_shop_nav): ?> site__navigation-offcanvas-bottom-col<?php endif; ?>">
					<?php if($show_shop_nav):
						wp_nav_menu( array(
							'theme_location' => 'mainuser',
							'menu_id'        => 'l-navigation-main-user',
							'menu_class'		 => 'l-navigation-main-user list-none m-0 p-0',
							'container'			 => false
						) );
					endif; ?>					
				</div>
				<div class="w-full md:w-1/3 mb-2 md:mb-0 site__navigation-offcanvas-bottom-col">
					<?php if( $show_shop_nav && (class_exists( 'WooCommerce' ) || defined( 'YITH_WCWL' )) ): ?>
					<ul class="list-none m-0 p-0">
						
						<?php if ( defined( 'YITH_WCWL' ) && !empty(YITH_WCWL()->get_wishlist_page_id()) ): ?>
							<li>
								<a class="no-underline inline-flex items-center" href="<?= get_permalink(YITH_WCWL()->get_wishlist_page_id()); ?>">
									<svg class="w-15 h-15 mr-1">
										<use xlink:href="#icon-bookmark-empty"></use>
									</svg>
									<span>Meine Merkliste</span>
								</a>
							</li>
						<?php endif; ?>
						
						<?php if ( class_exists( 'WooCommerce' ) ): ?>
							<li class="mt-05">
								<?php 
									$cart_page_id = wc_get_page_id( 'cart' );
									$cart_page_url = $cart_page_id ? get_permalink( $cart_page_id ) : '#';							
								?>
								<a class="no-underline inline-flex items-center" href="<?= $cart_page_url; ?>">
									<svg class="w-15 h-15 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.65 33.65">
										<path d="M30.65 32.65H1L3.31 9.92h25z" fill="none" stroke="#DCBE94" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
										<path d="M10.55 15.62V6.28A5.27 5.27 0 0115.83 1a5.28 5.28 0 015.28 5.28v9.34" fill="none" stroke="#DCBE94" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
									</svg>
									<span class="inline-block mt-025">Mein Warenkorb</span>
								</a>
							</li>	
						<?php endif; ?>

					</ul>	

					<?php else: ?>

						<ul class="list-none m-0 p-0">
							<li>
								<a class="text-sm no-underline no-barba inline-flex items-center tracking-widest uppercase italic font-serif" href="<?= get_field('social_fb', 'option'); ?>" target="_blank">
									<svg class="w-15 h-15 fill-current mr-1">
										<use xlink:href="#icon-social-fb"></use>
									</svg>
									Instagram
								</a>
							</li>
						</ul>

					<?php endif; ?>		

				</div>
				<div class="w-full md:w-1/3 site__navigation-offcanvas-bottom-col">
					<ul class="list-none m-0 p-0">
						<?php if($show_shop_nav): ?>
						<li>
							<a class="text-sm no-underline no-barba inline-flex items-center tracking-widest uppercase italic font-serif" href="<?= get_field('social_fb', 'option'); ?>" target="_blank">
								<svg class="w-15 h-15 fill-current mr-1">
									<use xlink:href="#icon-social-fb"></use>
								</svg>
								Instagram
							</a>
						</li>
						<?php endif; ?>
						<li class="<?php if($show_shop_nav): ?>mt-05<?php endif; ?>">
							<a class="text-sm no-underline no-barba inline-flex items-center tracking-widest uppercase italic font-serif" href="<?= get_field('social_ig', 'option'); ?>" target="_blank">
								<svg class="w-15 h-15 fill-current mr-1">
									<use xlink:href="#icon-social-ig"></use>
								</svg>
								Facebook
							</a>
						</li>						
					</ul>
				</div>								
			</div>
		</div>
	</div>
</nav>
*/ ?>

<div id="site" class="site relative w-screen">
	<a class="skip-link sr-only" href="#site__body"><?php esc_html_e( 'Skip to content', 'oax-ohpardon' ); ?></a>

	<main id="site__body" class="site__body" data-barba="wrapper">
		<div class="site__inner w-screen" data-barba="container" data-barba-namespace="<?= $namespace ?>">
		<?php // get_template_part('template-parts/site-breadcrumb'); ?>
