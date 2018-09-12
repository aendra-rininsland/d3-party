/**
 * @file
 * rollup.config.js
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	input: 'index.js',
	output: {
		file: 'dist/d3-party.js',
		format: 'iife',
		name: 'd3.party',
		exports: 'default',
		globals: {
			'd3-selection': 'd3'
		}
	},
	plugins: [nodeResolve(), commonjs()],
	external: ['d3-selection']
};
