---
layout: post
title: "octopress写博客常用加入代码、图片、带标题图片方法"
date: 2015-11-29 19:04:58 +0800
comments: true
categories: [Octopress]
tags: [OctoPress]
keywords: octopress, 图片, 代码
description: octopress博客加入代码、图片、带标题图片方法
---

用Octopress写博客时，经常使用的方法，用以插入代码片段、图片：
<!--more-->

>[请参考MarkDown文档](http://wowubuntu.com/markdown/#autoescape)

1：插入代码[language] [title] [url] [link text]

```java Hello World http://baidu.com 更多
public static void main(String[] args){
	System.out.println("Hello World");
}

```

{% codeblock title lang:java url link text %}
code snippet
{% endcodeblock %}


>注意：当上面方式报错时，需要Pygments安装

    安装 Python
        1.前往 http://www.python.org/download/
        2.下载合适的 Python windows 安装包，如 Python 2.7.6 Windows Installer。 请注意，Python 2 可能会更合适，因为暂时 Python 3 可能不会正常工作。
        3.安装
        4.添加安装路径 (如： C:\Python27) 至 PATH。(如何操作? 请参见 故障诊断 #1)
        5.检验 Python 安装是否成功
        python –V
        输出示例：
        Python 2.7.6

    安装 ‘Easy Install’
        1.浏览https://pypi.python.org/pypi/setuptools#installation-instructions来查看详细的安装指南。
        2.对于 Windows 7 的机器，下载 ez_setup.py 并保存，例如，至C:\。 然后从命令行使用 Python 运行此文件：
        python “C:\ez_setup.py”
        3.添加 ‘Python Scripts’ 路径 (如： C:\Python27\Scripts) 至 PATH

    安装 Pygments
        1.确保 easy_install 已经正确安装
        easy_install --version
        输出示例：
        setuptools 3.1
        2.使用 “easy_install” 来安装 Pygments:
        easy_install Pygments

2：增加引用
>引用

3：增加链接
[测试链接](http://www.baidu.com/)

4.图片
![图片属性](http://www.mincoder.com/images/201442/rUCWqfipDv3U7zYH.png)

博客中引用图片
在路径D:\octopress\source\images里面保存对应的图像，在文章中引用
{ % img /images/email.png % },注意，去除{ % 中间的空格


5.视频
{% video http://static-jkxy.qiniudn.com/event/jkxy_profile20150318.mp4 640 320 http://www.mincoder.com/images/201442/rUCWqfipDv3U7zYH.png %}