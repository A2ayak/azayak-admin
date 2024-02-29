<template>
	<div class="table-more-btn-wrapper">
		<a-popover placement="bottom" trigger="hover" overlay-class-name="table-handle-more-popover-dropdown" :get-popup-container="getPopupContainer">
			<template #content>
				<template v-for="btn in renderBtnArr" :key="btn.label">
					<a-button
						v-if="btn.visible"
						class="handle-item"
						:style="{ cursor: btn.disabled ? 'not-allow' : 'pointer' }"
						v-bind="btn"
						@click="$emit(btn.svgName)"
					>
						<template #icon>
							<SvgIcon :name="btn.svgName" :type="btn.svgType" />
						</template>
						{{ btn.label }}
					</a-button>
				</template>
			</template>
			<IconButton class="btn-item" :name="icon" :title="title" />
		</a-popover>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ButtonProps } from 'ant-design-vue'

type IBtnProps = {
	visible?: boolean
	label: string
	svgName: string
	svgType: string
} & ButtonProps

const props = withDefaults(
	defineProps<{
		btnArr?: IBtnProps[]
		icon?: string
		title?: string
	}>(),
	{
		btnArr: () => [
			{ label: '编辑', svgName: 'edit', svgType: 'primary' },
			{ label: '删除', svgName: 'delete', svgType: 'danger' },
		],
		icon: 'test',
		title: '',
	}
)

const renderBtnArr = ref<IBtnProps[]>()
renderBtnArr.value = props.btnArr.map((item) => {
	return {
		...item,
		visible: item.visible ?? true,
	}
})

function getPopupContainer(triggerNode: HTMLElement) {
	return triggerNode.parentNode ?? document.body
}
</script>
<style lang="less">
.table-handle-more-popover-dropdown {
	.ant-popover-content {
		.ant-popover-arrow {
		}
		.ant-popover-inner-content {
			@apply px-0;
			.handle-item {
				@apply ~"flex items-center min-w-[140px] h-[32px] pl-4 cursor-pointer justify-start !m-0 border-none";
				&:hover {
					@apply bg-primary/10;
				}
				svg {
					@apply mr-2;
				}
				&[disabled] {
					svg {
						@apply fill-info;
					}
				}
			}
		}
	}
}
</style>
