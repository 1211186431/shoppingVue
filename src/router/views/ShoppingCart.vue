<template>
	<div>
		<el-table :data="goodsCartDetail">
			<el-table-column prop="id" width="180">
			</el-table-column>
			<el-table-column prop="name" label="名称" width="180">
			</el-table-column>
			<el-table-column prop="price" label="价格" width="180">
			</el-table-column>
			<el-table-column prop="count" label="数量" width="180">
			</el-table-column>
			<el-table-column label="操作1" width="90">
				<template slot-scope="scope">
					<el-button size="mini" @click.stop="editGoods(scope.$index,1)" icon="el-icon-plus" circle>
					</el-button>
					<el-button size="mini" @click.stop="editGoods(scope.$index,-1)" icon="el-icon-minus" circle>
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作2" width="90">
				<template slot-scope="scope">
					<el-button @click.stop="deleteGoods(scope.$index)" size="small">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div v-show="goodsCart.length">
			<div>
				共计 <span>{{ countAll }}</span> 件商品
			</div>
			<div>
				应付总额 <span>¥ {{ costAll }}</span>
				<br>
			</div>
		</div>
		<el-button @click="buy()">支付</el-button>
	</div>
</template>

<script>
	export default {
		computed: {
			goodsCart() {
				return this.$store.state.ShoppingCart;
			},
			goodsCartDetail() {
				var g = [];
				for (var i = 0; i < this.goodsCart.length; i++) {
					if (this.goodsDetail[i] != null) {
						var gd = {
							id: this.goodsCart[i].id,
							price: this.goodsDetail[i].price,
							name: this.goodsDetail[i].name,
							picture: this.goodsDetail[i].picture,
							count: this.goodsCart[i].count
						}
						g.push(gd);
					}
				}
				return g;
			},
			countAll() {
				let count = 0;
				this.goodsCart.forEach(item => {
					count += item.count;
				});
				return count;
			},
			costAll() {
				let cost = 0;
				this.goodsCartDetail.forEach(item => {
					if (item != null) {
						cost += item.price * item.count;
					}
				});
				return cost;
			}
		},
		data() {
			return {
				goodsDetail: [],
				UserOrder: {
					"orderNumber": "223",
					"userId": this.$store.state.userId,
					"allprice": 140,
					"receiver": "朝阳区",
					"payment": "1111",
					"state": 1,
					"goodsList": []
				},
				OrderDetail: Object,
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
					this.goodsDetail.push(response.data);
				});
			},
			buy() {
				// var goodsList=this.$store.state.ShoppingCart
				//    for(var i=0;i<goodsList.length;i++){
				// 	var g = {
				// 		"goodsId": goodsList[i].goodsId,
				// 		"goodsNum":goodsList[i].goodsNum
				// 	}
				// 	this.UserOrder.goodsList.push(g);
				// }
				// var url = this.HOST + "/Order/set";
				// this.$axios({
				// 	method: "post",
				// 	url: url,
				// 	data: this.UserOrder
				// }).then(response => {
				// 	this.OrderDetail=response.data;
				// }).catch(e => {
				// 	alert("订单错误");
				// });
			},
			deleteGoods(row) {
				if (this.goodsCartDetail[row] != null)
					this.$store.commit('deleteCart', this.goodsCartDetail[row].id);
			},
			editGoods(row, num) {  //编辑方法放vuex那边写了
				if (this.goodsCartDetail[row] != null) {
					if (num < 0 && this.goodsCartDetail[row].count === 1) return;
					this.$store.commit('editCartCount', {
						id: this.goodsCartDetail[row].id,
						count: num
					});
				}
			}
		},
		mounted() {
			if (this.goodsCart.length > 0) {
				for (var i = 0; i < this.goodsCart.length; i++) {
					this.getGoodsDetail(this.goodsCart[i].id)
				}
			}
		}
	}
</script>

<style>
</style>
