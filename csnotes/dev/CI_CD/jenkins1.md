# Jenkins-Node-Npm环境
## 安装Jenkins
### 配置要求
>256 MB of RAM
>
>1 GB of drive space (如果是Docker环境则建议为 10 GB )

如果你是小型团队：
>1 GB+ of RAM
>
>50 GB+ of drive space

软件要求：
>Java：必须为Java 8（新老版本都不支持，java11部分支持，详情参考：[Java Requirements page](https://jenkins.io/doc/administration/requirements/java/)）建议使用 `OpenJDK JDK / JRE 8 - 64 bits`。如果使用Jenkins集成java项目，kenkins的java版本应与项目中所使用的java版本保持一致。
>
>Web browser： [Web Browser Compatibility page](https://jenkins.io/doc/administration/requirements/web-browsers/)
>
>Docker：Docker CE(Docker Community Edition) 与 Docker EE(Docker Enterprise Edition) 皆可：[download-docker](https://hub.docker.com/search/?type=edition&offering=community)

### Docker安装
其他安装参考：[安装Jenkins](https://www.w3cschool.cn/jenkins/jenkins-79ex28jh.html)

本安装使用：[jenkinsci/blueocean](https://hub.docker.com/r/jenkinsci/blueocean/)

BlueOcean名称来自 蓝海战略 ——将看待问题的视角从存在争议的空间转移到更广阔的空间。奇韦恩格雷茨基说：“冰球运动员到哪里，冰球便将在那里，而不是相反”。

BlueOcean由Jenkins Pipeline设计，它重新考虑了Jenkins的用户体验，在兼容自由式工作的同时减少了团队成员的混乱：

- 可视化的连续交付（CD）Pipeline，允许快速和直观地了解Pipeline的状态。
- Pipeline编辑器通过引导用户直观和可视化的过程创建Pipeline，使创建Pipeline更为便捷。
- 个性化，以适应团队每个成员的需求。
- BlueOcean显示了Pipeline需要注意的地方，便于异常处理，提高生产率。
- 用于分支和拉取请求的本地集成，这可以促使GitHub和Bitbucket中与其他人进行代码协作时最大限度提高开发人员的生产力。

```bash
#下载/更新image
docker pull jenkinsci/blueocean

#run
docker run -p 8080:8080 jenkinsci/blueocean

#note the admin password dumped on log
#open a browser on http://localhost:8080
#run the initial setup wizard. Choose "recommended plugins"
#browse to http://localhost:8080/blue
```
在第一次 `docker run` 运行 jenkins 时，会提示一串初始密码：
```bash
Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

122333444455555666666abbcccdddde

This may also be found at: /var/jenkins_home/secrets/initialAdminPassword
```
输入这串密码进行首次登陆（或在docker-log中查看: `docker logs containerID` ）。这样Jenkins就算安装完成了。浏览器访问 `localhost:8080` 或 `http://<ip>:8080` 即可登入。

如果希望容器在后台运行，只需要添加 `-d` 指令即可：
```bash
docker run \
  -u root \
  --rm \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean
```

### 安装Plugins
首次登陆时Jenkins会提示安装Plugins，选择安装社区推荐的“most useful plugins”选项即可。

在 `Manage Jenkins - ManagePlugins` 中即管理插件下载。推荐下载：
- `Coding Webhook` 
- `Gitlab Authentication`

## 创建Pipeline
### Jenkinsfile
我们可以创建一个node环境的pipeline例程：
```
pipeline {
    agent { docker { image 'node:10' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
```
更详细的配置示例：
```
pipeline {
    agent { docker 'node:10' }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
        stage('Deploy') {
            steps {
                retry(3) {
                    sh './flakey-deploy.sh'
                }

                timeout(time: 3, unit: 'MINUTES') {
                    sh './health-check.sh'
                }
            }
        }
        post {
            always {
                echo 'This will always run'
            }
            success {
                echo 'This will run only if successful'
            }
            failure {
                echo 'This will run only if failed'
            }
            unstable {
                echo 'This will run only if the run was marked as unstable'
            }
            changed {
                echo 'This will run only if the state of the Pipeline has changed'
                echo 'For example, if the Pipeline was previously failing but is now successful'
            }
        }
    }
}
```
2. 单击Jenkins中的New Item菜单
3. 为项目命名，然后选择多分支Pipeline
4. 添加源：选择要使用的存储库的类型并填写详细信息

在编辑Jenkinsfile文件时，可以在 `steps` 中添加脚本命令。在Linux，BSD和Mac OS（类Unix）系统上，命令需要以 `sh` (shell)作为开头。

### BlueOcean创建pipeline
在安装并运行 `jenkinsci/blueocean` 容器后，默认进入的是classic界面，选择blueocean界面进行操作，右上角即有“new pipeline”选项。包括：Bitbucket Cloud，Bitbucket Server，GitHub，GitHub Enterprise，Git。

要从Git存储库创建Pipeline，首先选择“Git”作为源代码控制系统。然后输入Git Repository的URL，并可选择选择要使用的凭据。如果下拉列表中没有显示所需的凭据，则可以使用“添加”按钮添加。

完成后，点击“创建Pipeline”。BlueOcean将查看所选存储库的所有分支，并将为包含a的每个分支启动Pipeline运行Jenkinsfile。具体代码示例如下：
- GitBook
```
pipeline {
    agent {
        docker "node:10"
    }
    stages  {
        stage("build") {
            steps {
                sh 'node -v'
                sh 'npm install gitbook-cli -g '
                sh 'gitbook fetch 3.2.3' // fetch final stable version
                sh 'gitbook install' // add any requested plugins in book.json
                sh 'gitbook build . public' // build to public path
                archiveArtifacts artifacts: '**/public/', fingerprint: true // 收集构建产物
            }
        }
        stage("deploy") {
            steps {
                sh "cd ./public"
                sh "git init"
                sh "git checkout -b pages"
                sh "git add ."
                sh "git config --global user.email 'cakipaul@gmail.com'"
                sh "git config --global user.name 'cakipaul'"
                sh "git commit -m 'deploy'"
              	sh "git remote add github git@gihub.com:cakipaul/cs-book.git"
              	sh "git remote -v"
                sh "git push github pages"
            }
        }
    }
}
```
- Hexo：
```
pipeline {
    agent {
        label "node-10"
    }
    stages  {
        stage("build") {
            steps {
                sh 'node -v'
                sh 'npm install hexo-cli -g '
                sh 'npm install hexo-deployer-git --save'
                sh 'npm install hexo-filter-mermaid-diagrams --save'
                sh 'npm install '
                sh 'hexo g'
                archiveArtifacts artifacts: '**/public/', fingerprint: true // 收集构建产物
            }
        }
        stage("deploy") {
            steps {
                sh "cd ./public"
                sh "git init"
                sh "git checkout -b pages"
                sh "git add ."
                sh "git config --global user.email 'cakipaul@gmail.com'"
                sh "git config --global user.name 'cakipaul'"
                sh "git commit -m 'deploy'"
              	sh "git remote add github git@github.com/cakipaul/cs-blog.git"
              	sh "git remote -v"
                sh "git push github pages"
            }
        }
    }
}
```

### 使用Coding
配置详情：[使用 Jenkins 构建 Coding 项目](https://open.coding.net/ci/jenkins/)
1. 安装 `Coding Webhook Plugin` 插件；
2. New Item - Freestyle project；
3. 使用ssh或https连接repo；
4. 配置Trigger；
5. 配置源码管理；
6. 添加shell脚本；
7. 在Coding上注册Webhook，url为`jenkins.cakipaul.com:8080/coding/repoName`（示例）

### 使用Github
1. 在github的 个人设置-开发者选项 中获取token，包括repo管理权与user的邮箱信息；
2. 使用Blueocen创建Pipeline，选择Github，token，选择repo；
3. 使用 `Jenkinsfile` 文件管理CI进程。

## 使用Coding提供的Jenkins
Coding提供了基于Jenkins的持续集成，参考：[持续集成](https://dev.tencent.com/help/knowledge-base/how-to-use-ci#_Jenkinsfile)
只需要在项目中添加并配置 `Jenkinsfile` 文件，在项目设置中开启持续集成，即可实现每次push或merge等事件触发自动集成。
### Hexo
```
pipeline {
    agent {
        label "node-10"
    }
    stages  {
        stage("检出") {
            steps {
                sh 'ci-init'
                checkout(
                  [$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
                  userRemoteConfigs: [[url: env.GIT_REPO_URL]]]
                )
            }
        }
        stage("建构") {
            steps {
                sh 'node -v'
                sh 'npm install hexo-cli -g '
                sh 'npm install hexo-deployer-git --save'
                sh 'npm install hexo-filter-mermaid-diagrams --save'
                sh 'npm install '
                sh 'hexo g'
                archiveArtifacts artifacts: '**/public/', fingerprint: true // 收集构建产物
            }
        }
    }
}
```

### GitBook
```
pipeline {
    agent {
        label "node-10"
    }
    stages{
        stage("检出") {
            steps {
                sh 'ci-init'
                checkout(
                  [$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
                  userRemoteConfigs: [[url: env.GIT_REPO_URL]]]
                )
            }
        }
        stage("建构"){
            steps{
                sh 'node -v'
                sh 'npm install gitbook-cli -g '
                sh 'gitbook fetch 3.2.3' // fetch final stable version
                sh 'gitbook install' // add any requested plugins in book.json
                sh 'gitbook build . public' // build to public path
                archiveArtifacts artifacts: '**/public/', fingerprint: true // 收集构建产物
            }
        }
    }
}
```

## 术语
- Agent：通常是一个机器或容器，它连接到Jenkins主机，并在主控器指导时执行任务。
- Artifact：在Build或Pipeline 运行期间生成的不可变文件，该文件归档到Jenkins Master上以供用户随后检索。
- Build：项目 单次执行的结果
- Cloud：提供动态代理 配置和分配的系统配置，例如由Azure VM Agents 或 Amazon EC2插件提供的配置和分配 。
- Core：主要的Jenkins应用程序（jenkins.war）提供了 可以构建Plugins的基本Web UI，配置和基础。
- Downstream：配置Pipeline或项目时被触发作为一个单独的Pipeline或项目的执行的一部分。
- Executor：用于执行由节点上的Pipeline或 项目定义的工作的插槽。节点可以具有零个或多个配置的执行器，其对应于在该节点上能够执行多少并发项目或Pipeline。
- Fingerprint：考虑全局唯一性的哈希追踪跨多个Pipeline或项目的工件或其他实体 的使用 。
- Folder：类似于文件系统上的文件夹的Pipeline和/或 项目 的组织容器。
- Item：Web UI中的实体对应于：Folder, Pipeline, or Project.
- Job：一个不推荐的术语，与项目同义。
- Label：用于分组代理的用户定义的文本，通常具有类似的功能或功能。例如linux对于基于Linux的代理或 docker适用于支持Docker的代理。
- Master：存储配置，加载插件以及为Jenkins呈现各种用户界面的中央协调过程。
- Node：作为Jenkins环境的一部分并能够执行Pipeline或项目的机器。无论是the Master还是Agents都被认为是Nodes。
- Project：用户配置的Jenkins应该执行的工作描述，如构建软件等。
- Pipelin：用户定义的连续输送Pipeline模型，以便更多阅读本手册中的“ Pipeline”一章。
- Plugin：与Jenkins Core分开提供的Jenkins功能扩展。
- Publisher：完成发布报告，发送通知等的所有配置步骤后的 构建的 一部分。
- Stage：stage是Pipeline的一部分，用于定义整个Pipeline的概念上不同的子集，例如：“构建”，“测试”和“部署”，许多插件用于可视化或呈现Jenkins Pipeline状态/进度。
- Step：单一任务从根本上讲，指的是Jenkins 在Pipeline或项目中做了什么。
- Trigger：触发新Pipeline运行或构建的标准。
- Update Center：托管插件和插件元数据的库存，以便在Jenkins内部进行插件安装。
- Upstream：配置的Pipeline或项目，其触发单独的Pipeline或项目作为其执行的一部分。
- Workspace：Noede文件系统上的一次性目录， 可以由Pipeline或项目完成工作。在Build或 Pipeline运行完成后，工作区通常会保留原样，除非在Jenkins Master上已经设置了特定的Workspace清理策略。

---
*Read More:*
- [Build a Node.js and React app with npm](https://jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/)
- [Jenkins-docs](https://jenkins.io/doc/book/pipeline/syntax/)
- [Jenkins中文文档](https://jenkins.io/zh/doc/)
- [使用Jenkins构建Coding项目](https://open.coding.net/ci/jenkins/)