<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

global $wp_query;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'woocommerce_before_main_content' );

?>
<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
	<header class="woocommerce-products-header c-section c-section--header md:pt-75">
		<div class="container container-lg">
			
			<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
				<h1 class="woocommerce-products-header__title page-title"><?php woocommerce_page_title(); ?></h1>
			<?php endif; ?>

			<?php
			/**
			 * Hook: woocommerce_archive_description.
			 *
			 * @hooked woocommerce_taxonomy_archive_description - 10
			 * @hooked woocommerce_product_archive_description - 10
			 */
			do_action( 'woocommerce_archive_description' );
			?>
		</div>
	</header>
<?php endif; ?>

<section class="c-section c-section--products pt-5 md:pt-75">
	<div class="c-section__content">

		<?php 
			/**
			 * Hook: woocommerce_sidebar.
			 *
			 * @hooked woocommerce_get_sidebar - 10
			 */
			do_action( 'woocommerce_sidebar' );
		?>
		
		<style>
			@media (max-width: 991.9px){
				.c-filters {
					display: none;
				}
				.c-filters.is-open {
					display: block;
				}
			}
		</style>
		
		<div class="container container-lg">
			<div class="pb-1 flex flex-wrap md:pt-0">
				
				<div class="w-full md:hidden flex flex-wrap justify-end">
					<button class="btn c-filters__toggle" aria-expanded="false" aria-controls="c-filters" onclick="document.getElementById('c-filters').classList.toggle('is-open');">
						Filter
					</button>
				</div>

				<div id="c-filters" class="c-filters w-full pt-1 md:w-full md:h-auto md:relative md:pt-0">					

					<?php if( is_product_category() ): ?>
						<?php $current_product_cat = $wp_query->get_queried_object(); ?>
						<?php if(trim(strtolower($current_product_cat->name)) !== 'unikate'): // unikate ?>
							<?php 						
								echo do_shortcode('[yith_wcan_filters slug="default-preset"]');
							?>			
						<?php endif; ?>
					<?php endif; ?>

					<?php 
						/**
						 * Hook: woocommerce_before_shop_loop.
						 *
						 * @hooked woocommerce_output_all_notices - 10
						 * @hooked woocommerce_result_count - 20
						 * @hooked woocommerce_catalog_ordering - 30
						 */

						/*
						echo '<div class="pt-1 pb-1 md:pt-0 md:pb-2 text-right">';					
							do_action( 'woocommerce_before_shop_loop' );
							// echo do_shortcode('')
						echo '</div>';					
						*/
					?>
				</div>
			</div>
		</div>

		<div class="container container-lg pb-2 md:pb-5">
			<?php
			if ( woocommerce_product_loop() ) {
				
				woocommerce_product_loop_start();

				if ( wc_get_loop_prop( 'total' ) ) {
					while ( have_posts() ) {
						the_post();

						/**
						 * Hook: woocommerce_shop_loop.
						 */
						do_action( 'woocommerce_shop_loop' );

						wc_get_template_part( 'content', 'product' );
					}
				}

				woocommerce_product_loop_end();

				/**
				 * Hook: woocommerce_after_shop_loop.
				 *
				 * @hooked woocommerce_pagination - 10
				 */
				do_action( 'woocommerce_after_shop_loop' );
			} else {
				/**
				 * Hook: woocommerce_no_products_found.
				 *
				 * @hooked wc_no_products_found - 10
				 */
				echo '<div class="text-center pt-3 h4">';
					do_action( 'woocommerce_no_products_found' );
				echo '</div>';
			}
			?>
		</div>
	</div>
</section>

<?php

/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'woocommerce_after_main_content' );

get_footer( 'shop' );
