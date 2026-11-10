const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { ESLint } = require('eslint');
const configRequire = createRequire(require.resolve('eslint-config-taeyoon/package.json'));
const parser = configRequire('@typescript-eslint/parser');

(async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [{
      files: ['packages/*/src/**/*.ts'],
      languageOptions: {
        parser,
        parserOptions: {
          project: ['packages/*/tsconfig.json'],
          tsconfigRootDir: process.cwd(),
        },
      },
    }],
  });
  const results = await eslint.lintFiles(['packages/*/src/**/*.ts']);
  assert.ok(results.length > 0);
  const errors = results.flatMap(result => result.messages.filter(message => message.severity === 2));
  assert.deepEqual(errors, []);
  console.log(`Type-aware ESLint parser smoke test passed (${results.length} files).`);
})().catch(error => { console.error(error); process.exitCode = 1; });
