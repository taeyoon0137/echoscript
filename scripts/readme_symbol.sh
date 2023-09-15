#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Define Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."

# Define Resource Paths
SYMBOL_DIR="$ROOT_DIR/resources/assets/img_echoscript_symbol.svg"
README_DIR="$ROOT_DIR/README.md"
BAK_README_DIR="$ROOT_DIR/README.tmp.md"

# Import parse_url
source $SCRIPT_DIR/utils/encode_url.sh

# Encode Symbol to Base64
ENCODED_SYMBOL=$(base64 < $SYMBOL_DIR)

# Inject Symbol into TEMP README
sed "s/\${symbol}/data\:image\/svg\+xml\;base64,$(encode_url "$ENCODED_SYMBOL")/g" $README_DIR > $BAK_README_DIR

# Override README via TEMP README
mv $BAK_README_DIR $README_DIR
