<template>
	<div class="main_top_left">
		<div><span>分类</span></div>
		<div class="list">
			<el-button type="text" @click="clickType(0)">课外书</el-button>
			<el-button type="text"  @click="clickType(0)">教材</el-button>
		</div>
		<div class="list">
			<el-button type="text" style="color: #0000FF;" @click="clickType(7)">男士</el-button>
			<el-button type="text"  style="color: #0000FF;" @click="clickType(8)">女士</el-button>
	
		</div>
		<div class="list">
			<el-button type="text" style="color: #0000FF;"  @click="clickType(6)">电子</el-button>
			<el-button type="text"  @click="clickType(0)">纸质</el-button>
			<el-button type="text"  @click="clickType(0)">硬盘</el-button>
		</div>
		<div class="list">
			<el-button type="text"  style="color: #0000FF;" @click="clickType(4)">生活</el-button>
			<el-button type="text"  @click="clickType(0)">学习</el-button>
			<el-button type="text"  style="color: #0000FF;" @click="clickType(5)">教育</el-button>
		</div>
		<div class="list">
			<el-button type="text"  style="color: #0000FF;" @click="clickType(9)">饮料</el-button>
			<el-button type="text" style="color: #0000FF;"  @click="clickType(10)">食品</el-button>
			<el-button type="text"  @click="clickType(0)">特产</el-button>
		</div>
		<div class="list">
			<el-button type="text"  @click="clickType(0)">手机</el-button>
			<el-button type="text"  @click="clickType(0)">电脑</el-button>
			<el-button type="text"  @click="clickType(0)">平板</el-button>
		</div>
		<div class="list">
			<el-button type="text"  @click="clickType(0)">工具</el-button>
			<el-button type="text"  @click="clickType(0)">娱乐</el-button>
		</div>
		<div class="list">
			<el-button type="text"  @click="clickType(0)">图书</el-button>
			<el-button type="text"  @click="clickType(0)">文娱</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			clickType(type){
				this.$router.push('/shopping2/null/'+type);
				
			}
		}
	}
</script>

<style>
	.main_top_left {
		width: 15%;
		height: 36%;
		float: left;
		background-color: #ffffff;
		font-size: 30px;
		margin-top: 10px;
	}
	.list {
		margin-left: 20px;
		float: left;
	}
</style>
