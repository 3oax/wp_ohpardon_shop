<?php 
  $icons = [
    [
      'title' => 'Upcycling',
      'svg' => oax_asset('img/icons/upcycling.svg')
    ],
    [
      'title' => 'Easy Application',
      'svg' => oax_asset('img/icons/easy-application.svg')
    ],
    [
      'title' => 'Nice Surface',
      'svg' => oax_asset('img/icons/nice-feel.svg')
    ],
    [
      'title' => 'Real Streetartists',
      'svg' => oax_asset('img/icons/streetartists.svg')
    ],
    [
      'title' => '30 Days Return',
      'svg' => oax_asset('img/icons/30-days-return.svg')
    ],
    [
      'title' => 'Customer Chat',
      'svg' => oax_asset('img/icons/chat.svg')
    ],
  ]
?>

<ul class="c-list-usp-icons px-0 my-0 -mx-1 list-none flex flex-wrap justify-center items-end -mt-2">
  <?php foreach($icons as $icon): ?>
    <li class="w-1/2 md:w-1/3 px-1 h-full flex justify-center mt-2">
      <figure class="text-center w-full h-full flex flex-wrap">
        <div class="w-full<?php if(isset($xclass_icons)): ?> <?= $xclass_icons; ?><?php else: ?> px-2 md:px-5<?php endif; ?>">
          <?= oax_inline_svg([
            'svg' => $icon['svg']
          ]); ?>
        </div>
        <figcaption class="w-full block mt-1 md:mt-15"><strong><?= $icon['title']; ?></strong></figcaption>
      </figure>
    </li>
  <?php endforeach; ?>           
</ul>