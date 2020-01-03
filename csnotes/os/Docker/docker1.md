# Docker 入门与安装

## Docker是什么？
>Build once, configure once and run anywhere.

Docker是一个新的容器化的技术，它轻巧，且易移植。它的优点有：
- 运行速度快
- 有着优雅的隔离框架
- 免费或少量付费
- CPU/内存低占用率
- 快速开/关机
- 跨云计算基础构架

概念|解释
--|--
镜像(Images)|用于创建 Docker 容器的模板
容器(Container)|独立运行的一个或一组应用。
客户端(Client)|客户端通过命令行或者其他工具使用 [Docker API](https://docs.docker.com/reference/api/docker_remote_api) 与 Docker 的守护进程通信
主机(Host)|一个物理或者虚拟的机器,用于执行 Docker 守护进程和容器
仓库(Registry)|用来保存镜像，可以理解为代码仓库
[Docker Hub](https://hub.docker.com) |提供庞大的镜像集合供使用
Docker Machine|是一个简化Docker安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装Docker，比如VirtualBox、 Digital Ocean、Microsoft Azure

**镜像**是一种轻量级、可执行的独立软件包，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

**容器**是镜像的运行时实例。默认情况下，它完全独立于主机环境运行，仅在配置为访问主机文件和端口的情况下才与主机存在交互。

下面是 Docker 容器与虚拟机的对比：

虚拟机|容器
--|--
通过管理程序对主机资源进行虚拟访问|每个容器都在独立进程中运行
资源密集，生成的磁盘镜像、应用状态、操作系统设置、系统安装的依赖项、操作系统安全补丁以及其他临时配置既容易丢失且难以复制|容器可以共享单个内核，并且需要存在于容器镜像中的唯一信息是可执行文件及其软件包依赖项，这些都不需要在主机系统上安装

## 安装 Docker
### CentOS 上安装 Docker CE
Docker有两个版本(since 2017.3)：Docker CE 与 Docker EE。Docker CE 即社区免费版，Docker EE 即企业版，强调安全，但需付费使用。在此安装的是 Docker CE ：
```bash
# 移除旧版(若未安装过，可以忽略)
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine

# Install using the repository

# 1 Set Up Docker Repository
# 安装必要的系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# 添加软件源信息
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

#（可选）enable Edge/Test Repo，默认Disable（将enable换位disable即取消使用）
#sudo yum-config-manager --enable docker-ce-edge
#sudo yum-config-manager --enable docker-ce-test

# 2 更新 yum 缓存
sudo yum makecache fast

# 3 安装 Docker CE
sudo yum install docker-ce
# 确认fingerprint: 060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35
# 查看历史版本
yum list docker-ce --showduplicates | sort -r
# 安装特定版本
sudo yum install docker-ce-<VERSION STRING>

# 4 启动 Docker 后台服务
sudo systemctl start docker
#开机运行
#chkconfig docker on

# 5 测试运行 hello-world
sudo docker run hello-world
```

### 设置 Docker 镜像
鉴于国内网络问题，后续拉取 Docker 镜像十分缓慢，我们可以需要配置加速器来解决，在此使用的是网易的镜像地址：http://hub-mirror.c.163.com。

新版的 Docker 使用json文件配置 Daemon ：
- Linux：`/etc/docker/daemon.json`
- Windows：`%programdata%\docker\config\daemon.json`

在该配置文件中加入（若是没有就新建一个）：
```
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
```

### 删除 Docker CE
执行以下命令来删除 Docker CE：
```bash
sudo yum remove docker-ce
sudo rm -rf /var/lib/docker
```

### 在其他操作系统上安装 Docker CE
[安装步骤参考](https://docs.docker-cn.com/docker-for-windows/install/)

## 术语
[Docker 术语表](https://docs.docker-cn.com/glossary/)