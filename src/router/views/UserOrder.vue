<template>
	<div>
		<el-row>
			<menu2></menu2>
		</el-row>
		<el-row>
			<OrderView v-for="item in userOrder" :key="item.index" :userOrder="item"></OrderView>
		</el-row>
	</div>
</template>

<script>
	import OrderView from '../../components/userOrder/OrderView.vue'
	import menu2 from "../../components/shopping/menu2.vue"
	export default {
		components:{
			OrderView,
			menu2
		},
		computed: {
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
			this.getUserOrder();
		}
	}
</script>

<style>
</style>
