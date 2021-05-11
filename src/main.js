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
		UserCollection:[]
	},
	mutations: {
		setUserId(state, userId) {
			state.userId = userId;
		},
		setUserName(state, userName) {
			state.userName = userName;
		},
		setCart(state,cart){
			state.ShoppingCart=cart;
		},
		// 添加到购物车
		addCart(state, s) {
			state.ShoppingCart.push(s);
		},
		// 修改商品数量
		editCartCount(state, s) {
			state.ShoppingCart.forEach(function(cart){
                if(cart.id==s.id){
					cart=s;
				}
			})
		},
		// 删除商品
		deleteCart(state, cartId) {
			const index = state.ShoppingCart.findIndex(item => item.id === cartId);
			console.log(index);
			state.ShoppingCart.splice(index, 1);
		},
		// 清空购物车
		emptyCart(state) {
			state.ShoppingCart = [];
		},
        addUserCollection(state,id){
			state.UserCollection.push(id);
		},
		deleteUserCollection(state,id){
			var g= parseInt(id);
			const i = state.UserCollection.find(item => item.goodsId === g);
			state.UserCollection.splice(i, 1);
		}
	},
	actions:{
		addUserCart(context,s){
			const isAdded = store.state.ShoppingCart.find(item => item.goodsId === s.goodsId);
			if(isAdded){
				isAdded.goodsNum+=1;
				context.dispatch('editCart',isAdded);
			}
			else{
				var url1 ="/api/cart/insertCart";
				axios({
					method: "post",
					url: url1,
					data:s
				}).then(response => {
					s.id=response.data;
				    context.commit("addCart",s);
				});
			}
		},
		getUserCart(context){
			var url1 ="/api/cart/getCart";
			axios({
				method: "get",
				url: url1,
				params: {
					userId: store.state.userId
				}
			}).then(response => {
			    context.commit("setCart",response.data);
			});
		},
		editCart(context,s){
			var url1 ="/api/cart/updateCart";
			axios({
				method: "post",
				url: url1,
				data:s
			}).then(response => {
			    context.commit("editCartCount",s);
			});
		},
		deleteGoods(context,id){
			var url1 ="/api/cart/deleteCart";
			axios({
				method: "post",
				url: url1,
				params:{
					cartId:id
				}
			}).then(response => {
			    context.commit("deleteCart",id);
			});
		},
		deleteAllGoods(context,userId){
			var url1 ="/api/cart/deleteAllCart";
			axios({
				method: "post",
				url: url1,
				params:{
					userId:userId
				}
			}).then(response => {
			    context.commit("emptyCart");
			});
		}
		
	}

});

new Vue({
	router: router1,
	store: store,
	render: h => h(App)
}).$mount('#app')
