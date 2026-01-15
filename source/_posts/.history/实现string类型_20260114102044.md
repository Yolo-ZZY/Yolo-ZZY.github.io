---
title: 实现string类型
date: ###### Fri Mar 21 15:48:21 CST 2025
tags: 
- string
- C++运算符重载
categories: [c++初级学习]
cover: https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/shenlilinghua.png
---
本身没有string只有char，库<string>实现了一系列操作
``` c++
#include <string>
using namespace std;
int main()
{
    string str1;
    string str2="aaa";  //说明库里有一个string(const char *)
    string str3="bbb";
    string str4=str2+str3;
    string str5=str2+"ccc";
    string str6="ddd"+str3; //有加法的重载
    for(int i=0;i<str6.length(),++i)
    {
        cout<<str6[i];//【】也重载
    }
    char buff[1024]={0}；
    strcpy(buff,str6.c_str())//c_str将string返回为const char*
}



```
``` c++
//string类部分实现
class string
{

    public:
    //这里const保证：const str1>"aaa" 可以运行
    //若没有const，const str1>"aaa",会报错
    //因此，遇到这种只读的成员函数方法，一律写成const就好 
    // const写后面，表示这个函数方法不会修改这个string对象（这是个const方法）
    //const写前面const bool operator（）表示返回值为const，无意义
    bool operator>(const String &str) const 
    {
        return strcmp(_pstr, str._pstr) > 0;
    }
    //【】重载
    char& operator[](int index)
    {
        return(_pstr[index])
    }
    const char& operator[](int index)const 
    {
        return(_pstr[index])
    }
    const char* c_str()const    //string->const char
    {
        return _pstr;
    }
    string operator+(const string &lhs,const string &rhs)   
    {
        char *ptmp=new char[strlen(lhs._pstr)+strlen(rhs._pstr)+1]；
        strcpy(ptmp,lhs._pstr);
        strcat(ptmp,rhs._pstr);
        string tmp(ptmp);   //string类型的拷贝构造
        delete[]ptmp;
        return tmp;
    }

}



```