<template>
	<div>
		<el-form :model="goodsDetail">
			<el-form-item label="名字">
				<el-input tyle="width:200px" v-model="goodsDetail.name"></el-input>
			</el-form-item>
			<el-form-item label="价格">
				<el-input tyle="width:200px" v-model="goodsDetail.price"></el-input>
			</el-form-item>
			<el-form-item label="库存">
				<el-input tyle="width:200px" v-model="goodsDetail.inventory"></el-input>
			</el-form-item>
			<el-form-item label="新旧度">
				<el-input tyle="width:200px" v-model="goodsDetail.oldAndnew"></el-input>
			</el-form-item>
			<el-form-item label="地址">
				<el-input tyle="width:200px" v-model="goodsDetail.delivery"></el-input>
			</el-form-item>
			<el-form-item label="可以议价">
				<el-radio v-model="goodsDetail.bargain" label="1">可以</el-radio>
				<el-radio v-model="goodsDetail.bargain" label="0">不可以</el-radio>
			</el-form-item>
			<el-form-item label="类型">
				<template>
					<el-select v-model="setType" placeholder="请选择" multiple>
						<el-option v-for="item in goodstypes" :key="item.index" :label="item.type"
							:value="item.type_id">
						</el-option>
					</el-select>
				</template>
			</el-form-item>
		</el-form>
		<div>
			<el-upload :action="uuu" :data="u" list-type="picture-card" :on-preview="handlePictureCardPreview"
				:on-remove="handleRemove" :auto-upload="false"  :on-success="onUpload" ref="upload">
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</div>
		<el-button @click="CreateGoods()">提交</el-button>
	</div>
</template>

<script>
	export default {
		props: {
			sellerId: null,
			goodsId: null
		},
		data() {
			return {
				goodsDetail: {
					"user_id": this.sellerId,
					"price": 10,
					"inventory": 10,
					"oldAndnew": 90,
					"state": 1,
					"name": "书2",
					"details": "这是一本书",
					"onsaleDate": new Date(),
					"picture": "",
					"bargain": "1",
					"delivery": "北京",
					"goodstype": []
				},
				goodstypes: [],
				setType:[],
				dialogImageUrl: '',
				dialogVisible: false,
				uuu: this.HOST + "/goods/uploadPic",
				u: {
					goodsId:15
				}
			}
		},
		methods: {
			getGoodsType() {
				var url = this.HOST + "/goods/getAllType";
				this.$axios({
					method: "get",
					url: url,
				}).then(response => {
					this.goodstypes = response.data;
				});
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			CreateGoods() {
				if(this.setType!=null){
					for(var i=0;i<this.setType.length;i++)
					  this.goodsDetail.goodstype.push(this.goodstypes[this.setType[i]])
				}
				
				 var url = this.HOST + "/goods/insertGoods";
				 this.$axios({
				 	method: "post",
				 	url: url,
					data:this.goodsDetail
				 }).then(response => {
					 this.u.goodsId=response.data;
				 	 this.$refs.upload.submit();
				 });
			},
			onUpload(response, file, fileList) { //成功上传
				console.log(response);
				console.log(fileList);
			}
		},
		mounted() {
			this.getGoodsType();
		}
	}
</script>

<style>
</style>
