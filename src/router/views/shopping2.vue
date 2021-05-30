<template>
	<div style="width: 1250px;overflow: hidden;margin: 0 auto;height: 980px;">
		<div>
			<menu2></menu2>
		</div>
		<div style="text-align: center;">
			<search :search1="search">
			</search>
			<div class="d_main" style="background-color: #ffffff;float: left;">
				<deatiltype></deatiltype>
				<div class="main_footer" style="text-align: left;margin-top: 10px;">
					<el-row style="background-color: #f0f0f0;height: 50px;">
						<el-radio-group v-model="radio1" style="margin-left: 1px;text-align: center;margin-top: 5px;" @change="getGoods()">
							<el-radio-button label="">综合</el-radio-button>
							<el-radio-button label="sales">销量</el-radio-button>
							<el-radio-button label="price">价格</el-radio-button>
						<!-- 	<el-radio-button label="grade">好评率</el-radio-button> -->
						</el-radio-group>
						<el-radio-group v-model="radio2" v-show="radio1=='price'" size="mini"
							style="margin-left: 1px;text-align: center;margin-top: 5px;">
							<el-radio-button label="DESC">降序⬇</el-radio-button>
							<el-radio-button label="ASC">升序⬆</el-radio-button>
						</el-radio-group>
					</el-row>
					<el-row style="background-color: #ffffff;">
						<div style="text-align: left;margin-top: 20px;">
							<Product v-for="item in this.goodsList" :info="item" :key="item.id">
							</Product>
						</div>
					</el-row>
					<el-row>
						<div style="text-align: center;">
							<el-pagination layout="prev, pager, next" :total="this.totalPages*10"
								@current-change="PageChage">
							</el-pagination>
						</div>
					</el-row>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	import Product from '../../components/shopping/product.vue'
	import menu2 from "../../components/shopping/menu2.vue"
	import search from '../../components/shopping/search.vue'
	import deatiltype from '../../components/shopping/deatiltype.vue'
	export default {
		components: {
			Product,
			menu2,
			search,
			deatiltype
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			userId() {
				return this.$store.state.userId;
			},
			search() {
				return this.$route.params.search;
			},
			type() {
				return this.$route.params.type;
			}
		},
		data() {
			return {
				fit: "contain",
				urls: [],
				goodsList: [],
				goodsSort: {
					typeId: 0,
					priceSort: "",
					gradeSort: "",
					salesSort: "",
					goodsName: ""
				},
				goodsType: [],
				pageNum: 1,
				pageSize: 8,
				totalPages: 0,
				totalSize: 0,
				radio1: "",
				radio2: ""

			}
		},
		methods: {
			getGoods() {
				
				switch (this.radio1) {
					case "":
						this.goodsSort = {
							typeId: 0,
							priceSort: "",
							gradeSort: "",
							salesSort: "",
							goodsName: ""
						};
						break;
					case "price":
						this.goodsSort = {
							typeId: 0,
							priceSort: "DESC",
							gradeSort: "",
							salesSort: "",
							goodsName: ""
						};
						break;
					case "sales":
						this.goodsSort = {
							typeId: 0,
							priceSort: "",
							gradeSort: "",
							salesSort: "DESC",
							goodsName: ""
						};
						break;
				}
				if (this.type != 0)
					this.goodsSort.typeId = this.type;
				if (this.search != "null") {
					this.goodsSort.goodsName = this.search;
				}
				var url = this.HOST + "/goods/getGoodsShow";
				this.$axios({
					method: "get",
					url: url,
					params: {
						pageSize: this.pageSize,
						pageNum: this.papeNum,
						typeId: this.goodsSort.typeId,
						priceSort: this.goodsSort.priceSort,
						gradeSort: this.goodsSort.gradeSort,
						salesSort: this.goodsSort.salesSort,
						goodsName: this.goodsSort.goodsName
					}
				}).then(response => {
					this.goodsList = response.data.data;
					this.pageNum = response.data.pageNum;
					this.pageSize = response.data.pageSize;
					this.totalPages = response.data.totalPages;
					this.totalPages = response.data.totalPages;
					for (var i = 0; i < this.goodsList.length; i++) {
						var Picurl = {
							goodsId: this.goodsList[i].id,
							picurl: this.HOST + this.goodsList[i].picture
						}
						this.urls.push(Picurl);
					}
				});
			},
			PageChage(x) {
				this.papeNum = x;
				this.getGoods();
			},
			getGoodsType() {
				var url = this.HOST + "/goods/getAllType";
				this.$axios({
					method: "get",
					url: url
				}).then(response => {
					this.goodsType = response.data;
				});
			}
		},
		watch: {
			search(old,n){
				this.getGoods();
			},
			type(old,n){
				this.getGoods();
			}
			
		},
		mounted() {
			this.getGoods();
			this.getGoodsType();
		}

	}
</script>

<style>
	.el-input {
		width: 350px;
		height: 35px;
	}

	.el-row {
		margin-bottom: 0px;
	}

	.d_main {
		margin-left: 10%;
		margin-right: 10%;
		width: 80%;
		height: 700px;
		margin-top: 20px;
		background-color: #ffffff;
	}

	.d_main_footer {
		width: 100%;
		/* height: 100%; */
		background-color: #f0f0f0;
		float: left;
		margin-top: 20px;
	}

	.el-image {
		width: 100%;
		height: 100%;
	}

	.fl {
		color: #000000;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.el-radio-button {
		height: 50px;
	}
</style>
