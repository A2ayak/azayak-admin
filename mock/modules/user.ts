import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from 'mock/utils'

const userInfo = {
	user: 'admin',
	email: 'azayakey@gmail.com',
	routeNames: ['charts', 'barChart', 'lineChart', 'pieChart', 'animation', 'laserStyle', 'uiComp', 'scrollBar'],
}

export default [
	{
		url: '/mock/api/login',
		timeout: 1000,
		method: 'post',
		response: () => {
			return resultSuccess({
				token: 'testToken',
				userId: '4090',
			})
		},
	},
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
