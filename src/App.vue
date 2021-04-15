<template>
	<div>
		<el-container>
			<el-header>
				<div>

				</div>
			</el-header>
			<el-container>
				<el-aside width="100px">
					<div>
						<router-link to="/login">登录</router-link>
						<p></p>
						<router-link to="/shopping">购物</router-link>
						<p></p>
						<router-link to="/audit">审核</router-link>
						<p></p>
						<router-link to="/chat">聊天</router-link>
					</div>
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
