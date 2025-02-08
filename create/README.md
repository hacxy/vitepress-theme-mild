# CLI Unbuild Template

This is a CLI application project template with TypeScript as the main development language and [unbuild](https://github.com/unjs/unbuild) as the packaging and building tool. It allows you to quickly set up a CLI application project without the need for `watch` and `build`. You do not need to use any other build tools to monitor the `ts` code construction.

English | [简体中文](https://github.com/hacxy/cli-template/blob/main/README_zh.md)

## Prerequisites

requires Node.js version 18+, 20+

## Using Templates

### Create Template Locally

- You can quickly create a project locally using [create-ts-frame](https://github.com/hacxy/create-ts-frame)

When executing the creation command, you can specify the project name and template name through options.

```sh
# npm 7+, extra double-dash is needed:
npm create ts-frame@latest my-cli-app -- --template cli-unbuild

# yarn
yarn create ts-frame my-cli-app --template cli-unbuild

# pnpm
pnpm create ts-frame my-cli-app --template cli-unbuild

# Bun
bun create ts-frame my-cli-app --template cli-unbuild
```

## Install dependencies.

```sh
cd my-cli-project
npm install
```

### Development

By default, when you run `npm run dev`, [unbuild](https://github.com/unjs/unbuild) will be used to stub the `dist` folder. You can learn about this mode at [jiti](https://github.com/unjs/jiti). Even if you modify the code, there is no need to execute the `dev` command again or use other build tools' `watch` mode to recompile the `ts` code. When you need to modify the configuration of `unbuild`, you can do other configurations for it in the file named `build.config.ts`.

- Development Mode

```sh
npm run dev
```

- Build Production Environment Code

```sh
npm run build
```

- Output Build Artifacts with Sourcemap to Out Folder

```sh
npm run build:out
```

- Type Check.

```sh
npm run typecheck
```

## Debugging Program Execution

As I use VSCode to develop CLI applications, a corresponding debug configuration file `.vscode/launch.json` is provided. When you need to debug this project, first add breakpoints and then press F5 key to start Debugger mode. The Debugger mode will automatically exit when your CLI application finishes executing.

> [!TIP]

> When running in Debugger mode, artifacts used for debugging are outputted under directory 'out'. After that, your application will automatically start running.

### Global Link Package:

You can also create a global link for this package so that it's easier for you test or debug code using real environment:

```sh
npm link
```

Afterwards, you can execute command "hello-cli" at any path under all terminals of your operating system which corresponds with value of option "bin" in file "package.json" under this project.

When you no longer need this global link anymore, manually remove it by executing below command under project directory:

```sh
npm unlink -g
```

### Dependency Description

When your third-party library is installed as DevDependencies during development , these dependencies will be packaged into production environment codes after executing ' npm run build '. If program works abnormally after installing via such way and building completed afterwards , try installing them as production environment dependencies(Dependencies). They won't be packaged into production environment codes when installed as production environment dependencies.
