---
layout: post
title: "octopress博客加入代码、图片、带标题图片方法"
date: 2015-11-29 19:04:58 +0800
comments: true
categories: [Octopress]
tags: [OctoPress]
keywords: octopress, 图片, 代码
description: octopress博客加入代码、图片、带标题图片方法
---

用Octopress写博客时，经常使用的方法，用以插入代码片段、图片：
<!--more-->

1：插入代码[language] [title] [url] [link text]

```java Hello World http://baidu.com 更多
public static void main(String[] args){
	System.out.println("Hello World");
}

```

{% codeblock title lang:java url link text %}
code snippet
{% endcodeblock %}

2：增加引用
>引用

3：增加链接
[测试链接](http://www.baidu.com/)

4.图片
![图片属性](http://www.mincoder.com/images/201442/rUCWqfipDv3U7zYH.png)

博客中引用图片
在路径D:\octopress\source\images里面保存对应的图像，在文章中引用
{% img /images/pic.png %}  


5.视频
{% video http://static-jkxy.qiniudn.com/event/jkxy_profile20150318.mp4 640 320 http://www.mincoder.com/images/201442/rUCWqfipDv3U7zYH.png %}