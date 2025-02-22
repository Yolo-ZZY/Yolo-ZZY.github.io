---
title: ERPNEXT环境搭建（二）
date: ###### Tue Feb 18 11:16:08 CST 2025
tags: ERPNEXT
categories: 实习
---

# 装bench的若干包
```
bench get-app --branch version-15 erpnext https://gitee.com/ashedie/frappe

bench version # 3个了

echo vm.overcommit_memory = 1 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p # 虚拟内存防止溢出

sudo vim /etc/profile
# 添加以下内容
ulimit -SHn 65535

sudo reboot

```

# 重启后
```
cd frappe-bench

sudo bench setup production frappe   # 最后一个单词为自己的用户名

sudo -H python3 -m pip install --upgrade setuptools wheel --break-system-packages

#上两个可能报错，继续

sudo apt-get install -y ansible

sudo bench setup production frappe # 生产环境

bench new-site demo.com # 新建站点 123456

bench --site demo.com add-to-hosts

cat /etc/hosts # 检查一下

bench --site demo.com install-app erpnext

bench --site demo.com install-app zh_chinese_language

sudo supervisorctl restart all

# 在浏览器里输入虚拟机ip观察有没有成功，没有

sudo supervisorctl restart all
sudo supervisorctl status all
sudo bench setup production frappe

sudo chown -R frappe:frappe /home/frappe # 三个frappe均为用户名

chmod 751 /home/frappe 
# rwx 111 为7

# 此时打开浏览器，输入虚拟机ip，出现网页！！！ 若图片样式等有问题，浏览器中f12，看看报错，大概率assets里面东西不对，重新生成一下
bench build --force

```
![20250218193114](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250218193114.png)

至此环境搭建完成！！！

服了，vscode中ssh又断开了

# vscode中ssh断开解决方法
还好，只是重启一下虚拟机ssh，改一下主机config文件

# vscode连接虚拟机

![20250218200318](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250218200318.png)

# app 后加载的先生效
# 这是管理文件 两个site json
![20250218204529](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250218204529.png)
在某一行中添加
```
 "developer_mode":1, 
```
这之后可以修改表单类型