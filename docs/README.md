# SK-base_v2.2

本リポジトリは次の二つの機能を有しています。

- ポートフォリオ制作や実案件でそのまま土台として使える
  **HTML / SCSS の骨格・ファイル構成の設計カタログ（スターターキット）**としての機能
- 部品見本をhtmlで表示させ、部品の見本の挙動を確認することができる（コードコピペ機能付き）

単なる見た目サンプルではなく、

- サイト全体の構造設計
- 骨格は固定したまま、ヘッダー・フッター・セクション単位で自由にデザイン差し替え
- 背景・画像・テキストの役割分離
- カタログ部品を差し替えて利用

を前提に、「考えなくてよい部分」を最大限減らすことを目的としています。
※ 本キットは、CSS / SCSS の基礎を一通り理解しており、
　「設計を固定したまま量産・差し替えしたい」方向けです。

---

## ファイル構成

### scssのファイル構成

````md
```text

scss/
├─ catalog/
│  ├─ _bg.scss
│  ├─ _card.scss
│  ├─ _drawer.scss
│  ├─ _footer.scss
│  ├─ _fv.scss
│  └─ _header.scss
│
├─ examples/
│  ├─ _cat-bg.scss
│  ├─ _cat-card.scss
│  ├─ _cat-fv.scss
│  └─ ...
│
├─ foundation/
│  ├─ _base.scss
│  ├─ _breakpoints.scss
│  ├─ _mixin.scss
│  ├─ _reset.scss
│  └─ _variables.scss
│
├─ entry.scss
├─ style-examples.scss
└─ style.scss
```
````

#### 各レイヤーの役割

- catalog
  再利用前提の部品群。
  基本的に直接編集せず、style.scss 側で上書きして使います。

- foundation
  変数・リセット・ブレークポイントなど、案件の土台。
  案件開始時に定義し、その後は原則触らない想定です。

- style.scss
  案件用スタイル。
  作業の起点として、遠慮なく汚してよいファイルです。

#### CSS の読み込み順

```
<link rel="stylesheet" href="css/entry.css" />  <!-- 母艦 -->
<link rel="stylesheet" href="css/style.css" />  <!-- 案件用（ぐちゃOK） -->
<link rel="stylesheet" href="css/about.css" />  <!-- ページ固有 -->

```

### JavaScript 構成

```
js/
├─ modules/
│  ├─ accordion.js
│  ├─ copy.js
│  ├─ drawer.js
│  ├─ modal.js
│  ├─ pagetop.js
│  └─ swiper-init.js
│
├─ vendor/
│  └─ swiper-bundle.min.js
│
└─ entry.js

```

#### JS の読み込み

```
<script src="./js/entry.js" type="module"></script>

```

（</body> 直前に配置）

## HTML 基本骨格

```text

body
├─ header.site-header
├─ main.main-layout
│  ├─ .main-hero
│  └─ .main-body
│      ├─ aside.sidebar
│      └─ .main-content
│          ├─ .section
│          ├─ .section
│          └─ ...
└─ footer.site-footer

```

## section の基本構造

```html
<section class="section section--about">
  <div class="section__bg"></div>
  <!-- 背景用 -->
  <div class="inner section__inner">
    <!-- コンテンツ本体 -->
    <h2>当院について</h2>
    <p>説明文…</p>
  </div>
</section>
```

- 背景とコンテンツを DOM レベルで分離
- 背景は装飾、`.inner`は内容物に専念

## 共通レイアウトルール

- `.inner` により横幅制限・中央寄せ・左右余白を一括適用
- 横並びはレイアウト用クラスで制御
- 各ブロックに \_\_bg を持たせ、背景を責務分離

---

## z-index 指針

- むやみに数値を競わせない（意味でレイヤーを分ける）
- 数値を知らなくていいものは `auto`

| 役割                         | z-index     |
| ---------------------------- | ----------- |
| 紙そのもの                   | auto        |
| 背景                         | -1, -2, -3  |
| UI / overlay / 装飾          | +1, +2, +10 |
| 固定ヘッダーなど“束そのもの” | 50,60,100   |

- overlay は疑似要素 `::after` を使用
- overlay 上にテキストを置く場合は `.inner` (z-index:2) を使用

---

## レイアウト用クラス（.inner / .inner--flex / .flex-layout）

- .inner系は各ブロックのコンテンツを中央寄せ
- 背景用 `.bg` と組み合わせて一貫したレイアウトを実現
- flex文言付きのクラスにより、htmlでflex配置かどうか確認可能になる
- flex文言付きのクラスは直下に来たテキスト要素だけ margin-bottom を殺してあるため、わざわざこれを上書きしてマージンを消す必要がない。

```scss
//要素積み上げタイプ。インナー付き。
.inner {
  max-width: $layout-max-width;
  margin: 0 auto;
  padding: 0 $space-md;
  box-sizing: border-box;
}

//要素フレックス配置。spとpcで配列が違う場合などに利用。インナー付き。
.inner--flex {
  max-width: variables.$layout-max-width;
  padding: 0 variables.$space-lg;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center; /* 直下に来たテキスト要素だけ margin-bottom を殺す */
  > h1,
  > h2,
  > h3,
  > h4,
  > h5,
  > h6,
  > p,
  > ul,
  > ol,
  > dl {
    margin-bottom: 0;
  }
}

//インナーいらない場合はこちらを利用
.flex-layout {
  display: flex;
  gap: 16px;
  /* 直下に来たテキスト要素だけ margin-bottom を殺す */
  > h1,
  > h2,
  > h3,
  > h4,
  > h5,
  > h6,
  > p,
  > ul,
  > ol,
  > dl {
    margin-bottom: 0;
  }
}
```

## 専用のbg

- bg--base html全体のbg
- bg--header headerのbg
- bg--main-hero fvまわりのbg(fvを画面いっぱいにしない場合効かせることができる)
- fv\_\_bg fvはbgで装備
- bg--main-body mainまわりのセクションをまたぐbg
- 各セクションのbgはbg--fullwidthから任意にbgカタログで置き換えてよい
- bg--footer footerのbg
- bg--footer-fixed 主にspの時に出す固定フッターのbg

---

## 設計思想

- 構造（HTML）と装飾（CSS）の責務を明確に分ける
- 背景・UI・本文を同じレイヤーに混在させない
- 迷ったら「どのレイヤーの責務か」で判断する

## 今後の拡張方針

- dialog 要素を用いたモーダル実装への移行
- SK-cat 系コンポーネントの追加・整理
- SVG / icon 運用ルールの明文化

## ライセンス・利用について

- 個人・商用利用可
- 改変・再配布可
- クレジット表記は任意
