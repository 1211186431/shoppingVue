<template>
	<div>
		<el-table :data="collection" v-if="collection">
			<el-table-column prop="goods_id" width="180">
			</el-table-column>
			<el-table-column prop="name" label="名称" width="180">
			</el-table-column>
			<el-table-column prop="price" label="价格" width="180">
			</el-table-column>
			<el-table-column prop="createDate" label="收藏时间" width="180">
			</el-table-column>
			<el-table-column label="操作" width="90">
				<template slot-scope="scope">
					<el-button size="mini" @click.stop="deleteColl(scope.$index)" icon="el-icon-delete" type="danger">
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				collection: []
			}
		},
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		methods: {
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
</style>
