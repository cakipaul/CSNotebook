# Vue 入门指南

## 资源

- [vue 中文文档](https://cn.vuejs.org/v2/guide/)
- [vue-cli 中文文档](https://cli.vuejs.org/zh/guide)
- [element vue 中文文档](https://element.eleme.io/#/zh-CN)
- [el-icon](https://element.eleme.io/#/zh-CN/component/icon)
- [MUI](https://dev.dcloud.net.cn/mui/)
- [VANT](https://youzan.github.io/vant/#/zh-CN/intro)

## 准备工作

### win 下载 nvm，安装 node
* 链接：https://github.com/coreybutler/nvm-windows/releases

win下nvm：在nvm安装目录下的settings.txt中添加：

```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

### 安装 cnpm 与配置镜像

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org

#查看npm源地址
npm config list

#修改registry地址，比如修改为淘宝镜像源。
npm set registry https://registry.npm.taobao.org/
```

### 安装组件

>**不要从国内镜像cnpm安装(会导致后面缺了很多依赖库)**

```bash
# 安装 webpack
npm install webpack -g

# 安装vue脚手架
npm install vue-cli -g
```

## 什么是 Vue

Vue 是一个前端框架，特点是:

- 数据绑定：比如你改变一个输入框 Input 标签的值，会自动同步更新到页面上其他绑定该输入框的组件的值
- 组件化：页面上小到一个按钮都可以是一个单独的文件.vue，这些小组件直接可以像乐高积木一样通过互相引用而组装起来

## 部署启动

```bash
# 安装依赖，建议使用管理员权限的 powershell，否则可能出现各种权限问题导致的奇怪错误
npm install


```


启动项目
npm run dev