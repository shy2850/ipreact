const { argv } = process
const build = argv[argv.length - 1] === 'build'
const { fromJS } = require('immutable')

module.exports = {
    livereload: !build,
    build,
    gzip: true,
    buildFilter: (pathname) => /^(src|test|index)/.test(pathname),
    outputFilter: (pathname) => !pathname || /^ipreact/.test(pathname),
    middlewares: [
        {
            middleware: 'template',
            test: /\.html?/
        },
        {
            middleware: 'rollup'
        }
    ],
    output: require('path').join(__dirname, './dist')
}
