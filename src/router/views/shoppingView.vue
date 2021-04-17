<template>
	<div>
		<p>欢迎用户：{{userName}}</p>
		<div id='table'>
			<Product v-for="item in this.goodsList.data" :info="item" :key="item.id"></Product>
		</div>
	</div>
</template>

<script>
	import Product from "../../components/product.vue"
	export default {
		components: {
             Product
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			}
		},
		data() {
			return {
				goodsList: {
					"pageNum": "",
					"pageSize": "",
					"totalSize": "",
					"totalPages": "",
					 data: []
				},
				test1:false
			}
		},
		methods: {
			getGoods() {
				var url = this.HOST + "/goods/getAllGoodsShow";
				this.$axios({
					method: "get",
					url: url
				}).then(response => {
					this.goodsList = response.data;
				});
			},
			addbuy(x){
				console.log(this.goodsList.data[x].id);
			},
			addcollection(x){
				if(this.$store.state.userId != ""){
					var url = this.HOST + "/collection/insert";
					this.$axios({
						method: "post",
						url: url,
						params:{
							userId:this.$store.state.userId,
							goodsId:this.goodsList.data[x].id
						}
					}).then(response => {
						alert("收藏成功");
					});
				}
			}

		},
		mounted() {
			this.getGoods();
		}

	}
</script>

<style>

</style>
