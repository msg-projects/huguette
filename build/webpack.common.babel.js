// Webpack
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import manifest from './AssetsPlugin/index.js';

// Node.js
import { join } from 'path';

// Base
import {
    OUTPUT,
    BASE
} from './configuration.js';


export default {

    entry: {
        'css/scss': join( BASE, 'src', 'scss.js' ),
        'images/images': join( BASE, 'src', 'images.js' ),
        'scripts/main': join( BASE, 'src', 'index.js' )
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
                    name: `[path][name].[hash:8].[ext]`,
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
        path: OUTPUT
    },

    plugins: [ manifest ]

};
