# starterkit_v2_fv

本ページ(examples/cat-fv.html)は、ポートフォリオや案件制作の際に使える **FV（ファーストビュー）型のカタログ** です。

- FV の基本構造を型として収録
- 背景・配置・コンテンツを分離した三層構造
- コードと視覚がセットになっており、すぐコピペ可能
- バリエーションは CSS 調整だけで対応可能

---

## 設計思想

### 1. 紙レイヤーとフレームの分離

- `.fv` = フレーム（画面サイズを決める）
- `.fv__bg` = 背景画像
- `.fv__frame` = 配置用フレーム
- `.fv__container` = コンテンツを収める紙

### 2. 中央配置は grid で制御

```scss
.fv__frame {
  display: grid;
  place-items: center; // 縦・横を中央に
}
```

縦・横位置の変更は place-items や inset で調整可能

### 3. コンテンツの横幅制御と装飾

.fv\_\_container に max-width、背景、透過、blur を設定

バリエーションは CSS で対応可能（HTML は 1 型で十分）

### 4. 使い方

index.html で FV 型の構造を確認

必要な FV を HTML にコピー

SCSS を main.scss に追加、または import

配置や横幅、背景などを class で調整

FV 型サンプル
fv-basic : FV 基本構造

```HTML
<section class="fv">
  <div class="bg fv__bg">
    <picture>
      <source media="(min-width: 768px)" srcset="assets/images/fv-pc.jpg" />
      <img src="assets/images/fv-sp.jpg" alt="" />
    </picture>
  </div>

  <div class="fv__frame">
    <div class="fv__container">
      <h1>このページのタイトル</h1>
      <p class="fv__caption">キャッチコピーなど</p>
    </div>
  </div>
</section>

```

```SCSS
.fv {
  position: relative;
  overflow: hidden;
  height: calc(100vh - 60px); // ヘッダー分を除いた全画面　フッターはfvに重なる存在と割り切る
}

/* 背景 */
.fv__bg {
  position: absolute;
  inset: 0;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* 配置用フレーム */
.fv__frame {
  position: absolute;
  inset: 0 20px; // 左右余白だけ確保
  display: grid;
  place-items: center; // 中央配置
}

/* コンテンツ紙 */
.fv__container {
  position: relative;
  width: 100%;
  padding: 1rem 1.25rem;
  max-width: 760px;

  background: rgba(0, 0, 0, 0.55);
  color: #aaffcc;
  border-radius: 12px;
  backdrop-filter: blur(4px);

  h1 {
    margin: 0 0 0.5rem 0;
  }

  p {
    margin: 0;
  }
}
```

### 5. 今後の展望

新しい FV 型を追加してカタログ拡張可能

配置バリエーションや装飾バリエーションは CSS 調整で対応

このカタログを基にポートフォリオや案件ページを構築可能
