<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<a-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				<el-icon>
					<component :is="subItem.meta.icon"></component>
				</el-icon>
				<span>{{ subItem.meta.title }}</span>
			</template>
			<SubMenu :menu-list="subItem.children" />
		</a-sub-menu>
		<a-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
			<el-icon>
				<component :is="subItem.meta.icon"></component>
			</el-icon>
			<template #title>
				<span>{{ subItem.meta.title }}</span>
			</template>
		</a-menu-item>
	</template>
</template>

<script lang="ts" setup name="SubMenu">
import { useRouter } from 'vue-router'

defineProps<{ menuList: any[] }>()

const router = useRouter()
const handleClickMenu = (subItem: any) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
	router.push(subItem.path)
}
</script>
<style scoped lang="less"></style>
