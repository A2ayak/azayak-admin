<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<a-sub-menu v-if="subItem.children && subItem.children.length > 0" :key="subItem.path">
			<template #title>
				<div class="flex items-center">
					<svg-icon icon="account"></svg-icon>
					<span class="ml-2">{{ subItem.meta!.title }}</span>
				</div>
			</template>
			<SubMenu :menu-list="subItem.children" />
		</a-sub-menu>
		<a-menu-item v-else :key="subItem.path" @click="handleClickMenu(subItem)">
			<div class="flex items-center">
				<svg-icon :icon="subItem?.meta?.icon || 'vue'" />
				<span class="ml-2">{{ subItem?.meta?.title || '-' }}</span>
			</div>
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
