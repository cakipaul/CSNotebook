# java io 之 stream

- [Java 基础之详解 Java IO](https://www.cnblogs.com/CQqf/p/10795656.html)

Java IO：即 Java 输入 / 输出系统。

区分 Java 的输入和输出：把自己当成程序， 当你从外边读数据到自己这里就用输入（InputStream/Reader）， 向外边写数据就用输出（OutputStream/Writer）。

Stream：Java 中将数据的输入输出抽象为流，流是一组有顺序的，单向的，有起点和终点的数据集合，就像水流。按照流中的最小数据单元又分为字节流和字符流。

1，字节流：以 8 位（即 1 byte，8 bit）作为一个数据单元，数据流中最小的数据单元是字节。

2，字符流：以 16 位（即 1 char，2 byte，16 bit）作为一个数据单元，数据流中最小的数据单元是字符， Java 中的字符是 Unicode 编码，一个字符占用两个字节。

![io-stream](/csnotes/java/JavaWeb/io/io-stream.jpg)

Java 的 IO 主要包含两个部分：

1、流式部分：是 IO 的主体部分，也是本文介绍的重点， 流式部分根据流向分为输入流（InputStream/Reader）和输出流（OutputStream/Writer）， 根据数据不同的操作单元，分为字节流（InputStream/OutputStream）和字符流（Reader/Writer），依据字节流和字符流，Java 定义了用来操作数据的抽象基类InputStream/OutputStream 和 Reader/Writer，再根据不同应用场景（或功能），在这两种抽象基类上基于数据载体或功能派上出很多子类，用来满足文件，网络，管道等不同场景的 IO 需求，从而形成了 Java 的基本 IO 体系。

下面是 Java IO 体系中常用的流类：

![stream-and-reader-writer](/csnotes/java/JavaWeb/io/stream-and-reader-writer.jpg)

2、非流式部分：主要包含一些辅助流式部分的类，如： SerializablePermission 类、File 类、RandomAccessFile 类和 FileDescriptor 等；

## 节点流和处理流

Java io 分类方式有很多，根据是否直接处理数据，Java io又分为节点流和处理流，节点流是真正直接处理数据的；处理流是装饰加工节点流的。

### 节点流

- 文件流：FileInputStream，FileOutputStrean，FileReader，FileWriter，它们都会直接操作文件，直接与 OS 底层交互。因此他们被称为节点流 ，注意：使用这几个流的对象之后，需要关闭流对象，因为 java 垃圾回收器不会主动回收。不过在 Java7 之后，可以在 try() 括号中打开流，最后程序会自动关闭流对象，不再需要显示地 close。
- 数组流：ByteArrayInputStream，ByteArrayOutputStream，CharArrayReader，CharArrayWriter，对数组进行处理的节点流。
- 字符串流：StringReader，StringWriter，其中 StringReader 能从 String 中读取数据并保存到 char 数组。
- 管道流：PipedInputStream，PipedOutputStream，PipedReader，PipedWrite，对管道进行处理的节点流。

### 处理流

对一个已存在的流的连接和封装，通过所封装的流的功能调用实现数据读写。如 BufferedReader。

处理流的构造方法总是要带一个其他的流对象做参数。

常用处理流（通过关闭处理流里面的节点流来关闭处理流）

- 缓冲流 ：BufferedImputStream，BufferedOutputStream，BufferedReader ，BufferedWriter，需要父类作为参数构造，增加缓冲功能，避免频繁读写硬盘，可以初始化缓冲数据的大小，由于带了缓冲功能，所以就写数据的时候需要使用 flush 方法，另外，BufferedReader 提供一个 readLine( ) 方法可以读取一行，而 FileInputStream 和 FileReader 只能读取一个字节或者一个字符，因此 BufferedReader 也被称为行读取器。
- 转换流：InputStreamReader，OutputStreamWriter，要 inputStream 或 OutputStream 作为参数，实现从字节流到字符流的转换，我们经常在读取键盘输入（System.in）或网络通信的时候，需要使用这两个类。
- 数据流：DataInputStream，DataOutputStream，提供将基础数据类型写入到文件中，或者读取出来。

## 字节流

### 字节输入流

InputStream 是所有的输入字节流的父类，它是一个抽象类。

PushbackInputStream、DataInputStream 和 BufferedInputStream 都是处理流，他们的的父类是 FilterInputStream。

ByteArrayInputStream、StringBufferInputStream、FileInputStream 是三种基本的介质流，它们分别从 Byte 数组、StringBuffer、和本地文件中读取数据。PipedInputStream 是从与其它线程共用的管道中读取数据。

InputStream 中的三个基本的读方法

- abstract int read() ：读取一个字节数据，并返回读到的数据，如果返回 -1，表示读到了输入流的末尾。
- int read(byte[] b) ：将数据读入一个字节数组，同时返回实际读取的字节数。如果返回-1，表示读到了输入流的末尾。
- int read(byte[] b, int off, int len) ：将数据读入一个字节数组，同时返回实际读取的字节数。如果返回 -1，表示读到了输入流的末尾。off 指定在数组 b 中存放数据的起始偏移位置；len 指定读取的最大字节数。

### 字节输出流

OutputStream 是所有的输出字节流的父类，它是一个抽象类。

ByteArrayOutputStream、FileOutputStream 是两种基本的介质流，它们分别向 Byte 数组、和本地文件中写入数据。

PipedOutputStream 是向与其它线程共用的管道中写入数据。

BufferedOutputStream、DataOutputStream 和 PrintStream 都是处理流，他们的的父类是 FilterOutputStream。

outputStream中的三个基本的写方法

- abstract void write(int b)：往输出流中写入一个字节。
- void write(byte[] b) ：往输出流中写入数组b中的所有字节。
- void write(byte[] b, int?off, int?len) ：往输出流中写入数组 b 中从偏移量 off 开始的 len 个字节的数据。

其它重要方法：

- void flush() ：刷新输出流，强制缓冲区中的输出字节被写出。
- void close() ：关闭输出流，释放和这个流相关的系统资源。

### 字节流的输入与输出的对应

java io 的输入和输出是高度对应的，我们主要看看这些字节流中不对称的几个类：

PushbackInputStream 为另一个输入流添加性能，即 “ 推回（push back）” 或 “ 取消读取（unread）” 一个字节的能力。

SequenceInputStream 可以认为是一个工具类，将两个或者多个输入流当成一个输入流依次读取。完全可以从 IO 包中去除，还完全不影响 IO 包的结构。

PrintStream 也可以认为是一个辅助工具。主要可以向其他输出流，或者 FileInputStream 写入数据，本身内部实现还是带缓冲的。本质上是对其它流的综合运用的一个工具而已。一样可以从 IO 包中去除！System.io 和 System.out 就是 PrintStream 的实例！

StringBufferInputStream 和 StringBufferInputStream 已经过时，还允许它存在只是为了保持版本的向下兼容而已。

搭配使用的三对类： ObjectInputStream / ObjectOutputStream 和 DataInputStream / DataOutputStream 主要是要求写对象/数据和读对象 / 数据的次序要保持一致，否则可能不能得到正确的数据，甚至抛出异常（一般会如此）；PipedInputStream / PipedOutputStream 在创建时一般就一起创建，调用它们的读写方法时会检查对方是否存在，或者关闭！

## 字符流

### 字符输入流 Reader

Reader 是所有的输入字符流的父类，它是一个抽象类。

CharReader、StringReader 是两种基本的介质流，它们分别将 Char 数组、String 中读取数据。PipedReader 是从与其它线程共用的管道中读取数据。

BufferedReader 很明显就是一个装饰器，它和其子类负责装饰其它 Reader 对象。

FilterReader 是所有自定义具体装饰流的父类，其子类 PushbackReader 对 Reader 对象进行装饰，会增加一个行号。

InputStreamReader 是一个连接字节流和字符流的桥梁，它将字节流转变为字符流。

Reader 基本的三个读方法（和字节流对应）：

(1) public int read() throws IOException; 读取一个字符，返回值为读取的字符。

(2) public int read(char cbuf[]) throws IOException; 读取一系列字符到数组 cbuf[]中，返回值为实际读取的字符的数量。

(3) public abstract int read(char cbuf[],int off,int len) throws IOException; 读取 len 个字符，从数组 cbuf[] 的下标 off 处开始存放，返回值为实际读取的字符数量，该方法必须由子类实现。

### 字符输出流 Writer

Writer 是所有的输出字符流的父类，它是一个抽象类。

CharArrayWriter、StringWriter 是两种基本的介质流，它们分别向 Char 数组、String 中写入数据。PipedWriter 是向与其它线程共用的管道中写入数据。

BufferedWriter 是一个装饰器为 Writer 提供缓冲功能。

PrintWriter 和 PrintStream 极其类似，功能和使用也非常相似。

OutputStreamWriter 是 OutputStream 到 Writer 转换的桥梁，它的子类 FileWriter 其实就是一个实现此功能的具体类。

writer 的主要写方法：

- public void write(int c) throws IOException； //写单个字符
- public void write(char cbuf[]) throws IOException； //将字符数组 cbuf[] 写到输出流 。
- public abstract void write(char cbuf[],int off,int len) throws IOException； //将字符数组cbuf[]中的从索引为off的位置处开始的len个字符写入输出流 。
- public void write(String str) throws IOException； //将字符串str中的字符写入输出流 。
- public void write(String str,int off,int len) throws IOException； //将字符串 str 中从索引 off 开始处的 len 个字符写入输出流 。

## Java IO 常见用法

### 读取键盘输入

在刷题网站刷算法题的时候，在程序开头都需要和键盘进行交互，常常用到行夺取器 BufferedReader 和转换流 InputStreamReader。

```java
public static void keyInAndPrintConsole() throws IOException {
    try(
        PrintWriter out = new PrintWriter(System.out, true);
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    ){
        System.out.println("请输入:");
        String line = null;
        while ((line = br.readLine()) != null) {
            if (line.equals("exit")) {
                System.exit(1);
            }
            out.println(line);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

### 字节流读写文件

因为是用字节流来读媒介，所以对应的流是 InputStream 和 OutputStream，并且媒介对象是文件，所以用到子类是 FileInputStream 和 FileOutputStream，这里还可以通过 BufferedInputStream 用缓冲流来读取文件。

```java
public static void readAndWriteByteToFile() throws IOException {
    InputStream is =null;
    OutputStream os = null;
    try {
        is = new FileInputStream("D:/FileInputStreamTest.txt");
        os = new FileOutputStream("D:/FileOutputStreamTest.txt");
        byte[] buf = new byte[4];
        int hasRead = 0;
        while ((hasRead = is.read(buf)) > 0) {
            os.write(buf, 0, hasRead);
        }
        System.out.println("write success");
    } catch (Exception e) {
        e.printStackTrace();
    }finally{
        os.close();
        is.close();
    }
}
```

### 用字符流进行读写操作

#### FileReader 和 FileWriter

```java
public static void readAndWriteCharToFile() throws IOException{
    Reader reader = null;
    Writer writer =null;
    try {
        File readFile = new File("d:/FileInputStreamTest.txt");
        reader = new FileReader(readFile);
        File writeFile = new File("d:/FileOutputStreamTest.txt");
        writer = new FileWriter(writeFile);
        char[] byteArray = new char[(int) readFile.length()];
        int size = reader.read(byteArray);
        System.out.println("大小:" + size + "个字符;内容:" + new String(byteArray));
        writer.write(byteArray);
    } catch (Exception e) {
        e.printStackTrace();
    }finally{
        reader.close();
        writer.close();
    }
}
```

#### StringReader 和 StringWriter

```java
public static void stringNode() throws IOException {
    StringReader sr =null;
    StringWriter sw =null;
    try {
        String str = "学习不刻苦" + "不如卖红薯;";
        char[] buf = new char[32];
        int hasRead = 0;
        // StringReader将以String字符串为节点读取数据
        sr = new StringReader(str);
        while ((hasRead = sr.read(buf)) > 0) {
            System.out.print(new String(buf, 0, hasRead));
        }
        // 由于String是一个不可变类，因此创建StringWriter时，实际上是以一个StringBuffer作为输出节点
        sw = new StringWriter();
        sw.write("黑夜给了我黑色的眼睛");
        sw.write("我却用它寻找光明");
        // toString()返回sw节点内的数据
        System.out.println(sw.toString());
    } catch (Exception e) {
        e.printStackTrace();
    }finally{
        sw.close();
        sr.close();
    }
}
```

### 字节流转换为字符流

在例 3 中用字符流读文件时，打印到控制台的中文会乱码，使用转换流可以解决这一问题。

```java
public static void convertByteToChar() throws IOException {
    InputStream is =null;
    Reader reader = null;
    try {
        File file = new File("d:/FileInputStreamTest.txt");
        is = new FileInputStream(file);
        reader = new InputStreamReader(is,"gbk");
        char[] byteArray = new char[(int) file.length()];
        int size = reader.read(byteArray);
        System.out.println("大小:" + size + ";内容:" + new String(byteArray));
    } catch (Exception e) {
        e.printStackTrace();
    }finally{
        reader.close();
        is.close();
    }
}
```

### 随机读写文件 使用 RandomAccessFile 可以实现对文件的随机读取，主要是通过 seek（） 方法实现指针偏移。

```java
public static void randomAccessFileReadAndWrite() throws IOException {
    RandomAccessFile randomAccessFile =null;
    try {
        // 创建一个RandomAccessFile对象
        randomAccessFile = new RandomAccessFile("d:/File.txt", "rw");
        // 通过seek方法来移动指针
        randomAccessFile.seek(10);
        // 获取当前指针
        long pointerBegin = randomAccessFile.getFilePointer();
        // 从当前指针开始读
        byte[] contents = new byte[10];
        randomAccessFile.read(contents);
        long pointerEnd = randomAccessFile.getFilePointer();
        System.out.println("pointerBegin:" + pointerBegin  + " pointerEnd:" + pointerEnd 
            + "\n" + new String(contents));
        randomAccessFile.seek(20);
        // 获取当前指针
        long begin = randomAccessFile.getFilePointer();
        randomAccessFile.write(contents);
        long end = randomAccessFile.getFilePointer();
        System.out.println("begin:" + begin + " end:" + end);
    } catch (Exception e) {
        e.printStackTrace();
    }finally{
        randomAccessFile.close();
    }
}
```

### 读写管道

管道流要成对使用

```java
public static void piped() throws IOException {
    final PipedOutputStream output = new PipedOutputStream();
    final PipedInputStream input = new PipedInputStream(output);
    Thread thread1 = new Thread(() -> {
        try {
            output.write("Hello world, pipe!".getBytes());
        } catch (IOException e) {
        }
    });
    Thread thread2 = new Thread(() -> {
        try {
            int data = input.read();
            while (data != -1) {
                System.out.print((char) data);
                data = input.read();
            }
        } catch (IOException e) {
        } finally {
            try {
                input.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    });
    thread1.start();
    thread2.start();
}
```

### 将多个输入流当成一个输入流依次读取

```java
public static void sequeue() throws IOException {
    FileInputStream fistream1 =null;
    FileInputStream fistream2 =null;
    SequenceInputStream sistream =null;
    FileOutputStream fostream =null;
    try {
        fistream1 = new FileInputStream("d:/A.txt");
        fistream2 = new FileInputStream("d:/B.txt");
        sistream = new SequenceInputStream(fistream1, fistream2);
        fostream = new FileOutputStream("d:/C.txt");
        int temp;
        while( ( temp = sistream.read() ) != -1) {
            System.out.print( (char) temp );
            fostream.write(temp);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }finally{
        fostream.close();
        sistream.close();
        fistream1.close();
        fistream2.close();
    }
}
```

### 推回输入流使用实例

```java
public static void pushback() throws FileNotFoundException, IOException {
    try (PushbackReader pr = new PushbackReader(new FileReader("D:/A.txt"), 64)) {
        char[] buf = new char[32];
        String lastContent = "";
        int hasRead = 0;
        while ((hasRead = pr.read(buf)) > 0) {
            String content = new String(buf, 0, hasRead);
            int targetIndex = 0;
            if ((targetIndex = (lastContent + content).indexOf("A")) > 0) {
                System.out.println(targetIndex);
                pr.unread((lastContent + content).toCharArray());
                if (targetIndex > 32) {
                    buf = new char[targetIndex];
                }
                pr.read(buf, 0, targetIndex);
                System.out.println(new String(buf, 0, targetIndex));
                System.out.println(new String(buf, targetIndex, buf.length - targetIndex));
                System.exit(0);
            } else {
                System.out.println(lastContent);
                lastContent = content;
            }
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

## Java IO 常见面试题

1、字节流和字符流的区别？

（1）读写单位不同：字节流以字节（8 bit）为单位，字符流以字符为单位，根据码表映射字符，一次可能读多个字节。

（2）处理对象不同：字节流能处理所有类型的数据（如图片、avi 等），而字符流只能处理字符类型的数据。

（3）字节流没有缓冲区，是直接输出的，而字符流是输出到缓冲区的。因此在输出时，字节流不调用 colse() 方法时，信息已经输出了，而字符流只有在调用 close() 方法关闭缓冲区时，信息才输出。要想字符流在未关闭时输出信息，则需要手动调用 flush() 方法。

2、什么是节点流，什么是处理流，它们各有什么用处，处理流的创建有什么特征？

见上文：节点流和处理流；

注意：处理流的构造器必须要 传入节点流的子类

3、什么叫对象序列化，什么是反序列化，实现对象序列化需要做哪些工作？

对象序列化：将对象以二进制的形式保存在硬盘上；

反序列化：将二进制的文件转化为对象读取；

实现 serializable 接口可以实现对象序列化，其中没有需要实现的方法，implements Serializable 只是为了标注该对象是可被序列化的。

例如，在 web 开发中，如果对象被保存在了 Session 中，tomcat 在重启时要把 Session 对象序列化到硬盘，这个对象就必须实现 Serializable 接口。如果对象要经过分布式系统进行网络传输，被传输的对象就必须实现 Serializable 接口。

4、什么是 Filter 流有哪些？

FilterStream 是一种 IO 流，主要作用是用来对存在的流增加一些额外的功能，像给目标文件增加源文件中不存在的行数，或者增加拷贝的性能等。在 java.io 包中主要由 4 个可用的 filter Stream。两个字节 filter stream，两个字符 filter stream.

分别是：FilterInputStream，FilterOutputStream，FilterReader and FilterWriter. 这些类是抽象类，不能被实例化的。

FilterInputStream 流的子类：

DataInputStream 可以把包括基本类型在内的数据和字符串按顺序从数据源读入，它有一些特殊的方法如 readInt()，readDouble() 和 readLine() 等可以读取一个 int，double 和一个 string。

BufferedInputStream 增加性能。

PushbackInputStream 推送要求的字节到系统中。

注：其它子类见 Java io 分类图。

6、说说 RandomAccessFile?

它在 java.io 包中是一个特殊的类，既不是输入流也不是输出流，它两者都可以做到。他是 Object 的直接子类。通常来说，一个流只有一个功能，要么读，要么写。但是 RandomAccessFile 既可以读文件，也可以写文件。

而且 RandomAccessFile 支持对文件的随机访问，实例可见上文：例 5，随机读写文件。

总结

很多初学者刚刚学习 java 的 IO 时会比较茫然，确实 IO 类很多，不容易记忆，不过我们可以尝试对其进行总结记忆，把流式部分概括为：两对应一桥梁一随机。

- 两个对应指：字节流（Byte Stream）和字符流（Char Stream）的对应；输入和输出的对应。
- 一个桥梁指：从字节流到字符流的桥梁。对应于输入和输出为InputStreamReader和OutputStreamWriter；
- 一个随机是：RandomAccessFile。可以随机读取文件。