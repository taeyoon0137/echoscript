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
BAK_README_DIR="$ROOT_DIR/README.md.bak"
PACKAGES_DIR="$ROOT_DIR/packages"


# Initialize Table Start
markdown_table=""
markdown_table+="| Package Name | Descripton | Version |\n"
markdown_table+="|:-------------|:-----------|:-------:|\n"

# Set find command depends on OS
FIND_COMMAND="find"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Check is findutils installed
    $SCRIPT_DIR/utils/install_findutils.sh

    # Set command as gfind
    if command -v gfind &>/dev/null; then
        FIND_COMMAND="gfind"
    fi
fi

# Set realpath command depends on OS
REALPATH_COMMAND="realpath"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Check is coreutils installed
    $SCRIPT_DIR/utils/install_coreutils.sh

    if command -v grealpath &>/dev/null; then
        REALPATH_COMMAND="grealpath"
    fi
fi

# Extract name and version from each package.json
# Except root package.json
while read -r file; do
    name=$(jq -r ".name" "$file")
    version=$(jq -r ".version" "$file")
    description=$(jq -r ".description" "$file")
    temp_path=$($REALPATH_COMMAND --relative-to="$README_DIR" "$file")
    file_path=$(echo "$temp_path" | sed -e 's/.././' -e 's/\/package.json//')
    markdown_table+="| [$name]($file_path) | $description | \`$version\` |\n"
done < <($FIND_COMMAND $PACKAGES_DIR -mindepth 2 -name "package.json" -type f)

# Replace ${package_list} to generated table from README.md
sed -i.bak "s#\${package_list}#$markdown_table#g" $README_DIR

# Remove Backup
rm -f $README_DIR.bak
