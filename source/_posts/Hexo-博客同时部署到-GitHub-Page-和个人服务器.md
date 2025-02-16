---
title: Hexo博客同时部署到 GitHub Page 和个人服务器
date: 2024年12月30日22点39分
tags: hexo
categories: 博客上传个人服务器
---

# Hexo 博客同时部署到 GitHub Page 和个人服务器


将本地yml中repo改为两个，测试能否实现同时部署两个网站

1. github与个人服务器采用同一个ssh公钥
2. hexo站点yml如下：
```
deploy: 
- type: git
  repo: git@129.211.27.198:/home/git/blog.git
  branch: master
- type: git
  repo: git@github.com:yolo-zzy/yolo-zzy.github.io.git
  branch: master
```