package main

// 导入格式化（fmt）、随机数（math/rand）、时间（time）包参与编译
import (
	"fmt"
	"math/rand"
	"time"
)

// 数据生产者
// 生产数据的函数，传入一个标记类型的字符串及一个只能写入的通道
func producer(header string, channel chan<- string) {
	// 无限循环, 不停地生产数据
	var num = 0
	for {
		// 将随机数和字符串格式化为字符串发送给通道
		// 使用 rand.Int31() 生成一个随机数，使用 fmt.Sprintf() 函数将 header 和随机数格式化为字符串
		channel <- fmt.Sprintf("%d %s: %v", num, header, rand.Int31())
		num++
		// 使用 time.Sleep() 函数暂停 1 秒再执行这个函数。如果在 goroutine 中执行时，暂停不会影响其他 goroutine 的执行
		time.Sleep(2 * time.Second)
	}
}

// 数据消费者，传入一个只能写入的通道
func customer(channel <-chan string) {
	// 不停地获取数据
	for {
		// 从通道中取出数据, 此处会阻塞直到信道中返回数据
		message := <-channel
		// 打印数据
		fmt.Println(message)
	}
}

//程序的入口函数，总是在程序开始时执行
func main() {
	// 实例化一个字符串类型的通道
	channel := make(chan string)
	// 并发执行一个生产者函数，两行分别创建了这个函数搭配不同参数的两个 goroutine
	go producer("cat", channel)
	go producer("dog", channel)
	// 数据消费函数
	customer(channel)
}
