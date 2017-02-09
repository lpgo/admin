<template>
  <div>
    <el-table :data="menus" height="450" border style="width: 100%" stripe>
      <el-table-column type="index" label="序号" width="70" ></el-table-column>
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="prices" label="价格" >
        <template scope="scope">
          <span v-for="p in scope.row.prices" style="padding-right:10px">{{p.std}}:{{p.price}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="230">
        <template scope="scope">
          <el-button @click.native.prevent="moveUp(scope.$index, menus, 'menus')" size="small" icon="caret-top">
              上移
          </el-button>
          <el-button @click.native.prevent="moveDown(scope.$index, menus, 'menus')" size="small" icon="caret-bottom">
            下移
          </el-button>
          <el-button
            @click.native.prevent="deleteMenu(scope.$index, menus,'menus')"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="2" :offset="19" style="margin-top:10px">
        <el-button type="primary" @click="menuTypeVisible = true">类型配置</el-button>
      </el-col>
      <el-col :span="2" :offset="1" style="margin-top:10px">
        <el-button type="primary" @click="addMenuVisible = true">添加菜单</el-button>
      </el-col>
    </el-row>

    <el-dialog title="菜单类型配置" v-model="menuTypeVisible">
       <el-table :data="menuTypes" stripe border>
        <el-table-column type="index" label="序号" width="70" ></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template scope="scope">
            <el-button @click.native.prevent="moveUp(scope.$index, menuTypes, 'menuTypes')" size="small" icon="caret-top">
              上移
            </el-button>
            <el-button @click.native.prevent="moveDown(scope.$index, menuTypes, 'menuTypes')" size="small" icon="caret-bottom">
              下移
            </el-button>
            <el-button
              @click.native.prevent="deleteMenu(scope.$index, menuTypes, 'menuTypes')"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-form :model="typeForm" :inline="true">
          <el-form-item >
            <el-input v-model="typeForm.name" placeholder="名称" width="100px"></el-input>
          </el-form-item>
          <el-form-item
            <el-button type="primary" @click="addType">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    
    <el-dialog title="添加菜单" v-model="addMenuVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="/upload"
            type="drag" :thumbnail-mode="true" :on-success="fileuploadSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
            <el-radio-group v-model="form.type">
              <el-radio :label="t.name" v-for="t in menuTypes">{{t.name}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-row>
            <span v-for="p in form.prices" style="padding-right:10px">{{p.std}}:{{p.price}}</span>
          </el-row>
          <el-row >
            <el-col :span="9">
              <el-input v-model="form.standard" >
                <template slot="prepend">规格</template>
              </el-input>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-input v-model="form.price" >
                <template slot="prepend">价格</template>
              </el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="primary" @click="addPrice">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import util from '../../common/util.js'
 
export default {

  data() {
    return {
      addMenuVisible:false,
      menuTypeVisible:false,
      formLabelWidth:'80px',
      form:{
        name:'',
        prices:[],
        standard:'标准',
        price:'',
        pic:'',
        type:'',
      },
      typeForm:{
        name:'',
      },

      menus: [],

      menuTypes:[],
    }
  },

	computed: {
  	 ...mapState({
        hid: state => state.hotel.hid,
      })
  },

  beforeMount: function() {
    util.postForm(this,"/manager/getAllMenuTypes",{hid:this.hid},result => {
      this.menuTypes.push(...result.data);  
    });
    util.postForm(this,"/manager/getAllMenus",{hid:this.hid},result => {
      this.menus.push(...result.data);  
    });
  },

  methods: {
    addType() {
      let t = {name:this.typeForm.name,order:this.menuTypes.length};
      this.menuTypes.push(t);
      util.postForm(this,"/manager/addMenuType",t,function(result){
        t.id = result.text
      });
    },
    addMenu() {
      let t = {name:this.form.name,prices:this.form.prices,type:this.form.type,order:this.menus.length};
      this.menus.push(t);
      util.postJson(this,"/manager/addMenu",t,function(result){
        t.id = result.text;
      });
      this.addMenuVisible = false;
    },
    addPrice() {
      this.form.prices.push({std:this.form.standard,price:this.form.price});
    },
    deleteMenu(index,array,db) {
      array.splice(index,1);
      if(db == "menus") {
        if(array[index].id) {
          util.postForm(this,"/manager/deleteMenu",{id:array[index].id},function(){});
        }
      } else {
        if(array[index].id) {
          util.postForm(this,"/manager/deleteMenuType",{id:array[index].id},function(){});
        }
      }
    },
    fileuploadSuccess(response) {
      this.form.pic = response.data.text;
    },
    moveUp(index, array, db) {
      if(index < 1) return ;
      var temp = array[index -1];
      array[index-1] = array[index];
      array[index-1].order = index -1;
      this.$set(array, index, temp);
      array[index].order = index;
      if(db == "menus") {
        if(array[index-1].id && array[index].id) {
          util.postJson(this,"/manager/changeMenuOrder",[array[index-1],array[index]],function(){})
        }
      } else {
        if(array[index-1].id && array[index].id) {
          util.postJson(this,"/manager/changeMenuTypeOrder",[array[index-1],array[index]],function(){})
        }
      }
    },
    moveDown(index, array, db) {
      if(index > array.length -2) return ;
      var temp = array[index +1];
      array[index+1] = array[index];
      array[index+1].order = index +1;
      this.$set(array, index, temp);
      array[index].order = index;
      if(db == "menus") {
        if(array[index+1].id && array[index].id) {
          util.postJson(this,"/manager/changeMenuOrder",[array[index+1],array[index]],function(){})
        }
      } else {
        if(array[index+1].id && array[index].id) {
          util.postJson(this,"/manager/changeMenuTypeOrder",[array[index+1],array[index]],function(){})
        }
      }
    },
  }
}
</script>