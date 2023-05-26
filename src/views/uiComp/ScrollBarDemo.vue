<template>
	<div class="h-[200px] w-[200px]">
		<ScrollBar height="200px">
			<p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
		</ScrollBar>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import ScrollBar from '@/components/ScrollBar/scrollbar.vue'

onMounted(() => {})
</script>
<style scoped lang="less">
.scrollbar-demo-item {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	margin: 10px;
	text-align: center;
	border-radius: 4px;
	background: var(--el-color-primary-light-9);
	color: var(--el-color-primary);
}
</style>
