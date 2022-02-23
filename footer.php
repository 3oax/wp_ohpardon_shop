<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package oax_ohpardon
 */
$themeConfig = oax_get_theme_config_json();
?>

			<?php get_template_part( 'template-parts/page-modals' ); ?>	
			<?php if(isset($themeConfig['is_ajax']) && $themeConfig['is_ajax'] == 1) get_template_part( 'template-parts/page-scripts' ); ?>

		</div>	
		
	</main>

	<footer id="site__footer" class="site__footer text-sm relative text-center md:text-left">
		
		<div class="site__footer-content">

			<?php 
				$shortcode_newsletter = get_field('shortcode_newsletter_form', 'options');
				if( !empty($shortcode_newsletter) ):
			?>
			<div class="py-5 bg-white">
				<div class="container">
					<div class="row">
						<div class="md:w-1/2 min-h-1"></div>
						<div class="md:w-1/2">
							<?= do_shortcode($shortcode_newsletter); ?>
						</div>
					</div>
				</div>
			</div>
			<?php endif; ?>

			<div class="site__footer-links bg-yellow">
				<div class="container">
					<div class="py-2 md:py-1 row flex flex-wrap w-full md:justify-end">					
						<div class="w-full md:w-auto text-xs mt-1 md:mt-0">
							<ul>
								<li class="inline-block"><a target="_blank" rel="nofollow,noopener" href="#"><?= __( 'Datenschutz', 'oax-ohpardon' ); ?></a></li>
								<li class="inline-block"><a target="_blank" rel="nofollow,noopener" href="#"><?= __( 'Impressum', 'oax-ohpardon' ); ?></a></li>
								<li class="inline-block"><a target="_blank" rel="nofollow,noopener" href="#"><?= __( 'AGB', 'oax-ohpardon' ); ?></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

		</div>

	</footer><!-- #site__footer -->
</div><!-- #site -->

<?php /*
<?php if ( function_exists ( 'wpm_language_switcher' ) ): ?>
	<?php wpm_language_switcher('list', 'flag'); ?>
<?php endif; ?>
*/ ?>

<?php get_template_part( 'template-parts/site-modals' ); ?>	

<?php if(!isset($_SESSION['oax_preloader'])) $_SESSION['oax_preloader'] = 'TRANSITION'; ?>
<?php get_template_part( 'template-parts/site-transition' ); ?>	

<?php wp_footer(); ?>

<?php get_template_part( 'template-parts/site-footer-scripts' ); ?>	

</body>
</html>
