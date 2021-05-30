<template>
	<div style="width: 1250px;overflow: hidden;margin: 0 auto;">
		<menu2></menu2>
		<el-row>
			<search></search>
		</el-row>
		<el-row>
			<div style="background-color: #f5f5f5;width: 100%;">
				<div class="main" style="background-color: #f1f1f1">
					<div class="main_left"
						style="margin-top: 10px; text-align: left;background-color: #ffffff;width: 15%;height: 1000px;">
						<allhave></allhave>
					</div>
					<div class="main_right"
						style="margin-top: 10px; margin-left: 1.6%; text-align: left;background-color: #f3f3f3;width: 83%;height: 1000px">
						<el-row>
							<el-col :span="7" style="background-color: #0fbfff;height: 250px;">
								<div style="text-align: center;color: #000000;font-size: 20px;">
									<el-row>
										<img src="../../assets/logo.jpg"
											style="height: 100px;width: 100px; border-radius: 100%;border: 1px solid #000000;" />
									</el-row>
									<el-row style="color: white;font-size: 25px;">{{userInfo.username}}</el-row>
									<el-row style="margin-top: 10px;font-size: 18px;">
										<el-col :span="12">
											<span>钱包：</span>
											{{userInfo.money}}
										</el-col>
										<el-col :span="12">
											<span>积分：</span>
											{{userInfo.integral}}
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-button type="text" style="color: #000000;font-size: 18px;height: 30px;"
												v-show="!isSeller" @click="routerLink(3)">成为商家
											</el-button>
										</el-col>
										<el-col :span="12">
											<el-button type="text" style="color: #000000;font-size: 18px;height: 30px;"
												@click="routerLink(1)" v-show="isSeller">我的店铺
											</el-button>
										</el-col>
									</el-row>
									<el-row style="margin-top: 10px;margin-left: 60%;">
										<el-col :span="2">
											<el-button type="text" style="color:#df4831;font-size: 15px;height: 30px;"
												@click="routerLink(2)" v-show="isAdmin">进入后台管理
											</el-button>
										</el-col>
									</el-row>
								</div>
							</el-col>
							<el-col :span="17" style="background-color: #ffffff;height: 210px;margin-top: 20px;">
								<el-row style="height: 30px;margin-left: 10px;">
									<h4>我的资料</h4>
								</el-row>
								<el-row style="height: 40px;">
									<el-divider></el-divider>
								</el-row>
								<div style="background-color: #ffffff;height: 100px;">
									<el-row style="margin-left: 2%;">
										<el-col style="width: 44%;">
											<span>性别：</span>
											<template>
												<el-radio v-model="radio" label="0">男</el-radio>
												<el-radio v-model="radio" label="1">女</el-radio>
											</template>
										</el-col>
										<el-col style="margin-left: 4%;width: 50%;">
											<span>手机号：</span>
											<input style="width: 70%;height: 25px;" v-model="userInfo.phone" />
										</el-col>
									</el-row>
									<el-row style="margin-top: 10px;margin-left: 2%;">
										<el-col style="width: 44%;">
											<span>邮箱：</span>
											<input style="width: 70%;height: 25px;" v-model="userInfo.email" />
										</el-col>
										<el-col style="margin-left: 4%;width: 50%;">
											<span>所在地：</span>
											<input style="width: 70%;height: 25px;" v-model="userInfo.location" />
										</el-col>
									</el-row>
									<el-row style="margin-top: 15px;margin-left: 85%;">
										<el-button style="background-color: #e2e2e2;" size="medium"
											@click="updateUserInfo()">修改</el-button>
									</el-row>
								</div>
							</el-col>
						</el-row>
						<div style="margin-top: 20px;background-color: #FFFFFF;">
							<el-row style="height: 30px;margin-left: 10px;">
								<span>
									<h4>收获地址</h4>
								</span>
							</el-row>
							<el-row>
								<el-divider></el-divider>
							</el-row>
							<div style="height: 200px; overflow:auto">
								<el-row style="margin-left: 5px;">
									<el-button style="background-color: #e2e2e2;" size="medium"
										@click="dialogTableVisible=true;isEdit=false;">添加地址</el-button>
								</el-row>
								<el-row>
									<el-table :data="userAddress" v-if="userAddress.length">
										<el-table-column prop="address" label="地址" width="180">
										</el-table-column>
										<el-table-column prop="phone" label="电话" width="180">
										</el-table-column>
										<el-table-column prop="receiver" label="收货人" width="180">
										</el-table-column>
										<el-table-column>
											<template slot-scope="porps">
												<el-button @click="editAddress(porps.row)">编辑</el-button>
												<el-button @click="deleteAddress(porps.row)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</el-row>
							</div>
						</div>
						<div style="margin-top: 20px;background-color: #FFFFFF;height: auto;">
							<el-row style="height: 30px;margin-left: 10px;">
								<span>
									<h4>我的订单</h4>
								</span>
							</el-row>
							<el-row>
								<el-divider></el-divider>
							</el-row>
							<div style="height: 300px; overflow:auto">
								<el-row>
									<OrderView v-for="item in userOrder" :key="item.index" :userOrder="item">
									</OrderView>
								</el-row>
							</div>
						</div>

					</div>
				</div>
			</div>
		</el-row>
		<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
			<el-form :model="form">
				<el-form-item label="住址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
				<el-form-item label="电话号码">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="收货人">
					<el-input v-model="form.receiver"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">取 消</el-button>
				<el-button type="primary" @click="addAddress()">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>
<script>
	import menu2 from "../../components/shopping/menu2.vue"
	import search from "../../components/shopping/search.vue"
	import allhave from "../../components/userHome/allhave.vue"
	import OrderView from '../../components/userOrder/OrderView.vue'
	export default {
		components: {
			menu2,
			search,
			allhave,
			OrderView
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			userId() {
				return this.$store.state.userId;
			},
			isSeller() {
				var role = this.$store.state.userRole;
				console.log(role);
				if (role == "ROLE_seller")
					return true;
				else
					return false;
			},
			isAdmin() {
				var role = this.$store.state.userRole;
				if (role == "ROLE_admin")
					return true;
				else
					return false;
			}
		},
		data() {
			return {
				userOrder: [],
				radio: '1',
				userInfo: {},
				userAddress: [],
				currentRow: null,
				dialogTableVisible: false,
				form: {
					"id": 0,
					"userId": this.userId,
					"receiver": "",
					"address": "",
					"phone": ""
				},
				isEdit: false

			}
		},
		methods: {
			getUserOrder() {
				var that = this;
				var url = this.HOST + "/Order/getUserOrder";
				that.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.$store.state.userId
					}
				}).then(response => {
					this.userOrder = response.data
				});
			},
			routerLink(num) {
				if (num == 2)
					this.$router.push('admin');
				if (num == 1)
					this.$router.push('seller');
				if (num == 3)
					this.$router.push('userseller');
			},
			editAddress(row) {
				this.form = row;
				this.isEdit = true;
				this.dialogTableVisible = true;
			},
			deleteAddress(row) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var that = this;
					var url = this.HOST + "/user/deleteAddress";
					that.$axios({
						method: "post",
						url: url,
						params: {
							id: row.id
						}
					}).then(response => {
						this.getUserAddress();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			updateUserInfo() {
				if (this.userInfo.email == "" || this.userInfo.location == "" || this.userInfo.phone == "") {
					alert("信息不能未空");
					return;
				}
				var that = this;
				var url = this.HOST + "/user/UpDateInfo";
				that.$axios({
					method: "post",
					url: url,
					params: {
						userId: this.$store.state.userId,
						email: this.userInfo.email,
						sex: parseInt(this.radio),
						location: this.userInfo.location,
						phone: this.userInfo.phone,
					}
				}).then(response => {
					alert("修改成功");
				});
			},
			goto(key) {
				switch (key) {
					case 1:
						this.$router.push('/userOrder');
						break;
						// case 2:
						// 	this.$router.push('/shellerHome');
						// 	break;
						// case 3:
						// 	this.$router.push('/seller');
						// case 4:
						// 	this.$router.push('');
				}
			},
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
						this.userInfo = response.data;
						this.radio = this.userInfo.sex + "";
						this.getUserAddress();
					}).catch(e => {
						//console.log("权限不足");
					});
				}
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			addAddress() {
				if (this.isEdit) {
					var that = this;
					var url = this.HOST + "/user/updateAddress";
					that.$axios({
						method: "post",
						url: url,
						params: {
							userId: this.$store.state.userId,
							address: this.form.address,
							phone: this.form.phone,
							receiver: this.form.receiver,
							id: this.form.id
						}
					}).then(response => {
						this.dialogTableVisible = false;
						this.isEdit = false;
						this.getUserAddress();
						alert("修改成功")
					});
				} else {
					var that = this;
					var url = this.HOST + "/user/insertAddress";
					that.$axios({
						method: "post",
						url: url,
						params: {
							userId: this.$store.state.userId,
							address: this.form.address,
							phone: this.form.phone,
							receiver: this.form.receiver
						}
					}).then(response => {
						this.dialogTableVisible = false;
						this.getUserAddress();
						alert("插入成功")
					});
				}

			}
		},
		mounted() {
			this.getUserInfo();
			this.getUserOrder();
		}
	}
</script>

<style>
	.main {
		margin-left: 10%;
		margin-right: 10%;
		width: 80%;
		height: 1200px;
		margin-top: 20px;
	}

	.main_left,
	.main_right {
		float: left;
	}

	.header_left,
	.header_center,
	.header_right {
		float: left;
	}

	.lead {
		height: 50px;
		width: 80px;
		color: #4f5ff5;
		font-size: larger;
	}
</style>
