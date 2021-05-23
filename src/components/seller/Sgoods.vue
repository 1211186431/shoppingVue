<template>
	<div>
		<el-table :data="goodsDetail" @row-click="clickGoods">
			<el-table-column prop="id" label="商品编号"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="inventory" label="库存"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button :disabled="getGoodsState(scope.row,1)" @click.stop="setGoodsState(scope.row,0)" >下架
					</el-button>
					<el-button :disabled="getGoodsState(scope.row,2)" @click.stop="setGoodsState(scope.row,1)">上架
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		components: {},
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				goodsDetail: [],
				sgoods: false
			}
		},
		methods: {
			setGoodsState(row,num){
				var that = this;
				var url = this.HOST + "/goods/setGoodsState";
				that.$axios({
					method: "post",
					url: url,
					params: {
						goodsId: row.id,
						state: num
					}
				}).then(response => {
					row.state=num;
				});
			},
			getGoodsState(row, num) {
				var state = row.state;
				if (state == 1 && num == 1)
					return false;
				if (state == 0 && num == 2)
					return false;
				return true;
			},
			getSellerGoods() {
				var that = this;
				var url = this.HOST + "/goods/get/Byseller";
				that.$axios({
					method: "get",
					url: url,
					params: {
						sellerId: this.userId
					}
				}).then(response => {
					this.goodsDetail = response.data
				});
			},
			clickGoods(row) {
				this.$emit('goodsDetails', row.id);
			}
		},
		mounted() {
			this.getSellerGoods();
		}

	}
</script>

<style>
</style>
