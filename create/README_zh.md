# CLI Unbuild Template

这是一个由 TypeScript 作为默认开发语言, 由 [unbuild](https://github.com/unjs/unbuild) 作为打包构建工具的 CLI 应用程序项目模板，方便您快速的搭建一个 CLI 应用程序项目.

[English](https://github.com/hacxy/cli-template/blob/main/README.md) | 简体中文

- [x] Eslint 格式化, 无需 Prettier
- [x] Git 提交信息校验, 参考规范: [commit convention](./.github/COMMIT_CONVENTION.md)
- [x] 一键发布npm, 自动创建github release
- [x] vitest单元测试
- [x] vscode debug

## 先决条件

需要 Node.js 版本 18+、20+

## 使用模板

### 将模板创建至本地

- 您可以使用 [create-ts-frame](https://github.com/hacxy/create-ts-frame) 快速的将项目创建至您的本地

执行创建命令时可以通过选项指定项目名称和模板名称

```sh
# npm 7+, 需要额外的双破折号:
npm create ts-frame@latest my-cli-app -- --template cli-unbuild

# yarn
yarn create ts-frame my-cli-app --template cli-unbuild

# pnpm
pnpm create ts-frame my-cli-app --template cli-unbuild

# Bun
bun create ts-frame my-cli-app --template cli-unbuild
```

### 安装依赖

```sh
cd my-cli-project
npm install
```

### 开发

默认情况下, 当您执行 `npm run dev` 时, 将使用 [unbuild](https://github.com/unjs/unbuild) 对 `dist` 文件夹进行存根, 您可以前往[jiti](https://github.com/unjs/jiti)了解这个模式，之后即使您修改了代码, 也无需再执行 `dev` 命令, 或者使用其他构建工具的 `watch` 模式来对 `ts` 代码重新编译。当您需要修改 `unbuild` 配置时, 您可以在 `build.config.ts` 文件中对 `unbuild` 做[其他配置](https://github.com/unjs/unbuild/blob/main/src/types.ts)。

- 开发模式

```sh
npm run dev
```

- 构建生产环境代码

```sh
npm run build
```

- 输出包含 sourcemap 的构建产物至 out 文件夹中

```sh
npm run build:out
```

- 类型检查。

```sh
npm run typecheck
```

## 调试程序运行

由于我使用 `vscode` 来开发 CLI 应用程序, 所以提供了其对应的 debug 配置文件: `.vscode/launch.json`, 当您需要调试这个项目时, 首先添加断点, 之后可以按 `F5` 键来启动 Debugger 模式, 当您的 CLI 应用程序执行结束时, Debugger 模式会自动退出.

> [!TIP]
> 运行 Debugger 模式时会将用于 debug 的构建产物输出至 `out` 目录下, 之后应用程序将自动运行.

### 全局链接包:

您还可以为这个包建立一个全局链接, 方便您使用真实环境来测试或者调试代码:

```sh
npm link
```

之后您就可以在您的操作系统的所有终端下任意路径下去执行命令: `hello-cli`, 这个命令对应的是该项目下的 `package.json` 文件中 `bin` 选项的值.

当您不再需要这个全局链接时, 您可以手动移除它, 在项目下执行:

```sh
npm unlink -g
```

### 依赖性说明

当您的第三方库以开发时依赖 (DevDependencies) 进行安装时, 执行`npm run build` 会将这些依赖打包进生产环境代码中, 如果您使用此方式安装并构建完成后, 发现程序工作异常, 则应该尝试将其作为生产环境依赖 (Dependencies) 进行安装, 当作为生产环境依赖进行安装时, 它们不会被打包进生产环境代码中.
