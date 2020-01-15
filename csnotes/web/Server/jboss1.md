# JBoss

## 什么是JBoss

### 什么是红帽 JBoss 中间件

红帽 JBoss 中间件通过提供快速构建将人员、流程和信息连接在一起的系统所需的工具，来帮助组织发展其中间件基础架构。这些连接且灵活的应用程序为用户提供了一种使其可致力于实现企业成功的新型、高效途径，这可增加收益、降低成本、保留更多客户，并改进与供应商的合作关系。

### 红帽 JBoss Web 服务器

>创建大型网站和轻量型 Wed 应用

随着企业不断发展，您需要迁至具有企业级功能的更安全、更稳定的环境，才能支持大型网站和轻量级 Web 应用。红帽® JBoss® Web 服务器将世界上部署最广的 Web 服务器（Apache），与顶级 servlet 引擎（Tomcat）和最可靠的支持完美融合于我们的中间件产品中。

## JBoss 的目录结构说明

目录|描述
--|--
bin|启动和关闭 JBoss 的脚本（ run.bat 为 windows 系统下的启动脚本， shutdown.bat 为 windows 系统下的关闭脚本）。
client|客户端与 JBoss 通信所需的 Java 库（ JARs ）。
docs|配置的样本文件（数据库配置等）。
docs/dtd|在 JBoss 中使用的各种 XML 文件的 DTD 。
lib|一些 JAR ， JBoss 启动时加载，且被所有 JBoss 配置共享。（不要把你的库放在这里）
server|各种 JBoss 配置。每个配置必须放在不同的子目录。子目录的名字表示配置的名字。 JBoss 包含 3 个默认的配置： minimial ， default 和 all ，在你安装时可以进行选择。
server/all|JBoss 的完全配置，启动所有服务，包括集群和 IIOP 。
server/default|JBoss 的默认配置。在没有在 JBoss 命令行中指定配置名称时使用。 ( 我们下载的 JBOSS5.0 Beta4 版本默认采用此配置 )
server/default/conf|JBoss 的配置文件。
server/default/data|JBoss 的数据库文件。比如，嵌入的数据库，或者 JBossMQ
server/default /deploy|JBoss 的热部署目录。放到这里的任何文件或目录会被 JBoss 自动部署。 EJB 、 WAR 、 EAR ，甚至服务。
server/default /lib|一些 JAR ， JBoss 在启动特定配置时加载他们(default 和 minimial 配置也包含这个和下面两个目录)
server/default/log|JBoss 的日志文件。
server/default/tmp|JBoss 的临时文件。

## 参考资源

- [红帽 JBoss Web 服务器](https://www.redhat.com/zh/technologies/jboss-middleware/web-server)
- [JBoss教程（学习简明手册）](https://atgoingguoat.iteye.com/blog/902535)
