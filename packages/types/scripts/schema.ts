/**
 * Copyright 2023 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import z from 'zod';
import prettier from 'prettier';

import { zodToJsonSchema } from 'zod-to-json-schema';

import { Echoscriptrc } from '../src';

import type { ZodType } from 'zod';

/**
 * ### Schema Creation Path
 *
 * The path where the schema will be created.
 */
const SCHEMA_DIR = path.resolve(__dirname, '../schema');

/**
 * ### Schema Name
 *
 * The name to be used when creating the schema.
 */
const SCHEMA_NAME = 'echoscriptrc';

/**
 * ### Schema Path
 *
 * The path where the schema will be located.
 */
const SCHEMA_PATH = path.resolve(SCHEMA_DIR, SCHEMA_NAME + '.schema.json');

/**
 * Converts a given ZodType to JSON Schema and saves it.
 */
function main(): void {
  const presetSchema = getSchemaPreset(Echoscriptrc);
  const schema = zodToJsonSchema(presetSchema, SCHEMA_NAME);
  saveSchema(schema);
}

/**
 * Adds basic properties to a given ZodType so that it can be used to create a schema.
 *
 * @param zodType The ZodType to be used for creation
 * @returns zodType with added preset properties
 */
function getSchemaPreset(zodType: ZodType): ZodType {
  return zodType.and(
    z.object({
      /**
       * ### Schema Path
       *
       * Specifies the path for this schema.
       */
      $schema: z.string(),
    })
  );
}

/**
 * Converts a given schema object into a string and saves it.
 *
 * @param schema The schema object
 */
async function saveSchema(schema: ReturnType<typeof zodToJsonSchema>): Promise<void> {
  const stringified = await prettier.format(JSON.stringify(schema), { parser: 'json-stringify' });
  fs.writeFileSync(SCHEMA_PATH, stringified, 'utf-8');
}

main();
