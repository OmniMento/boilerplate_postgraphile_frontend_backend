const path = require('path');
const { getThemeVariables } = require('antd/dist/theme');
require('dotenv').config();

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            ['import', {
                                "libraryName": "antd",
                                "libraryDirectory": "es",
                                "style": true
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [{
                loader: 'style-loader',
                }, {
                loader: 'css-loader', // translates CSS into CommonJS
                }, {
                loader: 'less-loader', // compiles Less to CSS
                 options: {
                   lessOptions: {
                     modifyVars: getThemeVariables({
                       dark: true,
                     }),
                     javascriptEnabled: true,
                   },
                 },
                }],
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL)
        }),
        new HtmlWebpackPlugin({
            title: require('./package.json').title,
            template: path.resolve(__dirname, 'src/index.html')
        })
    ],
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0'
      }
}