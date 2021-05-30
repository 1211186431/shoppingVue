<template>
	<div>
		<div>
			<el-row :gutter="20" class="Header">
				<el-col :span="10" style="height: 75px;">
					<div style="text-align: left;">
						<i class="el-icon-eleme"></i>
						<span>商家后台管理系统</span>
					</div>
				</el-col>
				<el-col :span="4" style="height: 75px;float: right;">
					<el-button type="text" @click="$router.back(-1)">返回</el-button>
				</el-col>
			</el-row>
		</div>
		<el-container>
			<el-aside style="width: 200px;">
				<sellerMenu @MenuItem="changeView" ></sellerMenu>
			</el-aside>
			<el-main>
				<component v-if="hackReset" :is="currentView" :goodsId="goodsId" @goodsDetails="gDetial" @MenuItem="changeView"></component>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Sadd from '../../components/seller/Sadd.vue'
	import Scomment from '../../components/seller/Scomment.vue'
	import Sorder from '../../components/seller/Sorder.vue'
	import Sgoods from '../../components/seller/Sgoods.vue'
	import sellerMenu from '../../components/seller/sellerMenu.vue'
	import SgoodsDetails from '../../components/seller/SgoodsDetails.vue'
	export default {
		components: {
			sellerMenu,
			Scomment,
			Sgoods,
			Sadd,
			Sorder,
			SgoodsDetails
		},
		data() {
			return {
				currentView: 'Sorder',
				hackReset: true,
				goodsId:0
			};
		},
		methods: {
			changeView: function(MenuItem) {
				this.currentView = MenuItem;
			},
			gDetial:function(goodsDetails){
				this.currentView='SgoodsDetails';
				this.goodsId=goodsDetails;
				this.myRefresh();
			},
			myRefresh() {
				this.hackReset = false; //强制刷新
				this.$nextTick(() => {
					this.hackReset = true;
				});
			},
			handleCommand(command) {
				switch (command) {
					case "s":
						this.myRefresh();
						break;
					case "p":
						this.$message("这是常见问题解决");
						break;
					case "h":
						this.$message("这是帮助");
						break;
					case "e":
						this.clear_data();
						break;
				}
			},
		},
		watch: {

		}
	}
</script>

<style>
	.Header {
		width: 100%;
		height: 75px;
		background-color: #409EFF;
		text-align: center;
		line-height: 4.6875rem;
		font-size: 30px;
	}
	.right_bottom{
		overflow: hidden;
		position: fixed;
		padding:5px;
		text-align:center;
		right: 50px;
		bottom: 50px;
	}
	
</style>