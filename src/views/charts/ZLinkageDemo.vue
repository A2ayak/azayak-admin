<template>
	<h1 class="w-1/2 flex justify-center">ECharts和VxeTable联动实例</h1>
	<div class="w-full h-full">
		<div class="w-1/2 h-1/2">
			<PieChart
				:series-data="seriesData"
				@mouseover="({ dataIndex }) => tableRef.setCurrentRow(tableData[dataIndex])"
				@mouseout="tableRef.clearCurrentRow()"
			/>
		</div>
		<div class="w-1/2">
			<vxe-table ref="tableRef" :data="tableData">
				<vxe-column type="seq" width="60"></vxe-column>
				<vxe-column field="name" title="Name"></vxe-column>
				<vxe-column field="sex" title="Sex"></vxe-column>
				<vxe-column field="age" title="Age"></vxe-column>
			</vxe-table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PieChart from '@/components/charts/PieChart.vue'

const seriesData = ref([
	{ name: '饼1', value: '400' },
	{ name: '饼2', value: '200' },
	{ name: '饼3', value: '100' },
])

const tableData = ref<any[]>([
	{ id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
	{ id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
	{ id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
	{ id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
])
const tableRef = ref()
</script>
<style scoped lang="less"></style>
