# JavaScript 入门教程 2

## JavaScript 字符串

JavaScript 字符串是引号中的零个或多个字符。引号可以是单引号或双引号。可以在字符串中使用引号，只要不匹配围绕字符串的引号即可。若会产生引号冲突，则使用反斜杠 `\` 作为转义字符。另外有其他六个有效的转义序列：

代码|结果
--|--
\\b|退格键
\\f|换页
\\n|新行
\\r|回车
\\t|水平制表符
\\v|垂直制表符

### 字符串属性与方法

#### 字符串的长度

内建属性 length 可返回字符串的长度。

#### 查找字符串中的字符串

`indexOf(<待查询字符串>)` 方法返回字符串中指定文本首次出现的索引（位置），0 是字符串中的第一个位置。若不存在，则返回 -1 。

`lastIndexOf(<待查询字符串>)` 方法返回指定文本在字符串中最后一次出现的索引。若不存在，则返回 -1 。

两种方法都接受作为检索起始位置的第二个参数。lastIndexOf() 方法向后进行检索（从尾到头），这意味着：假如第二个参数是 50，则从位置 50 开始检索，直到字符串的起点。

`search(<待查询字符串>)` 方法搜索特定值的字符串，并返回匹配的位置。两种方法，indexOf() 与 search() 的区别在于：

- search() 方法无法设置第二个开始位置参数。
- indexOf() 方法无法设置更强大的搜索值（正则表达式）。

#### 提取部分字符串

有三种提取部分字符串的方法：

- slice(start, end)：提取字符串的某个部分并在新字符串中返回被提取的部分。该方法设置两个参数：起始索引（开始位置），终止索引（结束位置）。如果某个参数为负，则从字符串的结尾开始计数。如果省略第二个参数，则该方法将裁剪字符串的剩余部分。
- substring(start, end)：substring() 类似于 slice()，不同之处在于 substring() 无法接受负的索引。如果省略第二个参数，则该 substring() 将裁剪字符串的剩余部分。
- substr(start, length)：substr() 类似于 slice()，不同之处在于第二个参数规定被提取部分的长度。如果省略第二个参数，则该 substr() 将裁剪字符串的剩余部分。如果首个参数为负，则从字符串的结尾计算位置。第二个参数不能为负，因为它定义的是长度。

>提示：负值位置不适用 Internet Explorer 8 及其更早版本。

#### 替换字符串内容

replace() 方法用另一个值替换在字符串中指定的值。replace() 方法不会改变调用它的字符串。它返回的是新字符串。默认地，replace() 只替换首个匹配，并且大小写敏感。

如需执行大小写不敏感的替换，请使用正则表达式 /i（大小写不敏感）：

```js
str = "Please visit Microsoft!";
alert(str.replace(/SOFT/i, "W3School"));//Please visit MicroW3School!
alert(str.replace(/S/ig, "S"));//PleaSe viSit MicroSoft!
```

>注意：正则表达式不带引号

如需替换所有匹配，请使用正则表达式的 g 标志（用于全局搜索）

#### 转换为大写和小写

通过 toUpperCase() 把字符串转换为大写，通过 toLowerCase() 把字符串转换为小写。

#### 拼接字符串

拼接字符串使用 concat() 方法连接两个或多个字符串。concat() 方法可用于代替加运算符。下面两行是等效的：

```js
var text = "Hello" + " " + "World!";
var text = "Hello".concat(" ","World!");
```

所有字符串方法都会返回新字符串。它们不会修改原始字符串。正式地说：字符串是不可变的：字符串不能更改，只能替换。

#### 删除空白符

trim() 方法可以删除字符串**两端**的空白符。

>警告：Internet Explorer 8 或更低版本不支持 trim() 方法。

如需支持 IE 8，您可搭配正则表达式使用 replace() 方法代替：

```js
var str = "       Hello World!        ";
alert(str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
```

您还可以使用上面的 replace 方案把 trim 函数添加到 JavaScript String.prototype：

```js
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
var str = "       Hello World!        ";
alert(str.trim());
```

#### 提取字符串字符

这是两个提取字符串字符的安全方法：

- charAt(position)：返回字符串中指定下标（位置）的字符
- charCodeAt(position)：返回字符串中指定索引的字符 unicode 编码

#### 属性访问（Property Access）

ECMAScript 5 (2009) 允许对字符串的属性访问 `[ ]`：

```js
var str = "HELLO WORLD";
str[0];                   // 返回 H
```

使用属性访问有点不太靠谱：

- 不适用 Internet Explorer 7 或更早的版本
- 它让字符串看起来像是数组（其实并不是）
- 如果找不到字符，[ ] 返回 undefined，而 charAt() 返回空字符串。
- 它是只读的。str[0] = "A" 不会产生错误（但也不会工作！）

#### 把字符串转换为数组

可以通过 split() 将字符串转换为数组：

```js
var txt = "a,b,c,d,e";   // 字符串
txt.split(",");          // 用逗号分隔
txt.split(" ");          // 用空格分隔
txt.split("|");          // 用竖线分隔
```

如果省略分隔符，被返回的数组将包含 index [0] 中的整个字符串。

如果分隔符是 ""，被返回的数组将是单字符数组

### 字符串对象

通常，JavaScript 字符串是原始值，通过字面方式创建：

```js
var firstName = "Bill"\\typeof firstName 返回 string
```

但是字符串也可通过关键词 new 定义为对象：

```js
var firstName = new String("Bill")\\typeof firstName 返回 object
```

注意：请不要把字符串创建为对象。它会拖慢执行速度。new 关键字使代码复杂化。也可能产生一些意想不到的结果：

当使用 == 相等运算符时，相等字符串是相等的；当使用 === 运算符时，相等字符串是不相等的，因为 === 运算符需要类型和值同时相等。甚至更糟。对象无法比较：

```js
var x = "Bill";
var y = new String("Bill");
var z = new String("Bill");
alert("x == y :" + (x == y));//为 true，因为 x 和 y 的值相等
alert("x === y :" + (x === y));//为 false，因为 x 和 y 的类型不同（字符串与对象）
alert("y == z :" + (y == z));//为 false，因为 x 和 y 是不同的对象
alert("y === z :" + (y === z));//为 false，因为 x 和 y 是不同的对象
```

## JavaScript 数字

JavaScript 数值始终是双精度浮点数来存储，根据国际 IEEE 754 标准，此格式用 64 位存储数值，其中 0 到 51 存储数字（片段），52 到 62 存储指数，63 位存储符号：

值(aka Fraction/Mantissa)|指数|符号
--|--|--
52 bits(0 - 51)|11 bits (52 - 62)|1 bit (63)

### 精度

整数（不使用指数或科学计数法）会被精确到 15 位。小数的最大数是 17 位，但是浮点的算数并不总是 100% 精准:

```js
var x = 999999999999999;   // x 将是 999999999999999
var y = 9999999999999999;  // y 将是 10000000000000000
var x = 0.2 + 0.1;         // x 将是 0.30000000000000004

//使用乘除法有助于解决上面的问题：
var x = (0.2 * 10 + 0.1 * 10) / 10;       // x 将是 0.3
```

### 数字和字符串相加

JavaScript 的加法和级联（concatenation）都使用 + 运算符。数字用加法，字符串用级联：

- 如果您对两个数相加，结果将是一个数；
- 如果对两个字符串相加，结果将是一个字符串的级联；
- 如果您对一个数和一个字符串相加，结果也是字符串级联；
- 如果您对一个字符串和一个数字相加，结果也是字符串级联。

### 数字字符串

JavaScript 字符串可以拥有数字内容，在所有数字运算中，JavaScript 会尝试将字符串转换为数字：

```js
var x = "100";
var y = "10";
var z = x / y;       // z 将是 10
var z = x * y;       // z 将是 1000
var z = x + y;       // z 不会是 110（而是 10010）
```

### NaN - 非数值

NaN 属于 JavaScript 保留词，指示某个数不是合法数。尝试用一个非数字字符串进行运算会得到 NaN（Not a Number）。不过，假如字符串包含数值，则结果将是数。

您可使用全局 JavaScript 函数 isNaN() 来确定某个值是否是数。假如您在数学运算中使用了 NaN，则结果也将是 NaN 。NaN 是数，typeof NaN 返回 number：

```js
var x = 100 / "Apple";
isNaN(x);               // 返回 true，因为 x 不是数
var y = 5;
var z = x + y;         // z 将是 NaN
var m = "5";
var n = x + m;         // n 将是 NaN5
typeof z;             // 返回 "number"
typeof n;             // 返回 "string"

NaA == NaN;//false，NaN 之间无法比较
```

### Infinity

Infinity （或 -Infinity）是 JavaScript 在计算数时超出最大可能数范围时返回的值。除以 0（零）也会生成 Infinity。Infinity 是数, typeOf Infinity 返回 number。

```js
var myNumber = 2;
while (myNumber != Infinity) {          // 执行直到 Infinity
    myNumber = myNumber * myNumber;
}
alert(myNumber);//Infinity
alert(typeof myNumber);//number
alert(myNumber+NaN);//NaN
alert(typeof(myNumber+NaN));//number
var x =  2 / 0;          // x 将是 Infinity
var y = -2 / 0;          // y 将是 -Infinity

Infinity === Infinity;//true
-Infinity === -Infinity;//true
```

### 其他进制

JavaScript 会把前缀为 0x（0X） 的数值常量解释为十六进制，0b（0B）解释为二进制。不要用前导零写数字（比如 07）,一些 JavaScript 版本会把带有前导零的数解释为八进制，而一些却不会。

默认地，Javascript 把数显示为十进制小数。但是您能够使用 toString() 方法把数输出为任意进制：

```js
var myNumber = 128;
myNumber.toString(16);     // 返回 80
myNumber.toString(8);      // 返回 200
myNumber.toString(2);      // 返回 10000000
```

### 数值可以是对象

通常 JavaScript 数值是通过字面量创建的原始值,但是也可以通过关键词 new 定义为对象：var y = new Number(123)

请不要创建数值对象。这样会拖慢执行速度。new 关键词使代码复杂化，并产生某些无法预料的结果：

```js
var x = 500;
var y = new Number(500);// (x == y) 为 true，因为 x 和 y 有相等的值

var x = 500;
var y = new Number(500);
// (x === y) 为 false，因为 x 和 y 的类型不同

var x = new Number(500);
var y = new Number(500);
// (x == y) 为 false，因为对象无法比较
```

### Number 方法和属性

原始值（比如 3.14 或 2016），无法拥有属性和方法（因为它们不是对象）。

但是通过 JavaScript，方法和属性也可用于原始值，因为 JavaScript 在执行方法和属性时将原始值视作对象。所有数字方法可用于任意类型的数字（字面量、变量或表达式）。

- toString(<进制>) ：以字符串返回数值。
- toExponential(<有效值位数>) ：返回科学记数法字符串值，它包含已被四舍五入并使用指数计数法的数字。该参数是可选的。如果您没有设置它，JavaScript 不会对数字进行舍入。
- toFixed(<小数位数>) ：返回字符串值，它包含了指定位数小数的数字。toFixed(2) 非常适合处理金钱。
- toPrecision(<有效值位数>) 返回字符串值，它包含了指定长度的数字（长度过短变为科学记数法，长度不足则末尾小数补零）。
- valueOf() ：返回变量、文本、表达式等的数值，也可将 Number 对象转换为原始值。

>所有 JavaScript 数据类型都有 valueOf() 和 toString() 方法。

### 把变量转换为数值

这三种 JavaScript 方法可用于将变量转换为数字，如果无法转换数字，则返回 NaN ：

- Number() ：返回数字。Number() 还可以把日期转换为数字。
- parseFloat() ：解析其参数并返回浮点数，允许空格，只返回首个数字，末尾 0 不保留。
- parseInt() ：解析一段字符串并返回数值，允许空格，只返回首个数字。

>这些方法并非数字方法，而是全局 JavaScript 方法。

：

```js
Number(new Date("2019-04-15"));
// 返回 1506729600000，1970年1月1日至今的毫秒数

parseInt("10 20 30");   // 返回 10
parseInt(" 10.1 years");   // 返回 10
parseInt("years 10");   // 返回 NaN

alert(parseFloat("   0.65600a10"));//返回0.656
parseFloat("years 10");  // 返回 NaN
```

### 数值属性

属性|描述
--|--
Number.MAX_VALUE|返回 JavaScript 中可能的最大数
Number.MIN_VALUE|返回 JavaScript 中可能的最小数
Number.NEGATIVE_INFINITY（Infinity）|表示负的无穷大（溢出返回）
POSITIVE_INFINITY|表示无穷大（溢出返回）
Number.NaN（NaN）|表示非数字值（"Not-a-Number"）

```js
var x = Number.MAX_VALUE + 1e+291;//1.7976931348623157e+308
var y = Number.MAX_VALUE + 1e+292;//Infinity
x === Number.MAX_VALUE;//true
y === Infinity;//true

var m = x.MAX_VALUE;    // y 成为 undefined
```

## JavaScript 数组

JavaScript 数组用于在单一变量中存储多个值。

### 创建数组

使用数组文本是创建 JavaScript 数组最简单的方法。语法：

var array-name = [item1, item2, ...];

空格和折行并不重要。声明可横跨多行。请不要最后一个元素之后写逗号，可能存在跨浏览器兼容性问题。

使用 JavaScript 关键词 new：

var array-name = new Array(item1, item2, ...);

也会创建数组，并为其赋值，与不使用 new 的效果完全一样。出于简洁、可读性和执行速度的考虑，请使用第一种方法（数组文本方法）。

### 访问数组与数组元素

通过引用数组名（不加 `[<下标>]` 等后缀）来访问完整数组。

我们通过引用索引号（下标号）来引用某个数组元素，可以对元素进行查询与修改。[0] 是数组中的第一个元素。[1] 是第二个。数组索引从 0 开始。

JavaScript 变量可以是对象。数组是特殊类型的对象。正因如此，您可以在相同数组中存放不同类型的变量。您可以在数组保存对象。您可以在数组中保存函数。你甚至可以在数组中保存数组。

