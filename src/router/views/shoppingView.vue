<template>
	<div>
		<div id='table'>
			<Product v-for="item in this.goodsList.data" :info="item" :key="item.id"></Product>
		</div>
		<div>
			<el-pagination
			    layout="prev, pager, next"
			    :total="this.goodsList.totalPages*10"
				@current-change="PageChage">
			  </el-pagination>
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
					"pageNum": 0,
					"pageSize": 0,
					"totalSize": 0,
					"totalPages": 0,
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
			PageChage(x){
				var url = this.HOST + "/goods/getAllGoodsShow";
				this.$axios({
					method: "get",
					url: url,
					params:{
						pageNum:x
					}
				}).then(response => {
					console.log(response.data);
					this.goodsList = response.data;
				});
			}

		},
		mounted() {
			this.getGoods();
		}

	}
</script>

<style>

</style>
