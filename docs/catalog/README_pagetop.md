# SK-cat-pagetop README

pagetopコンポーネントはポートフォリオや案件制作の際に使える **補助UI部品** です。

- スターターキットの基本構造を型として収録
- トップから100px以上スクロールするとボタンが表示され、クリックでページ先頭に遷移
- スターターキット基本HTML（layout-drawer--in-header.html、layout-drawer--out-of-header.html）に標準装備
- コードと視覚がセットになっており、すぐコピペ可能
- バリエーションは CSS 調整のみで対応可能

---

## 設計思想

### 1. HTML 記述位置

`</body>` 直前（js読み込み前）に記述することで、ページ全体で動作可能。

```html
    <!-- ===============================
   トップに戻るボタン
  =============================== -->
    <button class="pagetop" id="js-pagetop">
      <a href="#"><img src="./assets/images/pagetop-icon.png" alt="" /></a>
    </button>
    <script src="./js/entry.js" type="module"></script>
  </body>
```

### 2. scss記述

scssはstyle.scssに記述(必須装備級のコンポーネントのため)
デフォルトでは、z-indexにて固定フッターより上に来るよう設定。

```scss
/* =====================================
    トップに戻るボタン

===================================== */

.pagetop {
  position: fixed;
  right: 10px;
  bottom: 40px;
  z-index: $z-footer-fixed + 1; // 固定フッターより上に表示。デザインによって変更可。
  width: 52px;
  height: 52px;
  img {
    width: 100%;
  }
  opacity: 1;
  visibility: hidden;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  &.is-show {
    opacity: 1;
    visibility: visible;
  }
  @include mq(md) {
    right: 20px;
    bottom: 40px;
  }
}
```

### 3. JS 実装

HTML に #js-pagetop が存在する場合のみ処理を実行。
これにより pagetop が無いページでも JS が止まらず安全に読み込める。

```js
// ========================================
// ページトップに戻るボタン (pagetop)
// ========================================

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
```

### 4. 使い方

- HTML に上記コードをコピー（スターターキット使用時は既存コードを確認し、必要に応じて img を差し替え）
- SCSS を style.scss に上書き（ボタンの大きさ・位置・z-index 等を調整）

### 5. 今後の展望

ほぼ完成形。必要に応じて使い勝手をアップデートしていく予定。
