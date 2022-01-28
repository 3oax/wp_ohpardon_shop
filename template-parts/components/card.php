<?php
  $item = (array) $item;
  $item_location = tribe_get_venue_object($item['ID']);
  $item_geolocation = tribe_get_coordinates($item['ID']);

  // print_r($item_location);
  // oax_get_distance_between_coords($lat_from, $lng_from, $lat_to, $lng_to);         
  // Custom fields
  $event_fields = tribe_get_custom_fields( $item['ID'] );
  $event_is_online = $event_fields['Ist Online'];
?>
<div class="c-card text-black mx-075 c-card--event relative">
  <div class="c-card__header py-1 px-1 text-center">
    <h3 class="h1">
      <?php // echo tribe_get_custom_field('Ist Online'); ?>
      <span class="block"><?= tribe_get_start_date($item['ID'], false, 'd. M'); ?></span>
      <?php if(
        strtolower($item_location->slug) == 'online' ||
        (isset($event_is_online) && $event_is_online == 'Ja')
      ): ?>
        <small class="block text-sm mt-05">
          Online
        </small>
      <?php else: ?>
        <small class="block text-sm mt-05">
          +<?= oax_get_distance_between_user_and_coords($item_geolocation['lat'], $item_geolocation['lng']); ?>Km
        </small>
      <?php endif; ?>
    </h3>
  </div>
  <div class="c-card__body px-2 pt-2 bg-white-full">
    <h4 class="h1 pb-1"><?= $item['post_title']; ?></h4>                
    <?= tribe_events_get_the_excerpt($item['ID']); ?>
  </div>
  <div class="c-card__footer text-right font-bold italic px-2 pt-2 pb-2 bg-white-full">
    <p>
      <?php if(
        strtolower($item_location->slug) == 'online' ||
        (isset($event_is_online) && $event_is_online == 'Ja')
      ): ?>
        <span>Online</span>,
      <?php else: ?>
        <span><?= $item_location->city ?></span>,
      <?php endif; ?>
      <span>
        <?= tribe_get_start_date($item['ID'], true, 'H:i'); ?>
        <?= __( 'Uhr', 'oax-ohpardon' ); ?>.
      </span>
      <?php if(empty(tribe_get_cost($item['ID'], false)) || tribe_get_cost($item['ID'], false) == 0): ?>
        <span><?= __( 'Kostenlos', 'oax-ohpardon' ); ?></span>
      <?php else: ?>
        <span><?= tribe_get_cost($item['ID'], false); ?>€</span>
      <?php endif; ?>
    </p>
  </div>

  <div class="c-card__hover-indicator">
    <svg class="w-full h-full pointer-events-none">
      <use href="#icon-eye" />
    </svg>    
  </div>

  <a href="<?= get_permalink($item['ID']); ?>" title="<?= $item['post_title']; ?>" class="absolute inset-0">
    <span class="sr-only">Veranstaltung <?= $item['post_title']; ?> ansehen</span>
  </a>

</div>