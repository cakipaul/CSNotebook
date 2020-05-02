# Java核心类

- [资源-廖雪峰的官网](https://www.liaoxuefeng.com/wiki/1252599548343744/1260576204194144)

## 字符串和编码

### String

在Java中，String是一个引用类型，它本身也是一个class。但是，Java编译器对String有特殊处理，即可以直接用"..."来表示一个字符串：

```java
String s1 = "Hello!";
```

实际上字符串在String内部是通过一个char\[\]数组表示的，因此，按下面的写法也是可以的：

```java
String s2 = new String(new char[] {'H', 'e', 'l', 'l', 'o', '!'});
```

因为String太常用了，所以Java提供了"..."这种字符串字面量表示方法。

Java字符串的一个重要特点就是**字符串不可变**。这种不可变性是通过内部的 `private final char\[\]` 字段，以及没有任何修改 `char\[\]` 的方法实现的。

我们来看一个例子：

```java
// String
public class Main {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s);
        s = s.toUpperCase();
        System.out.println(s);
    }
}
```

### 字符串比较

当我们想要比较两个字符串是否相同时，要特别注意，我们实际上是想比较字符串的内容是否相同。必须使用equals()方法而不能用==。

我们看下面的例子：

```java
// String
public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "hello";
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
    }
}
```

从表面上看，两个字符串用==和equals()比较都为true，但实际上那只是Java编译器在编译期，会自动把所有相同的字符串当作一个对象放入常量池，自然s1和s2的引用就是相同的。

所以，这种==比较返回true纯属巧合。换一种写法，==比较就会失败：

```java
// String
public class Main {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "HELLO".toLowerCase();
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
    }
}
```

> 结论：两个字符串比较，必须总是使用equals()方法。

要忽略大小写比较，使用equalsIgnoreCase()方法。

String类还提供了多种方法来搜索子串、提取子串。常用的方法有：

```java
// 是否包含子串:
"Hello".contains("ll"); // true
```

注意到contains()方法的参数是CharSequence而不是String，因为CharSequence是String的父类。

搜索子串的更多的例子：

```java
"Hello".indexOf("l"); // 2
"Hello".lastIndexOf("l"); // 3
"Hello".startsWith("He"); // true
"Hello".endsWith("lo"); // true
```

提取子串的例子：

```java
"Hello".substring(2); // "llo"
"Hello".substring(2, 4); "ll"
```

注意索引号是从0开始的。

### 去除首尾空白字符

使用trim()方法可以移除字符串首尾空白字符。空白字符包括空格，`\t，\r，\n`：

`"  \tHello\r\n ".trim(); // "Hello"`

>注意：trim()并没有改变字符串的内容，而是返回了一个新字符串。

另一个strip()方法也可以移除字符串首尾空白字符。它和trim()不同的是，类似中文的空格字符\u3000也会被移除：

```java
"\u3000Hello\u3000".strip(); // "Hello"
" Hello ".stripLeading(); // "Hello "
" Hello ".stripTrailing(); // " Hello"
```

String还提供了isEmpty()和isBlank()来判断字符串是否为空和空白字符串：

```java
"".isEmpty(); // true，因为字符串长度为0
"  ".isEmpty(); // false，因为字符串长度不为0
"  \n".isBlank(); // true，因为只包含空白字符
" Hello ".isBlank(); // false，因为包含非空白字符
```

### 替换子串

要在字符串中替换子串，有两种方法。一种是根据字符或字符串替换：

```java
String s = "hello";
s.replace('l', 'w'); // "hewwo"，所有字符'l'被替换为'w'
s.replace("ll", "~~"); // "he~~o"，所有子串"ll"被替换为"~~"
```

另一种是通过正则表达式替换：

```java
String s = "A,,B;C ,D";
s.replaceAll("[\\,\\;\\s]+", ","); // "A,B,C,D"
```

上面的代码通过正则表达式，把匹配的子串统一替换为","。关于正则表达式的用法我们会在后面详细讲解。

### 分割字符串

要分割字符串，使用split()方法，并且传入的也是正则表达式：

```java
String s = "A,B,C,D";
String[] ss = s.split("\\,"); // {"A", "B", "C", "D"}
```

### 拼接字符串

拼接字符串使用静态方法join()，它用指定的字符串连接字符串数组：

```java
String[] arr = {"A", "B", "C"};
String s = String.join("***", arr); // "A***B***C"
```

>注：JDK7及以前版本不支持join方法。

### 类型转换

要把任意基本类型或引用类型转换为字符串，可以使用静态方法valueOf()。这是一个重载方法，编译器会根据参数自动选择合适的方法：

```java
String.valueOf(123); // "123"
String.valueOf(45.67); // "45.67"
String.valueOf(true); // "true"
String.valueOf(new Object()); // 类似java.lang.Object@636be97c
```

要把字符串转换为其他类型，就需要根据情况。

```java
//把字符串转换为int类型：
int n1 = Integer.parseInt("123"); // 123
int n2 = Integer.parseInt("ff", 16); // 按十六进制转换，255

// 把字符串转换为boolean类型
boolean b1 = Boolean.parseBoolean("true"); // true
boolean b2 = Boolean.parseBoolean("FALSE"); // false
```

要特别注意，Integer有个getInteger(String)方法，它不是将字符串转换为int，而是把该字符串对应的系统变量转换为Integer：

```java
Integer.getInteger("java.version"); // 版本号，11
```

### 转换为 char[]

String和char\[\]类型可以互相转换，方法是：

```java
char[] cs = "Hello".toCharArray(); // String -> char[]
String s = new String(cs); // char[] -> String
```

如果修改了char\[\]数组，String并不会改变：

```java
// String <-> char[]
public class Main {
    public static void main(String[] args) {
        char[] cs = "Hello".toCharArray();
        String s = new String(cs);
        System.out.println(s);
        cs[0] = 'X';
        System.out.println(s);
    }
}
```

这是因为通过new String(char\[\])创建新的String实例时，它并不会直接引用传入的char\[\]数组，而是会复制一份，所以，修改外部的char\[\]数组不会影响String实例内部的char\[\]数组，因为这是两个不同的数组。

从String的不变性设计可以看出，如果传入的对象有可能改变，我们需要复制而不是直接引用。

例如，下面的代码设计了一个Score类保存一组学生的成绩：

```java
// int[]
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        int[] scores = new int[] { 88, 77, 51, 66 };
        Score s = new Score(scores);
        s.printScores();
        scores[2] = 99;
        s.printScores();
    }
}

class Score {
    private int[] scores;
    public Score(int[] scores) {
        this.scores = scores;
    }

    public void printScores() {
        System.out.println(Arrays.toString(scores));
    }
}
```

观察两次输出，由于Score内部直接引用了外部传入的int\[\]数组，这会造成外部代码对int\[\]数组的修改，影响到Score类的字段。如果外部代码不可信，这就会造成安全隐患。

### 字符编码

在早期的计算机系统中，为了给字符编码，美国国家标准学会（American National Standard Institute：ANSI）制定了一套英文字母、数字和常用符号的编码，它占用一个字节，编码范围从0到127，最高位始终为0，称为ASCII编码。例如，字符'A'的编码是0x41，字符'1'的编码是0x31。

如果要把汉字也纳入计算机编码，很显然一个字节是不够的。GB2312标准使用两个字节表示一个汉字，其中第一个字节的最高位始终为1，以便和ASCII编码区分开。例如，汉字'中'的GB2312编码是0xd6d0。

类似的，日文有Shift_JIS编码，韩文有EUC-KR编码，这些编码因为标准不统一，同时使用，就会产生冲突。

为了统一全球所有语言的编码，全球统一码联盟发布了Unicode编码，它把世界上主要语言都纳入同一个编码，这样，中文、日文、韩文和其他语言就不会冲突。

Unicode编码需要两个或者更多字节表示，我们可以比较中英文字符在ASCII、GB2312和Unicode的编码：

英文字符'A'的ASCII编码和Unicode编码：

```
         ┌────┐
ASCII:   │ 41 │
         └────┘
         ┌────┬────┐
Unicode: │ 00 │ 41 │
         └────┴────┘
```

英文字符的Unicode编码就是简单地在前面添加一个00字节。

中文字符'中'的GB2312编码和Unicode编码：

```
         ┌────┬────┐
GB2312:  │ d6 │ d0 │
         └────┴────┘
         ┌────┬────┐
Unicode: │ 4e │ 2d │
         └────┴────┘
```

那我们经常使用的UTF-8又是什么编码呢？因为英文字符的Unicode编码高字节总是00，包含大量英文的文本会浪费空间，所以，出现了UTF-8编码，它是一种变长编码，用来把固定长度的Unicode编码变成1～4字节的变长编码。通过UTF-8编码，英文字符'A'的UTF-8编码变为0x41，正好和ASCII码一致，而中文'中'的UTF-8编码为3字节0xe4b8ad。

UTF-8编码的另一个好处是容错能力强。如果传输过程中某些字符出错，不会影响后续字符，因为UTF-8编码依靠高字节位来确定一个字符究竟是几个字节，它经常用来作为传输编码。

在Java中，char类型实际上就是两个字节的Unicode编码。如果我们要手动把字符串转换成其他编码，可以这样做：

```java
byte[] b1 = "Hello".getBytes(); // 按系统默认编码转换，不推荐
byte[] b2 = "Hello".getBytes("UTF-8"); // 按UTF-8编码转换
byte[] b2 = "Hello".getBytes("GBK"); // 按GBK编码转换
byte[] b3 = "Hello".getBytes(StandardCharsets.UTF_8); // 按UTF-8编码转换
```

>注意：转换编码后，就不再是char类型，而是byte类型表示的数组。

如果要把已知编码的byte\[\]转换为String，可以这样做：

```java
byte[] b = ...
String s1 = new String(b, "GBK"); // 按GBK转换
String s2 = new String(b, StandardCharsets.UTF_8); // 按UTF-8转换
```

始终牢记：Java的String和char在内存中总是以Unicode编码表示。

### 延伸阅读

对于不同版本的JDK，String类在内存中有不同的优化方式。具体来说，早期JDK版本的String总是以char\[\]存储，它的定义如下：

```java
public final class String {
    private final char[] value;
    private final int offset;
    private final int count;
}
```

而较新的JDK版本的String则以byte\[\]存储：如果String仅包含ASCII字符，则每个byte存储一个字符，否则，每两个byte存储一个字符，这样做的目的是为了节省内存，因为大量的长度较短的String通常仅包含ASCII字符：

```java
public final class String {
    private final byte[] value;
    private final byte coder; // 0 = LATIN1, 1 = UTF16
}
```

对于使用者来说，String内部的优化不影响任何已有代码，因为它的public方法签名是不变的。

### 小结

Java字符串String是不可变对象；

字符串操作不改变原字符串内容，而是返回新字符串；

常用的字符串操作：提取子串、查找、替换、大小写转换等；

Java使用Unicode编码表示String和char；

转换编码就是将String和byte\[\]转换，需要指定编码；

转换为byte\[\]时，始终优先考虑UTF-8编码。

## StringBuilder

Java编译器对String做了特殊处理，使得我们可以直接用+拼接字符串。虽然可以直接拼接字符串，但是，在循环中，每次循环都会创建新的字符串对象，然后扔掉旧的字符串。这样，绝大部分字符串都是临时对象，不但浪费内存，还会影响GC效率。

为了能高效拼接字符串，Java标准库提供了StringBuilder，它是一个可变对象，可以预分配缓冲区，这样，往StringBuilder中新增字符时，不会创建新的临时对象：

```java
StringBuilder sb = new StringBuilder(1024);
for (int i = 0; i < 1000; i++) {
    sb.append(',');
    sb.append(i);
}
String s = sb.toString();
StringBuilder还可以进行链式操作：

// 链式操作
public class Main {
    public static void main(String[] args) {
        var sb = new StringBuilder(1024);
        sb.append("Mr ")
          .append("Bob")
          .append("!")
          .insert(0, "Hello, ");
        System.out.println(sb.toString());
    }
}
```

如果我们查看StringBuilder的源码，可以发现，进行链式操作的关键是，定义的append()方法会返回this，这样，就可以不断调用自身的其他方法。仿照StringBuilder，我们也可以设计支持链式操作的类。

>注意：对于普通的字符串+操作，并不需要我们将其改写为StringBuilder，因为Java编译器在编译时就自动把多个连续的+操作编码为StringConcatFactory的操作。在运行期，StringConcatFactory会自动把字符串连接操作优化为数组复制或者StringBuilder操作。

你可能还听说过StringBuffer，这是Java早期的一个StringBuilder的线程安全版本，它通过同步来保证多个线程操作StringBuffer也是安全的，但是同步会带来执行速度的下降。

StringBuilder和StringBuffer接口完全相同，现在完全没有必要使用StringBuffer。

### 小结

- StringBuilder是可变对象，用来高效拼接字符串；
- StringBuilder可以支持链式操作，实现链式操作的关键是返回实例本身；
- StringBuffer是StringBuilder的线程安全版本，现在很少使用。

## StringJoiner

要高效拼接字符串，应该使用StringBuilder。

```java
@Test
public void stringJoinerTest(){
    String[] names = {"Bob", "Alice", "Grace"};
    StringJoiner sj = new StringJoiner(", ", "Hello ", "!");
    for (String name : names) {
        sj.add(name);
    }
    System.out.println(sj.toString());        //Hello Bob, Alice, Grace!
}
```

那么StringJoiner内部是如何拼接字符串的呢？如果查看源码，可以发现，StringJoiner内部实际上就是使用了StringBuilder，所以拼接效率和StringBuilder几乎是一模一样的。

### String.join()

String还提供了一个静态方法join()，这个方法在内部使用了StringJoiner来拼接字符串，在不需要指定“开头”和“结尾”的时候，用String.join()更方便：

```java
String[] names = {"Bob", "Alice", "Grace"};
var s = String.join(", ", names);
```

### 小结

- 用指定分隔符拼接字符串数组时，使用StringJoiner或者String.join()更方便；
- 用StringJoiner拼接字符串时，还可以额外附加一个“开头”和“结尾”。

## 包装类型

我们已经知道，Java的数据类型分两种：

- 基本类型：byte，short，int，long，boolean，float，double，char
- 引用类型：所有class和interface类型

引用类型可以赋值为null，表示空，但基本类型不能赋值为null：

```java
String s = null;
int n = null; // compile error!
```

那么，如何把一个基本类型视为对象（引用类型）？比如，想要把int基本类型变成一个引用类型，我们可以定义一个Integer类，它只包含一个实例字段int，这样，Integer类就可以视为int的包装类（Wrapper Class）：

```java
public class Integer {
    private int value;

    public Integer(int value) {
        this.value = value;
    }

    public int intValue() {
        return this.value;
    }
}
```

定义好了Integer类，我们就可以把int和Integer互相转换：

```java
Integer n = null;
Integer n2 = new Integer(99);
int n3 = n2.intValue();
```

实际上，因为包装类型非常有用，Java核心库为每种基本类型都提供了对应的包装类型：

基本类型|	对应的引用类型
---|---
boolean|	java.lang.Boolean
byte	|java.lang.Byte
short	|java.lang.Short
int|	java.lang.Integer
long|	java.lang.Long
float|	java.lang.Float
double|	java.lang.Double
char	|java.lang.Character

我们可以直接使用，并不需要自己去定义。

### Auto Boxing

因为int和Integer可以互相转换：

```java
int i = 100;
Integer n = Integer.valueOf(i);
int x = n.intValue();
```

所以，Java编译器可以帮助我们自动在int和Integer之间转型：

```java
Integer n = 100; // 编译器自动使用Integer.valueOf(int)
int x = n; // 编译器自动使用Integer.intValue()
```

这种直接把int变为Integer的赋值写法，称为自动装箱（Auto Boxing），反过来，把Integer变为int的赋值写法，称为自动拆箱（Auto Unboxing）。

>注意：自动装箱和自动拆箱只发生在编译阶段，目的是为了少写代码。

装箱和拆箱会影响代码的执行效率，因为编译后的class代码是严格区分基本类型和引用类型的。并且，自动拆箱执行时可能会报NullPointerException：

```java
// NullPointerException
public class Main {
    public static void main(String[] args) {
        Integer n = null;
        int i = n;
    }
}
```

### 不变类

所有的包装类型都是不变类。我们查看Integer的源码可知，它的核心代码如下：

```java
public final class Integer {
    private final int value;
}
```

因此，一旦创建了Integer对象，该对象就是不变的。

对两个Integer实例进行比较要特别注意：绝对不能用==比较，因为Integer是引用类型，必须使用equals()比较：

```java
// == or equals?
public class Main {
    public static void main(String[] args) {
        Integer x = 127;
        Integer y = 127;
        Integer m = 99999;
        Integer n = 99999;
        System.out.println("x == y: " + (x==y)); // true
        System.out.println("m == n: " + (m==n)); // false
        System.out.println("x.equals(y): " + x.equals(y)); // true
        System.out.println("m.equals(n): " + m.equals(n)); // true
    }
}
```

仔细观察结果的童鞋可以发现，==比较，较小的两个相同的Integer返回true，较大的两个相同的Integer返回false，这是因为Integer是不变类，编译器把Integer x = 127;自动变为Integer x = Integer.valueOf(127);，为了节省内存，Integer.valueOf()对于较小的数，始终返回相同的实例，因此，==比较“恰好”为true，但我们绝不能因为Java标准库的Integer内部有缓存优化就用==比较，必须用equals()方法比较两个Integer。

>按照语义编程，而不是针对特定的底层实现去“优化”。

因为Integer.valueOf()可能始终返回同一个Integer实例，因此，在我们自己创建Integer的时候，以下两种方法：

- 方法1：Integer n = new Integer(100);
- 方法2：Integer n = Integer.valueOf(100);

方法2更好，因为方法1总是创建新的Integer实例，方法2把内部优化留给Integer的实现者去做，即使在当前版本没有优化，也有可能在下一个版本进行优化。

我们把能创建“新”对象的静态方法称为静态工厂方法。Integer.valueOf()就是静态工厂方法，它尽可能地返回缓存的实例以节省内存。

>创建新对象时，优先选用静态工厂方法而不是new操作符。

如果我们考察Byte.valueOf()方法的源码，可以看到，标准库返回的Byte实例全部是缓存实例，但调用者并不关心静态工厂方法以何种方式创建新实例还是直接返回缓存的实例。

### 进制转换

Integer类本身还提供了大量方法，例如，最常用的静态方法parseInt()可以把字符串解析成一个整数：

```java
int x1 = Integer.parseInt("100"); // 100
int x2 = Integer.parseInt("100", 16); // 256,因为按16进制解析
```

Integer还可以把整数格式化为指定进制的字符串：

```java
// Integer:
public class Main {
    public static void main(String[] args) {
        System.out.println(Integer.toString(100)); // "100",表示为10进制
        System.out.println(Integer.toString(100, 36)); // "2s",表示为36进制
        System.out.println(Integer.toHexString(100)); // "64",表示为16进制
        System.out.println(Integer.toOctalString(100)); // "144",表示为8进制
        System.out.println(Integer.toBinaryString(100)); // "1100100",表示为2进制
    }
}
```

注意：上述方法的输出都是String，在计算机内存中，只用二进制表示，不存在十进制或十六进制的表示方法。int n = 100在内存中总是以4字节的二进制表示：

```
┌────────┬────────┬────────┬────────┐
│00000000│00000000│00000000│01100100│
└────────┴────────┴────────┴────────┘
```

我们经常使用的System.out.println(n);是依靠核心库自动把整数格式化为10进制输出并显示在屏幕上，使用Integer.toHexString(n)则通过核心库自动把整数格式化为16进制。

这里我们注意到程序设计的一个重要原则：数据的存储和显示要分离。

Java的包装类型还定义了一些有用的静态变量

```java
// boolean只有两个值true/false，其包装类型只需要引用Boolean提供的静态字段:
Boolean t = Boolean.TRUE;
Boolean f = Boolean.FALSE;
// int可表示的最大/最小值:
int max = Integer.MAX_VALUE; // 2147483647
int min = Integer.MIN_VALUE; // -2147483648
// long类型占用的bit和byte数量:
int sizeOfLong = Long.SIZE; // 64 (bits)
int bytesOfLong = Long.BYTES; // 8 (bytes)
```

最后，所有的整数和浮点数的包装类型都继承自Number，因此，可以非常方便地直接通过包装类型获取各种基本类型：

```java
// 向上转型为Number:
Number num = new Integer(999);
// 获取byte, int, long, float, double:
byte b = num.byteValue();
int n = num.intValue();
long ln = num.longValue();
float f = num.floatValue();
double d = num.doubleValue();
```

### 处理无符号整型

在Java中，并没有无符号整型（Unsigned）的基本数据类型。byte、short、int和long都是带符号整型，最高位是符号位。而C语言则提供了CPU支持的全部数据类型，包括无符号整型。无符号整型和有符号整型的转换在Java中就需要借助包装类型的静态方法完成。

例如，byte是有符号整型，范围是-128~+127，但如果把byte看作无符号整型，它的范围就是0~255。我们把一个负的byte按无符号整型转换为int：

```java
// Byte
public class Main {
    public static void main(String[] args) {
        byte x = -1;
        byte y = 127;
        System.out.println(Byte.toUnsignedInt(x)); // 255
        System.out.println(Byte.toUnsignedInt(y)); // 127
    }
}
```

因为byte的-1的二进制表示是11111111，以无符号整型转换后的int就是255。

类似的，可以把一个short按unsigned转换为int，把一个int按unsigned转换为long。

### 小结

- Java核心库提供的包装类型可以把基本类型包装为class；
- 自动装箱和自动拆箱都是在编译期完成的（JDK>=1.5）；
- 装箱和拆箱会影响执行效率，且拆箱时可能发生NullPointerException；
- 包装类型的比较必须使用equals()；
- 整数和浮点数的包装类型都继承自Number；
- 包装类型提供了大量实用方法。

## JavaBean

在Java中，有很多class的定义都符合这样的规范：

- 若干private实例字段；
- 通过public方法来读写实例字段。

如果读写方法符合以下这种命名规范：

```java
// 读方法:
public Type getXyz()
// 写方法:
public void setXyz(Type value)
```

那么这种class被称为JavaBean：

上面的字段是xyz，那么读写方法名分别以get和set开头，并且后接大写字母开头的字段名Xyz，因此两个读写方法名分别是getXyz()和setXyz()。

boolean字段比较特殊，它的读方法一般命名为isXyz()：

```java
// 读方法:
public boolean isChild()
// 写方法:
public void setChild(boolean value)
```

我们通常把一组对应的读方法（getter）和写方法（setter）称为属性（property）。例如，name属性：

- 对应的读方法是String getName()
- 对应的写方法是setName(String)

只有getter的属性称为只读属性（read-only），例如，定义一个age只读属性：

- 对应的读方法是int getAge()
- 无对应的写方法setAge(int)

类似的，只有setter的属性称为只写属性（write-only）。

很明显，只读属性很常见，只写属性不常见。

属性只需要定义getter和setter方法，不一定需要对应的字段。例如，child只读属性定义如下：

```java
public class Person {
    private String name;
    private int age;

    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return this.age; }
    public void setAge(int age) { this.age = age; }

    public boolean isChild() {
        return age <= 6;
    }
}
```

可以看出，getter和setter也是一种数据封装的方法。

### JavaBean的作用

JavaBean主要用来传递数据，即把一组数据组合成一个JavaBean便于传输。此外，JavaBean可以方便地被IDE工具分析，生成读写属性的代码，主要用在图形界面的可视化设计中。通过IDE，可以快速生成getter和setter。

### 枚举JavaBean属性

要枚举一个JavaBean的所有属性，可以直接使用Java核心库提供的Introspector：

```java
import java.beans.*;
public class Main {
    public static void main(String[] args) throws Exception {
        BeanInfo info = Introspector.getBeanInfo(Person.class);
        for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
            System.out.println(pd.getName());
            System.out.println("  " + pd.getReadMethod());
            System.out.println("  " + pd.getWriteMethod());
        }
    }
}

class Person {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

运行上述代码，可以列出所有的属性，以及对应的读写方法。注意class属性是从Object继承的getClass()方法带来的：

```
age
  public int com.cakipaul.csnotes.core.Person.getAge()
  public void com.cakipaul.csnotes.core.Person.setAge(int)
class
  public final native java.lang.Class java.lang.Object.getClass()
  null
name
  public java.lang.String com.cakipaul.csnotes.core.Person.getName()
  public void com.cakipaul.csnotes.core.Person.setName(java.lang.String)
```

### 小结

- JavaBean是一种符合命名规范的class，它通过getter和setter来定义属性；
- 属性是一种通用的叫法，并非Java语法规定；
- 可以利用IDE快速生成getter和setter；
- 使用Introspector.getBeanInfo()可以获取属性列表。

## 枚举类

在Java中，我们可以通过static final来定义常量。例如，我们希望定义周一到周日这7个常量，可以用7个不同的int表示。无论是int常量还是String常量，使用这些常量来表示一组枚举值的时候，有一个严重的问题就是，编译器无法检查每个值的合理性。

### enum

为了让编译器能自动检查某个值在枚举的集合内，并且，不同用途的枚举需要不同的类型来标记，不能混用，我们可以使用enum来定义枚举类：

```java
// enum
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        if (day == Weekday.SAT || day == Weekday.SUN) {
            System.out.println("Work at home!");
        } else {
            System.out.println("Work at office!");
        }
    }
}

enum Weekday {
    SUN, MON, TUE, WED, THU, FRI, SAT;
}
```

注意到定义枚举类是通过关键字enum实现的，我们只需依次列出枚举的常量名。

和int定义的常量相比，使用enum定义枚举有如下好处：

首先，enum常量本身带有类型信息，即Weekday.SUN类型是Weekday，编译器会自动检查出类型错误。例如，下面的语句不可能编译通过：

```java
int day = 1;
if (day == Weekday.SUN) { // Compile error: bad operand types for binary operator '=='
}
```

其次，不可能引用到非枚举的值，因为无法通过编译。

最后，不同类型的枚举不能互相比较或者赋值，因为类型不符。例如，不能给一个Weekday枚举类型的变量赋值为Color枚举类型的值：

```java
Weekday x = Weekday.SUN; // ok!
Weekday y = Color.RED; // Compile error: incompatible types
```

这就使得编译器可以在编译期自动检查出所有可能的潜在错误。

### enum的比较

使用enum定义的枚举类是一种引用类型。前面我们讲到，引用类型比较，要使用equals()方法，如果使用==比较，它比较的是两个引用类型的变量是否是同一个对象。因此，引用类型比较，要始终使用equals()方法，但enum类型可以例外。

这是因为enum类型的每个常量在JVM中只有一个唯一实例，所以可以直接用==比较：

```java
if (day == Weekday.FRI) { // ok!
}
if (day.equals(Weekday.SUN)) { // ok, but more code!
}
```

### enum类型

通过enum定义的枚举类，和其他的class有什么区别？

答案是没有任何区别。enum定义的类型就是class，只不过它有以下几个特点：

- 定义的enum类型总是继承自java.lang.Enum，且无法被继承；
- 只能定义出enum的实例，而无法通过new操作符创建enum的实例；
- 定义的每个实例都是引用类型的唯一实例；
- 可以将enum类型用于switch语句。

例如，我们定义的Color枚举类：

```java
public enum Color {
    RED, GREEN, BLUE;
}
```

编译器编译出的class大概就像这样：

```java
public final class Color extends Enum { // 继承自Enum，标记为final class
    // 每个实例均为全局唯一:
    public static final Color RED = new Color();
    public static final Color GREEN = new Color();
    public static final Color BLUE = new Color();
    // private构造方法，确保外部无法调用new操作符:
    private Color() {}
}
```

所以，编译后的enum类和普通class并没有任何区别。但是我们自己无法按定义普通class那样来定义enum，必须使用enum关键字，这是Java语法规定的。

因为enum是一个class，每个枚举的值都是class实例，因此，这些实例有一些方法：

- `name()` //返回常量名，例如：
- `ordinal()` //返回定义的常量的顺序，从0开始计数，改变枚举常量定义的顺序就会导致ordinal()返回值发生变化。如果在代码中编写了类似if(x.ordinal()==1)这样的语句，就要保证enum的枚举顺序不能变。新增的常量必须放在最后。

有些童鞋会想，Weekday的枚举常量如果要和int转换，使用ordinal()不是非常方便？比如这样写：

```java
String task = Weekday.MON.ordinal() + "/ppt";
saveToFile(task);
```

但是，如果不小心修改了枚举的顺序，编译器是无法检查出这种逻辑错误的。要编写健壮的代码，就不要依靠ordinal()的返回值。因为enum本身是class，所以我们可以定义private的构造方法，并且，给每个枚举常量添加字段：

```java
// enum
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        if (day.dayValue == 6 || day.dayValue == 0) {
            System.out.println("Work at home!");
        } else {
            System.out.println("Work at office!");
        }
    }
}

enum Weekday {
    MON(1), TUE(2), WED(3), THU(4), FRI(5), SAT(6), SUN(0);

    public final int dayValue;

    private Weekday(int dayValue) {
        this.dayValue = dayValue;
    }
}
```

这样就无需担心顺序的变化，新增枚举常量时，也需要指定一个int值。

>注意：枚举类的字段也可以是非final类型，即可以在运行期修改，但是不推荐这样做！

默认情况下，对枚举常量调用toString()会返回和name()一样的字符串。但是，toString()可以被覆写，而name()则不行。我们可以给Weekday添加toString()方法：

```java
// enum
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        if (day.dayValue == 6 || day.dayValue == 0) {
            System.out.println("Today is " + day + ". Work at home!");
        } else {
            System.out.println("Today is " + day + ". Work at office!");
        }
    }
}

enum Weekday {
    MON(1, "星期一"), TUE(2, "星期二"), WED(3, "星期三"), THU(4, "星期四"), FRI(5, "星期五"), SAT(6, "星期六"), SUN(0, "星期日");

    public final int dayValue;
    private final String chinese;

    private Weekday(int dayValue, String chinese) {
        this.dayValue = dayValue;
        this.chinese = chinese;
    }

    @Override
    public String toString() {
        return this.chinese;
    }
}
```

覆写toString()的目的是在输出时更有可读性。

>注意：判断枚举常量的名字，要始终使用name()方法，绝不能调用toString()！

### switch

最后，枚举类可以应用在switch语句中。因为枚举类天生具有类型信息和有限个枚举常量，所以比int、String类型更适合用在switch语句中：

```java
// switch
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        switch(day) {
        case MON:
        case TUE:
        case WED:
        case THU:
        case FRI:
            System.out.println("Today is " + day + ". Work at office!");
            break;
        case SAT:
        case SUN:
            System.out.println("Today is " + day + ". Work at home!");
            break;
        default:
            throw new RuntimeException("cannot process " + day);
        }
    }
}

enum Weekday {
    MON, TUE, WED, THU, FRI, SAT, SUN;
}
```

加上default语句，可以在漏写某个枚举常量时自动报错，从而及时发现错误。

### 小结

- Java使用enum定义枚举类型，它被编译器编译为final class Xxx extends Enum { … }；
- 通过name()获取常量定义的字符串，注意不要使用toString()；
- 通过ordinal()返回常量定义的顺序（无实质意义）；
- 可以为enum编写构造方法、字段和方法
- enum的构造方法要声明为private，字段强烈建议声明为final；
- enum适合用在switch语句中。

## 记录类

使用String、Integer等类型的时候，这些类型都是不变类，一个不变类具有以下特点：

- 定义class时使用final，无法派生子类；
- 每个字段使用final，保证创建实例后无法修改任何字段。
- 假设我们希望定义一个Point类，有x、y两个变量，同时它是一个不变类，可以这么写：

```java
public final class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() {
        return this.x;
    }

    public int y() {
        return this.y;
    }
}
```

为了保证不变类的比较，还需要正确覆写equals()和hashCode()方法，这样才能在集合类中正常使用。后续我们会详细讲解正确覆写equals()和hashCode()，这里演示Point不变类的写法目的是，这些代码写起来都非常简单，但是很繁琐。

### record

从Java 14开始，引入了新的Record类。我们定义Record类时，使用关键字record。把上述Point类改写为Record类，代码如下：

```java
// Record
public class Main {
    public static void main(String[] args) {
        Point p = new Point(123, 456);
        System.out.println(p.x());
        System.out.println(p.y());
        System.out.println(p);
    }
}

public record Point(int x, int y) {}
```

仔细观察Point的定义：

`public record Point(int x, int y) {}`

把上述定义改写为class，相当于以下代码：

```java
final class Point extends java.lang.Record {
    private final int x;
    private final int y;

    public Point(int x, int y) { /* compiled code */ }

    public java.lang.String toString() { /* compiled code */ }

    public final int hashCode() { /* compiled code */ }

    public final boolean equals(java.lang.Object o) { /* compiled code */ }

    public int x() { /* compiled code */ }

    public int y() { /* compiled code */ }
}
```

除了用final修饰class以及每个字段外，编译器还自动为我们创建了构造方法，和字段名同名的方法，以及覆写toString()、equals()和hashCode()方法。

换句话说，使用record关键字，可以一行写出一个不变类。和enum类似，我们自己不能直接从Record派生，只能通过record关键字由编译器实现继承。

### 构造方法

编译器默认按照record声明的变量顺序自动创建一个构造方法，并在方法内给字段赋值。那么问题来了，如果我们要检查参数，应该怎么办？

假设Point类的x、y不允许负数，我们就得给Point的构造方法加上检查逻辑：

```java
public record Point(int x, int y) {
    public Point {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException();
        }
    }
}
```

注意到方法 `public Point {...}` 被称为Compact Constructor，它的目的是让我们编写检查逻辑，编译器最终生成的构造方法如下：

```java
public final class Point extends Record {
    public Point(int x, int y) {
        // 这是我们编写的Compact Constructor:
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException();
        }
        // 这是编译器继续生成的赋值代码:
        this.x = x;
        this.y = y;
    }
    ...
}
```

作为record的Point仍然可以添加静态方法。一种常用的静态方法是of()方法，用来创建Point：

```java
public record Point(int x, int y) {
    public static Point of() {
        return new Point(0, 0);
    }
    public static Point of(int x, int y) {
        return new Point(x, y);
    }
}
```

这样我们可以写出更简洁的代码：

```java
var z = Point.of();
var p = Point.of(123, 456);
```

### 小结

从Java 14开始，提供新的record关键字，可以非常方便地定义Data Class：

- 使用record定义的是不变类；
- 可以编写Compact Constructor对参数进行验证；
- 可以定义静态方法。

## BigInteger

### BigInteger

在Java中，由CPU原生提供的整型最大范围是64位long型整数。使用long型整数可以直接通过CPU指令进行计算，速度非常快。

如果我们使用的整数范围超过了long型怎么办？这个时候，就只能用软件来模拟一个大整数。java.math.BigInteger就是用来表示任意大小的整数。BigInteger内部用一个int[]数组来模拟一个非常大的整数：

```java
BigInteger bi = new BigInteger("1234567890");
System.out.println(bi.pow(5)); // 2867971860299718107233761438093672048294900000
```

对BigInteger做运算的时候，只能使用实例方法，例如，加法运算：

```java
BigInteger i1 = new BigInteger("1234567890");
BigInteger i2 = new BigInteger("12345678901234567890");
BigInteger sum = i1.add(i2); // 12345678902469135780
```

和long型整数运算比，BigInteger不会有范围限制，但缺点是速度比较慢。

也可以把BigInteger转换成long型：

```java
BigInteger i = new BigInteger("123456789000");
System.out.println(i.longValue()); // 123456789000
System.out.println(i.multiply(i).longValueExact()); // java.lang.ArithmeticException: BigInteger out of long range
```

使用longValueExact()方法时，如果超出了long型的范围，会抛出ArithmeticException。

BigInteger和Integer、Long一样，也是不可变类，并且也继承自Number类。因为Number定义了转换为基本类型的几个方法：

- 转换为byte：byteValue()
- 转换为short：shortValue()
- 转换为int：intValue()
- 转换为long：longValue()
- 转换为float：floatValue()
- 转换为double：doubleValue()

因此，通过上述方法，可以把BigInteger转换成基本类型。如果BigInteger表示的范围超过了基本类型的范围，转换时将丢失高位信息，即结果不一定是准确的。如果需要准确地转换成基本类型，可以使用intValueExact()、longValueExact()等方法，在转换时如果超出范围，将直接抛出ArithmeticException异常。

如果BigInteger的值甚至超过了float的最大范围（3.4x1038），那么返回的float是什么呢？

```java
// BigInteger to float
import java.math.BigInteger;
public class Main {
    public static void main(String[] args) {
        BigInteger n = new BigInteger("999999").pow(99);
        float f = n.floatValue();
        System.out.println(f);
    }
}
```

- BigInteger用于表示任意大小的整数；
- BigInteger是不变类，并且继承自Number；
- 将BigInteger转换成基本类型时可使用longValueExact()等方法保证结果准确。

## BigDecimal

和 BigInteger 类似，BigDecimal可以表示一个任意大小且精度完全准确的浮点数。

```java
BigDecimal bd = new BigDecimal("123.4567");
System.out.println(bd.multiply(bd)); // 15241.55677489
```

BigDecimal用scale()表示小数位数，例如：

```java
BigDecimal d1 = new BigDecimal("123.45");
BigDecimal d3 = new BigDecimal("1234500");
System.out.println(d1.scale()); // 2,两位小数
System.out.println(d3.scale()); // 0
```

通过BigDecimal的stripTrailingZeros()方法，可以将一个BigDecimal格式化为一个相等的，但去掉了末尾0的BigDecimal：

```java
BigDecimal d1 = new BigDecimal("123.4500");
BigDecimal d2 = d1.stripTrailingZeros();
System.out.println(d1.scale()); // 4
System.out.println(d2.scale()); // 2,因为去掉了00

BigDecimal d3 = new BigDecimal("1234500");
BigDecimal d4 = d3.stripTrailingZeros();
System.out.println(d3.scale()); // 0
System.out.println(d4.scale()); // -2
```

如果一个BigDecimal的scale()返回负数，例如，-2，表示这个数是个整数，并且末尾有2个0。

可以对一个BigDecimal设置它的scale，如果精度比原始值低，那么按照指定的方法进行四舍五入或者直接截断：

```java
import java.math.BigDecimal;
import java.math.RoundingMode;
public class Main {
    public static void main(String[] args) {
        BigDecimal d1 = new BigDecimal("123.456789");
        BigDecimal d2 = d1.setScale(4, RoundingMode.HALF_UP); // 四舍五入，123.4568
        BigDecimal d3 = d1.setScale(4, RoundingMode.DOWN); // 直接截断，123.4567
        System.out.println(d2);
        System.out.println(d3);
    }
}
```

对BigDecimal做加、减、乘时，精度不会丢失，但是做除法时，存在无法除尽的情况，这时，就必须指定精度以及如何进行截断：

```java
BigDecimal d1 = new BigDecimal("123.456");
BigDecimal d2 = new BigDecimal("23.456789");
BigDecimal d3 = d1.divide(d2, 10, RoundingMode.HALF_UP); // 保留10位小数并四舍五入
BigDecimal d4 = d1.divide(d2); // 报错：ArithmeticException，因为除不尽
```

还可以对BigDecimal做除法的同时求余数：

```java
import java.math.BigDecimal;
public class Main {
    public static void main(String[] args) {
        BigDecimal n = new BigDecimal("12.345");
        BigDecimal m = new BigDecimal("0.12");
        BigDecimal[] dr = n.divideAndRemainder(m);
        System.out.println(dr[0]); // 102
        System.out.println(dr[1]); // 0.105
    }
}
```

调用divideAndRemainder()方法时，返回的数组包含两个BigDecimal，分别是商和余数，其中商总是整数，余数不会大于除数。我们可以利用这个方法判断两个BigDecimal是否是整数倍数：

```java
BigDecimal n = new BigDecimal("12.75");
BigDecimal m = new BigDecimal("0.15");
BigDecimal[] dr = n.divideAndRemainder(m);
if (dr[1].signum() == 0) {
    // n是m的整数倍
}
```

### 比较BigDecimal

在比较两个BigDecimal的值是否相等时，要特别注意，使用equals()方法不但要求两个BigDecimal的值相等，还要求它们的scale()相等：

```java
BigDecimal d1 = new BigDecimal("123.456");
BigDecimal d2 = new BigDecimal("123.45600");
System.out.println(d1.equals(d2)); // false,因为scale不同
System.out.println(d1.equals(d2.stripTrailingZeros())); // true,因为d2去除尾部0后scale变为2
System.out.println(d1.compareTo(d2)); // 0
```

必须使用compareTo()方法来比较，它根据两个值的大小分别返回负数、正数和0，分别表示小于、大于和等于。

>总是使用compareTo()比较两个BigDecimal的值，不要使用equals()！

如果查看BigDecimal的源码，可以发现，实际上一个BigDecimal是通过一个BigInteger和一个scale来表示的，即BigInteger表示一个完整的整数，而scale表示小数位数：

```java
public class BigDecimal extends Number implements Comparable<BigDecimal> {
    private final BigInteger intVal;
    private final int scale;
}
```

BigDecimal也是从Number继承的，也是不可变对象。

### 小结

- BigDecimal用于表示精确的小数，常用于财务计算；
- 比较BigDecimal的值是否相等，必须使用compareTo()而不能使用equals()。

## 常用工具类

Java的核心库提供了大量的现成的类供我们使用。本节我们介绍几个常用的工具类。

### Math

顾名思义，Math类就是用来进行数学计算的，它提供了大量的静态方法来便于我们实现数学计算：

求绝对值：

```java
Math.abs(-100); // 100
Math.abs(-7.8); // 7.8
```

取最大或最小值：

```java
Math.max(100, 99); // 100
Math.min(1.2, 2.3); // 1.2
```

计算xy次方：

```java
Math.pow(2, 10); // 2的10次方=1024
```

计算√x：

```java
Math.sqrt(2); // 1.414...
```

计算ex次方：

```java
Math.exp(2); // 7.389...
```

计算以e为底的对数：

```java
Math.log(4); // 1.386...
```

计算以10为底的对数：

```java
Math.log10(100); // 2
```

三角函数：

```java
Math.sin(3.14); // 0.00159...
Math.cos(3.14); // -0.9999...
Math.tan(3.14); // -0.0015...
Math.asin(1.0); // 1.57079...
Math.acos(1.0); // 0.0
```

Math还提供了几个数学常量：

```java
double pi = Math.PI; // 3.14159...
double e = Math.E; // 2.7182818...
Math.sin(Math.PI / 6); // sin(π/6) = 0.5
```

生成一个随机数x，x的范围是0 <= x < 1：

```java
Math.random(); // 0.53907... 每次都不一样
```

如果我们要生成一个区间在 `[MIN, MAX)` 的随机数，可以借助 `Math.random()` 实现，计算如下：

```java
// 区间在[MIN, MAX)的随机数
public class Main {
    public static void main(String[] args) {
        double x = Math.random(); // x的范围是[0,1)
        double min = 10;
        double max = 50;
        double y = x * (max - min) + min; // y的范围是[10,50)
        long n = (long) y; // n的范围是[10,50)的整数
        System.out.println(y);
        System.out.println(n);
    }
}
```

有些童鞋可能注意到Java标准库还提供了一个StrictMath，它提供了和Math几乎一模一样的方法。这两个类的区别在于，由于浮点数计算存在误差，不同的平台（例如x86和ARM）计算的结果可能不一致（指误差不同），因此，StrictMath保证所有平台计算结果都是完全相同的，而Math会尽量针对平台优化计算速度，所以，绝大多数情况下，使用Math就足够了。

### Random

Random用来创建伪随机数。所谓伪随机数，是指只要给定一个初始的种子，产生的随机数序列是完全一样的。

要生成一个随机数，可以使用nextInt()、nextLong()、nextFloat()、nextDouble()：

```java
Random r = new Random();
r.nextInt(); // 2071575453,每次都不一样
r.nextInt(10); // 5,生成一个[0,10)之间的int
r.nextLong(); // 8811649292570369305,每次都不一样
r.nextFloat(); // 0.54335...生成一个[0,1)之间的float
r.nextDouble(); // 0.3716...生成一个[0,1)之间的double
```

有童鞋问，每次运行程序，生成的随机数都是不同的，没看出伪随机数的特性来。

这是因为我们创建Random实例时，如果不给定种子，就使用系统当前时间戳作为种子，因此每次运行时，种子不同，得到的伪随机数序列就不同。

如果我们在创建Random实例时指定一个种子，就会得到完全确定的随机数序列：

```java
import java.util.Random;
public class Main {
    public static void main(String[] args) {
        Random r = new Random(12345);
        for (int i = 0; i < 10; i++) {
            System.out.println(r.nextInt(100));
        }
        // 51, 80, 41, 28, 55...
    }
}
```

前面我们使用的Math.random()实际上内部调用了Random类，所以它也是伪随机数，只是我们无法指定种子。

### SecureRandom

有伪随机数，就有真随机数。实际上真正的真随机数只能通过量子力学原理来获取，而我们想要的是一个不可预测的安全的随机数，SecureRandom就是用来创建安全的随机数的：

```java
SecureRandom sr = new SecureRandom();
System.out.println(sr.nextInt(100));
```

SecureRandom无法指定种子，它使用RNG（random number generator）算法。JDK的SecureRandom实际上有多种不同的底层实现，有的使用安全随机种子加上伪随机数算法来产生安全的随机数，有的使用真正的随机数生成器。实际使用的时候，可以优先获取高强度的安全随机数生成器，如果没有提供，再使用普通等级的安全随机数生成器：

```java
import java.util.Arrays;
import java.security.SecureRandom;
import java.security.NoSuchAlgorithmException;
public class Main {
    public static void main(String[] args) {
        SecureRandom sr = null;
        try {
            sr = SecureRandom.getInstanceStrong(); // 获取高强度安全随机数生成器
        } catch (NoSuchAlgorithmException e) {
            sr = new SecureRandom(); // 获取普通的安全随机数生成器
        }
        byte[] buffer = new byte[16];
        sr.nextBytes(buffer); // 用安全随机数填充buffer
        System.out.println(Arrays.toString(buffer));
    }
}
```

SecureRandom的安全性是通过操作系统提供的安全的随机种子来生成随机数。这个种子是通过CPU的热噪声、读写磁盘的字节、网络流量等各种随机事件产生的“熵”。

在密码学中，安全的随机数非常重要。如果使用不安全的伪随机数，所有加密体系都将被攻破。因此，时刻牢记必须使用SecureRandom来产生安全的随机数。

需要使用安全随机数的时候，必须使用SecureRandom，绝不能使用Random！

### 小结

Java提供的常用工具类有：

- Math：数学计算
- Random：生成伪随机数
- SecureRandom：生成安全的随机数

