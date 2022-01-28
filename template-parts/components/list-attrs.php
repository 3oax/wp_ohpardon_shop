<?php if(isset($attrs) && !empty($attrs)): ?>

  <?php $attr_i = 0; foreach($attrs as $attr): ?>

    <?php if(isset($with_keys) && $with_keys == true): ?>
      
      <div class="row flex flex-wrap -mx-05 md:-mx-1 mt-075">
        <div class="w-1/2 px-05 md:px-1 text-right"><?= isset($attr['name']) ? $attr['name'] : $attr['key'] ?></div>
        <div class="w-1/2 px-05 md:px-1 text-left"><strong><?= $attr['value'] ?></strong></div>
      </div>
      <?php if( count($attrs) == ($attr_i+1) ): ?>
      <?php else: ?>
        <div class="min-h-1 bg-beige-light w-full mt-075"></div>	                  
      <?php endif; ?> 
    
    <?php else: ?>
    
      <?php if($attr_i == 0 || $attr_i % 2 === 0): ?>
        <?php if($attr_i != 0): ?></div><?php endif; ?>
        <div class="row flex flex-wrap -mx-05 md:-mx-1 mt-075">
      <?php endif; ?>
        <div class="w-1/2 px-05 md:px-1">
          <strong><?= $attr['value']; ?></strong>
          <?php if( count($attrs) - 1 == ($attr_i+1) || count($attrs) == ($attr_i+1) ): ?>
          <?php else: ?>
          <div class="min-h-1 bg-beige-light w-full mt-075"></div>	                  
          <?php endif; ?>                   
        </div>             
      <?php if(count($attrs) == ($attr_i+1)): ?>
        </div>
      <?php endif; ?>
      
    <?php endif; ?>
  
  <?php $attr_i++; endforeach; ?>  

<?php endif; ?>