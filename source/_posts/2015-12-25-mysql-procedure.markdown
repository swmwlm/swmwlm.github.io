---
layout: post
title: "MySQL数据库存储过程动态表建立"
date: 2015-12-25 14:28:58 +0800
comments: true
categories: [mysql]
tags: [mysql,procedure]
keywords: create procedure, 创建存储过程临时表
description: MySQL数据库存储过程动态表建立
---
##1. 存储过程简介

　　我们常用的操作数据库语言SQL语句在执行的时候需要要先编译，然后执行，而存储过程（Stored Procedure）是一组为了完成特定功能的SQL语句集，经编译后存储在数据库中，用户通过指定存储过程的名字并给定参数（如果该存储过程带有参数）来调用执行它。

<!--more-->

　　一个存储过程是一个可编程的函数，它在数据库中创建并保存。它可以有SQL语句和一些特殊的控制结构组成。当希望在不同的应用程序或平台上执行相同的函数，或者封装特定功能时，存储过程是非常有用的。数据库中的存储过程可以看做是对编程中面向对象方法的模拟。它允许控制数据的访问方式。

　　存储过程通常有以下优点：

　　　　(1).存储过程增强了SQL语言的功能和灵活性。存储过程可以用流控制语句编写，有很强的灵活性，可以完成复杂的判断和较复杂的运算。

　　　　(2).存储过程允许标准组件是编程。存储过程被创建后，可以在程序中被多次调用，而不必重新编写该存储过程的SQL语句。而且数据库专业人员可以随时对存储过程进行修改，对应用程序源代码毫无影响。

　　　　(3).存储过程能实现较快的执行速度。如果某一操作包含大量的Transaction-SQL代码或分别被多次执行，那么存储过程要比批处理的执行速度快很多。因为存储过程是预编译的。在首次运行一个存储过程时查询，优化器对其进行分析优化，并且给出最终被存储在系统表中的执行计划。而批处理的Transaction-SQL语句在每次运行时都要进行编译和优化，速度相对要慢一些。

　　　　(4).存储过程能过减少网络流量。针对同一个数据库对象的操作（如查询、修改），如果这一操作所涉及的Transaction-SQL语句被组织程存储过程，那么当在客户计算机上调用该存储过程时，网络中传送的只是该调用语句，从而大大增加了网络流量并降低了网络负载。

　　　　(5).存储过程可被作为一种安全机制来充分利用。系统管理员通过执行某一存储过程的权限进行限制，能够实现对相应的数据的访问权限的限制，避免了非授权用户对数据的访问，保证了数据的安全。


##2. 关于MySQL的存储过程
　　存储过程是数据库存储的一个重要的功能，但是MySQL在5.0以前并不支持存储过程，这使得MySQL在应用上大打折扣。好在MySQL 5.0终于开始已经支持存储过程，这样即可以大大提高数据库的处理速度，同时也可以提高数据库编程的灵活性。

##3. MySQL存储过程的创建
###(1). 格式

　　MySQL存储过程创建的格式：CREATE PROCEDURE 过程名 ([过程参数[,...]])
[特性 ...] 过程体

这里先举个例子：
   
    mysql> DELIMITER //  
    mysql> CREATE PROCEDURE proc1(OUT s int)  
        -> BEGIN 
        -> SELECT COUNT(*) INTO s FROM user;  
        -> END 
        -> //  
    mysql> DELIMITER ; 

注：（1）这里需要注意的是DELIMITER //和DELIMITER ;两句，DELIMITER是分割符的意思，因为MySQL默认以";"为分隔符，如果我们没有声明分割符，那么编译器会把存储过程当成SQL语句进行处理，则存储过程的编译过程会报错，所以要事先用DELIMITER关键字申明当前段分隔符，这样MySQL才会将";"当做存储过程中的代码，不会执行这些代码，用完了之后要把分隔符还原。

　　（2）存储过程根据需要可能会有输入、输出、输入输出参数，这里有一个输出参数s，类型是int型，如果有多个参数用","分割开。

　　（3）过程体的开始与结束使用BEGIN与END进行标识。

这样，我们的一个MySQL存储过程就完成了，是不是很容易呢?看不懂也没关系，接下来，我们详细的讲解。

###(2). 声明分割符

 
其实，关于声明分割符，上面的注解已经写得很清楚，不需要多说，只是稍微要注意一点的是：如果是用MySQL的Administrator管理工具时，可以直接创建，不再需要声明。

###(3). 参数

　　MySQL存储过程的参数用在存储过程的定义，共有三种参数类型,IN,OUT,INOUT,形式如：
	
	CREATE PROCEDURE([[IN |OUT |INOUT ] 参数名 数据类形...])

　　IN 输入参数:表示该参数的值必须在调用存储过程时指定，在存储过程中修改该参数的值不能被返回，为默认值

　　OUT 输出参数:该值可在存储过程内部被改变，并可返回

　　INOUT 输入输出参数:调用时指定，并且可被改变和返回

####Ⅰ. IN参数例子

创建:

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE demo_in_parameter(IN p_in int)  
    -> BEGIN   
    -> SELECT p_in;   
    -> SET p_in=2;   
    -> SELECT p_in;   
    -> END;   
    -> //  
    mysql > DELIMITER ; 


执行结果:

    mysql > SET @p_in=1;  
    mysql > CALL demo_in_parameter(@p_in);  
    +------+  
    | p_in |  
    +------+  
    |   1  |   
    +------+  
     
    +------+  
    | p_in |  
    +------+  
    |   2  |   
    +------+  
     
    mysql> SELECT @p_in;  
    +-------+  
    | @p_in |  
    +-------+  
    |  1    |  
    +-------+  


以上可以看出，p_in虽然在存储过程中被修改，但并不影响@p_id的值

 

####Ⅱ.OUT参数例子

创建:

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE demo_out_parameter(OUT p_out int)  
    -> BEGIN 
    -> SELECT p_out;  
    -> SET p_out=2;  
    -> SELECT p_out;  
    -> END;  
    -> //  
    mysql > DELIMITER ; 


执行结果:

    mysql > SET @p_out=1;  
    mysql > CALL sp_demo_out_parameter(@p_out);  
    +-------+  
    | p_out |   
    +-------+  
    | NULL  |   
    +-------+  
     
    +-------+  
    | p_out |  
    +-------+  
    |   2   |   
    +-------+  
     
    mysql> SELECT @p_out;  
    +-------+  
    | p_out |  
    +-------+  
    |   2   |  
    +-------+  


####Ⅲ. INOUT参数例子

创建:

    mysql > DELIMITER //   
    mysql > CREATE PROCEDURE demo_inout_parameter(INOUT p_inout int)   
    -> BEGIN 
    -> SELECT p_inout;  
    -> SET p_inout=2;  
    -> SELECT p_inout;   
    -> END;  
    -> //   
    mysql > DELIMITER ; 

 

 
执行结果:

    mysql > SET @p_inout=1;  
    mysql > CALL demo_inout_parameter(@p_inout) ;  
    +---------+  
    | p_inout |  
    +---------+  
    |    1    |  
    +---------+  
     
    +---------+  
    | p_inout |   
    +---------+  
    |    2    |  
    +---------+  
     
    mysql > SELECT @p_inout;  
    +----------+  
    | @p_inout |   
    +----------+  
    |    2     |  
    +----------+ 


###(4). 变量

####Ⅰ. 变量定义

	DECLARE variable_name [,variable_name...] datatype [DEFAULT value];

　　其中，datatype为MySQL的数据类型，如:int, float, date, varchar(length)

　　例如:

    DECLARE l_int int unsigned default 4000000;  
    DECLARE l_numeric number(8,2) DEFAULT 9.95;  
    DECLARE l_date date DEFAULT '1999-12-31';  
    DECLARE l_datetime datetime DEFAULT '1999-12-31 23:59:59';  
    DECLARE l_varchar varchar(255) DEFAULT 'This will not be padded';   

 

 
####Ⅱ. 变量赋值

	SET 变量名 = 表达式值 [,variable_name = expression ...]

 

#####Ⅲ. 用户变量

 

ⅰ. 在MySQL客户端使用用户变量

    mysql > SELECT 'Hello World' into @x;  
    mysql > SELECT @x;  
    +-------------+  
    |   @x        |  
    +-------------+  
    | Hello World |  
    +-------------+  
    mysql > SET @y='Goodbye Cruel World';  
    mysql > SELECT @y;  
    +---------------------+  
    |     @y              |  
    +---------------------+  
    | Goodbye Cruel World |  
    +---------------------+  
     
    mysql > SET @z=1+2+3;  
    mysql > SELECT @z;  
    +------+  
    | @z   |  
    +------+  
    |  6   |  
    +------+  

ⅱ. 在存储过程中使用用户变量

    mysql > CREATE PROCEDURE GreetWorld( ) SELECT CONCAT(@greeting,' World');  
    mysql > SET @greeting='Hello';  
    mysql > CALL GreetWorld( );  
    +----------------------------+  
    | CONCAT(@greeting,' World') |  
    +----------------------------+  
    |  Hello World               |  
    +----------------------------+  

 
ⅲ. 在存储过程间传递全局范围的用户变量

    mysql> CREATE PROCEDURE p1()   SET @last_procedure='p1';  
    mysql> CREATE PROCEDURE p2() SELECT CONCAT('Last procedure was ',@last_proc);  
    mysql> CALL p1( );  
    mysql> CALL p2( );  
    +-----------------------------------------------+  
    | CONCAT('Last procedure was ',@last_proc  |  
    +-----------------------------------------------+  
    | Last procedure was p1                         |  
    +-----------------------------------------------+  

 

 
注意:

①用户变量名一般以@开头

②滥用用户变量会导致程序难以理解及管理

###(5). 注释

MySQL存储过程可使用两种风格的注释

双模杠：--

该风格一般用于单行注释

c风格： 一般用于多行注释

例如：

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE proc1 --name存储过程名  
    -> (IN parameter1 INTEGER)   
    -> BEGIN   
    -> DECLARE variable1 CHAR(10);   
    -> IF parameter1 = 17 THEN   
    -> SET variable1 = 'birds';   
    -> ELSE 
    -> SET variable1 = 'beasts';   
    -> END IF;   
    -> INSERT INTO table1 VALUES (variable1);  
    -> END   
    -> //  
    mysql > DELIMITER ;  


##4.MySQL存储过程的调用

　　用call和你过程名以及一个括号，括号里面根据需要，加入参数，参数包括输入参数、输出参数、输入输出参数。具体的调用方法可以参看上面的例子。

##5.MySQL存储过程的查询

　　我们像知道一个数据库下面有那些表，我们一般采用show tables;进行查看。那么我们要查看某个数据库下面的存储过程，是否也可以采用呢？答案是，我们可以查看某个数据库下面的存储过程，但是是令一钟方式。

我们可以用

	select name from mysql.proc where db=’数据库名’;

或者

	select routine_name from information_schema.routines where routine_schema='数据库名';

或者

	show procedure status where db='数据库名';

进行查询。

如果我们想知道，某个存储过程的详细，那我们又该怎么做呢？是不是也可以像操作表一样用describe 表名进行查看呢？

答案是：我们可以查看存储过程的详细，但是需要用另一种方法：

	SHOW CREATE PROCEDURE 数据库.存储过程名;

就可以查看当前存储过程的详细。

 
##6.MySQL存储过程的修改

	ALTER PROCEDURE

更改用CREATE PROCEDURE 建立的预先指定的存储过程，其不会影响相关存储过程或存储功能。


##7.MySQL存储过程的删除

删除一个存储过程比较简单，和删除表一样：

	DROP PROCEDURE

从MySQL的表格中删除一个或多个存储过程。

 

##8.MySQL存储过程的控制语句

###(1). 变量作用域

　　内部的变量在其作用域范围内享有更高的优先权，当执行到end。变量时，内部变量消失，此时已经在其作用域外，变量不再可见了，应为在存储
过程外再也不能找到这个申明的变量，但是你可以通过out参数或者将其值指派
给会话变量来保存其值。

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE proc3()  
         -> begin 
         -> declare x1 varchar(5) default 'outer';  
         -> begin 
         -> declare x1 varchar(5) default 'inner';  
         -> select x1;  
         -> end;  
         -> select x1;  
         -> end;  
         -> //  
    mysql > DELIMITER ;  

 

###(2). 条件语句

####Ⅰ. if-then -else语句

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE proc2(IN parameter int)  
         -> begin 
         -> declare var int;  
         -> set var=parameter+1;  
         -> if var=0 then 
         -> insert into t values(17);  
         -> end if;  
         -> if parameter=0 then 
         -> update t set s1=s1+1;  
         -> else 
         -> update t set s1=s1+2;  
         -> end if;  
         -> end;  
         -> //  
    mysql > DELIMITER ;  


####Ⅱ. case语句：

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE proc3 (in parameter int)  
         -> begin 
         -> declare var int;  
         -> set var=parameter+1;  
         -> case var  
         -> when 0 then   
         -> insert into t values(17);  
         -> when 1 then   
         -> insert into t values(18);  
         -> else   
         -> insert into t values(19);  
         -> end case;  
         -> end;  
         -> //  
    mysql > DELIMITER ; 

 
###(3). 循环语句

####Ⅰ. while ···· end while：

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE proc4()  
         -> begin 
         -> declare var int;  
         -> set var=0;  
         -> while var<6 do  
         -> insert into t values(var);  
         -> set var=var+1;  
         -> end while;  
         -> end;  
         -> //  
    mysql > DELIMITER ; 

 

 

####Ⅱ. repeat···· end repeat：

它在执行操作后检查结果，而while则是执行前进行检查。

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE proc5 ()  
         -> begin   
         -> declare v int;  
         -> set v=0;  
         -> repeat  
         -> insert into t values(v);  
         -> set v=v+1;  
         -> until v>=5  
         -> end repeat;  
         -> end;  
         -> //  
    mysql > DELIMITER ;  

 


####Ⅲ. loop ·····end loop:

　　loop循环不需要初始条件，这点和while 循环相似，同时和repeat循环一样不需要结束条件, leave语句的意义是离开循环。

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE proc6 ()  
         -> begin 
         -> declare v int;  
         -> set v=0;  
         -> LOOP_LABLE:loop  
         -> insert into t values(v);  
         -> set v=v+1;  
         -> if v >=5 then 
         -> leave LOOP_LABLE;  
         -> end if;  
         -> end loop;  
         -> end;  
         -> //  
    mysql > DELIMITER ;  

 

 

####Ⅳ. LABLES 标号：

　　标号可以用在begin repeat while 或者loop 语句前，语句标号只能在合法的语句前面使用。可以跳出循环，使运行指令达到复合语句的最后一步。


###(4). ITERATE迭代

####Ⅰ. ITERATE:

　　通过引用复合语句的标号,来从新开始复合语句

    mysql > DELIMITER //  
    mysql > CREATE PROCEDURE proc10 ()  
         -> begin 
         -> declare v int;  
         -> set v=0;  
         -> LOOP_LABLE:loop  
         -> if v=3 then   
         -> set v=v+1;  
         -> ITERATE LOOP_LABLE;  
         -> end if;  
         -> insert into t values(v);  
         -> set v=v+1;  
         -> if v>=5 then 
         -> leave LOOP_LABLE;  
         -> end if;  
         -> end loop;  
         -> end;  
         -> //  
    mysql > DELIMITER ; 

 

 

##10.MySQL存储过程动态表建立(PREPARE)
	
1.	PREPARE  statement_name  FROM  sql_text /*定义*/   
2.	EXECUTE  statement_name [USING variable [,variable...]] /*执行预处理语句*/   
3.	DEALLOCATE   PREPARE  statement_name /*删除定义*/   

参考示例：

	DELIMITER $$
	DROP PROCEDURE IF EXISTS `gpsdata`.`sp_test`$$
	CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_test`(
	  gpstime_ varchar(128),
	  gpsname_ varchar(128),
	  gpsinfo_ varchar(256)
	)
	BEGIN
	DECLARE tbname varchar(50) DEFAULT  '0';
	DECLARE v_sql varchar(1024) DEFAULT '0';

	SET v_sql=CONCAT('select * from  ', tbname ,' where gpsname = ',gpsname_,'  order by gpstime desc limit 1');


	SET @lastdata = v_sql;
	PREPARE lastdata FROM @lastdata;   
	EXECUTE lastdata;
	DEALLOCATE PREPARE lastdata;  

	select v_sql;

	END$$

	DELIMITER ;

使用 PREPARE 的几个注意点：

　　A： PREPARE stmt_name FROM preparable_stmt;

 预定义一个语句，并将它赋给 stmt_name ，stmt_name 是不区分大小写的。

　　B： 即使 preparable_stmt 语句中的 ? 所代表的是一个字符串，你也不需要将 ? 用引号包含起来。

　　C： 如果新的 PREPARE 语句使用了一个已存在的 stmt_name ，那么原有的将被立即释放！
 即使这个新的 PREPARE 语句因为错误而不能被正确执行。

　　D： PREPARE stmt_name 的作用域是当前客户端连接会话可见。

　　E： 要释放一个预定义语句的资源，可以使用 DEALLOCATE PREPARE 句法。

　　F： EXECUTE stmt_name 句法中，如果 stmt_name 不存在，将会引发一个错误。 

　　G： 如果在终止客户端连接会话时，没有显式地调用 DEALLOCATE PREPARE 句法释放资源，服务器端会自己动释放它。

　　H：在预定义语句中，CREATE TABLE, DELETE, DO, INSERT, REPLACE, SELECT, SET, UPDATE, 和大部分的 SHOW 句法被支持。

　　I：PREPARE 语句不可以用于存储过程(5.0以上可以使用)，自定义函数！但从 MySQL 5.0.13 开始，它可以被用于存储过程，仍不支持在函数中使用！ 

##11.MySQL存储过程动态创建临时表


```mysql 案例应用

drop procedure if exists proc_user_center_message;
-- 创建存储过程

drop procedure if exists proc_user_center_message;
-- 创建存储过程
create procedure proc_user_center_message(in userAccount varchar(40),in investor int(1),in projectCreator int(1),in startRecord int(6),in recordCount int(6))
begin
	declare dynamic_sql varchar(500);
	-- 创建临时表
	drop temporary table if exists tmp_message;
	create temporary table tmp_message (
		  id varchar(50),
		  title varchar(100) ,
		  content text,
		  created_time timestamp,
		  type varchar(10),
		  receiver varchar(50)
	  );

	-- 运营推送消息
	set dynamic_sql = 'insert into tmp_message(id,title,content,created_time,type,receiver)
	select t.spe_id as id,t.spe_title as title,t.spe_img as content,t.spe_createtime as created_time,1 as type,t.receive_type as receiver
	from oneZc_special_tem t 
	where t.category = 3 and t.receive_type is not null';
	set @dynamic_sql=dynamic_sql;
	prepare stmt from @dynamic_sql;
	execute stmt;
	deallocate prepare stmt;

	-- 系统消息
	set dynamic_sql = 'insert into tmp_message(id,title,content,created_time,type,receiver)
	select message_id as id,null as title,t.message_content as content,t.message_createtime as created_time,t.message_type as type,t.user_account as receiver
	from oneZc_message_tem t
	where message_status = ''1'''; 
	set @dynamic_sql=dynamic_sql;
	prepare stmt from @dynamic_sql;
	execute stmt;
	deallocate prepare stmt;

	-- note
	set dynamic_sql = 'insert into tmp_message(id,title,content,created_time,type,receiver)
	select id as id,null as title,t.note as content,t.created_time as created_time,4 as type,t.scope as receiver 
	from oneZc_note_tem t';
	set @dynamic_sql=dynamic_sql;
	prepare stmt from @dynamic_sql;
	execute stmt;
	deallocate prepare stmt;

	-- vote
	set dynamic_sql = 'insert into tmp_message(id,title,content,created_time,type,receiver)
	select id as id,t.title as title,''有新的投票事务'' as content,t.created_time as created_time,2 as type,
	(select GROUP_CONCAT(distinct ts.user_account separator '','') from zc_investment ts where ts.pro_id = t.project_id and ts.inv_state = 1) as receiver
	from oneZc_vote_tem t';
	set @dynamic_sql=dynamic_sql;
	prepare stmt from @dynamic_sql;
	execute stmt;
	deallocate prepare stmt;

	set dynamic_sql= 'select id,title,content,created_time,type from tmp_message where (receiver = ''ALL_USER''';

	IF investor = 1
	THEN
		set dynamic_sql = concat(dynamic_sql,' or receiver = ''INVESTOR''');
	END IF;

	IF projectCreator = 1  
	THEN  
		set dynamic_sql = concat(dynamic_sql,' or receiver = ''PROJECT_CREATOR'''); 
	END IF;  

	IF userAccount is not null  
	THEN  
		set dynamic_sql = concat(dynamic_sql,' or receiver like ''%',userAccount,'%'''); 
	END IF;  
	set dynamic_sql = concat(dynamic_sql,')');

	set dynamic_sql = concat(dynamic_sql,' order by created_time desc');

	IF startRecord >= 0 && recordCount >= 0
	THEN
		set dynamic_sql = concat(dynamic_sql,' limit ',startRecord,',',recordCount);
	END IF;

	set @dynamic_sql=dynamic_sql;
	prepare stmt from @dynamic_sql;
	execute stmt;
	deallocate prepare stmt;	

end;

```