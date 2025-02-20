---
title: const.一级指针与引用的结合引用
date: ###### Sun Feb 16 23:47:05 CST 2025
tags: 
- c++
categories: c++初级学习
---

** 左值引用不能引用右值（临时量）**
** 右值引用可以引用右值const int &a=20，(本质上为临时量分配内存后再引用)**

``` c++
//写一段代码，在内存的0x0018ff44处写一个4B的10
int* p=(int *)0x0018ff44;	//0x0018ff44这是个数，指针p指向一个地址
*p=10;						//编译报错，直接对内存写入太危险了
```
``` c++
int main ()
{

int* &&p=(int *)0x0018ff44;	//(int *)0x0018ff4是右值，采用右值引用
//int * const &p

}
```


## const 一级指针 引用的结合使用
``` c++
int main ()
{

    int a =10;
    int *const p=&a;
    int *&q=p;  //int*<=const int*,转换错误



    int a=10;
    const int *p=&s;
    int *&q=p;  //分析这种引用
    //把引用转换为指针
    //等同于 int **q=&p;
    //int **<=const int **,转换错误(右边是指针取地址)


    int a=10;
    int *p=&a;
    const int *&q=p;
    //const int **q=&p;
    //const int **<=int **  !注意二级指针const与非const不能转化




    int a=10;
    int *p=&a;
    int *const *q=&p;
    //const 修饰int * ,*<=*,可以的
    
}

```