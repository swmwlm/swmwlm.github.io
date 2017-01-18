---
layout: post
title: "使用JWT来做后台认证api支撑（jwt-authentication-api）"
date: 2017-01-18 11:08:58 +0800
comments: true
categories: [jwt]
tags: [java]
keywords: jwt,java,token
description: 使用JWT生成token来做移动端后台认证
---
为移动端api做认证时，通过token的方式来做认证。使用jwt规范，具体实现如（[请参考java-jwt文档](https://github.com/auth0/java-jwt)）；
总体流程：用户登录后，签发token给客户端，并保存该token到缓存jwtCache中，客户端每次访问api时，请求头中带token过来，判断该token是否是签发过的token，若是运行访问，不是，则拒绝访问；

<!--more-->

	遇到的问题：

			1.单使用jwt，当到过期时间时，用户继续访问会被强制性退出。
			2.当用户在web端修改了用户密码，或者禁止用户登录，怎样判定该token失效，让用户退出登录；

	解决方法：	

			1.与ehcache集成，设定缓存的失效时间与过期存活时间。
			2.用户修改密码或者禁止登录时，对该用户的jwtCache缓存进行清除；拦截器中判定该token是否存在 于缓存该用户的集合中，若存在，则有效，不存在则无效，退出登录；

##1. 登录成功，生成token:

	1.1 token中payload的自定义数据为（userId，签发日期,随机数），随机数是为了同一用户在不同设备同时登录时（或者并发之类），使得签发的token做唯一性处理；

	1.2 secret定义为配置文件的jwtSecret:uuid；

	1.3 把生成的token存放在缓存jwtCache中；其中jwtCache缓存定义的过期时间为十四天，过期还可以存活的时间设置为半小时；缓存存放时以userId为key，value值为Set<String>类型的token集合；

	1.4 把生成的 token 返回给客户端调用者；

##2. 当用户的密码被修改或者loginFlag=0，从jwtCache缓存中清除该userId对应的值；

##3. 拦截器校验token是否有效；我们说登录成功后，签发出去的token都是永久可校验通过的；

```
try{
    	3.1 获取客户端请求过来的token=request.getHeader("token");

    	3.2 校验token（JWT jwt = verifier.verify(token)）;

    		3.2.1 获取当前token中的userId,签发日期；
    				Set<String> tokens=jwtCache.get(userId);
    				判断当前用户所签发的所有tokens中是否存在该token，若不存在，表示该token已过期失效，禁止访问api；

    		3.2.2 若存在该token，表示该token未过期，允许访问api；

	}catch(JWTVerificationException e){
	------------------------
		3.3 INVALID:校验失败的token，禁止继续访问api
	}
```

