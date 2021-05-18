<template>
	<div>
		<el-row>
			<el-col :span="10">
				<el-input placeholder="请输入内容" v-model="goodsSort.goodsName"></el-input>
			</el-col>
			<el-col :span="5">
				<el-button icon="el-icon-search" circle @click="getGoods()"></el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-radio-group v-model="goodsSort.typeId" @change="getGoods()">
				<el-radio-button v-for="item in goodsType" :key="item.type_id" :label="item.type_id">{{item.type}}</el-radio-button>
			</el-radio-group>
		</el-row>
		<el-row>
			<el-radio-group v-model="goodsSort.priceSort" @change="getGoods()">
				<el-radio-button label="DESC">降序</el-radio-button>
				<el-radio-button label="ASC">升序</el-radio-button>
				<el-radio-button label="">综合</el-radio-button>
			</el-radio-group>
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
				goodsSort:{
					typeId:0,
					priceSort:"",
					gradeSort:"",
					salesSort:"",
					goodsName:""
				},
				goodsType:[],
				papeNum:1
			}
		},
		methods: {
			getGoods() {
				var url = this.HOST + "/goods/getGoodsShow";
				this.$axios({
					method: "get",
					url: url,
					params:{
						pageNum: this.papeNum,
						typeId:this.goodsSort.typeId,
						priceSort:this.goodsSort.priceSort,
						gradeSort:this.goodsSort.gradeSort,
						salesSort:this.goodsSort.salesSort,
						goodsName:this.goodsSort.goodsName
					}
				}).then(response => {
					this.goodsList = response.data;
				});
			},
			PageChage(x) {
				this.papeNum=x;
				this.getGoods();
			},
			getGoodsType(){
				var url = this.HOST + "/goods/getAllType";
				this.$axios({
					method: "get",
					url: url
				}).then(response => {
					this.goodsType = response.data;
				});
			}
		},
		watch:{
		},
		mounted() {
			this.getGoods();
			this.getGoodsType();
		}

	}
</script>

<style>

</style>
