<template>
	<div style="width:1250px;overflow:hidden; margin:0 auto;height: 1280px;">
		<div>
			<menu2></menu2>
		</div>
		<div style="text-align: center;width: inherit;">
           <search></search>
			<div style="background-color: #f3f3f3;width: 100%;">
				<div class="main" style="background-color: #f3f3f3">
					<maintype></maintype>
					<div class="main_top_center">
						<el-carousel :interval="10000" arrow="always">
							<el-carousel-item v-for="item in urls" :key="item.id">
								<el-image :src="item.picurl" :fit="fit"></el-image>
							</el-carousel-item>
						</el-carousel>
					</div>
					<div class="main_top_cr">
						<div style="width: 100%;height: 30%;background-color: #ffffff;">
							<el-image :src="pic2[0]">
							</el-image>
						</div>
						<div style="width: 100%;height: 30%;background-color: #ffffff;margin-top: 20px;">
							<el-image :src="pic2[1]"></el-image>
						</div>
						<div style="width: 100%;height: 30%;background-color: #ffffff;margin-top: 20px;">
							<el-image :src="pic2[2]"></el-image>
						</div>
					</div>
					<div class="main_top_right">
						<div>

						</div>
					</div>
					<div class="main_footer" style="text-align: left;">
						<div>
							<Product v-for="item in this.goodsList" :info="item" :key="item.id">
							</Product>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import Product from '../../components/shopping/product.vue'
	import menu2 from "../../components/shopping/menu2.vue"
	import search from '../../components/shopping/search.vue'
	import maintype from '../../components/shopping/maintype.vue'
	export default {
		components: {
			Product,
			menu2,
			search,
			maintype
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
				fit: "contain",
				urls: [],
				goodsList: {},
				goodsSort: {
					typeId: 0,
					priceSort: "",
					gradeSort: "",
					salesSort: "",
					goodsName: ""
				},
				goodsType: [],
				papeNum: 1,
				pic2: ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
					'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
				]

			}
		},
		methods: {
			getGoods() {
				var url = this.HOST + "/goods/getGoodsShow";
				this.$axios({
					method: "get",
					url: url,
					params: {
						pageSize: 8,
						pageNum: this.papeNum,
						typeId: this.goodsSort.typeId,
						priceSort: this.goodsSort.priceSort,
						gradeSort: this.goodsSort.gradeSort,
						salesSort: "DESC",
						goodsName: this.goodsSort.goodsName
					}
				}).then(response => {
					this.goodsList = response.data.data;
					for (var i = 0; i < this.goodsList.length; i++) {
						var Picurl = {
							goodsId: this.goodsList[i].id,
							picurl: this.PicHOST + this.goodsList[i].picture
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
		watch: {},
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

	.main {
		margin-left: 10%;
		margin-right: 10%;
		width: 80%;
		height: 1200px;
		margin-top: 20px;
	}

	.main_top_center {
		width: 50%;
		height: 36%;
		background-color: #ffffff;
		float: left;
		margin-left: 10px;
		margin-top: 10px;
	}

	.main_top_left {
		width: 15%;
		height: 36%;
		float: left;
		background-color: #ffffff;
		font-size: 30px;
		margin-top: 10px;
	}

	.main_top_cr {
		width: 15%;
		height: 36%;
		float: left;
		background-color: #f3f3f3;
		margin-left: 10px;
		margin-right: 0;
		margin-top: 10px;
	}

	.main_top_right {
		width: 15%;
		height: 36%;
		float: left;
		background-color: #ffffff;
		margin-left: 10px;
		margin-right: 0;
		margin-top: 10px;
	}

	.main_footer {
		width: 100%;
		height: 100%;
		/* background-color: #55ffff; */
		float: left;
		margin-top: 20px;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 3000%;
		margin: 0;
	}

	.el-carousel__container {
		height: 432px;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.el-button {
		color: #000000;
	}

	.el-image {
		width: 100%;
		height: 100%;
	}
</style>
