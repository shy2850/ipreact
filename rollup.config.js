const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

module.exports = [{
    input: 'src/index.tsx',
    plugins: [
        typescript(),
        nodeResolve(),
        commonjs()
    ],
    external: ["preact", "immutable"],
    output: {
        name: 'IPreact',
        globals: {
            preact: 'Preact',
            immutable: 'Immutable'
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
            preact: 'Preact',
            immutable: 'Immutable'
        },
        sourcemap: true,
        file: 'test/index.js',
        format: 'iife'
    }
}]