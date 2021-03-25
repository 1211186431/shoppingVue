<template>
	<div style="height: 300px;">
		<p>c1</p>
		<p>f1==<span>{{f1}}</span></p>
		<p>c1-2==<span>{{c1}}</span></p>
		<p>c1-3==<span>{{c2}}</span></p>
		<p>c2==<span>{{cdata}}</span></p>
		<ul>
			<li v-for="d1 in d" :key="d1">{{d1}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
	  props:['f1','cdata','d'],
	  data(){
		  return{
			  c1:this.f1,
			  c2:this.f1,
		  }
	  },
	  watch:{
		  f1(n,o){
			  this.c2=this.f1;
		  }
	  },
	  mounted() {
	  	
	  }
	}
</script>

<style>
</style>
