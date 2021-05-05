<template>
	<div>
			<el-card class="box-card" style="width: 700px;">
				<div slot="header" class="clearfix">
					<span>与{{to}}聊天</span>
				</div>
				<div style="height: 200px;overflow:auto" ref="chatContent">
					<Chat v-for="item in this.getMessage" :UserMessage="item" :isleft="isleft(item)" :key="item.chatId">
					</Chat>
				</div>
				<div>
					<el-input style="width: 500px;" v-model="content"></el-input>
					<el-button icon="el-icon-s-promotion" type="primary" @click="sendName()">发送</el-button>
				</div>
			</el-card>

	</div>
</template>

<script>
	import SockJS from 'sockjs-client';
	import Stomp from 'stompjs';
	import Chat from './Chat2.vue'
	export default {
		props:['toUser'],
		components: {
			Chat
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			to(){
				return this.toUser;
			}
		},
		data() {
			return {
				value: "",
				content: "",
				greeting: "",
				stompClient: null,
				getMessage: []
			}
		},
		methods: {
			connect() {
				var url = this.HOST + "/chat";
				var socket = new SockJS(url);
				this.stompClient = Stomp.over(socket);
				this.stompClient.connect({}, () => {
					this.stompClient.subscribe('/user/queue/chat', (greeting) => {
						this.showGreeting(JSON.parse(greeting.body));
					});
				})
			},
			getUserChat(){
				var that = this;
				var url = this.HOST + "/userChat/getUserChat";
				that.$axios({
					method: "get",
					url: url,
					params:{
						"fromUser":this.userName,
						"toUser":this.to
					}
				}).then(response => {
					this.getMessage = response.data
				});
			},
			showGreeting(message) {
				this.getMessage.push(message);
			},
			goDown() {
				this.$nextTick(() => { //https://blog.csdn.net/qq_40557812/article/details/85051011
					this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight //到底部
				})
			},
			sendName() {
				this.stompClient.send("/app/chat", {},
					JSON.stringify({
						'toUser': this.to,
			            "userContent": this.content
					}));
					var d=new Date();
				var m = {
						"fromUser": this.userName,
						"userContent": this.content,
						"crateDate":d,
						"chatId":null,
						"toUser":this.to
				}
				this.getMessage.push(m);
				this.goDown();
			},
			isleft(item) {
				if (item.fromUser == this.userName)
					return "left";
				else
					return "right";
			}
		},
		watch: {
			to(newVal, oldVal) {
				this.getUserChat();
			}		
		},
		mounted() {
			this.connect();
			this.getUserChat();
		}
	}
</script>

<style>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 800px;
	}
</style>
