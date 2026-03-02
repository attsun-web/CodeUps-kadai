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
  const slides = document.querySelectorAll(".js-slider__img");

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

var swiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: 1.2631, // 1枚＋α
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
        slidesPerView: 3.4852, // 3枚＋α
        spaceBetween: 40, // スライド間のスペース
      }
    }
  });


  // スライダーが画面に入ったらオートプレイ開始
  const target = document.querySelector(".swiper");
  // target が null の場合に observe を呼ばないようにする
  if (target instanceof Element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
          observer.unobserve(target); // 1回だけ実行
        }
      });
    }, { threshold: 0.3 }); // 30%見えたら開始

    observer.observe(target);
  }


jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

});
