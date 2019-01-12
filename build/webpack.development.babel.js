// Webpack
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Nodejs
import path from 'path';

// Local
import common from './webpack.common.babel.js';

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;


export default merge( common, {

    devServer: {
        contentBase: path.join( process.cwd(), './public' ),
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
        watchContentBase: true
    },

    devtool: 'source-map',

    mode: 'development',

    output: {
        chunkFilename: '[id].css',
        filename: '[name].js'
    },

    plugins: [
        new CleanWebpackPlugin( [
            '../public/**/*.js',
            '../public/**/*.css',
            '../site/content/webpack.json'
        ] ),

        new MiniCssExtractPlugin( {
            chunkFilename: '[id].css',
            filename: '[name].css'
        } )
    ]

} );
