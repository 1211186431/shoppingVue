<template>
	<div style="height: 300px;">
		<slot>
			<p />c2
			<el-input v-model="c2"></el-input>
			<el-button @click="send()">传回</el-button>
		</slot>
		<slot name="cslot" :msg="mymsg" abc="abc">
			<p>这是c2组件内容</p>
		</slot>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				c2: "",
				mymsg:"来自子组件的内容2"
			}
		},
		methods: {
			send() {
				this.$emit('c2data', this.c2);
			}

		}
	}
</script>

<style>
</style>
