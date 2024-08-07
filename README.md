<!--
  Copyright 2023 Taeyoon Lee. All Right Reserved.

  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree.
-->

<!--
  This file is automatically generated based on resources/README.preset.md.
  Any direct modifications to this file will be lost.
  If changes are needed, please modify the resource/README.preset.md file.
-->

<!-- Hero Image -->
<p align="center">
  <a href="https://github.com/taeyoon0137/echoscript.git">
    <img src="./resources/assets/img_echoscript_hero.png" alt="Echoscript Title Image" style=" width: calc(100% + 16px); margin-left: -8px; margin-right: -8px; overflow: hidden; object-fit: cover; " />
  </a>
</p>

<!-- Title -->
<h1 align="center">>Echoscript</h1>
<p align="center">Echo for every script. For safety.</p>

<!-- Package Version -->
<p align="center">
  <a href="https://github.com/taeyoon0137/echoscript.git">
    <img src="https://img.shields.io/badge/0.3.0-%23101010?&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjM2NiIgdmlld0JveD0iMCAwIDUxMiAzNjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00ODggMzQxLjY3VjI4Ny43MzRIMzUwLjQwOVYyMDYuMDZINDc5Ljg1NVYxNTYuMDg3SDM1MC40MDlWNzcuOTM1N0g0ODhWMjRIMjg3LjY2OFYzNDEuNjdINDg4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI0IDQ2LjU0MjlWMTE1LjIyOEwxNjQuMjMzIDE4MC4xNzFWMTg0LjU3NEwyNCAyNDkuNTE3VjMxNy45ODJMMjI5LjE3NiAyMDkuMDFWMTU1LjczNUwyNCA0Ni41NDI5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==&logoColor=%23FFFFFF&label=echoscript&labelColor=%231C1E9C" />
  </a>
</p>

<p align="center">
  <!-- Built with -->
  <a href="https://yarnpkg.com/getting-started/migration">
    <img src="https://img.shields.io/badge/yarn-%232C8EBB?&logo=yarn&logoColor=%23FFFFFF" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-%233178C6?&logo=typescript&logoColor=%23FFFFFF" />
  </a>
  <a href="https://eslint.org/">
    <img src="https://img.shields.io/badge/eslint-%234B32C3?&logo=eslint&logoColor=%23FFFFFF" />
  </a>
  <a href="https://github.com/lerna-lite/lerna-lite">
    <img src="https://img.shields.io/badge/lerna-%239333EA?&logo=lerna&logoColor=%23FFFFFF" />
  </a>
  <br/>
  <!-- Working Workspaces or IDE -->
  <a href="https://code.visualstudio.com/">
    <img src="https://img.shields.io/badge/visual%20studio%20code-%23007ACC?&logo=visual%20studio%20code&logoColor=%23FFFFFF" />
  </a>
</p>

- [🔥 Getting Started](#-getting-started)
- [⚙️ Configuration](#️-configuration)
  - [`.echoscriptrc`](#echoscriptrc)
- [📦 Packages](#-packages)

## 🔥 Getting Started

Echoscript is a yarn plugin that logs each time an npm script runs, allowing users to clearly discern how far it has executed or where an error might have occurred.

You can install this plugin using the following command:

```shell
yarn plugin import https://raw.githubusercontent.com/taeyoon0137/echoscript/main/packages/plugin/plugin/bundle.js
```

After installing the plugin, if you run any command via script, you'll be able to see an echo as demonstrated below!

![Echoscript Preview](./resources/assets/img_echoscript_preview.png)

## ⚙️ Configuration

![Echoscript Structure](./resources/assets/img_echoscript_structure.png)

The structure of Echoscript is divided into Root Project, Project, Script, Subscript, and Message.

Initially, the Root Project is provided with the string `"🔈"`, but it can be modified through the `.echoscriptrc` file. The Project displays the `"name"` value of the package where the script runs, while Script and Subscript show the name of the executing script. If the Script contains a `":"`, it's recognized and differentiated as a Subscript based on this.

Messages typically occur when a script starts or finishes execution. However, more instances are planned to be added in the future.

### `.echoscriptrc`

Echoscript allows you to configure the plugin through a JSON-formatted `.echoscriptrc` file located in the project's root path.

For easy configuration, a predefined JSON schema can be used as follows:

```json
{
  "$schema": "https://raw.githubusercontent.com/taeyoon0137/echoscript/main/packages/types/schema/echoscriptrc.schema.json"
}
```

## 📦 Packages

> Current recent version is `0.3.0`

| Package Name                                 | Descripton                      | Version |
| :------------------------------------------- | :------------------------------ | :-----: |
| [@echoscript/types](./packages/types)        | Type definition for Echoscript. | `0.3.0` |
| [@echoscript/core](./packages/core)          | Core logic of Echoscript.       | `0.3.0` |
| [@echoscript/yarn-plugin](./packages/plugin) | Run echoscript via yarn plugin. | `0.3.0` |
