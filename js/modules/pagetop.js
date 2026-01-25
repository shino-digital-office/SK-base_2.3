// ========================================
// ページトップに戻るボタン (pagetop)
// ========================================

// HTMLに #js-pagetop が存在する場合のみ処理を実行する
// これにより、pagetop が無いページでも JS が止まらず安全に読み込めます
const pagetop = document.getElementById("js-pagetop");

if (pagetop) {
  // ----------------------------
  // 表示制御（スクロールで表示/非表示）
  // ----------------------------
  window.addEventListener("scroll", () => {
    pagetop.classList.toggle("is-show", window.scrollY > 100);
  });

  // ----------------------------
  // クリックでトップに戻る
  // ----------------------------
  const pagetopLink = pagetop.querySelector("a");
  if (pagetopLink) {
    pagetopLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
