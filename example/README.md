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
    3:37  error  "入口" はAIが書いた文章で多用される表現です。"最初の一歩" "とっかかり" などに言い換えられないか検討してください。              ai-words-ja/no-ai-words
    3:48  error  "道具" はAIが書いた文章で多用される表現です。"ツール" "手段" などに言い換えられないか検討してください。                        ai-words-ja/no-ai-words
    7:6   error  主題を 5 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。                            ai-words-ja/no-short-topic-comma
    9:26  error  "踏み込む" はAIが書いた文章で多用される表現です。"詳しく説明する" "立ち入る" などに言い換えられないか検討してください。        ai-words-ja/no-ai-words
   11:27  error  "照合" はAIが書いた文章で多用される表現です。"照らし合わせる" "見比べる" などに言い換えられないか検討してください。            ai-words-ja/no-ai-words
   11:55  error  "実測" はAIが書いた文章で多用される表現です。"実際に測った値" "計測結果" などに言い換えられないか検討してください。            ai-words-ja/no-ai-words
   11:70  error  "切り分ける" はAIが書いた文章で多用される表現です。"原因を絞り込む" "分けて調べる" などに言い換えられないか検討してください。  ai-words-ja/no-ai-words
   15:16  error  "核心" はAIが書いた文章で多用される表現です。"本質" "いちばん大事な点" などに言い換えられないか検討してください。              ai-words-ja/no-ai-words
   27:37  error  "構図" はAIが書いた文章で多用される表現です。"全体像" "関係" などに言い換えられないか検討してください。                        ai-words-ja/no-ai-words
   29:12  error  "線引き" はAIが書いた文章で多用される表現です。"境界" "区別" などに言い換えられないか検討してください。                        ai-words-ja/no-ai-words
   35:16  error  "効く" はAIが書いた文章で多用される表現です。"重要である" "結果に影響する" などに言い換えられないか検討してください。          ai-words-ja/no-ai-words
   37:33  error  "効く" はAIが書いた文章で多用される表現です。"重要である" "結果に影響する" などに言い換えられないか検討してください。          ai-words-ja/no-ai-words
   39:4   error  主題を 3 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。                            ai-words-ja/no-short-topic-comma
   43:25  error  "混ざる" はAIが書いた文章で多用される表現です。"混同する" "区別がつかなくなる" などに言い換えられないか検討してください。      ai-words-ja/no-ai-words
   45:17  error  "見落とす" はAIが書いた文章で多用される表現です。"見逃す" "気づかない" などに言い換えられないか検討してください。              ai-words-ja/no-ai-words
   47:26  error  "事故" はAIが書いた文章で多用される表現です。"障害" "不具合" などに言い換えられないか検討してください。                        ai-words-ja/no-ai-words
   49:32  error  "切り分ける" はAIが書いた文章で多用される表現です。"原因を絞り込む" "分けて調べる" などに言い換えられないか検討してください。  ai-words-ja/no-ai-words
   55:14  error  "土台" はAIが書いた文章で多用される表現です。"基礎" "前提" などに言い換えられないか検討してください。                          ai-words-ja/no-ai-words
   57:7   error  "土台" はAIが書いた文章で多用される表現です。"基礎" "前提" などに言い換えられないか検討してください。                          ai-words-ja/no-ai-words
   59:3   error  "構図" はAIが書いた文章で多用される表現です。"全体像" "関係" などに言い換えられないか検討してください。                        ai-words-ja/no-ai-words
   59:6   error  主題を 5 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。                            ai-words-ja/no-short-topic-comma
   65:4   error  主題を 3 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。                            ai-words-ja/no-short-topic-comma
   69:29  error  "〜した瞬間" はAIが書いた文章で多用される表現です。"〜したとき" "〜した直後" などに言い換えられないか検討してください。        ai-words-ja/no-ai-words
   69:37  error  "破綻" はAIが書いた文章で多用される表現です。"行き詰まる" "成り立たなくなる" などに言い換えられないか検討してください。        ai-words-ja/no-ai-words
   75:3   error  "線引き" はAIが書いた文章で多用される表現です。"境界" "区別" などに言い換えられないか検討してください。                        ai-words-ja/no-ai-words
   79:12  error  "照合" はAIが書いた文章で多用される表現です。"照らし合わせる" "見比べる" などに言い換えられないか検討してください。            ai-words-ja/no-ai-words
   82:7   error  "実測" はAIが書いた文章で多用される表現です。"実際に測った値" "計測結果" などに言い換えられないか検討してください。            ai-words-ja/no-ai-words
   83:13  error  "切り分ける" はAIが書いた文章で多用される表現です。"原因を絞り込む" "分けて調べる" などに言い換えられないか検討してください。  ai-words-ja/no-ai-words
   87:19  error  "踏み込む" はAIが書いた文章で多用される表現です。"詳しく説明する" "立ち入る" などに言い換えられないか検討してください。        ai-words-ja/no-ai-words
  105:6   error  主題を 5 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。                            ai-words-ja/no-short-topic-comma
  113:4   error  "見落とす" はAIが書いた文章で多用される表現です。"見逃す" "気づかない" などに言い換えられないか検討してください。              ai-words-ja/no-ai-words
  115:20  error  "切り分ける" はAIが書いた文章で多用される表現です。"原因を絞り込む" "分けて調べる" などに言い換えられないか検討してください。  ai-words-ja/no-ai-words
  117:22  error  "別物" はAIが書いた文章で多用される表現です。"別のもの" "まったく違うもの" などに言い換えられないか検討してください。          ai-words-ja/no-ai-words
  119:22  error  "別物" はAIが書いた文章で多用される表現です。"別のもの" "まったく違うもの" などに言い換えられないか検討してください。          ai-words-ja/no-ai-words
  121:4   error  主題を 3 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。                            ai-words-ja/no-short-topic-comma
  155:36  error  "土台" はAIが書いた文章で多用される表現です。"基礎" "前提" などに言い換えられないか検討してください。                          ai-words-ja/no-ai-words
  161:55  error  "入口" はAIが書いた文章で多用される表現です。"最初の一歩" "とっかかり" などに言い換えられないか検討してください。              ai-words-ja/no-ai-words
  167:6   error  主題を 5 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。                            ai-words-ja/no-short-topic-comma
  175:27  error  "要点" はAIが書いた文章で多用される表現です。"ポイント" "大事なところ" などに言い換えられないか検討してください。              ai-words-ja/no-ai-words
  177:9   error  "踏み込む" はAIが書いた文章で多用される表現です。"詳しく説明する" "立ち入る" などに言い換えられないか検討してください。        ai-words-ja/no-ai-words
  179:4   error  主題を 3 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。                            ai-words-ja/no-short-topic-comma

✖ 41 problems (41 errors, 0 warnings, 0 infos)
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

