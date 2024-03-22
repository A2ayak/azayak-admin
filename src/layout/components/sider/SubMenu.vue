<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<a-sub-menu v-if="subItem.children && subItem.children.length > 0" :key="subItem.path">
			<template #title>
				<svg-icon icon="account"></svg-icon>
				<span>{{ subItem.meta!.title }}</span>
			</template>
			<SubMenu :menu-list="subItem.children" />
		</a-sub-menu>
		<a-menu-item v-else :key="subItem.path" @click="handleClickMenu(subItem)">
			<svg-icon :icon="subItem.meta!.icon"></svg-icon>
			<span>{{ subItem.meta!.title }}</span>
		</a-menu-item>
	</template>
</template>

<script lang="ts" setup name="SubMenu">
import { useRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

defineProps<{ menuList: RouteRecordRaw[] }>()

const router = useRouter()
const handleClickMenu = (subItem: any) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
	router.push(subItem.path)
}
</script>
<style scoped lang="less"></style>
