/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import z from 'zod';

import { EchoscriptOptions } from './EchoscriptOptions.type';

/**
 * ### Echoscriptrc
 *
 * Zod Type Definition of echoscript runtime configuration file(.echoscriptrc).
 */
export const Echoscriptrc = EchoscriptOptions.extend({
  /**
   * ### Root Project Name
   *
   * Name of Root project. Uses on monorepo-project.
   *
   * @default "🔈"
   */
  rootProject: z.string().min(1).optional().default('🔈'),

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
   * Log text when script starts.
   *
   * @default "Starting script...🔥"
   */
  start: z.string().min(1).optional().default('Starting script...🔥'),

  /**
   * ### Error Log
   *
   * Log text when script returns error.
   *
   * @default "Error occurred ❌"
   */
  error: z.string().min(1).optional().default('Error occurred ❌'),

  /**
   * ### End Log
   *
   * Log text when script ends.
   *
   * @default "Script done ✅"
   */
  end: z.string().min(1).optional().default('Script done ✅'),
});

// Type Definition
export type Echoscriptrc = z.infer<typeof Echoscriptrc>;
