# 移动框架跳转逻辑

## 概述

1. 前端调用 cmApi 接口中的方法；
2. cmApi 中的方法调用对应插件的对应类中的方法；
3. 执行成功后返回，调用回调。

### cmApi

#### 代码结构

在 `igmcloudlib` 中查看 `mobile/js/cbhycpMobile/cbhycpMobile.js` 文件：

```js
(function() {
    "use strict";
    window.IntelligentGrainMobileApi = function() {
        //此处省略上千行代码....
    }
})();

var cmApi = new IntelligentGrainMobileApi();
```

#### 调用其他插件

```js
        //指纹识别
        var Fingerprint = function() {
            var fingerprint = this;
            // 开始认证
            fingerprint.startAuthenticate = function(callback) {
                var param = {
                    callback: callback
                };
                api.invoke("FingerprintService", "startAuthenticate", param);
            }

            fingerprint.cancelAuthenticate = function() {
                return api.invoke("FingerprintService", "cancelAuthenticate");
            }

            fingerprint.isSupport = function() {
                return api.invoke("FingerprintService", "isSupport");
            }
        };
        api.fingerprint = new Fingerprint();
```

#### 核心反射机制

```js
 var api = this;
        api.version = '4.0';
        var mobileType = navigator.userAgent;
        var currentModule = null;
        api.invoke = function(plugin, method, param) {
            var params = {
                className: plugin,
                methodName: method,
                param: param
            };
            if (mobileType.indexOf('iPhone') > -1) {
                return window.prompt(JSON.stringify(params), 'invoke');
            }
            return window.MobileAPI.invoke(JSON.stringify(params));
        }

        api.invokeV4 = function(plugin, method, param, success, error) {
            var callbackId = plugin + igm.callbackId++;
            param.callbackId = callbackId;
            var params = {
                className: plugin,
                methodName: method,
                callbackId: callbackId,
                param: param
            };
            if (success || error) {
                igm.callbacks[callbackId] = {
                    success: success,
                    error: error
                };
            }

            if (mobileType.indexOf('iPhone') > -1) {
                return window.prompt(JSON.stringify(params), 'invoke');
            }
            return window.MobileAPI.invoke(JSON.stringify(params));
        }
```

## 其他

### 打包与使用

- 上传 arr 至 maven 库：`uploadArchives`
- 在工程中使用它（参数是防止项目使用本地缓存的旧依赖，若第一试用则不必添加）：`build --refresh-dependencies`
