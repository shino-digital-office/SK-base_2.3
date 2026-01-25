// spのハンバーガーメニューの実装
// ヘッダーに属するタイプのドロワー

const drawerIcon = document.getElementById("js-drawer-icon");
const drawerContent = document.getElementById("js-drawer-content");
const drawerOverlay = document.getElementById("js-drawer-overlay");
const drawerCloseBtn = document.getElementById("js-drawer-icon-out-of-header");

// 開閉処理を関数化
function openDrawer() {
  drawerIcon.classList.add("is-checked");
  drawerContent.classList.add("is-checked");
  drawerOverlay?.classList.add("is-visible");
}

function closeDrawer() {
  drawerIcon.classList.remove("is-checked");
  drawerContent.classList.remove("is-checked");
  drawerOverlay?.classList.remove("is-visible");
}

// ハンバーガーアイコンをクリック
drawerIcon.addEventListener("click", function (e) {
  e.preventDefault();
  drawerContent.classList.contains("is-checked") ? closeDrawer() : openDrawer();
});

// ドロワー内の閉じるボタンをクリック
drawerCloseBtn?.addEventListener("click", function (e) {
  e.preventDefault();
  closeDrawer();
});

// ドロワー内リンクをクリックしたら閉じる
drawerContent.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

// オーバーレイクリックで閉じる（不要ならコメントアウト）
drawerOverlay?.addEventListener("click", closeDrawer);
