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
        'static/output/images': join( BASE, 'src', 'images.js' ),
        'static/output/main': join( BASE, 'src', 'index.js' ),
        'static/output/scss': join( BASE, 'src', 'scss.js' )
    },


    module: {
        rules: [

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
                options: {
                    cacheDirectory: true,
                    context: 'src',
                    name: 'static/[path][name].[hash:8].[ext]',
                    presets: {
                        default: {
                            format: [
                                'webp',
                                'jpg'
                            ]
                        },
                        inline: {
                            format: 'jpg',
                            inline: true
                        }
                    }
                },
                test: /\.(gif|jpe?g|png|svg|tiff)(\?.*)?$/u
            }

        ]
    },

    output: {
        path: join( BASE, 'site' )
    },

    plugins: [ manifest ]

};
