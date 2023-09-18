/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import z from 'zod';

/**
 * ### EchoscriptOptions
 *
 * Extra Options for Echoscript
 */
export const EchoscriptOptions = z.object({
  /**
   * ### Max Project Name Length
   *
   * To show depth line in same position, fix max length of project name.
   *
   * @default 30
   */
  projectNameMaxLength: z.number().min(1).optional().default(30),
});

// Type Definition
export type EchoscriptOptions = z.infer<typeof EchoscriptOptions>;
