# example

`textlint-rule-preset-ai-words-ja` を実際に動かすサンプルです。

`ai-generated-text.md` は AI に書かせた技術記事をそのまま配置しています。
このファイルに対してtextlintを実行することで、どのような文章が検知されるか確かめることができます。

## 実行方法

```shell
npm install
npm run lint
```

実行すると、10 件の指摘が出ます。読点が 8 件、単語が 2 件です。

```
  7:6    error  主題を 5 文字示しただけで読点を打っています。  ai-words-ja/no-short-topic-comma
 35:16   error  "効く" は英語の直訳です。                      ai-words-ja/no-ai-words
```

## 設定

`.textlintrc.json` はプリセットを有効にするだけの最小限のサンプルです。

```json
{
  "rules": {
    "preset-ai-words-ja": true
  }
}
```

