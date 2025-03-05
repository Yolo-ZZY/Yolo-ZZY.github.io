---
title: new,malloc,free,delete
data: 2025年1月8日15点22分
tags:
- C++
categories: c++初级学习
---
# malloc,free;new,delete
**malloc和free是c的库函数
new和delete是运算符
``` c++
int main()
{
int *p=(int*)malloc(sizeof(int));		//开辟一个整型大小的内存
//malloc的返回值为void*，（int*）为强制转换,按字节开辟


if(p==nullptr)							//内存开辟失败，p为空指针
{

return -1;

}
//malloc只管开辟，还需要初始化
*p=20;
free(p);								//malloc和free是c的库函数



try
{
int *pl=new int(20);

}

catch(const bad_alloc &e)
{

}


delete p1;
					// new=malloc内存开辟+内存初始化
//malloc开辟失败，是通过返回值与nullptr比较
//new开辟失败，通过抛出bad_alloc类型的异常来判断

int *q=(int*)malloc(sizeof(int)*20);	//无初始化
int *ql=new int[20](30);				//有初始化
delete []ql;							//删除数组内存，ql前面要[]
return 0; 

}
```
总结：
1. malloc 按字节开辟内存，返回void\*,需要强制类型转换，而new指定类型转换，返回异常
2. free只需传入内存起始位置，delete释放数组时+[]
3. c++时尽量用new delete

**new有多少种？
``` c++
int main()
{
int *p1=new int(20)
int *p2=new(nothrow)int;	//这种不抛出异常，也是和nullptr比较
const int *p3=new const int(40);
//定位new
int data=0;
int *p4=new (%data) int(50);		//在指定地址上，开辟1B,赋值为50


}
```
# C++的引用
## 引用和指针的区别？
1. 左值引用和右值引用
2. 引用实例
>**引用时一种更安全的指针
>1, 引用必须初始化，指针可以不初始化
>
``` C++
int main()
{
int a=10;
int *p=&a;
int &b=a;		//引用一定要初始化，a一定要可以取地址，引用是先对右边取地址
				//即int &b=20 ;错误  20 不可以取地址
				//引用只有一级引用，指针可以多级引用

*p=20;
cout<<a<<" "<<*p<<" "<<b<<endl;
//   20      20       20 ;*p  b是同一个地址


return 0;
}
```

## 引用的意义
```
void swap(int a,int b)
{
int temp=a;
a=b;
b=temp;
}
int main()
{
int a =10;
int b=20 ;
swap(a,b);	//无法交换实参的值

}
```

```
void swap(int* a,int* b)	//参数为指针
{
int temp=*a;
*a=*b;
*b=temp;
}

void swap(int &a,int &b)	//参数为引用
{
int temp=a;
a=b;
b=temp;
}

int main()
{
int a =10;
int b=20 ;
swap(&a,&b);	//无法交换实参的值
swap(a,b)；		//参数为引用，不用我们自己取地址
}

```

定义一个引用和一个指针，两者汇编指令一样；
通过引用修改值与通过指针修改，汇编也一样

```
int main()
{

int array[5]={};
int *p=array;
//定义一个引用变量的方法，引用array数组，先写指针，再用右边&把*覆盖
//int *q=&array  这是错误的，需要用数组指针
//int (*q)[5]=&array;

int (&q)[5]=array;


cout<<sizeof(array)<<endl;
cout<<sizeof(p)<<endl;	//注：这里指针大小与自己os位数有关
cout<<sizeof(q)<<endl;	//20，访问q就是在访问array，因此返回的是数组大小

}
```
# 左值引用与右值引用
```
int main()
{
int a=10;	//左值，它有内存，有名字，值可以修改
int &b=a;

//int &c=20;	//20 为右值，没内存

/**********************************************************************/
//c++11提供右值引用

int &&c=20;		//定义一个右值引用
c=30;			//可修改

const int &b =20;//与int &&c=20	等同
/*
两者都是
int temp =20;    先产生临时量
temp->b			引用

但const b不能修改，c为引用可以修改
*/
int &e=c;	//左值引用可以引用右值， 
//int &&e=c;错误
//因为右值引用要先 生成临时量，而右值引用c定义时已经生成了临时量，不要再生成一次了

return 0;

}
```
右值引用必须先生成临时量，且可修改；不能用来引用左值（左值已有内存）