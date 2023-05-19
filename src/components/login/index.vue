<template>
	<a-button @click="login">login</a-button>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { IAccount } from './type'
import { useUserStore } from '@/store/module/user'

const data: IAccount = {
	account: 'admin',
	password: '123456',
}

async function login() {
	const userStore = useUserStore()
	console.log(userStore)

	await userStore.loginAction(data)
}

onMounted(() => {})
</script>
<style scoped lang="less"></style>
