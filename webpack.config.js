const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');
const WEBSITE = process.env.WEBSITE || 'example.com';

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

// EDIT CONFIG HERE
const APP_HTML_TITLE = WEBSITE;
const APP_CONTACT_MAIL = `contact@${WEBSITE}`;

const contactMail = Buffer.from(APP_CONTACT_MAIL).toString('base64');

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        bundle: path.join(dirApp, 'index')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            CONTACT_MAIL: JSON.stringify(contactMail),
            IS_DEV
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: APP_HTML_TITLE,
            minify: {
                collapseWhitespace: true
            }
        }),

        new ExtractTextPlugin('styles.[hash].css')
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!(mail-redactor)\/).*/,
                options: {
                    compact: true
                }
            },


            // STYLES
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: IS_DEV
                            }
                        }
                    ]
                })
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: IS_DEV
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: IS_DEV,
                                includePaths: [dirAssets]
                            }
                        }
                    ]
                })
            },
        ]
    }
};
