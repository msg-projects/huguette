// Webpack
import WebpackAssetsManifest from 'webpack-assets-manifest';

// Node.js
import {
    extname,
    basename
} from 'path';


const manifest = new WebpackAssetsManifest( {
    output: '../../data/manifest.json',
    space: 4,
    writeToDisk: true
} );

manifest.hooks.transform.tap( 'huguette', ( assets, currentManifest ) => {

    const { assetNames } = currentManifest;

    if ( !assetNames || !assetNames.size ) {
        return;
    }

    const group = {};

    assetNames.forEach( ( value, key ) => {

        const FIRST_CHARACTER = 1;
        const fullExtension = extname( key );
        const extensionName = fullExtension.slice( FIRST_CHARACTER );
        const fileName = basename( value, extname( value ) );
        const prefixLessPath = `/assets/${ key }`;

        group[ fileName ] = {
            ...group[ fileName ] || {},
            [ extensionName ]: prefixLessPath
        };

        manifest[ 'delete' ]( value );

    } );

    Object.entries( group )
        .forEach( pair => manifest.set( ...pair ) );

} );


export default manifest;
