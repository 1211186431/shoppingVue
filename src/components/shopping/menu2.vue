<template>
	<div class="zhuy">
		<div style="width: auto;height: 13px;">
			<div class="daoh" style="float: right;">
				<el-button v-if="userId==0" type="text" @click="handleSelect(1)">登录/注册</el-button>
				<span type="text" v-if="userId!=0">欢迎</span>
				<el-button type="text" @click="handleSelect(3)">主页</el-button>
				<el-button type="text" @click="handleSelect(4)">用户中心</el-button>
				<el-button type="text" @click="handleSelect(5)">成为商家</el-button>
				<el-button type="text" @click="handleSelect(6)">我的收藏</el-button>
				<el-button type="text" @click="handleSelect(7)">我的订单</el-button>
				<el-button type="text" @click="handleSelect(8)">我的消息</el-button>
				<el-button type="text" @click="handleSelect(9)">我的购物车</el-button>
				<el-button type="text" @click="handleSelect(10)" v-if="userId!=0">退出</el-button>
			</div>
		</div>
		<div>
			<el-divider></el-divider>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			userId() {
				return this.$store.state.userId;
			}
		},
		methods: {
			handleSelect(key) {
				switch (key) {
					case 1:
						this.$router.push('/login');
						break;
					case 2:
						this.$router.push('/register');
						break;
					case 3:
						this.$router.push('/shopping');
						break;
					case 4:
						this.$router.push('/userHome');
						break;
					case 5:
						this.$router.push('/seller');
						break;
					case 6:
						this.$router.push('/userCollection');
						break;
					case 7:
						this.$router.push('/userOrder');
						break;
					case 8:
						this.$router.push('/chat');
						break;
					case 9:
						this.$router.push('/shoppingCart');
						break;
					case 10:
						this.logout();
						break;
				}

			},
			logout() {
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
					this.$store.commit('setUserName', "");
					this.$store.commit('emptyCart');
					sessionStorage.clear();
					this.$router.push('/login');
				});
			}
		}
	}
</script>

<style>
	.dh {
		width: auto;
		height: 40px;
	}
</style>
