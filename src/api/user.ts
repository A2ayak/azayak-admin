import request from '@/utils/axios/index'
import { IAccount } from '@/components/login/type'

export function getUserInfo() {
	return request({
		url: '/userInfo',
		method: 'GET',
	})
}

export function login(data: IAccount) {
	return request({
		url: '/login',
		method: 'POST',
		data,
	})
}
