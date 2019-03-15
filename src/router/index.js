import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	mode: 'history', 
	routes: [
	    {
	      path: '/',
	      name: 'login',
				component: () => import('@/views/login'),
	    },
	    {
	      path: '/singleton/',
	      name: 'singleton',
				component: () => import('@/views/singleton/singleton'),
				children: [
					{
						path: 'lang',
	      		name: 'lang',
						component: () => import('@/views/singleton/lang'),
						meta: { title: 'catalog' }
					},
					{
						path: 'store',
						component: () => import('@/views/singleton/store'),
						name: 'store',
						meta: { title: 'store' }
					}
				]
	    }
	]
})
