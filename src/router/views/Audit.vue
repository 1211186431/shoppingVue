<template>
	<div>
		<el-button @click="aseller=true">审核商家</el-button>
		<el-button @click="agoods=true">审核商品</el-button>
		<el-button @click="acomment=true">查看评论</el-button>
		<el-button @click="auser=true">查看用户</el-button>
		<div v-show="aseller">
			<el-table :data="audit" style="width: 100%" @row-click="upDateAudit">
				<el-table-column prop="id" width="0">
				</el-table-column>
				<el-table-column prop="user_id" label="用户id" width="180">
				</el-table-column>
				<el-table-column prop="certificates" label="证件" width="180">
					<template slot-scope="scope">
						<img style="width:150px;height:60px;" :src="getPicUrl(scope.$index)" />
					</template>
				</el-table-column>
				<el-table-column prop="state" label="状态" width="180">
				</el-table-column>
			</el-table>
		</div>
		<div v-show="agoods">
			<p>商品</p>
			<el-table :data="goods">
				<el-table-column prop="id" label="商品id"></el-table-column>
				<el-table-column prop="user_id" label="商家id"></el-table-column>
				<el-table-column prop="price" label="价格"></el-table-column>
				<el-table-column prop="picture" label="照片" width="180">
					<template slot-scope="scope">
						<img style="width:150px;height:60px;" :src="getPicUrl2(scope.$index)" />
					</template>
				</el-table-column>
				<el-table-column prop="state" label="状态"></el-table-column>
			</el-table>
		</div>
		<div v-show="acomment">
			<p>评论</p>
			<el-table :data="comments">
				<el-table-column prop="id" label="商品id"></el-table-column>
				<el-table-column prop="user_id" label="用户id"></el-table-column>
				<el-table-column prop="goods_id" label="商品id"></el-table-column>
				<el-table-column prop="content" label="评论"></el-table-column>
				<el-table-column prop="state" label="状态"></el-table-column>
			</el-table>
		</div>
		<div v-show="auser">
			<p>用户</p>
			<el-table :data="users">
				<el-table-column prop="id" label="用户id"></el-table-column>
				<el-table-column prop="state" label="状态"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				audit: [],
				auditInfo: {
					id: "",
					user_id: "",
					admin_id: "",
					createDate: "",
					updateTime: "",
					certificates: "",
					state: ""
				},
				goods: [],
				comments: [],
				users: [],
				aseller: false,
				agoods: false,
				acomment: false,
				auser: false
			}
		},
		methods: {
			getAudit() {
				var that = this;
				// eslint-disable-next-line no-undef
				var url = this.HOST + "/Audit/admin/getAudit/admin";
				that.$axios({
					method: "get",
					url: url,
					params: {
						adminId: this.userId
					}
				}).then(response => {
					this.audit = response.data
				}).catch(e => {
					//console.log("权限不足");
				});
			},
			getGoods() {
				var that = this;
				// eslint-disable-next-line no-undef
				var url = this.HOST + "/Audit/getOffGoods";
				that.$axios({
					method: "get",
					url: url,
				}).then(response => {
					this.goods = response.data
				}).catch(e => {
					//console.log("权限不足");
				});
			},
			getComment() {
				var that = this;
				var url = this.HOST + "/Audit/getAllComment";
				that.$axios({
					method: "get",
					url: url,
				}).then(response => {
					this.comments = response.data
				}).catch(e => {
					//console.log("权限不足");
				});
			},
			getUser() {
				var that = this;
				// eslint-disable-next-line no-undef
				var url = this.HOST + "/Audit/getAllUser";
				that.$axios({
					method: "get",
					url: url,
				}).then(response => {
					this.users = response.data
				}).catch(e => {
					//console.log("权限不足");
				});
			},
			getPicUrl(x) {
				var picUrl = this.audit[x].certificates;
				return this.HOST + picUrl;
			},
			getPicUrl2(x) {
				var picUrl = this.goods[x].picture;
				return this.HOST + picUrl;
			},
			upDateAudit(row) {
				// var url = this.HOST + "/Audit/insert";
				// const param = new FormData();
				// var file_obj = document.getElementById('certificates').files[0];
				// param.append("certificates", file_obj);
				//             param.append("userId", this.userId1);
				// const config = {
				// 	headers: {
				// 		"Content-Type": "multipart/form-data"
				// 	}
				// };
				// this.$axios.post(url, param, config).then(res => {
				// 	console.log(res);
				// });
				this.$confirm('修改状态?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var that = this;
					var url = this.HOST + "/Audit/admin/updateAudit";
					that.$axios({
						method: "post",
						url: url,
						params:{
							"AuditId":row.id,
							"state":1
						}
					}).then(response => {
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
					});
					row.state=1;
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消修改'
					});
				});

			}
		},
		mounted() {
			this.getAudit();
			this.getComment();
			this.getGoods();
			this.getUser();
		}
	}
</script>

<style>
</style>
