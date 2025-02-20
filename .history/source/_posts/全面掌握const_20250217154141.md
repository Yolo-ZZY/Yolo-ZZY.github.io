---
title: 全面掌握const
date: ###### Sun Feb 16 23:44:57 CST 2025
tags: 
- C++
categories: c++初级学习
---
# const
``` c++
int main()
{

int a=10;
a=20;		//a为左值,可被修改
const int b=20;
b=30;		//这里会报错，const被初始化后不能被修改

}
```

c中
``` C
void main()
{
const int a=20;	//const 修饰的量，可以不初始化
//不叫常量，叫常变量
//int array[a]={};	这里想要初始化一个全0，长度为a的数组
//int a=10; int array[a];这会报错
//因为a是个变量
int *p=(int*)&a;	//int *p=&a,破坏了a的常量性
//（int*）把a从常量强转了，因此可以，即p是指向a的指针
*p=30;
printf("%d %d %d\n",a,*p,*(&a));	//30，30，30
}
```
-------------
c++的const必须初始化，是常量，不是变量
``` C
int main()
{
const int a=20；
int *p=(int*)&a;
*p=30;
printf("%d %d %d\n",a,*p,*(&a));	//20 30 20
//c中const为一个变量
//c++中，所有const a 都被值 20 替换！
//这里a内存上确实被修改了，但是在printf之前，编译器已经将所有的关于a的都被替换成20了
}
```
``` c++
int main()
{
int b=20;
const int a=b;
//这里又变成常变量
	int* p = (int*)&a;
	*p = 30;
	printf("%d %d %d\n", a, *p, *(&a));	//303030
	b = 20;
	printf("%d %d %d\n", a, *p, b);	//注：这里a还是20，因为ab其实没啥关系
	return 0;
}
```
总结：分清常量与常变量
常量从地址角度分析，常变量从编译替换角度分析

# const和指针的结合

const修饰的是离他最近的**类型**

## const和一级指针的结合

``` c++
const int *p;	
//const修饰 int，const 修饰*p, *p不能再改了,但是p可以修改
//即指针可以指向不同，但其值不变

int const *p;
//const 修饰 int类型，const修饰*p


int *const p;
//const 修饰int *,const修饰p，即p指向地址不变，但*p即其值不变

```
```
int main()
{
const int a=10;
//想要定义一个指针指向a；
int const *p=&a;	
}

```
```
int main()
{
int *q1=nullptr;
int *const q2=nulptr;
cout<<typeid(q1).name()<<endl;	//int *
cout<<typeid(q2).name()<<endl;	//int *
//const若右边没有*，则const不参与类型
int a=10;
int *p1=&a;
const int *p2=&a;//这里const int*<=int *  是可以的
int *const p3=&a;//int *<=int * 也是可以的
int *p4=p3;		//p3是int *,不是int * const
}


```

```
int main()
{
int a=10;
const int *p=&a;
int *q=p;	//int *<=const int *,这里const右边又*
}


```

``` C++
int main()
{
const int a=10;
//int *p=&a;      int *=const int *  ??
//const和指针结合
//1.常量不能作为左值<=试图直接修改const  
//2.不能把常量的地址泄露给一个普通的指针或引用变量<=试图间接修改const   *p=30;?

return 0;
}
```

## const与二级指针的结合
```
int main()
{
int a=10;
int *p=&a;
const int **q=&p;	
//const右边有指针，类型要考虑进去
//即const int**<=int **
//这是错误的
/*
理解:const int **q指向a,不允许修改,但*p却有可能修改
即可以通过*p修改**q,这是错误的,常量地址放在普通指针中
*/
return 0;

}
```
修改如下:
```
int main()
{
int a=10;
const int *p=&a;	//p不是普通指针了
const int **q=&p;

}
```
或者
```
int main()
{

int a=10;
int *p=&a;
const int *const *q=&p;	//把*q限定,也是可以的

}
```

-------------

常见二级指针的应用![image-20250109165656270](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/image-20250109165656270.png)

1.p修改a的值
2.q修改a的值
3.q修改p的指向

```
const int **q;//**q
int *const *q;//*q
int **const q;//q
```
### 指针const结合总结
```
int**<=const int **  //错误
const int **<=int ** //错误,这两个是和二级指针结合
int**<=int*const*	 //两边同时去掉前面的int*,即*<=const*,错误
int*const*<=int**	 //与上同理,可以的,这两个是和一级指针的结合
```