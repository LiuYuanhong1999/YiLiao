<template>
  <div  id="xl">
    <!--表头结束-->
    <!--table开始-->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门诊管理</el-breadcrumb-item>
      <el-breadcrumb-item>诊疗卡管理</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
      <!--表头-->
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入诊疗卡号" v-model="eaaOrderNumber"  ></el-input>
        </el-col>

        <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
        <!--打印导入导出-->
        <el-button type="primary" @click="dialogVisible = true">增加</el-button>
      </el-row>
      <el-table

          stripe
          style="width: 100%"
          :data="medicalCardTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      >
        <el-table-column
            prop="medicalCard.medicalCardNumber"
            label="诊疗卡号">
          <template #default="scope">
            <router-link :to="{path: '/MedicalCardDetails',query:{key:scope.row.medicalCardId,value:JSON.stringify(scope.row)}}">
              {{scope.row.medicalCard.medicalCardNumber}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="patientDataName"
            label="卡号所属人">
        </el-table-column>
        <el-table-column
            prop="medicalCard.medicalCardBalance"
            label="余额">
        </el-table-column>
        <el-table-column
            prop="medicalCard.medicalCardLock"
            label="状态">
          <template #default="scope">
            <template v-if="scope.row.medicalCard.medicalCardLock =='0'">
              解锁
            </template>
            <template v-if="scope.row.medicalCard.medicalCardLock =='1'">
              锁定
            </template>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="180px">
          <template  #default="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button
                  icon="el-icon-edit" size="mini"
                  @click="editTherapy(scope.row)"></el-button>
            </el-tooltip>

            <el-tooltip content="充值" placement="top">
              <el-button
                  icon="el-icon-circle-plus-outline" size="mini"
                  @click="editTherapy2(scope.row)"></el-button>
            </el-tooltip>

            <el-tooltip content="删除" placement="top">
              <el-button
                  icon="el-icon-delete" size="mini"
                  @click="deleteEmp(scope.row.eId)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <!--分页-->
      <div class="fy_div">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="medicalCardTableData.length">
        </el-pagination>
      </div>

    </el-card>
    <el-dialog
        title="新增诊疗卡"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form :model="patientData" status-icon  ref="patientData" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="诊疗卡号" prop="medicalCardNumber">
              <el-input v-model="patientData.medicalCard.medicalCardNumber" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="状态" prop="medicalCardLock">
              <el-select v-model="patientData.medicalCard.medicalCardLock" placeholder="请选择" value-key="medicalCardId">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码" prop="medicalCardPassword">
              <el-input v-model="patientData.medicalCard.medicalCardPassword" show-password></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="病人姓名" prop="patientDataName">
              <el-input v-model="patientData.patientDataName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号码" prop="patientDataCard">
              <el-input v-model="patientData.patientDataCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="病人电话" prop="patientDataPhone">
              <el-input v-model="patientData.patientDataPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="病人性别" prop="patientDataSex">
              <el-select v-model="patientData.patientDataSex" placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <template #footer>
    <span class="dialog-footer">
      <el-button @click="ClearFrom">取 消</el-button>
      <el-button type="primary" @click="saveTherapy">确 定</el-button>
    </span>
      </template>
    </el-dialog>

    <el-dialog
        title="充值"
        v-model="dialogVisible2"
        width="60%"
        :before-close="handleClose">
      <el-form :model="medicalCardRecord" status-icon  ref="medicalCardRecord" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="诊疗卡号" prop="medicalCardNumber">
              <el-input v-model="medicalCardRecord.medicalCardNumber" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
              <el-col :span="10">
                <el-form-item label="充值金额" prop="medicalCardMoney">
                  <el-input-number v-model="medicalCardRecord.medicalCardMoney"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="经办人" prop="medicalCardPerson">
                  <el-input v-model="medicalCardRecord.medicalCardPerson"></el-input>
                </el-form-item>
              </el-col>
        </el-row>
      </el-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="ClearFrom2">取 消</el-button>
      <el-button type="primary" @click="addMedicalCardRecord">确 定</el-button>
    </span>
      </template>
    </el-dialog>


  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "therapyManager",
  components: {},

  data() {
    return {
      value1:'',
      medicalCardTableData:[],
      dialogVisible: false,
      dialogVisible2:false,
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据

      //病人及诊疗卡号
      patientData:{
        patientDataId:'',
        patientDataCard:'',
        patientDataName:'',
        patientDataPhone:'',
        patientDataSex:'',
        medicalCardNumber:'',
        medicalCard:{
          medicalCardId:'',
          medicalCardNumber:'',
          medicalCardPassword:'',
          medicalCardBalance:'',
          medicalCardLock:'',
          nmsl:'',
          medicalCardRecord: []
        }
      },
      medicalCardRecord: {
          medicalCardRecordId:'',
          medicalCardNumber:'',
          medicalCardPerson:'',
          medicalCardMoney:'',
        },
      options:[{
        value:'1',
        label:'锁定'
      },{
        value:'0',
        label:'解锁'
      }],
      options2: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      value: '',
      activeName: 'second'
    }
  },
  methods:{
    initData(){
      this.axios.get("http://localhost:8088/medicalCard")
          .then((v) => {
            this.medicalCardTableData = v.data;
            this.patientData.medicalCard.medicalCardNumber= 'ZL'+ this.getProjectNum()+ Math.floor(Math.random() * 10000);
          })
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    saveTherapy(){
      this.axios.post("http://localhost:8088/saveMedicalCard",this.patientData)
          .then((v) => {
            this.dialogVisible=false;
            this.$message('操作成功！');
            this.initData(this.currentPage, this.pageSize);
          })
    },
    editTherapy(row){
      this.patientData = Object.assign({}, row)
      this.dialogVisible=true;
    },
    ClearFrom(){
      this.$refs['patientData'].resetFields()
      this.patientData = this.$options.data().patientData
      this.dialogVisible=false;
    },


    addMedicalCardRecord(){
      this.axios.post("http://localhost:8088/add-record",this.medicalCardRecord)
          .then((v) => {
        this.dialogVisible2=false;
        this.$message('操作成功！');
        this.initData(this.currentPage, this.pageSize);
      })
    },
    editTherapy2(row){
      this.medicalCardRecord = Object.assign({}, row)
      this.medicalCardRecord.medicalCardNumber = row.medicalCard.medicalCardNumber
      this.dialogVisible2=true;
    },
    ClearFrom2(){
      this.$refs['medicalCardRecord'].resetFields()
      this.medicalCardRecord = this.$options.data().medicalCardRecord
      this.dialogVisible2=false;
    },

    deleteEmp(id){
      this.$confirm('你确定要删除该条信息吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'},
          this.axios.post("http://localhost:8088/del-emp",qs.stringify({eId: id
          })))
          .then((v) => {
            this.$message('删除成功！');
            this.initData();
          })
    },

    pageChange(p) {
      this.initData(p, this.pageSize)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取当前日期的方法
    getProjectNum () {
      const projectTime = new Date() // 当前中国标准时间
      const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
      const Month = projectTime.getMonth() + 1 // 获取中国区月份
      const Day = projectTime.getDate() // 获取几号
      var CurrentDate = Year
      if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
        CurrentDate += Month
      } else {
        CurrentDate += '0' + Month
      }
      if (Day >= 10) {
        CurrentDate += Day
      } else {
        CurrentDate += '0' + Day
      }
      return CurrentDate
    },
  },
  created() {
    this.initData();

  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}

.el-card{
  margin-top: 50px;

}
.block{
  margin-left: 350px;
}
.fy_div{
  margin-top:20px;
  margin-left: 450px;
}
</style>