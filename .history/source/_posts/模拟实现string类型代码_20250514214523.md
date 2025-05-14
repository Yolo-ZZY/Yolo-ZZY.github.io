---
title: "模拟实现string类型代码"
date: ###### Fri Mar 21 17:50:14 CST 2025
tags: [string]
categories: [c++初级学习]
cover: https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/xueyi.png
---
# 模拟实现string类型代码
``` c++
#include <iostream>
#include <string>
using namespace std;

//自己实现一个字符串对象
class String
{
    public:
    String(const char* p=nullptr)
    {
        if(p!=nullptr)
        {
            _pstr=new char[strlen(p)+1];
            strcpy(_pstr,p);
        }
        else
        {
            _pstr=new char[1];
            *_pstr = '\0';
        }
    }
    ~String()
    {
        delete[] _pstr;
        _pstr = nullptr;
    }
    String(const String& str)
    {
        _pstr=new char[strlen(str._pstr)+1];
        strcpy(_pstr,str._pstr);
    }
    String& operator=(const String& str)
    {
        if(this!=&str)
        {
            delete[] _pstr;
        }
        return *this;
    }
    private:
    char* _pstr;
    friend String operator+(const String& str1, const String& str2);
    friend bool operator>(const String& str1, const String& str2);
    friend ostream& operator<<(ostream& os, const String& str);

};
String operator+(const String& str1,const String& str2)
{
    char *ptmp=new char[strlen(str1._pstr)+strlen(str2._pstr)+1];
    strcpy(ptmp,str1._pstr);
    strcat(ptmp,str2._pstr)
    String tmp(ptmp);
    delete[] ptmp;  //防止内存泄漏，new的一定要delete
    //tmp是临时变量，所以不需要delete，会自动析构
    return String(ptmp);




}
bool operator>(const String& str1,const String& str2)
{
    return strcmp(str1._pstr,str2._pstr) > 0;   //strcmp的返回值为-1，0，1
}
ostream& operator<<(ostream& os, const String& str)
{
    os << str._pstr;
    return os;
}

int main ()
{
    String str1;
    String str2 = "aaa"; //string(const char*)
    String str3 = "bbb";
    String str4 = str2+str3;
    String str5 = str2+"ccc";
    String str6 = "ddd"+str2;
    cout << "str6:"<< str6 << endl;
    if (str5 > str6)
    {
        cout<<str5<<">"<<str6<<endl;
    }
    else
    {
        cout<<str5<<"<"<<str6<<endl;
    }
    int len = str6.length();
    for (int i = 0; i < len; i++)
    {
        cout<<str6[i]<<" "<<endl;
    }

    //string转char*
        //string(const char *)转char*
    char buf[1024]={0};
    strcpy(buf,str6.c_str());//把str6复制到buf里
    cout<<"buf:"<<buf<<endl;
}


```

