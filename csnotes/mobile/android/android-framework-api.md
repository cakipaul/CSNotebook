# 移动框架 API 说明


## 总体介绍

移动框架使用混合开发模式，使用HTML/JS开发展示页面，使用Native原生实现底层硬件控制、JS无法实现的通用模块。框架提供数十个插件快速实现业务逻辑，研发只需要掌握html、js、css技术即可快速实现功能，一次开发同时支持Android、IOS、微信公众号。

## 返回方式

插件API调用时，框架提供三种返回方式：同步返回、异步返回-字符串回调、异步返回-方法返回。后续版本异步返回统一使用方法返回，字符串回调逐步废弃。

在插件API使用介绍时，如有返回值，则按照以下用法接收返回值，每个API不再详细。

### 同步返回

同步返回即调用插件API时，直接返回结果，使用方便，但会阻塞主线程。同步返回插件API不要在for循环中高频调用，否则会造成程序卡顿，影响用户体验。

例如：var value = `cmApi.localStorage.getItem("xxx")`

### 异步返回-字符串回调

异步返回即调用插件API时，直接异步结果，不会阻塞主线程，但使用不便。需要定义回调函数，并将其暴露出去。

```js
var onViewInit = function(obj){
    window.handWriteModule = obj;//确认方法模块名称
}
var onPageDestroy = function(){
    delete window.handWriteModule;
}
function handWrite(){
    //调用时传递字符串格式的回调，格式为：方法模块名称.回调函数名称
    cmApi.handwrite.start(null,'handWriteModule.handWriteCallback')
}
//定义回调函数
function handWriteCallback(ret) {
    $$("#handWrite").attr('src',ret.data.imgUrl);
}
return {
    onViewInit : onViewInit,
    onPageDestroy : onPageDestroy,
    handWrite:handWrite,
    handWriteCallback : handWriteCallback//回调函数中暴露该方法供框架调用
}
```

### 异步返回-方法回调

异步返回即调用插件API时，直接异步结果，不会阻塞主线程，支持直接传递回调处理逻辑或传递回调方法，使用比字符串回调方式简单。且无需暴露回调函数更安全。

```js
function openImagePicker(){
    var params = { maxCount: 3 };
    //直接传递回调参数
    cmApi.filePicker.openImagePicker({
        params: params,
        success: imagePickerSuccess(filePaths),
        error: function(msg) { alert("error:" + msg);}
    });
}
//传递回调方法，无需在 return 中暴露
function imagePickerSuccess(filePaths) {
        $$("#filepicker_filepath").val(filePaths);
        $$("#filepicker_image").attr('src', filePaths);
}
```

### 微信公众号插件支持

因微信API限制，移动框架的部分API在微信公众号无法使用，支持情况如下：

| 插件名称        | 插件方法                                | 插件方法说明            | 支持情况   |
|-----------------|-----------------------------------------|-------------------------|------------|
| 设备信息        | cmApi.device.getDeviceId                | 获取设备唯一标识        | 支持       |
| 设备信息        | cmApi.device.getVersion                 | 获取系统版本            | 支持       |
| 设备信息        | cmApi.device.getModel                   | 获取手机型号            | 支持       |
| 设备信息        | cmApi.device.getBrand                   | 获取手机品牌            | 支持       |
| 设备信息        | cmApi.device.getType                    | 获取手机系统类型        | 支持       |
| APP信息         | cmApi.appUtil.getAppVersionCode         | 获取app版本号           | 支持       |
| APP信息         | cmApi.appUtil.getAppName                | 获取app名称             | 支持       |
| APP信息         | cmApi.appUtil.getNetWorkType            | 获取当前网络类型        | 支持       |
| APP信息         | cmApi.appUtil.downloadApk               | 下载APK安装包           | 支持       |
| 本地数据库操作  | cmApi.jdbc.execSelectSQL                | 数据库查询              | **不支持** |
| 本地数据库操作  | cmApi.jdbc.execUpdateSQL                | 数据库更新              | **不支持** |
| 用户定位及导航  | cmApi.map.locate                        | 用户定位                | 支持       |
| 用户定位及导航  | cmApi.map.navigate                      | 百度导航                | **不支持** |
| 网络请求        | cmApi.request.commHttpPostAsync         | 异步网络请求            | 支持       |
| 网络请求        | cmApi.request.reportFormHttpPostAsync   | 报表请求                | 支持       |
| 消息推送        | cmApi.push.init                         | 初始化推送              | **不支持** |
| 消息推送        | cmApi.push.onBind                       | 推送绑定                | **不支持** |
| NFC             | cmApi.nfc.isNfcExists                   | 判断手机是否支持nfc功能 | **不支持** |
| NFC             | cmApi.nfc.isNfcEnabled                  | 判断手机是否开启nfc功能 | **不支持** |
| NFC             | cmApi.nfc.startReadCard                 | nfc读卡                 | **不支持** |
| NFC             | cmApi.nfc.stopReadCard                  | 停止nfc读卡             | **不支持** |
| NFC             | cmApi.nfc.writeCard                     | nfc写操作               | **不支持** |
| NFC             | cmApi.nfc.resetCardInfo                 | 重置nfc卡信息           | **不支持** |
| 蓝牙打印        | cmApi.bluetoothPrinter.setTitle         | 设置蓝牙打印的标题      | **不支持** |
| 蓝牙打印        | cmApi.bluetoothPrinter.setInfo          | 设置蓝牙打印的内容      | **不支持** |
| 蓝牙打印        | cmApi.bluetoothPrinter.setTyp           | 设置蓝牙打印的打印类型  | **不支持** |
| 蓝牙打印        | cmApi.bluetoothPrinter.printer          | 开始打印                | **不支持** |
| 蓝牙打印        | cmApi.bluetoothPrinter.destroyBluetooth | 停止打印                | **不支持** |
| 手写签名        | cmApi.handwrite.start                   | 手写签名                | **不支持** |
| 二维码          | cmApi.qrCode.createQRCode               | 生成二维码              | 支持       |
| 二维码          | cmApi.qrCode.scan                       | 二维码扫描              | 支持       |
| 拍照            | cmApi.photo.photograph                  | 相机拍照                | 支持       |
| 拍照            | cmApi.image.watermarkText               | 添加文字水印            | **不支持** |
| 拍照            | cmApi.image.watermaskImage              | 添加照片水印            | **不支持** |
| 拍照            | cmApi.image.compressByScale             | 照片等比例压缩          | 支持       |
| 拍照            | cmApi.image.compressByScale             | 照片按大小压缩          | 支持       |
| 视频            | cmApi.video.show                        | 安防监控                | **不支持** |
| 视频            | cmApi.video.playback                    | 录像回放                | **不支持** |
| 视频            | cmApi.video.record                      | 手机录像                | **不支持** |
| 视频            | cmApi.video.compress                    | 视频压缩                | **不支持** |
| 语音播报        | cmApi.speech.startSpeak                 | 开始播放                | **不支持** |
| 语音播报        | cmApi.speech.stopSpeak                  | 停止播放                | **不支持** |
| 手机认证        | cmApi.fingerprint.startAuthenticate     | 开始认证                | **不支持** |
| 手机认证        | cmApi.fingerprint.cancelAuthenticate    | 停止认证                | **不支持** |
| 手机认证        | cmApi.fingerprint.isSupport             | 是否支持认证            | **不支持** |
| OCR识别         | cmApi.ocr.speechRecognition             | 语音识别                | **不支持** |
| OCR识别         | cmApi.ocr.licenseRecognition            | 车牌号识别              | **不支持** |
| OCR识别         | cmApi.ocr.idCardRecognition             | 身份证识别              | **不支持** |
| 文件            | cmApi.file.uploadFiles                  | 文件上传                | 支持       |
| 文件            | cmApi.file.downloadFiles                | 文件下载                | **不支持** |
| 文件            | cmApi.document.preview                  | 文件预览                | **不支持** |
| 文件            | cmApi.file.delete                       | 文件删除                | **不支持** |
| 文件            | cmApi.file.getMd5                       | 获取文件MD5值           | **不支持** |
| 文件            | cmApi.file.rename                       | 文件重命名              | **不支持** |
| 文件            | cmApi.file.copy                         | 文件复制                | **不支持** |
| 文件            | cmApi.file.mkdirs                       | 文件新建子目录          | **不支持** |
| configs配置文件 | cmApi.config.getItem                    | 获取配置信息            | **不支持** |
| configs配置文件 | cmApi.config.isDebug                    | chrome浏览器调试模式    | **不支持** |
| configs配置文件 | cmApi.config.isCompatibility            | 兼容模式                | **不支持** |
| 文件选择器      | cmApi.FilePicker.openImagePicker        | 相册选择器              | 支持       |
| 文件选择器      | cmApi.FilePicker.openVideoPicker        | 视频选择器              | **不支持** |
| 文件选择器      | cmApi.FilePicker.openAudioPicker        | 音频选择器              | **不支持** |
| 文件选择器      | cmApi.FilePicker.openFilePicker         | 文件选择器              | **不支持** |
| 数据存储        | cmApi.LocalStorage.getItem              | 获取数据                | 支持       |
| 数据存储        | cmApi.LocalStorage.setItem              | 存储数据                | 支持       |
| 手持机          | cmApi.handset.readIdCard                | 读卡                    | **不支持** |
| 手持机          | cmApi.handset.closeIdCard               | 关闭读卡                | **不支持** |
| 手持机          | cmApi.handset.print                     | 打印                    | **不支持** |
| 手持机          | cmApi.handset.scanBarCode               | 二维码扫描              | **不支持** |
| 手持机          | cmApi.handset.scanBarCodeBindKey        | 开启二维码扫描按键      | **不支持** |
| 手持机          | cmApi.handset.scanBarCodeUnBindKey      | 关闭二维码扫描按键      | **不支持** |
| 监听            | cmApi.eventListener.add                 | 添加监听                | **不支持** |
| 监听            | cmApi.eventListener.remove              | 移除监听                | **不支持** |
| 监听            | cmApi.eventListener.clear               | 清楚监听                | **不支持** |

## 插件API使用说明

### 基本操作

#### 功能路由

1. 功能跳转：实现app中不同功能之间的跳转：
    - `cmApi.router.turnToPage(funcname)`//功能名称，即functionConfig.js中配置的funcname
    - `cmApi.router.turnToPage(funcname,param)`//param 页面传递的参数
2. 加载新页面:
    - `cmApi.router.load(htmlpath)` //	需要加载页面的相对路径
    - `cmApi.router.loadContent(htmlcontent)` //需要加载的html内容
    - `cmApi.router.loadPage(url)` //需要加载页面的网络地址
4. 重新加载页面（path）:
    - `cmApi.router.reloadContent(path)` //加载内容的路径
    - `cmApi.router.reloadPage(url)`  //需要加载页面的url

>以上方法没有返回值。

#### 服务器地址

设置后端服务地址以及获取后端服务地址。

>注：通过setServerUrl设置服务地址并不会修改configs.properties中的app.server.url值，故服务地址修改后，getServerUrl会与config.getItem("app.server.url")不一致

1. 设置服务地址：
    - `cmApi.setIp(value)`  //服务IP地址，例如10.200.64.78:8080。V4.0已废弃，但可继续使用。请使用 setServerUrl
    - `cmApi.setServerUrl(value)` //服务器完整地址，例如http://10.200.64.78:8080
    >以上方法没有返回值。
2. 获取服务地址：
    - `cmApi.getIp()` //服务器IP地址，例如10.200.64.78:8080。V4.0已废弃，但可继续使用。请使用 getServerUrl
    - `cmApi.getServerUrl()` //服务器完整地址，例如http://10.200.64.78:8080

#### 加载框

展示或隐藏加载提示框，在处理较长任务时可使用。

1. 展示加载框：
    - `cmApi.showLoadingDialog()` 
2. 取消加载框
    - `cmApi.hideLoadingDialog()` 

#### 信息提示

给当前视图显示一个浮动的显示块，不会获得焦点，3秒后自动消失。一般用于提示一些不重要但是又希望用户看见的消息，例如单据保存成功后提示“单据保存成功”。

1. 信息提示：
    - `cmApi.prompt.toast(msg)` 
    - `cmApi.prompt.toast(msg,title)` //提示信息，提示信息标题（可以为空）


#### APP信息

用于查询有关app的相关信息。

1. 获取app版本号：
    - `cmApi.appUtil.getAppVersionCode()` //同步返回 String	APP版本号，例如101
2. 获取app名称：
    - `cmApi.appUtil.getAppName()` //同步返回 String APP名称
3. 获取当前网络类型：
    - `cmApi.appUtil.getNetWorkType()`  //获取网络类型，WIFI、MOBILE、OTHER。V4.0已废弃，但可继续使用。请使用network.getNetworkType。
4. 检查更新（已废弃）：
    - `cmApi.appCheckUpdate(flag,zznm,systemType,appName,appVersionCode)`  //检查app更新，用于android版本。V4.0已废弃，不能使用，请业务判断是否需要更新。

    参数列表：

| 参数名         | 类型 | 描述                                                          |
|----------------|------|---------------------------------------------------------------|
| flag           | Int  | 0：进入app时进行检查更新；1：我的关于页面，手动点击检查更新； |
| zznm           |      | 组织内码                                                      |
| systemType     |      | 系统类型（只针对android）                                     |
| appName        |      | App名称                                                       |
| appVersionCode |      | App版本号                                                     |

    示例：

    `cmApi.appCheckUpdate(0,cmApi.userInfo.getZznm(),cmApi.device.getType(),cmApi.appUtil.getAppName,cmApi.appUtil.getAppName.getAppVersionCode)` 
5. 下载并安装apk ：APP完成下载后会自动调用安装程序：
    - `cmApi.appUtil.downloadApk(url)` //apk下载地址

### 设备信息

获取手机设备基础信息。

1. 获取设备唯一标识
    - `cmApi.device.getDeviceId()` 
2. 获取系统版本
    - `cmApi.device.getVersion()` //	系统版本，例如9.0
3. 获取手机型号
    - `cmApi.device.getModel()` //手机型号，比如 Xiaomi 8
4. 获取手机品牌
    - `cmApi.device.getBrand()` //	手机品牌，比如 Xiaomi
5. 获取手机类型
    - `cmApi.device.getType()` //手机类型，分为android、ios
6. 获取手机屏幕像素
    - `cmApi.device.getScreenHeight()` //	Int	屏幕高度
    - `cmApi.device.getScreenWidth()` // Int	屏幕宽度
7. 设置状态栏颜色
    - `cmApi.device.setWindowStatusBarColor(color)` //	颜色代码，例如#FFFFFF
8. 是否平板设备
    - `cmApi.device.isTabletDevice()` //	String	0：手机 1：平板

### 配置文件

获取APP配置信息，读取configs.properties配置文件数据，不支持配置修改。

>注：通过setServerUrl设置服务地址并不会修改configs.properties中的app.server.url值，故服务地址修改后，getServerUrl会与config.getItem（"app.server.url"）不一致

1. 获取配置信息
    - `cmApi.config.getItem(key)` 
2.调试模式
    - `cmApi.config.isDebug()` // Boolean	是否开启调试模式
3. 兼容模式
    - `cmApi.config.isCompatibility()` // BOOL类型；

### 本地存储

将数据存储在手机中，APP卸载时，数据清空。适合用于保存APP配置参数，例如配置开关、用户名等数据。

1. 存储数据
    - `cmApi.setStringSession(key,value)` //V4.0已废弃，但可继续使用。请使用localStorage.setItem。使用setStringSession保存的数据支持使用新接口getItem获取。
    - `cmApi.localStorage.setItem(key,value)`//都是String类型
2. 获取数据
    - `cmApi.getStringSession(key)` //V4.0已废弃，但可继续使用。请使用localStorage.getItem。使用setStringSession保存的数据支持使用新接口getItem获取。
    - `cmApi.localStorage.getItem(key)`

### 退出

- 彻底退出app应用程序：`cmApi.appExit()` 

### 网络状态

1. 是否有网路
    - `cmApi.network.isConnect()` //	Boolean	是否有网络
2. 获取当前网络类型
    - `cmApi.network.getNetworkType()` //String	网络类型，WIFI、MOBILE、OTHER
3. ping
    - `cmApi.network.ping(ip,timeout)` //timeout Int 超时时间，单位秒，默认3秒。返回 Boolean	是否ping通

### 用户信息

用于获取登录用户的一些基本信息。用户登录后可以使用，如果获取为空，请检查登录逻辑中是否保存。

1. 获取用户唯一标识
    - `cmApi.userInfo.getUserId()` //String 用户唯一标识
2. 获取用户绑定标识
    - `cmApi.userInfo.getBindUserId()` //String	用户绑定在第三方的唯一标识
3. 获取用户内码
    - `cmApi.userInfo.getUserNm()` 
4. 获取用户密码
    - `cmApi.userInfo.getUserPwd()` //String	用户密码
5. 获取用户身份证号
    - `cmApi.userInfo.getUserIDCard()` //String	用户身份证号
6. 获取用户电话
    - `cmApi.userInfo.getPhoneNum()` //String	用户电话
7. 获取用户组织内码
    - `cmApi.userInfo.getZZnm()` //String	组织内码
8. 获取用户组织名称
    - `cmApi.userInfo.getZZmc()` 
9. 获取用户组织类型
    - `cmApi.userInfo.getZZlx()` 
10. 获取用户分级编码
    - `cmApi.userInfo.getFjbm()` 
11. 获取用户级次
    - `cmApi.userInfo.getJc()` 
12. 获取用户角色
    - `cmApi.userInfo.getRoles()` 
13. 获取组织树
- `cmApi.userInfo.getAllZzTree()` 
14. 获取当前用户组织树
    - `cmApi.userInfo.getCurrentUserZzTree()` 

### Http请求

发起http post请求，包含几种不同形式的请求方式。httpPostAsync方法会自动控制加载框，httpPostAsyncNoLoading则没有加载框。

#### 异步请求

- 含提示框：
    - `cmApi.request.httpPostAsync(url,param,callback)` 
    - `cmApi.request.httpPostAsync(url,param,contentType,callback)` 
- 不含提示框：
    - `cmApi.request.httpPostAsyncNoLoading(url,param,callback)` 
    - `cmApi.request.httpPostAsyncNoLoading(url,param,contentType,callback)` 

参数列表：

| 参数名      | 类型       | 描述                                                                                   |
|-------------|------------|----------------------------------------------------------------------------------------|
| url         | String     | 接口地址,与serverUrl组合成接口全地址，例如：service/demo/insert                        |
| param       | JsonObject | 请求参数                                                                               |
| contentType | String     | 编码类型，可不传，默认application/x-www-form-urlencoded ，支持修改例如application/json |
| callback    | String     | 回调函数                                                                               |

返回值：

| 参数名 | 类型               | 描述                                                       |
|--------|--------------------|------------------------------------------------------------|
| data   | JsonObject或String | 返回值如果是JSON格式，则返回JsonObject，否则直接返回String |

返回方式：

异步-字符串回调

示例：

`cmApi.request.httpPostAsync('service/demo/insert',params,'demoModule.insertCallback')` 

#### 异步请求（转发服务专用）（已废弃）

V4.0已废弃，不能使用。请使用request.commHttpPostAsync。

方法：`cmApi.request.commHttpPostAsync(ifinfoNm,jParam,callback)` 

参数列表：

| 参数名   | 类型      | 描述      |
|----------|-----------|-----------|
| ifinfoNm | String    | 接口内码  |
| jParam   | JsonObjec | t	请求参数 |
| callback | String    | 回调函数  |

返回值：

| 参数名 | 类型               | 描述                                                       |
|--------|--------------------|------------------------------------------------------------|
| data   | JsonObject或String | 返回值如果是JSON格式，则返回JsonObject，否则直接返回String |

返回方式：异步-字符串回调

示例：

`cmApi.request.commHttpPostAsync('demoinsert',params,'demoModule.insertCallback')` 

#### 硕正报表请求

方法：`cmApi.request.reportFormHttpPostAsync(ifinfoNm,jParam,callback)` 

参数列表：

| 参数名   | 类型      | 描述      |
|----------|-----------|-----------|
| ifinfoNm | String    | 接口内码  |
| jParam   | JsonObjec | t	请求参数 |
| callback | String    | 回调函数  |

返回值：

| 参数名 | 类型               | 描述                                                       |
|--------|--------------------|------------------------------------------------------------|
| data   | JsonObject或String | 返回值如果是JSON格式，则返回JsonObject，否则直接返回String |

返回方式：异步-字符串回调

示例：

`cmApi.request.reportFormHttpPostAsync('getRform',params,'ckrjdModule.queryReportFormCallback')`

### 设备通信

1. 打电话
    - `cmApi.contact.phone(phonenumber)` //String	手机号
2. 发短信
    - `cmApi.contact.sms(phonenumber)` //String	手机号


### 本地数据库

对手机本地数据库中的数据进行增、删、改、查。APP卸载时，数据清空。

1. 数据库查询
    - `cmApi.jdbc.execSelectSQL(sql)` 
    - `cmApi.jdbc.execSelectSQL(sql,parameters)`  //parameters	JsonObject	参数
2. 数据库更新
    - `cmApi.jdbc.execSelectSQL(sql)` 
    - `cmApi.jdbc.execUpdateSQL(sql,parameters)` 
    - 返回值： int	更新条数 

### 地图

集成百度地图，定位使用 GCJ02 坐标系。百度导航效果类似百度地图。

1. 用户定位
    - `cmApi.map.locate(callback)` 

返回值：

| 参数名    | 类型   | 描述 |
|-----------|--------|------|
| latitude  | double | 纬度 |
| longitude | double | 经度 |

### 百度导航

实现起始位置的在线导航功能。依赖百度导航扩展插件。

方法：`cmApi.map.navigate(opts)` 

参数列表：

| 参数名 | 类型   | 描述     |
|--------|--------|----------|
| slng   | String | 起点经度 |
| slat   | String | 起点纬度 |
| sloc   | String | 起点地址 |
| elng   | String | 终点经度 |
| eloc   | String | 终点纬度 |
| eloc   | String | 终点地址 |

示例：

```js
var opts = {slng: '',slat: '',elng: '',elat: '',eloc: ''};
cmApi.map.navigate(opts);
```

### 二维码

1. 生成二维码：创建二维码图片，并将其显示在div中。
    - `cmApi.qrCode.createQRCode(w,h,divId,content)` 

    参数列表：

| 参数名  | 类型   | 描述                  |
|---------|--------|-----------------------|
| w       | String | 二维码图片宽度        |
| h       | String | 二维码图片高度        |
| divId   | String | 显示二维码图片div的Id |
| content | String | 二维码内容            |
2. 二维码扫描
    - `cmApi.qrCode.scan(callback)` 

### 消息推送

消息推送支持百度推送、友盟推送。使用百度推送时依赖百度推送扩展插件，使用友盟推送时依赖友盟推送扩展插件。

百度推送不支持增、删标签，不支持静默模式。

1. 推送注册
    - `cmApi.push.register(opts)` //返回值：pushToken	String	消息推送用户token，后台服务使用此token给用户推送消息

    > opts 中 success 与 error 配置回调

2. 增加标签
    - `cmApi.push.addTag(tag)` //String	标签名称，后台服务使用tag给用户组推送消息
3. 删除标签
    - `cmApi.push.delTag(tag)` 
4. 标签列表
    - `cmApi.push.listTag()`    //JSONArry	标签列表
5. 静默模式
    - `cmApi.push.setNoDisturbMode()` 

| 参数名      | 类型 | 描述         |
|-------------|------|--------------|
| startHour   | int  | 静默开始小时 |
| startMinute | int  | 静默开始分钟 |
| endHour     | int  | 静默结束小时 |
| endMinute   | int  | 静默结束分钟 |

    示例：`cmApi.push.setNoDisturbMode({param:param,success:success,error:error})` 

6. 推送初始化（已废弃）：V4.0已废弃，但可继续使用。请使用push.register。
    - `cmApi.push.init(url)` //	消息推送初始化成功后的后台调用url

### 多媒体

拍照完成后，建议调用图片压缩处理，图片压缩可大幅减小照片大小，实现照片快速上传。

视频录制完成后，会调用视频压缩处理，大幅减小视频大小，实现快速上传。压缩时间视设备CPU处理能力。依赖视频处理扩展插件。

1. 拍照
    - `cmApi.photograph(filename,callback)` //V4.0已废弃，但可继续使用。请使用photo.photograph。
    - `cmApi.photo.photograph(filename,callback)` 
2. 录像
    - `cmApi.videorecord(callback)` //V4.0已废弃，不能使用。请使用video.record。
    - `cmApi.video.record(quality,maxTime,minTime,callback)` //quality	int	图像质量等级，0、1、2。int 时长，单位秒

    返回值：

    | 参数名     | 类型   | 描述         |
    |------------|--------|--------------|
    | directory  | String | 视频存放路径 |
    | video      | String | 视频地址     |
    | screenshot | String | 视频缩略图   |
3. 录音
    - `cmApi.audio.record(filename,callback)` 
参数列表：
参数名	类型	描述
filename	String	照片名称
callback		String	回调函数
返回值：
参数名	类型	描述
path	String	录音路径
返回方式：
异步-字符串回调
增加版本：
   V4.0
示例：
`cmApi.audioRecord('demoModule.audioRecordCallback')` 
2.10.3.2.录音（已废弃）
V4.0已废弃，但可继续使用。请使用audio.record。
方法：
`cmApi.audioRecord(callback)` 
参数列表：
参数名	类型	描述
callback		String	回调函数
返回值：
参数名	类型	描述
path	String	录音路径
返回方式：
异步-字符串回调
增加版本：
   V3.0
示例：
`cmApi.audioRecord('demoModule.audioRecordCallback')` 
2.10.4.图片处理
图片压缩可有效减小照片大小，实现照片快速上传。使用后可体积可压缩10倍左右。
2.10.4.1.照片压缩
方法：
`cmApi.image.compress(image,callback)` 
参数列表：
参数名	类型	描述
image	String	照片路径
callback	String	回调函数
返回值：
参数名	类型	描述
imgUrl	String	照片路径
返回方式：
异步-字符串回调
增加版本：
   V4.0
示例：
`cmApi.image.compress('../time.png','module.callback')` 
2.10.4.2.添加文字水印
方法：
`cmApi.image.watermarkText(image,text,position,size,color)` 
参数列表：
参数名	类型	描述
image	String	照片路径
text	String	水印内容
position	String	水印位置：
C：中
T：上
B：下
L：左
R：右
LT：左上
LB：左下
RT：右上
RB：右下
size	String	文字大小
color	String	16进制文字颜色（例：#000000）
返回值：
无
增加版本：
V4.0
示例：
`cmApi.image.watermarkText('../time.png','inspur','C','1.0','#000000')` 
2.10.4.3.添加照片水印
方法：
`cmApi.image.watermaskImage(image,maskImage,position,scale)` 
参数列表：
参数名	类型	描述
image	String	照片路径
maskImage	String	水印照片路径
position	String	水印位置：
C：中
T：上
B：下
L：左
R：右
LT：左上
LB：左下
RT：右上
RB：右下
scale	String	照片比例
返回值：
无
增加版本：
V4.0
示例：
`cmApi.image.watermaskImage('../time.png','../time1.png', 'C',1.0)` 
2.10.4.4.照片等比例压缩（已废弃）
V4.1已废弃，但可继续使用。请使用image.compress。
方法：
`cmApi.image.compressByScale(image, scale)` 
参数列表：
参数名	类型	描述
image	String	照片路径
scale	String	压缩比例
返回值：
无
增加版本：
   V4.0
示例：
`cmApi.image.compressByScale('../time.png',1.0)` 
2.10.4.5.照片按大小压缩（已废弃）
V4.1已废弃，但可继续使用。请使用image.compress。
方法：
`cmApi.image.compressBySize(image,size)` 
参数列表：
参数名	类型	描述
image	String	照片路径
size	String	图片大小（KB）
返回值：
无
增加版本：
   V4.0
示例：
`cmApi.image.compressBySize('../time.png' ,'100.0')` 
2.10.4.6.头像裁剪
方法：
`cmApi.image.headclip(opts)` 
参数列表：
参数名	类型	描述
path	String	图片路径
返回值：
参数名	类型	描述
path	String	图片路径
返回方式：
异步-方法回调
增加版本：
   V4.1.5
示例：
`cmApi.image.headclip('../time.png' ,'100.0')` 
2.10.5.语音播报
依赖音频处理扩展插件。
2.10.5.1.播放
方法：
`cmApi.speech.startSpeak(text,speaker)` 
参数列表：
参数名	类型	描述
text		String	语音播报内容
speaker	String	声音类型：0.男声 1.女声）
返回值：
无
增加版本：
   V4.0
示例：
`cmApi.speech.startSpeak("语音播报","0")` 
2.10.5.2.停止播放
方法：
`cmApi.speech.stopSpeak()` 
参数列表：
无
返回值：
无
增加版本：
V4.0
示例：
`cmApi.speech.stopSpeak()` 
2.10.6.语音识别
依赖音频处理扩展插件。
2.10.6.1.语音识别
方法：
`cmApi.speech.recognize(callback)` 
参数列表：
参数名	类型	描述
callback	String	回调函数
返回值：
参数名	类型	描述
text	String	识别文字
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.speech.recognize("module.callback")` 
2.11.文件操作
2.11.1.文档预览
文件预览是集成腾讯TBS服务，支持主流数十种文件格式直接预览。
方法：
`cmApi.document.preview(filepath)` 
参数列表：
参数名	类型	描述
filepath	String	文件路径
返回值：
无
增加版本：
V4.0
示例：
`cmApi.document.preview(filepath)`
2.11.2.文件上传
方法：
`cmApi.file.uploadFile(opts)` 
参数列表：
参数名	类型	描述
url	String	上传路径
path	String	文件路径
showProgress	Boolean	是否展示进度条，默认展示
showToast	Boolean	上传完成是否提醒，默认提醒
params	JsonObject	请求参数
返回值：
参数名	类型	描述
data	JsonObject或String	返回值如果是JSON格式，则返回JsonObject，否则直接返回String
返回方式：
异步-方法回调
增加版本：
V4.0
示例：
var businessParams = {djnm: "xxxx"};
var params = {url:url,path:path,params:businessParams};
`cmApi.file.uploadFile({params:params,success:success,error:error})`
2.11.3.文件上传（已废弃）
V4.1已废弃，但可继续使用。请使用file.uploadFile。
方法：
`cmApi.file.upload(url,path,params,callback)` 
参数列表：
参数名	类型	描述
url	String	上传路径
path	String	文件路径
params	JsonObject	请求参数
callback	String	回调函数
返回值：
参数名	类型	描述
data	JsonObject或String	返回值如果是JSON格式，则返回JsonObject，否则直接返回String
返回方式：
异步-字符串回调
版本说明：
V3.0
示例：
`cmApi.file.upload(url,path,params,'demoModule.uploadImgCallback')`
2.11.4.文件下载
方法：
`cmApi.file.downloadFile(opts)` 
参数列表：
参数名	类型	描述
url	String	下载路径
path	String	文件路径
showProgress	Boolean	是否展示进度条，默认展示
showToast	Boolean	完成是否提醒，默认提醒
返回值：
参数名	类型	描述
data	JsonObject或String	返回值如果是JSON格式，则返回JsonObject，否则直接返回String
返回方式：
异步-方法回调
增加版本：
   V4.0
示例：
var params = {url:url,path:path };
cmApi.file.downloadFile({params:params,success:success,error:error}
2.11.5.文件下载（已废弃）
V4.1已废弃，但可继续使用。请使用file.downloadFile。
方法：
`cmApi.file.download(url,path,callback)` 
参数列表：
参数名	类型	描述
url	String	下载路径
path	String	文件路径
callback	String	回调函数
返回值：
参数名	类型	描述
data	JsonObject或String	返回值如果是JSON格式，则返回JsonObject，否则直接返回String
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.file.download(url,path,'demoModule.downloadImgCallback')`
2.11.6.文件删除
方法：
`cmApi.file.delete(path)`
参数列表：
参数名	类型	描述
path	String	文件路径
返回值：
无
增加版本：
V4.0
示例：
`cmApi.file.delete(path)` 
2.11.7.文件删除
V4.0已废弃，但可继续使用。请使用file.delete。
方法：
`cmApi.deleteLocalImg(path)`
参数列表：
参数名	类型	描述
path	String	文件路径
返回值：
无
增加版本：
V3.0
示例：
`cmApi.deleteLocalImg(path)` 
2.11.8.文件重命名
方法：
`cmApi.file.rename(opts)` 
参数列表：
参数名	类型	描述
oldPath	String	旧文件路径
newName	String	新文件名
返回值：
参数名	类型	描述
newName	String	新文件名
返回方式：
异步-方法回调
增加版本：
V4.0
示例：
var params = {oldPath:oldPath,newName:newName};
cmApi.file.rename({params:params,success:success,error:error}
2.11.9.文件复制
方法：
`cmApi.file.copy(opts)` 
参数列表：
参数名	类型	描述
oldPath	String	旧文件路径
newPath	String	新文件路径
返回值：
参数名	类型	描述
newPath	String	新文件路径
返回方式：
异步-方法回调
增加版本：
   V4.0
示例：
var params = {oldPath:oldPath,newPath:newPath};
cmApi.file.copy({params:params,success:success,error:error}
2.11.10.新建文件夹
方法：
`cmApi.file.mkdirs(opts)` 
参数列表：
参数名	类型	描述
dirPath	String	新建文件路径
返回值：
参数名	类型	描述
dirPath	String	新建文件路径
返回方式：
异步-方法回调
增加版本：
   V4.0
示例：
var params = {dirPath:dirPath };
cmApi.file.mkdirs({params:params,success:success,error:error}
2.11.11.获取文件MD5值
方法：
`cmApi.file.getMd5(path)` 
参数列表：
参数名	类型	描述
path	String	文件路径
返回值：
参数名	类型	描述
md5	String	文件md5
返回方式：
同步
增加版本：
V4.0
示例：
var md5 = `cmApi.file.getMd5(path)` 
2.12.文件选择器
2.12.1.相册选择器
方法：
`cmApi.filePicker.openImagePicker(opts)` 
参数列表：
参数名	类型	描述
maxCount	int	最大选择数量
返回值：
参数名	类型	描述
data	String	选中文件附件，以;分割
返回方式：
异步-方法回调
增加版本：
V4.0
示例：
var params = {maxCount:maxCount};
cmApi.filePicker.openImagePicker({params:params,success:success,error:error}
2.12.2.视频选择器
方法：
`cmApi.filePicker.openVideoPicker(opts)` 
参数列表：
参数名	类型	描述
maxCount	int	最大选择数量
返回值：
参数名	类型	描述
data	String	选中文件附件，以;分割
返回方式：
异步-方法回调
增加版本：
V4.0
示例：
var params = {maxCount:maxCount};
cmApi.filePicker.openVideoPicker({params:params,success:success,error:error}
2.12.3.音频选择器
方法：
`cmApi.filePicker.openAudioPicker(opts)` 
参数列表：
参数名	类型	描述
maxCount	int	最大选择数量
返回值：
参数名	类型	描述
data	String	选中文件附件，以;分割
返回方式：
异步-方法回调
增加版本：
V4.0
示例：
var params = {maxCount:maxCount};
cmApi.filePicker.openAudioPicker({params:params,success:success,error:error}
2.12.4.文件选择器
方法：
`cmApi.filePicker.openFilePicker(opts)` 
参数列表：
参数名	类型	描述
maxCount	int	最大选择数量
返回值：
参数名	类型	描述
data	String	选中文件附件，以;分割
返回方式：
异步-方法回调
增加版本：
V4.0
示例：
var params = {maxCount:maxCount};
cmApi.filePicker.openFilePicker({params:params,success:success,error:error}

2.13.网络摄像头
即安防摄像头，依赖网络摄像头扩展插件。
2.13.1.视频预览
方法：
`cmApi.webcam.preview(deviceList,title)`
参数列表：
参数名	类型	描述
deviceList		arrayList	视频监控设备列表
title	String	安防监控页面标题
device格式
参数名	类型	描述
id	String	摄像头编号
label	String	摄像头名称
parentId	String	父级
info	JSONObject	摄像头信息
info格式
参数名	类型	描述
userName	String	认证用户名
password	String	认证密码
ip	String	IP地址
port	String	端口号
channel	String	通道号
deviceBrand	String	品牌，大华：DHNET；海康威视：HIKVISION；宇视：UNIVIEW
deviceType	String	类型，枪机：0；球机：1
返回值：
无
增加版本：
V4.0
示例：
 `cmApi.webcam.preview([],' ')` 
2.13.2.视频预览（已废弃）
V4.0已废弃，但可继续使用。请使用video.preview。
方法：
`cmApi.video.show(deviceList,title)` 
参数列表：
参数名	类型	描述
deviceList		JSONArray	视频监控设备列表
title	String	安防监控页面标题
device格式
参数名	类型	描述
id	String	摄像头编号
label	String	摄像头名称
parentId	String	父级
info	JSONObject	摄像头信息
info格式
参数名	类型	描述
userName	String	认证用户名
password	String	认证密码
ip	String	IP地址
port	String	端口号
channel	String	通道号
deviceBrand	String	品牌，大华：DHNET；海康威视：HIKVISION；宇视：UNIVIEW
deviceType	String	类型，枪机：0；球机：1
返回值：
无
增加版本：
V3.0
示例：
`cmApi.video.show([],' ')` 
2.13.3.录像回放
回放硬盘录像机上按时间锁定的录像。
方法：
`cmApi.webcam.playback(label,videoName.ip,port,loginName,password,channel,deviceBrand,deviceType,startTime,endTime)` 
参数列表：
参数名	类型	描述
label		String	摄像头名称
videoName	String	录像名称
ip	String	摄像头IP地址
port	String	摄像头端口号
loginName	String	摄像头登录名称
password	String	摄像头登录密码
channel	String	通道号
deviceBrand	String	摄像头品牌
deviceType	String	摄像头类型
startTime	String	录像开始时间
endTime	String	录像结束时间
返回值：
无
增加版本：
V4.0
示例：
 	`cmApi.webcam.playback(' ', ' ', ' ', ' '……)` 
2.14.手机认证
Android手机使用指纹认证，老苹果手机使用指纹认证，新苹果手机使用人脸认证。
2.14.1.开始认证
方法：
`cmApi.fingerprint.startAuthenticate(callback)` 
参数列表：
参数名	类型	描述
callback		String	回调函数
返回值：
参数名	类型	描述
ret	String	1：认证成功
0：认证失败
2：设备不支持
3：设备未开启指纹认证
4：正在识别
5：失败次数过多
9：未知错误
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.fingerprint.startAuthenticate('demoModule.authenticateCallback')` 
2.14.2.停止认证
方法：
`cmApi.fingerprint.cancelAuthenticate()` 
参数列表：
   无；
返回值：
   无；
增加版本：
   V4.0
示例：
`cmApi.fingerprint.cancelAuthenticate()` 
2.14.3.是否支持认证
方法：
`cmApi.fingerprint.isSupport()` 
参数列表：
无
返回值：
参数名	类型	描述
value	Boolean	是否支持指纹认证
返回方式：
同步
增加版本：
V4.0
示例：
`cmApi.fingerprint.isSupport()` 
2.15.事件监听
移动框架支持多种事件监听，以便业务端灵活使用。支持的事件如下：
事件Key	事件名称	触发时机
network:online	网络重连	网络重新连接时，包括2G/3G/4G、WIFI等
network:offline	网络离线	网络断开时，包括2G/3G/4G、WIFI等
buttondown:back	返回按钮	返回按钮触发时
buttondown:home	Home按钮	Home按钮触发时
2.15.1.增加监听
方法：
`cmApi.eventListener.add(opts)` 
参数列表：
参数名	类型	描述
type	String	监听事件Key
listen	Function	触发方法
返回值：
无
增加版本：
V4.0
示例：
var opt = {type: "buttondown:back",listen:function};
`cmApi.eventListener.add(opts)` 
2.15.2.移除监听
方法：
`cmApi.eventListener.remove(opts)`
参数列表：
参数名	类型	描述
type	String	监听事件Key
listen	Function	触发方法
返回值：
无
增加版本：
V4.0
示例：
var opt = {type: "buttondown:back",listen:function};
`cmApi.eventListener.remove(opts)` 
2.15.3.清空监听
方法：
`cmApi.eventListener.clear(opts)`
参数列表：
参数名	类型	描述
type	String	监听事件Key
返回值：
无
增加版本：
V4.0
示例：
var opt = {type: "buttondown:back"};
`cmApi.eventListener.clear(opts)` 
2.16.手写签名
实现手指在手机上进行姓名签写。
2.16.1.手写签名
方法：
`cmApi.handwrite.start(callback)` 
`cmApi.handwrite.start(filepath,layout,callback)` 
参数列表：
参数名	类型	描述
filepath	String	手写签名图片保存路径，可为空
layout	JSONObject	签名框布局，可为空
callback		String	回调函数
layout格式
参数名	类型	描述
height	int	手写框高度
width	int	手写框宽度
返回值：
参数名	类型	描述
data	JsonObject	返回内容
data格式
参数名	类型	描述
imgUrl	String	手写签名图片保存路径
flag	String	1：成功
0：取消
返回方式：
异步-字符串回调
增加版本：
   V4.0
示例：
    `cmApi.handwrite.start("",null,"lqjcModule.handWriteCallBack")`
2.16.2.手写签名（已废弃）
V4.0已废弃，但可继续使用。请使用handwrite.start。
方法：
`cmApi.startHandWrite(filepath,callback)` 
参数列表：
参数名	类型	描述
filepath	String	手写签名图片保存路径，可为空
callback		String	回调函数
返回值：
参数名	类型	描述
data	JsonObject	返回内容
data格式
参数名	类型	描述
imgUrl	String	手写签名图片保存路径
flag	String	1：成功
0：取消
返回方式：
异步-字符串回调
增加版本：
   V3.0
示例：
    `cmApi.startHandWrite("","lqjcModule.handWriteCallBack")`
2.17.NFC功能
Android机进行一些有关nfc功能的操作。
2.17.1.是否支持nfc
方法：
`cmApi.nfc.isNfcExists()` 
参数列表：
无
返回值：
参数名	类型	描述
value	String	1:支持；0：不支持
返回方式：
同步
增加版本：
   V4.0
示例：
var isNfcExists = `cmApi.nfc.isNfcExists()` 
2.17.2.是否开启nfc
方法：
`cmApi.nfc.isNfcEnabled()` 
参数列表：
无
返回值：
参数名	类型	描述
value	String	1:开启；0：关闭
返回方式：
同步
增加版本：
V3.0
示例：
var isNfcEnabled = `cmApi.nfc.isNfcEnabled()` 
2.17.3.nfc读卡
方法：
`cmApi.nfc.startReadCard(type, callback)` 
参数列表：
参数名	类型	描述
type	String	0：代表移动扦样；
1：代表移动值仓；
callback	String	回调函数
返回值：
参数名	类型	描述
data	JsonObject或String	返回值如果是JSON格式，则返回JsonObject，否则直接返回String
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.nfc.startReadCard('0','ydqyModule.nfcReadCardCallback')`
2.17.4.停止nfc读卡
方法：
`cmApi.nfc.stopReadCard()` 
参数列表：
  	无
返回值：
无
增加版本：
V4.0
示例：
`cmApi.nfc.stopReadCard()` ; 
2.17.5.nfc写卡
方法：
`cmApi.nfc.writeCard(data,callback)` 
参数列表：
参数名	类型	描述
data	String	需要写入的信息
callback	String	回调函数
返回值：
无
增加版本：
V4.0
示例：
`cmApi.nfc.writeCard(writeData,"crkbkModule.writeCardCallback")`
2.17.6.重置nfc卡
方法：
`cmApi.nfc.resetCardInfo()` 
参数列表：
无
返回值：
无
增加版本：
V4.0
示例：
`cmApi.nfc.resetCardInfo()` ; 
2.18.蓝牙打印
使用基于ESC/POS协议，打印当前截屏。
2.18.1.开始打印
方法：
`cmApi.bluetoothPrinter.print(opts)` 
参数列表：
参数名	类型	描述
type	int	蓝牙打印机类型，主流58mm、80mm宽度打印机，默认：58
返回值：
参数名	类型	描述
data	String	返回值
返回方式：
异步-方法回调
增加版本：
V4.0
示例：
`cmApi.bluetoothPrinter.print(opts)` 
2.18.2.设置打印标题、内容、类型（已废弃）
方法：
`cmApi.bluetoothPrinter.setTitle(title)` 
`cmApi.bluetoothPrinter.setInfo(info)` 
`cmApi.bluetoothPrinter.setType(type)` 
参数列表：
参数名	类型	描述
title	String	打印标题
info	String	打印内容
type	String	打印类型：1.文字打印  2.条形码打印
返回值：
无
增加版本：
V3.0
示例：
`cmApi.bluetoothPrinter.setTitle('国家储备粮')` 
`cmApi.bluetoothPrinter.setInfo('小麦 ')` 
`cmApi.bluetoothPrinter.setType('0')` 
2.18.3.开始打印（已废弃）
方法：
`cmApi.bluetoothPrinter.printer()` 
参数列表：
无
返回值：
无
增加版本：
   V3.0
示例：
`cmApi.bluetoothPrinter.printer()` ; 
2.18.4.停止打印（已废弃）
方法：
`cmApi.bluetoothPrinter.destroyBluetooth()`
参数列表：
无
返回值：
无
增加版本：
V3.0
示例：
`cmApi.bluetoothPrinter.destroyBluetooth()` 
2.19.OCR识别
2.19.1.离线车牌号识别
方法：
`cmApi.ocr.carNumberRecognize(callback)`
参数列表：
参数名	类型	描述
callback	String	回调函数
返回值：
参数名	类型	描述
carnumber	String	识别出的车牌号
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.handset.carNumberRecognize('module.callback')` 
2.19.2.在线车牌号识别
调用face++第三方识别API，要求必须可以连通互联网。
方法：
`cmApi.ocr.licenseRecognize(filepath,callback)`
参数列表：
参数名	类型	描述
filepath	String	待识别的图片路径
callback	String	回调函数
返回值：
参数名	类型	描述
carnumber	String	识别出的车牌号
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.handset.licenseRecognize('module.callback')` 
2.19.3.在线身份证识别
调用face++第三方识别API，要求必须可以连通互联网。
方法：
`cmApi.ocr.idCardRecognize(filepath,callback)` 
参数列表：
参数名	类型	描述
filepath	String	待识别的图片路径
callback	String	回调函数
返回值：
参数名	类型	描述
idcard	String	识别出的身份证
返回方式：
异步-字符串回调
增加版本：
   V4.0
示例：
`cmApi.handset.idCardRecognize('module.callback')` 
2.20.第三方功能集成
2.20.1.浏览器返回
提供给第三方使用，使用时不依赖前端环境，可全局调用。
方法：
window.MobileAPI.goBack()
参数列表：
参数名	类型	描述
func	String	触发函数，要求可以全局执行
返回值：
无
增加版本：
V4.1.2
示例：
window.MobileAPI.goBack();
2.20.2.浏览器返回首页
提供给第三方使用，使用时不依赖前端环境，可全局调用。
方法：
window.MobileAPI.goHome()
参数列表：
	无
返回值：
无
增加版本：
V4.1.2
示例：
window.MobileAPI.goHome();
2.20.3.注册返回函数
方法：
`cmApi.thirdParty.setGoBackFunc(func)` 
参数列表：
参数名	类型	描述
func	String	触发函数，要求可以全局执行
返回值：
无
增加版本：
V4.1.2
示例：
`cmApi.thirdParty.setGoBackFunc(func)`
2.20.4.移除返回函数
方法：
`cmApi.thirdParty.removeGoBackFunc()`
参数列表：
	无
返回值：
无
增加版本：
V4.1.2
示例：
`cmApi.thirdParty.removeGoBackFunc()`
2.21.成为手持机
成为手持机专用发放，其他手机不支持。
2.21.1.身份证识别
方法：
`cmApi.handset.readIdCard(callback)` 
参数列表：
参数名	类型	描述
callback	String	回调函数
返回值：
参数名	类型	描述
data	JsonObject	
data格式
参数名	类型	描述
name	String	姓名
sex	String	性别
ethnicity	String	民族
birth	String	出生日期
address	String	住址
cardNo	String	身份证号
authority	String	签发机关
period	String	有效期
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.handset.readIdCard('module.callback')` 
2.21.2.身份证识别关闭
方法：
`cmApi.handset.closeIdCard()` 
参数列表：
无
返回值：
无
增加版本：
V4.0
示例：
`cmApi.handset.closeIdCard()` 
2.21.3.打印
打印当前截屏。
方法：
`cmApi.handset.print()` 
参数列表：
无
返回值：
无
增加版本：
V4.0
示例：
`cmApi.handset.print()` 
2.21.4.二维码扫描
方法：
`cmApi.handset.scanBarCode(callback)` 
参数列表：
参数名	类型	描述
callback	String	回调函数
返回值：
参数名	类型	描述
data	String	识别内容
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.handset.scanBarCode('module.callback')` 
2.21.5.开启二维码扫描按键
方法：
`cmApi.handset.scanBarCodeBindKey(keycode，callback)`
参数列表：
参数名	类型	描述
keycode	String	按键
callback	String	回调函数
返回值：
参数名	类型	描述
data	String	识别内容
返回方式：
异步-字符串回调
增加版本：
V4.0
示例：
`cmApi.handset.scanBarCodeBindKey(''，'module.callback')` 
2.21.6.关闭二维码扫描按键
方法：
`cmApi.handset.scanBarCodeUnBindKey()` 
参数列表：
无
返回值：
无
增加版本：
V4.0
示例：
`cmApi.handset.scanBarCodeUnBindKey()` 