<template>
	<div>
		<div v-if="goodsDetail">
		    <div class="product">
		        <div class="product-image">
					<img :src="'http://localhost:8081' + goodsDetail.picture">
		        </div>
		        <div class="product-info">
		            <h1 class="product-name">{{ goodsDetail.name }}</h1>
		            <div class="product-cost">¥ {{ goodsDetail.price }}</div>
		           <el-button @click="addCart()">加入购物车</el-button>
		        </div>
		    </div>
		    <div class="product-desc">
		        <p>{{this.goodsDetail}}</p>
		    </div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		computed: {
			goodsId() {
				return this.$route.params.GoodsId;
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
				OrderDetail:Object
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
				var goods = this.goodsId;
				this.$store.commit('addCart', goods);
				alert("购买成功");
				this.$router.push('/shoppingView');
			},
			
		},
		mounted() {
			this.getGoodsDetail(this.goodsId);
		}

	}
</script>

<style>
	.product{
	    margin: 32px;
	    padding: 32px;
	    background: #fff;
	    border: 1px solid #dddee1;
	    border-radius: 10px;
	    overflow: hidden;
	}
	.product-image{
	   width:200px;
	   height:200px;
	    float: left;
	    text-align: center;
	}
	.product-image img{
	    height: 100%;
	}
	.product-info{
	    width: 50%;
	    padding: 150px 0 250px;
	    height: 150px;
	    float: left;
	    text-align: center;
	}
	.product-cost{
	    color: #f2352e;
	    margin: 8px 0;
	}
	.product-add-cart{
	    display: inline-block;
	    padding: 8px 64px;
	    margin: 8px 0;
	    background: #2d8cf0;
	    color: #fff;
	    border-radius: 4px;
	    cursor: pointer;
	}
	.product-desc{
	    background: #fff;
	    margin: 32px;
	    padding: 32px;
	    border: 1px solid #dddee1;
	    border-radius: 10px;
	    text-align: center;
	}
	.product-desc img{
	    display: block;
	    width: 50%;
	    margin: 32px auto;
	    padding: 32px;
	    border-bottom: 1px solid #dddee1;
	}
</style>
