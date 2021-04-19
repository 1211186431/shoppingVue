<template>
	<div>
		<el-table :data="userOrder" highlight-current-row @current-change="handleCurrentChange">
			<el-table-column prop="orderNumber" label="订单号" width="180">
			</el-table-column>
			<el-table-column prop="user_id" label="用户id" width="180">
			</el-table-column>
			<el-table-column prop="allprice" label="金额" width="180">
			</el-table-column>
			<el-table-column prop="purchasingDate" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="receiver" label="地址" width="180">
			</el-table-column>
			<el-table-column label="商品" width="180">
				<template slot-scope="props">
					<el-table :data="userOrder[props.$index].goodsList">
						<el-table-column prop="goodsId" label="商品id" width="180">
						</el-table-column>
						<el-table-column prop="goodsNum" label="数量" width="180">
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
		</el-table>

		<el-table :data="OrderGoods" v-if="OrderGoods.length!=0" highlight-current-row
			@current-change="handleGoodsList">
			<el-table-column prop="goodsId" label="商品id" width="180">
			</el-table-column>
			<el-table-column prop="goodsNum" label="数量" width="180">
			</el-table-column>
		</el-table>

		<div v-if="userComment.goodsId">
			<p>商品Id：{{userComment.goodsId}}</p>
			<el-form v-model="userComment">
				<el-form-item label="评论">
					<el-input v-model="userComment.comment"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-rate v-model="userComment.rate"></el-rate>
				</el-form-item>
			</el-form>
			<el-button @click="sendUserComment()" v-if="commentUpdate==false">提交</el-button>
			<el-button @click="upDateUserComment()" v-if="commentUpdate==true">更新</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			userId() {
				return this.$store.state.userId;
			},
			commentUpdate() {
				if (this.userComment.id != 0) {
					return true;
				} else
					return false;
			}
		},
		data() {
			return {
				userOrder: [],
				OrderGoods: [],
				userComment: {
					id: 0,
					goodsId: null,
					rate: 0,
					comment: ""
				},
				orderNumber: ""
			}
		},
		methods: {
			getUserOrder() {
				var that = this;
				var url = this.HOST + "/Order/getUserOrder";
				that.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.$store.state.userId
					}
				}).then(response => {
					this.userOrder = response.data
				});
			},
			handleCurrentChange(val) {
				this.OrderGoods = val.goodsList;
				this.orderNumber = val.orderNumber;
				this.userComment.goodsId = 0;
			},
			handleGoodsList(val) {
				if (val != null) {
					this.userComment.goodsId = val.goodsId;
					var url = this.HOST + "/comment/getByUserGoods";
					this.$axios({
						method: "get",
						url: url,
						params: {
							goodsId: val.goodsId,
							orderNum: this.orderNumber
						}
					}).then(response => {
						if (response.data != null) {
							this.userComment.rate = response.data.grade;
							this.userComment.comment = response.data.content;
							this.userComment.id = response.data.id;
						}
					});
				}
			},
			sendUserComment() {
				var that = this;
				var url = this.HOST + "/comment/insert";
				var commentParams = {
					id: null,
					user_id: this.userId,
					goods_id: this.userComment.goodsId,
					content: this.userComment.comment,
					createDate: new Date(),
					state: 0,
					grade: this.userComment.rate,
					orderNum: this.orderNumber
				}
				that.$axios({
					method: "post",
					url: url,
					data: commentParams
				}).then(response => {
					this.userComment.id=response.data;
					alert("提交成功");
				});
			},
			upDateUserComment(){
				var that = this;
				var url = this.HOST + "/comment/update";
				that.$axios({
					method: "post",
					url: url,
					params: {
						id:this.userComment.id,
						grade:this.userComment.rate,
						content:this.userComment.comment
					}
				}).then(response => {
					alert("修改成功");
				});
			}
		},
		mounted() {
			if (this.$store.state.userId != "") {
				this.getUserOrder();
			} else
				alert("未登录");

		}
	}
</script>

<style>
</style>
