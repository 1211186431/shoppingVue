<template>
	<div>
		<el-container>
			<el-header>
				<div>
					<el-menu class="el-menu-demo" mode="horizontal"
						@select="handleSelect">
						<el-menu-item index="1">登录</el-menu-item>
						<el-menu-item index="2">购物</el-menu-item>
						<el-menu-item index="3">审核</el-menu-item>
						<el-menu-item index="4">购物车</el-menu-item>
						<el-menu-item index="5">收藏</el-menu-item>
						<el-menu-item index="6">用户信息</el-menu-item>
						<el-menu-item index="7">用户订单</el-menu-item>
					</el-menu>
				</div>
			</el-header>
			<el-container>
				<el-aside width="100px">
					
				</el-aside>
				<el-main>
					<div>
						<router-view></router-view>
					</div>
				</el-main>
			</el-container>
		</el-container>


	</div>
</template>

<script>
	export default {
		name: 'App',
		methods:{
			handleSelect(key, keyPath) {
					switch(key){
						case "1":this.$router.push('/login');break;
						case "2":this.$router.push('/shopping');break;
						case "3":this.$router.push('/audit');break;
						case "4":this.$router.push('/shoppingCart');break;
						case "5":this.$router.push('/userCollection');break;
						case "6":this.$router.push('/userHome');break;
						case "7":this.$router.push('/userOrder');break;
					}
					
	          }
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
