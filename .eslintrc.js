module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'import'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',

		// // sort imports
		'import/order': 'error',

		// // no let exports
		'import/no-mutable-exports': 'error',

		'import/no-cycle': 'error',
		'import/no-default-export': 'error',

		// allow {} even though it's unsafe but comes handy
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					'{}': false,
				},
			},
		],

		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
				disallowTypeAnnotations: false,
			},
		],

		'import/no-duplicates': ['error', { 'prefer-inline': true }],

		// false negatives
		'import/namespace': ['off'],

		// we allow empty interfaces
		'no-empty-pattern': 'off',
		'@typescript-eslint/no-empty-interface': 'off',

		// we allow empty functions
		'@typescript-eslint/no-empty-function': 'off',

		// we sometimes use async functions that don't await anything
		'@typescript-eslint/require-await': 'off',

		// make sure to `await` inside try…catch
		'@typescript-eslint/return-await': ['error', 'in-try-catch'],

		// allow unused vars prefixed with `_`
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
		],

		// numbers and booleans are fine in template strings
		'@typescript-eslint/restrict-template-expressions': [
			'error',
			{ allowNumber: true, allowBoolean: true },
		],

		'@typescript-eslint/no-misused-promises': [
			'error',
			{ checksVoidReturn: false },
		],
	},
};
