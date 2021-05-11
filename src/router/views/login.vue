<template>
	<div class="login">
		<el-form class="form" :model="user" ref="form">
			<h3 style="text-align: center;">登录界面</h3>
			<el-form-item label="用户名" label-width="80px" prop="name">
				<el-input class="item" v-model="user.name"></el-input>
			</el-form-item>
			<el-form-item label="密码" label-width="80px" prop="password">
				<el-input class="item" v-model="user.password" show-password ></el-input>
			</el-form-item>
			<el-form-item style="text-align: center;">
				<el-button type="primary" @click="login">登录</el-button>
				<el-button @click="$router.push('/register')">注册</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: "",
					password: ""
				},
				myResponse: {
					msg: "",
					status: ""
				},
				userId: "",
				userName: "",
				rules: {
					name: [{
							required: true,
							message: "请输入用户名",
							trigger: "blur"
						},
						{
							min: 3,
							max: 5,
							message: "长度在 3 到 5 个字符",
							trigger: "blur"
						}
					],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							max: 12,
							message: "长度在 6 到 12 个字符",
							trigger: "blur"
						}
					]
				}
			}
		},
		methods: {
			login() {
				var url = this.HOST + "/login";
				this.$axios({
					method: "post",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					url: url,
					params: {
						name: this.user.name,
						password: this.user.password,
					}
				}).then(response => {
					this.myResponse = response.data;
					if (this.myResponse.status == 200) {
						this.userId = this.myResponse.msg.id;
						this.userName = this.myResponse.msg.name;
						this.$store.commit('setUserId', this.userId);
						this.$store.commit('setUserName', this.userName);
						sessionStorage.setItem("userMsg",JSON.stringify(this.$store.state));
						this.setUserColl();
						this.$store.dispatch('getUserCart');
						this.$router.push('/shopping');
					} else if (this.myResponse.status == 401) {
						alert(this.myResponse.msg);
					}
				});
			},
			setUserColl(){
				var url = this.HOST + "/collection/get";
				this.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.userId
					}
				}).then(response => {
				    for(var  i=0;i<response.data.length;i++){
						var usercoll={
							id:response.data[i].id,
							goodsId:response.data[i].goods_id
						};
						this.$store.commit('addUserCollection',usercoll);
					}
				});
				
			}
		},

	}
</script>

<style>
	.login {
		background-color: #909399;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
	}

	.form {
		width: 40%;
		margin-bottom: 20vh;
		background-color: white;
		border-radius: 2px;
		padding: 5% 3%;
	}

	.item {
		width: 75%;
	}
</style>
