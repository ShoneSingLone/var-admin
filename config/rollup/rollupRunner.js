const rollup = require('rollup');
const path = require("path");

// see below for details on the options
const input = path.join(__dirname, "../..", 'node_modules/ant-design-vue/lib/date-picker/index.js');
console.log('input', input);
const inputOptions = {
    input,
};
const outputOptions = {
    file: 'bundle.js',
    format: 'iife'
};

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    console.log(bundle.watchFiles); // an array of file names this bundle depends on

    // generate code
    const {
        output
    } = await bundle.generate(outputOptions);

    for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
            // For assets, this contains
            // {
            //   fileName: string,              // the asset file name
            //   source: string | Buffer        // the asset source
            //   type: 'asset'                  // signifies that this is an asset
            // }
            console.log('Asset', chunkOrAsset);
        } else {
            // For chunks, this contains
            // {
            //   code: string,                  // the generated JS code
            //   dynamicImports: string[],      // external modules imported dynamically by the chunk
            //   exports: string[],             // exported variable names
            //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
            //   fileName: string,              // the chunk file name
            //   imports: string[],             // external modules imported statically by the chunk
            //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
            //   isEntry: boolean,              // is this chunk a static entry point
            //   map: string | null,            // sourcemaps if present
            //   modules: {                     // information about the modules in this chunk
            //     [id: string]: {
            //       renderedExports: string[]; // exported variable names that were included
            //       removedExports: string[];  // exported variable names that were removed
            //       renderedLength: number;    // the length of the remaining code in this module
            //       originalLength: number;    // the original length of the code in this module
            //     };
            //   },
            //   name: string                   // the name of this chunk as used in naming patterns
            //   type: 'chunk',                 // signifies that this is a chunk
            // }
            console.log('Chunk', chunkOrAsset.modules);
        }
    }

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

build();