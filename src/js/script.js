window.addEventListener("load", () => {
const loading = document.getElementById("loading");
const title = document.getElementById("loading__message");
const split = document.getElementById("loading__split");
const slider = document.getElementById("slider");
const message = document.getElementById("slider__message");
const header = document.querySelector("header");

  // ページが初回訪問かどうかをセッションストレージで確認
  if (!sessionStorage.getItem('firstVisit')) {
    // 初回訪問の場合、セッションストレージにフラグをセット
    sessionStorage.setItem('firstVisit', 'true');

    // ローディング開始時にスクロール禁止
    document.body.classList.add("no-scroll");

    setTimeout(() => {
    title.classList.remove("hidden");

      // 3秒後 → 分割表示
      setTimeout(() => {
          title.style.display = "none";
          split.classList.add("anim-start");

          // 3秒後 → スライダー開始
          setTimeout(() => {
          loading.style.display = "none";
          split.style.display = "none";
          header.classList.add("show");
          slider.classList.remove("hidden");
          document.body.classList.remove("no-scroll");
          startSlider();
          }, 3000);
      }, 3000);
    }, 1000);

  } else {
    // 初回訪問ではない場合、ローディング画面を非表示にする
    loading.style.display = "none";
    message.classList.remove("hidden");

    header.classList.add("show");
    slider.classList.remove("hidden");
    startSlider();
  }
});

// スライダーループ機能
function startSlider() {
  const slides = document.querySelectorAll(".slider__img");

  let current = 0;

  function showSlide(index) {
    // 背景フェードアウト + 画像フェードイン
    setTimeout(() => {
      slides.forEach((s, i) => {
        s.style.opacity = i === index ? "1" : "0";
      });
    }, 1000);
  }

  showSlide(current);

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4000); // 2s + 3s表示
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.27, // 1枚＋α
    spaceBetween: 24, // スライド間のスペース
    slidesPerGroup: 1,
    loopedSlides: 999, // 余り移動を防ぐ
    autoplay: false,   // ← 最初は止めておく
    initialSlide: 0,   // ← 必ずスライド1から表示
    loop: true,

    // autoplay: { // 自動再生
    //   delay: 2000, // 1秒後に次のスライド（初期値：3000）
    //   disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // スライドの表示枚数：768px以上の場合
      768: {
        slidesPerView: 3.41916168, // 3枚＋α
        spaceBetween: 24, // スライド間のスペース
      },
      1440: {
        slidesPerView: 3.49, // 3枚＋α
        spaceBetween: 40, // スライド間のスペース
      }
    }
  });


  // スライダーが画面に入ったらオートプレイ開始
  const target = document.querySelector(".swiper");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // swiper.autoplay.start();
        observer.unobserve(target); // 1回だけ実行
      }
    });
  }, { threshold: 0.3 }); // 30%見えたら開始

  observer.observe(target);


jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  // MVスライダーの初期化
  let currentPosition = 0;
  const $slider = $('.js-slider');
  const $wrapper = $('.js-slider-wrapper');

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


  const topBtn = $('.page-top');
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // 画面リサイズ時に位置リセット（オプション）
  $(window).on('resize', function () {
    currentPosition = 0;
    $slider.css('transform', `translateX(0px)`);
  })


  // 画像出現アニメーション
  // 要素の取得とスピードの設定
  var box = $('.colorbox'),
      speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function(){
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
      if(counter == 0){
        $(this).delay(200).animate({'width':'100%'},speed,function(){
          image.css('opacity','1');
          $(this).css({'left':'0' , 'right':'auto'});
          $(this).animate({'width':'0%'},speed);
        })
        counter = 1;
      }
    });
  });
});
