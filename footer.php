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
			<?php // if(isset($themeConfig['is_ajax']) && $themeConfig['is_ajax'] == 1) get_template_part( 'template-parts/page-scripts' ); ?>

		</div>	
		
	</main>

	<style>
		#site__footer .site__footer-links--bottom ul {
			display: block;
		}
		#site__footer .site__footer-links--bottom li {
			display: block;
			text-align: center;
		}
		#site__footer .site__footer-links--bottom a,
		#site__footer .site__footer-links--bottom a:hover {
			color: white;
		}
		@media (min-width: 992px) {
			#site__footer .site__footer-links--bottom ul {
				display: flex;
			}
			#site__footer .site__footer-links--bottom li + li {
				margin-left: 1rem;
			}			
		}
	</style>

	<footer id="site__footer" class="site__footer text-sm relative text-center md:text-left">
		
		<div class="site__footer-content">

			<?php 
				$shortcode_newsletter = get_field('shortcode_newsletter_form', 'options');
				if( !empty($shortcode_newsletter) ):
			?>
			<div class="site__footer-newsletter py-5 bg-grey-light">

				<div class="container">
					<div class="row flex flex-wrap justify-end">
						<div class="w-full md:w-1/2">
							<?= do_shortcode($shortcode_newsletter); ?>
						</div>
					</div>
				</div>
			</div>
			<?php endif; ?>

			<div class="site__footer-links site__footer-links--bottom bg-black">
				<div class="container">
					<div class="py-2 md:py-1 row flex flex-wrap w-full justify-center md:justify-end">					
						<div class="md:w-auto text-xs mt-1 md:mt-0">
							<?php dynamic_sidebar('footer-bottom'); ?>
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

<?php // get_template_part( 'template-parts/site-transition' ); ?>	

<?php wp_footer(); ?>

<?php get_template_part( 'template-parts/site-footer-scripts' ); ?>	

</body>
</html>
