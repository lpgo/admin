<template>
  <div style="padding:10px">
    <div style="padding:10px">菜单类型:</div>
    <el-radio-group v-model="selectType" v-for="t in types">
      <el-radio :label="t">{{t}}</el-radio>
    </el-radio-group>
    <el-row :gutter="20">
      <el-col :span="3">
        添加菜单类型:
      </el-col>
      <el-col :span="6">
        <el-input v-model="temp" placeholder="菜单类型"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="addType">添加类型</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapStates } from 'vuex'

export default {

  data() {
    return {
      selectType:'',
      temp:'',
      types:['热菜'],
    }
  },

	computed: {
  	
  },

  methods: {
    addType() {
      this.types.push(this.temp)
    },
  }
}
</script>