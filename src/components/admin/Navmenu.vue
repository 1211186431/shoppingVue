<template>
	<el-menu default-active="2" class="el-menu-vertical-demo">
		<el-menu-item-group class="group1">
			<el-menu-item index="1-0" @click="chlickMenuT(1)" class="item1"><i class="el-icon-menu" style="font-size: 25px;"></i>审核商家</el-menu-item>
			<el-menu-item index="1-1" @click="chlickMenuT(2)" class="item1"><i class="el-icon-star-on" style="font-size: 25px;"></i>审核商品</el-menu-item>
			<el-menu-item index="1-2" @click="chlickMenuT(3)" class="item1"><i class="el-icon-notebook-1" style="font-size: 25px;"></i>查看评论</el-menu-item>
			<el-menu-item index="1-3" @click="chlickMenuT(4)" class="item1"><i class="el-icon-notebook-2" style="font-size: 25px;"></i>查看用户</el-menu-item>
		</el-menu-item-group>
	</el-menu>
</template>

<script>
	export default {
		data() {
             return{}
		},
		methods: {
			chlickMenuT(num) {
				switch(num){
					case 1:this.$emit('MenuItem', 'Aseller');break;
					case 2:this.$emit('MenuItem', 'Agoods');break;
					case 3:this.$emit('MenuItem', 'Acomment');break;
					case 4:this.$emit('MenuItem', 'Auser');break;
				}
				
				
			},

		}
	};
</script>

<style>
	.group1 {
		font-size: 15px;
		text-align: left;
	}

	.item1 {
		text-align: left;
		font-size: 18px;
	}

	.item2 {
		font-size: 25px;
	}
</style>
