<template>
  <div class="ruleForm">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="开发人员" prop="developer">
        <el-input v-model="ruleForm.developer"></el-input>
      </el-form-item>
      <el-form-item label="中单号" prop="servNo">
        <el-input v-model="ruleForm.servNo"></el-input>
      </el-form-item>
<!--      <el-form-item label="工程点" prop="engineePoint">-->
<!--        <el-select-->
<!--          v-model="ruleForm.engineePoint"-->
<!--          filterable-->
<!--          allow-create-->
<!--          default-first-option-->
<!--          placeholder="请选择工程点">-->
<!--          <el-option-->
<!--            v-for="item in options5"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="工程点" prop="engineePoint">
        <el-cascader
            v-model="ruleForm.engineePoint"
            placeholder="搜索"
            :options="options5"
            filterable
            >
        </el-cascader>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="按时完成" value="按时完成"></el-option>
          <el-option label="超时完成" value="超时完成"></el-option>
          <el-option label="进行中" value="进行中"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型">
          <el-option label="统一版本" value="统一版本"></el-option>
          <el-option label="现地开发" value="现地开发"></el-option>
          <el-option label="测试" value="测试"></el-option>
          <el-option label="问题协查" value="问题协查"></el-option>
          <el-option label="共通事项" value="共通事项"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务内容" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="项目时间" required>
        <el-col :span="11">
          <el-form-item prop="beginTime">
            <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.beginTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">------</el-col>
        <el-col :span="11">
          <el-form-item prop="endTime">
            <el-date-picker type="date" placeholder="结束时间" v-model="ruleForm.endTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item
          label="工作量(人)"
          prop="workLoad"
          type="number"
          :rules="[
        { required: true, message: '工作量不能为空'},
        { type: 'number', message: '工作量必须为数字值'}
      ]">
        <el-input v-model.number="ruleForm.workLoad" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item label="组别" prop="group">
        <el-select v-model="ruleForm.group" placeholder="请选择组别">
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
      <el-form-item>
        <el-button v-if="this.$route.query.currentRow==null" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button v-if="this.$route.query.currentRow!=null" type="primary" @click="updateForm('ruleForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import {timeTransfer} from "../../../common/js/getter";

  export default {
    data() {
      return {

        ruleForm: {
          beginTime:'',
          endTime:'',
          developer: '',
          servNo: ' ',
          engineePoint:[],
          title: '',
          status: '',
          type: '',
          content: '',
          workLoad: '',
          remarks:' ',
          group:''
        },
        options5: [
          {
            value:'统一版本',
            label: '统一版本'
          },{
            value:'PTO',
            label: 'PTO'
          },{
          value: '集团区',
          label: '集团区',
          children: [{
            value: '集团ITSM',
            label: '集团ITSM'
          }, {
            value: '集团CRM',
            label: '集团CRM'
          }, {
            value: '集团计费',
            label: '集团计费'
          },{
            value: '集团云公司',
            label: '集团云公司'
          },{
            value: '集团OTMS',
            label: '集团OTMS'
          }],
        },
            {
          value: '中东区',
          label: '中东区',
          children: [{
            value: '安徽',
            label: '安徽',
          },{
            value: '河南',
            label: '河南',
          },{
            value: '浙江',
            label: '浙江',
          },,{
            value: '江苏',
            label: '江苏',
          },,{
            value: '湖北',
            label: '湖北',
          },,{
            value: '黑龙江',
            label: '黑龙江',
          },{
            value: '辽宁',
            label: '辽宁',
          }]
        },
            {
         value: '西北区',
         label: '西北区',
         children: [{
           value: '陕西',
           label: '陕西'
         },{
           value: '青海',
           label: '青海'
         },{
           value: '宁夏',
           label: '宁夏'
         },{
           value: '甘肃',
           label: '甘肃'
         },{
           value: '新疆',
           label: '新疆'
         }]
        },
            {
            value: '西南区',
            label: '西南区',
            children: [{
              value: '四川',
              label: '四川'
            },{
              value: '广东',
              label: '广东'
            },{
              value: '广西',
              label: '广西'
            },{
              value: '香港',
              label: '香港'
            },{
              value: '海南',
              label: '海南'
            }]
          },
            {
            value: '福建专项',
            label: '福建专项',
            children: [{
              value: '福建',
              label: '福建'
            },{
              value: '江西',
              label: '江西'
            }]
          },
            {
            value: '行业外',
            label: '行业外',
            children: [{
              value: '宁德',
              label: '宁德'
            },{
              value: '集成公司',
              label: '集成公司'
            },{
              value: '数字福建dfcc',
              label: '数字福建dfcc'
            },{
              value: '黑龙江纪委',
              label: '黑龙江纪委'
            },{
              value: '深圳容灾',
              label: '深圳容灾'
            }]
          },
          {
            value:'OTSM',
            label:'OTSM'
          },{
            value:'天翼云',
            label:'天翼云'
          },{
            value:'云资源',
            label:'云资源'
          },{
            value:'UMS',
            label:'UMS'
          },{
            value:'国邮',
            label:'国邮'
          },{
            value:'比翼平台',
            label:'比翼平台'
          },{
            value:'物联网',
            label:'物联网'
          },{
            value:'巨纵',
            label:'巨纵'
          },{
            value:'要客部G003&A2',
            label:'要客部G003&A2'
          },{
            value:'网资平台',
            label:'网资平台'
          },{
            value:'A2',
            label:'A2'
          },{
            value:'东方通',
            label:'东方通'
          },

          ],
        rules: {
          developer: [
            { required: true, message: '请输入开发人员的姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          engineePoint: [
            { required: true, message: '请选择工程点'}
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ],
          group: [
            { required: true, message: '请选择组别', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请填写标题', trigger: 'blur' }
          ],
          beginTime: [
            { type:'date', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          endTime: [
            { type:'date', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写任务内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.ruleForm.beginTime = timeTransfer(this.ruleForm.beginTime)
            // this.ruleForm.endTime = timeTransfer(this.ruleForm.endTime)
            this.ruleForm.engineePoint = this.ruleForm.engineePoint[1]
            // console.log(this.ruleForm.engineePoint[1])
            console.log(this.ruleForm)
            this.$axios.post("/insert",this.ruleForm)

            this.insertSuccess()
            console.log("新增成功")
            // window.localStorage.removeItem('currentRow')
            this.$router.push('/table')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      updateSuccess() {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      },
      insertSuccess() {
        this.$message({
          message: '创建成功',
          type: 'success'
        });
      },
      updateForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            this.ruleForm.beginTime = timeTransfer(this.ruleForm.beginTime)
            this.ruleForm.endTime = timeTransfer(this.ruleForm.endTime)
            this.$axios.put("/modifyById",this.ruleForm).then(res=>{
              console.log("修改成功")
              this.updateSuccess()
              // window.localStorage.removeItem('currentRow')
              this.$router.push('/table')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.ruleForm = this.$refs[formName].resetFields();
      },
    },
    created() {
      if (this.$route.query.currentRow){
        //把字符转为数字
        this.$route.query.currentRow.workLoad = parseInt(this.$route.query.currentRow.workLoad)
        //将字符类型转为时间戳，才能显示在时间选择器上并通过date类型的校验
        // this.$route.query.currentRow.beginTime = new Date(this.$route.query.currentRow.beginTime).getTime()
        // this.$route.query.currentRow.endTime = new Date(this.$route.query.currentRow.endTime).getTime()
        this.$route.query.currentRow.engineePoint = []
        // console.log(new Date(this.$route.query.currentRow.beginTime).getTime())
        this.ruleForm = this.$route.query.currentRow
      }
    }
  }
</script>
<style lang="scss">
.demo-ruleForm{
  width:600px;
  max-width: 100%;
}
</style>
