# 本书首页

## Q&A
- **Android Studio 开发 Flutter时 Colors 提示卡住**：

    Flutter文档提示采用的是MarkDown解析，在Flutter的源码文档注释中含有大量的图片标签 ![]，所以在提示的时候，会访问网络，加载这些图片资源。 大量的网络请求，导致提示卡住。在使用 Colors. 的时候卡顿最为明显。

    解决方案：移除  `![]`  的文档提示。
    
    进入Flutter的源码目录，找到  %Flutter 目录%\packages\flutter\lib\src\material\colors.dart ,将文件中所有的  `![]`  替换为  `[]` 。也可以直接删除，这里做替换，是为了保留原注释。

- **the GFW 的问题**：

    Flutter SDK China 镜像下载：[Using Flutter in China](https://flutter.dev/community/china)

    注意在使用 `flutter build apk` 等命令时，需要从谷歌相关网站下载资源包，the GFW 可能使编译失败。