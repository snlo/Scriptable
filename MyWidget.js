// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;

// 添加日志工具函数
const log = (message) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`)
}

// 添加主函数用于更好的错误处理
async function createWidget() {
    try {
        log("开始创建小组件")
        // 创建小组件
        let widget = new ListWidget()

        // 设置小组件背景色
        widget.backgroundColor = new Color("#ffffff")

        // 添加一些基础内容
        let titleText = widget.addText("我的小组件")
        titleText.font = Font.boldSystemFont(16)
        titleText.textColor = new Color("#000000")

        // 添加一些间距
        widget.addSpacer(8)

        // 添加其他文本
        let contentText = widget.addText("这里是内容")
        contentText.font = Font.systemFont(14)
        contentText.textColor = new Color("#666666")

        // 设置小组件刷新间隔（分钟）
        widget.refreshAfterDate = new Date(Date.now() + 1000 * 60 * 30)

        log("小组件创建完成")
        return widget
    } catch (error) {
        log(`错误: ${error.message}`)
        console.error(`创建小组件时发生错误：${error}`)

        // 创建错误提示小组件
        let errorWidget = new ListWidget()
        errorWidget.addText("加载失败")
        errorWidget.addText(error.message)
        return errorWidget
    }
}

// 运行小组件
async function run() {
    try {
        log("开始运行小组件")
        const widget = await createWidget()

        if (config.runsInWidget) {
            log("在小组件中运行")
            // 当脚本在小组件中运行时
            Script.setWidget(widget)
        } else {
            log("在应用中预览")
            // 当脚本在app中运行时，预览小组件
            await widget.presentMedium()
        }
        log("运行完成")
    } catch (error) {
        log(`运行时错误: ${error.message}`)
        console.error(error)
    }
}

// 主程序
log("脚本启动")
await run()
log("脚本结束")
Script.complete() 