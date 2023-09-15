#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Define Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."

# Define Resource Paths
LERNA_DIR="$ROOT_DIR/lerna.json"
PACKAGE_JSON_DIR="$ROOT_DIR/package.json"
TEMP_PACKAGE_JSON_DIR="$ROOT_DIR/package.tmp.json"

# Check is jq installed
$SCRIPT_DIR/utils/install_jq.sh

# Get version info from lerna.json
LERNA_VERSION=$(jq -r '.version' $LERNA_DIR)

# Update version to package.tmp.json
jq ".version = \"$LERNA_VERSION\"" $PACKAGE_JSON_DIR > $TEMP_PACKAGE_JSON_DIR

# Override package.json via temp package.json
mv $TEMP_PACKAGE_JSON_DIR $PACKAGE_JSON_DIR
