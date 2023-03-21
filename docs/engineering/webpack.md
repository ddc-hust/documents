# Webpack

1. Webpack 本身功能是有限的:

   - 开发模式：仅能编译 JS 中的 `ES Module` 语法
   - 生产模式：能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

   

# 分割线

## 1. 什么是 Webpack？它的主要作用是什么？

>打包工具，优化打包的性能和体积

Webpack 是一个现代 JavaScript 应用程序的静态模块打包工具，可以将多个模块打包成一个或多个 bundle，可以自定义各种打包流程。Webpack 的主要作用是将项目中的多个文件打包成一个或多个 bundle，并优化打包过程中的性能和体积。

## 2.Webpack 的核心概念是什么？请详细解释每个概念的作用和使用方式

>entry、output、loader(处理非js文件)、plugin(插件)、mode(开发模式)

Webpack 的核心概念包括 Entry、Output、Loader、Plugin、Mode 等，具体解释如下：

- Entry：指定打包的入口文件，Webpack 会从入口文件开始分析项目的依赖关系。
- Output：指定打包后的输出文件的名称和路径，包括文件名、目录名和文件格式等。
- Loader：用于对非 JavaScript 文件进行转换，将其转换为可以被 Webpack 打包的模块。比如将 CSS、图片、字体等文件转换成 JavaScript 模块。
- Plugin：用于扩展 Webpack 的功能，可以对打包过程进行优化、压缩、错误处理等操作。比如使用 HtmlWebpackPlugin 可以生成 HTML 文件，使用 CleanWebpackPlugin 可以清空打包目录等。
- Mode：指定 Webpack 打包的模式，包括 development、production 和 none。development 模式下会开启一些优化手段来加快构建速度，而 production 模式下会开启更多的优化手段以减小打包后文件的体积

## 3. 请列举几个常用的 Loader 并说明它们的作用。

>转换文件成js文件

1. babel-loader：将 ES6/ES7/ES8 等新语法转换成 ES5 语法，使得在低版本浏览器中也能够运行。
2. css-loader：处理 CSS 文件，使得可以在 JavaScript 中 import CSS 文件，并且支持模块化和压缩等功能。
3. style-loader：将 CSS 代码注入到 HTML 页面中的 style 标签中。
4. url-loader/file-loader：用于处理图片、字体等静态资源文件，将它们转换为模块并在 bundle.js 文件中引用。
5. html-loader：用于处理 HTML 文件中的 img 标签的 src 属性，将其转换为 require 引入的形式。
6. less-loader/sass-loader：用于处理 less/sass 样式文件，将其转换为 CSS 文件。
7. vue-loader：用于处理 Vue.js 单文件组件，将其转换为 JavaScript 模块，包括编译模板、解析组件等过程。
8. json-loader：用于处理 JSON 文件，将其转换为 JavaScript 对象。

以上是一些常用的 Loader，但并不是全部。Webpack 的 Loader 生态非常丰富，开发者可以根据项目的需要自由选择并配置不同的 Loader。

## 4. 请列举几个常用的 Plugin 并说明它们的作用。

> plugin用于在打包过程中执行额外的操作，比如优化代码，生成html文件，拷贝静态文件等