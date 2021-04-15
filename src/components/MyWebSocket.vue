<template>
	<div>
		<div>
			<label for="name">请输入用户名：</label>
			<el-input type="text" id="name" placeholder="用户名" v-model="name"></el-input>
		</div>
		<div>
			<button id="connect" type="button" @click="connect()">连接</button>
			<button id="disconnect" type="button" disabled="disabled">断开连接</button>
		</div>
		<div>
			<label>请输入聊天内容：</label>
			<input type="text" id="content" placeholder="聊天内容" v-model="content">
		</div>
		<button id="send" type="button" @click="sendName()">发送</button>
		<input v-model="greeting" />
	</div>
</template>

<script>
	import SockJS from  'sockjs-client';
	import  Stomp from 'stompjs';
	export default {
		data() {
			return {
				name: "",
				content: "111",
				greeting:"",
				stompClient:null
			}
		},
		methods: {
			connect() {
				var url=this.HOST+"/chat";
				var socket = new SockJS(url);
				this.stompClient = Stomp.over(socket);
				this.stompClient.connect({},()=>{
					this.stompClient.subscribe('/topic/greetings',  (greeting)=> {
					            this.showGreeting(JSON.parse(greeting.body));
					        });
				})
				console.log("123");
			},
			showGreeting(message) {
			    this.greeting=this.greeting+"\n"+message.name+":"+message.content;
			},
			sendName() {
			    this.stompClient.send("/app/hello",
			        {},
			        JSON.stringify({'name': this.name,'content':this.content}));
			}
		}
	}
</script>

<style>
</style>
