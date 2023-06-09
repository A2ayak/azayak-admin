<template>
	<div class="w-full h-full">
		<div class="w-1/2 h-1/2">
			<BarChart :series-data="[[1, 2, 3, 4, 5, 6]]" :x-axis-data="['a', 'b', 'c', 'd', 'e', 'f']" :series-name="['test']" />
		</div>
		<!-- asdasd -->
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import BarChart from '@/components/charts/BarChart.vue'

onMounted(() => {})
</script>
<style scoped lang="less"></style>
