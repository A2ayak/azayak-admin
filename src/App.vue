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
