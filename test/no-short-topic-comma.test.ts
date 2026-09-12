import TextLintTester from "textlint-tester";
import rule from "../src/rules/no-short-topic-comma";

const tester = new TextLintTester();

const message = (length: number) =>
    `主題を ${length} 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。`;

tester.run("no-short-topic-comma", rule, {
    valid: [
        "Client Secret を安全に保管できない Public Client の場合は、認可コードを使います。",
        "ブラウザ上の JavaScript がリソースサーバーにリクエストを行う場合は、CORS を設定します。",
        "そこで、次の手を考えます。",
        "こんにちは、p1ass です。",
        "議事録は溜めても資産になりません。",
        {
            text: "議事録は、溜めても資産になりません。",
            options: { maxLength: 3 },
            description: "maxLength を下げるとしきい値より長い主題は指摘しない"
        }
    ],
    invalid: [
        { text: "議事録は、溜めても資産になりません。", errors: [{ message: message(4) }] },
        { text: "目的は、記事を見分けることです。", errors: [{ message: message(3) }] },
        { text: "今回は、M1 Mac で試します。", errors: [{ message: message(3) }] },
        {
            text: "前提を確認します。結論は、まだ出ていません。",
            errors: [{ message: message(3) }],
            description: "2 文目でも文頭から数え直す"
        },
        {
            text: "Client Secret を安全に保管できない Public Client の場合は、認可コードを使います。",
            options: { maxLength: 50 },
            errors: [{ message: message(43) }],
            description: "maxLength を上げると長い主題も指摘する"
        }
    ]
});
