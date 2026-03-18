#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Encode given param for shields.io badge URL
function encode_shields_badge() {
    local input="$1"
    echo "${input//-/--}"
}