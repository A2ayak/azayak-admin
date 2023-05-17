import request from '@/utils/axios/index'

export function getUserInfo() {
	return request({
		url: '/userInfo',
		method: 'GET',
	})
}
