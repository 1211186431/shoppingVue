<template>
	<div>
		<el-button @click="startTalk()" icon="el-icon-chat-line-square"></el-button>
	</div>
</template>

<script>
	export default {
		props:['goodsId','userId'],
		data(){
			return{
				userName:""
			}
		},
		methods:{
			getUserByGoodsId(){
				var url = this.HOST + "/seller/getSellerInfoByGoods";
				this.$axios({
					method: "get",
					url: url,
					params: {
						goodsId: this.goodsId
					}
				}).then(response => {
					this.userName = response.data.sellerName;
				});
			},
			getUserById(){
				var url = this.HOST + "/user/getUserInfo";
				this.$axios({
					method: "get",
					url: url,
					params: {
						userId: this.userId
					}
				}).then(response => {
					this.userName = response.data.name;
				});
			},
			startTalk(){
				this.$store.commit('addTalkList',this.userName);
				this.$router.push('/chat');
			}
		},
		mounted() {
			if(this.userId==null){
				this.getUserByGoodsId();
			}
			else{
				this.getUserById();
			}
		}
		
	}
</script>

<style>
</style>
