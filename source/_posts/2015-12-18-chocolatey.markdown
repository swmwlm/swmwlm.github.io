---
layout: post
title: "利用Chocolatey快速在Windows下搭建一个开发环境"
date: 2015-12-18 15:28:58 +0800
comments: true
categories: [Windows]
tags: [Windows,chocolatey]
keywords: choco install, chocolatey
description: 利用choco快速在Windows下搭建一个开发环境
---

在 Linux 下，可以使用 apt-get或者yum 来安装应用程序，在 windows 下，现在可以使用 Chocolatey 来载搭建一个开发环境。
<!--more-->
Chocolatey NuGet is a Machine Package Manager, somewhat like apt-get, but built with Windows in mind.

注： Chocolatey 只是把官方下载路径封装到了 Chocolatey 中，所以下载源都是其官方路径，所以下载的一定是合法的，但是如果原软件是需要 Licence 注册的话，那么 Chocolatey 下载安装好的软件还是需要你去购买注册。不过 Chocolatey 一般还是会选用免费 Licence 可用的软件。

**如何安装**： 具体参见 [Chocolatey主页](https://chocolatey.org/) ，就现在 （2015-12-18） 的安装方式如下：

	@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

安装软命令 choco install, 短写是 cinst

可安装的应用程序，可以参见其 [Package 列表](https://chocolatey.org/packages)

安装 git

	choco install git.install 

安装 node

	choco install nodejs.install 

安装 Microsoft Visual C++ 2010 Redistributable Package

	choco install nodejs.install 

安装 vagrant

	choco install vagrant

安装 virtual box

	choco install virtualbox 

安装编辑器 notepad++/atom/sublime （另外还有各种IDE，不列出了）

	choco install notepadplusplus.install
	choco install Atom
	choco install SublimeText3 

安装 Ruby

	choco install ruby

安装 Python

	choco install python

另外，如果要搭建一个本地的CI系统，可以下载Java环境和Jenkins

安装 Java JDK7 或 JDK8

	choco install jdk7 

或

	choco install jdk8 

安装 Jenkins

	choco install jenkins 

这样基本上就可以建立一个强大开发环境了，包含了基本上所有的命令行语言运行环境，构建依赖库，Vagrant， 编辑器， virtual box 以及一个 强大 CI 系统。 其他应用可以根据自己需要从 Package 列表中寻找。