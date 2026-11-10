---
"@echoscript/core": patch
"@echoscript/types": patch
"@echoscript/yarn-plugin": patch
---

Refresh compatible development and release dependencies, including patched shell-quote and Handlebars, and regenerate the plugin bundle and configuration schema.

Remove unused Lerna release dependencies, replace vulnerable Rollup resolver tooling with esbuild, and pin the TypeScript-ESLint minimatch dependency to its patched version. Add bundle and type-aware parser smoke checks to release validation.
