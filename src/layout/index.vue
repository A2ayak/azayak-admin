<template>
	<component :is="LayoutComp[LAYOUT_TYPE]" />
</template>

<script setup lang="ts" name="layout">
import classicLayout from './layoutClassic/index.vue'
import { LAYOUT_TYPE } from '@/config'

const LayoutComp: Recordable = {
	classic: classicLayout,
}
</script>

<style scoped lang="less">
.layout {
	min-width: 800px;
}
</style>
