import type { RouteRecordRaw } from 'vue-router'

export function generatePermissionRoutes(permission: string[]): RouteRecordRaw[] {
	const routeModules: Recordable = import.meta.glob('../modules/**/*.ts', { eager: true })

	const allRoutes: RouteRecordRaw[] = []
	for (const path in routeModules) {
		const module = routeModules[path].default ?? {}
		allRoutes.push(module)
	}
	const routes = filterRoute(allRoutes, permission)
	console.log('filterRoutes', routes)

	return routes
}

function filterRoute(routes: RouteRecordRaw[], permission: string[]): RouteRecordRaw[] {
	if (!routes.length) return []
	const res: RouteRecordRaw[] = []
	for (let i = 0; i < routes.length; i++) {
		const r = routes[i]
		if (!permission.includes(r.name as string)) continue
		r.children = filterRoute(r.children || [], permission)
		if (r.children.length) {
			r.redirect = { name: r.children[0].name }
		}
		res.push(r)
	}
	return res
}
