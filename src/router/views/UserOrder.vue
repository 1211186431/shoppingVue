<template>
	<div style="width: 1250px;overflow: hidden;margin: 0 auto;">
		<menu2></menu2>
		<el-row>
			<search></search>
		</el-row>
		<el-row>
			<div style="background-color: #f5f5f5;width: 100%;">
				<div class="main" style="background-color: #f1f1f1">
					<div class="main_left"
						style="margin-top: 10px; text-align: left;background-color: #ffffff;width: 15%;height: 1000px;">
						<allhave></allhave>
					</div>
					<div class="main_right"
						style="margin-top: 10px; margin-left: 1.6%; text-align: left;background-color: #f3f3f3;width: 83%;height: 1000px">
						<el-row>
							<div style="margin-top: 20px;background-color: #FFFFFF;height: auto;">
								<el-row style="height: 30px;margin-left: 10px;">
									<span>
										<h4>我的订单</h4>
									</span>
								</el-row>
								<el-row>
									<el-divider></el-divider>
								</el-row>
								<div style="height: 800px; overflow:auto">
									<el-row>
										<OrderView v-for="item in userOrder" :key="item.index" :userOrder="item">
										</OrderView>
									</el-row>
								</div>
							</div>
						</el-row>
					</div>
				</div>
			</div>
		</el-row>
	</div>

</template>
<script>
	import menu2 from "../../components/shopping/menu2.vue"
	import search from "../../components/shopping/search.vue"
	import allhave from "../../components/userHome/allhave.vue"
	import OrderView from '../../components/userOrder/OrderView.vue'
	export default {
		components: {
			menu2,
			search,
			allhave,
			OrderView
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				userOrder: [],

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
			this.getUserOrder();
		}
	}
</script>

<style>
	.main {
		margin-left: 10%;
		margin-right: 10%;
		width: 80%;
		height: 1200px;
		margin-top: 20px;
	}

	.main_left,
	.main_right {
		float: left;
	}

	.header_left,
	.header_center,
	.header_right {
		float: left;
	}

	.lead {
		height: 50px;
		width: 80px;
		color: #4f5ff5;
		font-size: larger;
	}
</style>
