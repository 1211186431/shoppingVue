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
										<h4>我的收藏</h4>
									</span>
								</el-row>
								<el-row>
									<el-divider></el-divider>
								</el-row>
								<div style="height: 800px; overflow:auto">
									<el-row>
										<div>
											<el-table :data="collection" v-if="collection">
												<el-table-column  width="180">
													<template slot-scope="scope">
														<el-image style="width: 100px; height: 100px"
															:src="getPicUrl(scope.$index,1)"
															:preview-src-list="getPicUrl(scope.$index,2)">
														</el-image>
													</template>
												</el-table-column>
												<el-table-column prop="name" label="名称" width="180">
													<template slot-scope="scope">
														<router-link :to="'/goodsDetail/' + scope.row.goods_id"> {{scope.row.name}}</router-link>
													</template>
												</el-table-column>
												<el-table-column prop="price" label="价格" width="180">
												</el-table-column>
												<el-table-column label="收藏时间" width="180">
													<template slot-scope="scope">
														<span>{{createDate(scope.row)}}</span>
													</template>
												</el-table-column>
												<el-table-column label="操作" width="90">
													<template slot-scope="scope">
														<el-button size="mini" @click.stop="deleteColl(scope.$index)"
															icon="el-icon-delete" type="danger">
														</el-button>
													</template>
												</el-table-column>
											</el-table>
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
	import * as dateUtils from "../../util/myDate.js"
	export default {
		components: {
			menu2,
			search,
			allhave,
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				collection: []
			}
		},
		methods: {
			getPicUrl(x, num) {
				var picUrl=this.collection[x].picture;
				if (num == 1)
					return this.PicHOST + picUrl;
				else {
					var u = [];
					u.push(this.PicHOST + picUrl);
					return u;
				}
			},
			createDate(row) {
				let d2 = new Date(row.createDate);
				return dateUtils.formatDate(d2, 'yyyy-MM-dd hh:mm:ss');
			},
			getCollection() {
				var url = this.HOST + "/collection/get";
				if (this.userId != "") {
					this.$axios({
						method: "get",
						url: url,
						params: {
							userId: this.userId
						}
					}).then(response => {
						this.collection = response.data;
					});
				} else {
					alert("您还为登录");
				}

			},
			deleteColl(row) {
				var url = this.HOST + "/collection/delete";
				this.$axios({
					method: "post",
					url: url,
					params: {
						collId: this.collection[row].id
					}
				}).then(response => {
					this.collection.splice(row, 1);
					this.$store.commit('deleteUserCollection', this.collection[row].goods_id);
					alert("删除成功");
				});
			}
		},
		mounted() {
			this.getCollection();
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
