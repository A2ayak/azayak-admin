<template>
	<a-config-provider
		:get-popup-container="getPopupContainer"
		:theme="{
			algorithm: theme.darkAlgorithm,
			token: {
				colorPrimary: '#76b900',
				borderRadius: 6,
				sizeStep: 6,
				sizeUnit: 4,
				wireframe: false,
			},
		}"
	>
		<router-view></router-view>
	</a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
function getPopupContainer(triggerNode: HTMLElement, dialogContext: any) {
	if (dialogContext) {
		return dialogContext.getDialogWrap()
	} else {
		return triggerNode.parentNode || document.body
	}
}
</script>
