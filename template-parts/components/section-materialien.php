
<?php $section_material = get_field('section_material', 'options'); ?>
<?php if(!empty($section_material)): ?>
<section class="c-section c-section--material v-product__material pt-5 pb-75">
  <div class="c-section__bg bg-black-light"></div>
  <div class="c-section__content">
    <div class="container">
      <h2 class="text-center pb-3 text-white">
        <?= $section_material['headline']; ?>
      </h2>
      
      <?php if(!empty($section_material['materials'])): ?>
        <div class="flex flex-wrap md:pb-1">
          <div class="w-full md:w-1/2 md:pr-05 mb-2 md:mb-0">
            <div class="ratio-square relative bg-white">
              <div class="inset p-2">
                <?php if(!empty($section_material['materials'][0])): ?>
                  <?= oax_image([
                    'img' => $section_material['materials'][0]['img'],
                    'xclass' => 'absolute left-0 bottom-0 w-full'
                  ]); ?>  
                  <div class="relative">
                    <?= $section_material['materials'][0]['content']; ?>
                  </div>
                <?php endif; ?>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 md:pl-05 mb-2 md:mb-0">
            <div class="ratio-square relative bg-white">
              <div class="inset p-2 flex items-end">
                <?php if(!empty($section_material['materials'][1])): ?>
                  <?= oax_image([
                    'img' => $section_material['materials'][1]['img'],
                    'xclass' => 'absolute right-0 top-0 w-full'
                  ]); ?>  
                  <div class="relative">
                    <?= $section_material['materials'][1]['content']; ?>
                  </div>
                <?php endif; ?>										
              </div>								
            </div>
          </div>						
        </div>

        <div class="flex flex-wrap">
          <div class="w-full md:w-2/3 md:pr-05 mb-2 md:mb-0">
            <div class="ratio-square md:ratio-rect relative bg-white">
              <div class="inset p-2">
                <?php if(!empty($section_material['materials'][2])): ?>
                  <?= oax_image([
                    'img' => $section_material['materials'][2]['img'],
                    'xclass' => 'absolute left-0 bottom-0 w-full'
                  ]); ?>                  
                  <div class="relative">
                    <?= $section_material['materials'][2]['content']; ?>
                  </div>
                <?php endif; ?>										
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 md:pl-05">
            <div class="bg-white ratio-square relative">
              <div class="inset p-2 flex items-end">
                <?php if(!empty($section_material['materials'][3])): ?>
                  <?= oax_image([
                    'img' => $section_material['materials'][3]['img'],
                    'xclass' => 'absolute right-0 top-0 w-full'
                  ]); ?>
                  <div class="relative -mb-025">
                    <?= $section_material['materials'][3]['content']; ?>
                  </div>
                <?php endif; ?>		
              </div>
            </div>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>
<?php endif; ?>