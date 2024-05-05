const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
    entry: {
        vendor: './apps/vendor/main.js',
        app: './apps/swio/main.js',
    },
    output: {
        filename: 'scripts/[name].bundle.[hash].js',
        path: path.resolve(__dirname, '../dist/app'),
    },
    plugins: [
        new CleanWebpackPlugin(['dist/app'], { root: projectRoot }),

        // Main app
        new HtmlWebpackPlugin({
            chunks: ['commons', 'vendor', 'app'],
            template: 'apps/shared/pages/index.html',
        }),

        new CopyWebpackPlugin([
            {
                from: 'apps/shared/assets',
                to: 'assets',
            },
            {
                from: 'apps/swio/themes/*.css',
                to: 'themes/[name].[ext]',
                toType: 'template',
            },
            {
                from: 'apps/swio/favicons/*.*',
                to: '[name].[ext]',
            },
            {
                from: 'apps/shared/scripts/*.*',
                to: 'scripts/[name].[ext]',
            },
        ]),
        new CommonsChunkPlugin({
            name: 'commons',
            filename: 'scripts/commons.[hash].js',
        }),
        // new CommonsChunkPlugin({
        //   name: "vendor",
        //   minChunks: Infinity
        // }),
        new ExtractTextPlugin('styles/main.[contenthash].css'),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(md|markdown)$/,
                use: [
                    {
                        loader: 'raw-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
};
