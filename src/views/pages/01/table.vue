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
          <el-button type="primary" @click="dialogFormVisible=true">导入</el-button>
          <!--          <el-button type="primary">新增</el-button>-->
        </div>
<!--        <excel-import :on-success="onSuccess">-->
<!--          <div class="import-btn">导入</div>-->
<!--        </excel-import>-->
        <!-- 点击导出 -->
        <excel-export :bookType="bookType" :filename="filename" :sheet="sheet" :on-error="onError">
<!--          <div class="export-btn" >导出</div>-->
          <div class="export-btn">导出</div>
        </excel-export>
        <el-dialog title="选择导入的小组" :visible.sync="dialogFormVisible" style="width: 50%;margin-left: 25%">
          <el-form :rules="rules">
            <el-form-item label="组别" label-width="120px" >
              <el-select v-model="importGroup" placeholder="选择导入的小组">
                <el-option label="平台监控组前台" value="平台监控组前台"></el-option>
                <el-option label="前端组" value="前端组"></el-option>
                <el-option label="平台监控组后台" value="平台监控组后台"></el-option>
                <el-option label="智能引擎组" value="智能引擎组"></el-option>
                <el-option label="测试组" value="测试组"></el-option>
                <el-option label="产品组" value="产品组"></el-option>
                <el-option label="业务监控组" value="业务监控组"></el-option>
                <el-option label="支撑组" value="支撑组"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <excel-import :on-success="onSuccess" style="float: right;margin-left: 2%;margin-right: 5%">
              <div class="chooseFile" style="width: 150%">选择文件</div>
            </excel-import>
          </div>
        </el-dialog>
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

import {getAll, getAllByPage, search, timeTransfer} from "../../../common/js/getter";
  import {ExcelImport,ExcelExport} from 'pikaz-excel-js'
    export default {
      components: {
        ExcelImport,
        ExcelExport,
      },
        name: "",

        data(){
          return{
            importGroup:'平台监控组前台',
            dialogFormVisible:false,
            total:0,
            json:'',

            bookType: 'xlsx',
            filename: '工时统计系统',
            //设计八张表以及每张表的样式
            sheet: [
              {
                // title: '插件信息',
                tHeader: ['No.', '开发人员', '需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)', '提出工程点或统一版本',
                '标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','状态(按时完成、超时完成、进行中……)','任务类型(统一版本、现地开发、测试、问题协查、共通事项……)',
                '任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','实际开始时间(日期)','实际结束时间(日期)','实际工作量(单位：人时)',
                '备注'],
                table: [{
                  id: '1',
                  developer: '许许许',
                  servNo: '',
                  engineePoint:'云管平台',
                  title:'apm es查询支持分片可配置',
                  status:'按时完成',
                  type:'统一版本',
                  content:'apm es查询支持分片可配置',
                  beginTime: '2020-12-23',
                  endTime: '2020-12-26',
                  workLoad: '1',
                  remarks: ''
                }],
                // table:this.tableData,
                keys: ['id', 'developer', 'servNo', 'engineePoint','title','status','type','content',
                  'beginTime','endTime','workLoad','remarks'],
                sheetName: '平台监控组前台',
                globalStyle: {
                    alignment: {
                      wrapText: true, //字体颜色 橙色
                    },

                },
                cellStyle: [
                  //定义每个单元格的格式
                  {
                    cell: 'A1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'B1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'C1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'D1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'E1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'F1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'G1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },{
                    cell: 'H1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'I1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'J1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'K1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'L1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  }
                ]
              },
              {
                // title: '插件信息',
                tHeader: ['No.', '开发人员', '需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)', '提出工程点或统一版本',
                  '标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','状态(按时完成、超时完成、进行中……)','任务类型(统一版本、现地开发、测试、问题协查、共通事项……)',
                  '任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','实际开始时间(日期)','实际结束时间(日期)','实际工作量(单位：人时)',
                  '备注'],
                table: [{
                  id: '1',
                  developer: '许许许',
                  servNo: '',
                  engineePoint:'云管平台',
                  title:'apm es查询支持分片可配置',
                  status:'按时完成',
                  type:'统一版本',
                  content:'apm es查询支持分片可配置',
                  beginTime: '2020-12-23',
                  endTime: '2020-12-26',
                  workLoad: '1',
                  remarks: ''
                }],
                // table:this.tableData,
                keys: ['id', 'developer', 'servNo', 'engineePoint','title','status','type','content',
                  'beginTime','endTime','workLoad','remarks'],
                sheetName: '前端组',
                globalStyle: {
                  alignment: {
                    wrapText: true, //字体颜色 橙色
                  },

                },
                cellStyle: [
                  //定义每个单元格的格式
                  {
                    cell: 'A1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'B1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'C1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'D1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'E1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'F1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'G1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },{
                    cell: 'H1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'I1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'J1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'K1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'L1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  }
                ]
              },
              {
                // title: '插件信息',
                tHeader: ['No.', '开发人员', '需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)', '提出工程点或统一版本',
                  '标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','状态(按时完成、超时完成、进行中……)','任务类型(统一版本、现地开发、测试、问题协查、共通事项……)',
                  '任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','实际开始时间(日期)','实际结束时间(日期)','实际工作量(单位：人时)',
                  '备注'],
                table: [{
                  id: '1',
                  developer: '许许许',
                  servNo: '',
                  engineePoint:'云管平台',
                  title:'apm es查询支持分片可配置',
                  status:'按时完成',
                  type:'统一版本',
                  content:'apm es查询支持分片可配置',
                  beginTime: '2020-12-23',
                  endTime: '2020-12-26',
                  workLoad: '1',
                  remarks: ''
                }],
                // table:this.tableData,
                keys: ['id', 'developer', 'servNo', 'engineePoint','title','status','type','content',
                  'beginTime','endTime','workLoad','remarks'],
                sheetName: '平台监控组后台',
                globalStyle: {
                  alignment: {
                    wrapText: true, //字体颜色 橙色
                  },

                },
                cellStyle: [
                  //定义每个单元格的格式
                  {
                    cell: 'A1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'B1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'C1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'D1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'E1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'F1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'G1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },{
                    cell: 'H1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'I1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'J1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'K1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'L1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  }
                ]
              },
              {
                // title: '插件信息',
                tHeader: ['No.', '开发人员', '需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)', '提出工程点或统一版本',
                  '标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','状态(按时完成、超时完成、进行中……)','任务类型(统一版本、现地开发、测试、问题协查、共通事项……)',
                  '任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','实际开始时间(日期)','实际结束时间(日期)','实际工作量(单位：人时)',
                  '备注'],
                table: [{
                  id: '1',
                  developer: '许许许',
                  servNo: '',
                  engineePoint:'云管平台',
                  title:'apm es查询支持分片可配置',
                  status:'按时完成',
                  type:'统一版本',
                  content:'apm es查询支持分片可配置',
                  beginTime: '2020-12-23',
                  endTime: '2020-12-26',
                  workLoad: '1',
                  remarks: ''
                }],
                // table:this.tableData,
                keys: ['id', 'developer', 'servNo', 'engineePoint','title','status','type','content',
                  'beginTime','endTime','workLoad','remarks'],
                sheetName: '智能引擎组',
                globalStyle: {
                  alignment: {
                    wrapText: true, //字体颜色 橙色
                  },

                },
                cellStyle: [
                  //定义每个单元格的格式
                  {
                    cell: 'A1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'B1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'C1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'D1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'E1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'F1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'G1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },{
                    cell: 'H1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'I1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'J1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'K1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'L1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  }
                ]
              },
              {
                // title: '插件信息',
                tHeader: ['No.', '开发人员', '需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)', '提出工程点或统一版本',
                  '标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','状态(按时完成、超时完成、进行中……)','任务类型(统一版本、现地开发、测试、问题协查、共通事项……)',
                  '任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','实际开始时间(日期)','实际结束时间(日期)','实际工作量(单位：人时)',
                  '备注'],
                table: [{
                  id: '1',
                  developer: '许许许',
                  servNo: '',
                  engineePoint:'云管平台',
                  title:'apm es查询支持分片可配置',
                  status:'按时完成',
                  type:'统一版本',
                  content:'apm es查询支持分片可配置',
                  beginTime: '2020-12-23',
                  endTime: '2020-12-26',
                  workLoad: '1',
                  remarks: ''
                }],
                // table:this.tableData,
                keys: ['id', 'developer', 'servNo', 'engineePoint','title','status','type','content',
                  'beginTime','endTime','workLoad','remarks'],
                sheetName: '测试组',
                globalStyle: {
                  alignment: {
                    wrapText: true, //字体颜色 橙色
                  },

                },
                cellStyle: [
                  //定义每个单元格的格式
                  {
                    cell: 'A1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'B1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'C1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'D1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'E1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'F1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'G1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },{
                    cell: 'H1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'I1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'J1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'K1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'L1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  }
                ]
              },
              {
                // title: '插件信息',
                tHeader: ['No.', '开发人员', '需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)', '提出工程点或统一版本',
                  '标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','状态(按时完成、超时完成、进行中……)','任务类型(统一版本、现地开发、测试、问题协查、共通事项……)',
                  '任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','实际开始时间(日期)','实际结束时间(日期)','实际工作量(单位：人时)',
                  '备注'],
                table: [{
                  id: '1',
                  developer: '许许许',
                  servNo: '',
                  engineePoint:'云管平台',
                  title:'apm es查询支持分片可配置',
                  status:'按时完成',
                  type:'统一版本',
                  content:'apm es查询支持分片可配置',
                  beginTime: '2020-12-23',
                  endTime: '2020-12-26',
                  workLoad: '1',
                  remarks: ''
                }],
                // table:this.tableData,
                keys: ['id', 'developer', 'servNo', 'engineePoint','title','status','type','content',
                  'beginTime','endTime','workLoad','remarks'],
                sheetName: '产品组',
                globalStyle: {
                  alignment: {
                    wrapText: true, //字体颜色 橙色
                  },

                },
                cellStyle: [
                  //定义每个单元格的格式
                  {
                    cell: 'A1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'B1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'C1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'D1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'E1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'F1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'G1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },{
                    cell: 'H1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'I1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'J1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'K1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'L1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  }
                ]
              },
              {
                // title: '插件信息',
                tHeader: ['No.', '开发人员', '需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)', '提出工程点或统一版本',
                  '标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','状态(按时完成、超时完成、进行中……)','任务类型(统一版本、现地开发、测试、问题协查、共通事项……)',
                  '任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','实际开始时间(日期)','实际结束时间(日期)','实际工作量(单位：人时)',
                  '备注'],
                table: [{
                  id: '1',
                  developer: '许许许',
                  servNo: '',
                  engineePoint:'云管平台',
                  title:'apm es查询支持分片可配置',
                  status:'按时完成',
                  type:'统一版本',
                  content:'apm es查询支持分片可配置',
                  beginTime: '2020-12-23',
                  endTime: '2020-12-26',
                  workLoad: '1',
                  remarks: ''
                }],
                // table:this.tableData,
                keys: ['id', 'developer', 'servNo', 'engineePoint','title','status','type','content',
                  'beginTime','endTime','workLoad','remarks'],
                sheetName: '业务监控组',
                globalStyle: {
                  alignment: {
                    wrapText: true, //字体颜色 橙色
                  },

                },
                cellStyle: [
                  //定义每个单元格的格式
                  {
                    cell: 'A1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'B1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'C1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'D1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'E1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'F1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'G1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },{
                    cell: 'H1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'I1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'J1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'K1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'L1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  }
                ]
              },
              {
                // title: '插件信息',
                tHeader: ['No.', '开发人员', '需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)', '提出工程点或统一版本',
                  '标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','状态(按时完成、超时完成、进行中……)','任务类型(统一版本、现地开发、测试、问题协查、共通事项……)',
                  '任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','实际开始时间(日期)','实际结束时间(日期)','实际工作量(单位：人时)',
                  '备注'],
                table: [{
                  id: '1',
                  developer: '许许许',
                  servNo: '',
                  engineePoint:'云管平台',
                  title:'apm es查询支持分片可配置',
                  status:'按时完成',
                  type:'统一版本',
                  content:'apm es查询支持分片可配置',
                  beginTime: '2020-12-23',
                  endTime: '2020-12-26',
                  workLoad: '1',
                  remarks: ''
                }],
                // table:this.tableData,
                keys: ['id', 'developer', 'servNo', 'engineePoint','title','status','type','content',
                  'beginTime','endTime','workLoad','remarks'],
                sheetName: '支撑组',
                globalStyle: {
                  alignment: {
                    wrapText: true, //字体颜色 橙色
                  },

                },
                cellStyle: [
                  //定义每个单元格的格式
                  {
                    cell: 'A1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'B1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'C1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'D1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'E1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'F1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'G1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },{
                    cell: 'H1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'I1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'J1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'K1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: false,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  },
                  {
                    cell: 'L1',
                    font: {
                      sz: 14,
                      color: { rgb: "000000" },//字体颜色 白色
                      bold: true,
                    },
                    fill: {
                      fgColor: { rgb: "FABF8F" },//背景颜色 橙色
                    }
                  }
                ]
              },
            ],
            toExport:[],
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
              },
              {
                value: "支撑组",
                label: "支撑组",
              }
            ],
            tableData: [],
            rules:{
              importGroup: [
                { required: true, message: '请选择组别', trigger: 'blur' }
              ],
            }
          }
        },
      methods:{
        /**
         * @name: 导入成功,excel产生的json的key都为中文，需要进行替换
         * @param {Array} response/生导入数据
         * @param {Object} file/导入文件
         * @return:
         */
        onSuccess (response, file) {
          this.dialogFormVisible = false
          console.log(response)
          this.json = response

          console.log(this.json)
          //给每个sheet中添加一个当前要导出的组别，以便在filter中引用这个属性
          for (var i=0;i<this.json.length;i++){
            this.json[i].importGroup = this.importGroup
          }
          console.log(this.json)
          var temp = this.json.filter(function (fp){
            console.log(fp.importGroup)
            return fp.sheetName === fp.importGroup

          })
          console.log(temp)
          this.json = temp[0].data
          for(var i = 0;i<this.json.length;i++){
            this.json[i].group = this.importGroup
            this.json[i] = JSON.parse(JSON.stringify(this.json[i])
                .replace('No.','id')
                .replace('开发人员','developer')
                .replace('需求单号|任务单号|事件单号|协查单号(部门流程平台中单号,确实没有单号可不填)','servNo')
                .replace('提出工程点或统一版本','engineePoint')
                .replace('标题(必填)(有单号与部门流程平台中一致；无单号请说明具体事项)','title')
                .replace('状态(按时完成、超时完成、进行中……)','status')
                .replace('任务类型(统一版本、现地开发、测试、问题协查、共通事项……)','type')
                .replace('任务内容(有单号与部门流程平台中一致；无单号请说明具体事项)','content')
                .replace('实际开始时间(日期)','beginTime')
                .replace('实际结束时间(日期)','endTime')
                .replace('实际工作量(单位：人时)','workLoad')
                .replace('备注','remarks'))
          }
          console.log(this.json)
          // this.tableData.group='平台监控组后台'
          this.tableData = this.json
        },
        /**
         * @name: 导出错误
         * @param {String} err/错误信息
         * @return:
         */
        onError (err) {
          console.log(err)
        },
        /**
         * @name: 手动导出
         * @param {type}
         * @return:
         */
        exportTable () {
          //==================可以=============
          // console.log(this.toExport)
          // this.sheet[0].table = this.toExport
          //==================可以=============
          // getAll().then(res=>{
          //   console.log(res.data)
          //   this.sheet[0].table = res.data
          // })
        },
        getAll(){
          getAll().then(res=>{
            console.log(res.data)
            // this.toExport = res.data
            // this.tableData = res.data
          })
        },
        tableGet(){
          search('平台监控组前台').then(res=>{
            this.sheet[0].table = res.data
          })
          search('前端组').then(res=>{
            this.sheet[1].table = res.data
          })
          search('平台监控组后台').then(res=>{
            this.sheet[2].table = res.data
          })
          search('智能引擎组').then(res=>{
            this.sheet[3].table = res.data
          })
          search('测试组').then(res=>{
            this.sheet[4].table = res.data
          })
          search('产品组').then(res=>{
            this.sheet[5].table = res.data
          })
          search('业务监控组').then(res=>{
            this.sheet[6].table = res.data
          })
          search('支撑组').then(res=>{
            this.sheet[7].table = res.data
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
            // this.sheet[0].table = res.data.list
            this.total = res.data.total
          })
        },
        handleCurrentChange: function (currentPage) {
          this.PageAxios(currentPage)
        },
        //=============分页===================
      },
      created() {
        this.tableGet()
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

  .export-demo {
    display: flex;
    justify-content: space-between;
  }
  .export-btn {
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 36px;
    background: #20A0FF;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
  }
  .import-btn {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 36px;
    background: #20A0FF;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
  }
  .chooseFile {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 36px;
    background: #20A0FF;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
  }

</style>
