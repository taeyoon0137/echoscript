#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Define Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."

# Define Resource Paths
README_DIR="$ROOT_DIR/README.md"
PRESET_README_DIR="$ROOT_DIR/resources/README.preset.md"

# Copy Readme Preset into Readme
cp $PRESET_README_DIR $README_DIR
