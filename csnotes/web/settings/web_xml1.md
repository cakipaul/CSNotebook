# 中间件 WEB.XML 配置

参考：

- [web.xml配置详解-传智播客](http://www.itcast.cn/news/20160426/16332360062.shtml)

## Tomcat web.xml 配置

### 简介

每一个 web 应用最终是被发布到 Tomcat 的 webapps 目录下，Tomcat 是它们的运行环境。可以理解为 Tomcat 的 web.xml 文件是每一个 web 应用的 web.xml 的父文件，Tomca 将每个应用的公共配置提取出来放在 conf 目录下的 web.xml 中，每个应用的个性配置放在自己的 web.xml 文件中。

### 示例分析

下面我们结合web.xml文件的内容，来分析它的配置的作用：

```xml
... ...
<servlet>
    <servlet-name>default</servlet-name>
    <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>         
    <init-param>
        <param-name>debug</param-name>
        <param-value>0</param-value>
    </init-param>
    <init-param>
        <param-name>listings</param-name>
        <param-value>false</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet>
    <servlet-name>jsp</servlet-name> 
    <servlet-class>org.apache.jasper.servlet.JspServlet</servlet-class>
    <init-param>
        <param-name>fork</param-name>
        <param-value>false</param-value>
    </init-param>
    <init-param>
        <param-name>xpoweredBy</param-name>
        <param-value>false</param-value>
    </init-param>
    <load-on-startup>3</load-on-startup>
</servlet>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>jsp</servlet-name>
        <url-pattern>*.jsp</url-pattern> 
       <url-pattern>*.jspx</url-pattern>
    </servlet-mapping>
    <session-config>
        <session-timeout>30</session-timeout>
    </session-config>
    <!-- 这里省略了大概4000多行的MIME类型的定义,只给出两种MIME类型的定义 -->
    <mime-mapping>
        <extension>bmp</extension>
        <mime-type>image/bmp</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>htm</extension>
        <mime-type>text/html</mime-type>
    </mime-mapping>
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>
```

对以上内容进行分析，如下：

1. <servlet-name>default</servlet-name>

    对应一个类名为DefaultServlet的Servlet，我们看这个servlet对应的<servlet-mapping>中的映射路径是“/”，匹配所有路径。优先级最低，当用户访问的url没有匹配的Servlet或页面时，访问DefaultServlet ，它会响应给客户端一个404状态码。
2. <servlet-name>jsp</servlet –name>

    对应一个类名为JspServlet的Servlet，该Servlet的映射路径是“*.jsp”、“*.jspx”。即当用户请求的资源是一个jsp页面等时，访问的是JspServlet.我们知道浏览器不能显示动态资源，因此JspServlet的作用就是将当前访问的jsp页面转换成静态的html页面，然后再响应给浏览器。
3. <session-timeout>30<session-timeout>

    该标签是设置session的存活时间为30分钟，session是一个会话，后面我们会学习它。
4. <mime-mapping><extension>htm</extension><mime-type>text/html</mime-type></mime-mapping>

    其中<extension>标签的内容指的是响应文件的后缀名，通过后缀名进而知道它的mime类型，即<mime-type>标签的内容。这是服务器告诉浏览器响应回去的响应内容的mime类型。
5. <welcome-file-list>

    该标签的子标签中的内容对应的是欢迎页。在应用的web.xml中如果没有对<welcome-file-list>进行覆盖，那么默认主页为index.html、index.html、index.jsp。
