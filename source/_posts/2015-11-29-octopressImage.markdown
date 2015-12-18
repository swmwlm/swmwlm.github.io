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

>4.1.imagepop plugin
这是一个添加图片的插件，可以按照比例缩放图片，点击图片可以查看原图，项目地址在[imgpop](https://bitbucket.org/fudanchii/imgpop/src/2fc043b1713e5de401edb0eea8639502bcc250a8?at=default)
这里重复一下安装过程：
在octopress/Gemfile中添加以下代码，就可以得到相应依赖：

    gem 'erubis'
    gem 'mini_magick'

    运行bundle install,安装相应依赖 将开源项目中的_style.scss中的内容添加到octopress/sass/custom/_styles.scss中 
    将开源项目中plugins中的两个文件复制octopress/plugins文件夹下 
    将开源项目中的imgpop.js文件复制octopress/source/javascripts文件夹下 
    文件引用图片的方式为：{ % imgpop /images/awesomeimage.jpg 50% center Awesome image taken hundred years ago. % }，去除{ %之间的空格。
    过程中出现的问题记录：
    ***利用Chocolatey 安装imagemagick ，命令为：choco install imagemagick 
    ***修改img_popup.rb中的safe_wrap(@template.result(vars))为TemplateWrapper.safe_wrap(@template.result(vars))
    ***如果jquery版本比较高，需要修改jquery.live方法为jquery.on


5.视频
{% video http://static-jkxy.qiniudn.com/event/jkxy_profile20150318.mp4 640 320 http://www.mincoder.com/images/201442/rUCWqfipDv3U7zYH.png %}