<template>
	<div v-if="false">
		<el-input v-model="father1"></el-input>
		<el-button @click="change()">修改</el-button>
		<el-button @click="mypush()">push</el-button>
		<span v-for="d in data3" :key="d">{{d}} </span>
		<el-container>
			<el-aside width="50%" style="background-color: aliceblue;">
				<c1 :f1="father1" :cdata="data2" :d="data3" v-if="hackReset"></c1>
			</el-aside>
			<el-main style="background-color: aquamarine;">
				<c2 @c2data="Receive">
					<!-- <div slot="cslot">父组件内容</div -->
					<template slot="cslot" slot-scope="props">
						<p>{{props.msg}}</p>
						<p>{{props.abc}}</p>
					</template>
				</c2>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import c1 from './components/c1.vue'
	import c2 from './components/c2.vue'
	
	export default {
		name: 'App',
		components: {
			c1,
			c2
		},
		data() {
			return {
				father1: "abd",
				data2: "",
				data3: ["123"],
				hackReset: true
			}
	
		},
		methods: {
			Receive(c2data) {
				this.$message('c2数据:' + c2data);
				this.data2 = c2data;
			},
			mypush() {
				this.data3.push(this.father1);
			},
			change() {
				this.data3[0] = '333';
				this.$forceUpdate();
				this.$message('修改成功');
				this.hackReset = false; //强制刷新
				this.$nextTick(() => {
					this.hackReset = true;
				});
			},
			useData: function() {
				var that = this;
				// eslint-disable-next-line no-undef
				var url = this.HOST + "/config";
				that.$axios.get(url).then(response => {
					that.message1 = response.data
				})
	
			}
	
		}
	}
</script>

<style>
</style>
