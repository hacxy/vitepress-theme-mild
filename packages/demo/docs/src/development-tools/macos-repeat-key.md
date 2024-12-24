---
description: 分享下我的个人 MacOS 前端开发环境搭建
category: 开发工具
tag:
  - MacOS
  - VSCode
  - Vim
top: 1
sticky: 1
---

# MacOS 搭建开发环境

## 网络环境

- 第一步我首先会解决代理问题, `ClashX` 是我必不可少的代理工具, 这里也提供一个地址方便下载: <https://wwi.lanzoup.com/iAwXx1qmeprg>

- 第二步下载完之后直接拖到 Applications 文件夹下即可

- 第三步选择使用这个免费的节点: <https://bulink.xyz/>, 速度慢一些但聊胜于无, 有条件可以选择付费的节点, 速度会快很多也相对稳定, 直接在 Google 搜索 Clash 节点就行

> 之后我们访问 Github 就畅通无阻了

## 安装第三方终端模拟器 Kitty (可选)

我比较喜欢使用 `Kitty` 作为我的终端模拟器, 通常在大项目中使用 Vscode 比较卡, 所以有时候我会直接使用终端写代码, 也有人选择使用 `Iterm2`, 这个就全凭个人喜好来了

开启代理后下载就很简单了, 直接前往: <https://github.com/kovidgoyal/kitty/releases> 找到 `macOS dmg`, 点击下载之后然后安装即可

## 下载字体

字体我会选择用 Nerd Font 的, 我个人比较喜欢 Hack Nerd 这个字体, 下载地址: <https://www.nerdfonts.com/font-downloads> , 下载完之后双击解压, 然后选择所有字体使用字体册打开即可进行安装

## 安装 HomeBrew:

HomeBrew 是 MacOS 上的一个非常好用的第三方包管理器, 后面安装 `git` 等工具都可以使用这个:

- 一键安装脚本

```sh
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
```

关于 brew 的其他相关内容可以查阅这个网站: <https://brew.idayer.com/>, 里面有非常全面的使用介绍

## 安装 git

这里我们安装 git 就非常简单了, 直接执行:

```sh
brew install git
```

因为我们安装 brew 的脚本会自动帮我们选择国内源, 所以安装速度一般不会很慢

如果安装较慢,我们可以在终端开启代理, 使用 clashX 的复制终端代理命令, 一键复制脚本然后在终端回车即可, 当然也可以复制我这个:

```sh
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

## 配置 git

- 设置用户名

```sh
git config --global user.name "test"
```

- 设置邮箱

```sh
git config --global user.email "test@qq.com"
```

- 生成 ssh 密钥对

```sh
ssh-keygen -t rsa -C "这里换上你的邮箱"
```

执行过程一直回车，执行结束后将在~/.ssh/目录中生成以下文件，其中 id_rsa 为私钥，id_rsa.pub 为公钥

- 设置默认分支名:

```sh
git config --global init.defaultBranch main
```

## 配置 Kitty(可选)

每个人喜好不同, 所以你可以参考 [官方文档](https://sw.kovidgoyal.net/kitty/overview/#configuring-kitty) 来配置自己的 kitty.

另外我也分享下我自己的配置: <https://github.com/hacxy/kitty>

直接使用 git clone 到`~/.config`目录下即可:

```sh
git clone https://github.com/hacxy/kitty.git ~/.config
```

如果目录已存在就直接删掉原来的即可:

```sh
rm -rf ~/.config/kitty
```

## 安装 oh-my-zsh(可选)

个人还是比较喜欢使用 `zsh` 的, 所以干脆装下 `oh-my-zsh`, 安装时记得确保终端开启了代理

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 安装 nvm

nvm 是 nodejs 的版本管理和切换工具, 也是我个人一直在使用的

两种安装方式, 一种是使用 brew 安装一种是直接用官方给出的脚本安装, 两种都可以, 这里我就使用脚本安装了

- brew:

```sh
brew install nvm
```

- 脚本安装

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

安装完之后重启下终端, 然后执行命令测试下有没有安装成功:

```sh
nvm --version
0.39.7
```

打印出版本号则说明没有问题

## 安装 nodejs 环境

以下安装命令按需选择:

- 安装当前的最新长期支持版:

```sh
nvm install --lts
```

- 安装指定版本:

```sh
nvm install 18
```

- 设置某个版本为默认启动版本:

```sh
nvm alias default 18
```

:::tip
nvm 的每个版本环境都是都是隔离, 所以你在 18 这个版本使用 `npm install -g` 全局安装的包, 在其他版本是不可以使用的,这点需要注意
:::

## 安装 vscode

vscode 安装就没什么好说了, 但注意区分 intel 和 apple 芯片这两个版本, 安装对应的版本即可, 下载地址: <https://code.visualstudio.com/Download>

## vscode 配置分享

> 待补充

## vscode 插件分享

> 待补充
