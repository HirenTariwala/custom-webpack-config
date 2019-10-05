const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*

----------IMPORT NOTES----------

path.resolve use for absolute path


Rules 
- It is array and it's each object have at-least 2 properties
- Module rules teach webpack what to do if it find file which import in some js

Plugins 
- create new instance
- It is used for minified things
- create new html file
- create new bundle css file

*/


module.exports = {
    entry: './src/index.js', // From where bundling start
    output: {
        filename: 'bundle.[contenthash].js', // Name final bundle file with hash and new file so no cache issue happen
        path: path.resolve(__dirname, './dist'), // Path where final bundle file put after process (__dirname use for current dir and second arg create dist folder in current dir)
        publicPath: '' // It is set which public path chhose for image and other imported file
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/, // It is handle and teach webpack when find .png or .jpg file import on any js
                use: [ 'file-loader' ] // file-loader handle all .png and .jpg file
            }, 
            {
                test: /\.css$/, // It is handle and teach webpack when find .css file import on any js
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ] // style-loader and css-loader handle all .css
            }, 
            {
                test: /\.scss$/, // It is handle and teach webpack when find .scss file import on any js
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }, 
            {
                test: /\.js$/, // It is handle all js accept node_modules 
                exclude: /node_modules/, // It exclude(remove) all node_module js file from this rule
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['transform-class-properties']
                    }
                }
            }
        ]   
    },
    plugins: [
        // it is minified our js
        new TerserPlugin(),
        // it is create style.css file inside dist instead of put all css in head section
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css' // create style with hash and new file so no cache issue happen
        }),
        // it is clean dist before create new bundles
        // it is clear other folder as well just provide absolute path
        // ex. cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'folder/**/*')],
        new CleanWebpackPlugin(),
        // it is create new html file every time
        new HtmlWebpackPlugin({
            title: "Custom Webpack Config Production" // it is change page title we can set meta as well
        })
    ]

}