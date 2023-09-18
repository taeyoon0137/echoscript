/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * ### Echoscript Depth
     *
     * Send current script process depth to child process
     */
    ECHO_SCRIPT_DEPTH?: string;
  }
}
