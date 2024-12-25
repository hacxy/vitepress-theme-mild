---
title: Nginx常用配置
date: 2024-12-18
tags:
  - nginx
---

# Nginx 常用配置

## 静态网页配置

以 `hacxy.cn` 域名为例:

```bash
sudo vim /etc/nginx/conf.d/hacxy.cn
```

写入配置, 这是一个无 ssl 证书的例子:

```text
server {
        listen                80;   #端口号
        server_name    hacxy.cn www.hacxy.cn; #站点域名

        location / {
            root   /project/production/blog/;  # web静态所在的绝对路径
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;  #该配置防止history模式下刷新跳转至404
        }
}
```

以下是有证书的配置, 免费证书如何获取可以查阅 [快速上手 acme.sh 泛解析域名](./acme.sh.md)

```text
server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name hacxy.cn www.hacxy.cn;
        ssl_certificate /etc/nginx/ssl/hacxy.cn/fullchain.cer;
        ssl_certificate_key /etc/nginx/ssl/hacxy.cn/hacxy.cn.key;
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        root /root/Projects/blog;
        location / {
                index index.html index.htm;
                try_files $uri $uri/ /index.html;
        }
}

server {
        listen       80;
        listen       [::]:80;
        root /root/Projects/blog;
        server_name   hacxy.cn  www.hacxy.cn;

        location / {
                index index.html index.htm;
                try_files $uri $uri/ /index.html;
        }
        return 301 https://$host$request_uri;
}
```

保存退出后执行:

```text
nginx -t
```

检查配置是否正确

热重载 nginx 配置文件：

```text
nginx -s reload
```

## 配置静态资源目录

有时候我们希望可以通过域名访问到一些静态资源, 如:js 脚本、图片等, 那么可以通过以下配置来实现 :

```text
server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name lib.oml2d.com;
        ssl_certificate /etc/nginx/ssl/oml2d.com/fullchain.cer;
        ssl_certificate_key /etc/nginx/ssl/oml2d.com/oml2d.com.key;
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        location / {
        	root /root/cubismSDK;
		      autoindex on;
        }
}

server {
        listen       80;
        listen       [::]:80;
        server_name   lib.oml2d.com;

        location / {
        	root /root/cubismSDK;
		      autoindex on;
        }
        return 301 https://$host$request_uri;
}

```

如果遇到跨域问题, 在 `location / {}` 中加入以下配置即可解决 :

```text
location \ {
  	add_header 'Access-Control-Allow-Origin' '*';
		add_header 'Access-Control-Allow-Credentials' 'true';
		add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
		add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
}
```

## 配置反向代理

### 无 ssl 证书的配置：

```text
server {
  listen       80;  # 目标代理端口
  server_name  cms-api.tj520.top;  # 目标代理域名

  location / {
      root   html;
      index  index.html index.htm;
      proxy_pass  http://0.0.0.0:1118;   # 服务启动的ip地址和端口

      # 以下配置方便后端服务器拿到真实的请求ip地址
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      #后端服务器可以通过X-Forwarded-For获取用户真实IP
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}


```

### 有 ssl 证书的配置

```text
server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name hitokoto.oml2d.com;

        ssl_certificate /etc/nginx/ssl/oml2d.com/fullchain.cer;
        ssl_certificate_key /etc/nginx/ssl/oml2d.com/oml2d.com.key;
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        location / {
	   proxy_pass  http://0.0.0.0:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            #后端服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}

server {
        listen       80;
        listen       [::]:80;
        root /root/Projects/oml2d-docs;
        server_name  hitokoto.oml2d.com;

        return 301 https://$host$request_uri;
}

```
