# 移动框架简介

## 框架原理

移动框架使用混合开发模式，使用HTML/JS开发展示页面，使用Native原生实现底层硬件控制、JS无法实现的通用模块。前端封装Framework7单页面UI框架，使用requireJs加载功能模块，基座封装WebView浏览器组件支撑页面展示，通过插件实现复杂通用逻辑。

移动框架同时兼顾开发成本、跨平台和用户体验。提供数十个插件快速实现业务逻辑，研发只需要掌握html、js、css技术即可快速实现功能，一次开发同时支持Android、IOS、微信公众号。

移动框架分为基础库和扩展插件库。基础库中除UI框架、浏览器组件外，还包含基础插件，提供Http、文件、二维码等最基本功能。为缩小APP体积，将体积大、使用频率低的复杂插件独立成扩展插件，如需OCR、消息推送、网络摄像头等，可按需引用。

## 项目结构

### 总结构

一级	|二级	|三级	|功能介绍
---|---|---|---
.gradle			|||APP项目打包、运行时生成的临时文件，请勿随意修改，无需进行代码管理
.idea			|||Android Studio IDE开发工具生成的临时文件，请勿随意修改，无需进行代码管理
app	|build		||APP编译时生成的临时文件，请勿随意修改，无需进行代码管理
app|src	|androidTest	|Android Test自动化测试用例文件夹，框架暂不支持，请勿随意修改，无需进行代码管理
app|src	|main	|APP代码和资源目录，详见2.2.2功能目录结构
app|src	|test	|Unit Test单元测试用例文件夹，框架暂不支持，请勿随意修改，无需进行代码管理
app|.gitignore		||用于Git版本控制，将app模块内的指定的目录或文件排除在版本控制之外，作用和外层的.gitignore文件类似
app|app.iml		||用于标识Intellij IDEA 项目，请勿随意修改
app|build.gradle	||	内层build.gradle，app模块内的gradle构建脚本，用于配置指定项目构建相关参数，请勿随意修改
app|proguard-rules.pro	||	这个文件用于指定项目代码的混淆规则，请勿随意修改
gradle		|||	gradle wrapper的配置文件，请勿随意修改
.gitignore		|||	用于Git版本控制，将指定的目录或文件排除在版本控制之外
build.gradle	|||		项目全局的gradle构建脚本，请勿随意修改
gradle.properties	|||		项目全局的gradle配置文件，请勿随意修改
gradlew		|||	Gradle命令脚本，用于Linux或Mac系统，请勿随意修改
gradlew.bat		|||	Gradle命令脚本，用于Windows系统，请勿随意修改
{app_name}.iml		|||	用于标识这是一个IntelliJ IDEA项目（Android Studio是基于IntelliJ IDEA开发的），请勿随意修改
local.properties		|||	用于指定本机中的Android SDK路径，内容自动生成，请勿随意修改
settings.gradle		|||	用于指定项目中所有引入的模块，APP项目只有1个模块，请勿随意修改

### 功能目录

业务开发代码均在app/src/main目录结构下，特对此目录结构进行详细说明。其中assets是核心目录，用于存放所有html、js、css代码。

一级	|二级	|三级	|功能介绍
---|---|---|---
assets	|mobile|	css	|存放APP通用css文件
assets	|mobile|html	|存放APP的业务功能实现代码，例如html、js等
assets	|mobile|image	|存放APP通用图片类文件
assets	|mobile|js	|存放功能常量配置文件、通用js类库
res	|drawable		||Android项目的图像文件夹，请勿随意修改
res	|mipmap-hdpi	|	|Android项目的图片文件夹，除修改图标外，请勿随意修改
res	|values	||	Android项目的常量文件夹，除修改项目名称外，请勿随意修改
res	|AndroidManifest.xml	||	Android项目的配置文件夹，框架已封装，请勿随意修改

### 重要文件

针对移动框架开发，有4个重要文件需要特别了解，特对此进行详细说明。

文件	|路径	|功能介绍
---|---|---
welcomescreen.html|	mobile\\html\\main|	存放APP入口页面，用于展示项目logo等信息，会自动跳转到main.html。
main.html	|mobile\\html\\main	|APP业务功能入库页面。
functionConfig.js	|mobile\\js|	功能公共配置文件，注意版本管理，新增加的功能、js类库，需在此文件中进行配置，配置方式详见“功能开发流程”章节。
configs.properties|	mobile\\ |	项目配置文件

其中 configs.properties 示例如下：

```properties
## 调试开关，正式发布时一定要关闭,此功能需要android 4.4及以上支持
debug=true

## APP名称-英文
app.name.en=igmcloud

## 服务端配置
app.server.url=http://xxxxxxxxx/igmcloud/

## 此地址为assets文件夹下的目录结构
app.local.url=mobile/html/main/welcomescreen.html

## 兼容模式，兼容框架3.0版本
app.compatibility=false

## http请求
## http异步请求超时时间，单位毫秒，如不配置，默认为3000
http.async.timeout.ms=3000
## http异步请求最大重试次数，如不配置，默认为3
http.async.retry.max=3

## 消息推送 umeng:友盟推送 baidu:百度推送，默认百度推送
push.type=umeng

##百度语音服务认证信息--android独有
baidu.tts.appId=xxxxxxxxx
baidu.tts.appKey=xxxxxxxxx
baidu.tts.secretKey=xxxxxxxxx
baidu.tts.dir=baiduTts

##百度推送服务认证信息
baidu.push.appKey=xxxxxxxxx

##科大讯飞语音识别认证信息
xfyun.iat.appId=xxxxxxxxx

##友盟推送服务认证信息
push.umeng.appKey=xxxxxxxxx
push.umeng.messageSecret=xxxxxxxxx

##华为送服务认证信息
push.huawei.appId=xxxxxxxxx

##小米推送服务认证信息
push.xiaomi.appId=xxxxxxxxx
push.xiaomi.appKey=xxxxxxxxx

##魅族推送服务认证信息
push.meizu.appId=xxxxxxxxx
push.meizu.appKey=xxxxxxxxx
```

## 服务模块

### 移动报表

针对硕正报表对移动APP使用不友好的情况，专门开发移动报表服务，并部署在云端提供服务。移动报表可完全复用产品端的报表配置数据，无需二次开发，极大提高移动端报表开发效率。

### 短信平台

短信平台对接第三方容联平台，部署在云端提供服务，提供短信验证码、短信通知服务。

## 框架升级

移动框架使用AS的gradle进行框架升级管理。当框架、扩展类库有新版本时，会将新版本打包成aar上传至私有maven服务器，便于项目随时更新。私有maven服务器已在Demo项目中进行配置，无需调整。

## UI框架

移动框架采用Framework7 UI框架，Framework7 是一个开源免费的框架可以用来开发混合移动应用（原生和HTML混合）或者开发 iOS & Android 风格的WEB APP。也可以用来作为原型开发工具，可以迅速创建一个应用的原型。

UI框架使用问题可直接参考官方文档：

- 使用版本：1.5.3
- 官方地址：[https://v1.framework7.io/docs/](https://v1.framework7.io/docs/)



