<template>
	<div>
		<div>
			<button id="connect" type="button" @click="connect()">连接</button>
			<button id="disconnect" type="button" disabled="disabled">断开连接</button>
		</div>
		<div>
			<label>请输入聊天内容：</label>
			<input type="text" id="content" placeholder="聊天内容" v-model="content">
		</div>
		<el-input v-model="to" placeholder="发送对象"/>
		<button id="send" type="button" @click="sendName()">发送</button>
	</div>
</template>

<script>
	import SockJS from  'sockjs-client';
	import  Stomp from 'stompjs';
	export default {
		data() {
			return {
				name: "admin",
				content: "111",
				greeting:"",
				stompClient:null,
				to:"",
					
			}
		},
		methods: {
			connect() {
				var url=this.HOST+"/chat";
				var socket = new SockJS(url);
				this.stompClient = Stomp.over(socket);
				this.stompClient.connect({},()=>{
					this.stompClient.subscribe('/user/queue/chat',  (greeting)=> {
					            this.showGreeting(JSON.parse(greeting.body));
					        });
				})
				console.log("123");
			},
			showGreeting(message) {
			},
			sendName() {
			    this.stompClient.send("/app/chat",
			        {},
			        JSON.stringify({'to': this.to,'content':this.content}));
			}
		}
	}
</script>

<style>
</style>
