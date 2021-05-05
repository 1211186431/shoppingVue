<template>
	<div>
		<div>
			<p>用户列表</p>
			<el-table :data="users" highlight-current-row @current-change="handleCurrentChange">
				<el-table-column prop="name" label="用户名"></el-table-column>
			</el-table>
		</div>
		<MyChat v-if="to.length>0 && userName.length>0" :toUser="to"></MyChat>
	</div>
</template>

<script>
	import MyChat from '../../components/MyChat.vue'
	export default {
		components:{
			MyChat
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			}
		},
		data() {
			return {
				users: [],
				to:""
			}
		},
		methods: {
			getUser() {
				var that = this;
				var url = this.HOST + "/user/getAll2";
				that.$axios({
					method: "get",
					url: url
				}).then(response => {
					this.users = response.data
				});
			},
			handleCurrentChange(val) {
				this.to = val.name;
			}
		},
		mounted() {
			this.getUser();
		}
	}
</script>

<style>
</style>
