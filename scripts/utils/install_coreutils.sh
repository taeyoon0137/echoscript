#!/bin/bash

# Copyright 2023 Taeyoon Lee. All Right Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Check coreutils (for GNU realpath) installed
if command -v grealpath &>/dev/null; then
    # When grealpath (GNU realpath) already installed
    # Don't do anything
    :
else
    # When grealpath (GNU realpath) not installed    
    echo "GNU realpath (grealpath) is not installed. Installing..."

    # Switch OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if [[ -f /etc/debian_version ]]; then
            # Debian/Ubuntu
            sudo apt update && sudo apt install -y coreutils
        elif [[ -f /etc/redhat-release ]]; then
            # Red Hat/CentOS
            sudo yum install -y coreutils
        else
            echo "Your Linux distribution is not supported by this script. Please install coreutils manually."
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &>/dev/null; then
            brew install coreutils
        else
            echo "Homebrew is not installed. Please install Homebrew and then run 'brew install coreutils'."
            exit 1
        fi
    else
        echo "Your OS is not supported by this script. Please install coreutils manually."
        exit 1
    fi
fi
