const webpack = require('webpack');
const path = require('path');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'web',
    entry: {
        index: './src/client.jsx',
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        publicPath: '/dist/',
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    externals: {
        'React': 'react'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public\/)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            require('@babel/plugin-syntax-dynamic-import'),
                            require('@babel/plugin-proposal-class-properties'),
                            require('@babel/plugin-proposal-object-rest-spread'),
                            require('react-loadable/babel'),
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hot: process.env.NODE_ENV === 'development'
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: "[name].[ext]",
                    outputPath: "/images/"
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "/fonts/"
                        }
                    }
                ]
            }
        ],
    },
    optimization: {
        nodeEnv: 'development',
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2,
                },
                default: {
                    minChunks: 2,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new ReactLoadableSSRAddon({
            filename: 'react-loadable-ssr-addon.json',
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        })
    ],
};