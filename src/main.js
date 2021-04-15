import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import SockJS from "sockjs-client";
import Stomp from "stompjs"
import VueRouter from 'vue-router'
Vue.prototype.$axios = axios;
Vue.prototype.HOST = "/api";

import 'element-ui/lib/theme-chalk/index.css';
import Vuex from "vuex";
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
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
		path: '/goodsDetail',
		component: (resolve) => require(['./router/views/goodsDetail.vue'], resolve)
	},
	 {
	 	path:'*',
	     redirect:"/login"
	 }

];
const RouterConfig = {
	mode: 'history',
	routes: routers
};
const router1 = new VueRouter(RouterConfig);

const store =new Vuex.Store({
	state:{
		userId:"",
		userName:"",
		ShoppingCart:[],
		goodsId:""
	},
	mutations:{
		setUserId(state,userId){
			state.userId=userId;
		},
		setUserName(state,userName){
			state.userName=userName;
		},
		addShoppingCart(state,shopping){
			state.ShoppingCart.push(shopping);
		},
		setGoodsId(state,goodsId){
			state.goodsId=goodsId;
		}
	}
	
});

new Vue({
	router: router1,
	store:store, 
	render: h => h(App)
}).$mount('#app')
