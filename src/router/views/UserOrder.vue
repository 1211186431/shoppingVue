<template>
	<div>
		<el-table :data="userOrder">
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
		</el-table>
	</div>
</template>

<script>
	export default {
		computed: {
			userName() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				userOrder: []
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
