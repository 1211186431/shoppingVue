<template>
	<div>
		<el-card class="box-card">
			<div>
				<el-row>
					<el-col :span="10">
						<div>
							<span>{{orderGoods.id}}</span>
							<img :src="this.HOST+orderGoods.picture" style="width: 20px;height: 1.25rem;" />
							<span>{{orderGoods.name}}</span>
							<span>------</span>
							<span>数量：x{{orderGoods.goodsNum}}</span>
							<span>------</span>
							<span>金额：{{orderGoods.price*orderGoods.goodsNum}}</span>
							<span>------</span>
							<span>状态：{{orderGoods.state}}</span>
						</div>
					</el-col>
					<el-col :span="10">
						<div>
							<el-popover placement="right" width="200" trigger="hover">
								<span>{{userAddress}}</span>
								<div slot="reference">
									<span>{{userAddress.receiver}}</span>
									<i class="el-icon-user"></i>
								</div>
							</el-popover>
						</div>
					</el-col>
					<el-col :span="4">
						<div>
							<el-button @click="returnGoods()">退货</el-button>
							<el-button @click="dialogTableVisible=true;">评论</el-button>
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
			returnGoods(){
				var url = this.HOST + "/Order/update";
				this.$axios({
					method: "post",
					url: url,
					params: {
						OrderId: this.orderGoods.id,
						state:5
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
