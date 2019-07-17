# 楼7框架功能研发规范

## 开发模式

Loushang2017架构模式推荐四层：view + controller + service + dao。对于业务逻辑较为简单的，可以使用view + controller + dao的层次架构。后台对象的定义及调用，提倡使用spring注解符的方式实现，可以有效的减少代码书写量，提高开发效率，以下针对各层进行详细介绍。

### 展现层

Loushang2017框架中展现层主要基于各种WEB组件，WEB组件的开发主要基于bootstrap+jquery技术，从样式到功能都进行了符合框架规范的设计与实现，以方便用户的开发使用，以下针对框架中部分重要组件的功能与使用进行介绍。

- [UE组件官网](http://ue.inspur.com/)
- Flexgrid

#### L.FlexGrid

L.FlexGrid 是以datatables为原型，是一个高度灵活的工具，具有丰富多样的option、强大的API、对前后端分页和各种不同数据数据源的支持可以满足用户的各种需求。同时，在保留原有功能的基础上，为了减少用户的前端配置、与框架后端数据的适配，对其进行封装。

L.FlexGrid所需配置的dom属性、options及方法如下：

##### L.FlexGrid dom属性

名称|说明
--|--
width|必设项，设置列宽
data-field|必设项，列所对应的属性名，以在该列显示属性的值
data-sortable|可设项，设置本列是否起用排序功能
data-render|可设项，自定义渲染列。包括三种类型的值：“checkbox”、“radio”、“函数名”

##### L.FlexGrid options

名称|类型|默认值|功能
--|--|--|--
paging|boolean|true|是否开启分页功能
ordering|boolean|true|是否开启排序功能
order|arra|[]|设置默认的排序列，可为多列，如：[[0, 'asc'], [ 1, 'asc' ]]
serverSide|boolean|true|是否开启服务器端模式
autoWidth|boolean|false|是否开启列宽度自适应功能
info|boolean|true|是否显示左下角记录数信息
scrollX|boolean|true|是否显示水平滚动条
scrollY|string|""|设置表格的高度，超过所设置高度则出现垂直滚动条
btnDefs|array或function||自定义每行的操作按钮
drawCallback|function||表格重绘时调用
initComplete|function||表格初始化完成后调用
rowCallback|function||表格每行初始化时调用
createRow|function||表格行被创建时调用

##### L.FlexGrid 方法

名称|参数|功能
--|--|--
L.FlexGrid|listId: 列表Id； url: 初始化表格路径|实例化表格对象
init|options:表格options的配置对象|初始化表格，并返回表格对象
reload|url: 重载所需的路径 params: 重载所需的参数|重载表格，并返回表格对象
setParameter|key: 参数名称；value: 参数值|设置表格加载数据时需要向后台传的参数

##### L.FlexGrid 使用步骤及方法

(1) 除了框架公共的css、js文件外，FlexGrid组件需要引入的css、js文件如下：

```html
<!--CSS文件-->
datatables.css

<!--JS文件-->
datatables.js、loushang-framework.js
```

(2) 定义表头表格，并在每个表头列上配置相应的列信息属性：width，data-field，data-sortable，data-render。如下代码：

```html
<!--表格结构的定义-->
<table id="userList" class="table table-bordered table-hover">
    <thead>
    <tr>
        <th width="10%" data-field="userId" data-sortable= "false" data-render="rendercheckbox">
        </th>
        <th width="15%" data-field="userId" data-sortable="false">账号</th>
        <th width="25%" data-field="userName">姓名</th>
        <th width="25%" data-field="nickname">昵称</th>
        <th width="25%" data-field="status" data-render="renderstatus">账号状态</th>
    </tr>
    </thead>
</table>
<!--自定义列-->
function renderstatus(data,type,full){
    if(data != "" || data != null)
        {
          if(data == "N"){
              data = "启用";
          }
          if(data == "X"){
              data = "停用";
          }
        }
    return data;
}
```

(3) 定义表格对象并初始化表格，定义表格对象时需要传入表格的id及请求数据的url两个参数，代码如下：

```html
var options = {
<!--所需的option-->
};
var url = context+"/service/framework/demo/user/data";
grid = new L.FlexGrid("userList",url);
grid.init(options); //初始化
```

#### L.EditGrid

EditGrid是一个基于jQuery开发的可编辑的Grid,它以Slickgrid可编辑表格插件为原型进行封装，具有的功能主要包括：增加行、删除行、获取行数据、获取变动行数据，编辑框上前提供日期、输入框、下拉框、复选框编辑。

L.EditGrid所需配置的dom属性、options及方法如下：

##### L.EditGrid dom属性

名称|说明
--|--
width|必设项，设置列宽
data-field|必设项，列所对应的属性名，以在该列显示属性的值
data-sortable|可设项，设置本列是否起用排序功能
data-render|可设项，自定义渲染列。包括三种类型的值：“checkbox”、“radio”、“函数名”
data-editor|可设项，渲染列的可编辑形式。包括三种类型的值：可编辑文本框“text”、下拉框“select”、日期框“date”
data-source|可设项，当data-editor的值为“select”时，该属性必须设置，值为自定义的函数名，函数返回值为数组对象。
data-validator|可设项，列校验

##### L.EditGrid options

名称|类型|默认值|功能
--|--|--|--
paging|boolean|true|是否开启分页功能
info|boolean|true|是否显示左下角记录数信息
lengthMenu|[]|[10, 25, 50, 100 ]|自定义每页条数下拉框的值
editable|boolean|true|表格是否开启可编辑功能
autoEdit|boolean|true|true 单元格被单击时进入编辑模式；false 单元格被双击时进入编辑模式；
selectActiveRow|boolean|false|点击行时是否将其选中
defaultColumnWidth||200|设置默认的列宽
multiSelect|boolean|true|是否允许多选行；true:多选（Ctrl+左键单击行）；false: 单选
enableTextSelectionOnCells|boolean|true|功能同editable
forceFitColumns|boolean|true|在不合适的容器中是否开启强制自适应列宽并阻止水平滚动条出现

##### L.EditGrid 方法

名称|参数|功能
--|--|--
L.EditGrid|listId: 列表Id； url: 初始化表格路径|实例化表格对象
init|options:表格options的配置对象|初始化表格，并返回表格对象
reload|url: 重载所需的路径 params: 重载所需的参数|重载表格，并返回表格对象
setParameter|key: 参数名称；value: 参数值|设置表格加载数据时需要向后台传的参数
addRow|{}|增加行
deleteRow||删除行
getChangedData||获取变动行的数据
getSelectedDataItems||获取选中行的数据

##### L.EditGrid使用步骤及方法

(1) 除了框架公共的css、js文件外，FlexGrid组件需要引入的css、js文件如下：

```html
<!--CSS文件-->
slickgrid.css

<!--JS文件-->
slickgrid.js、loushang-framework.js
```

(2) 定义表头表格，并在每个表头列上配置相应的列信息属性，如下代码：

```html
<!--表格结构的定义-->
<table id="productList">
 <thead>
    <tr>
       <th width="10%" data-field="id" data-render="checkbox"></th>
       <th width="15%" data-field="id" data-sortable="true">id</th>
       <th width="15%" data-field="product_code" data-editor="text">商品编号</th>
       <th width="15%" data-field="product_name" data-sortable="true" data-editor="text">商品名称</th>
       <th width="15%" data-field="product_type" data-editor="select" data-source="getTypeSelectVal" data-render="renderstatus">商品类别</th>
       <th width="15%" data-field="product_num" data-editor="text" >商品数量</th>
       <th width="15%" data-field="product_date" data-editor="monthDate">生产日期</th>
     </tr>
 </thead>
</table>

<!-- 渲染列值 -->
function renderstatus(row, cell, value, columnDef, dataContext){
    if(value == "0")
        return "食品";
    if(value == "1")
        return "水果";
    if(value == "2")
        return "器材";
    return value;
}

<!-- 获取类别下拉框选项值 -->
function getTypeSelectVal() {
    var arr = [];
    arr.push({
        key: 0,
        value: "食品"
    });
    arr.push({
        key: 1,
        value: "水果"
    });
    arr.push({
        key: 1,
        value: "器材"
    });
    return arr;
}

<!-- 操作按钮 -->
function operationBtn(row, cell, value, columnDef, dataContext) {
    var delBtn = "<a href=\"javascript:del('"+value+"')\">删除</a>";
    return delBtn;
}
```
  
(3) 定义表格对象并初始化表格，定义表格对象时需要传入表格的id及请求数据的url两个参数，代码如下：

```html
<!--表格选项的设置-->
var options={};
var url = context+"/service/framework/demo/product/data";
grid = new L.EditGrid("productList", url);
grid.init(options);     // 初始化EditGrid
```

### 控制层

框架使用springMVC ，控制层指其中的C，主要负责请求处理及页面跳转。在代码书写时，可以使用spring注解方式的地方，建议使用注解的方式。 框架规定将相关的spring扫描路径配置文件放在WEB-INF/spring/controller目录下，每个模块独立为一个文件。框架会拦截所有含“/service/*”的服务请求，再根据service后具体的请求路径选择将请求发送给哪个控制器即控制层进行处理。框架支持两种服务请求：页面请求&数据请求

#### 页面服务请求

```js
function modify(data){
    var url = context + "/service/framework/demo/user/edit";
    window.location.href = url;
}
@RequestMapping("/edit")
public ModelAndView editPage(){
    ModelAndView mv = new ModelAndView();
    ······
    mv.setViewName("framework/demo/user/userdetail");
    return mv;   //后端 页面跳转
}
```

#### 数据请求服务

```js
$.ajax({
   url: context + "/service/framework/demo/user/data",
   type: "POST",
   contentType: "application/json",
   dataType: "json",
   data: json,
   success: function(data){
   },
   error: function(data){
   }
});
@RequestMapping("data")
@ResponseBody
public Map getData(@RequestBody Map<String,Object> map){
    ······
    return userdata;
}
```

### 服务层

框架中服务层指service层，用于业务逻辑处理，事务控制在该层实现，以下是对事务的两种引入方式进行介绍。

#### 注解方式引入事务

```java
@Service("userService")  
@Transactional("mybatisTransactionManager") //对类中所有方法增加事务

public class UserServiceImpl implements IUserService {
}

@Transactional("mybatisTransactionManager")  //只对该方法增加事务
public void delete(String[] ids){
    //删除用户档案信息
    archiveMapper.batchDelete(ids);
    //删除用户信息
    userMapper.batchDelete(ids);
}
```

#### 编程式引入事务

```java
private PlatformTransactionManager tm;
private DefaultTransactionDefinition df;

public void save(User user) {
    TransactionStatus ts = tm.getTransaction(df);
    try {
        //业务逻辑
    }catch(Exception e){
        tm.rollback(ts);
    }
    tm.commit(ts);
}
```

### 持久层

>*注意：不允许跨层使用*

框架持久层使用mybatis持久化框架，mybatis持久框架作为一种轻量级框架非常易于学习使用，而且对动态sql支持受到越来越多开发者的青睐。mybatis与spring结合提高了框架的灵活性及可用性，框架也对单表的CRUD通用接口进行了封装：

类别|方法|说明
--|--|--
查询|T get(Object key)|根据主键字段进行查询
查询|List\<T\>getAll()|查询全部记录
查询|List\<T\>query(Map map)|查询记录，支持分页
查询|int getTotalCount()|获取记录总数
插入|int insert(T record)|插入单条记录
插入|int batchInsert(List\<T\>list)|批量插入记录
修改|int update(T record)|修改单条记录
修改|int batchUpdate(List\<T\>list)|批量修改记录
删除|int delete(T record)|删除单条记录
删除|int batchDelete(List\<T\>list)|批量删除记录

## 部署过程

1. 下载 zip 文件
2. 导入 loushang 工程到 eclipse（Select archive file）
3. 通过修改src/resources/datasource.properties文件进行数据源配置：打开符合自己本地数据库类型的数据源配置，修改配置项为需要使用的数据库参数（Loushang不提供数据库的驱动jar包，需要导入对应的数据库驱动jar包）
4. 通过修改src\resources\log4j.properties文件可以进行日志配置，配置文件中第一行的LOG_DIR属性用来设置日志的输出路径。
5. 添加jbossServer，并将jar包build path至工程。
