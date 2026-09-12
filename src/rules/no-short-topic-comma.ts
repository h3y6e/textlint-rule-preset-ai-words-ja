import type { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import { type KuromojiToken, tokenize } from "kuromojin";

export type Options = {
    maxLength?: number;
};

const DEFAULT_MAX_LENGTH = 5;

const isSentenceEnd = (token: KuromojiToken): boolean =>
    token.pos === "記号" && ["句点", "一般"].includes(token.pos_detail_1) && /^[。！？!?]$/.test(token.surface_form);

const isTouten = (token: KuromojiToken): boolean => token.pos === "記号" && token.pos_detail_1 === "読点";

const isTopicWa = (token: KuromojiToken): boolean =>
    token.pos === "助詞" && token.pos_detail_1 === "係助詞" && token.surface_form === "は";

const reporter: TextlintRuleReporter<Options> = (context, options = {}) => {
    const { Syntax, RuleError, report, getSource, locator } = context;
    const maxLength = options.maxLength ?? DEFAULT_MAX_LENGTH;

    return {
        async [Syntax.Str](node) {
            const tokens = await tokenize(getSource(node));
            let offset = 0;
            let sentenceStart = 0;
            let previous: KuromojiToken | null = null;

            for (const token of tokens) {
                if (isTouten(token) && previous !== null && isTopicWa(previous)) {
                    const length = offset - sentenceStart;
                    if (length <= maxLength) {
                        report(
                            node,
                            new RuleError(
                                `主題を ${length} 文字示しただけで読点を打っています。読点を外すか、文を組み替えられないか検討してください。`,
                                { padding: locator.at(offset) }
                            )
                        );
                    }
                }
                offset += token.surface_form.length;
                if (isSentenceEnd(token)) {
                    sentenceStart = offset;
                }
                previous = token;
            }
        }
    };
};

const rule: TextlintRuleModule<Options> = reporter;

export default rule;
