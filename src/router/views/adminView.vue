<template>
	<div>
		<div>
			<el-row :gutter="20" class="Header">
				<el-col :span="10" style="height: 75px;">
					<div style="text-align: left;">
						<i class="el-icon-eleme"></i>
						<span>管理员后台管理系统</span>
					</div>
				</el-col>
				<el-col :span="4" style="height: 75px;float: right;">
					<router-link to="shopping">返回</router-link>
				</el-col>
			</el-row>
		</div>
		<el-container>
			<el-aside style="width: 200px;">
				<Navmenu @MenuItem="changeView"></Navmenu>
			</el-aside>
			<el-main>
				<component v-if="hackReset" :is="currentView"></component>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Navmenu from '../../components/admin/Navmenu.vue'
	import Acomment from '../../components/admin/Acomment.vue'
	import Aseller from '../../components/admin/Aseller.vue'
	import Agoods from '../../components/admin/Agoods.vue'
	import Auser from '../../components/admin/Auser.vue'
	export default {
		components: {
			Navmenu,
			Acomment,
			Agoods,
			Aseller,
			Auser,
		},
		data() {
			return {
				currentView: 'Aseller',
				hackReset: true,
			};
		},
		methods: {
			changeView: function(MenuItem) {
				this.currentView = MenuItem;
			},
			clear_data() {
				localStorage.clear();
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
