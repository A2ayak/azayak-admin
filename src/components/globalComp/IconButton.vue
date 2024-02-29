<template>
	<a-tooltip :title="title">
		<a-button v-bind="$attrs" class="icon-button">
			<template #icon>
				<SvgIcon :icon="icon" :type="type" :size="size"></SvgIcon>
			</template>
		</a-button>
	</a-tooltip>
</template>

<script lang="ts" setup>
import SvgIcon from './SvgIcon.vue'

const props = withDefaults(
	defineProps<{
		icon: string
		type?: string
		title?: Nullable<string>
		size?: number | string
	}>(),
	{
		type: 'primary',
		title: null,
		size: 20,
	}
)
</script>
<script lang="ts">
export default {
	inheritAttrs: false,
}
</script>
<style scoped lang="less">
.ant-btn {
	@apply border-none bg-transparent shadow-none p-0;

	&:hover,
	&:focus,
	&:active {
		@apply border-none bg-transparent shadow-none touch-none transition-none;
		&::after {
			@apply hidden;
		}
	}
	&[disabled] {
		svg {
			@apply fill-info;
		}
	}
}
</style>
