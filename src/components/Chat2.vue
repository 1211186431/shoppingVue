<template>
	<div style="width: 500px;height: 100px;">
		<div class="chatDate">
			<p>{{formatDate()}}</p>
		</div>
		<div :class="position">
			<el-row>
				<el-col :span="1">
					<div>
						<i class="el-icon-user"></i>
					</div>
				</el-col>
				<el-col :span="23">
					<div style="padding-left:20px;">
						<p>{{UserMessage.userContent}}</p>
					</div>
				</el-col>
			</el-row>
		</div>

	</div>
</template>

<script>
	import * as dateUtils from "../util/myDate.js"
	export default {
		props: ['UserMessage', 'isleft'],
		data() {
			return {
				messageDate: null,
			}
		},
		computed: {
			position: function() {
				if (this.isleft == "left")
					return {
						'left': true
					};
				else
					return {
						'right': true
					};
			}
		},
		methods: {
			formatDate() {
				let d = new Date(this.messageDate);
				return dateUtils.formatDate(d, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		mounted() {
			this.messageDate = this.UserMessage.crateDate;
		}
	}
</script>

<style>
	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.chatDate {
		text-align: center;
		color: #c0c0c0;
		font-size: small;
	}
</style>
