<template>
	<div>
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
			

		},
		mounted() {
			this.getGoods();
		}

	}
</script>

<style>

</style>
