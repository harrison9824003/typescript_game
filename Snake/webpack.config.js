// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有的配置信息都應該放在module.exports中
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",

    // mode
    // 指定webpack打包模式
    // 開發模式：development，打包速度快，方便調試
    // 生產模式：production，打包速度較慢，壓縮代碼，適合上線
    mode: "development",

    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包後文件的文件
        filename: "bundle.js",

        // 告訴 webpack 不使用箭頭
        environment:{
            arrowFunction: false,
            const: false
        }
    },

    // 指定webpack打包時要使用模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                test: /\.html$/,
                use: [
                  {
                    loader: 'html-loader',
                    options: {
                      sources: false, // Disable processing of `<img>` tags, if not needed
                    },
                  },
                ],
            },
            {
                // test 指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的 loader
                use: [
                     // 配置 babel
                     {
                         // 指定加载器
                         loader:"babel-loader",
                         // 设置 babel
                         options: {
                             // 设置预定義的环境
                             presets:[
                                 [
                                     // 指定還境的插件
                                     "@babel/preset-env",
                                     // 配置信息
                                     {
                                         // 要兼容的目标瀏覽器
                                         targets:{
                                             "chrome":"58",
                                             "ie":"11"
                                         },
                                         // 指定 corejs 的版本
                                         "corejs":"3",
                                         // 使用 corejs 的方式 "usage" 表示按需加载
                                         "useBuiltIns":"usage"
                                     }
                                 ]
                             ]
                         }
                     },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/
            },

            // 设置 less 文件的處理
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",

                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // 配置 Webpack 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一個自訂義的title"
            template: "./src/index.html"
        }),
    ],

    // 用来设置引用模塊
    resolve: {
        extensions: ['.ts', '.js']
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: {
            app: {
                name: 'chrome', // 指定浏览器
            },
        },
    },
};