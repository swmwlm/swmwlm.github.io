---
layout: post
title: "使用tengine DSO 来动态编译安装第三方模块（Lua-nginx-module）"
date: 2015-12-30 14:28:58 +0800
comments: true
categories: [nginx]
tags: [nginx,tengine]
keywords: nginx,tengine,lua
description: 使用tengine DSO 来动态编译安装第三方模块
---
在使用nginx时，需要增加或者改动一个模块，都需要重新编译nginx文件。最近使用了tengine，它提供的DSO工具来动态加载模块。本例测试需要动态增加lua-nginx模块，记录一下安装过程。

<!--more-->


##1. 编译安装 luajit

Lua 环境推荐使用成熟快速的 luajit。


```
cd /root/Download/
wget http://luajit.org/download/LuaJIT-2.0.4.tar.gz
tar zxvf LuaJIT-2.0.4.tar.gz
cd /root/Downloads/LuaJIT-2.0.4
make && make install PREFIX=/usr/local/luajit-2.0.4

```

##2. 设置环境变量：


```
# tell nginx's build system where to find LuaJIT 2.0:
export LUAJIT_LIB=/usr/local/luajit-2.0.4/lib
export LUAJIT_INC=/usr/local/luajit-2.0.4/include/luajit-2.0
```

##3. 你能够使用dso_tool(在Nginx安装目录的sbin下)这个工具来编译第三方模块 lua-nginx-module.


```
cd /root/Download/
wget --no-check-certificate https://github.com/openresty/lua-nginx-module/archive/v0.9.19.tar.gz
tar zxvf v0.9.19.tar.gz 
cd /usr/local/tengine/sbin/
./dso_tool --add-module=/root/Downloads/LuaJIT-2.0.4
```

##4. 编译成功时，如下图

{% imgpop /images/tengine/tengine-lua-success.png 100% center lua安装成功. %}

##5. 设置动态库


```
echo '/usr/local/luajit-2.0.4/lib'>>/etc/ld.so.conf.d/usr_local_luajit_lib.conf 
ldconfig
```

##6. 配置tengine的配置文件，动态加载模块，如下图所示：

{% imgpop /images/tengine/tengine-lua-config-dso.png 100% center lua配置. %}

使用./nginx -t 测试配置文件是否通过。提示成功，则打开浏览器访问/lua路径，测试第三方模块lua-nginx-module是否正常。

