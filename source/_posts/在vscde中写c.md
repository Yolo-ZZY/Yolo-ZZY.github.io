---
title: 在vscode中写c
date: 2025-02-19 18:35:19
tags: [c,vscode]
categories:
  - [编程语言与算法, C/C++]

---

# 1.下载mingw-w64
在网盘里了
将bin的路径添加到path中
# 2. VS从的中下载c/c++插件
ctrl+shift+p -》搜索c/c++，选ui配置-》下面有个模式也要改成mingw64
# 3. 配置
tasks.json中修改为这个
```

				"-g",
				"${workspaceFolder}\\*.c",
				"-o",
				"${workspaceFolder}\\${workspaceRootFolderName}.exe"


```
# 4. 运行
写完.c后要点右上角三角符号的运行
