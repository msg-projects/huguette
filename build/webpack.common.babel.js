// Webpack
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import manifest from './AssetsPlugin/index.js';

// Node.js
import {
    join,
    resolve
} from 'path';


const BASE = resolve( __dirname, '../' );

export default {

    entry: {
        images: join( BASE, 'src', 'images.js' ),
        main: join( BASE, 'src', 'index.js' ),
        scss: join( BASE, 'src', 'scss.js' )
    },


    module: {
        rules: [

            {
                loader: 'file-loader?name=/[hash].[ext]',
                test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/u
            },

            {
                exclude: /node_modules/u,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [ '@babel/preset-env' ]
                },
                test: /\.js?$/u
            },

            {
                exclude: /node_modules/u,
                test: /\.(sa|sc|c)ss$/u,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

            {
                loader: 'sharp-loader',
                query: {
                    cacheDirectory: true,
                    name: '[name].[hash:8].[ext]',
                    presets: {
                        optimize: {
                            format: [
                                'webp',
                                'jpeg'
                            ],
                            quality: 80
                        }
                    }
                },
                test: /\.(gif|jpe?g|png|svg|tiff)(\?.*)?$/u
            }

        ]
    },

    output: {
        path: join( BASE, 'site/static/output' )
    },

    plugins: [ manifest ]

};
