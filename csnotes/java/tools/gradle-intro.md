# Gradle 教程

- 教程资源：[https://www.yiibai.com/gradle/](https://www.yiibai.com/gradle/)
- 官网：[https://gradle.org/](https://gradle.org/)

Ant和Maven共享在Java市场上相当大的成功。ANT是在2000年发布了第一个版本的工具，它是基于程序编程思想的发展。 后来，人们在 Apache-Ivy的帮助下，网络接受插件和依赖管理的能力有所提升。但主要缺点是使用XML作为一种格式来写构建脚本。XML是分层的，不利于程序的编程，而且当XML文件变大以后变得难以管理。

Maven在2004年推出的，它比ANT有一个很大的改进。它改变了结构并且继续使用XML编写生成规范。Maven的依赖约定和能够通过网络下载依赖关系。Maven的主要好处是它的生命周期。虽然接连的多个项目生命周期相同，这是以灵活性为代价的。 Maven也面临着依赖管理的一些问题。它不会在同一库版本之间处理好矛盾，复杂的定制构建脚本实际上Maven比ANT更难写。

最后，Gradle于2012年发布，带来了一些更高效的特点。

Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化建构工具。它使用一种基于Groovy的特定领域语言(DSL)来声明项目设置，抛弃了基于XML的各种繁琐配置。 面向Java应用为主。当前其支持的语言限于Java、Groovy和Scala，计划未来将支持更多的语言。//原文出自【易百教程】，商业转载请联系作者获得授权，非商业请保留原文链接：https://www.yiibai.com/gradle/

## gradlew 和 gradle命令的区别

- 参考：[https://juejin.im/post/5ac9d48d6fb9a028e014bf15](https://juejin.im/post/5ac9d48d6fb9a028e014bf15)

### 定义区别：

Gradlew 是包装器，自动下载包装器里定义好的 gradle 版本，保证编译环境统一，gradle 是用本地的gradle版本。

对于gradlew，其在Android studio的指定是在gradle/wrapper/gradle-wrapper.properties 中完成的，例如下面的代码即指定app编译的gradle版本为4.1。

### 存放路径不同

对于系统gradle其存放在 ~/.gradle 下面。本系统可在该文件夹下面找到gradle2.12相关的内容。对于gradlew其存放在 ～/.gradlew/wrapper/dists 下面。这个下面有着许多版本的gradle。这些就是gradlew下载下来的gradle版本。

### 使用gradle版本不同

若你在命令行使用gradlew 那么你使用的是存放在～/.gradlew/wrapper/dists路径下面的,通过在gradle/wrapper/gradle-wrapper.properties文件指定的gradle脚本。而你若使用gradle命令行，那么你使用的是~/.gradle下面的gradle脚本。
