/**
 * copy.js
 *
 * 目的：
 * <pre><code> で表示されているコードを、ワンクリックでクリップボードにコピーする。
 * コード見本を「読む紙」から「すぐ使える紙」へ変換するためのUI機能。
 *
 * 使い方：
 * 1. コピーしたい <pre> の直前に、data-copy 属性を持つボタンを置く。
 *
 *    <button data-copy>Copy</button>
 *    <pre><code>...コピーしたいコード...</code></pre>
 *
 * 2. このファイルを読み込むだけで、自動的に全ての [data-copy] が有効になる。
 *
 * 仕様：
 * - ボタンの「次の兄弟要素」がコピー対象になる。
 * - クラス名やIDに依存しないため、どんなコードブロックにも流用できる。
 * - innerText を使用するため、表示されているコードがそのままコピーされる。
 */

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const code = btn.nextElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy"), 1200);
    });
  });
});
