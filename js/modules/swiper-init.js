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

// section--spotsにボタンでスライドするスワイパを実装した。
// 使い方
// swiper　クラスに　js-spots-sliderを追加する
const swiperSpots = new Swiper(".js-spots-slider", {
  /* =========================
   * 基本設定
   * ========================= */
  // ループを無効化：loop と slidesPerView:"auto" の組み合わせは
  // 複製スライドの計算で余白やジャンプを生じやすいので無効化する
  loop: false,
  slidesPerView: "auto", // スライド幅をCSSに任せる
  spaceBetween: 16, // スライド間余白（SP基準）

  /* =========================
   * 操作制御
   * ========================= */
  allowTouchMove: true, // true:スワイプOK ,false:ユーザー操作を禁止（自動スクロール専用）
  freeMode: true,
  freeModeMomentum: false,
  snapOnRelease: true,
  speed: 300, // ← snapが一瞬で終わる

  /* =========================
   * レスポンシブ
   * ========================= */
  breakpoints: {
    768: {
      spaceBetween: 32, // PC時のスライド間余白
      allowTouchMove: false, // ← PCではスワイプ禁止
      // CSS 側の padding-left: 332px に合わせる
      slidesOffsetBefore: 332, // ← 左端余白を確保
      slidesOffsetAfter: 0,

      // PC
      freeMode: false,
      speed: 600, // ボタン用

      // 左端余白
      centeredSlides: false,
      slidesPerGroup: 1, // ボタンクリックで1枚ずつ移動
    },
  },

  // 追加オプション
  watchOverflow: false, // true のままだとサイズ計算次第で navigation が無効になるため false に
  roundLengths: true, // 小数点のpxを丸めてレンダリング差を防止
  initialSlide: 0,
  // 観測を有効にして画像読込・DOM変更で再計算する
  observer: true,
  observeSlideChildren: true,
  observeParents: true,

  /* 画像読み込み後に再計算して位置を補正する */
  on: {
    imagesReady() {
      // 再計算
      this.update();
      // ナビを確実に有効化して、先頭に正しく揃える（アニメーションなし）
      if (this.navigation && typeof this.navigation.enable === "function") {
        this.navigation.enable();
      }
      this.slideTo(0, 0, false);
    },
    resize() {
      // リサイズ時も再計算
      this.update();
      if (this.navigation && typeof this.navigation.enable === "function") {
        this.navigation.enable();
      }
    },
  },

  /* =========================
   * ナビゲーション（必要な場合のみ使用）
   * ========================= */
  pagination: {
    el: "#js-spots-pagination",
  },

  navigation: {
    nextEl: "#js-spots-next",
    prevEl: "#js-spots-prev",
  },
});

// デバッグ用に外部参照を保持
window.swiperSpots = swiperSpots;

(function () {
  const nextBtn = document.querySelector("#js-spots-next");
  const prevBtn = document.querySelector("#js-spots-prev");

  function goToSnap(direction = 1) {
    const s = window.swiperSpots;
    if (!s) return;
    // 最新のグリッドを確保
    s.update();

    const maxSnap = Math.max(0, s.snapGrid.length - 1);
    let targetSnap = Math.max(
      0,
      Math.min(maxSnap, (s.snapIndex || 0) + direction),
    );

    // snapGrid の translate 値に対応するスライドを探す（最も近い index）
    const targetTranslate = s.snapGrid[targetSnap];
    let targetSlide = s.slidesGrid.findIndex((v) => v >= targetTranslate);

    if (targetSlide === -1) {
      // 見つからなければ bounds のスライドを選ぶ
      targetSlide = direction > 0 ? s.slides.length - 1 : 0;
    }

    s.slideTo(targetSlide, s.params.speed || 600);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goToSnap(1);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goToSnap(-1);
    });
  }
})();

// フォントや画像の遅延でレイアウトが変わる場合に再計算して先頭に戻す
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    swiperSpots.update();
    if (
      swiperSpots.navigation &&
      typeof swiperSpots.navigation.enable === "function"
    ) {
      swiperSpots.navigation.enable();
    }
    swiperSpots.slideTo(0, 0, false);
  });
} else {
  window.addEventListener("load", () => {
    swiperSpots.update();
    if (
      swiperSpots.navigation &&
      typeof swiperSpots.navigation.enable === "function"
    ) {
      swiperSpots.navigation.enable();
    }
    swiperSpots.slideTo(0, 0, false);
  });
}

// 更新後にナビの状態を確実に更新
swiperSpots.on("slideChange", () => {
  if (
    swiperSpots.navigation &&
    typeof swiperSpots.navigation.update === "function"
  ) {
    swiperSpots.navigation.update();
  }
});
