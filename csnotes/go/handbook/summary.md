# Go 语言简介

[参考资料](http://c.biancheng.net/golang/intro/)

## Go语言简介

Go语言（或 Golang）起源于 2007 年，并在 2009 年正式对外发布。Go 是非常年轻的一门语言，它的主要目标是“兼具 Python 等动态语言的开发速度和 C/C++ 等编译型语言的性能与安全性”。

Go语言是编程语言设计的又一次尝试，是对类C语言的重大改进，它不但能让你访问底层操作系统，还提供了强大的网络编程和并发编程支持。Go语言的用途众多，可以进行网络编程、系统编程、并发编程、分布式编程。

Go语言的推出，旨在不损失应用程序性能的情况下降低代码的复杂性，具有“部署简单、并发性好、语言设计良好、执行性能好”等优势，目前国内诸多 IT 公司均已采用Go语言开发项目。

Go语言有时候被描述为“C 类似语言”，或者是“21 世纪的C语言”。Go 从C语言继承了相似的表达式语法、控制流结构、基础数据类型、调用参数传值、指针等很多思想，还有C语言一直所看中的编译后机器码的运行效率以及和现有操作系统的无缝适配。

因为Go语言没有类和继承的概念，所以它和 Java 或 C++ 看起来并不相同。但是它通过接口（interface）的概念来实现多态性。Go语言有一个清晰易懂的轻量级类型系统，在类型之间也没有层级之说。因此可以说Go语言是一门混合型的语言。

此外，很多重要的开源项目都是使用Go语言开发的，其中包括 Docker、Go-Ethereum、Thrraform 和 Kubernetes。

### Go语言创始人

对语言进行评估时，明白设计者的动机以及语言要解决的问题很重要。Go语言出自 Ken Thompson 和 Rob Pike、Robert Griesemer 之手，他们都是计算机科学领域的重量级人物。

1. Ken Thompson：贝尔实验室 Unix 团队成员，C语言、Unix 和 Plan 9 的创始人之一，在 20 世纪 70 年代，设计并实现了最初的 UNIX 操作系统，仅从这一点说，他对计算机科学的贡献怎么强调都不过分。他还与 Rob Pike 合作设计了 UTF-8 编码方案。
2. Rob Pike：Go语言项目总负责人，贝尔实验室 Unix 团队成员，除帮助设计 UTF-8 外，还帮助开发了分布式多用户操作系统 Plan 9、Inferno 操作系统和 Limbo 编程语言，并与人合著了《The Unix Programming Environment》，对 UNIX 的设计理念做了正统的阐述。
3. Robert Griesemer：就职于 Google，参与开发 Java HotSpot 虚拟机，对语言设计有深入的认识，并负责 Chrome 浏览器和 Node.js 使用的 Google V8 JavaScript 引擎的代码生成部分。

这些计算机科学领城的重量级人物设计Go语言的初衷是满足 Google 的需求。设计此语言花费了两年的时间，融入了整个团队多年的经验及对编程语言设计的深入认识。设计团队借鉴了 Pascal、Oberon 和C语言的设计智慧，同时让Go语言具备动态语言的便利性。因此，Go语言体现了经验丰富的计算机科学家的语言设计理念，是为全球最大的互联网公司之一设计的。

Go语言的所有设计者都说，设计Go语言是因为 C++ 给他们带来了挫败感。在 Google I/O 2012 的 Go 设计小组见面会上，Rob Pike 是这样说的：
我们做了大量的 C++ 开发，厌烦了等待编译完成，尽管这是玩笑，但在很大程度上来说也是事实。

### Go 是编译型语言

Go 使用编译器来编译代码。编译器将源代码编译成二进制（或字节码）格式；在编译代码时，编译器检查错误、优化性能并输出可在不同平台上运行的二进制文件。要创建并运行 Go 程序，程序员必须执行如下步骤。

- 使用文本编辑器创建 Go 程序；
- 保存文件；
- 编译程序；
- 运行编译得到的可执行文件。

这不同于 Python、Ruby 和 JavaScript 等语言，它们不包含编译步骤。Go 自带了编译器，因此无须单独安装编译器。

### 为什么要学习Go语言

如果你要创建系统程序，或者基于网络的程序，Go语言是很不错的选择。作为一种相对较新的语言，它是由经验丰富且受人尊敬的计算机科学家设计的，旨在应对创建大型并发网络程序面临的挑战。

在Go语言出现之前，开发者们总是面临非常艰难的抉择，究竟是使用执行速度快但是编译速度并不理想的语言（如：C++），还是使用编译速度较快但执行效率不佳的语言（如：.NET、Java），或者说开发难度较低但执行速度一般的动态语言呢？显然，Go语言在这 3 个条件之间做到了最佳的平衡：快速编译，高效执行，易于开发。

Go语言支持交叉编译，比如说你可以在运行 Linux 系统的计算机上开发可以在 Windows 上运行的应用程序。这是第一门完全支持 UTF-8 的编程语言，这不仅体现在它可以处理使用 UTF-8 编码的字符串，就连它的源码文件格式都是使用的 UTF-8 编码。Go语言做到了真正的国际化！

### Go语言吉祥物

Go语言有一个吉祥物，在会议、文档页面和博文中，大多会包含下图所示的 Go Gopher，这是才华横溢的插画家 Renee French 设计的，她也是 Go 设计者之一 Rob Pike 的妻子。

![吉祥物](/csnotes/go/img/吉祥物.jpg)

## Go语言的特性有哪些

Go语言也称为 Golang，是由 Google 公司开发的一种静态强类型、编译型、并发型、并具有垃圾回收功能的编程语言。

### 语法简单

抛开语法样式不谈，单就类型和规则而言，Go 与 C99、C11 相似之处颇多，这也是Go语言被冠以“NextC”名号的重要原因。

Go语言的语法处于简单和复杂的两极。C语言简单到你每写下一行代码，都能在脑中想象出编译后的模样，指令如何执行，内存如何分配，等等。而 C 的复杂在于，它有太多隐晦而不着边际的规则，着实让人头疼。相比较而言，Go 从零开始，没有历史包袱，在汲取众多经验教训后，可从头规划一个规则严谨、条理简单的世界。

Go语言的语法规则严谨，没有歧义，更没什么黑魔法变异用法。任何人写出的代码都基本一致，这使得Go语言简单易学。放弃部分“灵活”和“自由”，换来更好的维护性，我觉得是值得的。

将“++”、“--”从运算符降级为语句，保留指针，但默认阻止指针运算，带来的好处是显而易见的。还有，将切片和字典作为内置类型，从运行时的层面进行优化，这也算是一种“简单”。
并发模型
时至今日，并发编程已成为程序员的基本技能，在各个技术社区都能看到诸多与之相关的讨论主题。在这种情况下Go语言却一反常态做了件极大胆的事，从根本上将一切都并发化，运行时用 Goroutine 运行所有的一切，包括 main.main 入口函数。

可以说，Goroutine 是 Go 最显著的特征。它用类协程的方式来处理并发单元，却又在运行时层面做了更深度的优化处理。这使得语法上的并发编程变得极为容易，无须处理回调，无须关注线程切换，仅一个关键字，简单而自然。

搭配 channel，实现 CSP 模型。将并发单元间的数据耦合拆解开来，各司其职，这对所有纠结于内存共享、锁粒度的开发人员都是一个可期盼的解脱。若说有所不足，那就是应该有个更大的计划，将通信从进程内拓展到进程外，实现真正意义上的分布式。

### 内存分配

将一切并发化固然是好，但带来的问题同样很多。如何实现高并发下的内存分配和管理就是个难题。好在 Go 选择了 tcmalloc，它本就是为并发而设计的高性能内存分配组件。

可以说，内存分配器是运行时三大组件里变化最少的部分。刨去因配合垃圾回收器而修改的内容，内存分配器完整保留了 tcmalloc 的原始架构。使用 cache 为当前执行线程提供无锁分配，多个 central 在不同线程间平衡内存单元复用。在更高层次里，heap 则管理着大块内存，用以切分成不同等级的复用内存块。快速分配和二级内存平衡机制，让内存分配器能优秀地完成高压力下的内存管理任务。

在最近几个版本中，编译器优化卓有成效。它会竭力将对象分配在栈上，以降低垃圾回收压力，减少管理消耗，提升执行性能。可以说，除偶尔因性能问题而被迫采用对象池和自主内存管理外，我们基本无须参与内存管理操作。

### 垃圾回收

垃圾回收一直是个难题。早年间，Java 就因垃圾回收低效被嘲笑了许久，后来 Sun 连续收纳了好多人和技术才发展到今天。可即便如此，在 Hadoop 等大内存应用场景下，垃圾回收依旧捉襟见肘、步履维艰。

相比 Java，Go 面临的困难要更多。因指针的存在，所以回收内存不能做收缩处理。幸好，指针运算被阻止，否则要做到精确回收都难。

每次升级，垃圾回收器必然是核心组件里修改最多的部分。从并发清理，到降低 STW 时间，直到 Go 的 1.5 版本实现并发标记，逐步引入三色标记和写屏障等等，都是为了能让垃圾回收在不影响用户逻辑的情况下更好地工作。尽管有了努力，当前版本的垃圾回收算法也只能说堪用，离好用尚有不少距离。

### 静态链接

Go 刚发布时，静态链接被当作优点宣传。只须编译后的一个可执行文件，无须附加任何东西就能部署。这似乎很不错，只是后来风气变了。连着几个版本，编译器都在完善动态库 buildmode 功能，场面一时变得有些尴尬。

暂不说未完工的 buildmode 模式，静态编译的好处显而易见。将运行时、依赖库直接打包到可执行文件内部，简化了部署和发布操作，无须事先安装运行环境和下载诸多第三方库。这种简单方式对于编写系统软件有着极大好处，因为库依赖一直都是个麻烦。

### 标准库

功能完善、质量可靠的标准库为编程语言提供了充足动力。在不借助第三方扩展的情况下，就可完成大部分基础功能开发，这大大降低了学习和使用成本。最关键的是，标准库有升级和修复保障，还能从运行时获得深层次优化的便利，这是第三方库所不具备的。

Go 标准库虽称不得完全覆盖，但也算极为丰富。其中值得称道的是 net/http，仅须简单几条语句就能实现一个高性能 Web Server，这从来都是宣传的亮点。更何况大批基于此的优秀第三方 Framework 更是将 Go 推到 Web/Microservice 开发标准之一的位置。

当然，优秀第三方资源也是语言生态圈的重要组成部分。近年来崛起的几门语言中，Go 算是独树一帜，大批优秀作品频繁涌现，这也给我们学习 Go 提供了很好的参照。

### 工具链

完整的工具链对于日常开发极为重要。Go 在此做得相当不错，无论是编译、格式化、错误检查、帮助文档，还是第三方包下载、更新都有对应的工具。其功能未必完善，但起码算得上简单易用。

内置完整测试框架，其中包括单元测试、性能测试、代码覆盖率、数据竞争，以及用来调优的 pprof，这些都是保障代码能正确而稳定运行的必备利器。

除此之外，还可通过环境变量输出运行时监控信息，尤其是垃圾回收和并发调度跟踪，可进一步帮助我们改进算法，获得更佳的运行期表现。

## Go语言为并发而生

在早期 CPU 都是以单核的形式顺序执行机器指令。Go语言的祖先C语言正是这种顺序编程语言的代表。顺序编程语言中的顺序是指：所有的指令都是以串行的方式执行，在相同的时刻有且仅有一个 CPU 在顺序执行程序的指令。

随着处理器技术的发展，单核时代以提升处理器频率来提高运行效率的方式遇到了瓶颈，单核 CPU 发展的停滞，给多核 CPU 的发展带来了机遇。相应地，编程语言也开始逐步向并行化的方向发展。

虽然一些编程语言的框架在不断地提高多核资源使用效率，例如 Java 的 Netty 等，但仍然需要开发人员花费大量的时间和精力搞懂这些框架的运行原理后才能熟练掌握。

作为程序员，要开发出能充分利用硬件资源的应用程序是一件很难的事情。现代计算机都拥有多个核，但是大部分编程语言都没有有效的工具让程序可以轻易利用这些资源。编程时需要写大量的线程同步代码来利用多个核，很容易导致错误。

Go语言正是在多核和网络化的时代背景下诞生的原生支持并发的编程语言。Go语言从底层原生支持并发，无须第三方库，开发人员可以很轻松地在编写程序时决定怎么使用 CPU 资源。

Go语言的并发是基于 goroutine 的，goroutine 类似于线程，但并非线程。可以将 goroutine 理解为一种虚拟线程。Go语言运行时会参与调度 goroutine，并将 goroutine 合理地分配到每个 CPU 中，最大限度地使用 CPU 性能。

多个 goroutine 中，Go语言使用通道（channel）进行通信，通道是一种内置的数据结构，可以让用户在不同的 goroutine 之间同步发送具有类型的消息。这让编程模型更倾向于在 goroutine 之间发送消息，而不是让多个 goroutine 争夺同一个数据的使用权。

程序可以将需要并发的环节设计为生产者模式和消费者的模式，将数据放入通道。通道另外一端的代码将这些数据进行并发计算并返回结果，如下图所示。

>提示：Go语言通过通道可以实现多个 goroutine 之间内存共享。

【实例】生产者每秒生成一个字符串，并通过通道传给消费者，生产者使用两个 goroutine 并发运行，消费者在 main() 函数的 goroutine 中进行处理。

```go
package main
// 导入格式化（fmt）、随机数（math/rand）、时间（time）包参与编译
import (
        "fmt"
        "math/rand"
        "time"
)
// 数据生产者
// 生产数据的函数，传入一个标记类型的字符串及一个只能写入的通道
func producer(header string, channel chan<- string) {
     // 无限循环, 不停地生产数据
     for {
            // 将随机数和字符串格式化为字符串发送给通道
            // 使用 rand.Int31() 生成一个随机数，使用 fmt.Sprintf() 函数将 header 和随机数格式化为字符串
            channel <- fmt.Sprintf("%s: %v", header, rand.Int31())
            // 使用 time.Sleep() 函数暂停 1 秒再执行这个函数。如果在 goroutine 中执行时，暂停不会影响其他 goroutine 的执行
            time.Sleep(time.Second)
        }
}
// 数据消费者，传入一个只能写入的通道
func customer(channel <-chan string) {
     // 不停地获取数据
     for {
            // 从通道中取出数据, 此处会阻塞直到信道中返回数据
            message := <-channel
            // 打印数据
            fmt.Println(message)
        }
}

//程序的入口函数，总是在程序开始时执行
func main() {
    // 实例化一个字符串类型的通道
    channel := make(chan string)
    // 并发执行一个生产者函数，两行分别创建了这个函数搭配不同参数的两个 goroutine
    go producer("cat", channel)
    go producer("dog", channel)
    // 数据消费函数
    customer(channel)
}
```

运行结果：

```shell
dog: 2019727887
cat: 1298498081
dog: 939984059
cat: 1427131847
cat: 911902081
dog: 1474941318
dog: 140954425
cat: 336122540
cat: 208240456
dog: 646203300
```

整段代码中，没有线程创建，没有线程池也没有加锁，仅仅通过关键字 go 实现 goroutine，和通道实现数据交换。

## 哪些项目使用Go语言开发

所有的编程语言都反映了语言设计者对编程哲学的反思，通常包括之前的语言所暴露的一些不足地方的改进。Go语言从发布 1.0 版本以来备受众多开发者关注并得到广泛使用，Go语言的简单、高效、并发特性吸引了众多传统语言开发者的加入，而且人数越来越多。

使用Go语言开发的开源项目非常多。早期的Go语言开源项目只是通过Go语言与传统项目进行C语言库绑定实现，例如 Qt、Sqlite 等；后期的很多项目都使用Go语言进行重新原生实现，这个过程相对于其他语言要简单一些，这也促成了大量使用Go语言原生开发项目的出现。

下面列举的是原生使用Go语言进行开发的部分项目。

### Docker

Docker 是一种操作系统层面的虚拟化技术，可以在操作系统和应用程序之间进行隔离，也可以称之为容器。Docker 可以在一台物理服务器上快速运行一个或多个实例。例如，启动一个 CentOS 操作系统，并在其内部命令行执行指令后结束，整个过程就像自己在操作系统一样高效。

项目链接：[https://github.com/docker/docker](https://github.com/docker/docker)

### Go语言

Go语言自己的早期源码使用C语言和汇编语言写成。从 Go 1.5 版本后，完全使用Go语言自身进行编写。Go语言的源码对了解Go语言的底层调度有极大的参考意义，建议希望对Go语言有深入了解的读者读一读。

项目链接：[https://github.com/golang/go](https://github.com/golang/go)

### Kubernetes

Google 公司开发的构建于 Docker 之上的容器调度服务，用户可以通过 Kubernetes 集群进行云端容器集群管理。系统会自动选取合适的工作节点来执行具体的容器集群调度处理工作。其核心概念是 Container Pod（容器仓）。

项目链接：[https://github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)

### etcd

一款分布式、可靠的 KV 存储系统，可以快速进行云配置。由 CoreOS 开发并维护键值存储系统，它使用Go语言编写，并通过 Raft 一致性算法处理日志复制以保证强一致性。

项目链接：[https://github.com/coreos/etcd](https://github.com/coreos/etcd)

### beego

beego 是一个类似 Python 的 Tornado 框架，采用了 RESTFul 的设计思路，使用Go语言编写的一个极轻量级、高可伸缩性和高性能的 Web 应用框架。

项目链接：[https://github.com/astaxie/beego](https://github.com/astaxie/beego)

### martini

一款快速构建模块化的 Web 应用的Go语言框架。

项目链接：[https://github.com/go-martini/martini](https://github.com/go-martini/martini)

### codis

国产的优秀分布式 Redis 解决方案。可以将 codis 理解成为 Web 服务领域的 Nginx，它实现了对 Redis 的反向代理和负载均衡。

项目链接：[https://github.com/CodisLabs/codis](https://github.com/CodisLabs/codis)

### delve

Go语言强大的调试器，被很多集成环境和编辑器整合。

项目链接：[https://github.com/derekparker/delve](https://github.com/derekparker/delve)

## 哪些大公司正在使用Go语言

Go语言是谷歌在 2009 年发布的一款编程语言，自面世以来它以高效的开发效率和完美的运行速度迅速风靡全球，被誉为“21 世纪的C语言”。

现在越来越多的公司开始使用Go语言开发自己的服务，同时也诞生了很多使用Go语言开发的服务和应用，比如 Docker、k8s 等，下面我们来看一下，有哪些大公司在使用Go语言。

### Google

作为创造了Go语言的 google 公司，当然会力挺Go语言了。Google 有很多基于 Go 开发的开源项目，比如 kubernets，docker，大家可以参考《哪些项目使用Go语言开发》一节了解更多的Go语言开源项目。

### Facebook

Facebook 也在使用Go语言，为此他们还专门在 Github 上建立了一个开源组织 facebookgo。大家可以通过 [https://github.com/facebookgo](https://github.com/facebookgo) 访问查看 facebook 开源的项目，其中最具代表性的就是著名平滑重启工具 grace。

### 腾讯

腾讯在 15 年就已经做了 Docker 万台规模的实践。因为腾讯主要的开发语言是 C/C++ ，所以在使用Go语言方面会方便很多，也有很多优势，不过日积月累的 C/C++ 代码很难改造，也不敢动，所以主要在新业务上尝试使用 Go。

### 百度

百度主要在运维方面使用到了Go语言，比如百度运维的一个 BFE 项目，主要负责前端流量的接入，其次就是百度消息通讯系统的服务器端也使用到了Go语言。

### 字节跳动



### 七牛云

七牛云算是国内第一家选Go语言做服务端的公司。早在 2011 年，当Go语言的语法还没完全稳定下来的情况下，七牛云就已经选择将 Go 作为存储服务端的主体语言。

### 京东

京东云消息推送系统、云存储，以及京东商城的列表页等都是使用Go语言开发的。

### 小米

小米对Go语言的支持，在于运维监控系统的开源，它的官方网址是 [http://open-falcon.org/](http://open-falcon.org/)。此外，小米互娱、小米商城、小米视频、小米生态链等团队都在使用Go语言。

### 360

360 对Go语言的使用也不少，比如开源的日志搜索系统 Poseidon，大家可以通过 [https://github.com/Qihoo360/poseidon](https://github.com/Qihoo360/poseidon) 查看，还有 360 的推送团队也在使用Go语言。

除了上面提到的，还有很多公司开始尝试使用Go语言，比如美团、滴滴、新浪等。

Go语言的强项在于它适合用来开发网络并发方面的服务，比如消息推送、监控、容器等，所以在高并发的项目上大多数公司会优先选择 Golang 作为开发语言。
