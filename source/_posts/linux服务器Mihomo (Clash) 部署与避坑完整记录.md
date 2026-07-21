---
title: "Linux 服务器 Mihomo (Clash) 部署与避坑完整记录"
date: 2026-05-16 23:50:06
updated: 2026-05-16 23:50:06
categories:
  - ["工具与折腾", "效率工具"]
tags:
  - "linux"
  - "服务器"
  - "网络"
description: "在连接服务器之前，先在你的 Windows 电脑桌面上新建一个文件夹（例如叫 mihomofiles），准备好以下 5 个文件："
cover: ""
---
#  Linux 服务器 Mihomo (Clash) 部署与避坑完整记录

### 🛠️ 准备工作：在 Windows 本地凑齐“召唤神龙”的 5 个文件

在连接服务器之前，先在你的 Windows 电脑桌面上新建一个文件夹（例如叫 `mihomo_files`），准备好以下 5 个文件：

1. **核心程序 (`mihomo`)**：
   - 下载 `mihomo-linux-amd64-vX.X.X.gz`（选 amd64 纯净版）。
   - 解压出里面的文件，重命名为 **`mihomo`**（去掉多余的后缀）。
2. **纯正配置文件 (`config.yaml`)**：
   - 打开 Windows 本地的 **Clash Verge**，更新订阅。
   - 右键节点卡片 -> **在资源管理器中显示**，将弹出的 `.yaml` 文件复制出来，重命名为 **`config.yaml`**。
   - **⚠️ 避坑必须做：** 用记事本打开该文件，按 `Ctrl + H`，将里面所有的非标准协议名 **`anytls`** 替换为标准协议名 **`trojan`**，然后保存关闭。
3. **三大 Geo 数据库文件**（防服务器拉取失败变成 0KB）：
   - 通过浏览器直接下载以下三个文件：
     - [Country.mmdb](https://www.google.com/search?q=https://cdn.jsdelivr.net/gh/Dreamacro/maxmind-geoip%40release/Country.mmdb&authuser=2)
     - [geosite.dat](https://www.google.com/search?q=https://cdn.jsdelivr.net/gh/v2fly/domain-list-community%40release/dlc.dat&authuser=2) *(下载后若名为 dlc.dat，重命名为 geosite.dat)*
     - [geoip.dat](https://www.google.com/search?q=https://cdn.jsdelivr.net/gh/v2fly/geoip%40release/geoip.dat&authuser=2)

------

### 🚀 正式部署：三步走战略

#### 第一步：建立目录并赋予权限 (FinalShell)

登录服务器，创建工作目录并放入内核文件：

Bash

```
# 1. 创建配置存放目录
sudo mkdir -p /etc/mihomo

# 2. (通过 WinSCP 把刚才准备好的 mihomo 二进制文件，拖入服务器的 /usr/local/bin/ 目录)

# 3. 赋予执行权限
sudo chmod +x /usr/local/bin/mihomo
```

#### 第二步：上传配置文件与数据库 (WinSCP)

打开 WinSCP，进入服务器的 **`/etc/mihomo/`** 目录。 将你在本地准备好的另外 4 个文件直接**拖拽**进去：

- `config.yaml`
- `Country.mmdb`
- `geosite.dat`
- `geoip.dat`

#### 第三步：配置后台常驻服务 (FinalShell + WinSCP)

1. 在 WinSCP 中，进入 `/etc/systemd/system/` 目录。
2. 右键新建文件，命名为 **`mihomo.service`**。
3. 双击打开，将以下代码粘贴进去并保存：

Ini, TOML

```
[Unit]
Description=Mihomo Daemon, Another Clash Kernel.
After=network.target NetworkManager.service systemd-networkd.service iwd.service

[Service]
Type=simple
LimitNPROC=500
LimitNOFILE=1000000
Restart=always
ExecStartPre=/usr/bin/sleep 1s
ExecStart=/usr/local/bin/mihomo -d /etc/mihomo
ExecReload=/bin/kill -HUP $MAINPID

[Install]
WantedBy=multi-user.target
```

1. 回到 FinalShell，执行启动三连命令：

Bash

```
sudo systemctl daemon-reload
sudo systemctl enable mihomo
sudo systemctl start mihomo
systemctl status mihomo   # 看到绿色的 active (running) 即代表成功
```

------

### 🎮 终极利器：配置终端快捷开关

为了不用每次都敲一长串代理环境变量，将开关写进环境变量文件中：

1. 在 FinalShell 终端执行一次以下代码（直接全部复制粘贴并回车）：

Bash

```
echo 'alias proxy="export http_proxy=http://127.0.0.1:7890; export https_proxy=http://127.0.0.1:7890; echo -e \"\n代理已开启 🚀\""' >> ~/.bashrc
echo 'alias unproxy="unset http_proxy https_proxy; echo -e \"\n代理已关闭 🛑\""' >> ~/.bashrc
source ~/.bashrc
```

1. **日常使用方法**：
   - 登录服务器后，敲入 **`proxy`** 回车，终端即可连通外网（可执行 `curl -I https://google.com` 测试）。
   - 敲入 **`unproxy`** 回车，关闭代理恢复直连。

------

### 📅 每月例行维护指南

每月节点更新时，只需 **2 分钟**：

1. 本地 Clash Verge 更新订阅，提取 `.yaml` 文件并重命名为 `config.yaml`。
2. 将文件里的 `anytls` 替换为 `trojan`。
3. 用 WinSCP 将该文件拖入服务器 `/etc/mihomo/` 覆盖旧文件。
4. FinalShell 执行 `sudo systemctl restart mihomo`。