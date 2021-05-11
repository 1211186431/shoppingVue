<template>
	<div>
		<el-row>
			<el-col :span="10">
				<el-input placeholder="请输入内容" v-model="searchName"></el-input>
			</el-col>
			<el-col :span="5">
				<el-button icon="el-icon-search" circle @click="searchGoods()"></el-button>
			</el-col>
		</el-row>

		<el-row>
			<div>
				<Product v-for="item in this.goodsList.data" :info="item" :key="item.id">
				</Product>
			</div>
		</el-row>
		<el-row>
			<div>
				<el-pagination layout="prev, pager, next" :total="this.goodsList.totalPages*10"
					@current-change="PageChage">
				</el-pagination>
			</div>
		</el-row>


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
			},
			userId() {
				return this.$store.state.userId;
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
				test1: false,
				searchName: ""
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
			PageChage(x) {
				var url = this.HOST + "/goods/getAllGoodsShow";
				this.$axios({
					method: "get",
					url: url,
					params: {
						pageNum: x
					}
				}).then(response => {
					this.goodsList = response.data;
				});
			},
			searchGoods() {
				if (this.searchName == "") {
					this.getGoods();
				} else {
					var url = this.HOST + "/goods/getGoodsShowByName";
					this.$axios({
						method: "get",
						url: url,
						params: {
							"name": this.searchName
						}
					}).then(response => {
						this.goodsList = response.data;
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
