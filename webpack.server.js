const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    name: 'SSR',
    context: path.join(__dirname, 'src'),
    entry: ['./server.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle'),
        publicPath: '/bundle/'
    },
    target: 'node',
    externals: nodeExternals(),
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public\/)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                    },
                },
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        })
    ],
};