---
title: "C++面向对象"
date: ###### Fri Feb 21 14:32:53 CST 2025
tags: [C++]
categories: c++初级学习
cover: https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/phoebe.png
---

# C++面向对象
oop即面向对象
用类代替实体的抽象类型
实体（属性、行为） -> ADT(Abstract Data Type)抽象的数据类型
 |                           |
对象              <-（实例化）类（属性->成员变量，行为->成员方法）


oop即面向对象语言的四大特征
1.抽象
2.继承
3.多态
4.封装/隐藏  访问限定符 public private protected


用类来描述商品（实体）
```
#include <iostream>
using namespace std;

const int NAME_LEN=20;
class CGoods    //class定义类，struct也可以定义类
{               //二者有何不同？ 驼峰式，类名首单词大写，成员首单词小写
    public:
        void init(char *name,double price,int amount);//做数据初始化
        void show();    //打印商品信息
        //给成员变量提供一组getxxx或setxxx方法,类体内的实现方法，自动处理成inline内联函数
        void setName(char *name)
        {
            strcpy(_name,name); //后给前
        }
        void setPrice(double price)
        {
            _price=price;
        }
        void setAmount(int amount)
        {
            _amount=amount;
        }
        const char *getName()
        {
            return _name;


        }  //防止private变量通过指针被修改
        double getPrice()
        {
            return _price;
        }
        int getAmount()
        {
            return _amount;
        }



    private:    //private成员变量/属性,属性一般都是私有的，对外部提供公共方法访问私有属性
        char _name[NAME_LEN];
        double _price;;
        int _amount;
    

};

//类外定义成员方法
void CGoods::init(char *name,double price,int amount);//做数据初始化
{
    strcpy(_name,name);
    _price=price;
    _amount=amount;
}        
void CGoods::show()    //在方法名前加作用域
{
    cout<<"name:"<<_name<<endl;
    cout<<"price:"<<_price<<endl;
    cout<<"amount:"<<_amount<<endl;

}


int main()
{
    CGoods good;    //实例化
    good.init("apple",3.5,100); //新版编译器中，字符串是const chaar
    //strcpy可能报错，sdl检查改为否
    good.show();
    //对象的内存大小只与成员变量有关，与方法无关，且是最长那个成员变量的整数倍
    //在vs中打开终端，确保是cl，打开对应文件
    //cl cpp.cpp /d1reportSingleClassLayoutCGoods
    
    CGoods good2;;
    good2.init("banana",2.5,200);   //不同对象
    //类的成员方法一经编译，所有的方法参数，都会加一个this指针
    //    void CGoods::init(char *name,double price,int amount);//做数据初始化
    //    {
    //        strcpy(_name,name);
    //        this->_price=price;
    //        this->_amount=amount;
    //    }   例如在good2.init（）中，this指针指向good2
    //在good1.init（）中，this指针指向good1
    //因此即使共享一套成员方法，仍然可以指向不同的对象
    return 0;
}


```
![20250221152832](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250221152832.png)

name后面写着补齐4B，原来只有20B，但必须是double 8B的倍数

