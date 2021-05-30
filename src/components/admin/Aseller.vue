<template>
	<div>
		<el-table :data="audit" style="width: 100%" @row-dblclick="upDateAudit">
			<el-table-column prop="id" width="0">
			</el-table-column>
			<el-table-column prop="user_id" label="用户id" width="180">
			</el-table-column>
			<el-table-column prop="certificates" label="证件" width="180">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="getPicUrl(scope.$index,1)"
						:preview-src-list="getPicUrl(scope.$index,2)" >
					</el-image>
				</template>
			</el-table-column>
			<el-table-column prop="state" label="状态" width="180">
			</el-table-column>
		</el-table>
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
				}
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
			getPicUrl(x, num) {
				var picUrl = this.audit[x].certificates;
				if (num == 1)
					return this.PicHOST + picUrl;
				else {
					var u = [];
					u.push(this.PicHOST + picUrl);
					return u;
				}
			},
			upDateAudit(row) {
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
						params: {
							"AuditId": row.id,
							"state": 1
						}
					}).then(response => {
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
					});
					row.state = 1;
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
		}
	}
</script>

<style>
</style>
