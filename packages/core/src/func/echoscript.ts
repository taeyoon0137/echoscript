/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { styleConsole, ConsoleStyle } from './styleConsole';

/**
 * Generate function which generates script with message
 *
 * @param root Root package name
 * @param pkg Package name
 * @param script Script name
 * @param depth Running depth of script
 * @returns Function which generates script with message
 */
export function echoscript(
  root: string | undefined = 'ECHO',
  pkg: string,
  script: string
): (bracket: string, msg: string) => string {
  return (bracket, msg) => {
    const arrow = styleConsole('→', ConsoleStyle.Black);
    const rootName = styleConsole(`[${root}]`, [ConsoleStyle.Blue, ConsoleStyle.Bold]);
    const packageName = getPackageName();
    const depth = styleConsole(bracket, ConsoleStyle.Cyan);
    const scriptName = getScriptName();
    const colon = styleConsole(':', ConsoleStyle.Black);

    function getPackageName(): string {
      const [firstName, ...elseNames] = pkg.split('/');
      const elseName = elseNames.join('/');
      return (
        styleConsole(firstName ?? '', [ConsoleStyle.Bold]) +
        (elseName ? styleConsole(`/${elseName}`, [ConsoleStyle.Blue, ConsoleStyle.Bold]) : '')
      );
    }

    function getScriptName(): string {
      const [firstName, ...elseNames] = script.split(':');
      const elseName = elseNames.join(':');
      return firstName + (elseName ? styleConsole(`:${elseName}`, ConsoleStyle.Purple) : '');
    }

    return `${arrow} ${rootName} ${packageName} ${depth} ${scriptName}${colon} ${msg}`;
  };
}
