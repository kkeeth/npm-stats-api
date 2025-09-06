import type { RollupOptions } from "rollup";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

const config: RollupOptions = {
  input: "src/index.ts",
  output: {
    file: "index.js",
    format: "cjs",
    sourcemap: true,
    preserveModules: false,
  },
  external: ['superagent', 'core-js/stable'],
  plugins: [
    typescript({
      sourceMap: true,
    }),
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
      ]
    })
  ]
};

export default config;
