---
title: 在多端上同步部署hexo
date: ###### Sun Feb 16 23:45:39 CST 2025
tags: hexo
categories: 博客上传个人服务器
---

# 在多端上同步部署hexo
参考https://blog.csdn.net/K1052176873/article/details/122879462
## 1. 在GitHub上新建分支hexo，且设置为默认

![image-20250205103226633](https://cdn.jsdelivr.net/gh/yolo-zzy/Image/image-20250205103226633.png)

## 2. 将Github仓库中hexo分支的文件clone到本地

```
git clone git@github.com:yolo-zzy/yolo-zzy.github.io.git
```
即clone仓库地址

![image-20250205120051048](https://cdn.jsdelivr.net/gh/yolo-zzy/Image/image-20250205120051048.png)
-------
拉去（同步？）远端仓库中的文件到本地
```
git pull origin master
```


## 3.修改后提交到Github仓库




```
git add .
```

```
git commit -m "add_branch"

```
```
git push
```

注：添加hexo的环境
```
npm install hexo
npm install
npm install hexo-deployer-git
```
