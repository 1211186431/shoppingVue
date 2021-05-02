<template>
	<div>
		<div>
			<p>用户列表</p>
			<el-table :data="users" highlight-current-row @current-change="handleCurrentChange">
				<el-table-column prop="name" label="用户名"></el-table-column>
			</el-table>
		</div>
		<p>{{to}}</p>
		<div>
			<label>请输入聊天内容：</label>
			<input type="text" id="content" placeholder="聊天内容" v-model="content">
		</div>
		<!-- 	<el-input v-model="to" placeholder="发送对象"/> -->
		<button id="send" type="button" @click="sendName()">发送</button>
		<el-table :data="getMessage">
			<el-table-column prop="fromUser" label="发送人">
			</el-table-column>
			<el-table-column prop="userContent" label="消息">
			</el-table-column>
			<el-table-column prop="crateDate" label="时间">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import SockJS from 'sockjs-client';
	import Stomp from 'stompjs';
	export default {
		computed: {
			userName() {
				return this.$store.state.userName;
			}
		},
		data() {
			return {
				content: "111",
				greeting: "",
				stompClient: null,
				to: "",
				users: [],
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
			showGreeting(message) {
				// var m = {
				// 	"fromUser": message.fromUser,
				// 	"userContent": message.userContent
				// }
				this.getMessage.push(message);
			},
			sendName() {
				this.stompClient.send("/app/chat", {},
					JSON.stringify({
						'toUser': this.to,
                        "userContent": this.content
					}));
					var d=new Date();
				var m = {
						"fromUser": this.userName+"(我)",
						"userContent": this.content,
						"crateDate":d,
						"chatId":null,
						"toUser":this.to
				}
				this.getMessage.push(m)
			},
			getUser() {
				var that = this;
				var url = this.HOST + "/user/getAll";
				that.$axios({
					method: "get",
					url: url
				}).then(response => {
					this.users = response.data
				});
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
			handleCurrentChange(val) {
				this.to = val.name;
				this.getUserChat();
			}
		},
		mounted() {
			this.getUser();
			this.connect();
		}
	}
</script>

<style>
</style>
