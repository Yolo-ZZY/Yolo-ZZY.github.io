---
title: C++学习-1编译链接原理
date: 2024-12-29 15:40:47
tags: 
- C++
categories: c++初级学习
---

# 编译链接原理
## 1.预编译  

开头的命令

注意以下代码==不是==预编译

``` c++
#pragma lib             //链接库 链接阶段，为链接器提供东西
#pragma link			//main为一般入口函数， 改变入口函数
```

-------
## 2.编译

![image-20241229154454330](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20241229154454330.png)


## 3.汇编   

 x86 ATA  生成.o

-------------


## 4.链接： 

![image-20241229155506604](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20241229155506604.png)




符号解析

符号的重定位 *核心*

<font color=red>**链接主要是将.o文件重定位**</font>



查看.o文件详细信息，.o可重定位，不可执行

```shell
objdump   -t main.o
```

查看.o文件符号

![image-20241229161345141](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20241229161345141.png)

以上代码，gdata sum为引用，但是二者都在.o文件中产生了符号

![image-20241229161551400](C.assets/image-20241229161551400.png)

1. main --text 在代码段

​		 data  --data 在数据段

​         <u> gdata、sum-- ==UND==  引用</u>

2. 第二列 l：loca l；g：global

   		链接时链接器只能看见g，静态变量是l，

-----

![image-20241229162259209](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20241229162259209.png)

sum 和形参一起生成符号

----

.o文件组成：

elf文件头   每个段一个文件头

text

data

bss

symbal

section table

编译过程中符号不分配地址

![image-20241229162957864](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20241229162957864.png)



注意到 data、gdata 地址都为0

----

## 链接

各个段进行合并  .text<=>.text

对符号的引用（UND） 换成定义 （在其他段寻找) ，且只允许找到一个定义（符号重定义)

符号解析成功后，给所有符号==分配虚拟地址==。  符号的重定向

链接完，成exe/out 可重定向=》可执行

-----

### 可执行文件

有program headers 

内容：两个load，把代码段、数据段 加载到内存，其他不用加载到内存

![image-20241229165246968](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20241229165246968.png)

我408也没白学哈哈哈呜呜

----











----



# 指令角度掌握函数调用过程

``` c++
#include "pch.h"
#include <iostream>
using namespace std;

int sum(int a, int b)
{
    
    //push ebp 保存此时栈底(main)
    //mov ebp,esp  
    //sub esp,4CH 为sum开辟空间 
    
    
    
    
	int temp = 0;   //mov dword ptr[ebp-4],0
	temp = a + b;	//mov eax,dword ptr[ebp+0CH]
    				//add eax,dword ptr[ebp+8]  a+b
    				//mov dword ptr[ebp-4],eax
    				
	return temp;	//mov eax,dword ptr[ebp-4]
}					//mov esp,ebp;  回退栈帧，但数据并没有清理
					//pop ebp  找回main 的栈底
					//ret	:出栈 （下一条指令地址给pc）
					//回到main下一条指令




int main()
{
	int a = 10;			//mov dword ptr[ebp-4], 0Ah
	int b = 20;			//mov dword ptr[ebp-8], 14h
	int ret=sum(a, b); //main调用sum完，如何回来？
    					//1.压栈 b 从右边开始  mov eax,dowrd ptr[ebp-4]
    					//                   push eax
    					//                   mov eax,dowrd ptr[ebp-8]
						//                   push eax
    					//                   call sum  :去执行sum了
    					//	0x08124458		 add esp,8   下一条指令，esp+8.释放ab两个形参
  					  	//					 mov dword ptr[ebp-0ch],eax    eax=30
    					//eax--<=4 ;eax+edx---<=8;>8产生临时量带出返回值
    
    
    
	cout << "ret:" << ret << endl;


}
```



### main调用sum后，如何回来？





<img src="https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20241229174349632.png" alt="image-20241229174349632" style="zoom:50%;" />







<img src="https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20241229174314915.png" alt="image-20241229174314915" style="zoom:50%;" />





 	
