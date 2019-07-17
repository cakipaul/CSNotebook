# 底层-算法-后端-前端-架构-生态-IT知识&技能表

## 自然语言

- [程序员最容易读错的单词](https://github.com/xingshaocheng/chinese-programmer-wrong-pronunciation)
- [程序员的单词册](https://www.kancloud.cn/haixu926611/study-english/112097)
- [程序员单词-扇贝](https://www.shanbay.com/wordbook/76237/)

## 计算机哲学

- 知识图谱参考:[GitHub TeamStuQ](https://github.com/TeamStuQ/skill-map)
- UML：事物(Things，UML模型中最基本的构成元素，是具有代表性的成分的抽象）、关系(Relationships，关系把事物紧密联系在一起）、图(Diagrams ，图是事物和关系的可视化表示）  [UML官网](http://www.uml.org/)

## 底层

### 电路、模数电子线路

### 硬件设计

- 设计工具：Protel、Altium、FreePCB
- 硬件仿真：Multisim、Proteus、Pspice
- 信号仿真：MATLAB、ADS、HFSS、HyperLynx、Sigrity
- 结构：CPU、GPU、MCU、CPLD、FPGA、MIPS

### 计算机组成原理

- 发展历史、层次结构、性能指标
- 数制与编码 ：计数制、真值和机器数、BCD码、定点数、浮点数、ALU
- 存储系统：层次结构、半导体随机存储器、主存储器和CPU的连接、双口RAM和多模块存储器、高速缓存、虚拟储存
- 指令系统：指令格式、寻址方式、CISC和RISC、
- CPU：基本结构、指令执行过程、数据通路、控制器、指令流水线
- 总线：概念、仲裁、操作与定时、标准
- I/O系统：基本概念、外部设备、I/O接口、I/O方式

### MCU与嵌入式

- [嵌入式工程师](https://github.com/TeamStuQ/skill-map/blob/master/data/map-EmbeddedEngineer.md)：控制器、执行器、传感器、电子元件、通信、电路

## 操作系统

### 操作系统原理

- 基本概念、发展与分类、运行环境、体系结构
- 进程管理：进程与线程、处理机调度、进程同步、死锁
- 内存/文件管理：内存管理概念、虚内存、文件系统、磁盘组织与管理
- I/O管理：I/O设备、I/O控制方式、I/O子系统的层级、I/O核心子系统（高速缓存与缓冲区、设备分配与回收、SPOOLing假脱机技术）
- 具体实现：
  - Linux：Centos、Debian、Ubuntu
  - Windows
  - MacOS
  - IOS: [IOS开发技能表](https://github.com/TeamStuQ/skill-map/blob/master/data/map-MobileDev-iOSDev.md)
  - Android: [Android开发技能表](https://github.com/TeamStuQ/skill-map/blob/master/data/map-MobileDev-AndroidDev.md) [Android架构师](https://github.com/TeamStuQ/skill-map/blob/master/data/map-MobileDev-AndroidArchitect.md)

## 数据与算法

### 数据结构

- [阿里巴巴后端架构师资源](https://github.com/xingshaocheng/architect-awesome/blob/master/README.md#%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8)
- [阿里技术参考图册-算法篇](http://techforum-img.cn-hangzhou.oss-pub.aliyun-inc.com/1523848064814/AliTech101_Algorithms.pdf)
- 基本概念与术语、抽象数据类型、算法与算法分析
- 线性表（顺序表示、链式表示）、栈和队列（栈与递归、循环队列、链队）、串/数组和广义表、树和二叉树（树与二叉树的定义、遍历二叉树、线索二叉树、树和森林、哈夫曼树）、图（存储（邻接矩阵、邻接表、十字链表、邻接多重表）、深度优先搜索、广度优先搜索、最小生成树、最短路径、拓扑排序、关键路径）
- 查找：线性表的查找（顺序、折半/二分、分块）、树表查找（二叉排序树、平衡二叉树、B-/+树）、散列表
- 排序：基本概念、交换排序（冒泡、快速）、插入排序（直接插入、折半插入、希尔）、选择排序（简单、树形、堆）、归并排序、基数排序（多关键字的排序、链式基数排序）、外部排序（多路平衡归并、置换-选择、最佳归并树）、计数、桶、Java 中的排序工具
- 其他算法：布隆过滤器、字符串比较、KMP 算法、深度优先、广度优先、贪心算法、回溯算法、剪枝算法、动态规划、朴素贝叶斯、推荐算法、最小生成树算法、最短路径算法
- [设计模式](http://www.runoob.com/design-pattern/design-pattern-tutorial.html)：六大原则（开闭原则、里氏替换原则、依赖倒转原则、接口隔离原则、迪米特法则、合成复用原则）、23种常见设计模式(eg. 1.结构型模式：适配器、桥接模式、组合模式、装饰者模式、享元模式、代理模式；2.创建模式：抽象工厂模式、建造模式(Builder)、工厂方法、原型模式、3.单例模式；行为模式：责任链模式、命令模式、解释器模式、迭代器模式、中介者模式、空对象模式、观察者模式）

### 数据库

- 关系型数据库：SQL语言
  - MySQL：原理、存储引擎（MyISAM、InnoDB）、优化、索引（聚集索引/非聚集索引、复合索引、自适应哈希索引(AHI)）、锁、explain
  - Oracle、db2
- Nosql：hbase、mongodb
- 大数据：流式计算（Storm、Flink、Kafka Stream、应用场景）、Hadoop（HDFS、MapReduce、Yarn、zookeeper、cassandra ）、Spark [Hadoop家族技能图谱](https://github.com/TeamStuQ/skill-map/blob/master/data/map-Hadoop.md)
- 搜索引擎：搜索引擎原理、Lucene、Elasticsearch、Solr、sphinx
- 缓存：本地缓存、客户端缓存、服务端缓存、Web缓存、Memcache、Redis（架构、数据结构、持久、复制、cas、单线程、回收策略）、HDFS、Tair
- 消息队列：消息总线、消息顺序、RabbitMQ、RockerMQ、ActiveMQ、JMS（Queue、Topic）、Kafka（持久、复制、Partition、Stream）、Redis 消息推送、ZeroMQ

### 机器/深度学习

- [机器学习技能图谱](https://github.com/TeamStuQ/skill-map/blob/master/data/map-MachineLearning.md)
- [Apollo自动驾驶技术图谱](https://github.com/TeamStuQ/skill-map/blob/master/data/map-Apollo.md)

## 编程语言

### 资源

- [十分钟学习十种语言](http://www.shouce.ren/api/view/a/15090)
- [博客精选](http://www.shouce.ren/api/view/a/15470)

### 编译、语言后端

- 编译器/虚拟机
- 编译原理
  - GNU/GCC
  - JVM：多线程与并发、GC（GC收集类型、算法、分区）、IO/NIO（同步（非）阻塞、基于信号、多路复用、异步IO）、类加载（双亲委派、OSGI）
- 语言
  - 汇编
  - C/C++/Object-C/C#
  - Java：语言（异常、类继承、泛型、内部类、反射、序列化、对象类、字符串类、引用）、类库（集合、流）
  - Golang
  - Ruby
  - Rust
  - Swift
  - Python [Python技能图](https://github.com/TeamStuQ/skill-map/blob/master/data/map-DevLang-Python.md)
- IDEA：Eclipse、IntelliJ、vi、Visual Studio
- 云平台：Azure、Tencent Coding

### Web、UI前端

- [前端技能与工具表](https://github.com/TeamStuQ/skill-map/blob/master/data/map-FrontEndEngineer.md)
- [Web前端技术图谱](http://www.runoob.com/w3cnote/webfrontendstack.html)
- 浏览器：
  - 渲染引擎：IE6/7/8/9/10/11 (Trident）、Firefox (Gecko)、Chrome/Chromium (Blink)、 Safari (WebKit)、 Opera (Blink)
  - 脚本引擎：JScript (IE8- / ASP)、Chakra (IE9+ / Edge)、V8 (Chrome / Opera / Nodejs / MongoDB) 、SpiderMonkey (Firefox)、JavaScriptCore (Safari)
  - 运行时：Cookie、Local Cache、Session Storage、Local Storage、Components（Extensions、Plugins）、Resources（Images、Icons、Fonts、Audios、Videos）
- 页面：HTML/HTML5（DOM、Element、Attribute）、CSS/CSS3（Selector、Priority、Specificity、Box Model）、Sass/LESS/Stylus、PhotoShop/Paint.net/Fireworks/GIMP/Sketch [html5知识图谱]
- 语言：PHP、JavaScript/Node.js（Prototype、Scope、Closure、JSON (JavaSript Object Notation)、AJAX (Asynchronous JavaScript and XML)）、CoffeeScript、TypeScript [Node.js技能表]
- 库/框架：jQuery/Underscore/Mootools/Prototype.js、YUI3/Dojo/ExtJS/KISSY、Backbone/KnockoutJS/Emberjs、AngularJS、Batarang、Bootstrap、Semantic UI、Juice UI、Web Atoms、Polymer、Dhtmlx、qooxdoo、React、Brick、Vue.js [Angular技能表]
- 编译器： VIM/Sublime Text2、Notepad++/EditPlus、WebStorm、Emacs EmacsWiki、Brackets、Atom、Visual Studio、Visual Studio Code (Linux & Mac) 、Dreamweaver、FrontPage / SharePoint Designer
- 代码质量：Eslint/JSLint/JSHint/jscs、CSSLint、Markup Validation Service、HTML Validators
- 跨平台UI框架：Flutter
- SEO技术

## 软件架构与性能管理

- 参考
  - [阿里巴巴后端架构师技术图谱](https://github.com/xingshaocheng/architect-awesome)
  - [StuQ架构师技能树](https://github.com/TeamStuQ/skill-map/blob/master/data/map-Architect.md)
  - [架构漫谈](http://www.shouce.ren/api/view/a/15438)
  - [后端技术栈演进与开源实践](https://coderxing.gitbooks.io/architecture-evolution/)
  - [阿里技术参考图册-研发篇](http://techforum-img.cn-hangzhou.oss-pub.aliyun-inc.com/1523849261680/AliTech101_RD.pdf)

### 服务器组件

分布式文件系统、分布式存储系统、分布式队列系统、分布式缓存系统、分布式计算、分布式计数器、分布式锁。

- [云计算工程师](https://github.com/TeamStuQ/skill-map/blob/master/data/map-CloudComputing.md)
- 分布式：负载均衡、水平伸缩、集群、分片（key-hash、一致性hash）、异步、消峰、分库分表、锁（悲观锁、乐观锁、行级锁、分布式锁、分区排队）、一致性（一致性原理、一致性算法）

### 架构

- [Dubbo](http://dubbo.apache.org/en-us/)（=CXF+Govern+Monitor）
- [Thrift](http://thrift.apache.org/)
- [gRPC](https://grpc.io/)
- 参考：
  - [Dubbo原理简介](https://www.cnblogs.com/steven520213/p/7606598.html)
  - [ThriftRPC详解](https://blog.csdn.net/kesonyk/article/details/50924489)
  - [你应该知道的grpc原理](https://www.cnblogs.com/LBSer/p/4853234.html)

- SSH(SSM)：Struts+Spring(AOP、IOC、Spring MVC、Spring Boot、yaml)+Hibernate。
  - [运维派](http://www.yunweipai.com/)
  - SpringCloud：[博客与资源网站汇总](https://github.com/xingshaocheng/awesome-spring-cloud)
  - 测试：老框架（junit、easymock）、新框架（testing、mockito） [TesterHome](https://testerhome.com/) [测试窝](https://www.testwo.com/) [领测国际](http://www.ltesting.net/)
  - 日志：老框架（common logging、log4j、jdk logger）、新框架（slf4j、logback）
  - 版本管理：SVN、Git（开发流程、code review、hotfix流程） [Git功能表](https://github.com/TeamStuQ/skill-map/blob/master/data/map-Git.md)

### 性能优化

分层优化（系统级别、中间件级别、JVM级别、代码级别）、分段优化（前端、后端、资源）

### 微服务

- [微服务架构技能图](https://github.com/TeamStuQ/skill-map/blob/master/data/map-Microservice.md)
- [Spring Cloud微服务学习](https://github.com/forezp/SpringCloudLearning)

### 游戏引擎

Unity、Unreal

## 网络与通信

### 通信原理

### 嵌入式通信

- 硬件间无线通信：Bluetooth、Xbee / Zigbee、Z-Wave、6LoWPAN、NFC、Wifi、Radio、IR (红外)、802.11、Sub-GHZ 1Ghz以下RF
- 硬件通信：UART、I2C、RS232C/RS485、HDLC、SPI/SCI/SI、CAN、USB、FireWire、1-wire
- 协议：HTTP、CoAP、MQTT、XMPP、WebSocket、UDP、TCP

### 计算机网络

- [运维工程师](https://github.com/TeamStuQ/skill-map/blob/master/data/map-IntelligentDevOps.md)
- 计算机网络基础（OSI、DNS、UDP、TCP/IP、HTTP协议）[DNS排查技术](https://github.com/TeamStuQ/skill-map/blob/master/data/map-dns-troubleshoot.md)
  - 物理层：通信基础（奈奎斯特定律、香农定理）、传输介质（媒介、接口）、物理层设备（中继器、集线器）
  - 数据链路层：帧透明传输、组帧（字符计数法、字符/比特填充、违规编码法）、差错控制（检错编码、纠错编码）、流量控制（滑动窗口机制、GBN、SR）、介质访问控制（信道划分、随机访问、轮询访问）、局域网（以太网IEEE802.3、IEEE802.11、令牌环网）、广域网（PPP协议、HDLC协议）、数据链路层设备（网桥、局域网交换机）
  - 网络层：功能（异构网络互连、路由与转发、拥塞控制）、路由算法（静态/动态路由、距离-向量路由算法、链路状态路由算法、层次路由）、IPv4（分组、NAT、子网与子网掩码、CIDR、ARP协议、DHCP协议、ICMP协议）、IPv6、路由协议（自治系统、域内/间路由、RIP协议、OSPF协议、BGP协议）、IP组播（组播地址、IGMP协议与组播路由算法）、移动IP、网络层设备（路由器与路由表）
  - 传输层：功能（寻址与端口、无连接与面向连接服务）、UDP协议（UDP数据报、UDP校验）、TCP协议（报文段、连接管理、可靠传输、流浪控制、拥塞控制）
  - 应用层：网络应用模型（客户/服务器模型、P2P模型）、DNS系统、FTP、电子邮件（MIME、STMP协议、POP3协议）、万维网WWW（组成结构、HTTP协议）、SSH
- 服务器（中间件/接入层）：Nginx、Apache、Lighttpd、Tomcat、JBoss、Node.js
- CDN：[CDN技术](https://github.com/TeamStuQ/skill-map/blob/master/data/map-CDN.md)图床 [SM.MS图床](https://sm.ms)
- 移动网络：[移动优化](https://github.com/TeamStuQ/skill-map/blob/master/data/map-MobilePerformanceOptimization.md)
- 直播技术：[直播技术](https://github.com/TeamStuQ/skill-map/blob/master/data/map-LiveTelecast.md)

### 网络安全与黑客攻防

- [安全工程师](https://github.com/TeamStuQ/skill-map/blob/master/data/map-SecurityEngineer.md)
  - web 安全（XSS、CSRF、SQL 注入、Hash Dos、脚本注入、漏洞扫描工具、验证码）、DDoS 防范、用户隐私信息保护、序列化漏洞、加密解密（对称加密、哈希算法、非对称加密）、服务器安全、数据安全（数据备份）、网络隔离（内外网分离、登录跳板机）、授权/认证（RBAC、OAuth2.0、双因素认证（2FA）、单点登录(SSO)）

### IoT物联网

## CTO与产业生态管理

- 参考
  - [CTO能力表](https://github.com/TeamStuQ/skill-map/blob/master/data/map-CTO.md)
  - [选择一个开源协议](http://choosealicense.online/)
- 项目管理：架构评审、重构、代码规范、代码 Review、RUP、看板管理、SCRUM、敏捷开发、极限编程（XP）、结对编程、PDCA 循环质量管理、FMEA管理模式
- 洞察、设计与架构[系统设计指南](https://github.com/xingshaocheng/system-design-primer)
- 员工心理情绪管理
- 沟通、交流与谈判
- 行业前沿 [全球架构师峰会](https://bj2018.archsummit.com/)
