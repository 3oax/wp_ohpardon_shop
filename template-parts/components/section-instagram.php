<?php // Section Instagram ?>
<?php 
  $instagram_items = [
    [
      'img' => oax_asset('img/instagram/ohp-instagram-1.jpeg'),
      'userimg' => oax_asset('img/instagram/ohp-instagram-profile.jpeg'),
      'username' => 'Oh Pardon',
      'days_ago' => 15,				
    ],
    [
      'img' => oax_asset('img/instagram/ohp-instagram-2.jpeg'),
      'userimg' => oax_asset('img/instagram/ohp-instagram-profile.jpeg'),
      'username' => 'Oh Pardon',
      'days_ago' => 22,				
    ],
    [
      'img' => oax_asset('img/instagram/ohp-instagram-3.jpeg'),
      'userimg' => oax_asset('img/instagram/ohp-instagram-profile.jpeg'),
      'username' => 'Oh Pardon',
      'days_ago' => 31,				
    ],    		
  ];

  // shuffle($instagram_items);
  $instagram_items_selected = array_slice($instagram_items, 0, 3);
?>
<section class="c-section c-section--instagram c-section--product-layout c-section--product-layout--3 pt-4 pb-5 md:py-75">
  <div class="c-section__bg bg-grey-light"></div>
  <div class="c-section__content">
    <div class="container container-lg">
      <div class="row flex flex-wrap flex-row md:-mx-05">
        <?php $ig_item_index = 0; foreach($instagram_items_selected as $ig_item): ?>
        <div class="w-full md:w-1/3 px-05<?php echo $ig_item_index == 0 ? ' mt-0 md:mt-0' : ' mt-2' ?><?php echo $ig_item_index == 1 ? ' md:mt-4' : '' ?><?php echo $ig_item_index == 2 ? ' md:mt-5 md:pt-3' : '' ?>">
          <figure>
            <div class="ratio-rect-tall bg-grey relative overflow-hidden">
              <?php if( !empty($ig_item['img']) ): ?>
                <?php if( is_string($ig_item['img']) ): ?>
                  <?= oax_image([
                    'url' => $ig_item['img'],
                    'xclass' => 'inset object-fit-cover'
                  ]); ?>
                <?php elseif( is_array($ig_item['img']) ): ?>
                  <?= oax_image([
                    'img' => $ig_item['img'],
                    'xclass' => 'inset object-fit-cover'
                  ]); ?>                  
                <?php endif; ?>
              <?php endif; ?>
            </div>
            <figcaption class="row flex flex-wrap flex-row items-center mt-1">
              <div class="w-1/4 pr-1">
                <div class="ratio-square bg-black relative overflow-hidden" style="border-radius: 50%;">
                  <?php if( !empty($ig_item['userimg']) ): ?>
                    <?= oax_image([
                      'url' => $ig_item['userimg'],
                      'xclass' => 'inset object-fit-cover'
                    ]) ?>
                  <?php endif; ?>
                </div>
              </div>
              <div class="w-3/4">
                <strong class="block underline">@<?= $ig_item['username']; ?></strong>
                <span class="block">vor <?= $ig_item['days_ago']; ?> Tagen</span>									
              </div>
            </figcaption>
          </figure>
        </div>	
        <?php $ig_item_index++; endforeach; ?>									
      </div>
    </div>
  </div>		
</section>
