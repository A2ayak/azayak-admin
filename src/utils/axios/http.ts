import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { customRequestConfig } from './types'

export default class http {
	instance: AxiosInstance
	// request实例 => axios的实例
	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config)
		// this.instance.interceptors.request.use(
		// 	(config) => {
		// 		// loading/token
		// 		// console.log('全局请求成功的拦截')
		// 		return config
		// 	},
		// 	(err) => {
		// 		// console.log('全局请求失败的拦截')
		// 		return err
		// 	}
		// )
		this.instance.interceptors.response.use(
			(res) => {
				// console.log('全局响应成功的拦截')
				return res.data
			},
			(err) => {
				// console.log('全局响应失败的拦截')
				return err
			}
		)
	}
	request<T = any>(config: AxiosRequestConfig, customConfig: customRequestConfig): Promise<T> {
		// setupInterceptor(customConfig)
		return new Promise<T>((resolve, reject) => {
			this.instance
				.request<any, T>(config)
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
	// 扩充拦截器等
	use(middleware: (instance: AxiosInstance) => void) {
		middleware(this.instance)
	}
}
