<template>
	<a-layout class="azayak-layout-classic">
		<a-layout-header class="header h-14 px-4 flex items-center">
			<div class="logo w-10 h-10 bg-purple-700"></div>
			<div class="font-bold">admin</div>
		</a-layout-header>
		<a-layout>
			<a-layout-sider width="200">
				<a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }">
					<a-sub-menu key="111">
						<template #title>
							<span> subnav 1 </span>
						</template>
						<a-menu-item key="1">option1</a-menu-item>
						<a-menu-item key="2">option2</a-menu-item>
						<a-menu-item key="3">option3</a-menu-item>
						<a-menu-item key="4">option4</a-menu-item>
					</a-sub-menu>
					<a-sub-menu key="222">
						<template #title>
							<span> subnav 2 </span>
						</template>
						<a-menu-item key="5">option5</a-menu-item>
						<a-menu-item key="6">option6</a-menu-item>
						<a-menu-item key="7">option7</a-menu-item>
						<a-menu-item key="8">option8</a-menu-item>
					</a-sub-menu>
					<a-sub-menu key="333">
						<template #title>
							<span> subnav 3 </span>
						</template>
						<a-menu-item key="9">option9</a-menu-item>
						<a-menu-item key="10">option10</a-menu-item>
						<a-menu-item key="11">option11</a-menu-item>
						<a-menu-item key="12">option12</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</a-layout-sider>
			<a-layout>
				<a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
					<router-view></router-view>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-layout>
</template>

<script lang="ts" setup name="ClassicLayout">
import { reactive, ref, onMounted } from 'vue'

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['111'])

onMounted(() => {})
</script>
<style scoped lang="less">
.azayak-layout-classic {
}
</style>
