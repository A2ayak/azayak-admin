<template>
	<div></div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useAppStore } from '@/store/module/app'

const appStore = useAppStore()
console.log(appStore)

const test: Nullable<string> = 'asdasd'
</script>
<style scoped></style>
