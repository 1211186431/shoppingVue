<template>
	<div class="login">
		<div style="height: 100px;">
			<el-row>
				<el-col :span="12">
					<a href="*"><img style="width: 80px;height: 80px;" src="../../assets/logo.jpg" /></a>
				</el-col>
				<el-col :span="12">
					<el-button style="float: left; color: #55aaff;font-size: 10px;margin-left: 50%;margin-top: 60px;"
						type="text">系统改进建议</el-button>
				</el-col>
			</el-row>
		</div>
		<el-row class="login_center">
			<el-form class="login_form" :model="user" ref="form">
				<el-row style="text-align: center;margin-top: 10px;height: 20px;">
					<h5>用户登录</h5>
				</el-row>
				<el-divider></el-divider>
				<el-row style="margin-left: 10%;">
					<el-input prefix-icon="el-icon-user-solid" placeholder="用户名/手机号" size="medium" style="width: 80%;"
						v-model="user.name">
					</el-input>
				</el-row>
				<el-row style="margin-left: 10%;margin-top: 10px;">
					<el-input prefix-icon="el-icon-lock" placeholder="请输入登录密码" size="medium" style="width: 80%;"
						v-model="user.password" show-password>
					</el-input>
				</el-row>
				<el-row style="margin-top: 10px;margin-left: 10%;">
					<el-col :span="10">
						<el-input v-model="iCode" placeholder="验证码" clearable size="medium" style="width: 100px;">
						</el-input>
					</el-col>
					<el-col :span="12">
						<img :src="this.HOST+'/getVerifiCode'" v-if="ImageCode" />
						<el-button type="text" @click="refashImage()" size="mini">换一张</el-button>
					</el-col>
				</el-row>
				<el-row style="margin-left: 10%;margin-right: 10%; margin-top: 10px;">
					<el-button type="primary" @click="codeChecking()" style="width: 200px;color: #FFFFFF;margin-left: 10%;">登录
					</el-button>
				</el-row>
				<el-row style="margin-left: 50%;margin-top: 10px;">
					<el-button type="text" style="color: #409EFF;">忘记密码</el-button>
					<el-button @click="$router.push('/register')" type="text" style="color: #409EFF;">免费注册</el-button>
				</el-row>
			</el-form>
		</el-row>
		<el-row style="background-color: #e4e4e4;height: 142px;">

		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				iCode: "",
				ImageCode: true,
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
			codeChecking() {
				var url = this.HOST + "/checkCode";
				this.$axios({
					method: "get",
					url: url,
					params: {
						imageCode: this.iCode
					}
				}).then(response => {
					if(response.data.msg=="正确"){
						this.login();
					}
					else
					   alert(response.data.msg)
				});
			},
			refashImage() {
				this.ImageCode = false;
				this.$nextTick(() => {
					this.ImageCode = true
				})
			},
			register() {
				this.$router.push('/register');
			},
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
					if (this.myResponse.code == 200) {		
						this.userId = this.myResponse.data.id;
						this.userName = this.myResponse.data.name;
						this.$store.commit('setUserId', this.userId);
						this.$store.commit('setUserName', this.userName);
						this.$store.commit('setUserRole',this.myResponse.data.role);
						sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state));
						this.$router.push('/shopping');
					} else if (this.myResponse.code == 401) {
						alert(this.myResponse.msg);
					}
				});

			}
		},

	}
</script>

<style>
	.login {
		background-color: #ffffff;
		width: 1250px;
		overflow: hidden;
		margin: 0 auto;
	}

	.login_center {
		background-color: #00aaff;
		height: 350px;
	}

	.login_form {
		width: 25%;
		height: 300px;
		background-color: white;
		border-radius: 2px;
		margin-left: 60%;
		margin-top: 30px;
	}

	.login_input {
		width: 60%;
		height: 23px;
		margin-left: 0;
		/* background-color: #409EFF; */
	}
</style>
