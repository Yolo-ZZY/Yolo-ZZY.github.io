---
title: "windows踩坑合集"
date: 2025-05-04 15:49:39
tags: [git, gitbash]
categories:
  - [工具与折腾, 效率工具]
swiper_index: 1 #置顶轮播图顺序，非负整数，数字越大越靠前
---


# 右键链接问题
参考： https://blog.csdn.net/qq_41019529/article/details/110139830
1. regedit打开注册表，\HKEY_CLASSES_ROOT\Directory\Background\shell\
2. shell下新建 Git Bash here，下面再建command，Git Bash here 新建icon，值为\mingw64\share\git\git-for-windows.ico
3. command 改值为 C:\Program Files\Git\git-bash.exe
