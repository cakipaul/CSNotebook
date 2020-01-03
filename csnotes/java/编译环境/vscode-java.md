# Windows系统中在VSCode上部署JAVA环境

## 创建完整Java环境
1. 安装`Java SE Development Kit (JDK)` version 8-11 皆可。（2019.1）
    - [Oracle-JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
    - [RedHat-JDK](https://developers.redhat.com/products/openjdk/download/?sc_cid=701f2000000RWTnAAO)
2. 安装 Apache Maven version 3 或更高版本：
    - [Apache Maven](https://maven.apache.org/download.cgi)
3. 配置环境变量： 
    - JAVA_HOME 和 JDK_HOME: `echo %JAVA_HOME% C:\Program Files\Java\jdk1.7.0_51` ;
    - PATH: apache-maven 的 bin 文件夹;
    - 验证安装：在 bash 中输入 `mvn -v`，若出现maven与java的版本与路径等信息，则安装成功。
4. 在VSCode上安装插件(`Ctrl + Shift + X`)：
    1. Language Support for Java(TM) by Red Hat
    2. Debugger for Java
    3. Java Test Runner
    4. Maven for Java
    5. Java Dependency Viewer
    > 注：其中的前两个是必须安装的
5. 配置workspace:
    - `Ctrl + Shift + P` 输入 `workspace` ，选择 `Open Workspace Configuration File` 并进行编辑：
    ```json
    	"folders": [
		{
			"path": "D:\\vscode_workspace",
		}
	],
    ```
6. 配置 `java.home`：
    - `Ctrl + ,` 打开Settings，输入 `java.home` 并查找，选择“Edit in settings.json”,分别在 `WORKSPACE SETTINGS` 与 `USER SETTINGS` 的json文件的settings部分添加 `	"java.home": "D:\\java-1.8.0-openjdk-1.8.0.191-1.b12.redhat.windows.x86_64",` （JAVA_HOME的路径）。注意上一条json信息末尾需要添加逗号，文件夹分隔符需要使用两条反斜线：`\\`。
7. 配置 `lanuch.json`：
    - 打开json文件：`Ctrl + Shift + P` 后输入命令：`Debug:Open launch.json`
    - 编辑 `"configurations"` 信息(输入java后选择“java:launch program”后会自动生成默认配置信息)：
    ```json
        "configurations": [
        {
            "type": "java",
            "name": "Debug (Launch) with Arguments Prompt",
            "request": "launch",
            "cwd": "${workspaceFloder}",
            "console": "internalConsole",
            "stopOnEntry": false,
            <!-- 主 工程/类 名 -->
            "projectName": "Test",
            "mainClass": "Test",
            "args": ""
        },
    ]
    ```

## Debug
1. Launch VS Code
2. Open a Java project (Maven/Gradle/Eclipse)
3. Open a Java file to activate the extensions
4. Add debug configurations and edit launch.json
5. To launch: specify mainClass
6. To attach: specify hostName and port
7. Press F5

## 参考
[Language support for Java ™ for Visual Studio Code](https://github.com/gorkem/vscode-java#setting-the-jdk)