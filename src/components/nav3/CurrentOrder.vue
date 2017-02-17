<template>
	<el-row>
		<el-col :span="15">
			<el-table :data="todayOrders" height="100%" border style="width: 100%" stripe highlight-current-row @current-change="handleCurrentChange">
				<el-table-column type="index" label="序号" ></el-table-column>
				<el-table-column prop="desk" label="桌子" ></el-table-column>
				<el-table-column label="时间" width="200" >
					<template scope="scope">
			          	{{timeStr(scope.row.time)}}
			        </template>
				</el-table-column>
				<el-table-column prop="total" label="应付款" ></el-table-column>
				<el-table-column prop="pay" label="实付款" ></el-table-column>
				<el-table-column label="付款方式" >
					<template scope="scope">
			          	
			          	<el-tag v-if="scope.row.pay_type == 2" type="primary">现金支付</el-tag>
			          	<el-tag v-if="scope.row.pay_type == 1" type="success">微信支付</el-tag>
			        </template>
				</el-table-column>
				<el-table-column label="是否付款" >
					<template scope="scope">
			          	<el-button v-if="!scope.row.is_payed" size="small" type="danger">未付款</el-button>
						<el-button v-if="scope.row.is_payed" size="small" type="success">已付款</el-button>
			        </template>
				</el-table-column>
			</el-table>
		</el-col>
		<el-col :span="8" :offset="1">
			单号:{{selectOrder.id}} <span style="float:right;padding-right:3em">桌号:{{selectOrder.desk}}</span>
			<hr/>
			<table width="100%">
				<thead>
					<tr>
						<td>菜品名称</td>
						<td>数量</td>
						<td>规格</td>
						<td>小计</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in selectOrder.items">
						<td>{{item.name}}</td>
						<td>{{item.count}}</td>
						<td>{{item.std}}</td>
						<td>{{item.price}}</td>
					</tr>
				</tbody>
			</table>
			<hr/>
			消费总计：{{selectOrder.total}}
			实付款：{{selectOrder.pay}}
			时间：{{timeStr(selectOrder.time)}}
		</el-col>
	</el-row>
</template>

<script>
import util from '../../common/util.js'

	export default {
		data() {
			return {
				todayOrders:[
					{desk:"1号",time:new Date(),total:121.23,pay:0,pay_type:2,is_payed:false},
					{desk:"2号",time:new Date(),total:121,pay:121,pay_type:1,is_payed:true},
					{desk:"3号",time:new Date(),total:121,pay:121,pay_type:1,is_payed:true},
				],
				selectOrder: {id:"589853c831f7c552f358e1b3",desk:"12",items:[{name:"炭烧牛排",count:1,std:"标准",price:23.5},{name:"火烧牛排",count:1,std:"标准",price:21.5}],total:45.0,pay:0,time:new Date()},
			};
		},
		methods: {
			timeStr(time) {
				return util.format(time,"yyyy-MM-dd hh:mm:ss");
			},
			handleCurrentChange() {

			},
		},
	}
</script>