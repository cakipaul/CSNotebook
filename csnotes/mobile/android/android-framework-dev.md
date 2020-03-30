# 移动框架开发

## 功能加载简介

移动框架在功能加载时，会依次跳转Html、加载Js、触发onViewInit函数，功能加载流程如下：

1. 页面跳转：调用 cmApi.router.turnToPage
2. 加载功能页面：查询 functionConfig.js，跳转至对应 html 页面
3. 加载功能模块：查询 functionConfig.js，使用 require 加载对应 js 和依赖
4. 触发 onViewInit

Framework7 官网地址：[https://v1.framework7.io/docs/](https://v1.framework7.io/docs/)

## 开发流程

1. 新建功能的html、js文件，依次操作File → New → File。
2. 编写html页面布局文件，构建大体布局。一般页面布局分为两个部分：顶部的导航栏navbar，以及page功能区，注意修改data-page为功能名称，与functionConfig.js中配置一致。
3. 编写js逻辑控制文件，构建主要结构，定义AMD规范结构，填充onViewInit、onPageDestroy方法，并注册return。

## 文件组织

## JS逻辑控制

功能开发要求页面布局与逻辑控制分离，html页面布局文件不支持编写js逻辑。

逻辑控制中包含组件的引入、数据的定义、接口调用、数据修改等等操作。
JS逻辑控制需严格遵循AMD规范与框架格式。

1. 使用define定义功能模块。
2. 必须实现onViewInit、onPageDestroy逻辑，进入功能时会自动调用onViewInit方法，需在其中实现功能初始化逻辑。
3. return需要对外暴露的方法、参数，包括html中调用的方法。需要暴露的有：
    - onViewInit、onPageDestroy，是框架规定每个功能都必须暴露的方法。
    - Html中定义的点击等事件实现，如功能中的跳转跳转。
    - 插件API的中的字符串回调方法。
    - 需要在其他JS中调用的方法。

## 调用后台接口

调用后台接口不支持AJAX方式，统一使用cmApi.request.httpPostAsync接口访问，同时定义响应反馈方法，并在return中注册。

后台接口响应值需采用JSON格式，UTF-8编码，详细格式参照《API接口开发标准规范（试行版）v1.2》。

基本格式如下:
```json
{
    "retCode": 1,
    "retMsg": "success",
    "totalRows": 1,
    "data": [
        {
            "zznm": "111",
            "zzmc": "XXX直属库",
            "cfbh": "一号仓",
            "cfnm": ""
        }
    ]
}
```

Key|	解释	|是否可空	|数据类型	|备注
---|---|---|---|---
retCode|	返回码|		|String	|
retMsg	|返回消息	|√|	String	|失败错误提示，为空时提示“网络错误”
data	|返回参数体	||	Json或String	|具体业务参数
totalRows|	消息总条数||		Int	|


## 配置功能

每个功能都需要进行注册配置，进入functionConfig.js中，在functionConfig变量中的config.jump中进行配置，否则无法进入功能。

参数	|介绍
---|---
fncname	|功能名称，功能跳转API传递的参数
achieve	|功能逻辑实现文件，相对于basePath的路径
path	|功能列表布局文件，相对于basePath的路径
dependents	|依赖的功能组件，无依赖则配置空，依赖单个配置字符串如'md5'，依赖多个则配置数组，如['md5','echarts']










