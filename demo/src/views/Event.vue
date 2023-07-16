<template>
  <div style="padding:30px">
    <h2 style="padding:10px;margin-top: 0px">事件展示</h2>
    <div>
      <el-input v-model="search" placeholder="请输入内容" style="width: 20%"></el-input>
      <el-button style="margin-left: 5px;" type="primary" @click="setchFun">查询</el-button>
      <el-button style="margin-left: 5px;" type="primary" @click="add">新增</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="event_type"
          width="142"
          label="事件类型">
      </el-table-column>
      <el-table-column
          prop="event_date"
          label="日期"
          width="132"
          sortable>
        <template #default="scope">
          {{ formeDateFun(scope.row.event_date) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="event_location"
          label="事件发生地点"
          width="220"
          sortable>
      </el-table-column>
      <el-table-column
          prop="event_desc"
          width="202"
          label="事件描述">
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">编辑
          </el-button>

          <el-button
              size="mini"
              type="danger"
              style="margin-left: 5px" @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
          <el-button size="mini" @click="check(scope.row)">查看截图</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="图片" v-model="dialogImgVisible">
      <div>
        <img  style="width: 50vw;height: 400px;object-fit:contain;padding: 20px;display: inline-block"  :src="base64" alt="">
      </div>
    </el-dialog>
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
      <el-dialog title="提示" v-model="dialogVisible" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="事件类型">
            <el-input v-model="form.event_type"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
                v-model="form.event_date"
                type="date"
                placeholder="Pick a day"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="事件发生地点">
            <el-input v-model="form.event_location"></el-input>
          </el-form-item>
          <el-form-item label="事件描述">
            <el-input v-model="form.event_desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>

import api from "@/api";
import Base64 from "base-64";

export default {
  data() {
    return {
      dialogImgVisible: false,
      base64: '',
      search: '',
      form: {},
      dialogVisible: false,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      tableData: [],
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api.get("http://localhost:8080/api/event/getAllEvents", {
        headers: {
          "content-type": "multipart/form-data"
        },
        params: {
          page: this.currentPage,
          per_page: this.pageSize,
          search: this.search
        }
      }).then(res => {
        console.log(111, res)
        this.tableData = res.data.items
        this.total = res.data.total_items || 0
      })
    },
    blobTobase64(blob) {
      return new Promise((res, rej) => {
        const reader = new FileReader()
        reader.onloadend = function () {
          const base = reader.result
          res(base)
        }
        reader.onerror = function () {
          rej(new Error('error'))
        }
        reader.readAsDataURL(blob)
      })
    },
    check(row) {
      let that = this
      const image_name = row.pic_url;
      api.post(`http://localhost:8080/api/video/get_pic?image_name=` + image_name, {}, {
        responseType: 'blob',
        headers: {
          "Content-Type": 'application/octet-stream'
        }
      }).then(res => {
            console.log(res)
            this.blobTobase64(res).then((base64string) => {
              console.log(base64string, '#################')
              that.base64 = base64string
              that.dialogImgVisible= true
            }).catch((err) => {
              console.error(err)
            })
            if (res.code == '200') {
              this.$message({
                type: "success",
                message: "查看成功",
              })
            }
          }
      )
    },
    handleSizeChange(per_page) {
      this.pageSize = per_page
      this.load()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.load()
    },
    formeDateFun(time) {
      let d = new Date(time);
      let year = d.getFullYear();
      let mounce = d.getMonth() + 1;
      let day = d.getDate()
      let str = `${year}-${mounce > 9 ? mounce : '0' + mounce}-${day > 9 ? day : '0' + day}`;
      return str;
    },
    setchFun() {
      if (this.search) {
        api.get(`http://localhost:8080/api/event/getEvent/${this.search}`, {}
        ).then(res => {
          console.log(111, res)
          this.tableData = [res.data]
          this.total = 1
        })
      } else {
        this.load()
      }
    },
    add() {
      this.dialogVisible = true
      this.form = {}
    },
    save() {
      let formDate = new FormData()
      formDate.append('id', this.form.ID);
      formDate.append('event_type', this.form.event_type);
      formDate.append('event_date', this.form.event_date);
      formDate.append('event_location', this.form.event_location);
      formDate.append('event_desc', this.form.event_desc);
      formDate.append('pic_url', this.form.pic_url);
      // formDate.append('birthday',this.form.birthday);
      if (this.form.ID) {
        api.put(`http://localhost:8080/api/event/updateEvent/${this.form.ID}`, formDate).then(res => {
          console.log(res)
          if (res.code == '200') {
            this.$message({
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              message: "更新失败"
            })
          }
          this.load()
          this.dialogVisible = false
        })
      } else {
        api.post("http://localhost:8080/api/event/addEvent", formDate, {
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then(res => {
          console.log(res)
          if (res.code == '200') {
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: "新增失败"
            })
          }
          this.load()
          this.dialogVisible = false
        })
      }
    },
    handleEdit(row) {
      let obj = JSON.parse(JSON.stringify(row))
      obj.birthday = this.formeDateFun(obj.birthday);
      this.form = obj;
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      this.$confirm(
          '确定要删除吗？',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        api.delete(`http://localhost:8080/api/event/deleteEvent/${this.form.ID}`, {data: requestData}, {
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then(res => {
          if (res.code == '200') {
            this.$message({
              type: "success",
              message: "删除成功"
            })
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            })
          }
          this.load()
        })
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>