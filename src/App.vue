<template>
	<div>
		<!-- <el-container>
			<el-header>
				<div>
					<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-menu-item index="1" v-if="userName.length==0">登录</el-menu-item>
						<el-menu-item index="2">购物</el-menu-item>
						<el-menu-item index="3">管理员</el-menu-item>
						<el-menu-item index="4">购物车</el-menu-item>
						<el-menu-item index="5">收藏</el-menu-item>
						<el-menu-item index="6">用户信息</el-menu-item>
						<el-menu-item index="7">用户订单</el-menu-item>
						<el-menu-item index="8">商家</el-menu-item>
						<el-menu-item index="9" v-if="userName!=''">
							<el-badge :is-dot="true" class="item">
								<el-button icon="el-icon-s-comment"></el-button>
							</el-badge>
						</el-menu-item>
						<el-menu-item index="10">登出</el-menu-item>
					</el-menu>
				</div>
			</el-header>
			<el-container>
				<el-main>
					<div>
						<router-view></router-view>
					</div>
				</el-main>
			</el-container>
		</el-container> -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data(){
			return{
				
			}
		},
		components: {
           
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			}
		},
		methods: {
		

		},
		created() {
			//创建时，将vuex中替换为session中数据
			//刷新时，将store中数据保存到 session中
			sessionStorage.getItem("userMsg") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("userMsg")));
			window.addEventListener("beforeunload", () => {
				sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state))
			})
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
