# CLAUDE.md

## リリース

1. ルートの `package.json` の `version` を上げる
2. `pnpm sync:example-version` を実行して `example/package.json` を揃える
3. コミットし、`v<version>` タグを push する

`example/package.json` の `version` と `devDependencies` のバージョン範囲は、ルートの `version` に追従させる。
`npm version` や `pnpm version` を使う場合は `version` スクリプトが同期まで済ませる。
ずれたまま push すると CI と release が落ちる。

## example

`example/README.md` に貼った lint 結果は、CI が実際の出力と突き合わせている。
辞書やルールを変えて出力が変わったら、`pnpm check:example --update` で README を更新する。
