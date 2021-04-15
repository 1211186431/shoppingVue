<template>
	<div>
		<p>欢迎用户：{{userName}}</p>
		<div id='table'>
			<el-table :data="goodsList.data" style="width: 100%" @row-click="onclickRow" >
				<el-table-column prop="id" width="0">
				</el-table-column>
				<el-table-column prop="name" label="名称" width="180">
				</el-table-column>
				<el-table-column prop="price" label="价格" width="180">
				</el-table-column>
				<el-table-column prop="picture" label="照片" width="180">
				</el-table-column>
				<el-table-column prop="completion" label="操作" width="220">
					<template slot-scope="scope">
						<el-button size="mini" @click.stop="addcollection(scope.$index)"  icon="el-icon-star-off"
							circle></el-button>
						<el-button size="mini" @click.stop="addbuy(scope.$index)"  icon="el-icon-goods"
							circle></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

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
			},
			onclickRow(row){
				this.$store.commit('setGoodsId',row.id);
				console.log(row.id);
				this.$router.push('/goodsDetail');
			}

		},
		mounted() {
			this.getGoods();
		}

	}
</script>

<style>

</style>
