# Android 活动(Activity)

- [参考资源](https://www.runoob.com/android/android-acitivities.html)

活动代表了一个具有用户界面的单一屏幕，如 Java 的窗口或者帧。Android 的活动是 ContextThemeWrapper 类的子类。

如果你曾经用 C,C++ 或者 Java 语言编程，你应该知道这些程序从 main() 函数开始。很类似的，Android 系统初始化它的程序是通过活动中的 onCreate() 回调的调用开始的。存在有一序列的回调方法来启动一个活动，同时有一序列的方法来关闭活动，如下面的活动声明周期图所示：

![activity.jpg](media/activity.jpg)

Activity 类定义了下面的回调。你可以不用实现所有的回调方法。但了解其中的每一个非常的重要，实现这些可以保证你的应用行为如用户所期望的那样。

回调	|描述
---|---
onCreate()	 |这是第一个回调，在活动第一次创建时调用
onStart()	|这个回调在活动为用户可见时被调用
onResume()|	这个回调在应用程序与用户开始可交互的时候调用
onPause()	|被暂停的活动无法接受用户输入，不能执行任何代码。当前活动将要被暂停，上一个活动将要被恢复时调用
onStop()	|当活动不在可见时调用
onDestroy()	|当活动被系统销毁之前调用
onRestart()	|当活动被停止以后重新打开时调用

## 实例

这个实例通过简单地步骤展示 Android 应用程序活动的生命周期。按照下面的步骤来修改我们在 Hello World 实例章节中创建的 Android 应用程序。

1. 使用eclipse IDE来创建一个Android应用程序，并命名为HelloWorld放在com.example.helloworld包下。如之前Hello World Example章节中介绍。
2. 按照下面修改主要活动文件MainActivity.java。保持其他部分不变。
3. 运行应用程序来打开Android模拟器，并检查应用程序的修改结果。
下面是主要活动文件src/com.example.helloworld/MainActivity.java修改的内容。里面包含每一个基本的生命周期方法。Log.d()方法用来生成日志信息：

```java
package com.example.helloworld;

import android.os.Bundle;
import android.app.Activity;
import android.util.Log;

public class MainActivity extends Activity {
   String msg = "Android : ";

   /** 当活动第一次被创建时调用 */
   @Override
   public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      Log.d(msg, "The onCreate() event");
   }

   /** 当活动即将可见时调用 */
   @Override
   protected void onStart() {
      super.onStart();
      Log.d(msg, "The onStart() event");
   }

   /** 当活动可见时调用 */
   @Override
   protected void onResume() {
      super.onResume();
      Log.d(msg, "The onResume() event");
   }

   /** 当其他活动获得焦点时调用 */
   @Override
   protected void onPause() {
      super.onPause();
      Log.d(msg, "The onPause() event");
   }

   /** 当活动不再可见时调用 */
   @Override
   protected void onStop() {
      super.onStop();
      Log.d(msg, "The onStop() event");
   }

   /** 当活动将被销毁时调用 */
   @Override
   public void onDestroy() {
      super.onDestroy();
      Log.d(msg, "The onDestroy() event");
   }
}
```

活动类从项目的res/layout中的XML文件加载所有的UI组件。下面的语句从res/layout/activity_main.xml文件中加载UI组件：

`setContentView(R.layout.activity_main);`

一个应用程序可以有1个或多个活动，而没有任何限制。每个为应用程序所定义的活动都需要在AndroidManifest.xml中声明。应用的主要活动需要在清单中声明，且意图过滤器标签中需要包含 MAIN 动作和 LAUNCHER 类别。如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
   package="com.example.helloworld"
   android:versionCode="1"
   android:versionName="1.0" >

   <uses-sdk
      android:minSdkVersion="8"
      android:targetSdkVersion="22" />

   <application
       android:icon="@drawable/ic_launcher"
       android:label="@string/app_name"
       android:theme="@style/AppTheme" >

       <activity
          android:name=".MainActivity"
          android:label="@string/title_activity_main" >

          <intent-filter>
             <action android:name="android.intent.action.MAIN" />
             <category android:name="android.intent.category.LAUNCHER"/>
          </intent-filter>

       </activity>

   </application>
</manifest>
```

不论是 MAIN 动作还是 LAUNCHER 类别没有在活动中声明，那么应用程序的图标将不会出现在主屏幕的应用列表中。

让我们运行起刚刚修改的 "Hellow World!" 应用程序。假设你在环境搭建的时候已经创建了 AVD 。从 Eclipse 运行应用，打开一个项目中的活动文件，并从工具栏点击运行图片图标。Eclipse在AVD上安装应用并启动它。如果一切顺利，将显示模拟器屏幕如下，同时你可以在Eclipse IDE的LogCat窗口中看到日志信息：

```
07-19 15:00:43.405: D/Android :(866): The onCreate() event
07-19 15:00:43.405: D/Android :(866): The onStart() event
07-19 15:00:43.415: D/Android :(866): The onResume() event
```

让我们点击 Android 模拟器上的红色按钮图片，它将在Eclipse IDE的LogCat窗口中产生如下的事件消息：

```
07-19 15:01:10.995: D/Android :(866): The onPause() event
07-19 15:01:12.705: D/Android :(866): The onStop() event
```

让我们再次点击 Android 模拟器上的菜单按钮图片，它将在 Eclipse IDE 的 LogCat 窗口中产生如下的事件消息：

```
07-19 15:01:13.995: D/Android :(866): The onStart() event
07-19 15:01:14.705: D/Android :(866): The onResume() event
```

接下来，让我们点击Android模拟器上的返回按钮图片，它将在Eclipse IDE的LogCat窗口中产生如下的事件消息，Android 应用程序上活动的整个生命周期完成。

```
07-19 15:33:15.687: D/Android :(992): The onPause() event
07-19 15:33:15.525: D/Android :(992): The onStop() event
07-19 15:33:15.525: D/Android :(992): The onDestroy() event
```
