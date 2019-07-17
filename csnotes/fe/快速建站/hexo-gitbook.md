# Hexo+GitBook

- 详细搭建指南：[Git-Node.js-Hexo-Gitbook环境搭建与使用指南](https://cs-blog.cakipaul.com/2019/01/07/Git-Node.js-Hexo-Gitbook%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E4%B8%8E%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/)

- 设计了手机端更新Hexo博客与Gitbook的软件构想，但实际上手机编辑markdown文章并更新博客的功能有些鸡肋，权当是个脑洞吧：[手机端更新Hexo博客与Gitbook的软件构想](https://cs-blog.cakipaul.com/2019/01/09/Android%E6%89%8B%E6%9C%BA%E7%AB%AF%E6%9B%B4%E6%96%B0Hexo%E5%8D%9A%E5%AE%A2%E4%B8%8EGitbook%E7%9A%84%E8%BD%AF%E4%BB%B6%E6%9E%84%E6%83%B3/)

## Hexo
- 基于hexo的material主题进行了自定义优化，并部署在了 blog.cakipaul.com 上: [Hexo-Material主题配置与常见操作](https://cs-blog.cakipaul.com/2019/01/16/Hexo-Material%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E4%B8%8E%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C/)

## GitBook
- 由于 [Gitbook](gitbook.com) 是境外网站，登陆、加载太慢，故考虑使用腾讯的Coding来发布gitbook：[使用coding的Pages服务发布Gitbook](https://cs-blog.cakipaul.com/2019/01/11/%E4%BD%BF%E7%94%A8coding%E7%9A%84Pages%E6%9C%8D%E5%8A%A1%E5%8F%91%E5%B8%83Gitbook/)

- 为例更便捷地更新gitbook，制作了一个更新脚本：[使用git与sh脚本在pages上托管与更新gitbook](https://cs-blog.cakipaul.com/2019/01/11/%E4%BD%BF%E7%94%A8git%E4%B8%8Esh%E8%84%9A%E6%9C%AC%E5%9C%A8pages%E4%B8%8A%E6%89%98%E7%AE%A1%E4%B8%8E%E6%9B%B4%E6%96%B0gitbook/)

- 经过更细致的规划，决定制作一系列的gitbook来记录自己的学习过程。为了便捷地进行部署，在上一条的基础上制作了一个更完善的shell脚本：[使用SHELL脚本批量部署gitbook页面](https://cs-blog.cakipaul.com/2019/01/12/%E4%BD%BF%E7%94%A8SHELL%E8%84%9A%E6%9C%AC%E6%89%B9%E9%87%8F%E9%83%A8%E7%BD%B2gitbook%E9%A1%B5%E9%9D%A2/)

## 升级日志
- 发现GitLab的CI/CD这一利器，果断花费一整天功夫将coding上的页面搬运到gitlab：[使用Gitlab集成发布Hexo+Gitbook](https://cs-blog.cakipaul.com/2019/01/21/使用Gitlab集成发布Hexo+Gitbook/)

- 总结了一个月来的网站的网站搭建史：[博客搭建小结：从wordpress到Hexo+Gitbook](https://cs-blog.cakipaul.com/2019/01/23/博客搭建小结-从wordpress到Hexo+Gitbook/)