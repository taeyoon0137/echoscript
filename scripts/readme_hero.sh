#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Define Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."

# Define Resource Paths
HERO_DIR="$ROOT_DIR/resources/assets/img_echoscript_hero.png"
README_DIR="$ROOT_DIR/README.md"
BAK_README_DIR="$ROOT_DIR/README.md.bak"

# Import encode_url
source $SCRIPT_DIR/utils/encode_url.sh

# Encode Hero Image to Base64
ENCODED_HERO=$(base64 < $HERO_DIR)

# Inject Symbol into TEMP README
sed "s|\${hero}|data:image/png;base64,$(encode_url "$ENCODED_HERO")|g" $README_DIR > $BAK_README_DIR

# Override README via TEMP README
mv $BAK_README_DIR $README_DIR

# Remove Backup
rm -f $README_DIR.bak