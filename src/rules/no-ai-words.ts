import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import { tokenize } from "kuromojin";
import { createTextlintMatcher } from "morpheme-match-textlint";
import { type DictionaryEntry, dictionary } from "../dictionary";

export type Options = {
    allows?: string[];
    dictionaryPath?: string;
    dictionaryMode?: "append" | "override";
};

const isDictionaryEntry = (value: unknown): value is DictionaryEntry => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const { message, tokens } = value as Record<string, unknown>;
    return (
        typeof message === "string" &&
        Array.isArray(tokens) &&
        tokens.length > 0 &&
        tokens.every((token) => typeof token === "object" && token !== null && !Array.isArray(token))
    );
};

const loadDictionary = (path: string): DictionaryEntry[] => {
    const file: unknown = JSON.parse(readFileSync(path, "utf8"));
    const entries = typeof file === "object" && file !== null ? (file as Record<string, unknown>).entries : undefined;
    if (!Array.isArray(entries)) {
        throw new Error(`${path} の辞書は、entries に配列を持つオブジェクトで書いてください。`);
    }
    entries.forEach((entry, index) => {
        if (!isDictionaryEntry(entry)) {
            throw new Error(`${path} の ${index} 番目の要素は、message と 1 つ以上の tokens を持つオブジェクトで書いてください。`);
        }
    });
    return entries;
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
    const mode = options.dictionaryMode ?? "append";
    if (mode !== "append" && mode !== "override") {
        throw new Error(`dictionaryMode には "append" か "override" を指定してください。`);
    }
    if (mode === "override" && options.dictionaryPath === undefined) {
        throw new Error(`dictionaryMode を "override" にするときは dictionaryPath も指定してください。`);
    }
    const userDictionary =
        options.dictionaryPath === undefined
            ? []
            : loadDictionary(resolve(context.getConfigBaseDir() ?? process.cwd(), options.dictionaryPath));
    const dictionaries = mode === "override" ? userDictionary : [...dictionary, ...userDictionary];
    // kuromojin は readonly の配列を返すので、複製してから渡す。
    const matchAll = createTextlintMatcher({
        tokenize: async (text) => [...(await tokenize(text))],
        dictionaries
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
