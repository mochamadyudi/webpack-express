const path                      = require('path')
const MinifyPlugin              = require('babel-minify-webpack-plugin')
const BrowserSyncPlugin         = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin      = require('mini-css-extract-plugin')
const HtmlWebpackPlugin         = require('html-webpack-plugin')
const HtmlPartialWebpackPlugin  = require('html-webpack-partials-plugin')

module.exports = {
    context: path.resolve(__dirname,"src"),
    entry: {
        main: ['./sass/main.scss'],
        index:['./js/index.js'],
        advanced:['./js/profile/advanced.js'],
        profile:['./js/profile/profile.js'],
        profileResult:['./js/profile/result/result.js'],
        about:['./js/about.js'],
        company:['./js/company/index.js']
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname,'public'),
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            cacheGroups: {
                commons:{
                    test: /[\\/]node_modules[\\/]/,
                    name(module){
                        return module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    }
                }
            }
        }
    },
    module:{
        rules:[
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /.(scss|css)$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            esModule: true
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),

        new BrowserSyncPlugin({
            host:'localhost',
            port: 5005,
            proxy: 'http://localhost:5005/',
            files:[
                './src',
                '../views/index.html',
                '../views/profile/profile.html',
            ]
        }),

        new HtmlWebpackPlugin({
            template: "html/index.html",
            filename: "../views/index.html",
            minify: true,
            chunks: ['commons','index']
        }),

        new HtmlWebpackPlugin({
            template:"html/profile/advanced.html",
            filename: "../views/profile/advanced.html",
            minify:true,
            files:[
              './src',
              './routes'
            ],
            chunks: ['commons','profile_advanced']
        }),
        new HtmlWebpackPlugin({
            template:"html/profile/profile.html",
            filename: "../views/profile/profile.html",
            minify:true,
            files:[
                './src',
                './routes'
            ],
            chunks: ['commons','profile']
        }),
        new HtmlWebpackPlugin({
            template:"html/profile/result/index.html",
            filename: "../views/profile/result/index.html",
            minify:true,
            files:[
                './src',
                './routes'
            ],
            chunks: ['commons','profile_result']
        })

    ]
}