<template>
	<component :is="LayoutComp[LAYOUT_TYPE]" />
</template>

<script setup lang="ts" name="layout">
import classicLayout from './classicLayout/index.vue'
import { LAYOUT_TYPE } from '@/config'

const LayoutComp: { [key: string]: any } = {
	classic: classicLayout,
}
</script>

<style scoped lang="less">
.layout {
	min-width: 800px;
}
</style>
