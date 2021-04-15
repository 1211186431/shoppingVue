<template>
	<div>
		<el-form label-width="80px" v-model="user" method="post" action="http://localhost:8081/login">
			<el-form-item label="用户名">
				<el-input name="name" v-model="user.name"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input name="password" type="password" v-model="user.password"></el-input>
			</el-form-item>
			<!-- <el-input type="submit" value="Submit"></el-input> -->
			<el-button @click="login()">登录</el-button>
		</el-form>
		<router-link to="/register">注册</router-link>
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
				myResponse:{
					msg:"",
					status:""
				},
				userId:"",
				userName:""
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
				    if(this.myResponse.status==200){
						this.userId=this.myResponse.msg.id;
						this.userName=this.myResponse.msg.name;
						this.$store.commit('setUserId',this.userId);
						this.$store.commit('setUserName',this.userName);
						this.$router.push('/shopping');
					}
					else if(this.myResponse.status == 401){
						 alert(this.myResponse.msg);
					}
				});
			}
		},

	}
</script>

<style>
</style>
