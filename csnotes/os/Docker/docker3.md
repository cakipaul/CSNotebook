# Docker 常用命令
## 常用操作
```bash
# Usage：Manage Docker containers and images
docker [OPTIONS] COMMAND

# OPTIONS
-D, --debug              #Enable debug mode
-H, --host list          #Daemon socket(s) to connect to
-l, --log-level string   #Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
--tls                    #Use TLS; implied by --tlsverify
-v, --version            #Print version information and quit

# 通用操作
docker                   #查看帮助
docker COMMAND --help    #查看命令帮助
docker info              #查看Docker信息
docker login             #登陆hub.docker.com（注册需要翻墙）

# 镜像操作
docker search imageName              #查找镜像
docker pull imageName:tag            #获取Docker镜像，tag为版本号，默认为latest
docker images                        #列出本机镜
docker tag SOURCE[:TAG] TARGET[:TAG] #重命名镜像
docker commit [OPTINS] NAME|ID [REPOSITORY[:TAG]] #通过已有容器更新镜像
docker build [OPTIONS] PATH|URL|-    #通过Dockerfile文件构建镜像

# 容器操作
docker run --name containerName IMAGE #从指定镜像运行容器并命名
docker ps                             #列出正在运行的容器
docker ps -a                          #列出所有容器
docker logs -f NAME|ID                #跟踪查看指定容器的日志
docker inspect NAME|ID                #查看容器的底层信息
docker start|restart NAME|ID          #开始|重新 运行容器
docker stop NAME|ID                   #停止运行所指定的容器
docker exec -it containerName sh      #向已运行的容器输入指令
docker rm NAME|ID                     #删除指定容器
```
## COMMAND详情
### Management Commands
```bash
builder     #Manage builds
config      #Manage Docker configs
container   #Manage containers
engine      #Manage the docker engine
image       #Manage images
network     #Manage networks
node        #Manage Swarm nodes
plugin      #Manage plugins
secret      #Manage Docker secrets
service     #Manage services
stack       #Manage Docker stacks
swarm       #Manage Swarm
system      #Manage Docker
trust       #Manage trust on Docker images
volume      #Manage volumes
```
### COMMAND
```bash
attach      #Attach local standard input, output, and error streams to a running container
build       #Build an image from a Dockerfile
commit      #Create a new image from a container's changes
cp          #Copy files/folders between a container and the local filesystem#
create      #Create a new container
diff        #Inspect changes to files or directories on a container's filesystem
events      #Get real time events from the server
exec        #Run a command in a running container
export      #Export a container's filesystem as a tar archive
history     #Show the history of an image
images      #List images
import      #Import the contents from a tarball to create a filesystem image
info        #Display system-wide information
inspect     #Return low-level information on Docker objects
kill        #Kill one or more running containers
load        #Load an image from a tar archive or STDIN
login       #Log in to a Docker registry
logout      #Log out from a Docker registry
logs        #Fetch the logs of a container
pause       #Pause all processes within one or more containers
port        #List port mappings or a specific mapping for the container
ps          #List containers
pull        #Pull an image or a repository from a registry
push        #Push an image or a repository to a registry
rename      #Rename a container
restart     #Restart one or more containers
rm          #Remove one or more containers
rmi         #Remove one or more images
run         #Run a command in a new container
save        #Save one or more images to a tar archive (streamed to STDOUT by default)
search      #Search the Docker Hub for images
start       #Start one or more stopped containers
stats       #Display a live stream of container(s) resource usage statistics
stop        #Stop one or more running containers
tag         #Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
top         #Display the running processes of a container
unpause     #Unpause all processes within one or more containers
update      #Update configuration of one or more containers
version     #Show the Docker version information
wait        #Block until one or more containers stop, then print their exit codes
```
## Docker Image 相关命令
### 通过 docker commmit 更新镜像
```bash
# Usage: Create a new image from a container's changes
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]

# Options
-a, --author string    #Author (e.g., "John Hannibal Smith <hannibal@a-team.com>")
-c, --change list      #Apply Dockerfile instruction to the created image
-m, --message string   #Commit message
-p, --pause            #Pause container during commit (default true)
```

### 通过 docker build 构建镜像
```bash
# Usage: Build an image from a Dockerfile
docker build [OPTIONS] PATH|URL|-

# Options
-c, --cpu-shares int   #CPU shares (relative weight)
-f, --file string      #Name of the Dockerfile (Default is 'PATH/Dockerfile')
    --label list       #Set metadata for an image
-m, --memory bytes     #Memory limit
-q, --quiet            #Suppress the build output and print image ID on success
    --rm               #Remove intermediate containers after a successful build (default true)
-t, --tag list         #Name and optionally a tag in the 'name:tag' format
    --ulimit ulimit    #Ulimit options (default [])
```

### Dockerfile
示例：
```bash
# 将官方 Python 运行时用作父镜像
FROM python:2.7-slim

# 将工作目录设置为 /app
WORKDIR /app

# 将当前目录内容复制到位于 /app 中的容器中
ADD . /app

# 安装 requirements.txt 中指定的任何所需软件包
RUN pip install -r requirements.txt

# 使端口 80 可供此容器外的环境使用
EXPOSE 80

# 定义环境变量
ENV NAME World

# 在容器启动时运行 app.py
CMD ["python", "app.py"]
```
此 Dockerfile 引用了我们尚未创建的内容，名为 app.py 和 requirements.txt。将上述 Dockerfile 构建到镜像中时，由于 Dockerfile 的 ADD 命令而显示 app.py 和 requirements.txt，并且借助 EXPOSE 命令，将能够通过 HTTP 访问 app.py 的输出。

每一个指令都会在镜像上创建一个新的层，每一个指令的前缀都必须是大写的。

RUN 指令告诉docker 在镜像内执行命令，安装了什么。这里使用的是 `requirement.txt` 中声明的内容，编辑 `requirement.txt` 文件内容：
```
Flask
Redis
```
编辑 `app.py` :
```python
from flask import Flask
from redis import Redis, RedisError
import os
import socket

# Connect to Redis
redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)

app = Flask(__name__)

@app.route("/")
def hello():
    try:
        visits = redis.incr("counter")
    except RedisError:
        visits = "<i>cannot connect to Redis, counter disabled</i>"

    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>" \
           "<b>Visits:</b> {visits}"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname(), visits=visits)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
```
运行 `docker build` 命令：
```bash
docker build -t firstImage .
# -t ：指定要创建的目标镜像名
# . ：Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径

# 查看本机images
docker images

# 运行container
docker run -p 4000:80 firstImage
#后台运行：docker run -d -p 4000:80 cakipaul/firstImage

# 访问 http://localhost:4000 即可看到运行结果
# 或在shell中通过curl命令查看结果：
curl http://localhost:4000
```
上传镜像：
```bash
# 1 登陆 hub.docker.com（需要先翻墙注册账号）
docker login 

# 2 标记镜像：将本地镜像与镜像库中的镜像仓库相关联
docker tag firstImage cakipaul/test:v1

# 3 push到仓库
docker push username/repository:tag
```

## Docker Container 相关命令
### 运行Container
```bash
# Usage
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

# OPTIONS
-a, --attach list     #Attach to STDIN, STDOUT or 
-c, --cpu-shares int  #CPU shares (relative weight)
-d, --detach          #Run container in background and print container ID
-e, --env list        #Set environment variables
-h, --hostname string #Container host name
-i, --interactive     #Keep STDIN open even if not attached
-l, --label list      #Set meta data on a container
-m, --memory bytes    #Memory limit
-p, --publish list    #端口指定映射(主机端口:Docker端口)
-P, --publish-all     #端口全部映射(random)
-t, --tty             #Allocate a pseudo-TTY
-u, --user string     #Username or UID (format: <name|uid>[:<group|gid>])
-v, --volume list     #Bind mount a volume
-w, --workdir string  #Working directory inside the container
```