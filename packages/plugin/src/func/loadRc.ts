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
export function loadRc(rootPath: string, require: (module: string) => unknown): Echoscriptrc {
  const fs = require('fs') as typeof import('fs'); // use yarn given require function
  const path = require('path') as typeof import('path'); // use yarn given require function

  const configPath = getConfigPath();

  // When `.echoscriptrc` not exist
  if (configPath === null) {
    return Echoscriptrc.parse({});
  }

  let configJson: unknown;

  try {
    configJson = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch {
    return Echoscriptrc.parse({});
  }

  const configParse = Echoscriptrc.safeParse(configJson);

  // When `.echoscriptrc` format not correct
  if (!configParse.success) {
    return Echoscriptrc.parse({});
  }

  /**
   * Get configure path
   *
   * @returns configure file path
   */
  function getConfigPath(): string | null {
    const cPath = path.resolve(rootPath, '.echoscriptrc');
    if (fs.existsSync(cPath)) return cPath;
    if (fs.existsSync(cPath + '.json')) return cPath + '.json';
    return null;
  }

  return configParse.data;
}
