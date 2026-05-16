---
title: C++STL向量容量vector代码
date: 2025-03-07 19:05:39
tags: 
- [C++, STL]
- C++模板编程
categories:
  - [编程语言与算法, C/C++]

---
# 数组

``` c++
char str[] = "hello";
// 内存布局：'h' 'e' 'l' 'l' 'o' '\0'
// 最后一个单元是 '\0'
```
注意：

1. 通过 .c_str()方法获得的 C 风格字符串会以 \0结尾。
2. 许多字符串处理函数（如 strlen、strcpy）依赖 \0来判断字符串结束。
3. 字符型数组char[]由于最后可能不是\0，因此不一定可以作为字符串 
``` c++
#include <iostream>
using namespace std;
int main()
{
	int number[] = {1,2,3};
    cout << number  << endl;    //输出地址
	char hello[6] = "hello";    //注意这里hello五个字，但数组要6才能装下
	cout << hello << endl;      //输出hello
    cout << &hello<< endl;      //输出地址，这里hello当对象而非指针
}
```
``` c++
int main()
{
	char hello[6] = "hello";
	int i=0;
	while (char c = hello[i])   //这里最后一个\0可以作为false
	{
        cout << c;
		i++;
	}
	
}

```
``` c++
char word1[]="hello"
char word2[]="hello";1;
if(word1!=word2) cout<<"word1与word2不同"<<endl;    //这里word1 word2在不同地址
if(strcmp(word1,word2)==0) cout<<"word1与word2相同"<<endl;//strcmp 相同返回0
string strword1("hello");
string strword2("hello");
if(strword1==strword2) cout<<"strword1与strword2相同"<<endl;    //string类型的==是逐个比较
```
注意：
1. 数组名不是指针，只是大多数情况自动转为指针，包括这里cout
2. cout仅遇到char类型指针，会输出整个字符串
3. cout遇到别的指针，正常输出地址

# 向量
头文件#include <vector>
vector是一种模板类
对于遍历向量中的每个元素
``` c++

vector<float> weight={1.1,2.3,3.7}; 
for(int i=0;i<weight.size();i++)
{

}
for(auto w:weight)
{

}

```
``` c++
int main()
{
	vector<int> numbers;
	int num;
	cout << "请输入整数" << endl;
	while (cin >> num)
	{
		numbers.push_back(num);	//push_back添加元素到容器的尾部
	}
	while (!numbers.empty())	//empty()判断容器是否为空
	{
		cout << numbers.back() << endl;
		numbers.pop_back();
	}
}
```
# 统计一个句子中有多少英文单词
``` c++
#include <iostream>
#include <vector>
#include <string>
using namespace std;


int main()
{
while (true)
{ 
	string sentence;
	cout<<"Enter an English sentence: "<<endl;
	getline(cin,sentence);
	int i = 0;
	int count = 0;
	bool flag = false;

	while (sentence[i]) //注意这里非空就判断为真
	{ 
		if ((sentence[i] >= 'A' && sentence[i] <= 'Z') || (sentence[i] >= 'a' && sentence[i] <= 'z')||sentence[i] == '-')
		{
			if (flag == false)
			{
				flag = true;
				count++;
				i++;
			}
			else
			{
				i++;
			}
		}
		else
		{
			flag = false;
			i++;
		}
	}
	cout<<"There are "<<count<<" words in the sentence."<<endl;
}
}
```



# C++STL向量容量vector代码（顺序容器）
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


此时我们实现的vector与库的vector区别在于：缺少容器的空间配置器

