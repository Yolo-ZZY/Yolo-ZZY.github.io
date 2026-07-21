---
title: "指针、引用和const"
date: 2026-01-09 13:08:10
updated: 2026-01-09 13:08:10
categories:
  - ["编程语言与算法", "C/C++"]
tags:
  - "C++"
  - "指针"
  - "引用"
  - "const"
description: "int a=10; int &nickname=a; nickname就是a的别名，对nickname操作就是对a操作"
cover: ""
---
# 指针
new分配内存在堆上
# 引用
``` c++
#include <iostream>
using namespace std;
int a=5;
void func1(int& a) 
{
    a=10;
}
void func2(int a) 
{
    a=20;   //这里相当于在func2的空间中新建了一个变量（a1，func2运行结束释放，因此原a不变）
}
int main()
{
    func1(a);
    cout << a << endl;
    func2(a);
    cout<<a<<endl;
}

```
int a=10;
int &nickname=a;
nickname就是a的别名，对nickname操作就是对a操作
![20260109124126](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20260109124126.png)

![20260112112520](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20260112112520.png)
第一行：函数内会新建变量
第二行：直接对外部变量进行操作
第三行：直接对外部变量读，不许写

## 左值引用与右值引用
![20260112140125](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20260112140125.png)
``` c++
func(a)//调用第一个
func（6）//调用第二个


```

# const
## const与指针
```c++
const int a=10;
a=20;//报错，const修饰的不可修改
```

```c++
const int a=10;
int*pa=&a;  //  也报错，不可以通过普通指针指向const变量
```

```c++
const int a=10;
const int *pa=&a;   //必须是const指针才能指向a，这里const放*左边，且直接修改*pa=20是错误的
//但是这个pa可以指向别的！
int b=20;
pa=&b;
b=30;
```

```c++
int a=10;
int *const pa=&a;   //这const在*右边，指针不能变，永远指向a那个地址，但a可以改变
```

```c++
int num=10;
const int* const nump=&num;
```

## const与引用
```c++
int a = 10;
const int& b = a;//这里b=20报错，a=20可以，相当于b只能指向a那个地址
cout << b << endl;
```

