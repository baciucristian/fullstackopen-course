import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	{ ignores: ['dist/'], files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'] },
	js.configs.recommended,
	reactRecommended,
	{
		plugins: {
			'react-refresh': reactRefresh,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
		rules: {
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		},
	},
	{
		plugins: {
			'react-hooks': reactHooks,
		},
		rules: reactHooks.configs.recommended.rules,
	},
	eslintPluginPrettierRecommended,
];
