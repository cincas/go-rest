const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const DIST_DIR = path.join(__dirname, "/public")
module.exports = {
    mode: isProduction ? "production" : "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8081',
        'webpack/hot/dev-server',
        './src/index'
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        contentBase: [
            DIST_DIR,
            path.resolve(__dirname, "node_modules")
        ],
        publicPath: "/",
        compress: true,
        port: 8081,
        host: '0.0.0.0'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
        path: DIST_DIR,
        filename: "bundle.min.js"
    },
    module: {
        rules: [
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
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|icon)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
