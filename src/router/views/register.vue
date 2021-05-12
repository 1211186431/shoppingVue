<template>
	<div class="enroll">
		<el-form class="form" :rules="rules" :model="form" ref="form" @keyup.enter.native="register()">
			<h3 style="text-align: center;">用户注册</h3>
			<el-form-item label="用户名" label-width="80px" prop="name">
				<el-input class="item" v-model="form.name" placeholder="请输入用户名" clearable></el-input>
			</el-form-item>
			<el-form-item label="密码" label-width="80px" prop="password">
				<el-input class="item" v-model="form.password" placeholder="请输入密码" type="password" clearable></el-input>
			</el-form-item>
			<el-form-item label="确认密码" label-width="80px" prop="checkpassword">
				<el-input class="item" v-model="form.checkpassword" placeholder="再次输入密码" type="password" clearable>
				</el-input>
			</el-form-item>
			<el-form-item label="邮箱" label-width="80px" prop="mail">
				<el-input class="item" v-model="form.mail" placeholder="请输入邮箱" clearable></el-input>
			</el-form-item>
			<el-form-item label="手机号码" label-width="80px" prop="phone">
				<el-input class="item" v-model="form.phone" placeholder="请输入电话号码" clearable></el-input>
			</el-form-item>
			<el-form-item label="验证码" label-width="80px">
				<img :src="this.HOST+'/getVerifiCode'" v-if="ImageCode" />
				<el-button @click="refashImage()">换一张</el-button>
				<el-input class="item" v-model="iCode" placeholder="验证码" clearable></el-input>
				<el-button @click="codeChecking()">验证</el-button>
			</el-form-item>

			<el-form-item style="text-align: center;">
				<el-button type="primary" @click="register('form')" icon="el-icon-upload">注册</el-button>

				<el-button @click="resetForm('form')">重置</el-button>
			</el-form-item>
			<router-link to="login">已有账号？登录</router-link>
		</el-form>

	</div>
</template>
<script>
	export default {

		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var phoneNumber = (rule, value, callback) => {
				if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !==
						11)) {
					callback(new Error('手机号码不符合规范'));
				} else {
					callback();
				}
			};


			return {
				iCode:"",
				ImageCode: true,
				form: {
					sex: "",
					name: '',
					password: '',
					cheackpassword: '',
					mail: '',
					phone: ''
				},
				rules: {
					name: [{
							required: true,
							message: '用户名不能为空',
							trigger: 'blur'
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
							message: '密码不能为空',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: "长度在 6 到 12 个字符",
							trigger: "blur"
						}
					],
					checkpassword: [{
							required: true,
							message: '请再次输入密码',
							trigger: 'blur'
						},
						{
							validator: validatePass,
							trigger: 'blur',
							required: true
						}
					],
					mail: [{
							required: true,
							message: '请填写邮箱',
							trigger: 'blur'
						},
						{
							type: 'string',
							message: '邮箱格式不正确',
							trigger: 'blur',
							transform(value) {
								if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
										value)) {
									return true
								} else {}
							}
						},
						{
							type: 'string',
							message: '长度不能超过30位',
							trigger: 'blur',
							max: 30
						}
					],
					phone: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							validator: phoneNumber,
							trigger: 'blur',
							required: true
						}
					]

				}
			};
		},
		methods: {
			refashImage() {
				this.ImageCode = false;
				this.$nextTick(() => {
					this.ImageCode = true
				})
			},
			register(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.register2();
						console.log(this.form);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			register2() {
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
					if (this.myResponse.state == 1) {
						alert(this.myResponse.msg);
						this.$router.push('/login');
					} else if (this.myResponse.state == 0) {
						alert(this.myResponse.msg);
					}
				});
			},
			codeChecking(){
				var url = this.HOST + "/checkCode";
				this.$axios({
					method: "get",
					url: url,
					params: {
						imageCode:this.iCode
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
