/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { echoscript } from '@echoscript/core';

import { loadRc } from '@func';

import type { Plugin, Hooks } from '@yarnpkg/core';

/**
 * ### Plugin
 *
 * Configuration of yarn plugin
 */
export const plugin: Plugin<Hooks> = {
  hooks: {
    wrapScriptExecution: async (executor, project, locator, scriptName, extra) => {
      const config = loadRc(project.cwd);
      const echo = echoscript(config.rootProject, locator.name, scriptName, 0);
      const log = (...msg: string[]) => console.log(echo(msg.join(' ')));
      const err = (...msg: string[]) => console.error(echo(msg.join(' ')));

      // Log start
      log('Starting script...');

      extra.stdout.on('data', captureLog); // Wrap log
      extra.stderr.on('data', captureLog); // Wrap error

      /**
       * Wrap each log
       *
       * @param data Buffer
       */
      function captureLog(data: Buffer): void {
        const message = data.toString().trim();
        log(message);
      }

      /**
       * Log while execute
       *
       * @returns Exit code
       */
      async function execute(): Promise<number> {
        try {
          const exitCode = await executor(); // Execute function
          if (exitCode !== 0) {
            err(`Script exited with code ${exitCode}`); // Log error
          } else {
            log(`Script done`); // Log done
          }
          return exitCode;
        } catch (error) {
          err(`Error occurred. (${error})`); // Log error
          throw error;
        }
      }

      return execute;
    },
  },
};
