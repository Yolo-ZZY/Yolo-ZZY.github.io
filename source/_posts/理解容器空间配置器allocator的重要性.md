---
title: 理解容器空间配置器allocator的重要性
date: ###### Sun Mar 9 19:22:32 CST 2025
tags: [allocator]
categories: [c++初级学习]
---

# 理解容器空间配置器allocator的重要性
``` c++
namespace myspace
{
template <typename T>
class vector
{
    public:
    vector(int size=10)
    {
        _first = new T[size];   
        _last = _first;
        _end = _first + size;
    }
    ~vector()
    {
        delete [] _first;
        _first = _last = _end = nullptr;
    }
    vector(const vector<T> &v)
    {
        _first = new T[v._end - v._first];
        int len = v._last - v._first;
        for(int i=0;i<len;i++)
        {
            _first[i] = v._first[i];
        }
        _last = _first + len;
        _end = _first + (v._end - v._first);
    }
    vector<T> &operator=(const vector<T> &v)    //赋值构造，两个对象已存在
    {
        if(this == &v)
        {
            return *this;
        }
        delete [] _first;
                _first = new T[v._end - v._first];
        int len = v._last - v._first;
        for(int i=0;i<len;i++)
        {
            _first[i] = v._first[i];
        }
        _last = _first + len;
        _end = _first + (v._end - v._first);
        return *this;
    }
    void push_back(const T &x)  //向容器末尾增加元素
    {
        if(full())
        {
            expand();
        }
        *_last++ = x;
    }
    void pop_back()     //删除容器末尾元素
    {
        if(_last == _first)
        {
            return;
        }
        std::cout << *(_last-1) << std::endl;
        _last--;
    }
    T back()const       //返回容器末尾元素
    {
        return *(_last-1);
    }
    bool full()const{return _last == _end;}
    bool empty()const{return _last == _first;}
    int size()const{return _last - _first;}

private: 
    T *_first;
        T *_last;
        T *_end;
        void expand()       
        {
            T* tmp = new T[_end - _first];
        int len = _last - _first;
        for (int i = 0; i < len; i++)
        {
            tmp[i] = _first[i];
        }
        delete[] _first;
        _first = new T[(_end - _first) * 2];
        for (int i = 0; i < len; i++)
        {
           _first[i] = tmp[i];
        }
        _last = _first + len;
         _end = _first + (_end - _first) * 2;
        delete[] tmp;
   }

};

}

class Test
{
public:
    Test()
    {
        std::cout << "Test()" << std::endl;
    }
    ~Test()
    {
        std::cout << "~Test()" << std::endl;
    }
};

int main()
{
    vector<Test> vec;   //空容器，但输出发现构造、析构被调用很多次，因为vector构造时new把开辟加实例化

    //因此需要把内存开辟与对象构造分开处理

}
```

优化：
1. 构造：把内存开辟与对象构造分开处理
2. 析构：析构有效元素，然后释放first指针

避免vector冲突
``` c++
namespace myspace
{
    template <typename T>
    class vector
    {

    }
}
```

``` c++
int main()
{
    Test t1, t2, t3;
    cout<<"-----------------"<<endl;
    myspace ::vector<Test> vec;
    vec.push_back(t1);
    vec.push_back(t2);
    vec.push_back(t3);
    cout << "-----------------" << endl;
    vec.pop_back();
    cout << "-----------------" << endl;

}
```



此处，发现pop时并没有释放空间
如何做？
首先，明确不能使用delete，因为delete会删除分配的内存
因此，pop只需要析构对象 
将析构与内存释放分离开


delete/new：将内存的释放与创建与对象的释放与创建 两者一起完成了


我们现在要做的是将内存与对象的创建、释放分离开
其中内存释放不是所有对象都释放，而是有效元素的释放


allocator容器空间适配器
内存开辟/内存释放
对象构造/对象析构
``` c++
template <typename T>
class Allocator //库中存在allocator,这是一个模板
{
public:
    T* allocate(size_t size)   //参数size_t 是C和C++编程语言中的一个无符号整数类型，专门用于表示内存中对象的大小或数组下标的值
    {
        //开辟整个内存
        return (T*)malloc(size * sizeof(T));

    }
    void construct(T* p,const T& value)     //构造对象
    {
        new(p)T(value); //定位new，在指定位置处创建对象

    }
    void destroy(T* p)      //析构元素，
    {
        p->~T();    //~T()代表T类型的的析构函数
    }
   
    void deallocate(T* p)      //释放内存
    {
        free(p);    //free不需要知道删除多大，会自动根据上面malloc判断
    }
} ;


```
把allocator作为vector容器的适配器（把上面写的方法给到vector容器）
容器元素的内存开辟与释放，通过allocator实现
``` c++


namespace myspace
{
template <typename T,typename Alloc=Allocator<T>> //这后面的两个是参数列表
class vector
{
    public:
    vector(int size=10)
    {
        //_first = new T[size];   
        _first = _alloc.allocate(size); //分配内存
        _last = _first;
        _end = _first + size;
    }
    ~vector()
    {
        //delete [] _first;
        //释放某些对象
        for(T *p=_first;p!=_last;p++)
        {
            _alloc.destroy(p);  //析构对象
        }
        _alloc.deallocate(_first);  //释放的内存大小是依据上面的allocate大小
        _first = _last = _end = nullptr;
    }
    vector(const vector<T> &v)
    {
        //_first = new T[v._end - v._first];
        //拷贝构造也要修改
        _first = _alloc.allocate(v._end - v._first);
        int len = v._last - v._first;
        for(int i=0;i<len;i++)
        {
            //_first[i] = v._first[i];
            _alloc.construct(_first+i,v._first[i]);
        }
        _last = _first + len;
        _end = _first + (v._end - v._first);
    }
    vector<T> &operator=(const vector<T> &v)    //赋值构造，两个对象已存在
    {
        if(this == &v)
        {
            return *this;
        }
        //delete [] _first;
        for(T *p=_first;p!=_last;p++)
        {
            _alloc.destroy(p); 
        }

        _first = _alloc.allocate(v._end - v._first);
        int len = v._last - v._first;
        for(int i=0;i<len;i++)
        {
            //_first[i] = v._first[i];
            _alloc.construct(_first+i,v._first[i]);
        }
        _last = _first + len;
        _end = _first + (v._end - v._first);
        return *this;
    }
    void push_back(const T &x)  //向容器末尾增加元素
    {
        if(full())
        {
            expand();
        }
        _alloc.construct(_last,x);
        _last++;
    }
    void pop_back()     //删除容器末尾元素
    {
        if(_last == _first)
        {
            return;
        }
        _alloc.destroy(--_last);
        //如果一个容器有 n 个元素，那么 _first 到 _last - 1 是有效的元素范围，而 _last 指向的是第 n 个位置（即第 n-1 个元素之后的位置）。

    }
    T back()const       //返回容器末尾元素
    {
        return *(_last-1);
    }
    bool full()const{return _last == _end;}
    bool empty()const{return _last == _first;}
    int size()const{return _last - _first;}

private: 
        T *_first;
        T *_last;
        T *_end;
        Alloc _alloc;
        void expand()       
        {
            int size = _end - _first;
            T *tmp=_alloc.allocate(2 * size);
            for(int i=0;i<_last - _first;i++)
            {
                _alloc.construct(tmp+i,_first[i]);
            }
            //delete [] _first; 全部析构沟了
            //养成先析构想要的后再释放的好习惯
            for(T *p=_first;p!=_last;p++)
            {
                _alloc.destroy(p);
            }
            _alloc.deallocate(_first);
            _first = tmp;
            _last = _first + size;
            _end = _first + 2 * size;
            
        }

};

int main()
{
    Test t1, t2, t3;
    cout<<"-----------------"<<endl;
    myspace ::vector<Test> vec;
    vec.push_back(t1);  //拷贝构造
    vec.push_back(t2);
    vec.push_back(t3);
    cout << "-----------------" << endl;
    vec.pop_back();
    cout << "-----------------" << endl;


}




```