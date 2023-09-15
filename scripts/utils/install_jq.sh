#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Check jq installed
if command -v jq &>/dev/null; then
    # When jq already installed
    # Don't do anything
    :
else
    # When jq not installed    
    echo "jq is not installed. Installing..."
    
    # Switch OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if [[ -f /etc/debian_version ]]; then
            # Debian/Ubuntu
            sudo apt update && sudo apt install -y jq
        elif [[ -f /etc/redhat-release ]]; then
            # Red Hat/CentOS
            sudo yum install -y jq
        else
            echo "Your Linux distribution is not supported by this script. Please install jq manually."
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &>/dev/null; then
            brew install jq
        else
            echo "Homebrew is not installed. Please install Homebrew and then run 'brew install jq'."
            exit 1
        fi
    else
        echo "Your OS is not supported by this script. Please install jq manually."
        exit 1
    fi
fi
