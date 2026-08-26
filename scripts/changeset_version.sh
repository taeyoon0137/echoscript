#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."

cd "$ROOT_DIR"

"$SCRIPT_DIR/utils/install_jq.sh"
yarn changeset version

VERSION=$(jq -er '.version' packages/types/package.json)
PACKAGE_MANIFESTS=(
  packages/core/package.json
  packages/plugin/package.json
  packages/types/package.json
)

for manifest in "${PACKAGE_MANIFESTS[@]}"; do
  manifest_version=$(jq -er '.version' "$manifest")
  if [[ "$manifest_version" != "$VERSION" ]]; then
    echo "Changesets produced inconsistent workspace versions: $manifest has $manifest_version, expected $VERSION." >&2
    exit 1
  fi
done

TEMP_LERNA=$(mktemp "$ROOT_DIR/lerna.json.tmp.XXXXXX")
trap 'rm -f "$TEMP_LERNA"' EXIT
jq --arg version "$VERSION" '.version = $version' lerna.json > "$TEMP_LERNA"
mv "$TEMP_LERNA" lerna.json
trap - EXIT

yarn sync:version
yarn install
yarn readme
