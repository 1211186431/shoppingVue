<template>
	<div>
		<el-card style="width: 800px; margin-bottom: 10px;margin-left: 5px;">
			<div slot="header" class="clearfix">
				<el-row>
					<el-col :span="5">
						<span>{{orderDate}}</span>
					</el-col>
					<el-col :span="19">
						<span style="float: right;">订单号：{{userOrder.orderNumber}}</span>
					</el-col>

				</el-row>

			</div>
			<el-row>
				<el-col :span="5">
					<span>收货人：{{userAddress.receiver}}</span>
				</el-col>
				<el-col :span="5">
					<span style="float: right;">订单金额：{{userOrder.allprice}}</span>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<span>商品</span>
				</el-col>
				<el-col :span="3">
					<span>数量</span>
				</el-col>
				<el-col :span="3">
					<span>金额</span>
				</el-col>
				<el-col :span="2">
					<span >状态</span>
				</el-col>
			</el-row>
			<el-row>
				<OrderGoodView v-for="item in orderGoods" :userAddress="userAddress" :userOrder="userOrder"
					:orderGoods="item" :key="item.index"></OrderGoodView>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	import * as dateUtils from "../../util/myDate.js"
	import OrderGoodView from './OrderGoodView.vue'
	export default {
		props: ['userOrder'],
		components: {
			OrderGoodView
		},
		data() {
			return {
				userAddress: {
					address: "北京市大兴区",
					id: 6,
					phone: "13260104993",
					receiver: "张三",
					userId: 9
				},
				orderGoods: []
			}
		},
		computed: {
			orderDate() {
				let d = new Date(this.userOrder.purchasingDate);
				return dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		methods: {
			getUserAddress() {
				var that = this;
				var url = this.HOST + "/user/getAddressById";
				that.$axios({
					method: "get",
					url: url,
					params: {
						id: this.userOrder.receiver
					}
				}).then(response => {
					this.userAddress = response.data
				});
			},
			getOrderGoods() {
				var that = this;
				var url = this.HOST + "/Order/getOrderGoods";
				that.$axios({
					method: "get",
					url: url,
					params: {
						orderNum: this.userOrder.orderNumber
					}
				}).then(response => {
					this.orderGoods = response.data
				});
			}
		},
		mounted() {
			this.getUserAddress();
			this.getOrderGoods();
		}
	}
</script>

<style>
</style>
