---
title: "Ubuntu 搭建 Claude Code 指南"
date: 2026-05-17 00:16:47
updated: 2026-05-17 00:16:47
categories:
  - ["工具与折腾", "效率工具"]
tags:
  - "linux"
  - "claude"
description: "本指南记录了在无图形界面（CLI）的 Ubuntu 系统上，如何利用 DeepSeek 的 Anthropic 兼容协议，完美搭建并驱动 Anthropic 官方命令行 AI 编码助手 Claude Code 的全过程。"
cover: ""
---
# 📝 Linux (Ubuntu) 搭建 Claude Code 官方指南 —— 基于 DeepSeek 后端驱动

本指南记录了在无图形界面（CLI）的 Ubuntu 系统上，如何利用 **DeepSeek** 的 Anthropic 兼容协议，完美搭建并驱动 Anthropic 官方命令行 AI 编码助手 **Claude Code** 的全过程。

------

## 🛠️ 一、前置环境检查与准备

Claude Code 依赖较高版本的 Node.js 环境以及 Git 版本控制。

### 1. 环境版本要求

- **Node.js**: $\ge \text{v18.0.0}$ (推荐 v20 或 v22 LTS)
- **Git**: 现代通用版本即可

### 2. 环境检查命令

Bash

```
# 检查现有版本
node -v
git --version
```

### 3. 环境安装/更新（如版本不符时使用）

Bash

```
# 更新系统包源
sudo apt update && sudo apt upgrade -y

# 引入 NodeSource 官方 Node.js 22.x 源并安装
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git
```

> 💡 **避坑提示**：若运行 `apt update` 提示 `Could not get lock /var/lib/apt/lists/lock`，说明后台有自动更新在运行。可使用 `sudo kill <PID>` 结束提示中的进程，或删除锁文件：`sudo rm /var/lib/apt/lists/lock`。

------

## 🚀 二、安装 Claude Code

使用 npm 全局安装 Anthropic 官方提供的 Claude Code 客户端：

Bash

```
# 若为 root 用户可去掉 sudo
sudo npm install -g @anthropic-ai/claude-code
```

- **验证安装**：`claude --version`

------

## 🔑 三、配置 DeepSeek 环境变量

由于 DeepSeek 官方已原生兼容 Anthropic 的 API 协议与 Tool Calling 机制，我们通过在 Linux 系统中注入专属环境变量，将 Claude Code 的“大脑”彻底替换为 DeepSeek。

### 1. 永久配置（推荐）

为了避免每次打开 SSH 终端都需要重新配置，建议将变量写入用户的 shell 配置文件中（以 `root` 用户的 `~/.bashrc` 为例）：

Bash

```
nano ~/.bashrc
```

在文件最底部粘贴以下 DeepSeek 官方扩展配置：

Bash

```
# ==========================================
# DeepSeek 官方扩展配置 —— 驱动 Claude Code
# ==========================================
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN="你的_DEEPSEEK_API_KEY_🔑"

# 模型路由重写
export ANTHROPIC_MODEL=deepseek-v4-pro
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash

# 性能配置（开启最大化推理能力）
export CLAUDE_CODE_EFFORT_LEVEL=max
```

> ⚠️ **注意**：从官方文档复制时，需确保模型名称后没有携带终端高亮残留字符（如 `[1m]`），保持如上所示的纯净字符串。

### 2. 保存并生效

1. 在 Nano 编辑器中按 `Ctrl + O`。

2. 看到提示 `File Name to Write: /root/.bashrc` 后，直接按 **回车 (Enter)** 确认写入。

3. 按 `Ctrl + X` 退出编辑器。

4. 执行以下命令让环境变量立即生效：

   Bash

   ```
   source ~/.bashrc
   ```

------

## 💻 四、首次运行与日常使用

Claude Code 作为项目级 Agent，**必须在 Git 仓库目录内部运行**。

### 1. 初始化测试项目

Bash

```
# 创建并进入工作目录
mkdir -p ~/my-ai-project && cd ~/my-ai-project

# 初始化 Git 仓库（核心前置条件）
git init
```

### 2. 启动客户端

Bash

```
claude
```

首次运行时，系统会展示 Onboarding 引导流程与服务条款，一路按 **回车** 确认即可进入交互终端。

### 3. 常用交互指令

进入 `claude>` 专属终端后，可直接下达自然语言指令：

- **任务下达**：`"帮我用 Python 写一个网络流量监控脚本，并保存为 monitor.py"`
- **代码审查**：`/review` *(审查当前仓库对比上一版本的修改)*
- **添加文件到上下文**：`/add <文件名>`
- **退出测试**：`exit` 或 `Ctrl + D`