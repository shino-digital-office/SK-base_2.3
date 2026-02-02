// section--dividerに自動スクロールするスワイパーを実装した。
// 使い方
// swiper　クラスに　js-divider-sliderを追加した。
const swiperDivider = new Swiper(".js-divider-swiper", {
  /* =========================
   * 基本設定
   * ========================= */
  loop: true, // 無限ループ
  slidesPerView: "auto", // スライド幅をCSSに任せる
  spaceBetween: 20, // スライド間余白（SP基準）

  /* =========================
   * レスポンシブ
   * ========================= */
  breakpoints: {
    768: {
      spaceBetween: 18, // PC時のスライド間余白
    },
  },

  /* =========================
   * 操作制御
   * ========================= */
  allowTouchMove: false, // ユーザー操作を禁止（自動スクロール専用）

  /* =========================
   * 自動スクロール設定
   * ========================= */
  autoplay: {
    delay: 0, // 停止時間を入れず常に動かす
    disableOnInteraction: false, // 他操作後も自動再開
  },

  // 移動速度（ms）
  // 目安：speed ≒ スライド幅(px) × 30
  // ※ 一定速度にするには CSS 側で
  //    .swiper-wrapper { transition-timing-function: linear; }
  //    を必ず指定すること
  speed: 6000,

  /* =========================
   * ナビゲーション（必要な場合のみ使用）
   * ========================= */
  // pagination: {
  //   el: "#js-divider-pagination",
  // },

  // navigation: {
  //   nextEl: "#js-divider-next",
  //   prevEl: "#js-divider-prev",
  // },
});

const swiperSpots2 = new Swiper(".js-spots2-swiper", {
  // Optional parameters
  spaceBetween: 16, // スライド間余白（SP基準）
  loop: true,

  slidesPerView: "auto", // ← これ重要
  freeMode: true, // ← これ重要

  /* =========================
   * レスポンシブ
   * ========================= */
  breakpoints: {
    768: {
      spaceBetween: 32, // PC時のスライド間余白
    },
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
