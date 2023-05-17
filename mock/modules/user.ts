import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from 'mock/utils'

const userInfo = {
	name: 'admin',
	userId: '4090',
	email: 'azayakey@gmail.com',
	token: 'testToken',
	routes: ['charts', 'lineChart', 'pieChart', 'animation'],
}

export default [
	{
		url: '/mock/api/userInfo',
		timeout: 1000,
		method: 'get',
		response: () => {
			return resultSuccess(userInfo)
		},
	},
	{
		url: '/mock/api/user/timeout',
		method: 'post',
		statusCode: 401,
		response: () => {
			return resultError()
		},
	},
] as MockMethod[]
