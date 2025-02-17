---
title: ERPNEXT环境搭建
date: ###### Mon Feb 17 16:32:05 CST 2025
tags: 
- ERPNEXT
- 虚拟机
categories: 实习
---
# ERPNEXT环境搭建
## 配置虚拟机环境
1. 修改网络配置文件
```
sudo vim /etc/netplan/50-cloud-init.yaml
```
内容为
```
network:
    ethernets:
          ens33:
            addresses: [192.168.8.98/24] # 注意缩进，：后有空格
            dhcp4: no   # 自动获取ip，no就是静态
            routes:
                 - to: default
                   via: 192.168.8.1 # 设置默认网关,注意与本机ip对应
            dhcp6: no
            nameservers:
                 addresses: [114.114.114.114,8.8.8.8,4.4.4.4]
                 # 设置DNS服务器
    version: 2

```
2. 重启网络服务
```
sudo netplan apply
```
3. 重启ssh
```
service sshd start

```
4. 只要主机能够ping通虚拟机，就意味着可以不用再vmware黑框框里操作了

5. 修改root密码
```
sudo passwd root
```

6. 换源
```
vim /etc/apt/sources.list.d/ubuntu.sources



Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

```

7. 更新apt
```
sudo apt update
```

8. 更改时区
```
tzselect
```
9. 修改host
```
sudo vim /etc/hosts # 域名解析140.82.113.4 gitHub.com
```
10. 修改字符编码
```
locale
export LC_ALL=C.UTF-8
```

11. 安装
```
sudo apt-get install -y git curl
curl --version
sudo service cron start
```

12. 查看服务器状态
```
htop
```

13. 查看python等工具
```
python3 -V
pip3 -V
node -V
redis-server -V
wkhtmltopdf -V
yarn -v
mysql -v
```

