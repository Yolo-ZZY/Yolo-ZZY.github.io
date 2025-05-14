---
title: "mysql数据库面试"
date: ###### Thu Mar 13 16:26:30 CST 2025
tags: [mysql]
categories: [南航面试复习]
cover: https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/arcana.jpg
---


mysql 关系型数据库，类似与一张excel表格
1. 行 对于记录， 列 对于属性
   
2. 数据存放再磁盘中，而不是内存
show global variables like "%datadir%"
显示路径

3. b+树的形式存储， 一行行记录通过链表串在一起
   
4. 文件系统与数据库的联系与区别
文件系统 无结构
数据库 有结构
数据库满足某种范式时，会减少冗余

文件系统缺点： 当文件系统发生变化时，相应的程序代码也要发生变化，才能正常运行
而数据库通过DBMS的两级映像，实现了物理独立性与逻辑独立性
例
readexcel（list,4,"d://"）  从第四列读数据
select * from "表"          无需关注哪一列
实现了独立性

5. DBMS
   数据库管理系统
   ![20250313164000](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313164000.png)

   帮助我们解析sql语句，并返回结果




6. DBMS的数据物理独立性与逻辑独立性是如何实现的
三级模式和两级映像
![20250313164353](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313164353.png)

 外模式：用户查询到的
 映射
 概念模式：整张表或关系   全局逻辑结构
 概念模式-内模式映射
 内模式： 数据的物理存储

 逻辑独立性：逻辑结构变化(加列)，代码不用变

 物理独立性：内模式改变，逻辑结构不变。当内模式改变，修改映射即可，不必动其他模式

7. 数据库的设计过程
   1. 需求分析
   2. 概念结构设计 ： E-R图（关系图）
   ![20250313165548](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313165548.png)

   3. 逻辑结构设计： ER图转变为一张表
   4. 物理结构设计：底层存储结构
   5. 数据库实施：把表建立起来
   6. 数据库运行的维护
8. 索引
变长记录
b+树： 最底层才是数据，上层是索引
9. 事务
ACID
   1. atomicity原子性：事务中的所有操作，要么都成功，要么都失败
   ![20250313170748](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313170748.png)
   undo log   出错就回滚rollback
      
   2. consistency一致性：事务执行之前和执行之后，数据是完全一致的
   
   3. 隔离性：事务之间互不影响
   四个隔离级别：
   Serializable、Repeatable read、read committed、read uncommitted
   ![20250313171157](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313171157.png)


   脏读：读到了尚未被提交的数据
   不可重复读：前后多次读，数据不一致
   幻读：前后多次读，查询的结果数量不同

   4. 持久性：事务执行完，数据就永久的保存在磁盘中 commit
10. 死锁
死锁的预防：打破四个条件
    1. 互斥
    2. 请求和保持
    3. 不可剥夺
    4. 循环等待 资源进行编号
死锁的避免： 银行家算法
一次性给足所有所需资源

11. 视图
本质是虚拟表， create view  xxx at
封装select语句
12. 各种键
超键： 唯一标识+冗余
候选键： 超键无冗余
主键： 候选键中的一个选一个，真正的标识
外键： 一个表的普通属性，是另一个表的主键
13. 范式
数据库的设计遵循三个范式
第一范式： 属性的原子性
属性不可再拆分  日期：年月日可再拆为年、月、日

第二范式： 无部份依赖  
消除数据冗余
删除异常： 不同的信息放在一张表里，删除一个信息，可能会导致另一个信息被删除
空字段异常
更新异常： 因为有冗余，更新可能麻烦
非主属性需要完全依赖主属性
学号 课程号 姓名 学分 成绩
学号 课程号为主属性
姓名只依赖学号
学分只依赖课程号
成绩做到了完全依赖
因此姓名学分没有做到第二范式
怎么解决？ 拆表
学生表：学号 姓名
课程表：课程号 课程名
成绩表：学号 课程号 成绩

第三范式 无传递依赖
学号 姓名 年龄 学院名称 学院电话
![20250313174635](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313174635.png)
很多学生再同一个学院，数据冗余
-》更新异常

拆表：

14. 数据模型
层次模型
![20250313174924](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313174924.png)

网状模型
![20250313174909](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313174909.png)

关系模型 er图

15. 关系运算
并 union
SELECT * FROM account WHERE id = 1
UNION
SELECT * FROM account WHERE id = 2;

差 except
select * from account where id < 3
except
select * from account where id = 1;

笛卡尔积
![20250313175103](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250313175103.png)

投影：
projection
select id from account;   查询某个属性

连接
等值连接 在笛卡尔积的基础上
select * from student,teacher where student.id = teacher.tid;

非等值连接

左外连接  保留整个左表

右外连接  保留整个右表

