<template>
	<el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="商户名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="商户地址">
			<el-input v-model="form.addr"></el-input>
		</el-form-item>
		<el-form-item label="商户图片">
			<el-upload
			  action="/upload"
			  type="drag"
			  :thumbnail-mode="true"
			  :on-success="fileuploadSuccess"
			>
			  <i class="el-icon-upload"></i>
			  <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</el-form-item>
		<el-form-item label="餐桌数量">
			<el-input-number v-model="form.count" :size="large"></el-input-number>
		</el-form-item>
		<el-form-item label="有效期">
			<el-col :span="23">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.inDate" style="width: 100%;"></el-date-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="后厨打印方式">
			<el-radio class="radio" v-model="form.printType" label="pc">前台电脑打印</el-radio>
  			<el-radio class="radio" v-model="form.printType" label="cloud">云打印机</el-radio>
		</el-form-item>
		<el-form-item label="前台打印账号" v-if="this.form.printType == 'pc'">
			<el-row :gutter="20">
				<el-col :span="10">
					<el-input v-model="form.pcName" placeholder="账号名"></el-input>
				</el-col>
				<el-col :span="10">
					<el-input v-model="form.pcPwd" placeholder="密码"></el-input>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item label="云账号" v-else>
			<el-row :gutter="20">
				<el-col :span="10">
					<el-input v-model="form.machine_code" placeholder="machine_code"></el-input>
				</el-col>
				<el-col :span="10">
					<el-input v-model="form.msign" placeholder="msign"></el-input>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          count: 10,
          addr: '',
          pic: '',
          printType: "pc",
          inDate:'',
          pcName:'',
          pcPwd:'',
          machine_code:'',
          msign:'',
        }
      }
    },
    methods: {
      onSubmit:function() {
      	const data = new FormData();
            data.append("name",this.form.name);
            data.append("addr",this.form.addr);
            data.append("pic",this.form.pic);
            data.append("count",this.form.count);
            data.append("printType",this.form.printType);
            data.append("inDate",this.form.inDate.toLocaleDateString());
            if(this.form.printType == 'pc') {
            	data.append("pcName",this.form.pcName);
            	data.append("pcPwd",this.form.pcPwd);
            } else {
            	data.append("machine_code",this.form.machine_code);
            	data.append("msign",this.form.msign);
            }
            fetch("/admin/addMerchant",
              {
                method: "POST",
                body:data,
              }
            ).then(resp => resp.json())
            .then(result => {
              if(result.ok) {
                this.$message({
                  showClose: true,
                  message: '添加商户成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  showClose: true,
                  message: result.text,
                  type: 'error'
                });
              }
            });
      },

      fileuploadSuccess:function(response) {
      	console.log(response);
      	this.form.pic = response.data.text;
      }
    }
  }
</script>