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
cd /home/zzy/mininet/examples



ls

python3 ./miniedit.py

python3 miniedit.py
```


## 建拓扑
https://blog.csdn.net/qq_59718828/article/details/127404912#:~:text=%E6%9C%AC%E6%96%87%E8%AF%A6%E7%BB%86%E4%BB%8B%E7%BB%8D%E4%BA%86%E9%80%9A%E8%BF%87%E5%91%BD%E4%BB%A4%E8%A1%8C%E3%80%81%E5%9B%BE%E5%BD%A2%E7%95%8C%E9%9D%A2%E5%92%8CPython%E8%84%9A%E6%9C%AC%E4%B8%89%E7%A7%8D%E6%96%B9%E5%BC%8F%E5%88%A9%E7%94%A8Mininet%E5%88%9B%E5%BB%BA%E7%BD%91%E7%BB%9C%E6%8B%93%E6%89%91%EF%BC%8C%E5%B9%B6%E7%BB%93%E5%90%88Ryu%E6%8E%A7%E5%88%B6%E5%99%A8%E8%BF%9B%E8%A1%8C%E7%BB%88%E7%AB%AF%E9%80%9A%E4%BF%A1%E7%9A%84%E6%AD%A5%E9%AA%A4%E3%80%82%20%E6%AF%8F%E7%A7%8D%E6%96%B9%E6%B3%95%E9%83%BD%E5%8C%85%E6%8B%AC%E5%85%B7%E4%BD%93%E7%9A%84%E6%93%8D%E4%BD%9C%E8%BF%87%E7%A8%8B%E5%92%8C%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%EF%BC%8C%E7%89%B9%E5%88%AB%E5%BC%BA%E8%B0%83%E4%BA%86%E6%8E%A7%E5%88%B6%E5%99%A8%E7%9A%84%E5%BC%80%E5%90%AF%E9%A1%BA%E5%BA%8F%E5%92%8C%E5%9B%BE%E5%BD%A2%E7%95%8C%E9%9D%A2%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E6%B3%95%E3%80%82%20%E6%9C%80%E5%90%8E%EF%BC%8C%E8%BF%98%E6%8F%90%E4%BE%9B%E4%BA%86%E9%80%9A%E8%BF%87%E4%BF%AE%E6%94%B9%E4%BF%9D%E5%AD%98%E7%9A%84Python%E8%84%9A%E6%9C%AC%E6%9D%A5%E5%BF%AB%E9%80%9F%E6%9E%84%E5%BB%BA%E6%8B%93%E6%89%91%E7%9A%84%E6%96%B9%E6%B3%95%E3%80%82%20%E6%91%98%E8%A6%81%E7%94%9F%E6%88%90%E4%BA%8E%20C%E7%9F%A5%E9%81%93,%EF%BC%8C%E7%94%B1%20DeepSeek-R1%20%E6%BB%A1%E8%A1%80%E7%89%88%E6%94%AF%E6%8C%81%EF%BC%8C%20%E5%89%8D%E5%BE%80%E4%BD%93%E9%AA%8C%20%3E

https://blog.csdn.net/2401_83340955/article/details/143267522

![20250410152529](https://cdn.jsdelivr.net/gh/Yolo-ZZY/Image/20250410152529.png)

将miniedit.py文件的1444行的loadedTopology = self.convertJsonUnicode(json.load(f))

改成
```
loadedTopology = json.load(f)
```

.mn文件中把startcli 改为1

