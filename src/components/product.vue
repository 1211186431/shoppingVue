<template>
	<div class="product" v-if="!this.isSeller()">
		<router-link :to="'/goodsDetail/' + info.id" class="product-main">
			<img :src="this.PicHOST + info.picture" style="height:150px;">
			<div class="product-cost">¥ {{ info.price }}</div>
			<h4>{{ info.name }}</h4>
			<div class="product-add-cart" @click.prevent=" addCart()">加入购物车</div>
		</router-link>
	</div>
</template>
<script>
	export default {
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		props: {
			info: Object
		},
		data() {
			return {
				goodsDetail: {}
			}
		},
		methods: {
			addCart() {  
				if (this.userId != "" ) {
					var s = {
						"id": 0,
						"userId": this.userId,
						"goodsId": this.info.id,
						"goodsNum": 1
					}
					var cart = this.$store.state.ShoppingCart.find(item => item.goodsId === this.info.id);
					//不让它重复加入了
					if (cart == null) {
						this.$store.dispatch('addUserCart', s);
						alert("加入成功");
					} 
					else
						alert("购物车中已拥有");

				} else
					alert("未登录");
			},
			isSeller() {
				if (this.userId == this.info.user_id)
					return true;
				else
					return false;
			}

		}
	};
</script>
<style scoped>
	.product {
		width: 25%;
		float: left;
	}

	.product-cost {
		color: red;
		font-size: 30px;
		text-align: left;
		margin-bottom: -20px;

	}

	.product-main {
		display: block;
		margin: 16px;
		padding: 16px;
		border: 2px solid #dddee1;
		border-radius: 6px;
		overflow: hidden;
		background: #fff;
		text-decoration: none;
		position: relative;

	}

	.product-main img {
		/* max-width: 100%;
		max-height: 100%;
		display: block;
		margin: auto; */
		width: 100%;
	}

	h4 {
		color: #717273;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
		font-size: 20px;
		margin-bottom: -5px;

	}

	.product-add-cart {
		display: none;
		padding: 4px 8px;
		background: #2d8cf0;
		color: #fff;
		font-size: 12px;
		border-radius: 3px;
		cursor: pointer;
		position: absolute;
		top: 5px;
		right: 5px;
	}

	.product-main:hover .product-add-cart {
		display: inline-block;
	}
</style>
