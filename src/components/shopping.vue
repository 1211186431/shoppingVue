<template>
	<div>
		<el-button @click="getInfo()">get</el-button>
		<div id='table'>
			<el-table :data="shopping" style="width: 100%">
				<el-table-column prop="id" width="0">
				</el-table-column>
				<el-table-column prop="name" label="名称" width="180">
				</el-table-column>
				<el-table-column prop="price" label="价格" width="180">
				</el-table-column>
				<el-table-column prop="other" label="其他" width="180">
				</el-table-column>
			</el-table>
		</div>
		 <el-button @click="dialogFormVisible = true;">insert</el-button>
		 <el-dialog title="insert" :visible.sync="dialogFormVisible">
			 <el-form label-width="80px" v-model="shoppingInfo"  method="post" action="http://localhost:8081/shopping/insert">
			   <el-form-item label="名称">
			     <el-input name="name" v-model="shoppingInfo.name"></el-input>
			   </el-form-item>
			   <el-form-item label="价格">
			     <el-input name="price" v-model="shoppingInfo.price"></el-input>
			   </el-form-item>
			   <el-form-item label="其他">
			     <el-input name="other" v-model="shoppingInfo.other"></el-input>
			   </el-form-item>
			   <input type="submit" value="Submit">
			 </el-form>
			   <div slot="footer" class="dialog-footer">
			     <el-button type="primary" @click="insertInfo();">确 定</el-button>
			   </div>
		</el-dialog>
		<p></p>
	     <el-input v-model="deleteId"></el-input>
	     <el-button type="primary" @click="deleteInfo()">删除</el-button>
		 
        <form action="http://localhost:8081/shopping/up" method="post" enctype="multipart/form-data">
                <label>上传图片</label>
                <input type="file" name="file"/>
                <input type="submit" value="上传"/>
        </form>
		 
		 
 
		
		 
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible:false,
				deleteId:"",
				shopping:[],
				name:"",
				price:"",
				other:"",
				shoppingInfo:{
					name:"",
					price:"",
					other:""
				}
			}
	
		},
		methods: {
			getInfo(){
				var that = this;
				// eslint-disable-next-line no-undef
				var url = this.HOST + "/getAll";
				that.$axios({
					 method: "get",
					 url: url,
				}).then(response => {
					this.shopping = response.data
				}).catch(e => {
					console.log("权限不足");
				});
			},
			insertInfo(){
				//console.log(this.shoppingInfo);
				var url1 = this.HOST + "/shopping/insert";
				this.$axios({  //直接传json
					 method: "post",
					 url: url1,
					 headers: {
					 	'Content-Type': 'application/x-www-form-urlencoded;'
					 },
					 params: {
					  name:this.shoppingInfo.name,
					  price:this.shoppingInfo.price,
					  other:this.shoppingInfo.other
					 }
				})
				  .then(function (response) {
				    console.log(response);
				  });
				 this.dialogFormVisible = false;
			},
			deleteInfo(){
				var url1 = this.HOST + "/shopping/delete";
				this.$axios({  
					 method: "delete",
					 url: url1,
					 params: {
					  id:this.deleteId
					 }
				})
				  .then(function (response) {
				    console.log(response);
				  });
		    }
	
		}
	}
</script>

<style>
</style>
