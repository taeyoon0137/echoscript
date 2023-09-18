/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EchoscriptOptions } from '@echoscript/types';

import { styleConsole, ConsoleStyle } from './styleConsole';

/**
 * Generate function which generates script with message
 *
 * @param root Root package name
 * @param pkg Package name
 * @param script Script name
 * @param options Echoscript options
 * @returns Function which generates script with message
 */
export function echoscript(
  root: string | undefined = 'ECHO',
  pkg: string,
  script: string,
  options: EchoscriptOptions = {
    projectNameMaxLength: 30,
  }
): (bracket: string, msg: string) => string {
  return (bracket, msg) => {
    const arrow = styleConsole('→', ConsoleStyle.Black);
    const rootName = styleConsole(`[${root}]`, [ConsoleStyle.Blue, ConsoleStyle.Bold]);
    const packageName = getPackageName();
    const depth = styleConsole(bracket, ConsoleStyle.Cyan);
    const scriptName = getScriptName();
    const colon = styleConsole(':', ConsoleStyle.Black);

    /**
     * Get package name with styling
     *
     * @returns Package name with styling
     */
    function getPackageName(): string {
      const [firstName, ...elseNames] = pkg.split('/');
      const first = styleConsole(firstName ?? '', [ConsoleStyle.Bold]);
      const elses = elseNames.join('/');
      const fill = styleConsole(
        Array((EchoscriptOptions.parse(options)?.projectNameMaxLength ?? 30) - pkg.length)
          .fill('·')
          .join(''),
        ConsoleStyle.Black
      );

      return first + (elses ? styleConsole(`/${elses}`, [ConsoleStyle.Blue, ConsoleStyle.Bold]) : '') + fill;
    }

    /**
     * Get script name with styling
     *
     * @returns Script name with styling
     */
    function getScriptName(): string {
      const [firstName, ...elseNames] = script.split(':');
      const elseName = elseNames.join(':');
      return firstName + (elseName ? styleConsole(`:${elseName}`, ConsoleStyle.Purple) : '');
    }

    return `${arrow} ${rootName} ${packageName} ${depth} ${scriptName}${colon} ${msg}`;
  };
}
