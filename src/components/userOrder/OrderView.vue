<template>
	<div>
		<el-card>
		  <div slot="header" class="clearfix">
			<span>{{orderDate}}</span>
			 <span>------</span>
		    <span>订单号：{{userOrder.orderNumber}}</span>
		  </div>
		  <div>
			  <span>收货人：{{userAddress.receiver}}</span>
			  <span>------</span>
			  <span>订单金额：{{userOrder.allprice}}</span>
		  </div>
		  <div>
			  <OrderGoodView v-for="item in orderGoods" :userAddress="userAddress" :userOrder="userOrder" :orderGoods="item" :key="item.index"></OrderGoodView>
		  </div>
		</el-card>
	</div>
</template>

<script>
	import * as dateUtils from "../../util/myDate.js"
	import OrderGoodView from './OrderGoodView.vue'
	export default {
		props:['userOrder'],
		components:{
			OrderGoodView
		},
		data(){
			return{
				userAddress:{
					address: "北京市大兴区",
					id: 6,
					phone: "13260104993",
					receiver: "张三",
					userId: 9
				},
				orderGoods:[]
			}
		},
		computed:{
			orderDate(){
				let d = new Date(this.userOrder.purchasingDate);
				return dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		methods:{
			getUserAddress(){
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
			getOrderGoods(){
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
