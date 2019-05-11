const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

module.exports = [{
    input: 'src/ipreact.tsx',
    plugins: [
        typescript(),
        nodeResolve(),
        commonjs()
    ],
    external: ["preact"],
    output: {
        name: 'IPreact',
        globals: {
            preact: 'Preact'
        },
        sourcemap: true,
        file: 'ipreact.js',
        exports: 'named',
        format: 'umd'
    }
}, {
    input: 'test/index.tsx',
    plugins: [
        typescript(),
        nodeResolve(),
        commonjs()
    ],
    output: {
        name: 'App',
        globals: {
            preact: 'Preact'
        },
        sourcemap: true,
        file: 'test/index.js',
        format: 'iife'
    }
}]