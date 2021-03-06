<?php
/**
 * Filters Tax template
 *
 * @author  YITH
 * @package YITH\AjaxProductFilter\Templates\Filters
 * @version 4.0.0
 */

/**
 * Variables available for this template:
 *
 * @var $preset YITH_WCAN_Preset
 * @var $filter YITH_WCAN_Filter_Tax
 * @var $term WP_Term
 */

if ( ! defined( 'YITH_WCAN' ) ) {
	exit;
} // Exit if accessed directly
?>

<?php if ( $filter->has_relevant_terms() ) : ?>
	<div
		class="flex flex-wrap mb-05 w-full yith-wcan-filter <?php echo esc_attr( $filter->get_additional_classes() ); ?>"
		id="filter_<?php echo esc_attr( $preset->get_id() ); ?>_<?php echo esc_attr( $filter->get_id() ); ?>"
		data-filter-type="<?php echo esc_attr( $filter->get_type() ); ?>"
		data-filter-id="<?php echo esc_attr( $filter->get_id() ); ?>"
		data-taxonomy="<?php echo esc_attr( $filter->get_formatted_taxonomy() ); ?>"
		data-multiple="<?php echo esc_attr( $filter->is_multiple_allowed() ? 'yes' : 'no' ); ?>"
		data-relation="<?php echo esc_attr( $filter->get_relation() ); ?>"
	>
		
		<div class="filter-title w-full text-center">
			<span id="yith-filter-title--<?php echo esc_attr( $preset->get_id() ); ?>_<?php echo esc_attr( $filter->get_id() ); ?>" class="font-bold">
				<?php echo $filter->render_title(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</span>
		</div>

		<div class="filter-content w-full pt-05">
			<?php echo $filter->render_start(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

			<?php
			foreach ( $filter->get_formatted_terms() as $term_id => $term_options ) :
				echo $filter->render_item( $term_id, $term_options ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			endforeach;
			?>

			<?php echo $filter->render_end(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>

	</div>
<?php endif; ?>
