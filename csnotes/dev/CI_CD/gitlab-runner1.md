## 1 安装Docker
### 1.1 安装Docker CE
我们还可以在云服务器上按照Docker，然后在上面部署集成环境，这样就在GitLab上可以使用自己的服务器了。
```bash
#Install using the repository

# 1 Set Up Docker Repository
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

#（可选）enable Edge/Test Repo，默认Disable（将enable换位disable即取消使用）
#sudo yum-config-manager --enable docker-ce-edge
#sudo yum-config-manager --enable docker-ce-test

# 2 安装 Docker CE
sudo yum install docker-ce
# 确认fingerprint: 060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35

# 查看历史版本
yum list docker-ce --showduplicates | sort -r
# 安装特定版本
sudo yum install docker-ce-<VERSION STRING>

# 4 运行Docker
sudo systemctl start docker
#开机运行
#chkconfig docker on

# 5 测试安装是否成功
sudo docker run hello-world
```
### 1.2 安装环境
```bash
# 安装 node v-10 环境（非必需）
docker pull node:10
```

## 2 安装并使用Runner
### 2.1 安装Runner
```bash
# 1. 下载repo
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash

# 2. 安装
sudo yum install gitlab-runner
#sudo yum install gitlab-ci-multi-runner

# 3. 版本切换
yum list gitlab-runner --showduplicates | sort -r
sudo yum install gitlab-runner-10.0.0-1

# 4 注册runner
yum install gitlab-ci-multi-runner
#注册过程见下

```

### 2.2 Docker镜像安装Runner
```bash
# 1 拉取最新镜像
sudo docker pull gitlab/gitlab-runner:latest

# 2 添加gitlab-runner container
sudo docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest

# 3 注册runner(exec针对正在运行的后台container)
sudo docker exec -it gitlab-runner gitlab-ci-multi-runner register
#注册过程见下

# 配置防火墙
firewall-cmd --permanent --zone=public --add-port=10022/tcp
firewall-cmd --permanent --zone=public --add-port=10080/tcp
firewall-cmd --reload
```
`gitlab-runner` 命令格式为：
```bash
gitlab-runner [Runner command and options...]
```
在Docker上写作：
```bash
docker run [chosen docker options...] gitlab/gitlab-runner [Runner command and options...]
```

### 2.3 注册Runner

首先要做repo的 `设置-CI/CD` 中获取 url 和 token。然后运行：
```bash
# 1. 运行注册命令
sudo gitlab-runner register

# 2. 输入gitlab实例域名
https://gitlab.com

# 3. 输入token
xxx

# 4. 自定义命名（可在网页端修改）
[hostname] cvm-runner

# 5. 自定义标签（可在网页端修改）
first-tag,seconf-tag
```

### 2.4 编辑 .gitlab-ci.yml 文件
在 `pages:` 中添加注册Runner时的tag即可。
```yml
...
pages:
  tag:
    - <tagName>
  stage: deploy
...
```
---
参考：
- [About&Install Docker CE](https://docs.docker.com/install/)
- [The Docker executor](https://docs.gitlab.com/runner/executors/docker.html)
- [Install GitLab Runner using the official GitLab repositories](https://docs.gitlab.com/runner/install/linux-repository.html)
-[Run GitLab Runner in a container](https://docs.gitlab.com/runner/install/docker.html)
- [Registering Runners](https://docs.gitlab.com/runner/register/index.html)