# SK-base v2.2 | examples

## examplesについて

`examples`は、
**実案件で使うためのベース構造（SCSS / JS / HTML 設計）** と  
**過去に作成したカタログ部品の見本（examples）**  
をまとめたものです。

- 見え方を思い出す
- 実装例を確認する
- コードを安全にコピペする

ための **確認用・参照用** のみの役割を持ちます。

👉 実案件では `examples` 一式を削除する前提です。

収納されている`examples`は以下のものがあります。

- cat-bg.html
- cat-card.html
- cat-fv.html
  (コンポーネントは将来的に増やしていく予定)

---

---

## ディレクトリ構成（抜粋）

```text
SK-base/
├─ scss/
│  ├─ foundation/        // ベーススタイル
│  ├─ catalog/           // 各カタログの本体SCSS（実案件で使用）
│  ├─ examples/          // 見本専用SCSS（案件では削除）
│  ├─ entry.scss         // 実案件用CSSエントリ
│  ├─ style.scss         // 実案件上書き用CSS
│  └─ style-examples.scss// 見本HTML専用CSS
│
├─ css/
│  ├─ entry.css
│  ├─ style.css
│  └─ style-examples.css
│
├─ examples/             // 見本HTML（案件では削除）
│  ├─ index.html
│  ├─ cat-card.html
│  ├─ cat-slider.html
│  └─ cat-modal.html
│
├─ assets/
│  └─ images/            // SK-base用（見本・共通素材）
│
└─ images/               // 実案件用画像
```

## examples 用 CSS の考え方

### HTML 側ルール

各見本 HTML では、main にページ固有クラスを付与しています。

```html
<main class="ex ex-cat-card">...</main>
```

- ex：examples 共通
- ex-cat-xxx：ページ固有

### SCSS 側ルール

style-examples.scss では、

共通調整 → .ex

ページ固有の上書き → .ex-cat-xxx 配下

に限定して記述します。

```scss
.ex {
  padding: 40px;
}

.ex-cat-card {
  .card {
    margin-bottom: 80px;
  }
}
```

👉 これにより、
特定のカタログ見本だけを安全に上書き できます。

### CSS / JS の読み込みルール（固定）

examples HTML

```html
<link rel="stylesheet" href="../css/entry.css" />
<link rel="stylesheet" href="../css/style-examples.css" />

<script type="module" src="../js/entry.js"></script>
```

実案件 HTML

```html
<link rel="stylesheet" href="css/entry.css" />
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" href="css/about.css" /> ページ毎の上書き

<script type="module" src="js/entry.js"></script>
```

## 実案件に移行するとき

以下は すべて削除してOK です。

examples/

scss/examples/

scss/style-examples.scss

css/style-examples.css

assets/images/sample/（見本用画像）

👉 entry.css / style.css / catalog SCSS はそのまま使用します。

## この構成の意図

examples を 安全に育てられる

実案件と 絶対に混ざらない

削除判断が一瞬でできる

SK-base は
「完成品を配布するテンプレ」ではなく、
自分が迷わず使い続けるための設計資産 です。
