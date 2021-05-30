<template>
	<div >
		<el-row class="cat">
			<h5>订单中心</h5>
		</el-row>
		<el-row>
			<el-button class="left" type="text" @click="routerLink(1)">我的订单</el-button>
		</el-row>
		<el-row>
			<el-button class="left" type="text" @click="routerLink(1)">订单评价</el-button>
		</el-row>
		<el-row class="dvd">
			<el-divider></el-divider>
		</el-row>
		<el-row class="cat">
			<h5>我的关注</h5>
		</el-row>
		<el-row>
			<el-button class="left" type="text" @click="routerLink(2)">关注店铺</el-button>
		</el-row>
		<el-row>
			<el-button class="left" type="text" @click="routerLink(2)">关注商品</el-button>
		</el-row>
		<el-row>
			<el-button class="left" type="text" @click="routerLink(2)">关注用户</el-button>
		</el-row>
		<el-row>
			<el-button class="left" type="text" @click="routerLink(2)">我的收藏</el-button>
		</el-row>
		<el-row class="dvd">
			<el-divider></el-divider>
		</el-row>
		<el-row class="cat">
			<h5>我的钱包</h5>
		</el-row>
		<el-row>
			<el-button class="left" type="text">红包</el-button>
		</el-row>
		<el-row>
			<el-button class="left" type="text">代金券</el-button>
		</el-row>
		<el-row class="dvd">
			<el-divider></el-divider>
		</el-row>
		<el-row class="cat">
			<h5>客服服务</h5>
		</el-row>
		<el-row>
			<el-button class="left" type="text">在线客服</el-button>
		</el-row>
	</div>
</template>

<script>
	export default {
		methods:{
			routerLink(num){
				switch(num){
					case 1:this.$router.push('userOrder');break;
					case 2:this.$router.push('/userCollection');break;
				}
				
			}
		}
	}
</script>

<style>
.cat {
		height: 50px;
		margin-left: 10px;
	}
.dvd {
	height: 20px;
	}
.left{
	height: 30px;
	margin-left: 10px;
	}
</style>
