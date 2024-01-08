/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { echoscript, styleConsole, ConsoleStyle } from '@echoscript/core';

import { loadRc } from '@func';

import type { Plugin, Hooks } from '@yarnpkg/core';

/**
 * ### Plugin
 *
 * Configuration of yarn plugin
 */
export const plugin: (require: Function) => Plugin<Hooks> = (require) => ({
  hooks: {
    wrapScriptExecution: async (executor, proj, locator, scriptName, extra) => {
      const currentDepth = parseInt(extra.env['ECHO_SCRIPT_DEPTH'] ?? '0');
      extra.env['ECHO_SCRIPT_DEPTH'] = (currentDepth + 1).toString();

      const { rootProject, project, start, end, error, ...configs } = loadRc(proj.cwd, require);
      const echo = echoscript(rootProject, project ?? getPackageName(), scriptName, configs);
      const log = (bracket: string, ...msg: string[]) => console.log(echo(getDepth(bracket), msg.join(' ')));
      const err = (bracket: string, ...msg: string[]) => console.error(echo(getDepth(bracket), msg.join(' ')));

      // Log start
      log('┌', start);

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
       * Get depth line
       *
       * @param start start line
       * @returns Depth line
       */
      function getDepth(start: string): string {
        const arr = Array(currentDepth).fill('│');
        arr.push(start);
        return arr.join(' ');
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
            err('└', styleConsole(`Script exited with code ${exitCode}`, ConsoleStyle.Red)); // Log error
          } else {
            log('└', styleConsole(end, ConsoleStyle.Black)); // Log done
          }
          return exitCode;
        } catch (error) {
          err('└', styleConsole(`${error} (${error})`, ConsoleStyle.Red)); // Log error
          throw error;
        }
      }

      return execute;
    },
  },
});
