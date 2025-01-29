const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            type: 'commonjs2'
        },
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    externals: {
        // List external dependencies that shouldn't be bundled
        '@permaweb/aoconnect': '@permaweb/aoconnect',
        '@permaweb/libs': '@permaweb/libs',
        'arweave': 'arweave',
        'tsconfig-paths': 'tsconfig-paths',
        'dotenv': 'dotenv'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: 'node'
};
