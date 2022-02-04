const path = require("path")
const webpack = require("webpack")

module.exports = {
    mode: 'development', // 배포용 : production
    devtool: 'eval', // 그럴때는 hidden-source-map
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
    },

    entry: {
        app: './client'
    },
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            loader: 'ts-loader',
        },
        {
            test: /\.css$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    import: true
                }
            }],
            exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
        },
    ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    devServer: {
        historyApiFallback: true,
        port: 4000,
        publicPath: '/dist',
    }
}