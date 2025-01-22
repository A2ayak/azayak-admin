import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '../utils'

export const userInfo = {
	user: 'admin',
	email: 'azayakey@gmail.com',
	permissionRoutes: [
		'Charts',
		'BarChart',
		'LineChart',
		'PieChart',
		'LinkageDemo',
		'Animation',
		'LaserStyle',
		'SvgPath',
		'UiComp',
		'ScrollBar',
		'Terminal',
		'Dashboard',
	],
}

export default [
	{
		url: '/mock/api/login',
		timeout: 1000,
		method: 'post',
		response: () => {
			return resultSuccess({
				token: 'testToken',
				userId: 'testUserId',
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
