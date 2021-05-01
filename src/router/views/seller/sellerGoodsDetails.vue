<template>
	<div>
		<p>商品id：{{goodsId}}</p>
		<p>{{goodsDetail}}</p>
		<SGoods2 :goodsId="goodsId"></SGoods2>
		<p>评论</p>
		<el-table :data="goodsComment">
			<el-table-column prop="user_id" label="用户"></el-table-column>
			<el-table-column prop="content" label="评论"></el-table-column>
			<el-table-column prop="grade" label="评分"></el-table-column>
			<el-table-column prop="orderNum" label="订单号"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	import SGoods2 from '../../../components/SGoods2.vue'
	export default {
		components:{
			SGoods2
		},
		computed: {
			goodsId() {
				return this.$route.params.goodsId;
			}
		},
		data() {
			return {
				goodsDetail: {
					"id": "",
					"user_id": "",
					"inventory": "",
					"oldAndnew": "",
					"state": "",
					"details": "",
					"onsaleDate": "",
					"bargain": "",
					"price": "",
					"name": "",
					"picture": "",
					"delivery": ""
				},
				goodsComment:[]
			}
		},
		methods: {
			getGoodsDetail(id) {
				var url = this.HOST + "/goods/getGoods";
				this.$axios({
					method: "get",
					url: url,
					params: {
						goodsId: id
					}
				}).then(response => {
					this.goodsDetail = response.data;
				});
			},
			getGoodsComment(id){
				var url = this.HOST + "/comment/getByGoods";
				this.$axios({
					method: "get",
					url: url,
					params: {
						goodsId: id
					}
				}).then(response => {
					this.goodsComment = response.data;
				});
			}
		},
		mounted() {
			this.getGoodsDetail(this.goodsId);
			this.getGoodsComment(this.goodsId);
		}
	}
</script>

<style>
</style>
