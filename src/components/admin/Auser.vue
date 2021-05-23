<template>
	<div>
		<el-table :data="users" style="width: 100%" height="500" @row-click="getUserInfo">
			<el-table-column prop="id" label="用户编号"></el-table-column>
			<el-table-column prop="name" label="用户名"></el-table-column>
			<el-table-column prop="money" label="钱包"></el-table-column>
			<el-table-column prop="state" label="状态">
				<template slot-scope="scope">
					<el-tag :type="getState(scope.row.state)">
					      正常
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click.stop="setState(scope.$index)">设置状态</el-button>
					<el-button size="mini" @click.stop="setMoney(scope.$index)">设置金额</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>{{userInfo}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			userId() {
				return this.$store.state.userId;
			}
		},
		data() {
			return {
				users: [],
				userInfo: {
					email: "",
					id: 0,
					integral: 0,
					location: "",
					money: 0,
					name: "",
					phone: "",
					role: "",
					sex: "",
					state: "",
					username: "",
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
			getUserInfo(row) {
				this.userInfo.email = row.email;
				this.userInfo.id = row.id;
				this.userInfo.integral = row.integral;
				this.userInfo.location = row.location;
				this.userInfo.money = row.money;
				this.userInfo.phone = row.phone;
				this.userInfo.username = row.username;
				if (row.role == "ROLE_user")
					this.userInfo.role = "普通用户";
				else
					this.userInfo.role = "特殊用户";
				if (row.sex == 0)
					this.userInfo.sex = "男性";
				else
					this.userInfo.sex = "女性";
				if (row.state == 1)
					this.userInfo.state = "正常";
				else
					this.userInfo.state = "异常";
				this.dialogVisible = true;
			},
			getUser() {
				var that = this;
				// eslint-disable-next-line no-undef
				var url = this.HOST + "/Audit/getAllUser";
				that.$axios({
					method: "get",
					url: url,
				}).then(response => {
					this.users = response.data
				}).catch(e => {
					//console.log("权限不足");
				});
			},
			setState(row) {
				alert(this.users[row].state);
			},
			setMoney(row) {
				alert(this.users[row].money);
			}
		},
		mounted() {
			this.getUser();
		}
	}
</script>

<style>
</style>
