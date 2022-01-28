<?php if(!is_admin()): ?>

  <div class="c-wp-block c-wp-block--video" data-wp-block-id="<?= $block['id']; ?>">
    <?= oax_video([
      'video' => get_field('video'),
      'poster' => false,
      'wrapper' => true,
      'holder' => true,
      'xclass' => 'inset object-fit-cover',
      'autoplay' => false,
      'preload' => false,
      'muted' => false,
      'loop' => false,
      'controls' => true,
      'videojs' => false
    ]); ?>
  </div>

<?php else: ?>

  <?= oax_video([
    'video' => get_field('video'),
    'autoplay' => false,
    'xattr' => [
      'style' => 'width: 100%;'
    ]
  ]); ?>

<?php endif; ?>