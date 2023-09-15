#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Echode given param to URL
function encode_url() {
    local input="$1"
    echo "${input//-/--}"
}