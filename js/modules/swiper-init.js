const swiperAbout = new Swiper("#js-about-swiper", {
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
  pagination: {
    el: "#js-about-pagination",
  },

  navigation: {
    nextEl: "#js-about-next",
    prevEl: "#js-about-prev",
  },
});
