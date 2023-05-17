import { AxiosRequestConfig } from 'axios'
import { customRequestConfig } from './types'
import { IS_MOCK } from '@/config'
import HTTP from './http'

const api = import.meta.env.VITE_API_PREFIX
const mockApi = import.meta.env.VITE_MOCK_API_PREFIX

const baseConfig = {
	baseURL: IS_MOCK ? mockApi : api,
	timeout: 5 * 60 * 1000,
	withCredentials: true,
}

export default function customAxios<T = any>(config: AxiosRequestConfig, customConfig: customRequestConfig = {}) {
	return new HTTP(baseConfig).request<T>(config, customConfig)
}
