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
export const plugin: (require: Function) => Plugin<Hooks> = (require) => ({
  hooks: {
    wrapScriptExecution: async (executor, project, locator, scriptName, _extra) => {
      const config = loadRc(project.cwd, require);
      const echo = echoscript(config.rootProject, getPackageName(), scriptName);
      const log = (bracket: string, ...msg: string[]) => console.log(echo(bracket, msg.join(' ')));
      const err = (bracket: string, ...msg: string[]) => console.error(echo(bracket, msg.join(' ')));

      // Log start
      log('┌', 'Starting script...');

      /**
       * Get package name with scope
       *
       * @returns Package name
       */
      function getPackageName(): string {
        if (locator.scope !== null) {
          return `@${locator.scope}/${locator.name}`;
        }

        return locator.name;
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
            err('└', `Script exited with code ${exitCode}`); // Log error
          } else {
            log('└', `Script done`); // Log done
          }
          return exitCode;
        } catch (error) {
          err('└', `Error occurred. (${error})`); // Log error
          throw error;
        }
      }

      return execute;
    },
  },
});
