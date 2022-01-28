<?php if(isset($link) && is_array($link)){
  $text = $link['title'];
  $is_blank = isset($link['target']) && $link['target'] == '_blank' ? true : false;
  $link = $link['url'];
} ?>
<?php if(isset($target) && $target == '_blank'){ $is_blank = true; } ?>
<?php if(isset($glow) && $glow == true){ $glow = true; } else { $glow = false; } ?>
<?php if(!isset($tag)){ $tag = 'a'; }?>
<?php if(!isset($type)){ $type = 'default'; } ?>
<?php $maybePostId = url_to_postid($link); if($maybePostId !== 0): ?>
  <?php $postType = get_post_type($maybePostId); ?>
  <?php 
    if($postType === 'post'){
      if(!isset($xdata)){
        $xdata = [];
      }
      $xdata['post-id'] = $maybePostId;
    }
  ?>
<?php endif; ?>

<?php if($type === 'icon'): ?>

<<?= $tag; ?> class="btn uppercase<?php if(isset($color)): ?> btn--<?= $color; ?><?php endif; ?><?php if(isset($xclass)): ?> <?= $xclass; ?><?php endif; ?>" 
  href="<?php echo isset($link) ? $link : '#'; ?>"
  <?php if(isset($is_blank) && $is_blank === true): ?> target="_blank"<?php endif; ?>
  <?php if(isset($xdata) && is_array($xdata)): ?><?php foreach($xdata as $key => $val): if($key != 'post-id'): ?> data-<?= $key; ?>="<?= $val; ?>"<?php endif; endforeach; ?><?php endif; ?>
  <?php if(isset($xattr) && is_array($xattr)): ?><?php foreach($xattr as $key => $val): ?> <?= $key; ?>="<?= $val; ?>"<?php endforeach; ?><?php endif; ?>>
  
  <?php if(isset($icon) && is_array($icon)): ?>
    <i class="mr-075">
      <?php if($icon['mime_type'] == 'image/svg+xml'): ?>
        <?= oax_inline_svg([
          'svg' => $icon,
          'xclass' => 'w-15 h-15'
        ]); ?>
      <?php else: ?>    
        <?= oax_image([
          'img' => $icon,
          'xclass' => 'w-15 h-auto'
        ]); ?>                                 
      <?php endif; ?>
    </i>  
  <?php endif; ?>
  <span><?= (isset($text) && !empty($text)) ? $text : 'BUTTON'; ?></span>
</<?= $tag; ?>>

<?php elseif($type === 'default'): ?>

  <<?= $tag; ?> class="btn btn--default<?php if($glow): ?> btn--glow<?php endif; ?> uppercase<?php if(isset($color)): ?> btn--<?= $color; ?><?php endif; ?><?php if(isset($xclass)): ?> <?= $xclass; ?><?php endif; ?>" 
    href="<?php echo isset($link) ? $link : '#'; ?>"
    <?php if(isset($is_blank) && $is_blank === true): ?> target="_blank"<?php endif; ?>
    <?php if(isset($xdata) && is_array($xdata)): ?><?php foreach($xdata as $key => $val): ?> data-<?= $key; ?>="<?= $val; ?>"<?php endforeach; ?><?php endif; ?>
    <?php if(isset($xattr) && is_array($xattr)): ?><?php foreach($xattr as $key => $val): ?> <?= $key; ?>="<?= $val; ?>"<?php endforeach; ?><?php endif; ?>>
    <span><?= (isset($text) && !empty($text)) ? $text : 'BUTTON'; ?></span>
    <?php /*
    <svg class="btn__arrow" aria-hidden="true" focusable="false">
      <use xlink:href="#icon-arrow-right-round"></use>
    </svg>
    */ ?>
  </<?= $tag; ?>>

<?php endif; ?>

