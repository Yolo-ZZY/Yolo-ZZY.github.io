---
title: nginx配置ssl
date: ###### Mon Jun 2 22:48:25 CST 2025
tags: 
- nginx
- ssl
- linux
categories: 搭建个人博客
cover: 
---

# nginx配置ssl
参考博客
> https://www.cnblogs.com/ambition26/p/14077773.html

# Nginx的ssl模块安装
在配置ssl证书之前，要确保你的nginx已经安装了ssl模块，一般情况下自己安装的nginx都是不存在ssl模块的。
这里先检查下自己是否存在ssl模块：

进入到你的nginx安装目录下面，我的目录是在（/usr/local/nginx），如果你的nginx安装步骤和上面的文章一致的话，那你的目录和我应该是一致的
进入到目录的sbin目录下，输入

``` shell
#注意这里是大写的V，小写的只显示版本号
./nginx -V  

```
如果出现 (configure arguments: --with-http_ssl_module), 则已安装
一般是无

接下来安装ssl模块
进入到你的解压缩后的nginx目录，注意这里不是nginx安装目录！！，是解压缩后的目录，我的是在（.../nginx-1.17.9），进入目录后，输入
```
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
```

接下来执行

``
make
#切记不要执行make install，否则会重新安装nginx
```

这里由于我的nginx版本较老，而openssl版本较新，编译出了一些问题
1. 手动安装 OpenSSL 1.1.1
```
# 下载 OpenSSL 1.1.1 源码（以 1.1.1w 为例）
cd /usr/local/src
sudo wget https://www.openssl.org/source/old/1.1.1/openssl-1.1.1w.tar.gz
sudo tar -zxvf openssl-1.1.1w.tar.gz
cd openssl-1.1.1w

# 编译安装到 /usr/local/openssl-1.1.1
sudo ./config --prefix=/usr/local/openssl-1.1.1 --openssldir=/usr/local/openssl-1.1.1 shared zlib
sudo make -j$(nproc)
sudo make install
```

2. 重新配置 Nginx 使用 OpenSSL 1.1.1
```
cd /usr/local/nginx-1.17.9

# 清除之前的 configure 结果（如有）
make clean

# 配置 Nginx 使用你刚刚安装的 OpenSSL 1.1.1
./configure \
--with-http_ssl_module \
--with-openssl=/usr/local/src/openssl-1.1.1 \
--with-cc-opt="-I/usr/local/openssl-1.1.1/include" \
--with-ld-opt="-L/usr/local/openssl-1.1.1/lib"

# 编译
make

# 安装（可选）
sudo make install

``` 
这里可能路径有些问题，一个是编译后的一个是源码解压后的，自己看一下试一下


上述操作执行完成以后，你的目录下会出现objs文件夹，文件夹内存在nginx文件
接下来使用新的nginx文件替换掉之前安装目录sbin下的nginx
成功之后，进入到nginx安装目录下，查看ssl时候成功
```
#注意这里是大写的V，小写的只显示版本号，这里替换后在执行 -V命令如果提示权限不足，先给这个nginx文件提升下权限   chmod 111 nginx
./nginx -V  
#可以看到这里出现了configure arguments: --with-http_ssl_module   证明已经安装成功

```


# 配置ssl证书
解压缩下载好的证书（证书一般是pem文件和key文件，这里名字可以随便改）

将下载好的证书上上传到服务器，我将证书放在了root目录下的card文件夹，主要是key和pem文件 
```
#在root目录下创建card文件夹
cd /root
mkdir card


```

# 进行nginx.conf配置
```
cd /usr/locla/nginx/conf
#修改nginx.conf文件
vim nginx.conf

```
主要改下面https

```


#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;
	

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /home/www/website;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /home/www/website;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server

    server {
        listen       443 ssl;
        server_name  localhost;

        ssl_certificate      /root/card/yolozzy.online_nginx/yolozzy.online_bundle.pem;
	
        ssl_certificate_key  /root/card/yolozzy.online_nginx/yolozzy.online.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

        location / {
            root   /home/www/website;
            index  index.html index.htm;
        }
    }

}

```

# 重启nginx
```
./nginx -s reload
./nginx -s stop
./nginx 


```
