<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data(){
			return{
				
			}
		},
		components: {
           
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			}
		},
		methods: {
		

		},
		created() {
			//创建时，将vuex中替换为session中数据
			//刷新时，将store中数据保存到 session中
			sessionStorage.getItem("userMsg") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("userMsg")));
			window.addEventListener("beforeunload", () => {
				sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state))
			})
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
