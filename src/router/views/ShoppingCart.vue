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

		<p>收货地址：{{currentRow}}</p>
		<el-table :data="userAddress" v-if="userAddress.length" highlight-current-row
			@current-change="handleCurrentChange">
			<el-table-column prop="address" label="地址" width="180">
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="180">
			</el-table-column>
		</el-table>
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
				for (var i = 0; i < this.goodsDetail.length; i++) {
					if (this.goodsDetail[i] != null) {
                       const cart=this.goodsCart.find(item => item.goodsId ===  this.goodsDetail[i].id);
						if(cart!=null){
							var gd = {
								id: this.goodsDetail[i].id,
								price: this.goodsDetail[i].price,
								name: this.goodsDetail[i].name,
								picture: this.goodsDetail[i].picture,
								inventory:this.goodsDetail[i].inventory,
								count: cart.goodsNum,
								cartId:cart.id
							}
							g.push(gd);
						}
					}
				}
				return g;
			},
			countAll() {
				let count = 0;
				this.goodsCart.forEach(item => {
					count += item.goodsNum;
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
					"orderNumber": this.generateUUID(),
					"userId": this.$store.state.userId,
					"allprice": "",
					"receiver": null,
					"payment": "1111",
					"state": 1,
					"purchasingDate": "",
					"goodsList": []
				},
				OrderDetail: {},
				userAddress: [],
				currentRow: null
			}
		},
		methods: {
			generateUUID() {
				var d = new Date().getTime();
				if (window.performance && typeof window.performance.now === "function") {
					d += performance.now(); //use high-precision timer if available
				}
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (d + Math.random() * 16) % 16 | 0;
					d = Math.floor(d / 16);
					return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
				});
				return uuid;
			},
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
				var goodsList = this.$store.state.ShoppingCart
				if (this.UserOrder.receiver != null && goodsList != null) {
					this.UserOrder.purchasingDate = new Date();
					for (var i = 0; i < goodsList.length; i++) {
						var g = {
							"goodsId": goodsList[i].goodsId,
							"goodsNum": goodsList[i].goodsNum
						}
						this.UserOrder.goodsList.push(g);
					}
					this.UserOrder.allprice = this.costAll;
					console.log(this.UserOrder);
					var url = this.HOST + "/Order/set";
					this.$axios({
						method: "post",
						url: url,
						data: this.UserOrder
					}).then(response => {
						this.OrderDetail = response.data;
						this.$store.dispatch('deleteAllGoods',this.$store.state.userId);
						alert("购买成功");
					}).catch(e => {
						alert("订单错误");
					});
				} else
					alert("订单错误");

			},
			deleteGoods(row) {
				if (this.goodsCartDetail[row] != null){
					this.$store.dispatch('deleteGoods', this.goodsCartDetail[row].cartId);
				}	
			},
			editGoods(row, num) { 
				if (this.goodsCartDetail[row] != null) {
					var n=this.goodsCartDetail[row].count+num;
					if ((num < 0 && this.goodsCartDetail[row].count === 1) || n>this.goodsCartDetail[row].inventory) return;
					var newCart=this.goodsCart.find(item => item.id === this.goodsCartDetail[row].cartId)
					newCart.goodsNum+=num;
					this.$store.dispatch('editCart',newCart);
				}
			},
			handleCurrentChange(val) {
				this.currentRow = val;
				this.UserOrder.receiver = val.id;
			},
			getUserAddress() {
				var that = this;
				var url = this.HOST + "/user/getUserAddress";
				that.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.$store.state.userId
					}
				}).then(response => {
					this.userAddress = response.data
				});
			}
		},
		mounted() {
			if (this.goodsCart.length > 0) {
				for (var i = 0; i < this.goodsCart.length; i++) {
					this.getGoodsDetail(this.goodsCart[i].goodsId)
				}
			}
			this.getUserAddress();

		},
		watch:{
			goodsCart(){
				// if (this.goodsCart.length > 0) {
				// 	for (var i = 0; i < this.goodsCart.length; i++) {
				// 		this.getGoodsDetail(this.goodsCart[i].goodsId)
				// 	}
				// }
				//console.log("1111");
			}
		}
	}
</script>

<style>
</style>
