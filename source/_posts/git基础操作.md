---
title: git基础操作
date: 2026-10-08 10:39:49
updated: 2026-10-08 10:39:49
categories:
  - 工具与折腾
  - 工具笔记
tags:
  - Git
  - 版本控制
description: "记录 Git 基础操作：查看状态与改动、git add 暂存、git commit 提交（含 vim 写提交信息）以及查看日志、切换分支的常用命令。"
cover: ""
---
# git基础操作

## 1. 查看状态：git status

`git status` 用来查看当前仓库的状态：哪些文件被修改过、哪些改动已经暂存（等待提交）、哪些文件还没有被 Git 跟踪。

```bash
git status
```

> **注意**：提交前建议先 `git status` 确认一遍，避免漏掉文件或多提交不该提交的内容。

## 2. 查看具体改动：git diff 与 git diff --staged

`git status` 只能看到哪些文件变了，想看具体改了什么内容，用 `git diff`：

```bash
git diff            # 查看工作区中还没暂存的改动
git diff --staged   # 查看已经 git add 暂存、等待提交的改动
```

- 还没有 `git add` 的改动 → 用 `git diff` 看。
- 已经 `git add` 过的改动不在 `git diff` 里显示，要用 `git diff --staged` 看。

## 3. 暂存改动：git add

提交之前，需要先把想提交的改动放进暂存区（staging area）。

```bash
git add 文件名   # 暂存指定文件，例如 git add a
git add .        # 暂存当前目录下的所有改动（新增、修改、删除）
git add -A       # 暂存整个仓库的所有改动，包括新增、修改、删除的文件
```

> **注意**：在仓库根目录下执行时，`git add .` 和 `git add -A` 效果基本一致；区别在于作用范围，`.` 只作用于当前所在目录，`-A` 始终覆盖整个仓库。

## 4. 提交：git commit

```bash
git commit            # 提交，会打开编辑器（默认 vim）写提交信息
git commit -m "说明"  # 直接跟一行提交信息，不打开编辑器
```

直接敲 `git commit` 会进入 vim 编写提交说明，vim 下的基本操作：

- `i`：进入插入模式，开始输入文字
- `Esc`：退出插入模式，回到普通模式
- `:wq`：保存并退出（`:w` 保存，`:q` 退出）
- `:q!`：不保存强制退出，写错了想放弃时用

> **注意**：提交信息要写清楚这次改了什么，方便以后 `git log` 时回看。

## 5. 查看提交历史：git log --oneline

```bash
git log --oneline
```

每条提交只显示一行：前面是 commit 的短哈希值，后面是提交信息，一目了然。

## 6. 切换分支：git switch

```bash
git switch main                 # 切回 main 分支
git switch --detach             # 以当前提交为基准进入分离头指针（detached HEAD）状态
git switch --detach <提交哈希>  # 切换到某个历史提交，查看当时的状态
```

`--detach` 进入的是「分离头指针」状态：此时 HEAD 不指向任何分支。在这个状态下查看历史、运行代码都没问题，但如果在这里产生了新的提交，切回分支后这些提交可能就「找不到」了。

> **注意**：查看完历史提交后，用 `git switch main` 切回主分支即可恢复正常工作。

## 7. 一次完整流程

```bash
git status              # 1. 看有哪些改动
git diff                # 2. 看具体改了什么
git add .               # 3. 把改动暂存起来
git diff --staged       # 4. 确认暂存的内容
git commit -m "说明"    # 5. 提交
git log --oneline       # 6. 查看提交历史
```
