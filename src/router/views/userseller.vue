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
							<div style="margin-top: 20px;background-color: #FFFFFF;height: auto;">
								<el-row style="height: 30px;margin-left: 10px;">
									<span>
										<h4>申请记录</h4>
									</span>
								</el-row>
								<el-row>
									<el-divider></el-divider>
								</el-row>
								<div style="height: 800px; overflow:auto">
									<el-row>
										<div>
											<div>
												<el-table :data="audit" style="width: 100%">
													<el-table-column prop="id" width="0">
													</el-table-column>
													<el-table-column prop="user_id" label="用户编号" width="180">
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
													<el-input type="file" name="certificates" v-model="file1" id="certificates" />
													<!-- <el-input type="submit" value="上传" /> -->
													<el-button @click="setAudit()">成为商家</el-button>
												</el-form>
											</div>
										</div>
									</el-row>
								</div>
							</div>
						</el-row>
					</div>
				</div>
			</div>
		</el-row>
	</div>
</template>

<script>
	import menu2 from "../../components/shopping/menu2.vue"
	import search from "../../components/shopping/search.vue"
	import allhave from "../../components/userHome/allhave.vue"
	export default {
		components: {
			menu2,
			search,
			allhave,
		},
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
				userPic: "",
				file1: null,
			}
		},
		methods: {
			getAudit() {
				var that = this;
				// eslint-disable-next-line no-undef
				var url = this.HOST + "/Audit/admin/getAudit/user";
				that.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.userId
					}
				}).then(response => {
					this.audit = response.data;
				});
			},
			getPicUrl(x) {
				var picUrl = this.audit[x].certificates;
				return this.PicHOST + picUrl;
			},
			setAudit() {
				var url = this.HOST + "/audit/insert";
				const param = new FormData();
				var file_obj = document.getElementById('certificates').files[0];
				param.append("certificates", file_obj);
				param.append("userId", this.userId);
				const config = {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				};
				this.$axios.post(url, param, config).then(res => {
					alert("申请成功");
					this.$router.push('userHome')
				});
			},
	
		},
		mounted() {
			this.getAudit(); //获取申请
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
