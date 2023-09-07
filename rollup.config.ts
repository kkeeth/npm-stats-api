import type { RollupOptions } from "rollup";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

const config: RollupOptions = {
  input: "src/index.ts",
  preserveModules: false,
  output: {
    file: "index.js",
    format: "cjs",
    sourcemap: true,
  },
  external: ['superagent'],
  plugins: [
    typescript(),
    babel({
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
