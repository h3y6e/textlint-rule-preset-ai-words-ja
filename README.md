# textlint-rule-preset-ai-words-ja

AI が書いた日本語に出てきやすい単語と言い回しを見つける [textlint](https://textlint.github.io/) のプリセットです。

## 概要

<!-- textlint-disable ai-words-ja/no-ai-words -->

英語をそのまま直訳したような動詞や日常では使わない硬い名詞、一般的ではない比喩表現で使われる単語を、形態素解析で検出します。

形態素分析を用いているため、例えば「効く」を検出対象にすると、「効きます」「効かない」にもマッチするようにしています。

<!-- textlint-enable ai-words-ja/no-ai-words -->

[@textlint-ja/textlint-rule-preset-ai-writing](https://github.com/textlint-ja/textlint-rule-preset-ai-writing) は文章の構造 (リストの形、見出しの強調、コロンの使い方) を検出します。一方で、textlint-rule-preset-ai-words-ja は単語そのものを検出対象としています。


## インストール

```shell
npm install --save-dev textlint-rule-preset-ai-words-ja
```

## 使い方

`.textlintrc.json` にルールを追加してください。

```json
{
  "rules": {
    "preset-ai-words-ja": true
  }
}
```

## ルールの個別設定

以下のようにオプション値を設定することで、各ルールの挙動をカスタマイズできます。

```json5
{
  "rules": {
    "preset-ai-words-ja": {
      "no-ai-words": {
        "allows": ["経路", "/検査|部品/"],
        "severity": "warning" // デフォルトはerrorです
      },
      "no-short-topic-comma": {
        "maxLength": 3
      }
    }
  }
}
```


## ルール

### `no-ai-words`

辞書に載せた単語と言い回しを指摘します。

| オプション | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `allows` | `string[]` | `[]` | 指摘されたくない単語がある場合に指定してください。正規表現も設定可能です。 (`"/検査\|部品/"`) |



### `no-short-topic-comma`

主題を短く示しただけで打つ読点を指摘します。

```
議事録は、溜めても資産になりません。
```

| オプション | 型 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `maxLength` | `number` | `5` | 文頭から読点までが何文字以内なら指摘するか |

## 検出する単語

<!-- textlint-disable ai-words-ja/no-ai-words -->

| 語 | 言い換えの候補 |
| --- | --- |
| 効く | 適用される / 効果がある |
| 壊れる | 動かなくなる / 成り立たなくなる / 誤った結果になる |
| 走る | 実行される / 動作する |
| 焼く (焼き込む) | 固定する / 埋め込む |
| 黙って | 気づかないまま / 警告を出さずに / 何も知らせずに |
| 〜に落ちる | 〜にフォールバックする / 〜が代わりに使われる |
| 崩す | 覆す / 成り立たなくする |
| 値を動かす | 値を変える / 値を変更する |
| 〜から引く | 〜を参照する / 〜から読む |
| 経路 | ルート / 流れ / 道すじ |
| 死活 | 生きているかどうか / 動いているかどうか |
| 漏れ | 抜け / 取りこぼし |
| 帰結 | 結果 |
| 原初 | 最初の / もともとの |
| 穴 | 考慮できていない箇所 / 見落とし |
| 無差別 | 見境なく / 区別せずに |
| 正本 | Single Source of Truth / 唯一の正しい情報源 / 拠りどころ |
| 正典 | Single Source of Truth / 唯一の正しい情報源 / 拠りどころ |
| 部品 | パーツ / コンポーネント |
| 検査 | チェック / 確かめる |
| 〜に配線する | つなぐ / 組み込む |
| 太る | 容量が増える / サイズが大きくなる |
| 見張る | 検出する / 確かめる / 監視する |
| 原料 | 定義 |

<!-- textlint-enable ai-words-ja/no-ai-words -->


## 開発

```shell
pnpm install
pnpm test         # tsc の型チェックと mocha
pnpm build        # 型定義と lib/ の出力
pnpm lint:text    # README を textlint にかける
```

## ライセンス

MIT
