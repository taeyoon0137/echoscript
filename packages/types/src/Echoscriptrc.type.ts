/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import z from 'zod';

/**
 * ### Echoscriptrc
 *
 * Zod Type Definition of echoscript runtime configuration file(.echoscriptrc).
 */
export const Echoscriptrc = z.object({
  /**
   * ### Root Project Name
   *
   * Name of Root project. Uses on monorepo-project.
   */
  rootProject: z.string().min(1).optional(),

  /**
   * ### Project Name
   *
   * Name of project runs script.
   *
   * @default packageJson.name
   */
  project: z.string().min(1).optional(),

  /**
   * ### Start Log
   *
   * Log when script starts.
   *
   * @default true
   */
  start: z.boolean().optional(),

  /**
   * ### Error Log
   *
   * Log when script returns error.
   *
   * @default true
   */
  error: z.boolean().optional(),

  /**
   * ### Error Detail Log
   *
   * Log detail when error reveals.
   *
   * @default false
   */
  errorDetail: z.boolean().optional(),

  /**
   * ### End Log
   *
   * Log when script ends.
   *
   * @default true
   */
  end: z.boolean().optional(),
});

// Type Definition
export type Echoscriptrc = z.infer<typeof Echoscriptrc>;
