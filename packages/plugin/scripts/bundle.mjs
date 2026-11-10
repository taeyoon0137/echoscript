import { build } from 'esbuild';

await build({
  entryPoints: ['src/main.ts'],
  outfile: 'plugin/bundle.js',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node22.17',
  minify: true,
  legalComments: 'none',
  // Yarn loads the plugin object directly, rather than an ESM default wrapper.
  footer: { js: 'module.exports = module.exports.default;' },
});
