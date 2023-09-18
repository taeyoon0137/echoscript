/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Echoscriptrc } from '@echoscript/types';

/**
 * load `.echoscriptrc` from given root path.
 * Root path will given throw yarn config.
 *
 * @param rootPath Path to the project root
 * @returns Custom echoscript config
 */
export function loadRc(rootPath: string, require: Function): Echoscriptrc {
  const fs = require('fs');
  const path = require('path');
  const configPath = path.resolve(rootPath, '.echoscriptrc');

  // When `.echoscriptrc` not exist
  if (!fs.existsSync(configPath)) {
    return {};
  }

  const configJson = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const configParse = Echoscriptrc.safeParse(configJson);

  // When `.echoscriptrc` format not correct
  if (!configParse.success) {
    return {};
  }

  return configParse.data;
}
