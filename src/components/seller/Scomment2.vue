<template>
	<div>
		<el-table :data="goodsComment">
			<el-table-column prop="user_id" label="用户"></el-table-column>
			<el-table-column prop="content" label="评论"></el-table-column>
			<el-table-column prop="grade" label="评分"></el-table-column>
			<el-table-column prop="orderNum" label="订单号"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		props:['goodsId'],
		components: {

		},
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				goodsComment: []
			}
		},
		methods: {
			getGoodsComment() {
				var url = this.HOST + "/comment/getByGoods";
				this.$axios({
					method: "get",
					url: url,
					params: {
						goodsId: this.goodsId
					}
				}).then(response => {
					this.goodsComment=response.data;
				});
			}
		},
		mounted() {
			this.getGoodsComment();
		}
	}
</script>

<style>
</style>
