/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

/**
 * Configure Typescript Options
 *
 * @type { import('@rollup/plugin-typescript').RollupOptions }
 */
const typescriptOption = {
  declaration: false,
  removeComments: true,
};

/**
 * Configure Rollup Options
 *
 * @type { import('rollup').RollupOptions }
 */
const options = {
  input: 'src/main.ts',
  output: {
    name: 'echoscript',
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [typescript(typescriptOption), resolve(), commonjs(), terser()],
};

export default options;
