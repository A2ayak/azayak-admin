<template>
	<a-layout class="azayak-layout-classic">
		<a-layout-header class="header h-14 px-4 flex items-center justify-between">
			<div class="left flex items-center">
				<div class="logo w-10 h-10 bg-[#76b900]"></div>
				<div class="font-bold text-lg text-[#76b900] ml-2">admin template</div>
			</div>
			<div class="right">
				<Avatar />
			</div>
		</a-layout-header>
		<a-layout>
			<a-layout-sider width="200">
				<a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }">
					<SubMenu :menu-list="userStore.getRoutes" />
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
import { onMounted, reactive, ref, watch } from 'vue'
import SubMenu from '../components/sider/SubMenu.vue'
import { useUserStore } from '@/store/module/user'
import router from '@/router'
import Avatar from '../components/header/Avatar.vue'

const userStore = useUserStore()

const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

onMounted(() => {
	// 初始化菜单
	const pathArr = router.currentRoute.value.path.split('/')
	if (!openKeys.value.length) {
		openKeys.value = ['/' + pathArr[1]]
	}
	if (!selectedKeys.value.length) {
		selectedKeys.value = [router.currentRoute.value.path]
	}
})

// watch(
// 	() => router.currentRoute.value,
// 	(val: any) => {
// 		console.log(val)
// 		const pathArr = val.path.split('/')
// 		if (!openKeys.value.length) {
// 			openKeys.value = [pathArr[1]]
// 		}
// 		if (!selectedKeys.value.length) {
// 			selectedKeys.value = [val.path]
// 		}
// 	}
// )
</script>
<style scoped lang="less">
.azayak-layout-classic {
	@apply h-full w-full;
}
</style>
