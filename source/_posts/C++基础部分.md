---
title:  C++基础部分
data: 2025年1月7日13点48分
tags:
- C++
categories: c++初级学习
---

![image-20250107134923183](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250107134923183)
# 形参带默认值的函数

``` C++
#include "pch.h"
#include <iostream>
using namespace std;
/*形参带默认值的函数*/
int sum(int a,int b=20)	//int sum(int a=20,int b)这是错误的，默认值从右向左给
{						//这是函数的定义
return a+b;
}


int main(){
int a =10
int b=20;
int ret=sum(a,b);
/*
MOV EAX,DWORD PTR[EBP-4]     ba压栈
PUSH EAX
MOV EAX,DWORD PTR[EBP-8]
PUSH EAX
call sum
*/

int ret=sum(a)
/*    
PUSH 14H   20直接压，不用MOV传	，少了一条指令		ba压栈
MOV EAX,DWORD PTR[EBP-8]
PUSH EAX
call sum
*/

cout<<"ret:"<<ret<<endl;
}


```
-----
上述为先<u>定义</u>，后<u>调用</u>；下为先<u>声明</u>，后调用，最后定义（或定义在另一个文件）
``` c++
int sum(int a,int b=20);  //声明

int main(){
int a =10
int b=20;
int ret=sum(a,b);
/*
MOV EAX,DWORD PTR[EBP-4]     ba压栈
PUSH EAX
MOV EAX,DWORD PTR[EBP-8]
PUSH EAX
call sum
*/

int ret=sum(a)
/*    
PUSH 14H   20直接压，不用MOV传	，少了一条指令		ba压栈
MOV EAX,DWORD PTR[EBP-8]
PUSH EAX
call sum
*/

cout<<"ret:"<<ret<<endl;
}


int sum(int a,int b=20)	//int sum(int a=20,int b)这是错误的，默认值从右向左给
{						//这是函数的定义
return a+b;
}
```


1.  **形参给默认值，可以在声明时给出，即无论定义还是声明都能给形参默认值

2.  **声明可以多次

3.  ***无论如何，一个形参只能给一个默认值

4. 可以第一次先给右形参，第二次再给左形参的默认值
![](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250107143538180.png)

  这是正确的

# 掌握inline内联函数
### inline内联函数和普通函数的区别？
``` C++
inline int sum(int x,int y)
{
return x+y;
}
int main()
{
int a=10;
int b=20;
int ret = sum(a,b);		//先函数的调用，函数调用开销：参数压栈，函数栈帧开辟和回退
						//实际上sum只有：mov add mov
						//为了这三个指令，函数调用却要那么大开销，效率很低
}
```
简单函数，函数调用开销已经大于本身函数了，效率很低
**inline内联函数：在编译过程中，没有函数的调用开销，而是在函数的调用点直接把函数的代码进行展开处理**
1. inline 函数直接展开，因此不会再产生相应函数符号
2. 但不是所有inline都被编译器处理成内联函数，如递归（仅仅是展开不知道要递归多少次，因此递归不可能时内联）,代码过长
3. inline只是建议编译器内联展开
4. inline在debug版本不起作用，release版本才能出现

# 函数重载

1. c++为什么支持函数重载，而c不支持
2. 重载要注意什么
3. c与c++如何互相调用

下为函数重载的例子：
**一组函数，函数名相同，参数不同
调用时根据实参，选择对应的定义
``` c++
bool compare(int a,int b)
{
cout<<"compare_int_int"<<endl;
return a>b;
}

bool compare(double a,double b)
{
cout<<"compare_int_int"<<endl;
return a>b;
}

bool compare(const char* a,const char* b)
{
cout<<"compare_int_int"<<endl;
return a>b;
}
int main()
{
compare(10,20);
compare(10.0,20。0);
compare("aaa","bbb");
}

```

### 1. c++为什么支持函数重载，而c不支持
c++代码编译时产生函数符号，由函数名+参数构成
c只有函数名

``` c++
bool compare(int a,int b)
{
cout<<"compare_int_int"<<endl;
return a>b;
}

bool compare(double a,double b)
{
cout<<"compare_int_int"<<endl;
return a>b;
}

bool compare(const char* a,const char* b)
{
cout<<"compare_int_int"<<endl;
return a>b;
}
int main()
{
bool compare(int a,int b);		//函数的声明
compare(10,20);
compare(10.0,20。0);				//2,函数调用的时候，有声明就够了，优先用作用域内的声明
compare("aaa","bbb");			//3
}

```
这里23会报错
为什么呢？
类比举例如下：
``` C++
int data=10;		//全局作用域
int mian()
{
int data=20;		//局部作用域
int a=data;
cout<<a<<endl;		//优先就近用局部作用域20，若a想用全局作用域 int a=::data;
}
```

**由此，函数重载只在同一个作用域中，只有在同一个作用域中才能称作函数重载


### const与volatile
这算函数重载吗？
```C++
void func(int a){}
void func(const int a){}		//编译器认为这两者是一样的
int main()
{
int a=10;
const int b=10;
cout<<typeid(a).name()<<endl;	//结果为int
cout<<typeid(a).name()<<endl;	//结果也为int
return 0;
}
```
这是函数重定义


那这两者有何区别?
**const与volatile到底如何影响形参类型的？（以后说）**

**一组函数，函数名相同，参数列表也相同，仅仅是返回值不同，不叫函数重载！！

**函数重载的本质：生成符号不同，例如上例compare_int_int，compare_double_double,这两者符号不同，但返回值不体现在符号里，不算做重载

### 请你解释一下，什么是多态？
静态（编译时期）多态--其中一种就是函数重载，别的还有模板（以后）
动态（运行时期）

### c调用c++与c++调用c
c文件
``` c
int sum(int a,int b)	
{						
return a+b;
}
```

c++文件，头文件等写好后

``` c++
int sum(int a, int b);		//1
int main()
{

int ret =sum(10,20)
return 0;
}
```

这里会报错”无法识别的外部符号sum“，因为1处sum编译为符号sum_int_int,然后去c里找，而c中sum符号为sum，编译器找不到，所以报错。

因此无法直接调用，要用到
``` c++
extern"C"
{
	int sum(int a,int b);
}
```

**总结：c++调用c，把c语言函数的声明括在extern”c“里面**
**反之，c调用c++，也是extern”c“，把c++的源码括在extern”c“里面，（在c++中，c不认识extern ”c“）**

``` 
#ifdef _cplusplus			//如果是c编译器，没有_cplusplus
extern "C"{					//ifdef与endif之间的都看不到，只能看到sum的定义
#endif						//如果是c++，会有extern”c“，
	int sum(int a,int b)
	{
		return a+b;
	}
#ifdef _cplusplus
}
#endif
```

只要是c++编译器，都内置\_cplusplus这个宏名
\_FILE_  _LINE\_ 都是宏，为文件名与行数

