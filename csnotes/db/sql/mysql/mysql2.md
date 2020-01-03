# 数据操作-单表查询

## 添加、更新与删除数据

### 添加数据

#### 为表中所有字段添加数据

```sql
-- 1. INSERT INTO 语句中指定所有字段名
INSERT INTO tableName (columnName1,columnName2,...) VALUES|VALUE (value1,value2,...);

-- 2. INSERT INTO 语句中不指定字段名
INSERT INTO tableName VALUES|VALUE (value1,value2,...);
-- 注意：如果不加(columnName1,columnName2,...)字段，VALUES|VALUE便默认按顺序添加至每个字段。
```

#### 为表的指定字段添加数据

```sql
-- 1. INSERT INTO 语句
INSERT INTO tableName (columnName1,columnName2,...) VALUES|VALUE (value1,value2,...);
-- 此时未进行赋值的字段将被填入默认值，可以通过SHOW CREATE TABLE tableName命令查看default_value

-- 2. INSERT INTO 语句
INSERT INTO tableName
SET columnName1=value1[,columnName2=value2,...];
```

#### 同时添加多条记录
```sql
-- 1. INSERT INTO ，每条记录用括号包围，记录之间由逗号隔开
INSERT INTO tableName[(columnName1,columnName2,...)]
    VALUE|VALUES(value1,value2,...),
    (value1,value2,...),
    ...,
    (value1,value2,...);
```

### 更新数据
```sql
UPDATE tableName
    SET columnName1=value1[,columnName2=value2,...]
    [WHERE 语句];
```
1. UPDATE更新部分数据：需要配合 `WHERE` 语句使用；
2. UPDATE更新全部数据：没有 `WHERE` 语句时即更新全部数据。

### 删除数据
```sql
DELETE FROM tableName [WHERE 条件表达式];
```
1. DELETE删除部分数据：需要配合 `WHERE` 语句使用；
2. DELETE删除全部数据：没有 `WHERE` 语句时即删除全部数据。

>注：删除数据表中的内容还可以用 `TRUNCATE [TABLE] tableName` 实现。与 `DELETE` 的区别在于：
>1. 该命令属于DDL（Data Definition Language，数据定义语言），而 `DELETE` 属于DML（Data Manipulation Language，数据操作语言）；
>2. `TRUNCATE` 命令会将自动增加字段置1， `DELETE` 命令却不改动该字段（即再添加数据时会在原来基础上加一）；
>3. `DELETE` 语句删除每一条数据都会在日志中进行记录， `TRUNCATE` 语句在执行时不会在日志中记录删除内容，故后者执行效率较高。

## 单表查询
### 简单查询
#### SELECT语句
```sql
SELECT [DISTINCT] *|column1,column2,...
    FROM tableName
    [WHERE 条件表达式1]
    [GROUP BY columnName [HAVING 条件表达式2]]
    [ORDER BY columnName [ASC|DESC]]
    [LIMIT [OFFSET,] 记录数];
```
1. \[DISTINCT\] 为可选字段，用于剔除查询结果中的重复数据；
2. \[HAVING 条件表达式2\] 用于对分组后的结果进行过滤；
3. \[ASC|DESC\] 默认为ASC升序；
4. \[LIMIT \[OFFSET,\]\ 记录数] 限制查询结果的数量，OFFSET为偏移量，若从第一条开始查询则偏移量为0（也可省略）。

#### 无条件查询
```sql
-- 1.查询所有字段
SELECT * FROM tableName;

-- 2.查询指定字段
SELECT columnName1,columnName2,... FROM tableName;
```

### 按条件查询
#### 带关系运算符的查询

**<center>关系运算符</center>**

关系运算符|说明||关系运算符|说明
:--:|:--:|--|:--:|:--:
=|等于 || <=|小于等于
<>|不等于 || >|大于
!=|不等于 || >=|大于等于
<|小于 ||—|—

#### 带IN关键字的查询
```sql
SELECT *|columnName1,...
FROM tableName
WHERE columnName [NOT] IN (value1,value2,...);
```

#### 带 BETWEEN AND 关键字的查询
```sql
SELECT *|(columnName1,columnNmae2,...)
FROM tableName
WHERE tableName [NOT] BETWEEN value1 AND value2;
-- 包括起始值value1&value2，如果BETWEEN前添加NOT，排除内容也包括起始值
```

#### 空值查询
```sql
-- 注：空值并不意味着是数值0或空字符串；空值实际上是 NULL
SELECT *|columnName1,columnName2,...
FROM tableName
WHERE columnName IS [NOT] NULL;
```

#### 带 DISTINCT 关键字的查询
在使用 `SELECT columnName FROM...` 语句查询时，所查询列的内容可能存在重复。若在列名前添加 `DISTINCT` 关键字，就会筛选掉重复的结果，只显示不重复内容。

需要注意的是，在多列查询中，若在多列前添加 `DISTINCT` ，则只有这些列内容都一样时才会被认作相同内容。例如：
```sql
SELECT DISTINCT name,age FROM student;
```
只有在 `name` 与 `age` 字段都相同时，才会筛选掉重复内容。

#### 带 LIKE 关键字的查询
即匹配字符串的查询
```sql
SELECT *|columnName1,columnName2,...
FROM tableName
WHERE columnName [NOT] LIKE '匹配字符串';
```
其中的 `'匹配字符串'` 可以是普通字符串，也可以带 `% | _` 这两个通配符组合：
1. `%` ：匹配任意长度的字符串，包括空字符串。
2. `_` ：匹配单位长度的字符串，即几个下划线匹配几个字符的长度。

*注：若匹配字符串本身包含 % 或 _ ，则可在其前面添加反斜线 \，使他们取消通配字符属性，仅作普通字符参与匹配*

#### 带 AND | OR 关键字的多条件查询
AND 关键字连接的条件需要全部满足才能被查询到，OR 关键字连接的条件只需要满足一个就可以被查询到。
```sql
SELECT *|columnName1,columnName2,...
FROM tableName
WHERE 条件表达式1 AND|OR 条件表达式2 [AND|OR 条件表达式n]
```
注意当使用 ADN 与 OR 串联多个查询条件时，AND 的优先级高于 OR 。例如：
```sql
SELECT name,grade,gender FROM student WHERE gender='女' OR gender='男' AND grade=100;
```
其中查询条件：<br/> `gender='女' OR gender='男' AND grade=100` <br/>可转化为：<br/> `gender='女' OR (gender='男' AND grade=100)`

### 高级查询
#### 聚合函数

函数名称|作用
---|---
COUNT()|返回某列的行数（可以是COUNT(*)）
SUM()|返回某列值的和
AVG()|返回某列的平均值
MAX()|返回某列的最大值
MIN()|返回某列的最小值

#### 对查询结果排序
```sql
SELECT columnName1,columnName2,...
FROM tableName
ORDER BY column1 [ASC|DESC],column2 [ASC|DESC]
-- 默认为 ASC(升序排序)
```
若在排序中使用多列排序，则先对前一字段进行排序，若遇到相同值，再按照后一字段进行排序。

*注：若排序字段中出现NULL，一般会被认作为最小值*

#### 分组查询
一般形式：
```sql
SELECT columnName1,columnName2,...
FROM tableName
GROUP BY columnName1,columnName2,...[HAVING 条件表达式];
```

1. 分组查询一般与聚合函数配合使用，例如：
```sql
SELECT COUNT(*),gender FROM student GROUP BY gender;
```
这样聚合函数 `COUNT(*)` 就会按照 `gender` 字段进行分组计数了，即分别统计 `gender` 为 “男” “女” “NULL” `的条目数。

2. `HAVING` 关键字和 `WHERE` 关键字的作用相同，都可以设置条件表达式对查询结果进行过滤。区别在于 `HAVING` 关键字后面可以跟聚合函数，而 `WHERE` 关键字不能。`HAVING` 关键字和 `GROUP BY ` 一起使用。例如：
```sql
SELECT SUM(grade),gender FROM student GROUP BY  gender HAVING SUM(grade)<300;
```

#### 使用 LIMIT 限制查询结果的数量
```sql
SELECT cloumnName1,colunmName2,...
FROM tableName
LIMIT [OFFSET,] number
-- OFFSET：偏移量，默认为0,即第一条记录从0开始。number 为记录数
```

#### 函数（列表）
<center><strong>数学函数</strong></center>

函数名称|作用
--|--
ABS(x)|返回x的绝对值
SQRT(x)|返回x的非负二次方根
MOD(x,y)|返回x被y除后的余数
CEILING(x)|返回不小于x的最小整数
FLOOR(x)|返回不大于x的最大整数
ROUND(x,y)|对x进行四舍五入，小数保留y位
TRUNCATE(x,y)|舍去x中小数点y位后的数
SIGN(x)|返回x的符号，-1、0或1

<br/>
<center><strong>字符串函数</strong></center>

函数名称|作用
--|--
LENGTH(str)|返回字符串 str的长度
CONCAT(s1,s2,...)|返回一个或多个字符串连接产生的新字符串
TRIM(str)|删除字符串两侧的空格
REPLACE(str,s1,s2)|使用字符串s2替换str中的所有s1
SUBSTRING(str,n,len)|返回str子串，起始位置n，长度len
REVERSE(str)|返回字符串反转后的结果
LOCATE(s1,str)|返回子串s1在str中的起始位置

<br/>
<center><strong>日期和时间函数</strong></center>

函数名称|作用
--|--
CURDATE()|获取系统当前日期
CURTIME()|获取系统当前时间
SYSDATE()|获取当前系统日期和时间
TIME_TO_SEC()|返回将时间转换成秒的结果
ADDDATE()|执行日期的加计算
SUBDATE()|执行日期的减计算
DATE_FORMATE()|格式化输出日期和时间

<br/>
<center><strong>条件判断函数</strong></center>

函数名称|作用
--|--
IF(exexpr,v1,v2)|如果expr表达式为truetrue返回v1，否则返回v2
IFNULL(v1,v2)|如果v1不为NULL，返回v1，否则返回v2
CASE expr WHEN v1 THEN r1 [WHEN V2 THEN r2...][ELSE rn] END|如果expr值等于v1与v2等，则返回THEN后面的结果，否则返回rn


<br/>
<center><strong>加密函数</strong></center>

函数名称|作用
--|--
MD5(str)|对字符串进行MD5加密
ENCODE(str,pwd_str)|使用pwd作为密码加密字符串str
DECODE(str,pwd_str)|使用pwd作为密码解密字符串str

### 为表和字段取别名
```sql
-- 为表取别名
SELECT * FROM tableName [AS] 别名;
-- 为字段取别名
SELECT columnName [AS] 别名[,coulmnName2 [AS] 别名,...] FROM tableName;
```
使用示例：
```sql
SELECT * FROM student AS s WHERE s.id=8;
-- 在 student [AS] s 后，条件中使用s代替了student

SELECT name stu_name,gender stu_gender FROM student;
-- 查询结果的字段名将不再是name、gender，而是stu_name、stu_gender
```

