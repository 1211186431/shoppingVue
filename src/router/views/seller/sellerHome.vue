<template>
	<div>
		<div v-if="!isSeller">
			<div>
				<el-table :data="audit" style="width: 100%">
					<el-table-column prop="id" width="0">
					</el-table-column>
					<el-table-column prop="user_id" label="用户id" width="180">
					</el-table-column>
					<el-table-column prop="certificates" label="证件" width="180">
						<template slot-scope="scope">
							<img style="width:150px;height:60px;" :src="getPicUrl(scope.$index)" />
						</template>
					</el-table-column>
					<el-table-column prop="state" label="状态" width="180">
					</el-table-column>
				</el-table>
			</div>
			<div>
				<el-form action="http://localhost:8081/Audit/insert" method="post" enctype="multipart/form-data">
					<label>上传图片</label>
					<el-input type="file" name="certificates" v-model="file1" id="certificates" />
					<!-- <el-input type="submit" value="上传" /> -->
					<el-button @click="setAudit()">成为商家</el-button>
				</el-form>
			</div>
		</div>
        <div v-if="isSeller">
			<p>用户id：{{sellerInfo.userId}}</p>
			<p>评分：{{sellerInfo.score}}</p>
			<p>状态：{{sellerInfo.state}}</p>
			<el-button @click="$router.push('/sellerGoods')">查看商品</el-button>
			<el-table :data="sellerOrder" highlight-current-row @current-change="handleOrderList">
				<el-table-column prop="orderNumber" label="订单号"></el-table-column>
				<el-table-column prop="purchasingDate" label="日期"></el-table-column>
				<el-table-column prop="goodsId" label="商品id"></el-table-column>
				<el-table-column prop="goodsNum" label="商品数量"></el-table-column>
				<el-table-column prop="userId" label="用户id"></el-table-column>
			</el-table>
			<div>
				<p>评论</p>
				<div v-if="userComment.goodsId">
					<p>商品Id：{{userComment.goodsId}}</p>
							<el-input v-model="userComment.comment"></el-input>
							<el-rate v-model="userComment.rate"></el-rate>
				</div>
			</div>
		</div>
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
				audit: [],
				auditInfo: {
					id: "",
					user_id: "",
					admin_id: "",
					createDate: "",
					updateTime: "",
					certificates: "",
					state: ""
				},
				userPic: "",
				isSeller: false,
				file1:null,
				sellerInfo: null,
				sellerOrder:[],
				userComment:{
					id: 0,
					goodsId: null,
					rate: 0,
					comment: ""
				}
			}
		},
		methods: {
			getAudit() {
				var that = this;
				// eslint-disable-next-line no-undef
				var url = this.HOST + "/Audit/admin/getAudit/user";
				that.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.userId
					}
				}).then(response => {
					this.audit = response.data;
				});
			},
			getPicUrl(x) {
				var picUrl = this.audit[x].certificates;
				return "http://localhost:8081" + picUrl;
			},
			setAudit() {
				var url = this.HOST + "/audit/insert";
				const param = new FormData();
				var file_obj = document.getElementById('certificates').files[0];
				param.append("certificates", file_obj);
				param.append("userId", this.userId);
				const config = {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				};
				this.$axios.post(url, param, config).then(res => {
					console.log(res);
				});
			},
			getSellerInfo() {
				var that = this;
				var url = this.HOST + "/seller/getById";
				that.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.userId
					}
				}).then(response => {
					this.sellerInfo = response.data
					console.log(this.sellerInfo);
					if (this.sellerInfo != "")
						this.isSeller = true;
				});
			},
			getSellerOrder(){
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
						if (response.data != null) {
							this.userComment.rate = response.data.grade;
							this.userComment.comment = response.data.content;
							this.userComment.id = response.data.id;
						}
					});
				}
			}
		},
		mounted() {
			if (this.userId != "") {
				this.getAudit(); //获取申请
				this.getSellerInfo();
				this.getSellerOrder();
			} else
				alert("未登录")
		}
	}
</script>

<style>
</style>
