<!-- <template>
  <h1>i am msg</h1>
</template> -->

<script lang="tsx">
import { ref, defineComponent } from 'vue'

export default defineComponent({
	setup() {
		const count = ref('tsx-test')

		return () => [<div class="text-red-500 text-2xl">test: {count.value}</div>]
	},
})
</script>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
