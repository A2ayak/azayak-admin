import { defineStore } from 'pinia'

export const useAppStore = defineStore({
	id: 'app',
	state: (): any => {
		return {
			counter: 1,
		}
	},
	getters: {
		getCounter(): number {
			return this.counter
		},
	},
	actions: {
		plus(): void {
			this.counter++
		},
		des(): void {
			this.counter--
		},
	},
})
