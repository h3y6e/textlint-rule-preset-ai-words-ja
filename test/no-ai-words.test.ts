import TextLintTester from "textlint-tester";
import { dictionary } from "../src/dictionary";
import rule from "../src/rules/no-ai-words";

const tester = new TextLintTester();

// 辞書のメッセージを引き当てて期待値にする。同じ語に対して 2 つ以上の書き方が残っていたら落とす。
const messageOf = (keyword: string): string => {
    const messages = [...new Set(dictionary.filter((entry) => entry.message.includes(keyword)).map((entry) => entry.message))];
    if (messages.length !== 1) {
        throw new Error(`${keyword} に対応するメッセージが ${messages.length} 件見つかりました`);
    }
    return messages[0];
};

const invalid = (text: string, keyword: string) => ({
    text,
    errors: [{ message: messageOf(keyword) }]
});

tester.run("no-ai-words", rule, {
    valid: [
        "有効活用していきたいです。",
        "効率よく進めます。",
        "リクエストが落ち着く前に切ります。",
        "水が漏れるので直します。",
        "次の実験の配線を準備します。",
        "光配線方式の物件に住んでいます。",
        "結果として妥当な線に落ち着きました。",
        "自走できるエンジニアを目指します。",
        "サーバーが落ちました。",
        "コードを載せておきます。",
        "テストケースを通しました。",
        "見出しの下に罫線を引きます。",
        "読者の注意を引く要素は絞ります。",
        "発表資料から引用しました。",
        "ローカルで DB サーバを動かします。",
        "まず手を動かしてみます。",
        "部屋にゴミが落ちている。",
        "動画の素材を差し替えます。",
        "暗黙的にアクセスできます。",
        "出力の品質が落ちました。",
        "検査官が来ました。",
        "検索の結果を貼ります。",
        "差分が出ないことを確かめます。",
        {
            text: "MDX の経路が 2 つあります。",
            options: { allows: ["経路"] },
            description: "allows に挙げた語は指摘しない"
        },
        {
            text: "生の値の検査を CI で回します。",
            options: { allows: ["/検査|部品/"] },
            description: "allows は正規表現でも書ける"
        }
    ],
    invalid: [
        invalid("この設定が効きます。", '"効く"'),
        invalid("インデックスが効かない。", '"効く"'),
        invalid("同名の記事を書いた時点で壊れます。", '"壊れる"'),
        invalid("バッチ処理が走ります。", '"走る"'),
        invalid("色がビルド時に焼き込まれます。", '"焼く"'),
        invalid("エラーが黙って握りつぶされます。", '"黙って"'),
        invalid("警告を出さず黙って進みます。", '"黙って"'),
        invalid("sans-serif が中国語のフォントに落ちます。", '"〜に落ちる"'),
        invalid("指定が無いと既定値に落ちる。", '"〜に落ちる"'),
        invalid("問いの前提を崩します。", '"崩す"'),
        invalid("このトークンの値を動かさないでください。", '"値を動かす"'),
        invalid("値は styles のトークンから引きます。", '"〜から引く"'),
        invalid("キャッシュから引いた値を使います。", '"〜から引く"'),
        invalid("MDX の経路が 2 つあります。", '"経路"'),
        invalid("リンク先の死活に依存しています。", '"死活"'),
        invalid("画像パスを文字列置換で直しています。", '"置換"'),
        invalid("検証の漏れがあります。", '"漏れ"'),
        invalid("実装の不備ではなく設計上の帰結です。", '"帰結"'),
        invalid("無検証の文字列 SQL は論外です。", '"論外"'),
        invalid("原初の売り文句は無価値です。", '"原初"'),
        invalid("動的な組み立てが最大の穴です。", '"穴"'),
        invalid("記事からラベルへの向きを共通化しません。", '"向き"'),
        invalid("無差別に削除します。", '"無差別"'),
        invalid("この事実を正本とします。", '"正本"'),
        invalid("似た役割の部品を探します。", '"部品"'),
        invalid("UI 部品は 3 対 1 を満たします。", '"部品"'),
        invalid("生の値の検査を CI で回します。", '"検査"'),
        invalid("ビルドの最後に検査します。", '"検査"'),
        invalid("この事実を正典とします。", '"正典"'),
        invalid("各実装に配線します。", '"配線する"'),
        invalid("画像を 2 組持つとリポジトリが太ります。", '"太る"'),
        invalid("モバイルでの横あふれを見張ります。", '"見張る"'),
        invalid("色の原料をここに置きます。", '"原料"'),
        {
            ...invalid("選考に落ちてしまいました。", '"〜に落ちる"'),
            description: "落下や不合格の意味とは形態素で切り分けられないので、指摘してしまうことを記録しておく"
        }
    ]
});
