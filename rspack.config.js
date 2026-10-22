import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  context: import.meta.dirname,
  target: 'node',
  entry: {
    main: isDev ? ['@rspack/core/hot/poll?100', './src/main.ts'] : './src/main.ts',
  },
  devtool: 'source-map',
  mode: isDev ? 'development' : 'production',
  output: {
    clean: true,
    filename: '[name].cjs',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    tsConfig: './tsconfig.json'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            detectSyntax: 'auto',
            sourceMaps: true,
            jsc: {
              parser: {
                decorators: true,
              },
              transform: {
                legacyDecorator: true,
                decoratorMetadata: true,
              },
            },
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          compress: {
            keep_classnames: true,
            keep_fnames: true,
          },
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ],
  },
  externalsType: 'commonjs',
  plugins: isDev
    ? [
      new RunScriptWebpackPlugin({
        name: 'main.cjs',
        autoRestart: true,
        nodeArgs: ['--enable-source-maps'],
      }),
      new rspack.HotModuleReplacementPlugin(),
    ]
    : [],
  externals: [
    nodeExternals({
      allowlist: [/@rspack\/core\/hot\/poll/],
    }),
  ],
});
