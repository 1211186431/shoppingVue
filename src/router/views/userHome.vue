<template>
	<div>
		<p v-if="userName">欢迎用户：{{userName}}</p>
		<p>{{userInfo}}</p>
		<el-form :model="userInfo">
			<el-form-item label="用户名:">
				<el-input style="width:200px" v-model="userInfo.username"></el-input>
			</el-form-item>
			<el-form-item label="性别:">
				<el-input style="width:200px" v-model="userInfo.sex"></el-input>
			</el-form-item>
			<el-form-item label="手机号:">
				<el-input style="width:200px" v-model="userInfo.phone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱:">
				<el-input style="width:200px" v-model="userInfo.email"></el-input>
			</el-form-item>
			<el-form-item label="所在地:">
				<el-input style="width:200px" v-model="userInfo.location"></el-input>
			</el-form-item>
			<el-form-item label="钱包:">
				<el-input style="width:200px" v-model="userInfo.money"></el-input>
			</el-form-item>
			<el-form-item label="积分:">
				<el-input style="width:200px" v-model="userInfo.integral"></el-input>
			</el-form-item>
			<el-form-item label="创建时间:">
				<el-date-picker v-model="userInfo.createDate" type="datetime" placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<el-button @click="getUserAddress()">收货地址</el-button>
		<el-table :data="userAddress" v-if="userAddress.length" highlight-current-row
			@current-change="handleCurrentChange">
			<el-table-column prop="address" label="地址" width="180">
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="180">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		computed: {
			userName() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				userInfo: {},
				userAddress: [],
				currentRow: null
			}
		},
		methods: {
			getUserAddress() {
				var that = this;
				var url = this.HOST + "/user/getUserAddress";
				that.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.$store.state.userId
					}
				}).then(response => {
					this.userAddress = response.data
				});
			},
			getUserInfo() {
				if (this.$store.state.userId == "") {
					alert("您还未登录");
					this.$router.push('/login');
				} else {
					var that = this;
					var url = this.HOST + "/user/getUserInfo";
					that.$axios({
						method: "get",
						url: url,
						params: {
							userId: this.$store.state.userId
						}
					}).then(response => {
						this.userInfo = response.data
					}).catch(e => {
						//console.log("权限不足");
					});
				}
			},
			handleCurrentChange(val){
				this.currentRow=val;
			}
		},
		mounted() {
			this.getUserInfo();
		}
	}
</script>

<style>
</style>
