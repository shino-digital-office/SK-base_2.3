/**
 * =====================================
 * Accordion Menu
 * =====================================
 *
 * 【使い方】
 *
 * 1. HTML構造
 * -----------------
 * <div class="js-accordion is-open"> ← 最初から開きたい場合は is-open を付ける
 *   <button class="js-accordion-trigger">
 *     <span>質問テキスト</span>
 *   </button>
 *   <div class="js-accordion-content">
 *     <div class="accordion-inner">
 *       <p>回答テキスト</p>
 *     </div>
 *   </div>
 * </div>
 *
 * 2. クラスの役割
 * -----------------
 * js-accordion          : アコーディオン1セットの親
 * js-accordion-trigger  : 開閉トリガー（button）
 * js-accordion-content  : 開閉される中身
 * is-open               : 初期オープン & 状態管理用クラス
 *
 * 3. 実装方法
 * -----------------
 * 下の（A）か（B）のどちらか一方を有効化して使う
 * ・（A）display 切り替え（シンプル・軽量）
 * ・（B）height アニメーション（デザイン重視）
 *
 * ※ 両方同時に有効にしないこと
 */

/* =========================
 * （A）シンプルなアコーディオン
 *  - display: none / block
 *  - アニメーションなし
 *  - FAQなど静的用途向け
 * ========================= */

// document.addEventListener("DOMContentLoaded", () => {
//   const accordions = document.querySelectorAll(".js-accordion");

//   accordions.forEach((accordion) => {
//     const trigger = accordion.querySelector(".js-accordion-trigger");
//     const content = accordion.querySelector(".js-accordion-content");
//     const isOpenByDefault = accordion.classList.contains("is-open");

//     // 初期状態（HTMLの is-open を読む）
//     trigger.setAttribute("aria-expanded", String(isOpenByDefault));
//     content.style.display = isOpenByDefault ? "block" : "none";

//     trigger.addEventListener("click", () => {
//       const isOpen = trigger.getAttribute("aria-expanded") === "true";

//       trigger.setAttribute("aria-expanded", String(!isOpen));
//       accordion.classList.toggle("is-open", !isOpen);
//       content.style.display = isOpen ? "none" : "block";
//     });
//   });
// });

/* =========================
 * （B）CSSトランジションしたい場合
 *  - height を JS で制御
 *  - CSSで transition: height を指定する
 *  - 中身には padding を持たせない（inner推奨）
 * ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".js-accordion");

  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector(".js-accordion-trigger");
    const content = accordion.querySelector(".js-accordion-content");
    const isOpenByDefault = accordion.classList.contains("is-open");

    trigger.setAttribute("aria-expanded", String(isOpenByDefault));
    content.style.overflow = "hidden";

    // 初期状態
    content.style.height = isOpenByDefault ? content.scrollHeight + "px" : "0";

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));

      if (isOpen) {
        content.style.height = "0";
        accordion.classList.remove("is-open");
      } else {
        content.style.height = content.scrollHeight + "px";
        accordion.classList.add("is-open");
      }
    });
  });
});
