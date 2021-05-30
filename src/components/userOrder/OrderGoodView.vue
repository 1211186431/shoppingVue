<template>
	<div style="overflow: auto;width: 750px;">
		<el-card>
			<div>
				<el-row>
					<el-col :span="14">
						<div>
							<el-row>
								<el-col :span="10">
									<img :src="this.PicHOST+orderGoods.picture" style="width: 50px;height:50px" />
									<span>{{orderGoods.name}}</span>
								</el-col>
								<el-col :span="5">
									<span>{{orderGoods.goodsNum}}</span>
								</el-col>
								<el-col :span="5">
									<span>{{orderGoods.price*orderGoods.goodsNum}}￥</span>
								</el-col>
								<el-col :span="4">
									<el-tag>
									     {{getState(orderGoods.state)}}
									</el-tag>
								</el-col>
							</el-row>
						</div>
					</el-col>
					<el-col :span="5">
						<div>
							<el-popover placement="right" trigger="hover">
								
								<div>
									<el-row>
										<span>收货地址：{{userAddress.address}}</span>
									</el-row>
									<el-row>
										<span>电话：{{userAddress.phone}}</span>
									</el-row>
									<el-row>
										<span>收货人：{{userAddress.receiver}}</span>
									</el-row>
								</div>
								<div slot="reference">
									<span>{{userAddress.receiver}}</span>
									<i class="el-icon-user"></i>
								</div>
							</el-popover>
						</div>
					</el-col>
					<el-col :span="4">
						<div>
							<el-row>
								<el-col :span="10">
									<el-button @click="returnGoods()" size="mini">退货</el-button>
								</el-col>
								<el-col :span="10">
									<el-button @click="dialogTableVisible=true;" size="mini">评论</el-button>
								</el-col>
							</el-row>

						</div>
					</el-col>
				</el-row>

				<el-dialog title="评论" :visible.sync="dialogTableVisible">
					<div>
						<p>商品Id：{{userComment.goodsId}}</p>
						<p>订单号：{{userOrder.orderNumber}}</p>
						<el-form v-model="userComment">
							<el-form-item label="评论">
								<el-input v-model="userComment.comment"></el-input>
							</el-form-item>
							<el-form-item label="评分">
								<el-rate v-model="userComment.rate"></el-rate>
							</el-form-item>
						</el-form>
						<el-button @click="sendUserComment()" v-if="commentUpdate==false">评论</el-button>
						<el-button @click="upDateUserComment()" v-if="commentUpdate==true">更新评论</el-button>
					</div>
				</el-dialog>


			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		props: ['userOrder', 'userAddress', 'orderGoods'],
		data() {
			return {
				userComment: {
					id: 0,
					goodsId: 0,
					rate: 0,
					comment: ""
				},
				dialogTableVisible: false
			}
		},
		computed: {
			commentUpdate() {
				if (this.userComment.id != 0 && this.userComment.id != null) {
					return true;
				} else
					return false;
			},
			userId() {
				return this.$store.state.userId;
			}
		},
		methods: {
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
					orderNum: this.userOrder.orderNumber
				}
				that.$axios({
					method: "post",
					url: url,
					data: commentParams
				}).then(response => {
					this.userComment.id = response.data;
					alert("提交成功");
					dialogTableVisible = false;
				});
			},
			upDateUserComment() {
				var that = this;
				var url = this.HOST + "/comment/update";
				that.$axios({
					method: "post",
					url: url,
					params: {
						id: this.userComment.id,
						grade: this.userComment.rate,
						content: this.userComment.comment
					}
				}).then(response => {
					alert("修改成功");
					dialogTableVisible = false;
				});
			},
			getComment() {
				this.userComment.goodsId = this.orderGoods.goodsId;
				var url = this.HOST + "/comment/getByUserGoods";
				this.$axios({
					method: "get",
					url: url,
					params: {
						goodsId: this.userComment.goodsId,
						orderNum: this.userOrder.orderNumber
					}
				}).then(response => {
					if (response.data != null) {
						this.userComment.rate = response.data.grade;
						this.userComment.comment = response.data.content;
						this.userComment.id = response.data.id;
					}
				});
			},
			returnGoods() {
				var url = this.HOST + "/Order/update";
				this.$axios({
					method: "post",
					url: url,
					params: {
						OrderId: this.orderGoods.id,
						state: 5
					}
				}).then(response => {

				});
			}
		},
		mounted() {
			this.getComment();
		}
	}
</script>

<style>
</style>
