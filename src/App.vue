<template>
	<a-config-provider :get-popup-container="getPopupContainer">
		<router-view></router-view>
	</a-config-provider>
</template>

<script setup lang="ts">
function getPopupContainer(triggerNode: HTMLElement, dialogContext: any) {
	if (dialogContext) {
		return dialogContext.getDialogWrap()
	} else {
		return triggerNode.parentNode || document.body
	}
}
</script>

<style scoped lang="less">
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
span {
	color: @primary-color;
}
</style>
