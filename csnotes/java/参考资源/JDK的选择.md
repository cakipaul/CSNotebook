# 【转】Oracle/Sun JDK与OpenJDK的区别和联系

原文链接：[https://blog.csdn.net/lsx2017/article/details/81273548](https://blog.csdn.net/lsx2017/article/details/81273548)

---

>在《深入理解JAVA虚拟机》这本书中有一下约定
>
>1：本书中提到的HotSpot、JRockit虚拟机、WebLogic服务器等产品所有者是，仍然使用Sun和BEA公司的名称，实际上，BEA和Sun分别于2008年和2009年被Oracle公司收购，现在已经不存在这两个商标了。
>
>2：JDK从1.5版本开始，在官方的正式文档与宣传资料中已经不再使用类似“JDK1.5”的名称，只有程序员内部使用的开发版本号才继续沿用1.5，1.6，1.7的版本号，而且公开版本号则改为JDK5, JDK6, JDK7，为了行文一致，本书所有场合统一采用开发版本号的命名方式。

## 简单介绍

>OpenJDK原是SunMicrosystems公司为Java平台构建的Java开发环境（JDK）的开源版本，完全自由，开放源码。Sun Microsystems公司在2006年的JavaOne大会上称将对Java开放源代码，于2009年4月15日正式发布OpenJDK。甲骨文在 2010 年收购SunMicrosystem之后接管了这个项目。
>
>Oracle/Sun JDK里面包含的JVM是HotSpotVM，HotSpot VM只有非常非常少量的功能没有在OpenJDK里，那部分在Oracle内部的代码库里。这些私有部分都不涉及JVM的核心功能。所以说，Oracle/Sun JDK与OpenJDK其实使用的是同一个代码库。
>
>从一个Oracle内部员工的角度来看，当他要构建OracleJDK时，他同样需要先从http://hg.openjdk.java.net签出OpenJDK，然后从Oracle内部的代码库签出私有的部分，放在OpenJDK代码下的一个特定目录里，然后构建。
>
>值得注意的是，Oracle JDK只发布二进制安装包，而OpenJDK只发布源码。

## 详细介绍

>首先要先明确之间，以及OpenJDK 6、OpenJDK 7、OpenJDK 7u和OpenJDK 8等项目之间是什么关系，这有助于确定接下来编译要使用的JDK版本和源码分支。
>
>从前面介绍的Java发展史中我们了解到OpenJDK是Sun在2006年末把Java开源而形成的项目，这里的“开源”是通常意义上的源码开放形式，即源码是可被复用的，例如IcedTea、UltraViolet都是从OpenJDK源码衍生出的发行版。但如果仅从“开源”字面意义（开放可阅读的源码）上看，其实Sun自JDK 1.5之后就开始以Java Research License（JRL）的形式公布过Java源码，主要用于研究人员阅读（JRL许可证的开放源码至JDK 1.6 Update 23为止）。把这些JRL许可证形式的Sun/OracleJDK源码和对应版本的OpenJDK源码进行比较，发现除了文件头的版权注释之外，其余代码基本上都是相同的，只有字体渲染部分存在一点差异，Oracle JDK采用了商业实现，而OpenJDK使用的是开源的FreeType。当然，“相同”是建立在两者共有的组件基础上的，Oracle JDK中还会存在一些Open JDK没有的、商用闭源的功能，例如从JRockit移植改造而来的Java Flight Recorder。预计以后JRockit的MissionControl移植到HotSpot之后，也会以Oracle JDK专有、闭源的形式提供。

Oracle的项目发布经理Joe Darcy在OSCON 2011上对两者关系的介绍也证实了OpenJDK 7和Oracle JDK 7在程序上是非常接近的，两者共用了大量相同的代码（如下图，注意图中提示了两者共同代码的占比要远高于图形上看到的比例），所以我们编译的OpenJDK，基本上可以认为性能、功能和执行逻辑上都和官方的Oracle JDK是一致的。

### Dalvik 与java虚拟机

1. java虚拟机基于栈。 基于栈的机器必须使用指令来载入和操作栈上数据，所需指令更多更多；而dalvik虚拟机是基于寄存器的：java虚拟机运行的是java字节码。(java类会被编译成一个或多个字节码.class文件，打包到.jar文件中，java虚拟机从相应的.class文件和.jar文件中获取相应的字节码）
2. Dalvik和Java之间的另外一大区别就是运行环境——Dalvik经过优化，允许在有限的内存中同时运行多个虚拟机的实例

OpenJDK :

```bash
[root@localhost ~]# java -version
java version "1.6.0_39"
OpenJDK Runtime Environment (IcedTea6 1.13.11) (rhel-1.13.11.0.el5_11-x86_64)
OpenJDK 64-Bit Server VM (build 23.25-b01, mixed mode)
```

oracle jdk:

```bash
java version "1.8.0_91"
Java(TM) SE Runtime Environment (build 1.8.0_91-b14)
Java HotSpot(TM) 64-Bit Server VM (build 25.91-b14, mixed mode)
```

OpenJDK下载： [http://openjdk.java.net/install/index.html](http://openjdk.java.net/install/index.html)

```bash
# JDK 8
yum install java-1.8.0-openjdk

# JDK 7
yum install java-1.7.0-openjdk

# JDK 6
yum install java-1.6.0-openjdk
```

### HotSpot

SUN的JDK版本从1.3.1开始运用HotSpot虚拟机， 2006年底开源，主要使用C++实现，JNI接口部分用C实现。

HotSpot是较新的Java虚拟机，用来代替JIT(Just in Time)，可以大大提高Java运行的性能。 

Java原先是把源代码编译为字节码在虚拟机执行，这样执行速度较慢。而HotSpot将常用的部分代码编译为本地(原生，native)代码，这样显着提高了性能。 

HotSpot JVM 参数可以分为规则参数(standard options)和非规则参数(non-standard options)。 

规则参数相对稳定，在JDK未来的版本里不会有太大的改动。 非规则参数则有因升级JDK而改动的可能。规则和非规则参数这里不做介绍了，网上资料很多。

#### HotSpot 基础知识

HotSpot包括一个解释器和两个编译器（client 和 server，二选一的），解释与编译混合执行模式，默认启动解释执行。

编译器：java源代码被编译器编译成class文件（字节码），java字节码在运行时可以被动态编译（JIT）成本地代码(前提是解释与编译混合执行模式且虚拟机不是刚启动时)。

解释器： 解释器用来解释class文件（字节码），java是解释语言（书上这么说的）。

server启动慢，占用内存多，执行效率高，适用于服务器端应用；

client启动快，占用内存小，执行效率没有server快，默认情况下不进行动态编译，适用于桌面应用程序。

由-XX:+RewriteFrequentPairs参数控制  client模式默认关闭，server模式默认开启

在jre安装目录下的lib/i386/jvm.cfg 文件下。



```bash
java -version

Java HotSpot(TM) Client VM (build 14.3-b01, mixed mode, sharing)

# mixed mode 解释与编译 混合的执行模式 默认使用这种模式


java -Xint -version

Java HotSpot(TM) Client VM (build 14.3-b01, interpreted mode, sharing)

# interpreted  纯解释模式 禁用JIT编译


java -Xcomp -version

Java HotSpot(TM) Client VM (build 14.3-b01, compiled mode, sharing)

# compiled  纯编译模式（如果方法无法编译，则回退到解释模式执行无法编译的方法）
```


#### 动态编译

动态编译(compile during run-time)，英文称Dynamic compilation；Just In Time也是这个意思。

HotSpot对bytecode的编译不是在程序运行前编译的，而是在程序运行过程中编译的。HotSpot里运行着一个监视器（Profile Monitor），用来监视程序的运行状况。

java字节码（class文件）是以解释的方式被加载到虚拟机中(默认启动时解释执行)。 程序运行过程中，那一部分运用频率大，那些对程序的性能影响重要。对程序运行效率影响大的代码，称为热点（hotspot），HotSpot会把这些热点动态地编译成机器码（native code），同时对机器码进行优化，从而提高运行效率。对那些较少运行的代码，HotSpot就不会把他们编译。

HotSpot对字节码有三层处理：不编译(字节码加载到虚拟机中时的状态。也就是当虚拟机执行的时候再编译)，编译(把字节码编译成本地代码。虚拟机执行的时候已经编译好了，不要再编译了)，编译并优化（不但把字节码编译成本地代码，而且还进行了优化）。

至于那些程序那些不编译，那些编译，那些优化，则是由监视器（Profile Monitor）决定。

#### 为什么不静态编译

为什么字节码在装载到虚拟机之前就编译成本地代码那？ 

动态编译器也在许多方面比静态编译器优越。静态编译器通常很难准确预知程序运行过程中究竟什么部分最需要优化。

函数调用都是很浪费系统时间的，因为有许多进栈出栈操作。因此有一种优化办法，就是把原来的函数调用，通过编译器的编译，改成非函数调用，把函数代码直接嵌到调用出，变成顺序执行。

面向对象的语言支持多态，静态编译无效确定程序调用哪个方法，因为多态是在程序运行中确定调用哪个方法。

## JDK 版本

jdk 1.9 等价JDK9 J2SE9 JAVA9

jdk 1.8 等价JDK8 J2SE8 JAVA8

jdk 1.7 等价JDK7 J2SE7 JAVA7

jdk 1.6 等价JDK6 J2SE6 JAVA6

jdk 1.5 等价JDK5 J2SE5 JAVA5

jdk 1.4 等价J2SE1.4

jdk 1.3 等价J2SE1.3

jdk 1.2 等价J2SE1.2

jdk 1.1

## openjdk源码下载

Oracle JDK只发布二进制安装包，而OpenJDK只发布源码。获取OpenJDK源码有两种方式：

### 直接下载源码

下载OpenJDK7u的源代码：

```bash
hg clone http://hg.openjdk.java.net/jdk7u/jdk7u-dev
cd jdk7u-dev
chmod 755 get_source.sh
./get_source.sh
```

下载OpenJDK8u的源代码：

```bash
hg clone http://hg.openjdk.java.net/jdk8u/jdk8u-dev
cd jdk8u-dev
./get_source.sh
```

注意：这是最直接的方式，从版本管理中看变更轨迹比看Release Note效果更好。但不足之处是速度太慢，虽然代码总容量只有300 MB左右，但是文件数量太多，在笔者的网络下全部复制到本地需要数小时。

#### 下载官方打包好的源码包

读者可以从Source Bundle Releases页面（地址：http://jdk7.java.net/source.html）取得打包好的源码，到本地直接解压即可。
一般来说，源码包大概一至两个月左右会更新一次，虽然不够及时，但比起从Mercurial复制代码的确方便和快捷许多。

笔者下载的是OpenJDK 7 Update 6 Build b21版源码包，2012年8月28日发布，大概99MB，解压后约为339MB。

>备注：推荐在linux平台或者mac平台上面编译jdk