const path = require('path');

module.exports = {
    publicPath: 'http://arhitector44.myjino.ru/todo/',
    productionSourceMap: false,
    css: {
        extract: false,
    },
    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
        output: {
            filename: 'js/todo.js',
        },
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach((type) => addStyleResource(config.module.rule('scss')
            .oneOf(type)));
        svgRule.uses.clear();
        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src'))
            .set('@b', path.resolve(__dirname, 'src/components/base'))
            .set('@c', path.resolve(__dirname, 'src/components/content'))
            .set('@p', path.resolve(__dirname, 'src/components/popup'));
    },
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/css/system/*.scss'),
            ],
        });
}
