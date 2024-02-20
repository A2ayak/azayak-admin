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
		<a-divider style="height: 2px; background-color: #409eff" />
		<h1 class="w-1/2 flex justify-center">VxeTable大数据树形勾选实例: checkField字段</h1>
		<div class="w-1/2 mt-4">
			<a-button @click="changeData">change</a-button>
			<a-button @click="resetData">reset</a-button>
			<a-button @click="getCheck">获取已选项</a-button>
			<a-button @click="getUnCheck">获取未选中的选项</a-button>
			<vxe-table
				ref="testT"
				resizable
				:tree-config="{ transform: true, rowField: 'id', parentField: 'parentId' }"
				:data="tableData1"
				:checkbox-config="{
					labelField: 'name',
					highlight: true,
					reserve: true,
					checkField: 'check',
					indeterminateField: 'half',
					checkMethod: () => enableCheck,
				}"
				:scroll-y="{ enabled: true }"
				height="500px"
				@checkbox-change="selectChangeEvent"
			>
				<!-- <vxe-column type="checkbox" title="ID" width="150"></vxe-column> -->
				<vxe-column type="checkbox" title="漏洞类型/漏洞名称" width="250" tree-node></vxe-column>
				<vxe-column field="size" title="Cnnvd编号"></vxe-column>
				<vxe-column field="type" title="CVE编号"></vxe-column>
				<vxe-column field="date" title="漏洞发布时间"></vxe-column>
			</vxe-table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import PieChart from '@/components/charts/PieChart.vue'

const testT = ref()
const tableData1: any = ref([
	{ id: 10000, parentId: null, name: '视频漏洞库', check: false, type: '1024', size: 1024, date: '2020-08-01' },
	{ id: 20050, parentId: null, name: '数据库漏洞库', check: false, type: '1024', size: 1024, date: '2020-08-01' },
	{ id: 30050, parentId: null, name: 'xxx漏洞库', check: false, type: '1024', size: 1024, date: '2020-08-01' },
])
function selectChangeEvent(p) {
	console.log(p)
	const records = p.$table.getCheckboxRecords()
	console.info(`勾选${records.length}个树形节点`, records)
}
function changeData() {
	tableData1.value = [{ id: 10000, parentId: null, name: 'test abc1', type: '1024', size: 1024, date: '2020-08-01', check: false }, ...child1]
}
function resetData() {
	tableData1.value = [
		{ id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
		{ id: 20050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
		{ id: 30050, parentId: null, name: 'Test3', type: 'mp4', size: null, date: '2021-04-01' },
		...child1,
		...child2,
		...child3,
	]
}
function getCheck() {
	tableData1.value = testT.value.getCheckboxRecords(true)
}
function getUnCheck() {
	const hasSelected1 = testT.value.getCheckboxRecords()
	const hasSelected = testT.value.getCheckboxRecords(true).map((row) => row.id)
	console.log(hasSelected1, hasSelected)
	tableData1.value = allData.value.filter((i) => !hasSelected.includes(i.id))
}
const allData = ref()
const child1 = new Array(10000).fill(0).map((i, index) => ({
	id: 10001 + index,
	name: 10001 + index + 'test',
	parentId: 10000,
	type: '1024',
	size: 1024,
	date: '2020-08-01',
	check: false,
}))
const child2 = new Array(10000).fill(0).map((i, index) => ({
	id: 20051 + index,
	name: 20050 + index + 'test',
	parentId: 20050,
	type: '1024',
	size: 1024,
	date: '2020-08-01',
	check: false,
}))
const child3 = new Array(10000).fill(0).map((i, index) => ({
	id: 30051 + index,
	name: 30050 + index + 'test',
	parentId: 30050,
	type: '1024',
	size: 1024,
	date: '2020-08-01',
	check: false,
}))
onMounted(() => {
	tableData1.value.push(...child1, ...child2, ...child3)
	allData.value = JSON.parse(JSON.stringify(tableData1.value))
})

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
const enableCheck = ref(true)
</script>
<style scoped lang="less"></style>
