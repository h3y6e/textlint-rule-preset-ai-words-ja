import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

type PackageJson = {
  name: string;
  version: string;
  devDependencies: Record<string, string>;
};

const readPackageJson = (path: string): PackageJson => JSON.parse(readFileSync(path, "utf8"));

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const examplePackagePath = `${repoRoot}example/package.json`;

const { name, version } = readPackageJson(`${repoRoot}package.json`);
const source = readFileSync(examplePackagePath, "utf8");
const examplePackage = readPackageJson(examplePackagePath);

const expected: Record<string, string> = {
  version,
  range: `^${version}`,
};
const actual: Record<string, string | undefined> = {
  version: examplePackage.version,
  range: examplePackage.devDependencies[name],
};

if (process.argv.includes("--check")) {
  const mismatched = Object.keys(expected).filter((key) => expected[key] !== actual[key]);
  if (mismatched.length > 0) {
    console.error(`example/package.json のバージョンが ${name}@${version} と揃っていません。`);
    for (const key of mismatched) {
      console.error(`  ${key}: 期待 ${expected[key]} / 実際 ${actual[key]}`);
    }
    console.error("`pnpm sync:example-version` で更新できます。");
    process.exit(1);
  }
  console.log(`example/package.json は ${version} に揃っています。`);
  process.exit(0);
}

examplePackage.version = version;
examplePackage.devDependencies[name] = `^${version}`;
const updated = `${JSON.stringify(examplePackage, null, 2)}\n`;
if (updated === source) {
  console.log(`example/package.json は ${version} に揃っています。`);
  process.exit(0);
}
writeFileSync(examplePackagePath, updated);
console.log(`example/package.json を ${version} に更新しました。`);
