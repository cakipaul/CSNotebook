# CSNotebook

[首页](https://cakipaul.com/csnotes) 程序猿社畜的技术成长笔记，由几位友人共同维护，感兴趣的朋友欢迎联系！

## 文件组织

### 概览

``` md
CSNotebook.git
|- README.md
|- csnotes/
|  |- tools/...
|  |- dev/...
|  |- hw/...
|  |- os/...
|  |- ...
|- inspur/
|  |- ...
|- log/
|  |- 2019_7.md
|  |- 2019_8.md
|  |- ...
|- others
|  |- jokes/
|  |  |- pics/...
|  |  |- meme/...
|  |  |- quotes_chengjie.md
|  |- events/...
|- res/...
|- gb/...
|- .gitignore
```

*说明 :*

- README.md ：本项目整体介绍文件
- csnotes/：CS笔记文件夹
  - 其他文件夹：请参照下文 [#csnotes文件夹](#csnotes文件夹) 里的介绍
- log/：本项目日志记录，记录笔记未来计划与历史编写记录，按年_月格式命名目录下的文件
  - 2019_7.md：2019年7月日志
  - 2019_8.md：2019年8月日志
- others/
  - jokes/
    - pics/...
    - meme/...
    - quotes_chengjie.md
  - events/...
- res/：资源链接
- gb/：gitbook build文件夹
- .gitignore

### csnotes文件夹

文件夹|说明
:--:|--
[tools](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/tools/SUMMARY.md)|markup（MarDown，YML），正则表达式，XML，技术文档，网络安全
[dev](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/dev/SUMMARY.md)|Git（Git，SVN，firefly，tfs），IDE（IntelliJ，VSCode），DevOps，CI/CD（GitLab，Jenkins，Travis-CI，Coding，Azure）
[hw](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/hw/SUMMARY.md)|底层（计组，汇编），GCC，嵌入式（STM32），存储技术（硬件部分）
[os](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/os/SUMMARY.md)|Linux，Shell，Docker
[ds](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/ds/SUMMARY.md)|数据结构，设计模式，LeetCode刷题
[db](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/db/SUMMARY.md)|MySQL，MongoDB，Redis，存储技术（软件部分）
[c](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/c/SUMMARY.md)|C/C++，Unity
[dotnet](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/dotnet/SUMMARY.md)|C#，.NET
[java](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/java/SUMMARY.md)|Java，Spring MVC，Spring Boot
[java](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/go/SUMMARY.md)|Go
[dart](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/dart/SUMMARY.md)|Dart，Flutter
[py](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/py/SUMMARY.md)|Python
[web](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/web/SUMMARY.md)|Network（OSI，TCP-IP，HTTP，SSL，SSH，Mail，FTP），Server（Apache，Nginx，IIS），H-Network(Bluetooth,WiFi,4G,ZigBee,NB-IoT)，通信原理
[fe](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/fe/SUMMARY.md)|前端（Html,CSS, JavaScript，PHP），js库（Node.js，Angular，React，vue），快速建站（Hexo，WordPress，GitBook）
[mobile](https://cakipaul.com/csnotes/html/docs.html?path=/csnotes/mobile/SUMMARY.md)|Android，IOS原生开发

>注：summary 文件夹中包含网页入口文件组织

## 格式规范

### csnotes格式规范

#### 新建/删除/整合分类

由管理员进行操作。

#### 分类内部文件组织

采用 GitBook 文件组织标准进行组织，以便在未来更好地拓展，并 CI/CD 成标准 GitBook 网页页面。参考链接：[GitBook 简明教程](http://www.chengweiyang.cn/gitbook/basic-usage/README.html)

以为 `db/` 文件夹例：

``` md
...
|- csnotes/
|  |- db/
|  |  |- SUMMARY.md
|  |  |- db-SUMMARY.md
|  |  |- README.md
|  |  |- book.json
|  |  |- .gitlab-ci.yaml
|  |  |- .gitignore
|  |  |- .coding-ide/...
|  |  |- sql/
|  |  |  |- mysql/
|  |  |  |  |- mysql1.md
|  |  |  |  |- ...
|  |  |- nosql/...
|  |  |- 参考资源/...
|  |  |- ...
|  |-...
|- ...
```

其中 SUMMARY.md 文件格式为：

``` md
# Summary

* [简介](/csnotes/db/README.md)

## SQL

### MySQL
* [入门-数据库与数据表的操作](/csnotes/db/sql/mysql/mysql1.md)
* [数据操作-单表查询](/csnotes/db/sql/mysql/mysql2.md)
* [多表操作-事务与存储过程](/csnotes/db/sql/mysql/mysql3.md)
* [视图-高级操作](/csnotes/db/sql/mysql/mysql4.md)

## noSQL
* [MongoDB](/csnotes/db/nosql/mongodb.md)
* [Redis](/csnotes/db/nosql/redis.md)

## 参考资源
* [分类链接](/csnotes/db/参考资源/分类链接.md)
```

可以看到，SUMMARY.md 文件中添加了整个 `/csnotes/db/` 文件夹中的笔记文件链接，即起到了目录作用。

README.md 文件则为入口文件，其中可以记录参考文件、整理日期、日志等。

其他几个文件/文件夹：

- db-SUMMARY.md：组织形式类似Summary，注意其中链接导向gitlab的pages服务部署后的网页文件
- book.json：生成GitBook的配置文件
- .gitlab-ci.yaml：GitLab的流水线配置文件
- .gitignore：Git的ignore文件
- .coding-ide/：Coding的工作区配置文件夹

### log日志记录规范

#### 命名

日志文件命名格式：`年份_月份.md`

#### 纲要

纲要示例：

``` md
# 2019年7月

## 本月计划

- [x] 7.10-7.11 初始化CSNotebook项目
- [ ] 7.10- 向 Ressap 介绍本项目

## 本月日志

1. 7.11 [csnotes/](/csnotes/html/docs.html) 初始化该项目目录组织，添加README.md
```

#### 条目

1. **计划条目命名**：
   - 未完成计划：`-_[_]_<持续日期>_<内容>`
   - 已完成计划：`-_[x]_<持续日期>_<内容>`
2. **日志条目命名**：`序号._<日期>_[标签]_<内容>`

>注：其中符号间的下划线“_”用空格代替

示例：

`7.12 [others/jokes/quotes_chengjie](/others/jokes/quotes_chengjie/SUMMARY.md) 更新`

**标签命名**：

1. **增删改操作**：可直接使用文件夹名，如 ：`[/csnotes/db/sql/mysql/mysql1.md]`，`[/log/2019_7.md]`

>注：若涉及文件较多，可采用高级目录作为标签。如：
>
>`1. 7.11 [csnotes/](/csnotes/html/docs.html) 初始化该项目目录组织，添加README.md`

## 维护人员

### cakipaul

- 个人主页：cakipaul.com
- 联系方式：cakipaul@gmail.com

### Ressap

- 联系方式：ressap2018@163.com
