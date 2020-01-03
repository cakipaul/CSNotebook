# Docker 基本原理

![docker](/Docker/docker1.jpg)

## Docker的层级
按照 Docker 方式构建应用：
- 底层：容器
- 中间是服务：它定义了容器在生产中的行为方式
- 最高层是技术栈，用于定义所有服务的交互

## Docker 组件与元素
Docker三大组件：
- Docker Client : 用户界面，它支持用户与Docker Daemon进行通信。
- Docker Daemon : 运行于主机上，处理服务请求。
- Docker Index : 中央registry，即云备份的镜像仓库，并能控制私有与公有访问权限。

三个基本要素：
- Docker Images : 一个只读模板，用来运行Docker容器(Containers)。
- Docker Containers : 即实际运行(实例化)的镜像(Imgaes)，包括操作系统、用户添加的文件以及元数据。
- DockerFile : 文件指令集，用来说明如何自动创建Docker镜像。

Docker在操作系统上使了如下功能来提高容器效率：
- Namespaces : 充当隔离的第一级，在逻辑层面确保每个容器进程的独立，包括数据隔离与访问权隔离。
- Control Groups : 是LXC（Linux container，是内核级的虚拟化的解决方案）的重要组成部分，具有资源核算与限制的关键功能。
- UnionFS(文件系统) : 作为容器的构建块。它创建了用户层用以确保Docker的轻量与高速。

## Docker运行步骤
### Client
在Docker上运行程序需要经过两个基本步：
1. 创建 Docker 镜像 image
2. 运行容器 container
这都是在 Docker Client 上发出的命令。它会告诉守护进程 Daemon 需要创建什么样的镜像容器以及创建好容器后所要执行的命令。
### Deamon
1. 构建镜像

    Docker Image是一个构建容器的只读模板，它包含了容器启动所需的所有信息，包括运行程序和配置数据。每个镜像都源于一个基本的镜像，然后根据Dockerfile中的指令创建模板。

    一旦镜像创建完成，就可以将它们推送到中央registry：Docker Index，以供他人使用。然而，Docker Index为镜像提供了两个级别的访问权限：公有访问和私有访问。公有仓库是可搜索和可重复使用的，而私有仓库只能给那些拥有访问权限的成员使用。Docker官网有私有仓库的套餐可以供你选择。

2. 运行容器

    当容器被启动后，一个读写层会被添加到镜像的顶层。当分配到合适的网络和IP地址后，需要的应用程序就可以在容器中运行了。

## Docker 服务
### swarm
swarm 是一组运行 Docker 并且已加入集群中的机器。swarm 由多个节点组成，这些节点可以是物理或虚拟机。我们可以运行 `docker swarm init` 以启用 swarm mode 并使当前机器成为 swarm 管理节点，然后在其他机器上运行 `docker swarm join` 使它们加入 swarm。加入 swarm 后，可以将它们称为节点（工作节点）。

详细说明参考：[Swarm(https://docs.docker-cn.com/get-started/part4/#%E8%AE%BF%E9%97%AE%E9%9B%86%E7%BE%A4)

### docker-compose.yml 文件
在分布式应用中，应用的不同部分称为“服务”。服务实际上是“生产中的容器”。一项服务仅运行一个镜像，它会设置镜像的运行方式 - 包括所使用的端口、为满足需求而运行的节点数等。扩展服务将改变运行该软件的容器实例数，并将多个计算资源分配给进程中的服务。在Docker中，只需编写一个 `docker-compose.yml` 文件即可实现完整定义。

例如：
```yml
version:"3"
services:
  web:
    # 将 username/repo:tag 替换为您的名称和镜像详细信息
    image: username/repository:tag
    deploy:
      replicas:5
      resources:
        limits:
          cpus:"0.1"
          memory:50M
      restart_policy:
        condition: on-failure
    ports:
      - "80:80"
    networks:
      - webnet
networks:
  webnet:
```
该文件定义了：
1. 从镜像库中拉取我们所上传的镜像；
2. 将该镜像的五个实例作为服务 web 运行，并将每个实例限制为最多使用 10% 的 CPU（在所有核心中）以及 50MB RAM；
3. 如果某个容器发生故障，立即重启容器；
4. 将主机上的端口 80 映射到 web 的端口 80；
5. 指示 web 容器通过负载均衡网络 webnet 共享端口 80（在内部，容器自身将在临时端口发布到 web 的端口 80）；
6. 使用默认设置定义 webnet 网络（此为负载均衡的 overlay 网络）。

### 运行新的负载均衡的应用
需要先运行以下命令，然后才能使用 `docker stack deploy` 命令：
```bash
docker swarm init
```
*注：如果未运行 docker swarm init，将收到错误消息“此节点不是 swarm 管理节点”*

现在，运行此命令。您必须为应用指定一个名称。在此处该名称设置为 getstartedlab：
```bash
docker stack deploy -c docker-compose.yml getstartedlab
```
查看刚才启动的五个容器：
```bash
docker stack ps getstartedlab
```
多次运行 `curl http://localhost`，或在浏览器中转至该 URL，多次点击“刷新”将看到容器 ID 的更改。这说明负载均衡正在以循环方式选择五个从节点之一做出响应。

清除应用与swarm：
```bash
docker stack rm getstartedlab
#这将删除应用，但单节点 swarm 仍处于正常运行状态（如 docker node ls 所示）

#清除 swarm
docker swarm leave --force 
```
### 扩展应用
通过在 `docker-compose.yml` 中更改 `replicas` 值，重新运行 `docker stack deploy` 命令来扩展应用：
```bash
docker stack deploy -c docker-compose.yml getstartedlab
```
Docker 将执行原地更新，无需先清除技术栈或终止任何容器。

重新运行 `docker stack ps` 命令就可以查看经过重新配置的已部署实例。

## Docker 技术栈
技术栈是一组相关的服务，它们共享依赖项并且可以一起进行编排和扩展。单个技术栈能够定义和协调整个应用的功能（虽然很复杂的应用程序可能需要使用多个技术栈）。

在创建 Compose 文件并使用 `docker stack deploy` 时，我们以及在技术层面使用了技术栈。但是，这是在单个主机上运行的单服务技术栈，实际开发往往要比这复杂许多。

具体参考：[技术栈](https://docs.docker-cn.com/get-started/part5/#%E7%95%99%E5%AD%98%E6%95%B0%E6%8D%AE)