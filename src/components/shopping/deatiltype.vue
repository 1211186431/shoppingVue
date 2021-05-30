<template>
	<div style="text-align: left;">
		<el-row style="background-color: #e4e4e4;text-align: left;">
			<el-col :span="2">
				<div style="background-color: #dadada;">
					<el-button type="text" class="fl">类型：</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text">工具</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text">娱乐</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text" style="color: red;" @click="clickType(0)">教材</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text">饮食</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text">工具</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row style="background-color: #e4e4e4;text-align: left;">
			<el-col :span="2">
				<div style="background-color: #dadada;">
					<el-button type="text" class="fl">电子产品：</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text" style="color: #0000FF;" @click="clickType(7)">男士</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text"  style="color: #0000FF;" @click="clickType(8)">女士</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text" style="color: #0000FF;"  @click="clickType(6)">电子</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row style="background-color: #e4e4e4;text-align: left;">
			<el-col :span="2">
				<div style="background-color: #dadada;">
					<el-button type="text" class="fl">场景：</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text" style="color: #0000FF;"  @click="clickType(10)">食品</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text"  style="color: #0000FF;" @click="clickType(9)">饮料</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text" @click="clickType(5)">教育</el-button>
				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="text">娱乐</el-button>
				</div>
			</el-col>
		</el-row>
				
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
</style>
