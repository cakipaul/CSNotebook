# Node.js

## Nodejs Release 镜像使用帮助

Nodejs Release 为各平台提供预编译的 nodejs 和 npm 等二进制文件，是 `https://nodejs.org/dist/` 的镜像。
使用方法

可以手工选择下载所需的版本，也可以搭配 n 使用，方法如下：

```bash
# 设定环境变量

export NODE_MIRROR=https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/

# 然后正常使用 n 即可

sudo n stable
```

## Nodesource 镜像使用帮助

Nodesource 为 debian, ubuntu, fedora, RHEL 等发行版提供预编译的 nodejs 和 npm 等软件包。
debian/ubuntu 使用方法

运行：

```bash
curl -sL https://deb.nodesource.com/setup | sudo bash -

# or
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -

# or
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
```

编辑 `/etc/apt/sources.list.d/nodesource.list`，把 `https://deb.nodesource.com/node/` 替换为 `https://mirrors.tuna.tsinghua.edu.cn/nodesource/deb/` 即可。

如果是 `https://deb.nodesource.com/node_10.x/` ，则改为 `https://mirrors.tuna.tsinghua.edu.cn/nodesource/deb_10.x/` 。

## NPM 设置

使用淘宝镜像的命令：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 参考资源

- [清华大学 Mirrors](https://mirrors.tuna.tsinghua.edu.cn/help/nodejs-release/)
- [淘宝 cnpm](https://npm.taobao.org/)
