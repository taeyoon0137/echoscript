#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Define Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."

# Define Resource Paths
PACKAGE_JSON_DIR="$ROOT_DIR/package.json"
README_DIR="$ROOT_DIR/README.md"
PRESET_README_DIR="$ROOT_DIR/resource/README.preset.md"
BAK_README_DIR="$ROOT_DIR/README.tmp.md"

# Check is jq installed
$SCRIPT_DIR/utils/install_jq.sh

# Import parse_url
source $SCRIPT_DIR/utils/encode_url.sh

# Get version info from lerna.json
VERSION=$(jq -r '.version' $PACKAGE_JSON_DIR)

# Update version to package.tmp.json
sed "s/\${version}/$(encode_url "$VERSION")/g" $README_DIR > $BAK_README_DIR

# Override README via TEMP README
mv $BAK_README_DIR $README_DIR
