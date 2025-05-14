---
title: 继续butterfly
date: 2024年12月29日14点34分
tags: 
- butterfly
- Github
- hexo
categories: 博客上传个人服务器
---

# 继续butterfly

上瘾了继续搞

> 记录如何在github上用vscode看源码:
>
> 
>
> 1. .在线vscode：仓库详情界面按下“。”键
> 2. 在线运行项目 在项目地址前加上`gitpod.io/#/`前缀 登陆： 加载： 运行

 

## 本地搜索系统

1. 安装依赖：前往博客根目录，打开cmd命令窗口执行

```bash
npm install hexo-generator-search --save
```

2. 注入配置

```bash
search:
  path: search.xml
  field: post
  content: true
```
3. 主题yml中

```yml
local_search:
-  enable: false
+  enable: true
```
重新编译运行即可
```bash
hexo cl && hexo generate
```



## 解决spwanfailed

1. Githhub

2. setting

3. email,这个不要勾选

   ![image-20241229141814594](C:\Users\yolo\AppData\Roaming\Typora\typora-user-images\image-20241229141814594.png)

## 首页中tag，categories等问题

参考
>1. [Hexo使用攻略-添加分类及标签 - 简书](https://www.jianshu.com/p/e17711e44e00)
>2. https://www.cnblogs.com/an-shiguang/p/18269048#_label3_0_1_6

1.打开命令行，进入博客所在文件夹。执行命令
```bash
$ hexo new page categories
```

2.将index.md中添加
```markdown
type: "tags"        #注意是type，不是tag
type: "categories"
```
3.为博客文章添加tag、categories


## 配置hexo-butterfly-categories-card
参考链接
>https://akilar.top/posts/a9131002/
代码应放在站点yml文件中



