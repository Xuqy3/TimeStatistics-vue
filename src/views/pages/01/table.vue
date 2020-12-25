<template>
  <div class="content">
    <div class="content-main">
      <div class="content-main-top">
        <div class="content-main-top-starttime">
          <span>开始时间</span>
          <el-date-picker v-model="search.beginTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="content-main-top-endtime">
          <span>结束时间</span>
          <el-date-picker v-model="search.endTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <span  class="content-main-top-type-title">开发人员</span>
        <div class="content-main-top-type">
          <el-input
            placeholder="请输入开发人员"
            prefix-icon="el-icon-search"
            v-model="search.developer">
          </el-input>
        </div>
        <span  class="content-main-top-type-title">工程点</span>
        <div class="content-main-top-type">
          <el-select v-model="search.engineePoint" placeholder="请选择">
            <el-option
              v-for="item in engineePointOptions"
              :key="item.engineePoint"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <span  class="content-main-top-type-title">组别</span>
        <div class="content-main-top-type">
          <el-select v-model="search.group" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.group"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="content-main-top-btn">
          <el-button type="primary" @click="Search()">查询</el-button>
          <el-button type="primary" @click="add()">新增</el-button>
          <el-button type="primary" @click="">导入</el-button>
          <el-button type="primary" @click="">导出</el-button>
          <!--          <el-button type="primary">新增</el-button>-->
        </div>
      </div>
      <div class="content-main-table">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            label="#">
          </el-table-column>
          <el-table-column
            align="center"
            prop="developer"
            label="开发人员">
          </el-table-column>
          <el-table-column
            align="center"
            prop="servNo"
            label="平台中单号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="engineePoint"
            label="工程点">
          </el-table-column>
          <el-table-column
            align="center"
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="任务类型">
          </el-table-column>
          <el-table-column
            align="center"
            prop="content"
            label="任务内容">
          </el-table-column>
          <el-table-column
            align="center"
            prop="beginTime"
            label="开始时间"
            sortable>
          </el-table-column>
          <el-table-column
            align="center"
            prop="endTime"
            label="结束时间"
            sortable>
          </el-table-column>
          <el-table-column
            align="center"
            prop="workLoad"
            sortable
            label="实际工作量">
          </el-table-column>
          <el-table-column
            align="center"
            prop="remarks"
            label="备注">
          </el-table-column>
          <el-table-column
            align="center"
            prop="group"
            label="组别">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="Edit(scope.row)">编辑</el-button>
              <el-button @click="Delete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="content-bottom">
      <div class="content-bottom-page">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total,prev, pager, next, jumper"
          :total=this.total
          :page-size="10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

  import {getAll, getAllByPage, timeTransfer} from "../../../common/js/getter";

    export default {
        name: "",

        data(){
          return{
            total:0,
            // pagesize:10,
            // currentPage:1,
            search:{
              beginTime:'',
              endTime:'',
              developer:'',
              engineePoint:'',
              group:'',
            },
            engineePointOptions:[{
              value: '统一版本',
              label: '统一版本'
            }, {
              value: '天翼云',
              label: '天翼云'
            }, {
              value: '海南',
              label: '海南'
            },{
              value: '国邮',
              label: '国邮'
            },{
              value: 'UMS',
              label: 'UMS'
            }],
            options: [
              {
                value: "平台监控组前台",
                label: "平台监控组前台",
              },
              {
                value: "平台监控组后台",
                label: "平台监控组后台",
              },
              {
                value: "智能引擎组",
                label: "智能引擎组",
              },
              {
                value: "测试组",
                label: "测试组",
              },
              {
                value: "产品组",
                label: "产品组",
              },
              {
                value: "业务监控组",
                label: "业务监控组",
              }
            ],
            tableData: []
          }
        },
      methods:{

        getAll(){
          getAll().then(res=>{
            console.log(res.data)
            this.tableData = res.data
          })
        },
        add(){
          this.$router.push("/form")
        },
        Edit(row){
          console.log(row)
          // window.localStorage.setItem('currentRow',JSON.stringify(row))
          this.$router.push({
              path:'/form',
              query:{
                currentRow:row
              }
            }
          )
        },
        Search(){
          console.log(this.search)
          this.search.beginTime = timeTransfer(this.search.beginTime)
          this.search.endTime = timeTransfer(this.search.endTime)

          // search(this.search).then(res=>{
          //   this.tableData = res.data
          // })
          this.$axios.post('/search',this.search).then(res=>{
            console.log(res.data.data)
            this.tableData = res.data.data
          })
        },
        Delete(row){
          this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.delete("/deleteById/"+row.id).then(res=>{
              this.tableData = res.data.data
              this.total = res.data.length()
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //=============分页===================
        PageAxios(pageNo){
          // this.$axios.get("/getAllByPage/"+page).then(res =>{
          //   console.log(res.data.data.data.list)
          //   this.tableData = res.data.rows
          // })
          getAllByPage(pageNo).then(res=>{
            console.log(res.data.list)
            this.tableData = res.data.list
            this.total = res.data.total
          })
        },
        handleCurrentChange: function (currentPage) {
          this.PageAxios(currentPage)
        },
        //=============分页===================
      },
      created() {
        // this.getAll()
        // window.localStorage.removeItem('currentRow')
        this.PageAxios(1)
      }
    }
</script>

<style lang="scss" scoped>
  /*.el-table th{*/
  /*  background-color: red;*/
  /*}*/
  .content {
    width: 100%;
    background: white;
    .content-top {

      padding-top: 15px;
    }
    .content-main {
      .content-main-top {
        width: 100%;
        display: flex;
        height: 56px;
        line-height: 56px;
        background: #e0e0e0;
        .content-main-top-starttime {
          margin: 0 10px 0 20px;
          span {
            margin-right: 10px;
          }
        }
        .content-main-top-endtime {
          margin: 0 10px;
          span {
            margin-right: 10px;
          }
        }
        .content-main-top-type-title{
          margin-right: 10px;
        }
        .content-main-top-type {
          margin: 0 10px;
        }
        .content-main-top-btn {
          margin: 0 10px;
        }
      }
      .content-main-table{
        width: 100%;
        margin-top: 0px;
      }
    }
  }
  // ::v-deep .el-input--suffix .el-input__inner{
  //     padding-right: 0;
  // }
  ::v-deep .el-select {
    width: 100%;
  }
  ::v-deep .el-form-item__content {
    width: 260px;
  }
  .content-bottom{
    margin-top: 15px;
    width: 100%;
    height: 40px;
    background: #e0e0e0;
    .content-bottom-page{
      float: left;
      margin-top: 5px;
    }
  }

</style>
