document.addEventListener('DOMContentLoaded', () => {
});

jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    // ハンバーガーメニューのトグル動作
    function toggleDrawer(forceClose = false) {
        if ($('.js-hamburger').hasClass('is-active') || forceClose) {
        $('.js-hamburger').removeClass("is-active");
        $('.js-header').removeClass("sp-nav-active");
        $(".js-sp-nav").removeClass("is-active");

        $('body').removeClass("no-scroll");
        } else {
        $('.js-hamburger').addClass("is-active");
        $('.js-header').addClass("sp-nav-active");
        $(".js-sp-nav").addClass("is-active");
        $('body').addClass("no-scroll");
        }
    }

    // ハンバーガーメニューをクリックしたとき
    $(".js-hamburger").click(function () {
        toggleDrawer();
    });
    // ドロワーメニューのリンククリック時にドロワーを閉じる
    $('.sp-nav__item a[href^="#"]').click(function () {
        toggleDrawer(true);
    });
    // 幅が787px以上のときにドロワーが開いていればドロワーを閉じる
    $(window).on('resize', function () {
        if ($(window).width() >= 787) {
        toggleDrawer(true);
        }
    });

    // ページトップ
    const topBtn = $('.js-page-top');
    topBtn.hide();

    // ページトップボタンの表示設定
    $(window).scroll(function () {
        if ($(this).scrollTop() > 70) {
        // 指定px以上のスクロールでボタンを表示
        topBtn.fadeIn();
        } else {
        // 画面が指定pxより上ならボタンを非表示
        topBtn.fadeOut();
        }
    });
});
