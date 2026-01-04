---
title: C++STL向量容量vector代码
date: ###### Fri Mar 7 19:05:39 CST 2025
tags: [C++, STL]
categories: [c++初级学习]
cover: https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/blade.jpg
---

# C++STL向量容量vector代码
容器： SeqStack Queue vector
![20250307191032](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250307191032.png)
last是最后一个元素，end是最后一个空间
``` c++
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
        void expand()       //空间不足时，扩展容器
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
int main()
{

}
```
你遇到的错误 C2872 "vector": 不明确的符号 是因为在你的代码中使用了 using namespace std;，这导致编译器在解析 vector 时无法区分你是想使用标准库中的 std::vector 还是你自己定义的 vector 类。


此时我们实现的vector与库的vector区别在于：容器的空间配置器

