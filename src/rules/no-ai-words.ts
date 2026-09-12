import type { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import { tokenize } from "kuromojin";
import { createTextlintMatcher } from "morpheme-match-textlint";
import { dictionary } from "../dictionary";

export type Options = {
    allows?: string[];
};

const REGEXP_LITERAL = /^\/(.+)\/([gimsuy]*)$/;

const createTester = (pattern: string): ((text: string) => boolean) => {
    const literal = REGEXP_LITERAL.exec(pattern);
    if (literal) {
        // g フラグを残すと lastIndex が持ち越され、同じ文字列でも結果が交互に変わる。
        const regExp = new RegExp(literal[1], literal[2].replace("g", ""));
        return (text) => regExp.test(text);
    }
    return (text) => text.includes(pattern);
};

const reporter: TextlintRuleReporter<Options> = (context, options = {}) => {
    const { Syntax, RuleError, report, getSource } = context;
    const testers = (options.allows ?? []).map(createTester);
    // kuromojin は readonly の配列を返すので、複製してから渡す。
    const matchAll = createTextlintMatcher({
        tokenize: async (text) => [...(await tokenize(text))],
        dictionaries: dictionary
    });
    return {
        async [Syntax.Str](node) {
            const text = getSource(node);
            const results = await matchAll(text);
            results.forEach((result) => {
                const matched = text.slice(result.range[0], result.range[1]);
                if (testers.some((tester) => tester(matched))) {
                    return;
                }
                report(node, new RuleError(result.message, { index: result.index }));
            });
        }
    };
};

const rule: TextlintRuleModule<Options> = reporter;

export default rule;
