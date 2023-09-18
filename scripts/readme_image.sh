#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Define Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."

# Define Resource Paths
ASSETS_DIR="$ROOT_DIR/resources/assets"
HERO_DIR="$ASSETS_DIR/img_echoscript_hero.png"
PREVIEW_DIR="$ASSETS_DIR/img_echoscript_preview.png"
STRUCTURE_DIR="$ASSETS_DIR/img_echoscript_structure.png"
README_DIR="$ROOT_DIR/README.md"
BAK_README_DIR="$ROOT_DIR/README.md.bak"

# Import encode_url
source $SCRIPT_DIR/utils/encode_url.sh

# Hero Image
# Encode Hero Image to Base64
ENCODED_HERO=$(base64 < $HERO_DIR)

# Inject Symbol into TEMP README
sed "s|\${hero}|data:image/png;base64,$(encode_url "$ENCODED_HERO")|g" $README_DIR > $BAK_README_DIR

# Override README via TEMP README
mv $BAK_README_DIR $README_DIR

# Remove Backup
rm -f $README_DIR.bak

# Preview Image
# Encode Preview Image to Base64
ENCODED_PREVIEW=$(base64 < $PREVIEW_DIR)

# Inject Symbol into TEMP README
sed "s|\${preview}|data:image/png;base64,$(encode_url "$ENCODED_PREVIEW")|g" $README_DIR > $BAK_README_DIR

# Override README via TEMP README
mv $BAK_README_DIR $README_DIR

# Remove Backup
rm -f $README_DIR.bak

# Structure Image
# Encode Structure Image to Base64
ENCODED_STRUCTURE=$(base64 < $STRUCTURE_DIR)

# Inject Symbol into TEMP README
sed "s|\${structure}|data:image/png;base64,$(encode_url "$ENCODED_STRUCTURE")|g" $README_DIR > $BAK_README_DIR

# Override README via TEMP README
mv $BAK_README_DIR $README_DIR

# Remove Backup
rm -f $README_DIR.bak
