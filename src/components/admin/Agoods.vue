<template>
	<div>
		<el-table :data="goods" @row-click="getGoods">
			<el-table-column prop="id" label="商品id"></el-table-column>
			<el-table-column prop="user_id" label="商家id"></el-table-column>
			<el-table-column prop="price" label="价格"></el-table-column>
			<el-table-column prop="picture" label="照片" width="180">
				<template slot-scope="scope">
					<img style="width:150px;height:60px;" :src="getPicUrl2(scope.$index)" />
				</template>
			</el-table-column>
			<el-table-column prop="state" label="状态"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click.stop="setState(scope.$index)">设置状态</el-button>
					<el-button size="mini" @click.stop="deleteGoods(scope.$index)">删除商品</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>{{good}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				goods: [],
				good: {
					"id": 30,
					"user_id": 10,
					"inventory": 10,
					"oldAndnew": 90,
					"state": 0,
					"details": "这是一本书",
					"onsaleDate": "2021-05-16T08:28:14.000+00:00",
					"bargain": 1,
					"price": 10,
					"name": "测试2",
					"picture": "/goodsPic/30_0_绘图1.png",
					"delivery": "北京",
					"salesNum": 0,
					"grade": 0,
					"goodstype": null
				},
				dialogVisible: false,
			}
		},
		methods: {
			getAllGoods() {
				var that = this;
				var url = this.HOST + "/Audit/getOffGoods";
				that.$axios({
					method: "get",
					url: url,
				}).then(response => {
					this.goods = response.data
				});
			},
			getGoods(row) {
				this.good = row;
				this.dialogVisible = true;
			},
			getPicUrl2(x) {
				var picUrl = this.goods[x].picture;
				return this.HOST + picUrl;
			},
			setState(row) {
				alert(this.goods[row].state);
			},
			deleteGoods(row) {
				alert("删除成功");
			}
		},
		mounted() {
			this.getAllGoods();
		}
	}
</script>

<style>
</style>
