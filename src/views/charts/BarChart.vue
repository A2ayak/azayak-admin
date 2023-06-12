<template>
	<div class="w-full h-full">
		<div class="w-1/2 h-1/2">
			<BarChart :series-data="seriesData" :x-axis-data="['a', 'b', 'c', 'd', 'e', 'f']" :series-name="['test']" type="log" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BarChart from '@/components/charts/BarChart.vue'

const seriesData = ref([[1, 2, 3, 4, 5, 5000000]])
</script>
<style scoped lang="less"></style>
