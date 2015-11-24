---
layout: post
title: "[JIRA] 最新Linux安装版本jira6.3.6安装破解以及数据导入的详细步骤"
date: 2015-11-21 18:42:49 +0800
comments: true
categories: [Linux,Java]
---



> 参考文档:[http://blog.itpub.net/26230597/viewspace-1275597/](http://blog.itpub.net/26230597/viewspace-1275597/ "参考文档")

 序言：

JIRA 是澳大利亚 Atlassian 公司开发的一款优秀的问题跟踪管理软件工具，可以对各种类型的问题进行跟踪管理，包括缺陷、任务、需求、改进等。JIRA采用J2EE技术，能够跨平台部署。它正被广泛的开源软件组织，以及全球著名的公司使用。

 

JIRA产品非常完善且功能强大，安装配置简单，多语言支持、界面十分友好，和其他系统如CVS、Subversion（SVN）、VSS、LDAP、邮件服务整合得相当好，文档齐全，可用性以及可扩展性方面都十分出色，拥有完整的用户权限管理。

<!--more-->

环境：jira软件，192.xx8.171.xx0；jira数据库，192.xx8.171.xx2。
1，下载

官网下载地址：https://www.atlassian.com/software/jira/download，只看到window下的安装版本，这个时候需要点击? All JIRA download options选项，打开linux下载页面栏选项，选择JIRA 6.3.6 (TAR.GZ Archive)进行下载。wget http://www.atlassian.com/software/jira/downloads/binary/atlassian-jira-6.3.6.tar.gz，不过下比较缓慢，可以去我的百度云网盘地址http://pan.baidu.com/s/1eQgTYKE下载。
2，安装
2.1，安装jdk环境

Linux下安装tomcat环境，参考：http://blog.csdn.net/mchdba/article/details/23769731

Linux下安装jdk环境，参考：http://blog.csdn.net/mchdba/article/details/38768513

 
2.2，建立目录

 mkdir –p /home/jira

 mv /root/atlassian-jira-6.3.6.tar.gz ./

 
2.3，解压缩安装

 tar -xvf atlassian-jira-6.3.6.tar.gz

 cd atlassian-jira-6.3.6-standalone

 因为8080端口已经被占用了，所以启动jira的时候会报错，找到server.xml，需要把默认的8080端口改成8081，大概在文件的第49行附件，修改方法如下：

#先看下8081端口是否被占用

[root@name01 conf]# lsof -i:8081

[root@name01 conf]#

[root@name01 conf]# vim /home/jira/atlassian-jira-6.3.6-standalone/conf/server.xml

#，

[root@name01 conf]# more server.xml |grep 8080

[root@name01 conf]# more server.xml |grep 8081

       

[root@name01 conf]#

 

配置jira_home

vim /home/jira/atlassian-jira-6.3.6-standalone/atlassian-jira/WEB-INF/classes/jira-application.properties

jira.home = /home/jira_home
2.4，启动jira

[root@name01 bin]# /home/jira/atlassian-jira-6.3.6-standalone/bin/start-jira.sh

To run JIRA in the foreground, start the server with start-jira.sh -fg

……

Server startup logs are located in /home/jira/atlassian-jira-6.3.6-standalone/logs/catalina.out

Using CATALINA_BASE:   /home/jira/atlassian-jira-6.3.6-standalone

Using CATALINA_HOME:   /home/jira/atlassian-jira-6.3.6-standalone

Using CATALINA_TMPDIR: /home/jira/atlassian-jira-6.3.6-standalone/temp

Using JRE_HOME:        /usr/lib/jvm/jdk1.6.0_35/jre

Using CLASSPATH:       /home/jira/atlassian-jira-6.3.6-standalone/bin/bootstrap.jar:/home/jira/atlassian-jira-6.3.6-standalone/bin/tomcat-juli.jar

Using CATALINA_PID:    /home/jira/atlassian-jira-6.3.6-standalone/work/catalina.pid

Tomcat started.

[root@name01 bin]#

看到jira所在的Tomcat容器 已经启动成功。

 

打开网址http://192.xx8.171.xxx:8081/，后台tomcat日志报错如下：

2014-9-17 18:46:02 org.apache.catalina.core.StandardServer await

严重: StandardServer.await: create[localhost:8005]:

java.net.BindException: Address already in use

       at java.net.PlainSocketImpl.socketBind(Native Method)

       at java.net.PlainSocketImpl.bind(PlainSocketImpl.java:383)

       at java.net.ServerSocket.bind(ServerSocket.java:328)

       at java.net.ServerSocket.(ServerSocket.java:194)

       at org.apache.catalina.core.StandardServer.await(StandardServer.java:427)

       at org.apache.catalina.startup.Catalina.await(Catalina.java:777)

       at org.apache.catalina.startup.Catalina.start(Catalina.java:723)

       at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)

       at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)

       at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)

       at java.lang.reflect.Method.invoke(Method.java:597)

       at org.apache.catalina.startup.Bootstrap.start(Bootstrap.java:321)

       at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:455)

2014-9-17 18:46:02 org.apache.coyote.AbstractProtocol pause

 

页面报错信息如下：

JIRA Startup Failed

Configured jira.home '/home/jira/atlassian-jira-6.3.6-standalone' must not be a parent directory of the webapp servlet path '/home/jira/atlassian-jira-6.3.6-standalone/atlassian-jira'

***************************************************************************************************************************************************************************************

Configured jira.home '/home/jira/atlassian-jira-6.3.6-standalone' must not be a parent directory of the webapp servlet path '/home/jira/atlassian-jira-6.3.6-standalone/atlassian-jira'

重新设置一下jira.home，设置成不在本jira安装软件目录下，然后重启jira服务，打开jira网址，OK了，可以看到页面如下：



3，汉化

汉化包下载地址为：http://download.csdn.net/detail/mchdba/7941381，将JIRA-Language-STD-CN.jar汉化包copy到linux的jira安装目录 ，启动的时候注意jdk版本为jdk1.6系列，/home/jira/atlassian-jira-6.3.6-standalone/atlassian-jira/WEB-INF/lib下面，之后重启jira服务

/home/jira/atlassian-jira-6.3.6-standalone/bin/shutdown.sh

/home/jira/atlassian-jira-6.3.6-standalone/bin/start-jira.sh

再打开http://192.168.171.230:8081/secure/SetupDatabase!default.jspa，就会看到如下汉化界面：



4，jira配置

先建立jira数据库以及账号密码：
mysql> CREATE DATABASE `jira636` /*!40100 DEFAULT CHARACTER SET utf8*/;


Query OK, 1 row affected (0.13 sec)

mysql> GRANT ALL ON jira636.* TO jira_user@'%' IDENTIFIED BY 'jira_user0919';

Query OK, 0 rows affected (0.38 sec)

mysql>

 

在界面配置好数据库连接信息，然后点击“下一”按钮，如下图所示：


如果报错，找不到类: com.mysql.jdbc.Driver

需要将jdbc驱动包mysql-connector-java-5.1.25-bin.jar复制到/home/jira/atlassian-jira-6.3.6-standalone/atlassian-jira/WEB-INF/lib目录下面，然后重启，有报错信息如下：

JIRA Startup Failed

org.ofbiz.core.entity.GenericDataSourceException: SQL Exception while executing the following:SELECT pluginkey, pluginenabled FROM pluginstate (Table 'jira636.pluginstate' doesn't exist)

解决办法：删除数据库配置文件dbconfig.xml，然后重新启动jira，重新配置

PS：汉化后报错，是因为汉化版本有问题，将JIRA-Language-STD-CN.jar汉化包换成JIRA-6.3.3-language-pack-zh_CN.jar新的汉化包下载地址为：

http://download.csdn.net/download/mchdba/7943421，先配置DB，如下图所示：

 


 

配置完数据库之后，在新界面录入程序标题，点击“向后”按钮

 

 

输入临时授权码，进行注册：

 

注册完之后，填写管理员账户和密码

 

之后配置邮件服务器，点击“完成”按钮，如下所示，

 

之后，JIRA安装正式完成，如下自动跳转到JIRA管理页面，如下所示：

 

 
5，破解授权

点击右上角齿轮形状的管理图标，选择“系统”，再选择“授权”，看到使用日期不到1个月，如下所示：

 

将附件中的atlassian-extras-2.2.2.jar替换你的JIRA的安装目录的\atlassian-jira\WEB-INF\lib同名jar包，破解包下载地址为：http://download.csdn.net/detail/mchdba/7950429。

 

填写授权码，授权码参数范例如下：

Description=JIRA: Commercial,

CreationDate=你的安装日期，格式（yyyy-mm-dd）,

jira.LicenseEdition=ENTERPRISE,

Evaluation=false,

jira.LicenseTypeName=COMMERCIAL,

jira.active=true,

licenseVersion=2,

MaintenanceExpiryDate=你想设置的失效日期如：2099-12-31,

Organisation=joiandjoin,

SEN=你申请到的SEN注意没有前缀LID,

ServerID=你申请到的ServerID,

jira.NumberOfUsers=-1,

LicenseID=LID你申请到的SEN，注意LID前缀不要丢掉,

LicenseExpiryDate=你想设置的失效日期如：2099-12-31,

PurchaseDate=你的安装日期，格式（yyyy-mm-dd）

 

本次安装授权码实例为：

Description=JIRA: Commercial,

CreationDate=2014-09-20,

jira.LicenseEdition=ENTERPRISE,

Evaluation=false,

jira.LicenseTypeName=COMMERCIAL,

jira.active=true,

licenseVersion=2,

MaintenanceExpiryDate=2099-12-31,

Organisation=pl,

SEN=SEN-L4572887,

ServerID=BPT3-4QRK-FCRR-HEP3,

jira.NumberOfUsers=-1,

LicenseID=AAABBw0ODAoPeNptkFtLxDAQhd/zKwI+R9Kwy66FPKxthGhvtF0p4kuso0a6sUwvuP/edissyj4MD

HPOfHOYqzu0tICWeoJy4a+FzzkNwpIK7q1ICF2Ntu3tl5P3Ot89+1SNphnMPCEBwqkJTQ9y9jN+w

zxBPi2a68jW4DpQr/a0rZJS5VmuC0XOBNnjAH/s5bGFxBxABmkcqzzQu2jRTd3bEZaFZvE+AnYzR

JDYWNeDM64G9d1aPJ4TeXxOlOK7cbZbjrbNgkyGwwtg+rbvJpBkHikAR0Adytt0XzFV7R5Y+qQzV

kWZIoVK5FQsWq03YrvdkN/Ekz3S4SXlcpRswPrDdPD/aT+P1nzDMC0CFQCM9+0LlHVNnZQnSTwuR

O3eK+2gVgIUCteTs4Q3khIgrnsY64hxYB/d8bM=X02dh,

LicenseExpiryDate=2099-12-31,

PurchaseDate=2014-09-20

 

将以上授权码信息填入授权码输入框，点击“增加”按钮，如下所示：

之后，看到授权信息更新了，就表示破解成功，会看到如下成功信息, 如下图：

 

 

 
6，恢复数据

 

输入授权码：

AAABBw0ODAoPeNptkFtLxDAQhd/zKwI+R9Kwy66FPKxthGhvtF0p4kuso0a6sUwvuP/edissyj4MD

HPOfHOYqzu0tICWeoJy4a+FzzkNwpIK7q1ICF2Ntu3tl5P3Ot89+1SNphnMPCEBwqkJTQ9y9jN+w

zxBPi2a68jW4DpQr/a0rZJS5VmuC0XOBNnjAH/s5bGFxBxABmkcqzzQu2jRTd3bEZaFZvE+AnYzR

JDYWNeDM64G9d1aPJ4TeXxOlOK7cbZbjrbNgkyGwwtg+rbvJpBkHikAR0Adytt0XzFV7R5Y+qQzV

kWZIoVK5FQsWq03YrvdkN/Ekz3S4SXlcpRswPrDdPD/aT+P1nzDMC0CFQCM9+0LlHVNnZQnSTwuR

O3eK+2gVgIUCteTs4Q3khIgrnsY64hxYB/d8bM=X02dh

点击恢复，开始恢复数据，如下所示：

 

Linux下24M的jira数据文件导入很快，4分钟导入完毕，如下所示：

 

如果导入报错：

解析文件时发生错误。你的导入文件不正确。 可能是由于文件中含有旧版本的CDATA (http://jira.atlassian.com/browse/JRA-4980)。 异常错误 org.xml.sax.SAXParseException; lineNumber: 168270; columnNumber: 16; XML document structures must start and end within the same entity.

 

解决办法：选择Disable按钮而不选择Enable按钮，如下所示：

 

 此致，JIRA最新Linux版本6.3.6安装破解以及数据迁移，成功完毕。 