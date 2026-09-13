import noAiWords from "./rules/no-ai-words";
import noShortTopicComma from "./rules/no-short-topic-comma";

export default {
    rules: {
        "no-ai-words": noAiWords,
        "no-short-topic-comma": noShortTopicComma
    },
    rulesConfig: {
        "no-ai-words": true,
        "no-short-topic-comma": false
    }
};
