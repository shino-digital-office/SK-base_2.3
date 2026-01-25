# SK-cat-drawer README

## ドロワー設計の考え方

本ドキュメントでは、SK-cat-drawer におけるドロワー設計の考え方と分類軸を整理します。  
ここで示す分類は、見た目の違いではなく **構造と責務** に基づくものです。

---

## ドロワーの本質的な分類

SK-cat-drawer では、ドロワーを以下の2種類に分類します。

- [ヘッダーに属するドロワー](#drawer-header)
- [独立したレイヤーとしてのドロワー](#drawer-layer)

<a id="drawer-header"></a>

### 1. ヘッダーに属するドロワー

- ドロワーはヘッダーの配下に配置されます
- 開く／閉じる操作は **ヘッダー上のボタン** が担当します
- ドロワーは「ヘッダーの拡張状態」として扱われます

#### 1-1 特徴

- ハンバーガーボタンと閉じるボタンは同じ位置（ヘッダー上）に存在
- ドロワーはヘッダー下からスライドして表示
- JSはヘッダー配下の状態切り替えのみを担当

#### 1-2 コード

```html
<header class="site-header">
  <div class="bg"></div>

  <div class="header-bar inner--flex">
    <!-- ブランドロゴ -->
    <a class="brand" href="#"
      ><img src="./assets/images/site-logo.png" alt=""
    /></a>

    <!-- Desktop用ナビ -->
    <nav class="desktop-nav">
      <div class="nav-content">
        <a href="#home" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Home</a
        >
        <a href="#about" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >About</a
        >
        <a href="#works" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Works</a
        >
        <a href="#blog" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Blog</a
        >
        <a
          href="#contact"
          class="nav-unit nav-unit--link"
          data-ui-close="drawer"
          >Contact</a
        >
      </div>
    </nav>

    <!-- ハンバーガーアイコン -->
    <button id="js-drawer-icon" class="drawer-icon--in-header">
      <span class="drawer-icon__bar"></span>
      <span class="drawer-icon__bar"></span>
      <span class="drawer-icon__bar"></span>
    </button>
  </div>

  <!-- ドロワー本体 -->
  <div id="js-drawer-content" class="drawer-content--in-header">
    <nav class="drawer-nav inner--flex">
      <div class="nav-content">
        <a href="#home" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Home</a
        >
        <a href="#about" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >About</a
        >
        <a href="#works" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Works</a
        >
        <a href="#blog" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Blog</a
        >
        <a
          href="#contact"
          class="nav-unit nav-unit--link"
          data-ui-close="drawer"
          >Contact</a
        >
      </div>
    </nav>
  </div>
</header>

<!-- ドロワー用オーバーレイ -->
<div class="drawer-overlay" id="js-drawer-overlay"></div>
```

```scss
.drawer-content--in-header {
  position: fixed;
  top: 56px; // ヘッダー高さ
  right: 0;
  width: $drawer-width; // _variables.scss または px指定
  height: calc(100% - 56px); // ヘッダーを除いた高さ
  background-color: #0060a0; // 背景は直接指定
  transform: translateX(100%);
  transition: transform 0.3s linear;

  &.is-checked {
    transform: translateX(0);
  }
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s linear;
  z-index: $z-drawer-overlay;

  &.is-visible {
    opacity: 1;
    pointer-events: auto;
  }
}

/* ハンバーガーアイコン */
.drawer-icon--in-head {
  width: 32px;
  height: 32px;
  position: relative;

  .drawer-icon__bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 3px;
    border-radius: 3px;
    background: white;
    transition:
      transform 0.3s linear,
      top 0.3s linear;

    &:nth-of-type(1) {
      top: 2px;
    }
    &:nth-of-type(2) {
      top: 15px;
    }
    &:nth-of-type(3) {
      top: 28px;
    }
  }

  &.is-checked {
    .drawer-icon__bar {
      &:nth-of-type(1) {
        top: 15px;
        transform: rotate(45deg);
      }
      &:nth-of-type(2) {
        display: none;
      }
      &:nth-of-type(3) {
        top: 15px;
        transform: rotate(-45deg);
      }
    }
  }

  @include mq(md) {
    display: none; // PCでは非表示
  }
}
```

```js
const drawerIcon = document.getElementById("js-drawer-icon");
const drawerContent = document.getElementById("js-drawer-content");
const drawerOverlay = document.getElementById("js-drawer-overlay");

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

drawerIcon.addEventListener("click", function (e) {
  e.preventDefault();
  drawerContent.classList.contains("is-checked") ? closeDrawer() : openDrawer();
});

drawerContent.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

// オーバーレイクリックで閉じる（不要ならコメントアウト）
drawerOverlay?.addEventListener("click", closeDrawer);
```

#### 1-3 使い方(ヘッダーに属するドロワー)

HTML

- ハンバーガーアイコンに drawer-icon--in-header クラス、id js-drawer-icon
- ドロワー本体に drawer-content--in-header クラス、id js-drawer-content
- オーバーレイに drawer-overlay クラス、id js-drawer-overlay

SCSS

- \_variables.scss で $drawer-width や z-index を指定
- .drawer-content の高さはヘッダー固定高さを考慮して計算。フッター固定部の高さは重なる存在と割り切る
- .drawer-content の中身は中央配置させたいので、フッター固定部の高さをpadding-bottomで持たせた

JS

- openDrawer() / closeDrawer() を使用して開閉
- アイコン、リンク、オーバーレイのクリックで閉じる操作を割り当て

---

<a id="drawer-layer"></a>

### 2. 独立したレイヤーとしてのドロワー

- ドロワーはヘッダーとは独立したレイヤーとして配置されます
- 閉じるボタンは **ドロワー自身が持つ**
- ヘッダーとは責務が分離されます

#### 2-1 特徴

- ドロワー内部に明示的な閉じるボタンを持つ
- 全画面・モーダル的なUIに近い性質
- ヘッダーとは別物のUIとして扱う

#### 2-2 コード

```html
<header class="site-header">
  <div class="bg"></div>

  <div class="header-bar inner--flex">
    <!-- ブランドロゴ -->
    <a class="brand" href="#"
      ><img src="./assets/images/site-logo.png" alt=""
    /></a>

    <!-- Desktop用ナビ -->
    <nav class="desktop-nav">
      <div class="nav-content">
        <a href="#home" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Home</a
        >
        <a href="#about" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >About</a
        >
        <a href="#works" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Works</a
        >
        <a href="#blog" class="nav-unit nav-unit--link" data-ui-close="drawer"
          >Blog</a
        >
        <a
          href="#contact"
          class="nav-unit nav-unit--link"
          data-ui-close="drawer"
          >Contact</a
        >
      </div>
    </nav>

    <!-- ハンバーガーアイコン -->
    <button id="js-drawer-icon" class="drawer-icon--out-of-header">
      <span class="drawer-icon__bar"></span>
      <span class="drawer-icon__bar"></span>
      <span class="drawer-icon__bar"></span>
    </button>
  </div>
</header>

<!-- ドロワー用オーバーレイ -->
<div class="drawer-overlay" id="js-drawer-overlay"></div>
<!-- ドロワー本体 -->
<div id="js-drawer-content" class="drawer-content--out-of-header">
  <!-- Drawer Icon(ドロワー上のドロワークローズボタン) -->
  <button id="js-drawer-icon-out-of-header" class="drawer-icon--out-of-header">
    <span class="drawer-icon__bar"></span>
    <span class="drawer-icon__bar"></span>
    <span class="drawer-icon__bar"></span>
  </button>
  <nav class="drawer-nav inner--flex">
    <div class="nav-content">
      <a href="#home" class="nav-unit nav-unit--link" data-ui-close="drawer"
        >Home</a
      >
      <a href="#about" class="nav-unit nav-unit--link" data-ui-close="drawer"
        >About</a
      >
      <a href="#works" class="nav-unit nav-unit--link" data-ui-close="drawer"
        >Works</a
      >
      <a href="#blog" class="nav-unit nav-unit--link" data-ui-close="drawer"
        >Blog</a
      >
      <a href="#contact" class="nav-unit nav-unit--link" data-ui-close="drawer"
        >Contact</a
      >
    </div>
  </nav>
</div>
```

```scss
.drawer-icon--out-of-header {
  position: relative;
  width: 32px;
  height: 32px;

  .drawer-icon__bar {
    position: absolute;
    left: 0;
    width: 32px;
    height: 3px;
    border-radius: 3px;
    background: #fff;
    transition:
      transform 0.3s linear,
      top 0.3s linear;

    &:nth-of-type(1) {
      top: 2px;
    }
    &:nth-of-type(2) {
      top: 15px;
    }
    &:nth-of-type(3) {
      top: 28px;
    }
  }

  &.is-checked {
    display: none;
  }

  @include breakpoints.mq(md) {
    display: none;
  }
}
.drawer-content--out-of-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: variables.$z-header + 2; // drawer-overlay より上に表示

  width: variables.$drawer-width;
  height: 100%;

  background-color: #0060a0; // .bg は使わない（意図的な例外）
  text-align: center;

  transform: translateX(100%);
  transition: transform 0.3s linear;

  &.is-checked {
    transform: translateX(0);
    .drawer-icon--out-of-header {
      .drawer-icon__bar {
        &:nth-of-type(1) {
          top: 15px;
          transform: rotate(45deg);
        }
        &:nth-of-type(2) {
          display: none;
        }
        &:nth-of-type(3) {
          top: 15px;
          transform: rotate(-45deg);
        }
      }
    }
  }
}
```

1-2のjsのコードに以下の二つを追加

```js
const drawerCloseBtn = document.getElementById("js-drawer-icon-out-of-header");

// ドロワー内の閉じるボタンをクリック
drawerCloseBtn?.addEventListener("click", function (e) {
  e.preventDefault();
  closeDrawer();
});
```

#### 2-3 使い方(ヘッダーに属するドロワー)

HTML

- ハンバーガーアイコンに drawer-icon--out-of-header クラス、id js-drawer-icon
- ドロワー本体に drawer-content--out-of-header クラス、id js-drawer-content
- ドロワー本体の閉じるボタンにdrawer-icon--out-of-header クラス、id js-drawer-icon-out-of-header
- オーバーレイに drawer-overlay クラス、id js-drawer-overlay

SCSS

- \_variables.scss で $drawer-width や z-index を指定
- .drawer-content の高さはデフォルト100%

JS

- openDrawer() / closeDrawer() を使用して開閉
- アイコン、リンク、オーバーレイのクリックで閉じる操作を割り当て

---

## 分類の判断基準

見た目の「ヘッダーを残す／残さない」「全画面を覆う／覆わない」は分類の本質ではありません。

SK-cat-drawer では、次の点を分類の判断基準とします。

- **閉じるボタンがどこに存在するか**
- **閉じる操作の責務をどのUIが持つか**

この基準により、構造・CSS・JS の責務分離を明確にできます。

---

## オーバーレイについて

オーバーレイは必須要素ではなく、**補助的なレイヤー**として扱います。

### 基本的な考え方

- オーバーレイは「ドロワー以外の領域を視覚的・操作的に無効化する」ためのもの
- オーバーレイの可視性は、ドロワーのサイズによって決まります

### ヘッダーに属するドロワーの場合

- オーバーレイはヘッダー領域を避けて敷かれる
- ドロワーの幅が小さい場合はオーバーレイが見える
- ドロワーの幅が100%の場合、オーバーレイはほぼ見えない

### 独立したレイヤーとしてのドロワーの場合

- オーバーレイは背後の背景レイヤーとして敷かれる
- ドロワーが全画面の場合、オーバーレイは見えない
- ドロワーが部分表示の場合、オーバーレイが見える

---

## アクセシビリティについて

- `aria-expanded` などのアクセシビリティ対応は、本カタログでは必須としません
- 必要に応じて、SK-cat-drawer の README または実装例でオプションとして追加可能

---

## 技術的補足

- drawer は画面上に浮遊して表示される UI コンポーネントであり、SK-base の `.bg` レイヤー（z-index:-1 前提）とは思想が異なります
- そのため、drawer では `.bg` を使用せず、**drawer 本体に背景色を持たせる**設計とします
- jQueryは不採用、**Vanilla JS** を採用
  - 依存がゼロ
  - ファイル軽量
  - 保守性・将来性が高い

---

## まとめ

- ドロワーの本質的な分類軸は **構造と責務** にある
- 判断基準は **閉じる操作を誰が担うか**
- オーバーレイは結果として見える補助レイヤーであり、分類軸ではない
- 本設計により、SK-cat-drawer はシンプルで拡張可能な構成を保つことができる

---

💡 このREADMEは、今後「独立したレイヤーとしてのドロワー」を作る際も参照可能な設計思想として残すことを意識しています。
