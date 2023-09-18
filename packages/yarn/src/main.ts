/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { plugin } from './plugin';

export = {
  name: `plugin-hello-world`,
  factory: () => plugin,
};
