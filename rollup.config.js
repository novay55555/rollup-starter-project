import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';
import merge from 'deepmerge';
import { uglify } from 'rollup-plugin-uglify';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
  babel(),
];

if (process.env.BUILD !== 'production') {
  plugins.push(istanbul({
    exclude: ['test/**/*', 'node_modules/**/*']
  }));
}

const base = {
  input: 'lib/index.js',
  plugins,
  external,
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'rollupStarterProject',
    sourcemap: true
  }
};

export default [
  base,
  merge(base, {
    output: {
      file: pkg.module,
      format: 'es',
    }
  }),
  merge(base, {
    plugins: plugins.concat(uglify()),
    output: {
      file: pkg.minify,
    }
  })
];
