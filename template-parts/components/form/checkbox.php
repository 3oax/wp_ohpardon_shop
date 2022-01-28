<div class="c-input c-input--checkbox<?= isset($xclass) ? ' ' . $xclass : '' ?>">
  <label>
    <input class="c-input__val" type="checkbox"<?= isset($checked) ? ' checked' : ''; ?><?= isset($required) ? ' required' : ''; ?>>
    <span class="c-input__box"></span>
    <span class="c-input__label"><?= $desc ?></span>
  </label>
</div>