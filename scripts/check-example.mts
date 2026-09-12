import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const exampleDir = fileURLToPath(new URL("../example", import.meta.url));
const readmePath = `${exampleDir}/README.md`;
const startMarker = "<!-- lint-output:start -->";
const endMarker = "<!-- lint-output:end -->";

const lint = spawnSync(`${exampleDir}/node_modules/.bin/textlint`, ["ai-generated-text.md"], {
  cwd: exampleDir,
  encoding: "utf8",
});
if (lint.error !== undefined) {
  console.error(`example で textlint を実行できませんでした: ${lint.error.message}`);
  process.exit(1);
}
// 指摘が 0 件 (終了コード 0) ならサンプルとして成立していない。
if (lint.status !== 1) {
  console.error(`textlint が想定外の終了コード ${lint.status} で終わりました。`);
  console.error(lint.stdout + lint.stderr);
  process.exit(1);
}

// 実行環境ごとに変わる絶対パスを README に載せられる形へ寄せる。
const actual = lint.stdout.replaceAll(`${exampleDir}/`, "").trim();

const readme = readFileSync(readmePath, "utf8");
const block = readme.match(new RegExp(`${startMarker}\\n\`\`\`\\n([\\s\\S]*?)\`\`\`\\n${endMarker}`));
if (block === null) {
  console.error(`example/README.md に ${startMarker} で囲んだコードブロックが見つかりません。`);
  process.exit(1);
}

if (process.argv.includes("--update")) {
  writeFileSync(
    readmePath,
    readme.replace(block[0], `${startMarker}\n\`\`\`\n${actual}\n\`\`\`\n${endMarker}`),
  );
  console.log("example/README.md の lint 結果を更新しました。");
  process.exit(0);
}

const documented = block[1]?.trim();
if (documented !== actual) {
  console.error("example の lint 結果が example/README.md と一致しません。");
  console.error("--- README ---");
  console.error(documented);
  console.error("--- 実際 ---");
  console.error(actual);
  console.error("`pnpm check:example --update` で README を更新できます。");
  process.exit(1);
}

console.log("example の lint 結果は example/README.md と一致しています。");
