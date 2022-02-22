<?php 
  $section_about = get_field('section_about', 'options');
?>
<?php if( !empty($section_about) ): ?>
<section class="c-section c-section-about pt-3 pb-5">
  <div class="container pb-3">
    <div class="row flex flex-wrap justify-center">
      <div class="w-full md:w-1/2 text-center flex flex-wrap justify-center">
        <figure class="block mb-2 w-1/2 md:w-1/4">
          <?php get_template_part( 'template-parts/site-logo' ); ?>
        </figure>
        <div>
          <?= $section_about['content']; ?>
        </div>
      </div>
    </div>
  </div>
  
  <?php if( !empty($section_about['video']) ): ?>
    <?php $video = $section_about['video']; ?>
    <div class="mx-0 md:mx-1 relative">
      <?php if( empty($video['file']) && !empty($video['poster']) ): ?>
        <?= oax_image([
          'img' => $video['poster'],
          'xclass' => 'inset object-fit-cover',
          'xclass_wrapper' => 'bg-grey-light',
          'wrapper' => true,
          'holder' => true
        ]); ?>
      <?php else: ?>
        <?= oax_video([
          'video' => $video['file'],
          'poster' => $video['poster'],
          'xclass_wrapper' => 'bg-grey-light',
          'wrapper' => true,
          'holder' => true
        ]); ?> 
      <?php endif; ?>
      <?php if( !empty($video['button']) ): ?>
        <a class="btn"<?php if( !empty($video['button']['target']) ): ?> target="<?= $video['button']['target']; ?>"<?php endif; ?> style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);" href="<?= $video['button']['url']; ?>"><?= $video['button']['title']; ?></a>
      <?php endif; ?>
    </div>
  <?php endif; ?>

  <?php if( !empty($section_about['originals']) ): ?>
    <?php $originals = $section_about['originals']; ?>
    <div class="px-15 md:px-75 pt-3 md:pt-75">
      <div class="row flex flex-wrap items-center">
        <div class="w-full md:w-2/3">
          <h5 class="entry-title"><?= $originals['headline']; ?></h5>
          <div class="mt-2 md:pr-lg"><?= $originals['content']; ?></div>
        </div>
        <div class="w-full md:w-1/3 mt-3 md:mt-0">
          <figure class="ratio-square relative bg-grey-light">
            <?php 
              echo oax_image([
                'img' => $originals['img'],
                'xclass' => 'inset object-fit-cover'
              ]);
            ?>
            <span class="btn bottom-0 right-0 mb-1 mr-1" style="position: absolute;"><?= $originals['link']['title']; ?></span>
            <a href="<?= $originals['link']['url']; ?>" class="absolute inset" title="<?= $originals['link']['title']; ?>"></a>
          </figure>
        </div>
      </div>
    </div>
  <?php endif; ?>
  
  <?php if( !empty($section_about['link']) ): ?>
    <div class="text-center mt-3 md:mt-5">
      <a class="btn" href="<?= $section_about['link']['url']; ?>"><?= $section_about['link']['title']; ?></a>
    </div>
  <?php endif; ?>

</section>
<?php endif; ?>