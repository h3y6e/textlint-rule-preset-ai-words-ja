# example

`textlint-rule-preset-ai-words-ja` を実際に動かすサンプルです。

`ai-generated-text.md` は AI に書かせた技術記事をそのまま置いたものです。手を入れていないので、このプリセットが拾う言い回しが残っています。

## 動かす

```shell
npm install
npm run lint
```

10 件の指摘が出ます。読点が 8 件、単語が 2 件です。

```
  7:6    error  主題を 5 文字示しただけで読点を打っています。  ai-words-ja/no-short-topic-comma
 35:16   error  "効く" は英語の直訳です。                      ai-words-ja/no-ai-words
```

## 設定

`.textlintrc.json` はプリセットを有効にするだけの最小の形です。

```json
{
  "rules": {
    "preset-ai-words-ja": true
  }
}
```

指摘を絞りたいときのオプションは、リポジトリ直下の [README](../README.md) にあります。
