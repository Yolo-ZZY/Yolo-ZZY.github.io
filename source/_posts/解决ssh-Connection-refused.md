---
title: 解决ssh-Connection-refused
tags: 
- bug
- 博客
categories: 博客
---
# 如何解决ssh: connect to host github.com port 22: Connection refused
1. .ssh下config文件将github的修改如下：
```
Host github.com
  Hostname ssh.github.com
  Port 443
```
