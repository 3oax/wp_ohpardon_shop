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
$namespace = oax_get_current_namespace();
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

<?php get_template_part( 'template-parts/site-icon-set' ); ?>

<header id="site__header" class="site__header">		
	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site__brand" title="<?= get_bloginfo('name'); ?>">
		<span class="site__brand-sign block">
			<?php get_template_part( 'template-parts/site-logo' ); ?>
		</span>
	</a>

	<nav id="site__navigation" class="site__navigation flex items-center">

		<button class="site__navigation-toggle md:none" aria-expanded="false" aria-controls="l-navigation-main">
			<svg class="o-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82" width="82" height="82">
				<path class="o-menu__line o-menu__line--1" d="M25.5 47h31v2h-31z" fill="#000000"/>
				<path class="o-menu__line o-menu__line--2" d="M25.5 40h31v2h-31z" fill="#000000"/>
				<path class="o-menu__line o-menu__line--3" d="M25.5 33h31v2h-31z" fill="#000000"/>
				<circle class="o-menu__line o-menu__outline" cx="41" cy="41" r="29.5" stroke="#000000" fill="none" stroke-width="2"/>
			</svg>
			<span class="sr-only">Menu</span>
		</button>

		<div class="site__navigation-main">
			<?php
				wp_nav_menu( array(
					'theme_location' => 'main',
					'menu_id'        => 'l-navigation-main',
					'menu_class'		 => 'l-navigation-main nav-menu list-none flex items-center p-0 md:m-0',
					'container'			 => false
				) );
			?>	
		</div>		

		<ul class="site__navigation-user flex items-center list-none m-0 p-0 nav-menu">
			<li>
				<a href="<?php echo get_permalink( get_option('woocommerce_myaccount_page_id') ); ?>">
					<svg class="w-1 h-1 md:w-1 md:h-1" xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
						<circle cx="10.5" cy="5.5" r="4.5" stroke="black" stroke-width="2"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M10.893 13.0007C13.0901 12.9771 15.2567 13.5163 17.1865 14.5668C19.1163 15.6174 20.745 17.1445 21.9177 19.0026L20.2263 20.07C19.2359 18.5006 17.8602 17.2108 16.2302 16.3234C14.6002 15.436 12.7703 14.9807 10.9145 15.0006C9.05879 15.0206 7.23904 15.5152 5.62854 16.4374C4.01804 17.3596 2.6704 18.6787 1.71392 20.2691L0 19.2383C1.13242 17.3554 2.72796 15.7937 4.6347 14.7018C6.54144 13.61 8.69593 13.0244 10.893 13.0007Z" fill="black"/>
					</svg>
				</a>
			</li>
			<li class="ml-1">
				<a href="<?= wc_get_cart_url(); ?>" class="js--cart-trigger relative block no-underline">
					<span class="js--cart-trigger__desc absolute bottom-0 w-full text-center" id="js--cart-trigger__desc">
						<span class="js--cart-trigger__desc-text sr-only"><?= __('Produkte im Warenkorb', 'oax-ohpardon'); ?>:</span>
						<span class="js--cart-trigger__desc-count relative" style="font-size: 0.6em; top: -0.4rem;">								
							<?php echo WC()->cart->get_cart_contents_count() > 0 ? WC()->cart->get_cart_contents_count() : ''; ?>
						</span>
					</span>
					<svg aria-labelledby="js--cart-trigger__desc" class="js--cart-trigger__icon w-15 h-15" fill="none" class="w-1 h-1" viewBox="0 0 24 29" xmlns="http://www.w3.org/2000/svg" width="23">
						<rect x="1" y="6" width="22" height="22" rx="3" stroke="#000" stroke-width="2"></rect>							
						<path d="M16.5 5s-.5-4-5-4S6 5 6 5" stroke="#000" stroke-linecap="round" stroke-width="2"></path>
					</svg>
				</a>					
			</li>
		</ul>

	</div><!-- #site__navigation -->
</header><!-- #site__header -->

<aside class="c-cart bg-white fixed right-0 h-screen bg-white overflow-hidden" style="transform: translateX(100%); width: 100%; min-width: 300px; max-width: 30rem; z-index: 999999; box-shadow: 0 0 10px -4px rgb(0 0 0 / 40%);">
	<span class="c-cart__close absolute top-0 right-0 w-3 h-3 md:h-2 md:w-2 text-center bg-grey-light flex items-center justify-center cursor-pointer">&times;</span>
	<div class="c-cart__header w-full pt-15 lg:pt-2 px-15 lg:px-2">
		<span class="h2 c-cart__title"><?= __( 'Cart', 'woocommerce' ); ?></span>
	</div>
	<div class="w-full p-15 lg:p-2">
		<div class="widget_shopping_cart_content">
			<?php woocommerce_mini_cart(); ?>
		</div>	
	</div>
</aside>

<div id="site" class="site relative w-screen">
	<a class="skip-link sr-only" href="#site__body"><?php esc_html_e( 'Skip to content', 'oax-ohpardon' ); ?></a>

	<main id="site__body" class="site__body" data-barba="wrapper">
		<div class="site__inner w-screen" data-barba="container" data-barba-namespace="<?= $namespace ?>">
		<?php // get_template_part('template-parts/site-breadcrumb'); ?>
