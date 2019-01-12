// Webpack
import merge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Local
import common from './webpack.common.babel.js';


export default merge( common, {

    mode: 'production',

    optimization: {
        minimizer: [
            new UglifyJsPlugin( {
                cache: true,
                parallel: true,
                sourceMap: true
            } ),

            new MiniCssExtractPlugin( {
                chunkFilename: '[id].[hash:5].css',
                filename: '[name].[hash:5].css'
            } ),

            new OptimizeCSSAssetsPlugin( {} )
        ]
    },

    output: {
        chunkFilename: '[id].[hash:5].css',
        filename: '[name].[hash:5].js'
    }

} );
