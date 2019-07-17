# DevOps-CICD

## DevOps

DevOps=Culture+Automation+Measurement(Metrics)+Sharing

Devops的概念说法不一，但大体上就是一种方法论或框架，或者是一套打破孤岛的原则。具体而言，Devops主要是关于文化，自动化，测量和共享（CAMS）

随着软件发布迭代的频率越来越高，传统的「**瀑布型**」（开发—测试—发布）模式已经不能满足快速交付的需求。DevOps是**敏捷开发的延续**，它将敏捷的精神延伸至IT运营（IT Operation）阶段。

敏捷开发的主要目的是响应变化，快速交付价值。

DevOps产生的原因:

* Dev目标：Continuous Change,Addnew features
* Ops目标：Continuous Stability,Createnew services

## DevOps中核心技术-CICD

### CI-CD 的概念

持续集成，持续交付，持续部署

* 持续(Continuous)：每完成一个完整的部分，就向下个环节交付，发现问题可以马上调整。不断的获取反馈，响应反馈，降低解决问题成本。
* 集成(Integration)：软件个人研发的部分向软件整体部分交付，以便尽早发现个人开发部分的问题；编译、测试、打包；
* 部署(deployment):代码尽快向可运行的开发/测试节交付，以便尽早测试；
* 发布(release)：具有业务影响的功能变化对最终用户可见称为“发布”。
* 交付(delivery)是指研发尽快向客户交付，以便尽早发现生产环境中存在的问题。可以理解为从 Deployment 到 Release 之间的阶段，更多的强调的是一种能力。开发有能力频繁的部署，业务有能力随时发布。

一种软件开发实践，即团队开发成员经常集成他们的工作，通过每个成员每天至少集成一次，也就意味着每天可能会发生多次集成。

每次集成都通过自动化的构建（包括编译、发布、自动化测试）来验证，从而尽早地发现集成错误。

持续集成是为了确保随着需求变化而变化的代码，在实现功能的同时，质量不受影响。关注代码质量。Everythingiscode!!!

### CI-CD 基本要素

1. 统一的代码库,要将所有软件资产集中放到版本库中，包括源代码，测试脚本，配置文件，部署脚本，环境描述，数据库的DDL和DML脚本,部署脚本等
2. 自动构建
3. 自动测试
4. 每个人每天都要向代码库主干提交代码（分支策略）
5. 每次代码递交后都会在持续集成服务器上触发一次构建
6. 保证快速构建（10分钟原则）
7. 模拟生产环境的自动测试
8. 每个人都可以很容易的获取最新可执行的应用程序
9. 每个人都清楚正在发生的状况
10. 自动化的部署

### 其他概念

* 持续交付：在持续集成的基础上，将集成后的代码部署到更贴近真实运行环境的「类生产环境」（production-like environments）中。比如，完成单元测试后，可以把代码部署到连接数据库的Staging环境中更多的测试。如果代码没有问题，可以继续手动部署到生产环境中。
* 持续部署：在持续交付的基础上，把部署到生产环境的过程自动化

持续交付的重要点：

1. 更高频次的增量更新，这种方法有助于降低交付变更过程中涉及的成本、时间和风险。
2. 在持续交付中找度量指标，即找出所有能让你更进一步了解用户对功能看法的度量指标，对所有这些指标进行度量。如运维环境可用性全年比例：99%，99.9%，99.99%。一年中有几天故障，一年中有几小时故障，一年中有几分钟故障。（这也就是常说的2个9,3个9,4个9）
3. 零停机部署：
   1. 功能开关（Feature Flipping）：功能开关可供我们在软件运行过程中启用／禁用相应的功能。这种技术其实非常容易理解和使用：为生产版本提供一个能彻底禁用某项功能的配置，并只在对应功能彻底完工可以正常工作后才将该属性激活。
   2. 蓝／绿部署（Blue/Green Deployment）：蓝／绿部署是指为下一版产品构建另一个完整的生产环境。开发和运维团队可以在这个单独的生产环境中放心地构建下一版产品。当下一版产品全部完成后，可以修改负载均衡器的配置，以透明的方式将用户自动重定向至新发布的下一版。随后可将上一版的生产环境回收，用于构建下下一版的产品。
   3. 金丝雀发布（Canarirelease）：亦称作灰度发布，是指在黑与白之间，能够平滑过渡的一种发布方式。AB test就是一种灰度发布方式，让一部分用户继续用A，一部分用户开始用B，如果用户对B没有什么反对意见，那么逐步扩大范围，把所有用户都迁移到B上面来。灰度发布可以保证整体系统的稳定，在初始灰度的时候就可以发现、调整问题，以保证其影响度，而我们平常所说的金丝雀部署也就是灰度发布的一种方式。
   4. 滚动式发布：在金丝雀发布基础上的进一步优化改进，是一种自动化程度较高的发布方式，用户体验比较平滑，是目前成熟型技术组织所采用的主流发布方式。一次滚动式发布一般由若干个发布批次组成，每批的数量一般是可以配置的（可以通过发布模板定义）。例如第一批1 台（金丝雀），第二批10%，第三批50%，第四批100%。每个批次之间留观察间隔，通过手工验证或监控反馈确保没有问题再发下一批次，所以总体上滚动式发布过程是比较缓慢的(其中金丝雀的时间一般会比后续批次更长，比如金丝雀10 分钟，后续间隔2 分钟)。

## 参考资源

[DevOps-CICD介绍](res/cicd.pdf)

[coding-ci/cd](https://dev.tencent.com/help/knowledge-base/how-to-use-ci#agents)