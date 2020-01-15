---
title: VSCode 快捷键
---

# 常用快捷键
## 通用
- 命令框： `Ctrl + P`
    - 主命令框：`>` 。或 `F1` 或 `Ctrl + Shift + P`
    - 搜索文件：直接输入文件名
    - 帮助：`?`
    - 跳转到行数：`:` 或 `Ctrl + G`
    - 跳转到symbol：`@` 或 `Ctrl + Shift + O`
    - 根据名字查找symbol：`#` 或 `Ctrl + T`
- 字号调整：`Ctrl + -/+`
- 撤回/重做：`Ctrl + Z/Y`
- 撤销光标操作：`Ctrl + U`
- 后退/前进：`Alt + ←/→`

## 窗口管理
- 打开一个新窗口： `Ctrl + Shift + N`
- 关闭窗口： `Ctrl + Shift + W`
- 打开对照窗口：查看 diff： 在 explorer 里，选择文件右键 `Set file tocompare`，然后需要对比的文件上右键选择 `Compare with file_name_you_chose`

## 视图设置
- 全屏：`F11`
- 菜单栏：`Alt`
- 沉浸式编辑环境：`Ctrl + K Z`
- 预览Markdown页面：`Ctrl + K V`(open to the side) 或 `Ctrl + Shift + V`
- 编辑器：
    - 新建编辑器：`Ctrl + \`
    - 切换编辑器：`Ctrl + <num>`
    - 移动编辑器：`Ctrl + K ←/→`
    - 页面滚动（光标不动）：`Ctrl + ↑/↓`
    - 收起/展开Region：`Ctrl + Shift + [/]`

## 导航管理
- 打开/关闭导航：`Ctrl + B`
- Explorer：`Ctrl + Shift + E`
- Extentions：`Ctrl + Shift + X`
- Search：`Ctrl + Shift + F`
- Search & Replace:`Ctrl + Shift + H`
- Search Deatials：`Ctrl + Shift + J`
- Git：`Ctrl + Shift + G`
- Debug：`Ctrl + Shift + D`
- Output：`Ctrl + Shift + U`
- Terminal：Ctrl + \` (同时按住`Shift`建立新终端)

## 文件管理
- 新建文件：`Ctrl + N`
- 打开文件：`Ctrl + O`
- 保存文件：`Ctrl + S`
- 另存为：`Ctrl + Shift + S`
- 保存全部：`Ctrl + K S`
- 关闭文件：`Ctrl + F4`
- 关闭全部：`Ctrl + K Ctrl + W`
- 打开刚关闭的文件：`Ctrl + Shift + T`
- 切换上/下一个文件：`Ctrl + PgUp/PgDn` 或 `Ctrl + [Shift] + Tab`

## 编辑代码
- 整行操作：
    - 复制/剪切：`Ctrl + C/X`
    - 移动：`Alt + ↑/↓`
    - 整行复制粘贴：`Shift + Alt + ↑/↓`
    - 删除行：`Ctrl + Shift + K`
- 缩进（支持多行）：`Ctrl + [/]`
- 代码格式化：`Shift + Alt + F` 或 `Ctrl + K  Ctrl + F` 或 `Ctrl + Shift + P` (打开主命令框) `format code`
- 在当前行上/下一行插入：`Ctrl + Shift + Enter` / `Ctrl + Enter`
- 移动光标：
    - 行首/行尾：`Home/End`
    - 文章开头/结尾：`Ctrl + Home/End`
    - 移动到上/下一个关键词：`Ctrl + ←/→`
- 选择文本：
    - 选择当前行：`Ctrl + I`
    - 选择到行首/行尾：`Shift + Home/End`
    - 选择到文件开头/结尾：`Ctrl + Shift + Home/End`
    - 扩大/缩写选择范围：`Shift + Alt + →/←`
- 多处编辑：
    - 多处编辑：`Alt + 左键`
    - 多行同列编辑：`Shift + Alt + 左键`
    - 多行同列编辑（到页首/页尾）：`Shift + Alt + PgUp/PgDn`
    - 从所选多行行尾处开始编辑：`Shift + Alt + I`
    - 同时选中所有匹配：`Ctrl + Shift + L`
    - 选择下一个匹配：`Ctrl + D`
    - 跳过下一个匹配：`Ctrl + K  Ctrl + D`
- 注释/取消注释
    - 多行注释（根据文件格式形成注释，可多行操作）：`Ctrl + /`
    - 注释块：`Shift + Alt + A`
- 更改文件语言（不改变格式）：`Ctrl + K M`

## 查找与替换
- 查找： `Ctrl + F`
- 查找替换： `Ctrl+H`
- 整个文件夹中查找 `Ctrl+Shift+F`

## Debug
- 开始：`F5`
- 结束：`Shift + F5`
- 断点：
    - 设置/取消断点：`F9`
    - 继续：`F5`
    - Step Over：`F10`
    - Step Into/Out：`F11/Shift + F11`

## 自定义
`Alt + F P K`


# 参考
- [VSCode快捷键文档](https://code.visualstudio.com/docs/getstarted/keybindings)
- [VSCode快捷键概览](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
- [vscode: Visual Studio Code 常用快捷键](https://lzw.me/a/vscode-visual-studio-code-shortcut.html)
