(function($) {
  /**
   * Google風メニュー プラグイン
   */
  $.fn.GoogleMenu = function(arg) {
    const $TARGET = this;
    const $TOGGLE = arg['$toggle'];
    const TOGGLE_CLASS = arg['toggleClass'];

    if ($TOGGLE.length === 0 || TOGGLE_CLASS === '') throw new RangeError('arg is invalid');

    /**
     * プラグイン メイン処理
     */
    (function main() {
      $TOGGLE.on('click', function () {
        $TARGET.toggleClass(TOGGLE_CLASS);
        return false;
      });
    })();
  };

  /**
   * メイン処理
   */
  $(function(){
    $('#header').GoogleMenu({
      $toggle: $('.header-control__tool'),
      toggleClass: 'header--tool_open'
    });
	});
})(jQuery);
