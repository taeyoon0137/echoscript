/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### Init keyword
 *
 * Init keyword for start styling
 */
const init = '\u001b[';

/**
 * ### End keyword
 *
 * End keyword for end styling
 */
const end = 'm';

/**
 * Style given text with given array of styles
 *
 * @param text Text to style
 * @param options Style config
 * @returns Styled text value
 */
export function styleConsole(text: string, options: ConsoleStyle | ConsoleStyle[]): string {
  const styler = init + (Array.isArray(options) ? options.join(';') : options) + end;
  const reset = init + ConsoleStyle.Reset + end;

  return styler + text + reset;
}

/**
 * ### ConsoleStyle
 *
 * Enum for each style
 */
export enum ConsoleStyle {
  /**
   * ### Default value
   *
   * Deactivates all options.
   */
  Reset = '0',

  /**
   * ### Bold
   *
   * Displays text in bold.
   */
  Bold = '1',

  /**
   * ### Italic
   *
   * Displays text in italic.
   */
  Italic = '3',

  /**
   * ### Underline
   *
   * Adds an underline to the text.
   */
  Underline = '4',

  /**
   * ### Color - Black
   */
  Black = '30',

  /**
   * ### Color - Red
   */
  Red = '31',

  /**
   * ### Color - Green
   */
  Green = '32',

  /**
   * ### Color - Yellow
   */
  Yellow = '33',

  /**
   * ### Color - Blue
   */
  Blue = '34',

  /**
   * ### Color - Purple
   */
  Purple = '35',

  /**
   * ### Color - Cyan
   */
  Cyan = '36',

  /**
   * ### Color - White
   */
  White = '37',
}
