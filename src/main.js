import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import SockJS from "sockjs-client";
import Stomp from "stompjs"
import VueRouter from 'vue-router'
Vue.prototype.$axios = axios;

Vue.prototype.HOST = "/api";
Vue.prototype.PicHOST = "http://localhost:8081";

// Vue.prototype.HOST = "http://47.94.16.59:8081";
// Vue.prototype.PicHOST = "http://47.94.16.59:8081";

import 'element-ui/lib/theme-chalk/index.css';
import Vuex from "vuex";
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);


const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routers = [{
		path: '/login',
		component: (resolve) => require(['./router/views/login.vue'], resolve)
	},
	{
		path: '/shopping',
		component: (resolve) => require(['./router/views/shoppingView.vue'], resolve)

	},
	{
		path: '/audit',
		component: (resolve) => require(['./router/views/Audit.vue'], resolve)
	},
	{
		path: '/chat',
		component: (resolve) => require(['./router/views/WebSocket.vue'], resolve)
	},
	{
		path: '/register',
		component: (resolve) => require(['./router/views/register.vue'], resolve)
	},
	{
		path: '/goodsDetail/:goodsId',
		//component: (resolve) => require(['./router/views/goodsDetail.vue'], resolve)
		component: require('./router/views/goodsDetail.vue').default
	},
	{
		path: '/shoppingCart',
		component: require('./router/views/ShoppingCart.vue').default //直接加载
	},
	{
		path: '/userCollection',
		component: (resolve) => require(['./router/views/userCollection.vue'], resolve)
	},
	{
		path: '/userHome',
		component: (resolve) => require(['./router/views/userHome.vue'], resolve)
	},
	{
		path: '/sellerHome',
		component: (resolve) => require(['./router/views/seller/sellerHome.vue'], resolve)
	},
	{
		path: '/sellerGoods',
		component: (resolve) => require(['./router/views/seller/sellerGoods.vue'], resolve)
	},
	{
		path: '/sellerGoodsDetails/:goodsId',
		component: (resolve) => require(['./router/views/seller/sellerGoodsDetails.vue'], resolve)
	},
	{
		path: '/userOrder',
		component: (resolve) => require(['./router/views/UserOrder.vue'], resolve)
	},
	{
		path: '*',
		redirect: "/shopping"
	}

];
const RouterConfig = {
	mode: 'history',
	routes: routers
};
const router1 = new VueRouter(RouterConfig);

router1.beforeEach((to, from, next) => {
	if (to.path == "/shopping" || to.path == "/login" || to.path == "/register") {
		next();
	} else {
		if (sessionStorage.getItem("userMsg") == null) {
			alert("您还未登录");
			next('/login');
		} else {
			var j = sessionStorage.getItem("userMsg");
			var t = JSON.parse(j);
			if (t.userId == "") {
				alert("您还未登录");
				next('/login');
			} else
				next();
		}
	}
});
/** 捕获到错误重新加载路由 */
router1.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router1.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router1.replace(targetPath);
    }
});

const store = new Vuex.Store({
	state: {
		userId: "",
		userName: "",
		ShoppingCart: [],
	},
	mutations: {
		setUserId(state, userId) {
			state.userId = userId;
		},
		setUserName(state, userName) {
			state.userName = userName;
		},
		// 添加到购物车
		addCart(state, id) {
			// 先判断购物车是否已有，如果有，数量+1
			const isAdded = state.ShoppingCart.find(item => item.id === id);
			if (isAdded) {
				isAdded.count++;
			} else {
				state.ShoppingCart.push({
					id: id,
					count: 1
				})
			}
		},
		// 修改商品数量
		editCartCount(state, payload) {
			const product = state.ShoppingCart.find(item => item.id === payload.id);
			product.count += payload.count;
		},
		// 删除商品
		deleteCart(state, id) {
			const index = state.ShoppingCart.findIndex(item => item.id === id);
			state.ShoppingCart.splice(index, 1);
		},
		// 清空购物车
		emptyCart(state) {
			state.ShoppingCart = [];
		}
	}

});

new Vue({
	router: router1,
	store: store,
	render: h => h(App)
}).$mount('#app')
