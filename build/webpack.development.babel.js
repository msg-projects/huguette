// Webpack
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Nodejs
import { join } from 'path';

// Local
import { PORT } from './configuration.js';
import common from './webpack.common.babel.js';

const CWD = process.cwd();


export default merge( common, {

    devServer: {
        contentBase: join( CWD, 'public' ),
        historyApiFallback: {
            rewrites: [
                {
                    from: /./u,
                    to: '404.html'
                }
            ]
        },
        open: true,
        port: PORT,
        quiet: false,
        stats: 'normal',
        watchContentBase: true,
        writeToDisk: true
    },

    devtool: 'source-map',

    mode: 'development',

    output: {
        chunkFilename: '[id].css',
        filename: '[name].js'
    },

    plugins: [
        new CleanWebpackPlugin(
            [
                `./**/*`,
                '../../data/manifest.json'
            ],
            {
                root: join( CWD, 'site', 'static', 'assets' )
            }
        ),

        new MiniCssExtractPlugin( {
            chunkFilename: '[id].css',
            filename: '[name].css'
        } )
    ]

} );
