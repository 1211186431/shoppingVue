<template>
	<div>
		<div v-for="goods in goodsList" :key="goods.id" style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
			<span>商品名称：{{goods.name}}    商品编号：{{goods.id}}</span>
			<p>商品评论：</p>
			<Scomment2 :goodsId="goods.id"></Scomment2>
		 </div>
	</div>
</template>

<script>
	import Scomment2 from './Scomment2.vue'
	export default {
		components:{
			Scomment2
		},
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				goodsList:[],
				goodsComment:[]
			}
		},
		methods: {
			getAllgoods(){
				var that = this;
				var url = this.HOST + "/goods/get/Byseller";
				that.$axios({
					method: "get",
					url: url,
					params: {
						sellerId: this.userId
					}
				}).then(response => {
					this.goodsList = response.data;
				});
			}
		},
		mounted() {
			this.getAllgoods();
		}
	}
</script>

<style>
</style>
