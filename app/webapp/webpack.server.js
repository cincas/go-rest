const path = require('path');
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const DIST_DIR = path.join(__dirname, "/server-build");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    context: path.resolve(__dirname, 'src/server'),
    target: 'node',
    mode: isProduction ? "production" : "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    entry: [
        './index'
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
        path: DIST_DIR,
        filename: "server.min.js",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            { test: /\.(scss|css|svg)$/, loader: "ignore-loader" },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: [
        { react: 'React' },
        { 'react-dom': 'ReactDOM' },
        nodeExternals()
    ]
};
