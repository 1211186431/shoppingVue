<template>
	<div>
		<div style="height: 40px;width: inherit;" class="header">
			<div class="header_left" style="margin-left: 10%;width: 4%;height: 50px;">
				<router-link to="/shopping"><img style="width: 60px;height: 60px;" src="../../assets/logo.jpg" />
				</router-link>
			</div>
			<div class="header_center" style="text-align: center;margin-left: 1.6%;margin-top: 10px;">
				<el-input placeholder="请输入内容" v-model="searchName" size="small" style="width: 700px;">
				</el-input>
				<slot>
					<el-button @click="search()" icon="el-icon-search" size="small" circle></el-button>
				</slot>
			</div>
			<div class="header_right" style="margin-left: 0.8%; margin-top: 10px;">
					<el-badge :value="cartNum" class="item">
						<el-button style="color: #E9322D;height: 35px;" @click="shoppingCart()">购物车<i class="el-icon-shopping-cart-2"></i>
						</el-button>
					</el-badge>
			</div>
		</div>
		<div style="height: 10px;">
			<el-divider></el-divider>
		</div>
	</div>

</template>

<script>
	export default {
		props: ['search1'],
		computed:{
			cartNum(){
				return this.$store.state.ShoppingCart.length
			}
		},
		
		data() {
			return {
				searchName: "",
			}
		},
		methods: {
			shoppingCart(){
				this.$router.push('/ShoppingCart')
			},
			search() {
				var t = "";
				if (this.searchName == "")
					t = "null";
				else
					t = this.searchName;
				this.$router.push('/shopping2/' + t + '/' + 0);
			}
		},
		mounted() {
			if (this.search1 != null && this.search1 != "null")
				this.searchName = this.search1;
		}
	}
</script>

<style>
	.header_left,
	.header_center,
	.header_right {
		float: left;
	}
</style>
