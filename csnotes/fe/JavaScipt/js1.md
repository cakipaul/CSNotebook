# JavaScript 入门教程 1

参考：[W3School-JS](https://www.w3school.com.cn/js/)

## 使用 JS

### \<script\> 标签

在 HTML 中，JavaScript 代码必须位于 \<script\> 与 \</script\> 标签之间。实例：

```js
<script>
document.getElementById("demo").innerHTML = "我的第一段 JavaScript";
</script>
```

### JavaScript 函数和事件

JavaScript 函数是一种 JavaScript 代码块，它可以在调用时被执行。

例如，当发生事件时调用函数，比如当用户点击按钮时。

### \<head\> 或 \<body\> 中的 JavaScript

您能够在 HTML 文档中放置任意数量的脚本。

脚本可被放置与 HTML 页面的 \<body\> 或 \<head\> 部分中，或兼而有之。

### 外部脚本

脚本可放置与外部文件中：
外部文件：`myScript.js`

```js
function myFunction() {
   document.getElementById("demo").innerHTML = "段落被更改。";
}
```

外部脚本很实用，如果相同的脚本被用于许多不同的网页。

JavaScript 文件的文件扩展名是 `.js` 。

如需使用外部脚本，请在 \<script\> 标签的 src (source) 属性中设置脚本的名称：

```js
<script src="myScript.js"></script>
```

在外部文件中放置脚本有如下优势：

- 分离了 HTML 和代码
- 使 HTML 和 JavaScript 更易于阅读和维护
- 已缓存的 JavaScript 文件可加速页面加载

如需向一张页面添加多个脚本文件 - 请使用多个 script 标签：

```js
<script src="myScript1.js"></script>
<script src="myScript2.js"></script>
```

### 外部引用

可通过完整的 URL 或相对于当前网页的路径引用外部脚本：

本例使用完整的 URL 来链接至脚本：

```js
<script src="https://www.w3school.com.cn/js/myScript1.js"></script>
```

## JS 输出

JavaScript 能够以不同方式“显示”数据：

- 使用 window.alert() 写入警告框
  - 使用 alert() 亦可
- 使用 document.write() 写入 HTML 输出
  - 注意：在 HTML 文档完全加载后使用 document.write() 将删除所有已有的 HTML
  - 提示：document.write() 方法仅用于测试
- 使用 innerHTML 写入 HTML 元素
  - 如需访问 HTML 元素，JavaScript 可使用 document.getElementById(id) 方法
  - 提示：更改 HTML 元素的 innerHTML 属性是在 HTML 中显示数据的常用方法
- 使用 console.log() 写入浏览器控制台
  - 通过 F12 来激活浏览器控制台，并在菜单中选择“控制台”

## JavaScript 语句

在 HTML 中，JavaScript 语句是由 web 浏览器“执行”的“指令”。所有 JavaScript 标识符对**大小写敏感**，使用 Unicode 字符集。

JavaScript 语句由以下构成：

- 值、运算符、表达式
- 关键词：用于标识被执行的动作
- 注释：双斜杠 // 或 /* 与 */ 之间的代码被视为注释
- 分号分隔 JavaScript 语句；如果有分号分隔，允许在同一行写多条语句
- 提示：以分号结束语句不是必需的，但我们仍然强烈您这么做
- JavaScript 会忽略多个空格。您可以向脚本添加空格，以增强可读性
- 为了达到最佳的可读性，程序员们常常喜欢把代码行控制在 80 个字符以内。如果 JavaScript 语句太长，对其进行折行的最佳位置是某个运算符之后
- JavaScript 语句可以用花括号（{...}）组合在代码块中。代码块的作用是定义一同执行的语句

### JS 常见关键字

关键词|描述
--|--
break|终止 switch 或循环。
continue|跳出循环并在顶端开始。
debugger|停止执行 JavaScript，并调用调试函数（如果可用）。
do ... while|执行语句块，并在条件为真时重复代码块。
for|标记需被执行的语句块，只要条件为真。
function|声明函数。
if ... else|标记需被执行的语句块，根据某个条件。
return|退出函数。
switch|标记需被执行的语句块，根据不同的情况。
try ... catch|对语句块实现错误处理。
var|声明变量。

### JavaScript 语法

#### JavaScript 值

JavaScript 语句定义两种类型的值：混合值和变量值。

混合值被称为字面量（literal）。变量值被称为变量。

书写混合值最重要的规则是：

- 写数值有无小数点均可：15.90  10011
- 字符串是文本，由双引号或单引号包围："Bill Gates"  'Bill Gates'

#### JavaScript 变量、运算符、表达式

在编程语言中，变量用于存储数据值。JavaScript 使用 var 关键词来声明变量。= 号用于为变量赋值。所有 JavaScript 变量必须是**唯一的名称的标识符**。可以在一条语句中声明许多变量：

```js
var person = "Bill Gates", carName = "porsche",
price = 15000;//声明可横跨多行
```

在计算机程序中，被声明的变量经常是不带值的。值可以是需被计算的内容，或是之后被提供的数据，比如数据输入。不带有值的变量，它的值将是 undefined。

如果再次声明某个 JavaScript 变量，将不会丢它的值。在这两条语句执行后，变量 carName 的值仍然是 "porsche"：

```js
var carName = "porsche";
var carName;
```

JavaScript 使用算数运算符 `+ - * /` 来计算值。在算术运算中，数被称为操作数。

表达式是值、变量和运算符的组合，计算结果是值。

#### JavaScript 标识符

标识符是名称。在 JavaScript 中，标识符用于命名变量（以及关键词、函数和标签）。在大多数编程语言中，合法名称的规则大多相同。

在 JavaScript 中，首字符必须是字母、下划线（-）或美元符号（$）。连串的字符可以是字母、数字、下划线或美元符号。

>提示：数值不可以作为首字符。这样，JavaScript 就能轻松区分标识符和数值。另外， JavaScript 中不能使用连字符做变量名。它是为减法预留的。

#### JS 运算符

类型|运算符|描述
--|--|--
比较运算符|==|等于
比较运算符|===|等值等型
比较运算符|!=不相等
比较运算符|!==不等值或不等型
比较运算符|?|三元运算符
逻辑运算符|&&|逻辑与
逻辑运算符|\|\||逻辑或
逻辑运算符|!|逻辑非
类型运算符|typeof|返回变量的类型。
类型运算符|instanceof|如果对象是对象类型的实例,返回 true
位运算符|&|与
位运算符|\|或
位运算符|~|非
位运算符|^|异或
位运算符|<<|零填充左位移
位运算符|>>|有符号右位移
位运算符|>>>|零填充右位移
算数运算符|\*\*|幂（ES2016）

### JavaScript 数据类型

JavaScript 变量能够保存多种数据类型：数值、字符串值、数组、对象等等。

#### JS number、string、boolean

JavaScript 只有一种数值类型,写数值时用不用小数点均可。超大或超小的数值可以用科学计数法来写：

```js
var y = 123e5;      // 12300000
var z = 123e-5;     // 0.00123
```

当数值和字符串相加时，JavaScript 将把数值视作字符串。JavaScript 从左向右计算表达式。不同的次序会产生不同的结果：

```js
var x = 911 + 7 + "Porsche";
918Porsche//结果 1

var y = "Porsche" + 911 + 7;
Porsche9117//结果 2
```

在第一个例子中，JavaScript 把 911 和 7 视作数值，直到遇见 "Porsche"。在第二个例子中，由于第一个操作数是字符串，因此所有操作数都被视为字符串。

JavaScript 拥有动态类型。这意味着相同变量可用作不同类型：

```js
var x;               // 现在 x 是 undefined
var x = 7;           // 现在 x 是数值
var x = "Bill";      // 现在 x 是字符串值
```

布尔值只有两个值：true 或 false。

#### JS 数组、对象

JavaScript 数组用方括号书写，数组的项目由逗号分隔：

```js
var cars = ["Porsche", "Volvo", "BMW"];
```

JavaScript 对象用花括号来书写。对象属性是 name:value 对，由逗号分隔:

```js
var person = {firstName:"Bill", lastName:"Gates", age:62, eyeColor:"blue"};
```

#### JS typeof、undefined、null

可使用 JavaScript 的 typeof 来确定 JavaScript 变量的类型。如：`typeof "Bill"`。typeof 运算符对数组返回 "object"，因为在 JavaScript 中数组属于对象。没有值的变量，其值是 undefined。typeof 也返回 undefined。任何变量均可通过设置值为 undefined 进行清空。其类型也将是 undefined。

空值与 undefined 不是一回事。空的字符串变量既有值也有类型。

在 JavaScript 中，null 是 "nothing"。它被看做不存在的事物。不幸的是，在 JavaScript 中，null 的数据类型是对象。您可以把 null 在 JavaScript 中是对象理解为一个 bug。它本应是 null。可以通过设置值为 null 清空对象。

Undefined 与 Null 的区别是，Undefined 与 null 的值相等，但类型不相等：

```js
typeof undefined              // undefined
typeof null                   // object
null === undefined            // false
null == undefined             // true
```

#### JS 原始数据、复杂数据

原始数据值是一种没有额外属性和方法的单一简单数据值。typeof 运算符可返回以下原始类型之一：

- string
- number
- boolean
- undefined

复杂数据 使用 typeof 运算符可返回以下两种类型之一：

- function：函数
- object：对象、数组或 null

```js
function demoF(){
}
alert(typeof [1,2,3,4]);//object
alert(typeof null);//object
alert(typeof demoF);//function
alert(typeof demoF());//undefined
```

## JavaScript 函数

JavaScript 函数是被设计为执行特定任务的代码块。函数会在某代码调用它时被执行：

- 当事件发生时（当用户点击按钮时）
- 当 JavaScript 代码调用时
- 自动的（自调用）

### JavaScript 函数语法

JavaScript 函数通过 function 关键词进行定义，其后是函数名和括号 ()。函数名可包含字母、数字、下划线和美元符号（规则与变量名相同）;圆括号可包括由逗号分隔的参数;由函数执行的代码被放置在花括号中：

```js
function name(参数 1, 参数 2, 参数 3) {
   //要执行的代码
}
```

Function parameters 是在函数定义中所列的名称。Function arguments 是当调用函数时由函数接收的真实的值。在函数中，参数是局部变量。局部变量只能在函数内访问。由于局部变量只能被其函数识别，因此可以在不同函数中使用相同名称的变量。局部变量在函数开始时创建，在函数完成时被删除。

当 JavaScript 到达 return 语句，函数将停止执行。如果函数被某条语句调用，JavaScript 将在调用语句之后“返回”执行代码。函数通常会计算出返回值。这个返回值会返回给调用者。

使用 `([参数数组])` 运算符调用函数。访问没有 () 的函数将返回 函数定义，访问无返回值的函数将返回 `undefined` ，访问传入参数参与到返回值计算的函数时若不输入参数将返回 `NaN` 。

函数的使用方法与变量一致，在所有类型的公式、赋值和计算中。

## JavaScript 对象

JavaScript 变量是数据值的容器。对象也是变量。但是对象包含很多值，值以 `名称:值` 对的方式来书写（名称和值由冒号分隔）。所以对象是被命名值的容器。

对象也可以有方法。方法是在对象上执行的动作，方法以函数定义被存储在属性中。方法是作为属性来存储的函数。

在函数定义中，this 关键字引用该函数的“拥有者”。

您能够以两种方式访问属性：

`objectName.propertyName`

或者：

`objectName["propertyName"]`

您能够通过如下语法访问对象方法：

`objectName.methodName()`

如果您不使用 `()` 访问方法，则将返回函数定义。方法实际上是以属性值的形式存储的函数定义。

请不要把字符串、数值和布尔值声明为对象！

如果通过关键词 "new" 来声明 JavaScript 变量，则该变量会被创建为对象：

```js
var x = new String();        // 把 x 声明为 String 对象
var y = new Number();        // 把 y 声明为 Number 对象
var z = new Boolean();       //	把 z 声明为 Boolean 对象
```

请避免字符串、数值或逻辑对象。他们会增加代码的复杂性并降低执行速度。

## JavaScript 事件

### HTML 事件

HTML 事件可以是浏览器或用户做的某些事情。例如：

- HTML 网页完成加载
- HTML 输入字段被修改
- HTML 按钮被点击

通过 JavaScript 代码，HTML 允许您向 HTML 元素添加事件处理程序。

```html
<!-- 使用单引号 -->
<element event='一些 JavaScript'>

<!-- 使用双引号 -->
<element event="一些 JavaScript">

<!-- 在下面的例子中，onclick 属性（以及代码）被添加到 <button> 元素 -->
<button onclick='document.getElementById("demo").innerHTML=Date()'>现在的时间是？</button>
```

下面是一些常见的 HTML 事件：

事件|描述
--|--
onchange|HTML 元素已被改变
onclick|用户点击了 HTML 元素
onmouseover|用户把鼠标移动到 HTML 元素上
onmouseout|用户把鼠标移开 HTML 元素
onkeydown|用户按下键盘按键
onload|浏览器已经完成页面加载
