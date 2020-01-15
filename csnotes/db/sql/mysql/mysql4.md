# 视图-高级操作

## 视图
### 视图概述
视图是从一个或多个表中导出来的表，它是一种虚拟存在的表，并且表的结构和数据都依赖于基本表。它可以实现数据的查询、修改、删除。其优点在于：
1. 简化查询语句：日常开发中将常使用的查询定义为视图，可以减少大量重复操作；
2. 安全：数据库授权命令不能直接授权到具体的行列上，但视图可以实现权限管理，即通过视图用户不能看到视图之外的行列内容；
3. 逻辑数据独立：视图可以帮助用户屏蔽真实表结构变化带来的影响。

### 视图管理
#### 创建视图
```sql
CREATE [OR REPLACE] [ALGORITHM = UNDIFINEDD|MERGE|TEMPTABLE]
VIEW view_name [(column_list)]
AS SELECT_statement
[WITH [CASCADED|LOCAL] CHECK OPTION]
```
1. `CREATE`：创建视图的关键字；
2. `OR REPLACE`：如果给定了此子句，表示该语句能够替换已有视图；
3. `ALGORITHM`：可选，表示视图选择的算法；
4. `UNDIFINED`：表示MySQL将自动选择所要使用的算法；
5. `MERGE`：表示将视图的语句与视图的定义合并起来，使得视图定义的某一部分取代语句的对应部分；
6. `TEMPTABLE`：表示将视图的结果存入临时表，然后使用临时表执行语句；
7. `view_name`：表示要创建的视图名称；
8. `column_list`：可选，表示属性清单。指定了视图中的各个属性名，默认与SELECT语句中查询的属性相同；
9. `AS`：表示指定视图要执行的操作；
10. `SELECT_statement`：一个完整的查询语句，表示从某个表或视图中查出某些满足条件的记录，将这些记录导入视图中；
11. `WITH CHECK OPTION`：可选，表示创建视图时要保证在该视图的权限范围内；
12. `CASCADED`：可选，表示创建视图时，需要满足跟该视图有关的所有视图和表的条件，该参数为默认值；
13. `LOCAL`：可选，表示创建视图时，只要满足该试图本身定义的条件即可。

视图属于数据库，若要在给定的数据库中明确创建视图，创建时应指定名称：`db_name.view_name`。

**在单表上创建视图示例**：
```sql
-- 创建表 chapter07.student 并插入数据
CREATE DATABASE chapter07;
USE chapter07;
CREATE TABLE student(s_id INT(3),name VARCHAR(20),math FLOAT,chinese FLOAT);
INSERT INTO student VALUES(1,'Tom',80,78),(2,'Jack',70,80),(3,'Lucy',97,95);

-- 创建视图 chapter07.view_stu
CREATE VIEW view_stu(math,chin,sum) AS SELECT math,chinese,math+chinese FROM student;

-- 查询视图
mysql> SELECT * FROM view_stu;
+------+------+------+
| math | chin | sum  |
+------+------+------+
|   80 |   78 |  158 |
|   70 |   80 |  150 |
|   97 |   95 |  192 |
+------+------+------+
3 rows in set (0.07 sec)
```

**在多表上创建视图示例**：
```sql
-- 创建表 stu_info 并插入数据
CREATE TABLE stu_info(s_id INT(3),class VARCHAR(50),addr VARCHAR(100));
INSERT INTO stu_info VALUES(1,'二班','安徽'),(2,'三班','重庆'),(3,'一班','山东');

-- 创建 stu_class 视图
CREATE VIEW stu_class(id,name,class)
AS
SELECT student.s_id,student.name,stu_info.class
FROM student,stu_info
WHERE student.s_id=stu_info.s_id;

-- 查询视图
mysql> SELECT * FROM stu_class;
+------+------+--------+
| id   | name | class  |
+------+------+--------+
|    1 | Tom  | 二班   |
|    2 | Jack | 三班   |
|    3 | Lucy | 一班   |
+------+------+--------+
3 rows in set (0.06 sec)
```

#### 查看视图
```sql
-- 1 使用 DESCRIBE 语句查看视图
DESCRIBE view_name;
-- 简写为：
DESC view_name;

-- 2 使用 SHOW TABLE STATUS 语句查看视图
SHOW TABLE STATUS LIKE 'view_name';

-- 3 使用 SHOW CREATE VIEW 语句查看视图
SHOW CREATE VIEW view_name;
-- 也可使用 SHOW CREATE TABLE 命令进行查询
```

#### 修改视图
```sql
-- 1 使用 CREATE OR REPLACE VIEW 语句修改视图
CREATE OR REPLACE [ALGORITHM = UNDIFINEDD|MERGE|TEMPTABLE]
VIEW view_name [(column_list)]
AS SELECT_statement
[WITH [CASCADED|LOCAL] CHECK OPTION]

-- 2 使用 ALTER 语句修改视图
ALTER [ALGORITHM = UNDIFINEDD|MERGE|TEMPTABLE]
VIEW view_name [(column_list)]
AS SELECT_statement
[WITH [CASCADED|LOCAL] CHECK OPTION]
```

#### 更新视图
```sql
-- 1 使用 UPDATE 语句更新视图。示例：
UPDATE view_stu SET chinese=100;
-- 注意使用 UPDATE 更新视图时，需要拥有对所关联基本表进行操作的权限。更新后所有相关链的 rows 都会受影响

-- 2 使用 INSERT 语句更新视图示例：
INSERT INTO student VALUES(4,'Lily',100,100);
-- 与 student 表相关的 view_stu 等视图中的内容也会相应产生改变

-- 3 使用 DELETE 语句更新视图
DELETE FROM view_stu WHERE math=70;
-- 与 view_stu 相关的基本表 student 中 math=70 的列也会被删除
```
值得注意的是，当视图中包含如下内容时，视图的更新操作将不能被执行：
1. 视图中包含基本表中被定义为非空的列；
2. 在定义视图的 SELECT 语句后的字段列表中使用了数学表达式；
3. 在定义视图的 SELECT 语句后的字段列表中使用了聚合函数；
4. 在定义视图的 SELECT 语句后的字段列表中使用了 DISTINCT, UNION, TOP, GROUP BY 或 HAVING 子句。

#### 删除视图
```sql
DROP VIEW [IF EXISTS]
    view_name1 [,view_name2...]
    [RESTRICT|CASCADED]
```
注意删除视图需要有 DROP 权限。

## 数据库的高级操作
### 数据备份与还原
#### 数据的备份
mysqldump命令将数据库中的数据备份成一个文本文件。表的结构和表中的数据将存储在生成的文本文件中。

mysqldump命令的工作原理很简单。它先查出需要备份的表的结构，再在文本文件中生成一个CREATE语句。然后，将表中的所有记录转换成一条INSERT语句。然后通过这些语句，就能够创建表并插入数据。

```sql
-- 1. 备份单个数据库
mysqldump -u username -p password dbname [tbname1 [tbname2 ...]] > filename.sql;
-- 如果使用tbname，它们间用空格隔开。 filename可以加绝对路径

-- 2. 备份多个数据库
mysqldump -u username -p password --database dbname1 [dbname2 dbname3 ...] > filename.sql;
-- database后至少指定一个数据库，若指定多个数据库，它们之间需要用空格隔开

-- 3. 备份所有数据库
mysqldump -u username -p -all-databases > filename.sql;
```

#### 数据的还原

还原使用mysqldump命令备份的数据库的语法如下：
```sql
mysql -u username -p password [dbname] < filename.sql
-- 需要先创建数据库再还原。如果使用 mysqldump 命令备份的 filename.sql 文件中包含创建数据库的语句，则不需要指定 dbname

-- 另一种方法是使用 source 进行还原，这需要登陆后操作
source filename.sql
```

### 用户管理
MySQL 中的用户分为 root 用户和普通用户，前者拥有对数据库进行操作的所有权限，后者只被赋予某些权限。

#### user 表
在安装 MySQL 时，会自动安装一个名为 mysql 的数据库，该数据库中的表都是权限表，如 user、db、host、table_priv、column_priv、procs_priv，其中 user 表记录了允许连接到服务器的账号信息以及一些全局级的权限信息。user 表中的常见字段有：

字段名|数据类型|默认值
---|---|---
Host|char(60)|N
User|char(16)|N
Password|char(41)|N
Select_priv|enum('N','Y')|N
Insert_priv|enum('N','Y')|N
Update_priv|enum('N','Y')|N
Delete_priv|enum('N','Y')|N
Create_priv|enum('N','Y')|N
Drop_priv|enum('N','Y')|N
Reload_priv|enum('N','Y')|N
Shutdown_priv|enum('N','Y')|N
ssl_type|enum('','ANY','X509','SPECIFIED')
ssl_cipher|blob|NULL
x509_issuer|blob|NULL
x509_subject|blob|NULL
max_questions|int(11) unsigned|0
max_updates|int(11) unsigned|0
max_connections|int(11) unsigned|0
max_user_connections|int(11) unsigned|0
plugin|char(64)
authentication_string|text|NULL

这里只列举了其中一部分，实际上 MySQL 5.5 的 user 表中有 42 个字段，大体可以分作 4 类：

1. 用户列：Host、User、Password。其中 Host 与 User 为 user 表的联合主键，修改密码时即修改 Password 字段值。
2. 权限列：以“_priv”结尾的字段，决定了用户的查找、修改、删除、关闭服务等权限。其数据类型为 ENUM ，包括 N 与 Y ，默认值都为 N。
3. 安全列：用于管理用户的安全信息，包括六个字段：
    1. ssq_type 和 ssl_cipher ：用于加密；
    2. x509_issuer 和 x509_subject 标准：用来标识用户；
    3. plugin 和 authentication_string ：用于存储与授权相关的插件。

    通常标准的发行版不支持 ssl 加密，可通过 `SHOW VARIABLES LIKE 'have_openssl'` 语句来查看，如果取值为 DISABLED 则表示不支持加密。
4. 资源控制列：用于限制用户使用的资源，包括四个字段：
    1. max_questions ：每小时允许用户执行查询操作的次数；
    2. max_updates ：每小时允许用户执行更新操作的次数；
    3. max_connections ：每小时允许用户建立连接的次数；
    4. max_user_connections ：允许单个用户同时建立连接的次数。

#### 创建普通用户
```sql
-- 1. 使用 GRANT 语句创建用户
GRANT privileges ON database.table
    TO 'username'@'hostname' [IDENTIFIED BY [PASSWORD] 'password']
    [,'username'@'hostname' [IDENTIFIED BY [PASSWORD] 'password']...];
-- privileges 表示该用户具有的权限信息，database.table表示其权限范围。注意使用 GRANT 语句创建新用户时，必须有 GRANT 权限。

-- 2. 使用 CREATE USER 语句创建用户
CREATE USER 'username'@'hostname' [IDENTIFIED BY [PASSWORD] 'password']
    [,'username'@'hostname' [IDENTIFIED BY [PASSWORD] 'password']...];
-- 该语句创建的新用户是没有任何权限的

-- 2. 使用 INSERT 语句创建用户
INSERT INTO mysql.user(Host,User,Password,ssl_cipher,x509_issuer,x509_subject)
VALUES('hostname','username',PASSWORD('password'),'','','');
-- PASSWORD() 是一个加密函数，用于给密码加密。另外由于 ssl_cipher,x509_issuer,x509_subject 字段没有默认值，需要给它们设置初始值

-- 创建后重新加载权限表
FLUSH PRIVILEGES;
```

#### 删除用户
```sql
-- 1. 使用 DROP USER 语句删除用户
DROP USER 'username'@'hostname' [,'username'@'hostname'...];

-- 1. 使用 DELETE 语句删除用户
DELETE FROM mysql.user WHERE User='username' AND Host='hostname';

-- 删除后重新加载权限表
FLUSH PRIVILEGES;
```

#### 修改用户密码
root 用户可以修改所有用户的密码，普通用户只能修改自己的密码。

```sql
-- 1. 修改 root 用户的密码
-- a. 使用 mysqladmin 命令
mysqladmin -u username [-h hostname] -p PASSWORD new_password
-- hostname 默认为 localhost，-p 后面的 PASSWORD 为关键字
-- b. 使用 UPDATE 语句
UPDATE mysql.user set Password=PASSWORD('new_password')
    WHERE User='username' AND Host='hostname';
-- c. 使用 SET语句
SET PASSWORD=PASSWORD('new_password');
-- 需要登陆 root 用户后操作

-- 2. root 用户修改普通用户的密码
-- a. 使用 GRANT 语句
GRANT USAGE ON *.* TO 'username'@'hostname' IDENTIFIED BY [PASSWORD] 'new_password';
-- b. 使用 UPDATE 语句
UPDATE mysql.user set Password=PASSWORD('new_password')
    WHERE User='username' AND Host='hostname';
-- c. 使用 SET语句
SET PASSWORD FOR 'username'@'hostname'=PASSWORD('new_password');

-- 3. 普通用户修改密码
SET PASSWORD=PASSWORD('new_password');
-- 需登陆后操作

-- 修改后重新加载权限表
FLUSH PRIVILEGES;
```

#### 如何解决 root 用户密码丢失
```bash
# 1. 停止 mysql 服务
net stop mysql

# 2. 使用 --skip-grant-tables 启动 MySQL
mysqld --skip-grant-tables

# 3. 登陆 MySQL
mysql -u root

# 4. 使用 UPDATE 语句设置密码
UPDATE mysql.user SET Password=PASSWORD('new_password') WHERE User='root' AND Host='localhost';

# 5. 加载权限表
FLUSH PRIVILEGES;
```

### 权限管理
MySQL 中的权限信息被存储在 MySQL 数据库的 user、db、host、table_priv、column_priv和procs_priv表中，下面列举了 MySQL 的相关权限在 user 表中对应的列和权限范围：

user表的权限列|权限名称|权限范围
---|---|---
Create_priv|CREATE|数据库、表、索引
Drop_priv|DROP|数据库、表、索引
Grant_priv|GRANT OPTION|数据库、表、存储过程
References_priv|REFERENCES|数据库、表
Event_priv|EVENT|数据库
Alter_priv|ALTER|数据库
Delete_priv|DELETE|表
Insert_priv|INSERT|表
Index_priv|INDEX|表
Select_priv|SELECT|表、列
Update_priv|UPDATE|表、列
Create_temp_table_priv|CREATE TEMPORARY TABLES|表
Lock_tables_priv|LOCK TABLES|表
Trigger_priv|TRIGGER|表
Create_view_priv|CREATE VIEW|视图
Show_view_priv|SHOW VIEW|视图
Alter_routine_priv|ALTER ROUTINE|存储过程、函数
Create_routine_priv|CREATE ROUTINE|存储过程、函数
Execute_priv|EXECUTE|存储过程、函数
File_priv|FILE|访问服务器上的文件
Create_tablespace_priv|CREATE TABLESPACE|服务器管理
Create_user_priv|CREATE USER|服务器管理
Process_priv|PROCESS|存储过程、函数
Reload_priv|RELOAD|访问服务器上的文件
Repl_client_priv|REPLICATTION CLIENT|服务器管理
Repl_slave_priv|REPLICATION SLAVE|服务器管理
Show_db_priv|SHOW DATABASES|服务器管理
Shutdown_priv|SHUTDOWN|服务器管理
Super_priv|SUPER|服务器管理

#### 授予权限
```sql
GRANT privileges [(columns)][,privileges[(columns)]] ON database.table
    TO 'username'@'hostname' [IDENTIFIED BY [PASSWORD] 'password']
    [,'username'@'hostname' [IDENTIFIED BY [PASSWORD] 'password' ...]
    [WITH with_option [with_optin ...]];
```
其中 `with_option` 可以有 5 种取值：
1. GRANT OPTION：将自己的权限授予其它用户；
2. MAX_QUERIES_PER_HOUR：设置每小时最多执行多少次查询；
3. MAX_UPDATES_PER_HOUR：设置每小时最多执行多少次更新；
4. MAX_CONNECTIONS_PER_HOUR：设置每小时最大的连接数量；
5. MAX_USER_CONNECTIONS：设置每个用户最多可以同时建立的连接数量。

#### 查看权限
除了直接查看 mysql.user 表，还可以使用 SHOW GRANTS 语句：
```sql
SHOW GRANTS FOR 'username'@'hostname';
```

#### 收回权限
```sql
REVOKE privileges [(columns)][,privileges[(columns)]] ON database.table
    FROM 'username'@'hostname' [,'username'@'hostname' ...];
```