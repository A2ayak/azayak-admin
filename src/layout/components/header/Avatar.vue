<template>
	<a-dropdown placement="bottomRight">
		<div class="cursor-pointer" @click.prevent>Avatar</div>
		<template #overlay>
			<a-menu>
				<a-menu-item>
					<a @click="logout">logout</a>
				</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/module/user'
// import { logoutApi } from "@/api/modules/login";
import { message, Modal } from 'ant-design-vue'
import { localCache } from '@/utils/webStorage'

const userStore = useUserStore()
const router = useRouter()
// 退出登录
const logout = () => {
	Modal.confirm({
		title: '提示',
		content: '您是否确认退出登录?',
		async onOk() {
			// 1.执行退出登录接口
			// await logoutApi();

			// 2.清除 Token
			localCache.removeCache('token')
			userStore.logout()

			// 3.重定向到登陆页
			router.replace('/login')
			message.success('退出登录成功！')
		},
		onCancel() {
			console.log('Cancel')
		},
		confirmButtonText: '确定',
		cancelButtonText: '取消',
	})
}
</script>
<style scoped lang="less"></style>
