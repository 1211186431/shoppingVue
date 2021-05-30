<template>
	<div>
		<el-form :model="goodsDetail">
			<el-form-item label="名字:">
				<el-input style="width:200px" v-model="goodsDetail.name"></el-input>
			</el-form-item>
			<el-form-item label="价格:">
				<el-input style="width:200px" v-model="goodsDetail.price"></el-input>
			</el-form-item>
			<el-form-item label="库存:">
				<el-input style="width:200px" v-model="goodsDetail.inventory"></el-input>
			</el-form-item>
			<el-form-item label="新旧度:">
				<el-input style="width:200px" v-model="goodsDetail.oldAndnew"></el-input>
			</el-form-item>
			<el-form-item label="地址:">
				<el-input style="width:200px" v-model="goodsDetail.delivery"></el-input>
			</el-form-item>
			<el-form-item label="详情:">
				<el-input style="width:200px" v-model="goodsDetail.details"></el-input>
			</el-form-item>
			<el-form-item label="议价:">
				<el-radio v-model="goodsDetail.bargain" label="1">可以</el-radio>
				<el-radio v-model="goodsDetail.bargain" label="0">不可以</el-radio>
			</el-form-item>
			<el-form-item label="类型:">
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
				:on-remove="handleRemove" :auto-upload="false" :on-success="onUpload" ref="upload">
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
		computed: {
			sellerId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				goodsDetail: {
					"user_id":0,
					"price": 0,
					"inventory": 0,
					"oldAndnew": 0,
					"state": 1,
					"name": "",
					"details": "",
					"onsaleDate": new Date(),
					"picture": "",
					"bargain": "1",
					"delivery": "",
					"goodstype": []
				},
				goodstypes: [],
				setType: [],
				dialogImageUrl: '',
				dialogVisible: false,
				uuu: this.HOST + "/goods/uploadPic",
				u: {
					goodsId: null
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
				if (this.setType != null) {
					for (var i = 0; i < this.setType.length; i++) {
						var t = this.setType[i];
						for (var j = 0; j < this.goodstypes.length; j++) {
							if (this.goodstypes[j].type_id == t) {
								this.goodsDetail.goodstype.push(this.goodstypes[j]);
								break;
							}
						}
					}
				}
				this.goodsDetail.user_id=this.sellerId;
				var url = this.HOST + "/goods/insertGoods";
				this.$axios({
					method: "post",
					url: url,
					data: this.goodsDetail
				}).then(response => {
					this.u.goodsId = response.data;
					if (this.u.goodsId != null)
						this.$refs.upload.submit();
					alert("插入成功");
				});
			},
			onUpload(response, file, fileList) { //成功上传
				// console.log(response);
				// console.log(fileList);
			}
		},
		mounted() {
			this.getGoodsType();
		}
	}
</script>

<style>
</style>
