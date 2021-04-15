<template>
	<div>
		<p>{{this.goodsId}}</p>
		<p>{{this.goodsDetail}}</p>
		<el-button @click="addCart()">加入购物车</el-button>

		<el-table :data="this.$store.state.ShoppingCart">
			<el-table-column prop="goodsId" width="180"></el-table-column>
			<el-table-column prop="goodsName" label="名称" width="180">
			</el-table-column>
			<el-table-column prop="goodsPrice" label="价格" width="180">
			</el-table-column>
			<el-table-column prop="goodsNum" label="数量" width="180">
			</el-table-column>
		</el-table>
		<el-button @click="buy()">支付</el-button>
		<p>{{this.OrderDetail}}</p>
	</div>
</template>

<script>
	export default {
		components: {

		},
		computed: {
			goodsId() {
				return this.$store.state.goodsId;
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
				UserOrder: {
					"orderNumber":"223",
					"userId": this.$store.state.userId,
					"allprice": 140,
					"receiver": "朝阳区",
					"payment":"1111",
					"state":1,
					"goodsList": []
				},
				OrderDetail:""
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
			addCart() {
				var goods = {
					"goodsId": this.goodsId,
					"goodsName": this.goodsDetail.name,
					"goodsPrice": this.goodsDetail.price,
					"goodsNum": 1
				}
				this.$store.commit('addShoppingCart', goods);
			},
			buy() {
				var goodsList=this.$store.state.ShoppingCart
                for(var i=0;i<goodsList.length;i++){
					var g = {
						"goodsId": goodsList[i].goodsId,
						"goodsNum":goodsList[i].goodsNum
					}
					this.UserOrder.goodsList.push(g);
				}
				var url = this.HOST + "/Order/set";
				this.$axios({
					method: "post",
					url: url,
					data: this.UserOrder
				}).then(response => {
					this.OrderDetail=response.data;
				}).catch(e => {
					alert("订单错误");
				});
			}
		},
		mounted() {
			this.getGoodsDetail(this.goodsId);
		}

	}
</script>

<style>
</style>
