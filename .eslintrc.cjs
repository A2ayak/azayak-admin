module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		// 'eslint:recommended', // 开启这个会不识别typescript的全局变量
		'plugin:vue/essential',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended', // 使用插件支持vue3
		'plugin:vue/vue3-essential',
		//1.继承.prettierrc.js文件规则
		//2.开启rules的 "prettier/prettier": "error"
		//3.eslint fix的同时执行prettier格式化
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		indent: 'off',
		// 'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'@typescript-eslint/no-unused-vars': 'off',
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/no-explicit-any': 'off', // 允许ts使用any
		'vue/no-multiple-template-root': 'off',
		'vue/no-v-model-argument': 'off',
	},
	// 全局未声明变量、types放这
	// globals: {
	// 	Nullable: true,
	// },
}
