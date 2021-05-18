<template>
	<div>
        <OrderView v-for="item in userOrder" :key="item.index" :userOrder="item"></OrderView>
	</div>
</template>

<script>
	import OrderView from '../../components/OrderView.vue'
	export default {
		components:{
			OrderView
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
