<template>
	<div class="enroll">
		<el-row style="height: 80px;background-color: #FFFFFF;">
			<a href="*"><img style="width: 80px;height: 80px;" src="../../assets/logo.jpg" /></a>
		</el-row>
		<el-row>
			<div class="rsg_form">
				<el-row style="height: 30px;">
					<h4 style="text-align: left;margin-left: 4%;">用户注册</h4>
				</el-row>
				<el-row style="height: 10px;">
					<el-divider></el-divider>
				</el-row>
				<el-row class="rsg_list" style="margin-top: 30px;">
					<span>用户名</span>
					<el-input style="width: 40%;" class="item" size="mini" v-model="form.name" placeholder="请输入用户名"
						clearable ></el-input>
				</el-row>
				<el-row class="rsg_list">
					<span>密&nbsp;&nbsp;码</span>
					<el-input style="width: 40%;" class="item" size="mini" v-model="form.password" placeholder="请输入密码"
						clearable show-password></el-input>
				</el-row>
				<el-row class="rsg_list">
					<span>确认密码:</span>
					<el-input style="width: 36%;" class="item" size="mini" v-model="form.cheackpassword"
						placeholder="请确认密码" clearable show-password></el-input>
				</el-row>
				<el-row class="rsg_list">
					<span>邮箱:</span>
					<el-input style="width: 40%;" class="item" size="mini" v-model="form.mail" placeholder="请输入绑定的邮箱"
						clearable></el-input>
				</el-row>
				<el-row class="rsg_list">
					<span>手机号码:</span>
					<el-input style="width: 36%;" class="item" size="mini" v-model="form.phone" placeholder="请输入绑定的手机号"
						clearable></el-input>
				</el-row>
				<el-row class="rsg_list">
					<el-input style="width: 20%;" class="item" size="mini" v-model="iCode" placeholder="验证码" clearable>
					</el-input>
					<img :src="this.HOST+'/getVerifiCode'" v-if="ImageCode"
						style="height: 40px;width: 25%;margin-left: 2%;" />
					<el-button @click="refashImage()" size="mini" style="margin-top: 10px;" type="text">换一张</el-button>
					<br />
				</el-row>
				<el-row style="text-align: center;margin-right: 27%;margin-top: 10px;">
					<el-button type="primary" @click="register()" icon="el-icon-upload" size="mini"
						style="margin-right: 20%;">注册</el-button>
				</el-row>
				<router-link to="login">已有账号？登录</router-link>
			</div>
		</el-row>


	</div>
</template>
<script>
	export default {
		data() {
			return {
				iCode: "",
				ImageCode: true,
				form: {
					sex: "",
					name: '',
					password: '',
					cheackpassword: '',
					mail: '',
					phone: ''
				}
			}
		},
		methods: {
			refashImage() {
				this.ImageCode = false;
				this.$nextTick(() => {
					this.ImageCode = true
				})
			},
			register() {
				var url = this.HOST + "/checkCode";
				this.$axios({
					method: "get",
					url: url,
					params: {
						imageCode: this.iCode
					}
				}).then(response => {
					var msg = response.data.msg;
					if(msg=="错误")
					  alert("验证码错误")
					  else{
						  var url = this.HOST + "/register";
						  this.$axios({
						  	method: "post",
						  	headers: {
						  		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
						  	},
						  	url: url,
						  	params: {
						  		name: this.form.name,
						  		password: this.form.password,
						  		phone: this.form.phone
						  	}
						  }).then(response => {
						  	this.myResponse = response.data;
							console.log(this.myResponse);
						  	if (this.myResponse.code == 200) {
						  		alert(this.myResponse.msg);
						  		this.$router.push('/login');
						  	} else if (this.myResponse.code == 0) {
						  		alert(this.myResponse.msg);
						  	}
						  });
					  }
				});

			},
			codeChecking() {
				var url = this.HOST + "/checkCode";
				this.$axios({
					method: "get",
					url: url,
					params: {
						imageCode: this.iCode
					}
				}).then(response => {
					alert(response.data.msg);
				});
			}

		}
	};
</script>
<style>
	.enroll {
		background-color: #f3f3f3;
		width: 1250px;
		overflow: hidden;
		margin: 0 auto;
		height: 580px;
	}

	.rsg_form {
		width: 40%;
		margin-top: 10px;
		background-color: white;
		border-radius: 8px;
		margin-left: 35%;
		text-align: left;
	}

	.item {
		width: 75%;
	}

	.rsg_list {
		margin-left: 15%;
	}
</style>
