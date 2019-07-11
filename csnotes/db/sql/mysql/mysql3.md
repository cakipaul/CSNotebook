# 多表操作-事务与存储过程

## 多表操作
### 外键
#### 什么是外键
外键是指引用另一个表中的一列或多列，被引用的列应该具有主键约束或唯一性约束。

#### 为表添加外键约束
```sql
ALTER TABLE tableName ADD CONSTRAINT 外键名 FOREIGN KEY(外键字段名) REFERENCES 外表表名(主键字段名);
```
>注意：建立外键的表必须是InnoDB型，不能是临时表。因为MySQL中只有InnoDB类型的表才支持外键。

示例：
```sql
-- 
CREATE TABLE grade(
  id int(4) NOT NULL PRIMARY KEY,
  name VARCHAR(36)
);
CREATE TABLE student(
  s_id INT(4) NOT NULL PRIMARY KEY,
  s_name VARCHAR(36),
  g_id INT(4) NOT NULL
);
ALTER TABLE student ADD CONSTRAINT FK_ID FOREIGN KEY(gid) REFERENCES grade(id);
-- 注意：外键名字段不能加引号，FK_ID 改为 'FK_ID' 或 "FK_ID" 都是错误的。
```
为了避免主表中数据被删除/更新时在从表中留下垃圾数据，MySQL在建立外键时可以添加 ON DELETE 或 ON UPDATE 子句来告诉数据库，怎样避免产生垃圾数据：
```sql
ALTER TABLE tableName ADD CONSTRAINT 外键名 FOREIGN KEY(外键字段名) REFERENCES 外表表名(主键字段名)
[ON DELETE CASCADE|SET NULL|NO ACTION|RESTRICT]
[ON UPDATE CASCADE|SET NULL|NO ACTION|RESTRICT]
;
```
<center><strong>添加外键约束的参数说明</strong></center>

参数名称|功能描述
---|---
CASCDE|删除包含与已删除键值有参照关系的所有记录
SET NULL|修改包含与已删除键值有参照关系的所有记录，使用NULL替换（不能用于被标记为NOT NULL的字段）
NO ACTION|不进行任何操作
RESTRICT|（在不定义 ON DELETE_or_UPDATE 时的默认设置）拒绝主表进行删除或修改默认关联列

#### 删除外键约束
```sql
ALTER TABLE tableName DROP FOREIGN KEY 外键名;
```

### 操作关联表
#### 关联关系
1. 多对一：此时应将外键建立在多的一方，否则会造成数据冗余；
2. 多对多：通常情况下会定义一张中间表，称作连接表，该表会存在两个外键，分别参照多对多的两个表。在多对多的关系中，连接表的两个外键都是可重复的，但两个外键之间的关系却是不可重复的，所以这两个外键又是连接表的联合主键。

3. 一对一：首先要分清主表与从表，一般来说要在从表中建立外键。实际开发中，一对一关联的关系表一般用用于：
    1. 分割具有很多列的表；
    2. 由于安全原因而隔离表的一部分；
    3. 保存临时数据，并且可以毫不费力地通过删除该表而删除这些数据。

#### 添加数据
操作示例：
```sql
-- student与grade表已在上面例程中创建
ALTER TABLE student ADD CONSTRAINT FK_ID FOREIGN KEY(g_id) REFERENCES grade(id);
-- 在grade表中插入两个条目
INSERT INTO grade(id,name) VALUES(1,'软件一班'),(2,'软件二班');
-- 在student表中插入条目，其中的g_id列只能取已有值1,2，否则会插入失败
INSERT INTO student(s_id,s_name,g_id) VALUSE(1,'里雷',1),(2,'李磊',1),(3,'李雷',2),(4,'李蕾',2);
```

#### 删除数据
在删除具有关联关系的两个表中的数据时，要先删除从表中的数据，才能删除主表中的数据，否则会报错。如：
```sql
-- 此为正确操作
DELETE FROM student WHERE g_id=1;
DELETE FROM grade WHERE id=1;

-- 此操作会报错，因为从表中还有关联数据存在，故无法直接删除主表中的数据
DELETE FROM grade WHERE id=2;
```
另外，在student表中将g_id字段 SET NULL 也可以实现主从表之间数据关联的解除。不过在该例中，student表中的g_id有NOT NULL约束，故只能将关联条目删除，才能在grade表中删除数据。

### 连接查询
#### 交叉连接
交叉连接返回的结果是被连接的两个表中所有数据行的笛卡儿积，即两表中各自符合查询条件的数据行数的乘积。其语法如下：
```sql
SELECT * FROM table1 CROSS JION table2;
```
交叉连接在实际情况中很少用到，一般使用具体的条件对数据进行有目的的查询。

#### 内连接 Inner Join
内连接又称简单连接或自然连接，它使用比较运算符对两表中的数据进行比较，并列出匹配的数据行。其语法格式如下：
```sql
SELECT 查询字段 FROM table1 [INNER] JOIN table2 ON table1.cloumn1=table2.column2;
```
查询示例：
```sql
SELECT employee.name,department.dname FROM department JOIN employee ON department.did=employee.did;
```
在MySQL中也可以使用WHERE条件查询语句来实现同样的功能：
```sql
SELECT employee.name,department.dname FROM department,employee WHERE department.did=employee.did;
```

如果在一个连接查询中，涉及的两个表是同一个表，这种查询称作自连接查询，例如：
```sql
-- 该查询内容为与王红所处部门相同(did字段相同)的员工
SELECT p1.* FROM emloyee p1 JOIN employee p2 ON p1.did=p2.did WHERE p2.name='王红';
```

#### 外连接
```sql
SELECT 查询字段 FROM table1 LEFT|RIGHT [OUTER] JOIN table2
ON table1.column1=table2.column2 WHERE 条件;
```
其中关键字左边的表称作左表，关键字右边的表称作右表：
1. LEFT JOIN（左连接）：返回左表中的所有记录和右表中符合查询条件的记录。若左表中的某条记录右表中不存在，则在右表中显示为空；
2. RIGHT JOIN（右连接）：返回右表中的所有记录和左表中符合查询条件的记录。若右表中的某条记录左表中不存在，则在左表中显示为空。

#### 复合条件连接查询
即在查询语句中再添加过滤条件来限制查询结果，使查询结果更精确。例如：
```sql
SELECT employee.name,employee.age,department.dname FROM department JOIN employee ON department.did=employee.did ORDER BY age;
```

### 子查询
子查询是指查询语句嵌套在另一个查询语句内部的查询。它可以嵌套在 SELECT 、 SELECT...INTO 、 INSERT INTO 等语句中。在执行查询语句时，首先会执行子查询中的语句，然后将返回的结果作为外层查询的过滤条件，在子查询中通常使用 IN 、 EXISTS 、 ANY 、 ALL 操作符。

1. [NOT] IN：使用IN关键字进行子查询时，内层查询语句仅返回一个数据列，这个数据列中的值将供外层查询语句进行比较操作。
2. EXISTS：该关键字后面的参数可以是任意子查询，该子查询相当于一个测试，不产生任何数据，只返回TRUE或FALSE。当返回值为TRUE时，外层查询才会执行。
3. ANY：表示满足其中的任意一个条件，它允许创建一个表达式对子查询的查询结果进行比较，只要满足内层查询中的任意一个比较条件，就返回一个结果作为外层查询条件。
4. ALL：类似ANY，但是要满足所有内层查询条件。
5. 带比较运算符的子查询：= , > , < , >= , <= , != 等。

查询示例：

```sql
-- 带 IN 关键字的子查询
SELECT * FROM department WHERE did IN(SELECT did FROM employee WHERE age=20);

-- NOT IN
SELECT * FROM department WHERE did NOT IN(SELECT did FROM emplyee WHERE age=20);

-- EXISTS（当employee表中存在age大于20的员工时，则查询department表中的所有记录）
SELECT * FROM department WHERE EXISTS(SELECT did FROM employee WHERE age>20);

-- ANY
SELECT * FROM department WHERE did>ANY(SELECT did FROM employee);

-- ALL
SELECT * FROM department WHERE did>ALL(SELECT did FROM employee);

-- 比较运算符
SELECT * FROM department WHERE did=(SELECT did FROM employee WHERE name='李雷');
```

## 事务与存储过程
### 事务管理
#### 事务管理的概念
事务就是一组SQL操作，它可以由一条或多条SQL语句组成，同一个事物的操作具备同步的特点，即要么都执行，要么都不执行。

在数据库使用事务时，必须先开启事务：
```sql
-- 开启事务
START TRANSACTION;

-- 执行SQL语句
UPDATE tableName SET coulnmName... WHERE ...;
...

-- SQL执行成功后提交事务，否则在重启数据库等操作后，之前执行的SQL语句会被撤消，即数据库会恢复到 START TRANSACTION 之前的状态
COMMIT;
-- 或者取消事务（回滚）
ROLLBACK;
-- 注：已经COMMIT的事务无法回滚，要在COMMIT之前ROLLBACK
```
事务操作示例：
```sql
START TRANSACTION;
UPDATE account SET money=money-100 WHERE name='李雷';
UPDATE account SET money=money+100 WHERE name='李蕾';
COMMIT;
```
事务必须严格满足四个标准（ACID标准）：
1. A(Atomicity)：原子性，指一个事务必须被视为一个不可被分割的最小工作单元，只有事务中所有数据库操作都执行成功，才算整个事务执行成功。若是中间出现任何失败操作，都应该撤销已经成功执行的SQL操作，使数据库退回到执行事务之前的状态；
2. C(Consistency)：一致性，指将数据库从一种状态变为下一种一致的状态。比如若有一表中的某字段具有唯一性要求，就要对该表的数据插入操作进行监督，若有失败操作，系统就应自动撤销事务，恢复到初始状态；
3. I(Isolation)：隔离性，隔离性还称作并发控制、可串行化、锁等。当多个用户并发访问数据库时，数据库为每个用户开启的事务不能被其他事务的操作数据所干扰。多个并发操作之间要相互隔离；
4. D(Durability)：持久性，事务一旦提交，其做出的修改就应该永久保存在数据库中，即使数据库发生故障也不应该对其产生影响（理想状态下）。

#### 事务的隔离级别
多线程时容易发生的几种错误读取：
1. 脏读（Dirty Read）：读取另一个未提交事务中的未提交的数据；
2. 不可重复读（NON-REPEATABLE READ）：在事务内重复读取别的线程已提交的数据，但是两次读取结果不同，因为在查询过程中别的事务又进行了更新操作；
3. 幻读（Phantom Read）：又被称作虚读，在一个事务内的两次查询结果不一致，因为在查询过程中其他事务进行了添加操作；

其中重复读与幻读并非严格的错误操作，但是往往不符合开发要求，实际生产中需要避免其出现。

MySQL中设计了四种隔离级别：
1. READ UNCOMMITTED：读未提交，是事务中最低的级别，该级别下的事务可以读取另一个未提交事务中的未提交的数据，也被称作脏读（Dirty Read），这是相当危险的。这中操作一般在实际开发中不会用到；
2. READ COMMITTED：读提交，是许多数据库的默认隔离级别（如ORACLE），该级别下事务只能读其他事务已提交的内容，可以避免脏读，但不能避免重复读和幻读；
3. REPEATABLE READ(default)：可重复读，是MySQL的默认隔离级别，可以避免脏读、不可重复读的问题，确保同一事务的多个实例在并发读取数据时得到的数据相同（即在 REPEATABLE READ 隔离级别下的事务在 START TRANSACTION 后，在不同时间对其他表进行相同查询操作得到的数据不会改变，即使在两次操作之间其他表已经被修改过）。该级别理论上并不能避免幻读情况，但MySQL存储引擎通过多版本并发控制机制解决了这个问题，因此该级别在MySQL上可以避免幻读；
4. SEIALIZABLE：可串行化，事务的最高隔离级别，它会强制对事务进行排序，使事务之间不会发生冲突，从而解决了脏读、重复读、幻读等问题。其本质就是给每个数据行加锁，每种查询操作都会对所查询的表进行加锁，导致其他事务无法进行，因此可能会导致大量超时与锁竞争现象，实际应用中很少用到。

注意：隔离级别只对其他事务（TRASACTION）操作生效，若是有直接对数据表进行的操作（未进入事务），就无法避免重复读与幻读等。

下面是对隔离级别进行操作的示例语句：
```sql
-- 设置当前会话（SESSION）事务的隔离级别为READ UNCOMMITTED
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- READ UNCOMMITTED可以换作 READ COMMITTED | REPEATABLE READ | SERIALIZABLE
```

### 存储过程的创建
#### 创建存储过程
```sql
CREATE PROCEDURE sp_name([proc_parameter])
[characteristics...]routine_body;
```
1. sp_name：存储过程的名称；
2. proc_parameter：指定存储过程的参数列表，形式如下：
    ```sql
    [IN|OUT|INOUT]param_name type
    -- 1. IN：表示输入参数；
    -- 2. OUT：表示输出参数；
    -- 3. INOUT：表示既可以输入也可以输出。
    ```
3. characteristics：用于指定存储过程的特性，取值说明如下：
    1. LANGUAGE SQL：说明routine_body部分是由SQL语句组成，目前也只支持这一语言；
    2. [NOT]DETERMINISTIC：指明用于指明存储过程的结果是否确定，默认为NOT DETERMINISTIC(不确定)；    
    3. {CONTAINS SQL|NO SQL|READ SQL DATA|MODIFIES SQL DATA}：指明子程序使用的SQL语句的限制。CONTAINS SQL表示子程序包含SQL语句，但不包含读写数据的语句；NO SQL表明子程序不包含SQL语句；READS SQL DATA说明子程序包含读写数据的语句；MODIFIES SQL DATA表明子程序包含写数据的语句。默认情况下，系统会指定为CONTAINS SQL；
    4. SQL SECURITY {DEFINER|INVOKER}：指明谁有权限来执行。DEFINER表示只有定义者可以执行，INVOKER表示拥有权限的调用者可以执行。默认为DEFINER；
    5. COMMENT'string'：注释信息。
4. routine_body：SQL代码的内容，可以用BEGIN..END包围起来以界定起始与结束。

存储过程创建示例：
```sql
-- Create a table named student
CREATE TABLE student(
    id INT(3) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    grade FLOAT,
    gender CHAR(2)
);

-- Insert datas into table
INSERT INTO student (name,grade,gender)
VALUES('Tom',60,'Male'),('David',70,'Male'),('Lucy',72,'Female');

-- Create procedure
DELIMITER //
CREATE PROCEDURE Proc()
BEGIN
SELECT * FROM student;
END //
DELIMITER ;

-- Use Proc()
CALL Proc();
```
其中 `DELIMETER //` 语句的作用是将MySQL的结束符设置为 `//` ，注意该语句中间要有一个空格。

#### 变量的使用
变量的作用范围在BEGIN...END之间。其定义语法如下：
```sql
-- 使用DECLARE语句定义变量
DECLARE var_name1[,var_name2...] data_type[DEFAULT value];

-- 使用SET语句为变量赋值
SET var_name=expr[,var_name2=expr2...];

-- 使用SET...INTO语句，查找指定表中的数据为变量赋值
SELECT col_name[...] INTO var_name[...] table_expr;
```
下面是使用示例：
```sql
DECLARE s_grade FLOAT;
DECLARE s_gender CHAR(6);
DECLARE name CHAR(10);
SET var_name='cakipaul';
SELECT grade,gender INTO s_grade,s_gender
FROM student WHERE  name=var_name;
```

#### 定义条件和处理程序
定义条件是事先定义程序执行过程中遇到的问题，处理程序定义了再遇到这些问题时应当采取的处理方式，并且保证存储过程在遇到警告或错误时能继续执行。

**1. 定义条件**

使用DECLARE语句进行定义：

```sql
DECLARE condition_name CONDITION FOR [condition_type];
-- condition_type的两种形式：
{SQLSTATE [VALUE] sqlstate_value | mysql_error_code}
```

其中sqlstate_value与mysql_error_code都可以表示为MySQL的错误，前者为长度为5的字符串类型错误代码，后者为数值类型的错误代码。例如： `ERROR1142(42000)` 中，sqlstate_value的值为42000，mysql_error_code的值为1142。

示例：定义名称为 `command_not_allowed` 的 `ERROR1148(42000)` 错误：

```sql
-- 方法一：使用sqlstate_value
DECLARE command_not_allowed CONDITION FOR SQLSTATE'42000';
-- 方法二：使用mysql_error_code
DECLARE command_not_allowed CONDITION FOR 1148;
```

**2. 定义处理程序**

使用 DECLARE HANDLER 语句定义处理程序：

```sql
DECLARE handler_type HANDLER FOR condition_value[,...] sp_statement handler_type:
    CONTINUE|EXIT|UNDO
condition_value:
    |condition_name
    |SQLWARNING
    |NOT FOUND
    |SQLLEXCEPTION
    |mysql_error_code;
```

- handler_type：CONTINUE 表示遇到错误不处理；EXIT 表示遇到错误马上退出；UNDO 表示遇到错误后撤回之前的操作，MySQL暂不支持 UNDO 操作；
- sp_statement：程序语句段，表示在遇到定义的错误时，需要执行的存储过程；
- condition_value：表示错误类型，取值如下：
    1. SQLSTATE[VALUE]：sqlstate_value 包含5个字符的字符串错误值；
    2. condition_name：表示 DECLARE CONDITION 定义的错误条件名称；
    3. SQLWARNING：匹配所有以 01 开头的 SQLSTATE 错误代码；
    4. NOT FOUND：匹配所有以 02 开头的 SQLSTATE 错误代码；
    5. SQLEXCEPTION：匹配所有没有被 SQLWARNING 或 NOT FOUND 捕获的 SQLSTATE 错误代码；
    6. mysql_error_code：匹配数值类型错误代码。

定义处理程序的代码示例：
```sql
-- 捕获sqlstate_value
DECLARE CONTINUE HANDLER FOR SQLSTATE '42S02' SET @info='NO_SUCH_TABLE';

-- 捕获mysql_error_code
DECLARE CONTINUE HANDLER FOR 1146 SET @info='NO_SUCH_TABLE';

-- 先定义条件，然后调用
DECLARE no_such_table CONDITION FOR 1146;
DECLARE  CONTINUE HANDLER FOR NO_SUCH_TABLE SET @info='ERROR';

-- 使用 SQLWARNING
DECLARE CONTINUE HANDLER FOR SQLWARNING SET @info='ERROR';

-- 使用 NOT FOUND
DECLARE CONTINUE HANDLER FOR NOT FOUND SET @info='ERROR';

--使用 SQLEXCEPTION
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET @info='ERROR';
```
其中“@var_name”表示用户变量，使用 SET 语句为其赋值。一个客户端定义的变量不能被其他客户端看到或使用。当客户端退出时，该客户连接的所有变量将自动释放。

#### 光标的使用
光标是用于处理多行数据的机制，当查询结果返回的数据量较大时，便可使用光标来逐条读取。

1. 光标的声明：光标的声明必须在声明变量、条件之后，声明处理程序之前。MySQL中使用 DECLARE 语句声明光标：

    ```sql
    DECLARE cursor_name CURSOR FOR select_statement;

    -- 声明一个名为cursor__student的光标示例：
    DECLARE cursor_student CURSOR FOR SELECT s_name,s_gender FROM student;
    ```

2. 光标的使用：首先需要打开光标：
    ```sql
    OPEN cursor_name
    FETCH cursor_name INTO var_name1[,var_name2 ...];
    ```
    注意：其中的变量需要在使用光标之前就定义好。

3. 光标的关闭
    ```sql
    CLOSE cursor_name;
    ```
    如果没有明确地关闭光标，它便会在其他声明的复合语句的末尾被关闭。

####  流程控制的使用
1. IF 语句
    ```sql
    IF expr_condition THEN statement_list
        [ELSEIF expr_condition THEN statement_list]
        [ELSE statement_list]
    END IF
    -- 注意不要忘记结尾的 END IF。
    ```
2. CASE 语句
    ```sql
    CASE case_expr
        WHEN when_value THEN statement_list
        [WHEN when_value THEN statement_list]...
        [ELSE statement_list]
    END CASE
    -- case_expr 表示条件判断的表达式，when_value表示表达式的可能值，若与case_expr表达式结果相同，则执行该WHEN条件后的THEN语句

    -- CASE 语句的另一种格式：
    CASE
        WHEN expr_condition THEN statement_list
        [WHEN expr_condition THEN statement_list]
        [ELSE statement_list]
    END CASE;
    ```
3. LOOP 语句
    ```sql
    [loop_label:]LOOP
        statement_list
    END LOOP [loop_label]
    ```
4. LEAVE 语句
    ```sql
    -- LEAVE语句可用于跳出任何被标注的流程控制构造,其格式为：
    LEAVE label;
    ```
5. ITERATE 语句
    ```sql
    -- ITERATE意为再次循环，用于将执行顺序转到语句段的开头处：
    ITERATE label;
    ```
6. REPEAT 语句
    ```sql
    -- REPEAT语句用于创建一个带有条件判断的循环过程，它会重复执行statement_list直到expr_condition内容为真
    [repeat_label:]REPEAT
        statement_list
    UNTIL expr_condition
    END REPEAT[repeat_label]
    ```
7. WHILE 语句
    ```sql
    -- WHILE语句用于创建一个带有条件判断的循环过程，它会重复执行statement_list直到expr_condition内容不为真
    [while_label:]WHILE expr_condition
        statement_list
    END WHILE [while_label];
    ```

### 存储过程的使用
#### 调用存储过程
存储过程必须用 CALL 语句调用，并且存储过程和数据库相关，如果要执行其他数据库中的存储过程，需要指定数据库的名称。调用存储过程的语法如下：
```sql
CALL sp_name([parameter[,...]]);
```

存储过程操作示例：
```sql
-- 1.定义存储过程
mysql> DELIMITER //
mysql> CREATE PROCEDURE CountProcl(IN s_gender VARCHAR(50),OUT num INT)
    -> BEGIN
    -> SELECT COUNT(*) INTO num FROM student WHERE gender=s_gender;
    -> END //
Query OK, 0 rows affected(0.11 sec)

mysql> DELIMITER ;

-- 2.调用存储过程
mysql> CALL CountProcl("女",@num);

-- 3.查看返回结果
mysql> SELECT @num;
+-------+
| @num  |
+-------+
|   2   |
+-------+
1 row in set (0.00 sec)
```

#### 查看存储过程
1. SHOW STATUS 语句查询
    ```sql
    SHOW PROCEDURE|FUNCTION STATUS [LIKE 'pattern'];
    ```
    这个语句是MySQL的扩展，PROCEDURE 与 FUNCTION 分别查看存储过程和函数，LIKE语句表示匹配的名称，可以使用通配符进行查询。

2. SHOW CREATE 语句查询
    ```sql
    SHOW CREATE PROCEDURE|FUNCTION sp_name;
    ```
    这个语句是MySQL的扩展。类似于 SHOW CREATE TABLE ，它返回一个可以用来重新创建已命名子程序的确切字符串。

3. 从 information_schema.Routines 表中查询
    ```sql
    SELECT * FROM information_schema.Routines
    WHERE ROUTINE_NAME='pattern' AND ROUTINE_TYPE='PROCEDURE'|'FUNCTION';
    ```

#### 修改存储过程
```sql
ALTER PROCEDURE|FUNCTION sp_name [characteristic...]
```
- sp_name：存储过程或函数名称；
- characteristic：表示要修改存储过程的哪一部分，取值范围如下：
    1. `CONTAINS SQL`：表示子程序包含SQL语句，但不包含读或写数据的语句；
    2. `NO SQL`：表示子程序中不包含SQL语句；
    3. `READS SQL DATA`：表示子程序中包含读数据的语句；
    4. `MODIFIES SQL DATA`：表示子程序中包含写数据的语句；
    5. `SQL SECURITY DEFINER|INVOKER`：指明谁有权限来执行；
    6. `DEFINER`：表示只有定义者才有权限执行；
    7. `INVOKER`：表示调用者可以执行；
    8. `COMMENT'string'`：表示注释信息。

目前MySQL还不支持直接对存储过程中的代码进行修改，如果一定要修改，需要先删除已有存储过程再重新建立。

#### 删除存储过程
```sql
DROP PROCEDURE|FUNCTION [IF EXISTS] sp_name;
```
其中 `IF_EXISTS` 表示如果程序不存在，它可以避免发生错误，产生一个警告，该警告可以通过 `SHOW WARNINGS` 进行查询。