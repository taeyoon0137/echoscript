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

# 빈 문자열을 변수에 초기화
markdown_table=""
markdown_table+="| Package Name | Version |\n"
markdown_table+="|--------------|---------|\n"

# 현재 디렉토리에서 모든 package.json 파일을 찾아서 name과 version을 추출
# 루트의 package.json은 제외
find . -mindepth 2 -name "package.json" -type f | while read -r file; do
    name=$(jq -r ".name" "$file")
    version=$(jq -r ".version" "$file")

    # 결과를 변수에 마크다운 표 형태로 추가
    markdown_table+="| $name | $version |\n"
done

# README.md 파일의 ${package_list} 부분을 생성한 표로 교체
sed -i.bak "s/\${package_list}/$markdown_table/g" $README_DIR

# 백업 파일 삭제 (macOS와 Linux 모두에서 동작하기 위해 .bak 확장자 사용)
rm -f $README_DIR.bak
