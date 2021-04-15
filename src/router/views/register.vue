<template>
	<el-form label-width="80px" v-model="user" method="post">
		<el-form-item label="用户名">
			<el-input name="name" v-model="user.name"></el-input>
		</el-form-item>
		<el-form-item label="密码">
			<el-input name="password" type="password" v-model="user.password"></el-input>
		</el-form-item>
		<el-form-item label="再次确认">
			<el-input name="password" type="password" v-model="again"></el-input>
		</el-form-item>
		<el-form-item label="电话">
			<el-input name="phone" type="text" v-model="user.phone"></el-input>
		</el-form-item>
		<el-button @click="register()">注册</el-button>
	</el-form>
</template>

<script>
	export default {
		components: {

		},
		computed: {

		},
		data() {
			return {
				user: {
					name: "",
					password: "",
					phone: ""
				},
				again: "",
				myResponse: ""
			}
		},
		methods: {
			register() {
				var url = this.HOST + "/register";
				this.$axios({
					method: "post",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					url: url,
					params: {
						name: this.user.name,
						password: this.user.password,
						phone: this.user.phone
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
			}
		}
	}
</script>

<style>
</style>
