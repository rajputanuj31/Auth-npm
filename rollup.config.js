import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'auto', // Fix the export warning for CommonJS
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      }
    ],
    plugins: [
      external(),   // Ensure dependencies are excluded from the bundle
      resolve(),    // Resolve node_modules dependencies
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
      }),
      terser(),     // Minify the output
    ]
  }
];
