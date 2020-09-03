'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devtool: NODE_ENV == 'development' ? 'source-map' : null,
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                presets: ['es2015']
                }
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/public'
    }
};