---
title: 记录claude code安装与ccswitch配置
date: 2026-05-14 12:00:00
tags: 
- claude
- ccswitch
categories:
  - [工具与折腾, 效率工具]
---

# 记录claude code安装与ccswitch配置

## 1. claude安装

（关于claude code的安装步骤）

## 2. ccswitch安装

（关于ccswitch的安装步骤）

## 3. ccswitch配置

- **原生 API**: 正常处理即可。
- **聊天补全 API**: 
  - `base url` 处后面（即 `api url`）添加 `/v1` 等路径。
  - ccswitch 路由需要开启。
  - 在 claude 自己的 `settings.json` 中，`base url` 填写为 `http://127.0.0.1:15721`。

> **注意**：ccswitch 与 claude 的 settings 文件是同步变化的，但是实际上是两个东西，可以不同。
