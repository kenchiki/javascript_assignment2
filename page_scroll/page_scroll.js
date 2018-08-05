(function($) {
  /**
   * ページスクロール プラグイン
   */
  $.fn.pageScroll = function(arg) {
    const $TARGET = this;
    const $UP = arg['$up'];
    const $DOWN = arg['$down'];
    const DISABLE_CLASS = arg['disableClass'];
    let scrollSetTimeOut;

    if ($UP.length === 0 || $DOWN.length === 0 || DISABLE_CLASS === '') throw new RangeError('arg is invalid');

    /**
     * 指定位置までスクロールする
     * @param {number} [scrollY]
     */
    function windowScrollTo(scrollY) {
      $('html,body').stop().animate({scrollTop: scrollY}, 100, 'swing');
    }

    function enableScrollTopTrigger($trigger) {
      $trigger.on('click.page_scroll', function () {
        windowScrollTo(0);
        return false;
      });
      $trigger.removeClass(DISABLE_CLASS);
    }

    /**
     * 最大のスクロールできる位置を返す
     * @return {number}
     */
    function scrollYMax() {
      return document.body.scrollHeight;
    }

    /**
     * jquery objectに一番上までスクロールする機能を与える
     * @param {object} [$trigger]
     */
    function enableScrollBottomTrigger($trigger) {
      $trigger.on('click.page_scroll', function () {
        windowScrollTo(scrollYMax());
        return false;
      });
      $trigger.removeClass(DISABLE_CLASS);
    }

    /**
     * jquery objectに一番下までスクロールする機能を与える
     * @param {object} [$trigger]
     */
    function disableScrollTrigger($trigger) {
      $trigger.off('click.page_scroll');
      $trigger.addClass(DISABLE_CLASS);
    }

    /**
     * プラグイン メイン処理
     */
    (function main() {
      $(window).on('scroll.page_scroll', function () {
        clearTimeout(scrollSetTimeOut);
        scrollSetTimeOut = setTimeout(function () {
          const CURRENT_SCROLL_Y = window.pageYOffset;
          const IS_SCROLL_Y_MAX = (window.innerHeight + CURRENT_SCROLL_Y >= scrollYMax());
          CURRENT_SCROLL_Y === 0 ? disableScrollTrigger($UP) : enableScrollTopTrigger($UP);
          IS_SCROLL_Y_MAX ? disableScrollTrigger($DOWN) : enableScrollBottomTrigger($DOWN);
        }, 100);
      }).trigger('scroll.page_scroll');
    })();
  };

  /**
   * メイン処理
   */
  $(function(){
    $('#page-scroll').pageScroll({
      $up: $('.page-scroll__up'),
      $down: $('.page-scroll__down'),
      disableClass: 'page-scroll__disabled'
    });
	});
})(jQuery);
