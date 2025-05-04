---
title: 安装SDN网络数据中心环境
date: ###### Fri Mar 28 17:13:49 CST 2025
tags: 
- SDN
- 数据中心
- 网络
- 深度学习
- 毕设
categories: 毕业设计
---
# 失败安装
## 1. 虚拟机ubuntu16.04
https://blog.csdn.net/trackxiaoxin321/article/details/115591796
1. http://mirrors.ustc.edu.cn/ubuntu-releases/16.04/         desktop
2. 分配cpu一般为本机一半
3. 主机与ubuntu之间复制粘贴
sudo apt-get install open-vm-tools-desktop -y 
重启
## 2. 配置mininet
```
sudo passwd root
su root
apt-get install git
git clone https://github.com/mininet/mininet.git
cd mininet
cd util
./install.sh -n3v
mn                          // 测试
pingall
exit
```
## 3. RYU安装
```
wget https://bootstrap.pypa.io/get-pip.py       //https://blog.csdn.net/m0_46176760/article/details/118717366?utm_source=app&app_version=4.11.0

python3 get-pip.py.2

cd /home/zzy

git clone https://github.com/osrg/ryu.git

cd ryu

pip install -r tools/pip-requires

python3 setup.py install

cd ryu/app

ryu-manager example_switch_13.py                 //测试

mn  --controller=remote                         //另一个终端里，控制器
pingall


```

# 20.04

## 1.vmware workstation安装ubuntu无法显示继续、下一步按钮
![20250401160737](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250401160737.png)
增加github域名
/etc/hosts
## 2. 配置mininet
```
sudo passwd root
su root
apt-get install git
git clone https://github.com/mininet/mininet.git
cd mininet
cd util
./install.sh -n3v
mn                          // 测试
pingall
exit
```
## 3. RYU安装
```
wget https://bootstrap.pypa.io/get-pip.py       //https://blog.csdn.net/m0_46176760/article/details/118717366?utm_source=app&app_version=4.11.0

python3 get-pip.py.2

cd /home/zzy

git clone https://github.com/osrg/ryu.git

cd ryu

pip install -r tools/pip-requires

python3 setup.py install

cd ryu/app

ryu-manager example_switch_13.py                 //测试

mn  --controller=remote                         //另一个终端里，控制器
pingall


```

## 可视化
```
cd /home/zzy/mininet

cd examples 

ls

./miniedit.py

python3 miniedit.py
```