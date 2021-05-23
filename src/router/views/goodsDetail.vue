<template>
	<div>
		<el-row>
			<menu2></menu2>
		</el-row>
		<el-row>
			<div>
				<div v-if="goodsDetail">
					<div class="product2">
						<el-row :gutter="10">
							<el-col :span="10">
								<div class="img">
									<img :src="this.PicHOST+goodsDetail.picture">
								</div>
							</el-col>
							<el-col :span="14">
								<el-col :span="14">
									<div class="product-name">
										<h1 class="name">{{goodsDetail.name}}</h1>
									</div>
								</el-col>

								<el-col :span="14">
									<div class="product-price">
										<span style="font-size:15px ;color:  #717273;">售价 ￥</span>
										<div class="price">{{goodsDetail.price}}</div>
									</div>
								</el-col>

								<el-col :span="14">
									<div class="product-inventory">
										<span style="font-size:15px ;color:  #717273;">库存 :</span>
										<div class="inventory">{{goodsDetail.inventory}}</div>
									</div>
								</el-col>

								<el-col :span="14">
									<div class="product-oldAndnew">
										<span style="font-size:15px ;color:  #717273;">新旧程度 :</span>
										<div class="oldAndnew">{{goodsDetail.oldAndnew}}</div>
									</div>
								</el-col>

								<el-col :span="14">
									<div class="product-bargain">
										<span style="font-size:15px ;color:  #717273;">是否接受还价 :</span>
										<div class="bargain">
											<el-switch v-model="bargain"></el-switch>
										</div>
									</div>
								</el-col>

								<el-col :span="14">
									<div class="product-delivery">
										<span style="font-size:15px ;color:  #717273;">发货地 :</span>
										<div class="delivery">{{goodsDetail.delivery}}</div>
									</div>
								</el-col>

								<el-col :span="14">
									<div class="addCart">
										<el-button type="primary" @click="addCart">加入购物车</el-button>
									</div>
									<div class="collection">
										<el-button icon="el-icon-star-off" @click="addCollection()" v-show="isColl<0">
											加入收藏
										</el-button>
										<el-button icon="el-icon-star-on" @click="deleteCollection()" v-show="isColl>0">
											已收藏
										</el-button>
									</div>
								</el-col>
								<el-col :span="14">
									<div class="info">
										{{goodsDetail.details}}
									</div>

								</el-col>
							</el-col>
						</el-row>
					</div>
				</div>
				<contactUser :goodsId="goodsId"></contactUser>
			</div>
		</el-row>
	</div>

</template>

<script>
	import contactUser from '../../components/userChat/contactUser.vue'
	import menu2 from "../../components/shopping/menu2.vue"
	export default {
		components: {
			contactUser,
			menu2
		},
		computed: {
			goodsId() {
				return this.$route.params.goodsId;
			},
			bargain() {
				if (this.goodsDetail.bargain == 0)
					return false;
				else
					return true;
			},
			UserCollection() {
				return this.$store.state.UserCollection;
			},
			isColl() {
				var g = parseInt(this.goodsId); //通过url传过来的是字符串
				const i = this.UserCollection.find(item => item.goodsId === g);
				if (i != null)
					return i.id;
				else
					return -1;
			},
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				goodsDetail: {},
				sellerDetil: null
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
				var s = {
					"id": 0,
					"userId": this.userId,
					"goodsId": this.goodsId,
					"goodsNum": 1
				}
				var cart = this.$store.state.ShoppingCart.find(item => item.goodsId === this.goodsId);
				//不让它重复加入了
				if (cart == null) {
					this.$store.dispatch('addUserCart', s);
					alert("加入成功");
				} else
					alert("购物车中已拥有");
			},
			addCollection() {
				if (this.$store.state.userId != "") {
					var url = this.HOST + "/collection/insert";
					this.$axios({
						method: "post",
						url: url,
						params: {
							userId: this.$store.state.userId,
							goodsId: this.goodsId
						}
					}).then(response => {
						response.data;
						var usercoll = {
							id: response.data,
							goodsId: parseInt(this.goodsId)
						};
						alert("收藏成功");
						this.$store.commit('addUserCollection', usercoll);
					});
				} else {
					alert("您还未登录")
				}
			},
			deleteCollection() {
				var url = this.HOST + "/collection/delete";
				this.$axios({
					method: "post",
					url: url,
					params: {
						collId: this.isColl
					}
				}).then(response => {
					alert("删除成功");
					this.$store.commit('deleteUserCollection', this.goodsId);
				});
			}
		},
		mounted() {
			this.getGoodsDetail(this.goodsId);
		}

	}
</script>

<style>
	.info {
		text-align: left;
		font-size: small;
	}

	.collection {
		float: left;
		display: inline;
		margin-left: 10px;
		margin-bottom: 30px;
	}

	.addCart {
		float: left;
		display: inline;
		margin-bottom: 30px;
	}

	.product-delivery {
		text-align: left;
		margin-bottom: 30px;
	}

	.delivery {
		color: #717273;
		font-size: 18px;
		text-align: left;
		display: inline;
	}

	.product-bargain {

		text-align: left;
		margin-bottom: 10px;
	}

	.bargain {
		color: #717273;
		font-size: 20px;
		text-align: left;
		display: inline;
	}

	.product-oldAndnew {
		text-align: left;
		margin-bottom: 10px;
	}

	.oldAndnew {
		color: #717273;
		font-size: 20px;
		text-align: left;
		display: inline;
	}

	.inventory {
		color: #717273;
		font-size: 20px;
		text-align: left;
		display: inline;
	}

	.product-inventory {
		text-align: left;
		margin-bottom: 10px;
	}

	.product-price {
		text-align: left;
		margin-bottom: 10px;
	}

	.price {
		color: red;
		font-size: 20px;
		text-align: left;
		display: inline;
	}

	.product-name {
		margin-bottom: 10px;
	}

	.name {
		font-size: 20px;
		color: #717273;
		text-align: left;
	}

	.img {
		border: 2px solid #dddee1;
		border-radius: 10px;
		height: 500px;
		width: 100%;
		vertical-align: middle;
	}

	.img img {
		max-width: 100%;
		max-height: 100%;
		display: block;
		margin: auto;
	}

	.product2 {
		margin: 32px;
		padding: 32px;
		background: #fff;
		border: 2px solid #dddee1;
		border-radius: 10px;
		overflow: hidden;
	}

	.el-row {

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
