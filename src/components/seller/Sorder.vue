<template>
	<div>
		<el-table :data="sellerOrder" highlight-current-row @current-change="handleOrderList" height="500">
			<el-table-column prop="id" label="具体订单号"></el-table-column>
			<el-table-column prop="orderNumber" label="订单号"></el-table-column>
			<el-table-column prop="purchasingDate" label="日期"></el-table-column>
			<el-table-column prop="goodsId" label="商品id"></el-table-column>
			<el-table-column prop="goodsNum" label="商品数量"></el-table-column>
			<el-table-column label="用户信息">
				<template slot-scope="scope">
					<el-popover placement="right" width="200" trigger="hover" @show="getAdress(scope.row)">
						<span>{{userAddress}}</span>
						<div slot="reference">
							<i class="el-icon-user"></i>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="状态"
				:filters="[{ text: '订单异常', value: -1 }, { text: '已接受', value: 0 },{ text: '未发货', value: 1 }, { text: '已发货', value: 2 },{ text: '已完成', value: 3 }]"
				:filter-method="filterTag" filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag>{{getState(scope.row.state)}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click.stop="handleOrder(scope.row,1)" :disabled="disableButton(scope.row,1)">发货
					</el-button>
					<el-button @click.stop="handleOrder(scope.row,2)" :disabled="disableButton(scope.row,2)">联系用户
					</el-button>
					<el-button @click.stop="handleOrder(scope.row,3)" :disabled="disableButton(scope.row,3)">查看评论
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="评论" :visible.sync="dialogVisible" width="30%">
			<p>商品Id：{{userComment.goodsId}}</p>
			<p>{{userComment.comment}}</p>
			<el-rate v-model="userComment.rate" disabled></el-rate>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['orderState'],
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				sellerOrder: [],
				userComment: {
					id: 0,
					goodsId: null,
					rate: 0,
					comment: ""
				},
				dialogVisible: false,
				userAddress: {}
			}
		},
		methods: {
			handleOrder(row, num) {
				switch (num) {
					case 1:
						this.setOrderState(row);
						break;
					case 3:
					 this.handleOrderList(row);
				}
			},
			disableButton(row, num) {
				var state = row.state;
				if (state == 1 && num == 1) {
					return false;
				}
				if (num == 2)
					return false;
				if (state == 3 && num == 3) {
					return false;
				}
				return true;
			},
			filterTag(value, row) {
				return row.state === value;
			},
			getAdress(row) {
				var that = this;
				var url = this.HOST + "/user/getAddressById";
				that.$axios({
					method: "get",
					url: url,
					params: {
						id: row.receiver
					}
				}).then(response => {
					this.userAddress = response.data;
				});
			},
			getSellerOrder() {
				var that = this;
				var url = this.HOST + "/seller/getSellerOrder";
				that.$axios({
					method: "get",
					url: url,
					params: {
						sellerId: this.userId
					}
				}).then(response => {
					this.sellerOrder = response.data
				});
			},
			handleOrderList(val) {
				if (val != null) {
					this.userComment.goodsId = val.goodsId;
					var url = this.HOST + "/comment/getByUserGoods";
					this.$axios({
						method: "get",
						url: url,
						params: {
							goodsId: val.goodsId,
							orderNum: val.orderNumber
						}
					}).then(response => {
						if (response.data != null && response.data != "") {
							this.userComment.rate = response.data.grade;
							this.userComment.comment = response.data.content;
							this.userComment.id = response.data.id;
							this.dialogVisible = true;
						} else
							alert("暂无评论");
					});
				}
			},
			getState(state) {
				switch (state) {
					case -1:
						return "异常"
					case 0:
						return "已接受"
					case 1:
						return "未发货"
					case 2:
						return "已发货"
					case 3:
						return "已完成"
				}
			},
			setOrderState(row) {
				var that = this;
				var url = this.HOST + "/Order/update";
				that.$axios({
					method: "post",
					url: url,
					params: {
						OrderId:row.id,
						state:2
					}
				}).then(response => {
					alert("发货成功");
					row.state = 2;
				});
			}
		},
		mounted() {
			this.getSellerOrder();
		}
	}
</script>

<style>
</style>
