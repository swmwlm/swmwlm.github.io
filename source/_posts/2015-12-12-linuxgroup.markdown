---
layout: post
title: "linux下新增修改删除查看用户和用户组"
date: 2015-12-12 12:28:58 +0800
comments: true
categories: [Linux]
tags: [Linux]
keywords: linux, 查看用户, 用户组
description: linux下新增修改删除查看用户和用户组
---

linux下添加，删除，修改，查看用户和用户组
<!--more-->

1：创建组
groupadd test 

2：修改组，将test1组改为test2
groupmod -n test2 test1 

3，删除组
groupdel test2 

4，查看组

a，查看当前登录用户所在的组groups。
查看mysql所在组:groups mysql 

b，查看所有组cat /etc/group 

c，有的linux系统没有/etc/group文件，使用下面命令
```
cat /etc/passwd |awk -F : '{print $4}' |sort|uniq | getent group |awk -F : '{print $1}'
```
 
其中，命令getent,

可以通过组ID来查找组信息，例如：getent group mysql


二，用户操作

 
1，增加用户

useradd –-help 

2，修改用户
usermod –-help 
gpasswd –-help 
例如,修改test用户，更改家目录/home/test,并加入test2组：
usermod -d /home/test -G test2 test

将用户test加入到test2组
gpasswd -a test test2 

将用户test从test2组中移出
gpasswd -d test test2 



3，删除用户
userdel test 


4，查看用户

a，查看当前登录用户

```
[root@www ~]# w 
[root@www ~]# who 
```

b，查看自己的用户名
[root@www ~]# whoami 

c，查看单个用户信息

```
[root@www ~]# finger apacheuser 
[root@www ~]# id apacheuser 
```

d，查看用户登录记录

[root@www ~]# last 查看登录成功的用户记录
[root@www ~]# lastb 查看登录不成功的用户记录

e，查看所有用户
```
[root@www ~]# cut -d : -f 1 /etc/passwd 
[root@www ~]# cat /etc/passwd |awk -F : '{print $1}'
```
