<template>
  <div style="padding:30px">
    <h2 style="padding:10px;margin-top: 0px">工作人员信息展示</h2>
    <div>
      <el-input v-model="search" placeholder="请输入内容" style="width: 20%"></el-input>
      <el-button style="margin-left: 5px;" type="primary" @click="serchFun">查询</el-button>
      <el-button style="margin-left: 5px;" type="primary" @click="add">新增</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="username"
          width="110"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="gender"
          width="110"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="phone"
          width="160"
          label="手机号">
      </el-table-column>
      <el-table-column
          prop="id_card"
          label="身份证号"
          width="160"
          sortable>
      </el-table-column>
      <el-table-column
          prop="hire_date"
          label="入职时间"
          width="140"
          sortable>
        <template #default="scope">
          {{formeDateFun(scope.row.hire_date) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="resign_date"
          label="离职时间"
          width="140"
          sortable>
        <template #default="scope">
          {{formeDateFun(scope.row.hire_date) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述"
          width="140"
          sortable>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">编辑</el-button>

          <el-button
              size="mini"
              type="danger"
              style="margin-left: 5px" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding:10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
      <el-dialog title="提示"  v-model="dialogVisible"  width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="姓名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.gender"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.id_card"></el-input>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-date-picker
                v-model="form.hire_date"
                type="date"
                placeholder="Pick a day"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
<!--          <el-button type="primary" @click="capture">拍摄人脸图像</el-button>-->
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import api from "@/api";

export default {
  data() {
    return {
      search:'',
      form:{},
      dialogVisible:false,
      currentPage:1,
      total:0,
      pageSize:10,
      tableData: []
    }
  },
  created(){
    this.load()
  },
  methods:{
    load(){
      api.get("http://localhost:8080/api/getAllEmployee",{
        headers: {
          "content-type": "application/json"
        },
        params:{
          page:this.currentPage,
          per_page:this.pageSize,
          search:this.search
        }
      }).then(res=>{
        console.log(111,res)
        this.tableData=res.data
        this.total=res.data.total_items || 0
      })
    },
    handleSizeChange(per_page){
      this.pageSize=per_page
      this.load()
    },
    handleCurrentChange(page){
      this.currentPage=page
      this.load()
    },
    formeDateFun(time){
      let d = new Date(time);
      let year=d.getFullYear();
      let mounce=d.getMonth() + 1;
      let day=d.getDate()
      let str=`${year}-${ mounce>9?mounce:'0'+mounce}-${day>9?day:'0'+day}`;
      return str;
    },
    serchFun(){
      if(this.search){
        api.get(`http://localhost:8080/api/getEmployee/${this.search}`, {}
        ).then(res=>{
          // debugger;
          console.log(111,res)
          this.tableData=res.data
          this.total=res.data.length;
        })
      }else{
        this.load()
      }
    },
    add(){
      this.dialogVisible=true
      this.form={}
    },
    save(){
      let formDate=new FormData()
      formDate.append('username',this.form.username);
      formDate.append('gender',this.form.gender);
      formDate.append('phone',this.form.phone);
      formDate.append('id_card',this.form.id_card);
      formDate.append('birthday',this.form.birthday);
      formDate.append('hire_date',this.form.hire_date);
      formDate.append('description',this.form.description);
      if(this.form.id){
        api.post(`http://localhost:8080/api/updateEmployee/${this.form.id}`,formDate,{
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then(res=>{
          console.log(res)
          if(res.code=='200'){
            this.$message({
              type:"success",
              message:"更新成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"更新失败"
            })
          }
          this.load()
          this.dialogVisible=false
        })
      }
      else{
        api.post("http://localhost:8080/api/addEmployee",formDate,{
          headers: {
            "content-type": "multipart/form-data"
          }}).then(res=>{
          console.log(res)
          if(res.code=='200'){
            this.$message({
              type:"success",
              message:"新增成功"
            })
          }else{
            this.$message({
              type:"error",
              message:res.msg
            })
          }
          this.load()
          this.dialogVisible=false
        })
      }
    },
    handleEdit(row){
      let obj =JSON.parse(JSON.stringify(row))
      obj.birthday =this.formeDateFun(obj.birthday);
      obj.hire_date =this.formeDateFun(obj.hire_date);
      obj.resign_date =this.formeDateFun(obj.resign_date);
      this.form=obj;
      this.dialogVisible=true
    },
    handleDelete(index,row){
      this.$confirm(
          '确定要删除吗？',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        api.post("/delete_volunteer_info"+row.ID,{},{
        }).then(res=>{
          if(res.code=='200'){
            this.$message({
              type:"success",
              message:"删除成功"
            })
          }else{
            this.$message({
              type:"error",
              message:res.msg
            })
          }
          this.load()
        })
      }).catch(()=>{
        console.log('取消')
      })
    }
  }
}
</script>