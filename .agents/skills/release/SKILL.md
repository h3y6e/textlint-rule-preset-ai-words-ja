---
name: release
description: textlint-rule-preset-ai-words-ja を npm と GitHub にリリースする手順。「リリースして」「バージョンを上げて」「タグを打って」と頼まれたときに使う。
---

# リリース

mainに変更がマージ済みで、ローカルのmainが最新になっている状態から始める。
Bumpするセマンティックバージョン (major / minor / patch) は依頼に従い、指定がなければユーザーに確認する。

1. ルートの `package.json` の `version` を上げる
2. `pnpm sync:example-version` で `example/package.json` の `version` と `devDependencies` のバージョン範囲を揃える
3. `chore: バージョンを<version>に上げる` でコミットし、mainにpushする
4. `git tag -m v<version> v<version>` でタグを作ってpushする
5. `gh release create v<version> --title v<version> --generate-notes --verify-tag` でGitHubのリリースを作る。タグとGitHubのリリースは必ずセットで作る
6. releaseワークフローの成功を確認し、`npm view textlint-rule-preset-ai-words-ja@<version> version` がそのバージョンを返したら完了

## 注意点

- `example/package.json` がルートとずれたままpushすると、CIとreleaseワークフローが失敗する。`npm version` や `pnpm version` を使う場合は `version` スクリプトが同期まで済ませる。
- `tag.gpgSign` が有効で注釈タグになるため、`-m` でメッセージを渡す。渡さないと `fatal: no tag message?` で止まる。
