import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
// rollup.config.js
export default defineConfig({
	input: 'lib/pom.ts',
	output: {
		format: 'cjs',
        dir: './dist'
	},
	plugins: [
		commonjs(),
		nodeResolve(),
		typescript(),
		terser()
	]
});
