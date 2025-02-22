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
   //友情提示不要用校园网nmmp

5. 修改root密码
```
sudo passwd root
```

1. 换源
```
sudo vim /etc/apt/sources.list.d/ubuntu.sources



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
sudo apt-get install -y git 
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
alias python=python3

# 修改pip源
mkdir ~/.pip 
sudo vim ~/.pip/pip.conf

[global] 
timeout = 120 
index-url = https://mirrors.aliyun.com/pypi/simple/ 
[install] 
trusted-host=mirrors.aliyun.com

sudo mkdir /root/.pip 
sudo cp ~/.pip/pip.conf /root/.pip 



node -v
#
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

source ~/.bashrc  # 激活远程的终端
#####################
vim ~/bash_profile

# Load .bashrc if it exists
if [ -f "$HOME/.bashrc" ]; then
    . "$HOME/.bashrc"
fi

# Load NVM
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
fi

# Optionally, automatically use the default node version
nvm use default > /dev/null 2>&1


source ~/.bash_profile # 激活本地的终端

nvm install 22

redis-server -v # 缓存数据库，7.0.15版本



wkhtmltopdf -V # 将html转换为pdf
# 网盘中的包上传
mkdir tools
cd ~/tools
sudo apt-get install -f
sudo apt --fix-broken install

# 首先，确认 wkhtmltopdf 是否已成功安装

dpkg -l | grep wkhtmltox

# 查找 wkhtmltopdf 的安装路径
whereis wkhtmltopdf

# 如果找到了 wkhtmltopdf 的实际路径，但不在 /usr/bin/ 中，可以通过创建符号链接来解决问题。例如，假设找到的实际路径是 /usr/local/bin/wkhtmltopdf，你可以创建一个符号链接
sudo ln -s /usr/local/bin/wkhtmltopdf /usr/bin/wkhtmltopdf

#安装字体
sudo apt-get  install -y ttf-wqy-zenhei ttf-wqy-microhei

yarn -v
# yarn的安装如下，前提npm的安装





npm install -g yarn@1.22.22

vim ~/.bashrc
vim ~/.bash_profile

添加
# Add npm global packages to PATH
export PATH="$HOME/.npm-global/bin:$PATH"

激活
source ~/.bashrc  # 如果你编辑的是 .bashrc
# 或者
source ~/.bash_profile  # 如果你编辑的是 .bash_profile

yarn config set registry https://registry.npmmirror.com 


mysql -v # 10.11.8
sudo apt-get install -y mariadb-server mariadb-client

sudo vim /etc/mysql/conf.d/mysql.cnf

添加
default-character-set=utf8mb4
# 字符集密码格式

sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf
# 添加
character-set-server=utf8mb4(这个本来有)
collation-server=utf8mb4_general_ci(这个本来也有)
character-set-client-handshake=FALSE

还有一个conf文件
sudo vim /etc/mysql/mariadb.conf.d/50-client.cnf 
# 以后可能会改，现在不用动

重启
service mysql restart


(vim查找模式：/)

```

14. sql设置初始化
```
sudo mysql_secure_installation
# mariadb 的root密码,这里直接按一下回车
# unix socket认证 这里 n
# 改密码？ y
# 删除匿名用户？ y
# 不允许root远程登录？ y（这个项目是y）
# 删除test数据库？ y
# 重新加载 y

重启服务
sudo service mysql restart

sudo mysql -u root -p # 输入密码 刚才root数据库密码

SHOW VARIABLES WHERE Variable_name LIKE 'character_set_%' OR Variable_name LIKE 'collation%';  # 查看字符集

use mysql;

grant all privileges on *.* to 'root'@'%' identified by 'frappe';
grant all privileges on *.* to root@'%' identified by 'frappe' WITH GRANT OPTION;
grant all privileges on *.* to root@'localhost' identified by 'frappe' WITH GRANT OPTION; # 添加root权限



flush privileges; # 刷新权限
quit;
sudo service mysql restart

```

15. bench
```
sudo -H pip3 install --upgrade frappe-bench --break-system-packages

bench --version

bench init --verbose --frappe-branch version-15 frappe-bench --frappe-path=https://gitee.com/mirrors/frappe




sudo apt install python3.12-venv

cd frappe-bench

bench get-app --branch version-15 erpnext https://gitee.com/ashedie/erpnext

bench version # 看到一个frappe一个erpnext就好了

```

16. 