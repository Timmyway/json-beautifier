const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const JS_DIR = path.resolve(__dirname, 'src/js');
const SASS_DIR = path.resolve(__dirname, 'src/sass');
const BUILD_DIR = path.resolve(__dirname, 'assets');

const plugins = ( argv ) => [    
    new MiniCssExtractPlugin({
        filename: 'css/app.css'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
    }),
];

module.exports = ( env, argv ) => ({
    mode: 'development',
    entry: [JS_DIR + '/app.js', SASS_DIR + '/app.scss'],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // handle CSS files
            {
                test: /\.css$/,
                use: [
                    // creates style nodes from JS strings (for development)
                    'style-loader',
                    // translates CSS into CommonJS (for development)
                    'css-loader',
                    // extracts CSS into separate files (for production)
                    MiniCssExtractPlugin.loader,
                    // post-processes CSS with Autoprefixer (for production)
                    'postcss-loader',
                ],
            },
            // handle SCSS files
            {
                test: /\.scss$/,
                use: [
                    // Extract CSS into separate files
                    MiniCssExtractPlugin.loader,
                    // translates CSS into CommonJS
                    'css-loader',
                    // compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: plugins( argv ),    
    output: {
        path: BUILD_DIR,
        filename: 'js/app.js',
    },
});