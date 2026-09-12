import type { ExpectedTokenWithCapture } from "morpheme-match-textlint";

export type DictionaryEntry = {
  message: string;
  tokens: ExpectedTokenWithCapture[];
};

const verb = (basicForm: string): ExpectedTokenWithCapture => ({
  pos: "動詞",
  pos_detail_1: "自立",
  basic_form: basicForm,
});

const noun = (basicForm: string): ExpectedTokenWithCapture => ({
  pos: "名詞",
  basic_form: basicForm,
});

const ni: ExpectedTokenWithCapture = {
  pos: "助詞",
  pos_detail_1: "格助詞",
  surface_form: "に",
};

export const dictionary: DictionaryEntry[] = [
  {
    message:
      '"効く" は英語の直訳です。"重要である" "結果に影響する" などに言い換えられないか検討してください。',
    tokens: [verb("効く")],
  },
  {
    message:
      '"壊れる" は英語の直訳です。"動かなくなる" "成り立たなくなる" "誤った結果になる" などに言い換えられないか検討してください。',
    tokens: [verb("壊れる")],
  },
  {
    // kuromoji は「自走」を 自 + 走 に割り、1 文字の「走」も basic_form が「走る」になる。活用形を並べて切り分ける。
    message:
      '"走る" は英語の直訳です。"実行される" "動作する" などに言い換えられないか検討してください。',
    tokens: [
      {
        pos: "動詞",
        pos_detail_1: "自立",
        surface_form: ["走る", "走っ", "走り", "走ら", "走れ", "走ろ"],
      },
    ],
  },
  {
    message:
      '"焼く" (焼き込む) は英語の直訳です。"固定する" "埋め込む" などに言い換えられないか検討してください。',
    tokens: [verb("焼く")],
  },
  {
    message:
      '"黙って" は英語の直訳です。"気づかないまま" "警告を出さずに" "何も知らせずに" などに言い換えられないか検討してください。',
    tokens: [verb("黙る")],
  },
  {
    // 「落ちる」単独では別義が多いため、格助詞の「に」を足してフォールバックの意味だけを拾う。
    message:
      '"〜に落ちる" をフォールバックの意味で使っていませんか。"〜にフォールバックする" "〜が代わりに使われる" などに言い換えられないか検討してください。',
    tokens: [ni, verb("落ちる")],
  },
  {
    message:
      '"崩す" は英語の直訳です。"覆す" "成り立たなくする" などに言い換えられないか検討してください。',
    tokens: [verb("崩す")],
  },
  {
    // 「動かす」単独では「サーバを動かす」に当たるため、目的語の「値」を足す。
    message:
      '"値を動かす" は "値を変える" "値を変更する" に言い換えられないか検討してください。',
    tokens: [
      { pos: "名詞", surface_form: "値" },
      { pos: "助詞", surface_form: "を" },
      verb("動かす"),
    ],
  },
  {
    // 「引く」単独では「下線を引く」に当たるため、格助詞の「から」を足して読む意味だけを拾う。
    message:
      '"〜から引く" は "〜を参照する" "〜から読む" に言い換えられないか検討してください。値を読む意味で "引く" を使うと、"下線を引く" のような本来の意味と混ざります。',
    tokens: [
      { pos: "助詞", pos_detail_1: "格助詞", surface_form: "から" },
      verb("引く"),
    ],
  },
  {
    message:
      '"経路" は一般的でない表現です。"ルート" "流れ" "道すじ" などに言い換えられないか検討してください。',
    tokens: [noun("経路")],
  },
  {
    message:
      '"死活" は一般的でない表現です。"生きているかどうか" "動いているかどうか" などに言い換えられないか検討してください。',
    tokens: [noun("死活")],
  },
  {
    message:
      '"漏れ" は一般的でない表現です。"抜け" "取りこぼし" などに言い換えられないか検討してください。',
    tokens: [noun("漏れ")],
  },
  {
    message:
      '"帰結" は一般的でない表現です。"結果" に言い換えられないか検討してください。',
    tokens: [noun("帰結")],
  },
  {
    message:
      '"原初" は一般的でない表現です。"最初の" "もともとの" などに言い換えられないか検討してください。',
    tokens: [noun("原初")],
  },
  {
    message:
      '"穴" は一般的でない表現です。"考慮できていない箇所" "見落とし" などに言い換えられないか検討してください。',
    tokens: [noun("穴")],
  },
  {
    // kuromoji は「無差別」を 無 + 差別 に割る。
    message:
      '"無差別" は一般的でない表現です。"見境なく" "区別せずに" などに言い換えられないか検討してください。',
    tokens: [
      { pos: "接頭詞", surface_form: "無" },
      { pos: "名詞", basic_form: "差別" },
    ],
  },
  {
    message:
      '"正本" は一般的でない表現です。"Single Source of Truth" "唯一の正しい情報源" "拠りどころ" などに言い換えられないか検討してください。',
    tokens: [noun("正本")],
  },
  {
    message:
      '"部品" は機械の語です。"パーツ" "コンポーネント" などに言い換えられないか検討してください。',
    tokens: [noun("部品")],
  },
  {
    message:
      '"検査" は一般的でない表現です。"チェック" "確かめる" などに言い換えられないか検討してください。',
    tokens: [noun("検査")],
  },
  {
    // kuromoji は「正典」を 正 + 典 に割る。
    message:
      '"正典" は一般的でない表現です。"Single Source of Truth" "唯一の正しい情報源" "拠りどころ" などに言い換えられないか検討してください。',
    tokens: [
      { pos: "接頭詞", surface_form: "正" },
      { pos: "名詞", surface_form: "典" },
    ],
  },
  {
    // 名詞単独では「光配線方式」に当たるため、助詞とサ変動詞まで含めて比喩の用法だけを拾う。
    message:
      '"配線する" は英語の直訳です。"つなぐ" "組み込む" などに言い換えられないか検討してください。',
    tokens: [
      ni,
      { pos: "名詞", basic_form: "配線" },
      { pos: "動詞", pos_detail_1: "自立", basic_form: "する" },
    ],
  },
  {
    message:
      '"太る" は一般的でない表現です。"容量が増える" "サイズが大きくなる" のように、何がどうなるかを書けないか検討してください。',
    tokens: [verb("太る")],
  },
  {
    message:
      '"見張る" は一般的でない表現です。"検出する" "確かめる" "監視する" などに言い換えられないか検討してください。',
    tokens: [verb("見張る")],
  },
  {
    message:
      '"原料" は製造の語です。"定義" に言い換えられないか検討してください。',
    tokens: [{ pos: "名詞", surface_form: "原料" }],
  },
];
