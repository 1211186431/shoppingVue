<template>
	<div>
		<el-table :data="comments" style="width: 100%" height="500" @row-click="getComment">
			<el-table-column prop="id" label="评论编号"></el-table-column>
			<el-table-column prop="content" label="评论"></el-table-column>
			<el-table-column prop="state" label="状态">
					<template slot-scope="scope">
						<el-tag :type="getState(scope.row.state)">
						      异常
						</el-tag>
					</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click.stop="setState(scope.$index)">设置状态</el-button>
					<el-button size="mini" @click.stop="deleteComment(scope.$index)">删除评论</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>{{comment}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import * as dateUtils from "../../util/myDate.js"
	export default {
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				comments: [],
				comment:{
					content: "",
					createDate: "",
					goods_id: 0,
					grade: 0,
					id: 0,
					orderNum: "",
					state: 0,
					user_id: 0,
				},
				dialogVisible: false
			}
		},
		methods: {
			getState(state){
				switch(state){
					case 1: return 'success';break;
					case 0: return 'danger';break;
				}
			},
			getAllComment() {
				var that = this;
				var url = this.HOST + "/Audit/getAllComment";
				that.$axios({
					method: "get",
					url: url,
				}).then(response => {
					this.comments = response.data
				});
			},
			getComment(row){
				this.comment.content=row.content;
				let d = new Date(row.createDate);
				this.comment.createDate=dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');
				this.comment.goods_id=row.goods_id;
				this.comment.grade=row.grade;
				this.comment.id=row.id;
				this.comment.user_id=row.user_id;
				this.comment.orderNum=row.orderNum;
				if (row.state == 1)
					this.comment.state = "正常";
				else
					this.comment.state = "异常";
				
				this.dialogVisible=true;
			},
			setState(row) {
				alert(this.comments[row].state);
			},
			deleteComment(row) {
				alert("删除成功");
			}
		},
		mounted() {
			this.getAllComment();
		}
	}
</script>

<style>
</style>
