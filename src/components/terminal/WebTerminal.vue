<template>
	<div class="terminal-wrapper w-full h-full">
		<terminal name="my-terminal" @exec-cmd="onExecCmd"></terminal>
	</div>
</template>

<script lang="ts" setup>
import Terminal from 'vue-web-terminal'
//  3.2.0 及 2.1.13 以后版本需要引入此样式，之前版本无需引入主题样式
import 'vue-web-terminal/lib/theme/dark.css'

// @ts-ignore
function onExecCmd(key, command, success, failed) {
	if (key === 'fail') {
		failed('Something wrong!!!')
	} else if (key === 'date') {
		success({
			content: new Date().toDateString(),
		})
	} else {
		let allClass = ['success', 'error', 'system', 'info', 'warning']
		let clazz = allClass[Math.floor(Math.random() * allClass.length)]
		success({
			type: 'normal',
			class: clazz,
			tag: '成功',
			content: command,
		})
	}
}
</script>
<style scoped lang="less">
.terminal-wrapper {
	.t-container {
		// --t-main-background-color: '#fff'
	}
}
</style>
