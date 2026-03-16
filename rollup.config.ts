import type { RollupOptions } from "rollup";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

const config: RollupOptions = {
  input: "src/index.ts",
  output: {
    file: "index.js",
    format: "cjs",
    sourcemap: true,
    preserveModules: false,
  },
  external: ['superagent'],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false, // ここを変更：d.tsファイルはTypeScriptコンパイラで生成する
      sourceMap: true,
      inlineSources: true
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              browsers: ["last 2 versions"],
              node: "current"
            }
          }
        ]
      ],
      extensions: ['.js', '.ts']
    })
  ]
};

export default config;
