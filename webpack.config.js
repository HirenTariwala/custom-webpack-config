const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/*

----------IMPORT NOTES----------

path.resolve use for absolute path


Rules 
- It is array and it's each object have atlist 2 properties
- Module rules teach webpack what to do if it find file which import in some js

Plugins 
- cerate new instance 
- It is used for minified things


*/


module.exports = {
    entry: './src/index.js', // From where bundling start
    output: {
        filename: 'bundle.js', // Name final bundle file
        path: path.resolve(__dirname, './dist'), // Path where final bundle file put after process (__dirname use for current dir and second arg create dist folder in current dir)
        publicPath: 'dist/' // It is set which public path chhose for image and other imported file
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/, // It is handle and teach webpack when find .png or .jpg file import on any js
                use: [ 'file-loader' ] // file-loader handle all .png and .jpg file
            }, 
            {
                test: /\.css$/, // It is handle and teach webpack when find .css file import on any js
                use: [ 'style-loader', 'css-loader' ] // style-loader and css-loader handle all .css
            }, 
            {
                test: /\.scss$/, // It is handle and teach webpack when find .scss file import on any js
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
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
        new TerserPlugin()
    ]

}