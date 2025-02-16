---
title: 关于include以及多个文件间声明与调用
tags: 
- C++
categories: c++初级学习
---

# 关于include以及多个文件间声明与调用



C++中包含#include存在两种不同的形式，尖括号<>和双引号""

1. **<>只可以访问 系统目录下的头文件(.h)**

   比如在VS2013中，编译器会直接在<Visual studio 2013安装目录>\VC\include目录下查找到stdio.h这个文件，这就是编译器的类库目录；在Linux GCC编译环境下，一般为/user/include和/usr/local/include。 

![image-20250107163045933](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250107163045933.png)

2. \#include""：默认从***\*项目当前目录\****查找头文件，所谓项目当前目录，就是项目工程文件（*.vcxproj）所在的目录

   ![image-20250107163204273](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250107163204273.png)

   如果在项目当前目录下查找失败，再从***\*项目配置的头文件引用目录\****查找头文件，所谓项目配置的引用目录，就是我们在项目工程中设置的头文件引用目录，Windows VS编译环境如下图所示。在Linux GCC编译环境下，则一般通过在Makefile文件中使用-L参数指定引用目录。

![image-20250107163218148](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250107163218148.png)

------

# 如何将多个源文件关联起来

1. 如图，文件目录：

![image-20250107163513401](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250107163513401.png)

2. pch.cpp中定义了sum

![image-20250107163552618](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250107163552618.png)

3. test.c中想要调用，需要先<u>声明</u>

![image-20250107163656789](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250107163656789.png)

在此例中，编译器在编译test.c时，会生成符号，但是无法执行。在链接器与pch.cpp链接后，才能找到相关的定义，才能执行。