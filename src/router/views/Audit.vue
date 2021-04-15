<template>
	<div>
		<div>
			<el-input type="text" v-model="adminId1" placeholder="请输入管理员id"></el-input>
			<el-button @click="getAudit()">获取</el-button>
			<el-table :data="audit" style="width: 100%">
				<el-table-column prop="id" width="0">
				</el-table-column>
				<el-table-column prop="user_id" label="用户名" width="180">
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

		<div>
			
			<el-form action="http://localhost:8081/Audit/insert" method="post" enctype="multipart/form-data">
				<label>上传图片</label>
				<el-input type="file" name="certificates" v-model="file1" id="certificates"/>
				<el-input type="text" v-model="userId1" name="userId"></el-input>
				<!-- <el-input type="submit" value="上传" /> -->
				<el-button @click="setAudit()">成为商家</el-button>
			</el-form>

		</div>
	</div>
</template>

<script>
	export default {
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
				adminId1: "",
				userId1: "",
				userPic: "",
				file1: ""
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
						adminId: this.adminId1
					}
				}).then(response => {
					this.audit = response.data
				}).catch(e => {
					//console.log("权限不足");
				});
			},
			getPicUrl(x) {
				var picUrl = this.audit[x].certificates;
				return "http://localhost:8081" + picUrl;
			},
			setAudit() {

				var url = this.HOST + "/Audit/insert";
				const param = new FormData();
				var file_obj = document.getElementById('certificates').files[0];
				param.append("certificates", file_obj);
                param.append("userId", this.userId1);
				const config = {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				};
				this.$axios.post(url, param, config).then(res => {
					console.log(res);
				});


			}
		},
		mounted() {
			this.userId1 = this.$store.state.userId;
		}
	}
</script>

<style>
</style>
