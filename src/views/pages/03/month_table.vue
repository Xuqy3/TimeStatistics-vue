<template>
  <div class="content">
    <div class="content-main">
      <div class="content-main-top">
        <excel-export :bookType="bookType" :filename="filename" :sheet="sheet" :on-error="onError">
          <div class="export-btn">导出</div>
        </excel-export>
      </div>
      <div class="content-main-table">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              align="center"
              fixed
              prop="开发人员"
              label="开发人员"
              width="120">
          </el-table-column>
          <el-table-column
              align="center"
              prop="month"
              label="月份">
          </el-table-column>
          <el-table-column
              align="center"
              prop="统一版本"
              label="统一版本"
              width="auto">
          </el-table-column>
          <el-table-column
              align="center"
              prop="PTO"
              label="PTO"
              width="auto">
          </el-table-column>
          <el-table-column label="集团区" align="center">
            <el-table-column
                align="center"
                prop="集团ITSM"
                label="集团ITSM">
            </el-table-column>
            <el-table-column
                align="center"
                prop="集团CRM"
                label="集团CRM">
            </el-table-column>
            <el-table-column
                align="center"
                prop="集团计费"
                label="集团计费">
            </el-table-column>
            <el-table-column
                align="center"
                prop="集团云公司"
                label="集团云公司">
            </el-table-column>
            <el-table-column
                align="center"
                prop="集团OTMS"
                label="集团OTMS">
            </el-table-column>
          </el-table-column>
          <el-table-column label="中东区" align="center">
            <el-table-column
                align="center"
                prop="安徽"
                label="安徽">
            </el-table-column>
            <el-table-column
                align="center"
                prop="河南"
                label="河南">
            </el-table-column>
            <el-table-column
                align="center"
                prop="浙江"
                label="浙江">
            </el-table-column>
            <el-table-column
                align="center"
                prop="江苏"
                label="江苏">
            </el-table-column>
            <el-table-column
                align="center"
                prop="湖北"
                label="湖北">
            </el-table-column>
            <el-table-column
                align="center"
                prop="黑龙江"
                label="黑龙江">
            </el-table-column>
            <el-table-column
                align="center"
                prop="辽宁"
                label="辽宁">
            </el-table-column>
          </el-table-column>
          <el-table-column label="西北区" align="center">
            <el-table-column
                align="center"
                prop="陕西"
                label="陕西">
            </el-table-column>
            <el-table-column
                align="center"
                prop="青海"
                label="青海">
            </el-table-column>
            <el-table-column
                align="center"
                prop="宁夏"
                label="宁夏">
            </el-table-column>
            <el-table-column
                align="center"
                prop="甘肃"
                label="甘肃">
            </el-table-column>
            <el-table-column
                align="center"
                prop="新疆"
                label="新疆">
            </el-table-column>
          </el-table-column>
          <el-table-column label="西南区" align="center">
            <el-table-column
                align="center"
                prop="四川"
                label="四川">
            </el-table-column>
            <el-table-column
                align="center"
                prop="广东"
                label="广东">
            </el-table-column>
            <el-table-column
                align="center"
                prop="广西"
                label="广西">
            </el-table-column>
            <el-table-column
                align="center"
                prop="香港"
                label="香港">
            </el-table-column>
            <el-table-column
                align="center"
                prop="海南"
                label="海南">
            </el-table-column>
          </el-table-column>
          <el-table-column label="福建专项" align="center">
            <el-table-column
                align="center"
                prop="福建"
                label="福建">
            </el-table-column>
            <el-table-column
                align="center"
                prop="江西"
                label="江西">
            </el-table-column>
          </el-table-column>
          <el-table-column label="行业外" align="center">
            <el-table-column
                align="center"
                prop="宁德"
                label="宁德">
            </el-table-column>
            <el-table-column
                align="center"
                prop="集成公司"
                label="集成公司">
            </el-table-column>
            <el-table-column
                align="center"
                prop="数字福建dfcc"
                label="数字福建dfcc">
            </el-table-column>
            <el-table-column
                align="center"
                prop="黑龙江纪委"
                label="黑龙江纪委">
            </el-table-column>
            <el-table-column
                align="center"
                prop="深圳容灾"
                label="深圳容灾">
            </el-table-column>
          </el-table-column>
          <el-table-column label="其它" align="center">
            <el-table-column
                align="center"
                prop="OTSM"
                label="OTSM">
            </el-table-column>
            <el-table-column
                align="center"
                prop="天翼云"
                label="天翼云">
            </el-table-column>
            <el-table-column
                align="center"
                prop="云资源"
                label="云资源">
            </el-table-column>
            <el-table-column
                align="center"
                prop="UMS"
                label="UMS">
            </el-table-column>
            <el-table-column
                align="center"
                prop="国邮"
                label="国邮">
            </el-table-column>
            <el-table-column
                align="center"
                prop="比翼平台"
                label="比翼平台">
            </el-table-column>
            <el-table-column
                align="center"
                prop="物联网"
                label="物联网">
            </el-table-column>
            <el-table-column
                align="center"
                prop="巨纵"
                label="巨纵">
            </el-table-column>
            <el-table-column
                align="center"
                prop="要客部G003&A2"
                label="要客部G003&A2">
            </el-table-column>
            <el-table-column
                align="center"
                prop="网资平台"
                label="网资平台">
            </el-table-column>
            <el-table-column
                align="center"
                prop="A2"
                label="A2">
            </el-table-column>
            <el-table-column
                align="center"
                prop="东方通"
                label="东方通">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

import {getAll, getAllByPage, getWorkload, search, timeTransfer} from "../../../common/js/getter";
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
            tableData: [{
              '开发人员':' ',
              '月份':' ',
              'PTO':' ',
              '集团ITSM':' ',
              '集团CRM':' ',
              '集团计费':' ',
              '集团云公司':' ',
              '集团OTMS':' ',
              '安徽':' ',
              '河南':' ',
              '浙江':' ',
              '江苏':' ',
              '湖北':' ',
              '黑龙江':' ',
              '辽宁':' ',
              '陕西':' ',
              '青海':' ',
              '宁夏':' ',
              '甘肃':' ',
              '新疆':' ',
              '四川':' ',
              '广东':' ',
              '广西':' ',
              '香港':' ',
              '海南':' ',
              '福建':' ',
              '江西':' ',
              '宁德':' ',
              '集成公司':' ',
              '数字福建dfcc':' ',
              '黑龙江纪委':' ',
              '深圳容灾':' ',
              'OTSM':' ',
              '天翼云':' ',
              '云资源':' ',
              'UMS':' ',
              '国邮':' ',
              '比翼平台':' ',
              '物联网':' ',
              '巨纵':' ',
              '要客部G003&A2':' ',
              '网资平台':' ',
              'A2':' ',
              '东方通':' ',
            }
            ],
          }
        },
      methods:{
        /**
         * @name: 导出错误
         * @param {String} err/错误信息
         * @return:
         */
        onError (err) {
          console.log(err)
        },

        getAll(){

        },
        tableGet(){

        },
        //获得工作量
        getWorkload(){
          getWorkload().then(result => {
            console.log(result.data)
            this.tableData = result.data
          })
        },
        //=============分页===================
        PageAxios(pageNo){
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
        this.getWorkload()
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
        //margin-left: 15px;
        width: 100%;
        display: flex;
        height: 56px;
        line-height: 56px;
        background: #e0e0e0;
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

  .export-btn {
    float: right;
    margin-left: 15px;
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
