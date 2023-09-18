/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
  script: string,
  depth: number = 0
): (msg: string) => string {
  return (msg) => `→ [${root}] ${pkg} ${depth} ${script}: ${msg}`;
}
