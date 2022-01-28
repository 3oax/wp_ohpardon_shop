<<?= $tag; ?> class="<?= $tag_class; ?> c-headline flex flex-wrap my-0 <?= isset($xclass) ? $xclass : '' ; ?>">              
  <span class="c-headline__bottom order-2 w-full block <?= isset($xclass_bottom) ? $xclass_bottom : '' ; ?>">
    <?= $bottom; ?>
  </span>
  <?php if($top !== false): ?>
    <small class="c-headline__top order-1 w-full block font-serif text-grey-light font-light text-sm tracking-widest <?= isset($xclass_top) ? $xclass_top : 'mb-2' ; ?>">
      <span class="sr-only">- </span>
      <?= $top; ?>
    </small>
  <?php endif; ?>
</<?= $tag; ?>>