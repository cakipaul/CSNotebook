import requests
import io
from urllib.parse import urlencode
from urllib.request import urlopen
from pyquery import PyQuery as pq
from skimage import io as s_io
from PIL import Image, ImageTk


attitudes_limit = 100
comments_limit = 20
reposts_limit = 20
total_pics = []

host = 'm.weibo.cn'
base_url = 'https://%s/api/container/getIndex?' % host
user_agent = 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/0.7.0 MicroMessenger/6.3.9 Language/zh_CN webview/0'

headers = {
    'Host': host,
    'Referer': 'https://m.weibo.cn/u/1665372775',
    'User-Agent': user_agent
}


# 按页数抓取数据
def get_single_page(page):
    params = {
        'type': 'uid',
        # 搞笑图片
        # 'value': 2432743515,
        # 'containerid': 1076032432743515,

        # 银教授
        'value': 1098618600,
        'containerid': 1076031098618600,
        'page': page
    }
    url = base_url + urlencode(params)
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
    except requests.ConnectionError as e:
        print('抓取错误', e.args)


# 解析页面返回的json数据
def parse_page(json):
    global total_pics
    items = json.get('data').get('cards')
    for item in items:
        item = item.get('mblog')
        if item:
            pics = []
            if item.get("pics"):
                pics = [p.get('large').get('url') for p in item.get("pics")]
                # for pic_url in pics:
                #     image = s_io.imread(pic_url)
                #     s_io.imshow(image)
                #     s_io.show()
            if item.get('attitudes_count') > attitudes_limit or item.get('comments_count') > comments_limit or item.get('reposts_count') > reposts_limit:
                data = {
                    # 'id': item.get('id'),
                    'content': pq(item.get("text")).text(),  # 仅提取内容中的文本
                    # 'attitudes': item.get('attitudes_count'),
                    # 'comments': item.get('comments_count'),
                    # 'reposts': item.get('reposts_count'),
                    # 'pics': pics  # 仅提取url
                }
                total_pics += pics
                yield data

# 存为文件


def output_pic(pics):
    # 测试用例
    # pics=['https://wx1.sinaimg.cn/large/005vp4nfgy1fj22m7ns4sg308c04kb29.gif']
    for img_src in pics:
        img_dir = './pics/'+img_src.split("/")[-1]
        # image = s_io.imread(img_src)
        # s_io.imshow(image)
        # s_io.imsave(img_dir, image)
        # s_io.show()

        # image_bytes = urlopen(img_src).read()
        # data_stream = io.BytesIO(image_bytes)
        # open as a PIL image object  
        # pil_image = Image.open(data_stream)
        # pil_image.show() #展示图片\

        img = requests.get(img_src) 
        f = open(img_dir,'ab') #存储图片，多媒体文件需要参数b（二进制文件）
        f.write(img.content) #多媒体存储content
        f.close()
        print(img_src+'  '+img_dir)

        

if __name__ == '__main__':
    index = 0
    for page in range(1, 3):  # 抓取前n页的数据
        json = get_single_page(page)
        results = parse_page(json)

        for result in results:
            # print(result)
            index += 1
            # print(str(index)+'. '+result.get("content")+"\n")
            print(result.get("content")+"\n")

    # save pics to local file
    # output_pic(total_pics)
