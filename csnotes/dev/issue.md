# Issue 规范

## Issue 是什么？

- 参考文章：[如何使用 Issue 管理软件项目？](http://www.ruanyifeng.com/blog/2017/08/issue.html)

Issue 指的是一项待完成的工作，通常与系统的改进相关，中文可以译为"问题"或"事务"。下面这些都是 Issue 的例子：

- 一个软件的 bug
- 一项功能建议
- 一项待完成的任务
- 文档缺失的报告

每个 Issue 应该包含该问题的所有信息和历史，使得后来的人只看这个 Issue，就能了解问题的所有方面和过程。

历史上，Issue 起源于客服部门。用户打电话反映问题，客服就创建一个工单（ticket），后续的每一个处理步骤、每一次与用户的交流，都要更新工单，记录全部信息。这就是 Issue 的前身。因此，Issue 的原始功能是问题追踪和工单管理，后来不断扩展，逐渐演变成全功能的项目管理工具，还可以用于制定和实施软件的开发计划。

## issue 内容介绍

- Assignees：用于从当前仓库的所有成员之中，指派某个 Issue 的处理人员。一个issue 的assignees一般来说，有且仅有一个，这个人必须是实际执行issue的人 。 原则上不同意一个issue有多个assignees。
- Labels：Issue 可以贴上标签，这样有利于分类管理和过滤查看。
- Projects：项目
- Milestone：里程碑

### 常用 Label

对于大型项目， 每个 Issue 至少应该有两个 Label ，一个表示性质，另一个表示优先级。

表示性质的 Label，可以参考这些：

- 平台：即适用于跨平台平板电脑应用程序的iOS和Android
- 问题：高度优先，尤其是在生产中
- 建议：建议问题
- 用户体验：影响用户对产品的理解或整体使用
- 部署环境：服务器环境问题
- 取消：无需采取任何行动。该问题已解决，可以通过其他问题更好地解决，或者在产品范围之外

表示优先级的 Label，可以采用下面的级别：

- 高优先级（High）：对系统有重大影响，只有解决它之后，才能去完成其他任务。
- 普通优先级（Medium）：对系统的某个部分有影响，用户的一部分操作会达不到预期效果。
- 低优先级（Low）：对系统的某个部分有影响，用户几乎感知不到。
- 微不足道（Trivial）：对系统的功能没有影响，通常是视觉效果不理想，比如字体和颜色不满意。

### milestone

一个milestone代表一次版本迭代,在这里面需要记录这次版本迭代的:

- 需要实现的功能 (版本迭代更新功能记录)
- 参与人员的工作安排 (每次版本迭代的工作分工)
- 对于每个开发人员的时间规划 (完善项目管控,有了这个可以更好的了解项目工作规划,进度安排,确定下次评审以及交付的时间)
- 每个开发人员的issue (关于每个开发人员自己对自己负责的任务的更详细的分解以及具体每个子问题的时间规划,直接使用issue内的comment功能作为每个开发人员的工作日志)

如何通过milestone进行一次较为正式的版本迭代：

1. 首先确认记录在本次版本迭代的任务已经全部完成
2. 开发团队内在开发环境下(日常开发所在的环境)评审确认本次完成的功能是否全部没有问题
确认没问题后,进行一次由master分支(日常开发提交代码的分支)合并到deploy分支(系统上线后对外运行的代码版本),merge后对deploy当前版本打上tag,tag的标题与本次版本迭代的版本号一样(这样做有很多好处,比如可以使得系统在某一次版本升级出现致命问题时,紧急迅速找回上一个稳定版本,恢复系统的正常运行)

通常对milestone需要负责的人：该项目的项目负责人

## 提交 issue 时需要准备的信息

issue 按功能可以分为两类：咨询，或者问题。这里提到的都是问题 issue，咨询相关的 issue 不必附加以下信息。

在提交issue之前，我们应该先查询是否已经有相关的issue以及常见问题。提交issue时，我们需要写明issue的原因，以及编译或运行过程的日志(加载进程以及Patch进程)。问题 issue 需要以下面的格式：

- 异常基本信息
  - 异常类型：app运行时异常/编译异常
  - 异常产品/项目
  - 所属部门、联系人
- 设备型号：如:Redmi 5(如是编译异常，则可以不填)
  - 系统版本：如:Android 5.0 (如是编译异常，则可以不填)
  - 是否可以再现、出现条件与频率
- 服务端，如：楼3/楼7服务器端
- 使用的框架与插件版本，如： 
  - `igmcloudLib:4.3.5-release`
  - `igmcloudLib-navigate:4.0.1-release`
- 堆栈/日志：参考 [示范 issue ](#示范 issue)

更多内容参考（若有必要则可附上）：
- 前后端,架构说明,代码规范,语言,框架
- 文件目录 (用tree命令生成结构图 再加上注释说明)
- 前后端架构,依赖,一些常量,码的说明
- 运维相关 如何开始跑这个项目 如何命令行 编译运行类似
- 如何进行编译运行
- 配置文件说明
- 构建系统的说明
- 构建系统运行解释

提问题时若使用不能用/没效果/有问题/报错此类模糊表达，但又没给出任何代码截图报错的，一律直接关闭的。大家可以参阅提问的智慧。

## 示范 issue 

- 示范 issue 链接：[asyncHttpPost功能偶尔无响应的问题](http://git.inspur.com/songww/android-develop-tools/issues/5)

```md
# 环境
移动端：智能POS， Android 5.1
服务端：基于iGIX平台的接口
移动框架版本：安卓 igmcloudLib:4.0.17-release

# 问题描述
移动端H5页面通过cmApi.request.httpPostAsyncNoLoading方法发送http请求时，偶尔会有请求接收不到响应数据，但是服务端接口日志显示已处理并返回了。移动端一致收不到响应后，达到超时时间，移动框架报超时的错，然后向H5返回{retCode:9}
这个问题出现不规律，有时一直没有问题，有时连续多个请求都出现这个问题。

# H5代码
cmApi.request.httpPostAsyncNoLoading(url, params, contentType, id);

# 移动框架控制台日志

...(此处省略若干log)

# APP日志文件

...(此处省略若干log)
```