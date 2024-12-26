---
date: 2024-01-21
tags:
- linux
---

# frp 内网穿透

## 准备工作

- 具有公网 ip 且可访问的服务器一台
- 内网机器一台, 操作系统最好是: linux (centos | ubuntu)

## 下载

分别在服务器和内网机器上下载对应版本的 `frp`

```sh
wget https://github.com/fatedier/frp/releases/download/v0.53.2/frp_0.53.2_linux_amd64.tar.gz
```

其他版本可查阅: [frp release](https://github.com/fatedier/frp/releases)

下载完成后将 tar 压缩包解压:

```sh
tar -zxvf frp_0.53.2_linux_amd64.tar.gz
```

我们只需要关注如下几个文件:

- frps
- frps.toml
- frpc
- frpc.toml

## 配置 SSH 访问内网机器

### 配置服务端

配置服务端我们需要在公网 ip 可访问的服务器中配置

可以删除掉 `frpc` 和 `frpc.toml`

```sh
rm frpc
rm frpc.toml
```

接着修改 `frps.toml`

```sh
vim frps.toml
```

```toml
bingPort = 7000
```

### 配置客户端

配置客户端我们需要在内网机器上进行配置

客户端中可以删掉 `frps` 和 `frps.toml`

修改 `frpc.toml`

```sh
vim frpc.toml
```

```toml
serverAddr = "xx.xx.xx.xx" # 连接服务端公网ip地址
serverPort = 7000 # 连接frp 服务端的端口

[[proxies]]
name = "ssh" # 内网通道名称
type = "tcp"
localIP = "127.0.0.1" # 公网访问的内网服务的地址
localPort = 22 # 公网访问的内网服务的端口
remotePort = 6000 # 在 frp 服务端监听的端口，访问此端口的流量将被转发到本地服务的相应端口
```

:::tip
服务端需要在防火墙放开 6000 和 7000 端口
:::

## 使用 systemd

### 1. 安装 systemd

如果您的 Linux 服务器上尚未安装 systemd，可以使用包管理器如 yum（适用于 CentOS/RHEL）或 apt（适用于 Debian/Ubuntu）来安装它：

```sh
# 使用 yum 安装 systemd（CentOS/RHEL）
yum install systemd

# 使用 apt 安装 systemd（Debian/Ubuntu）
apt install systemd
```

### 2. 创建 frps.service 文件

使用文本编辑器 (如 vim) 在 /etc/systemd/system 目录下创建一个 frps.service 文件，用于配置 frps 服务。

```sh
sudo vim /etc/systemd/system/frps.service
```

::: tip
客户端为: `sudo vim /etc/systemd/system/frpc.service`
:::
服务端写入以下内容:

```
[unit]
# 服务名称，可自定义
description = frp server
after = network.target syslog.target
wants = network.target

[service]
type = simple
# 启动frps的命令，需修改为您的frps的安装路径
execstart = /path/to/frps -c /path/to/frps.toml

[install]
wantedby = multi-user.target
```

:::tip
客户端只需将 ExecStart 修改为: `/path/to/frpc -c /path/to/frpc.toml`
:::
客户端写入以下内容:

```

[unit]
# 服务名称，可自定义
description = frp server
after = network.target syslog.target
wants = network.target

[service]
type = simple
# 启动frpc的命令，需修改为您的frpc的安装路径
execstart = /path/to/frpc -c /path/to/frpc.toml
#如果检测到失败30秒后重新加载
Restart=on-failure
RestartSec=30s

[install]
wantedby = multi-user.target
```

### 3. 使用 systemd 命令管理 frps 服务

```sh
# 启动frp
sudo systemctl start frps
# 停止frp
sudo systemctl stop frps
# 重启frp
sudo systemctl restart frps
# 查看frp状态
sudo systemctl status frps
# 设置 frps 开机自启动
sudo systemctl enable frps
```

:::tip
客户端同上, 示例: `sudo systemctl start frpc`
:::
