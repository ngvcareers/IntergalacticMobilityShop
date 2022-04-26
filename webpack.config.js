const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
    context: __dirname,
    entry: './src/index.js',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
        modules: ['src', 'node_modules']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        port: 3002,
        proxy: {
            "/api": {
                target: "https://swapi.dev/api/",
                pathRewrite: { "^/api": "" },
                secure: false,
                changeOrigin: true,
            }
        },
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: "IntergalacticMobilityShop",
            template: "./src/index.html",
        })
    ],
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use:
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    }
};