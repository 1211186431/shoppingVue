<template>
	<div>
        <p>{{userId}}</p>
		<el-table :data="goodsDetail" @row-click="clickGoods">
			<el-table-column prop="id" label="商品id"></el-table-column>
			<el-table-column prop="inventory" label="库存"></el-table-column>
		</el-table>
		<el-button @click="sgoods=true">添加商品</el-button>
		<el-button>查看商品审核状态</el-button>
			<SGoods v-if="sgoods" :sellerId="userId"></SGoods>
	</div>

</template>

<script>
	import SGoods from '../../../components/SGoods.vue'
	export default {
		components: {
		   SGoods
		},
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data(){
			return{
				goodsDetail:[],
				sgoods:false
			}
		},
		methods:{
			getSellerGoods(){
				var that = this;
				var url = this.HOST + "/goods/get/Byseller";
				that.$axios({
					method: "get",
					url: url,
					params: {
						sellerId: this.userId
					}
				}).then(response => {
					this.goodsDetail = response.data
				});
			},
			clickGoods(row){
				this.$router.push('/sellerGoodsDetails/'+row.id);
			}
		},
		mounted() {
			if (this.userId != "") {
				this.getSellerGoods();
			} else
				alert("未登录")
		}

	}
</script>

<style>
</style>
