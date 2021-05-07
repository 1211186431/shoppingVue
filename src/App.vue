<template>
	<div>
		<el-container>
			<el-header>
				<div>
					<el-menu class="el-menu-demo" mode="horizontal"
						@select="handleSelect">
						<el-menu-item index="1" v-if="userName.length==0">登录</el-menu-item>
						<el-menu-item index="2">购物</el-menu-item>
						<el-menu-item index="3">管理员</el-menu-item>
						<el-menu-item index="4">购物车</el-menu-item>
						<el-menu-item index="5">收藏</el-menu-item>
						<el-menu-item index="6">用户信息</el-menu-item>
						<el-menu-item index="7">用户订单</el-menu-item>
						<el-menu-item index="8">商家</el-menu-item>
						<el-menu-item index="9">聊天</el-menu-item>
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
		</el-container>


	</div>
</template>

<script>
	export default {
		name: 'App',
		components:{
			
		},
		computed:{
			userName(){
				return this.$store.state.userName;
			}
		},
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
						case "8":this.$router.push('/sellerHome');break;
						case "9":this.$router.push('/chat');break;
						case "10":this.logout();break;
					}
					
	          },
			  logout(){
				  var url = this.HOST + "/logout";
				  this.$axios({
				  	method: "post",
				  	headers: {
				  		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				  	},
				  	url: url
				  }).then(response => {
				  		alert(response.data.msg);
						this.$store.commit('setUserId', "");
						this.$store.commit('setUserName',"");
						this.$store.commit('emptyCart');
						sessionStorage.clear();
						this.$router.push('/login');
				  });
				  
			  }
			  
		},
		created() {
			//创建时，将vuex中替换为session中数据
			//刷新时，将store中数据保存到 session中
				sessionStorage.getItem("userMsg") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("userMsg")));
				window.addEventListener("beforeunload",()=>{
				    sessionStorage.setItem("userMsg",JSON.stringify(this.$store.state))
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
