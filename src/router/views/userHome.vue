<template>
	<div>
		<el-form :model="userInfo">
			<el-form-item label="用户名:">
				{{userInfo.username}}
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
				{{userInfo.money}}
			</el-form-item>
			<el-form-item label="积分:">
				{{userInfo.integral}}
			</el-form-item>
			<el-form-item label="创建时间:">
				<el-date-picker v-model="userInfo.createDate" type="datetime" placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<el-button @click="getUserAddress()">收货地址</el-button>
		
		<el-button @click="dialogTableVisible = true">添加收货地址</el-button>
		<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
			<el-form :model="form">
			    <el-form-item label="住址">
			      <el-input v-model="form.address"></el-input>
			    </el-form-item>
			    <el-form-item label="电话号码">
			      <el-input v-model="form.phone" ></el-input>
			    </el-form-item>
				<el-form-item label="电话号码">
				  <el-input v-model="form.receiver" ></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addAddress()">确 定</el-button>
			  </div>
		</el-dialog>
		
		<el-table :data="userAddress" v-if="userAddress.length" highlight-current-row
			@current-change="handleCurrentChange">
			<el-table-column prop="address" label="地址" width="180">
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="180">
			</el-table-column>
			<el-table-column prop="receiver" label="收货人" width="180">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			userId(){
				return this.$store.state.userId;
			}
			
		},
		data() {
			return {
				userInfo: {},
				userAddress: [],
				currentRow: null,
				dialogTableVisible : false,
				form:{
					"id":0,
					"userId":this.userId,
					"receiver":"张三",
					"address":"北京市大兴区",
					"phone":"13260104993"
				}
				
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
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			addAddress(){
				var that = this;
				var url = this.HOST + "/user/insertAddress";
				that.$axios({
					method: "post",
					url: url,
					params: {
						userId: this.$store.state.userId,
						address: this.form.address,
						phone: this.form.phone,
						receiver:this.form.receiver
					}
				}).then(response => {
					this.dialogTableVisible =false;
					this.userAddress.push(this.form);
					alert("插入成功")
				});
			}
		},
		mounted() {
			this.getUserInfo();
		}
	}
</script>

<style>
</style>
