<template>
	<div>
		<el-row>
			<span>商品编号：{{goodsDetail.id}}</span>
		</el-row>
		<el-row>
			<span>商品名称：{{goodsDetail.name}}</span>
		</el-row>
		<el-row>
			<span>商品价格：</span>
			<span v-show="!editMoney">{{goodsDetail.price}}</span>
			<el-input-number v-show="editMoney" v-model="goodsDetail.price" :min="1" :max="99999"
				controls-position="right" />
			<el-button @click="editMoney=true;" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
		</el-row>
		<el-row>
			<span>库存：</span>
			<span v-show="!editIn">{{goodsDetail.inventory}}</span>
			<el-input-number v-show="editIn" v-model="goodsDetail.inventory" :min="1" :max="200"
				controls-position="right" />
			<el-button @click="editIn=true;" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
		</el-row>
		<el-row>
			<span>新旧度：</span>
			<el-progress type="dashboard" :percentage="goodsDetail.oldAndnew" :color="colors" :width="50">
			</el-progress>
			<el-button-group v-show="editold">
				<el-button icon="el-icon-minus" @click="decrease" size="mini"></el-button>
				<el-button icon="el-icon-plus" @click="increase" size="mini"></el-button>
			</el-button-group>
			<el-button @click="editold=true;" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
		</el-row>
		<el-row>
			<span>发货地：<el-input v-model="goodsDetail.delivery" style="width: 80px;"></el-input></span>
		</el-row>
		<el-row>
			<span>议价：</span>
			<el-radio v-model="bargain" label="1">可以</el-radio>
			<el-radio v-model="bargain" label="0">不可以</el-radio>
		</el-row>
		<el-row>
            <span>分类</span>
			<el-tag v-for="tag in goodsDetail.goodstype" :key="tag.type_id" v-show="!editType">
				{{tag.type}}
			</el-tag>
			<el-select v-model="setType" placeholder="请选择" multiple v-show="editType">
				<el-option v-for="item in goodstypes" :key="item.index" :label="item.type" :value="item.type_id">
				</el-option>
			</el-select>
			<el-button @click="editType=true;" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
		</el-row>
		<el-row>
			<span>图片：</span>
			<el-image 
			    style="width: 100px; height: 100px"
			    :src=" getPicUrl(goodsDetail.picture,1)" 
			    :preview-src-list=" getPicUrl(goodsDetail.picture,2)" lazy>
			  </el-image>
		</el-row>
		<el-button @click="upDateGoods()">提交</el-button>
		<el-button @click="goback()">返回</el-button>
	</div>
</template>

<script>
	export default {
		computed: {
			sellerId() {
				return this.$store.state.userId;
			},
		},
		props: {
			goodsId: null
		},
		data() {
			return {
				colors: [{
						color: '#f56c6c',
						percentage: 20
					},
					{
						color: '#e6a23c',
						percentage: 40
					},
					{
						color: '#5cb87a',
						percentage: 60
					},
					{
						color: '#1989fa',
						percentage: 80
					},
					{
						color: '#6f7ad3',
						percentage: 100
					}
				],
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
				editMoney: false,
				editIn: false,
				editold: false,
				editType:false,
				bargain: "1",
				goodstypes: [],
				setType: []
			}
		},
		methods: {
			goback(){
				this.$emit('MenuItem', 'Sgoods');
			},
			getPicUrl(pic, num) {
				if (num == 1)
					return this.PicHOST + pic;
				else {
					var u = [];
					u.push(this.PicHOST + pic);
					return u;
				}
			},
			increase() {
				this.goodsDetail.oldAndnew += 5;
				if (this.goodsDetail.oldAndnew > 100) {
					this.goodsDetail.oldAndnew = 100;
				}
			},
			decrease() {
				this.goodsDetail.oldAndnew -= 5;
				if (this.goodsDetail.oldAndnew < 0) {
					this.goodsDetail.oldAndnew = 0;
				}
			},
			getGoodsType() {
				var url = this.HOST + "/goods/getAllType";
				this.$axios({
					method: "get",
					url: url,
				}).then(response => {
					this.goodstypes = response.data;
				});
			},
			upDateGoods() {
				if (this.setType != null) {
					for (var i = 0; i < this.setType.length; i++)
						this.goodsDetail.goodstype.push(this.goodstypes[this.setType[i]])
				}
				var url = this.HOST + "/goods/upDateGoods";
				this.$axios({
					method: "post",
					url: url,
					data: this.goodsDetail
				}).then(response => {
					alert("更新成功");
					this.goback();
				});
			},
			getGoodsDetail() {
				var url = this.HOST + "/goods/getGoods";
				this.$axios({
					method: "get",
					url: url,
					params: {
						goodsId: this.goodsId
					}
				}).then(response => {
					this.goodsDetail = response.data;
				});
				this.bargain = this.goodsDetail.bargain + "";
			}
		},
		mounted() {
			this.getGoodsType();
			this.getGoodsDetail();
		}
	}
</script>

<style>
</style>
