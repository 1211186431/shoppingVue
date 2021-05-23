<template>
	<div>
			<MyChat :toUser="to"></MyChat>
	</div>
</template>

<script>
	import MyChat from '../../components/userChat/MyChat.vue'
	export default {
		props: ['dialogTableVisible'],
		components: {
			MyChat
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			d() {
				return this.dialogTableVisible
			}

		},
		data() {
			return {
				users: this.$store.state.talkList,
				to: "",
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
			}
		},
		created() {
			console.log("createSock");
		},
		mounted() {
			//this.getUser();
		}
	}
</script>

<style>
</style>
