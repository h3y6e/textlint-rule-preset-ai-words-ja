# example

`textlint-rule-preset-ai-words-ja` を実際に動かすサンプルです。

`ai-generated-text.md` は AI に書かせた技術記事をそのまま配置しています。
このファイルに対してtextlintを実行することで、どのような文章が検知されるか確かめることができます。

## 実行方法

```shell
npm install
npm run lint
```

実行すると、次の指摘が出ます。

<!-- lint-output:start -->
```
ai-generated-text.md
    7:6   error  主題を 5 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。  ai-words-ja/no-short-topic-comma
   35:16  error  "効く" は英語の直訳です。"重要である" "結果に影響する" などに言い換えられないか検討してください。    ai-words-ja/no-ai-words
   37:33  error  "効く" は英語の直訳です。"重要である" "結果に影響する" などに言い換えられないか検討してください。    ai-words-ja/no-ai-words
   39:4   error  主題を 3 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。  ai-words-ja/no-short-topic-comma
   59:6   error  主題を 5 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。  ai-words-ja/no-short-topic-comma
   65:4   error  主題を 3 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。  ai-words-ja/no-short-topic-comma
  105:6   error  主題を 5 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。  ai-words-ja/no-short-topic-comma
  121:4   error  主題を 3 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。  ai-words-ja/no-short-topic-comma
  167:6   error  主題を 5 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。  ai-words-ja/no-short-topic-comma
  179:4   error  主題を 3 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。  ai-words-ja/no-short-topic-comma

✖ 10 problems (10 errors, 0 warnings, 0 infos)
```
<!-- lint-output:end -->

## 設定

`.textlintrc.json` はプリセットを有効にするだけの最小限のサンプルです。

```json
{
  "rules": {
    "preset-ai-words-ja": true
  }
}
```

