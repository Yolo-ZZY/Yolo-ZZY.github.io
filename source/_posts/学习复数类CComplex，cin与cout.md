---
title: "学习复数类CComplex，cin与cout"
date: 2025-03-21 15:48:21
tags: 
- C++运算符重载
categories:
  - [编程语言与算法, C/C++]

---

# 学习复数类CComplex
## C++运算符重载：
使对象的运算表现和编译器内置类型一样
``` c++
template <typename T>
T sum(T a, T b)
{
    return a + b;
}
//如果T为对象，无法相加，需要重载运算符 a.operator+(b)
```

复数类
``` c++
class CComplex
{
    public:
    //CComplex();CComplex(1)给左边;CComplex(1,1);这三个都成立
    CComplex(int r=0,int i=0)   //构造函数
    :mreal(r),mimag(i)  //初始化列表，mreal=r,mimag=i
    {

    }
    //指导编译器怎么做CComplex类的加法运算

    CComplex operator+(const CComplex &src) //operator+， 加法运算符的重载,
    {
        CComplex comp;
        comp.mreal = this->meral+src.mreal;
        comp.mimag = this->mimag+src.mimag;
        return comp;

        //return CComplex(this->mreal+src->mreal,this->imag+src->imag);
    }
    void show()
    {
        cout<<"("<<mreal<<","<<mimag<<")"<<endl;
    }
    CComplex operator++(int) //a++
    {
        CComplex comp=*this;
        mreal+=1;
        mimage+=1;
        return comp;    //原来的++，新的与旧的相等
    }
    CComplex operator++()   //  ++a
    {
        mreal+=1;
        mimage+=1;
        return *this;   //返回加了1的旧址
    }

    private: 
    int mreal;
    int mimag;
    friend CComplex operator+(const CComplex &lhs,const CComplex &rhs);//友元函数可以访问私有变量
    friend ostream& operator<<(ostream& os,const CComplex &c);
};
//这是全局的，lhs.mreal访问不了私有，可以定义友元
CComplex operator+(const CComplex &lhs,const CComplex &rhs)
{
    return CComplex(lhs.mreal+rhs.mreal,lhs.mimag+rhs.mimag);
}
int main ()
{
    CComplex c1(1,2);
    CComplex c2(3,4);
    // c1.operator+(c2); 加法运算符的重载函数，当前对象为c1，值给c3，c1、c2不变
    CComplex c3 = c1 + c2;
    //在类中没有找到对应的，在全局中找
    CComplex c4 = 10+c1;
    CComplex c5 = c1++; //++是单目运算符，operator++()前置++，operator++(int)后置++
    c1.show();
    c5.show();

    return 0;
}

```

``` c++
template <typename T>
void show(T a)
{
    cout<<a<<endl; //a若是int无问题，若a是别的自定义类，会报错
}

```

``` c++
//全局,cout重写，<<是输出运算符，ostram是一个class，cout是一个全局对象
ostream& operator<<(ostream& out,const CComplex &src)
{
    out<<"mreal:"<<src.mreal<<"mimage:"<<src.mimage<<endl;
    return out;
}
//重写cin
istream& operator>>(istream& in, CComplex& c)
{
    in >> c.mreal >> c.mimag;
    return in;
}

```

cin<<只能输入一段字符串，中间不能有空格
想要一段话，使用cin.getline(指针，大小) 这里指针必须是char
或者getline(cin,sentence)
