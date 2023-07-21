<template>
	<div class="az-base">
		<div class="table-layout">
			<div class="table-layout__header more" :class="{ 'table-layout__header--more': showMore }">
				<div class="header-default">
					<div class="left-condition">
						<slot name="leftCondition"></slot>
					</div>
					<div class="right-button">
						<slot name="rightButton"></slot>
					</div>
				</div>
				<div class="header-more">
					<slot name="headerMore"></slot>
				</div>
			</div>
			<div class="table-layout__body" :class="{ 'show-batch': showBatch }">
				<div class="batch">
					<slot name="batch"></slot>
				</div>
				<div class="table">
					<slot name="table"></slot>
				</div>
			</div>
			<div class="table-layout__footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name="tableLayout">
interface layoutProps {
	showMore: boolean
	showBatch: boolean
}
const props = withDefaults(defineProps<layoutProps>(), {
	showMore: false,
	showBatch: false,
})
</script>
<style scoped lang="less"></style>
