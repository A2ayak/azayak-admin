<template>
	<div class="w-full h-full">
		<div class="w-1/2 h-1/2">
			<PieChart :series-data="seriesData" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PieChart from '@/components/charts/PieChart.vue'

const seriesData = ref([
	{ name: '123', value: '435' },
	{ name: '234', value: '123' },
])
</script>
<style scoped lang="less"></style>
