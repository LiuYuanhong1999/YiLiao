<template>
  <div  id="xl">
    <!--表头结束-->
    <!--table开始-->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>手术管理</el-breadcrumb-item>
      <el-breadcrumb-item>手术安排</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
      <!--表头-->
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入审批单号" v-model="eaaOrderNumber"  ></el-input>
        </el-col>

        <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
        <!--打印导入导出-->
        <el-button type="primary" @click="dialogVisible = true">增加</el-button>
<!--        <el-button type="primary" @click="dialogVisible = true">手术用品</el-button>-->
      </el-row>
      <el-table

          stripe
          style="width: 100%"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      >
        <el-table-column
            prop="surgeryArrangeNumber"
            label="手术安排号">
        </el-table-column>
        <el-table-column
            prop="surgeryFor.prescription.registration.patient.patientDataName"
            label="病人姓名">
        </el-table-column>
        <el-table-column
            prop="surgeryArrangeName"
            label="手术安排名称">
        </el-table-column>
        <el-table-column
            prop="operatingRoom.operatingRoomName"
            label="手术室">
        </el-table-column>
        <el-table-column
            prop="surgeryArrangeTime"
            :formatter="dateformat"
            label="手术安排时间">
        </el-table-column>
        <el-table-column
            prop="surgeryArrangeDoctor"
            label="主刀医生">
        </el-table-column>
        <el-table-column
            prop="surgeryArrangeNurse"
            label="负责护士">
        </el-table-column>
        <el-table-column  label="操作" width="130px">
          <template  #default="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button
                  icon="el-icon-edit" size="mini"
                  @click="editSurgeryArrange(scope.row)"></el-button>
            </el-tooltip>

            <el-tooltip content="安排完成" placement="top">
              <el-button
                  icon="el-icon-delete" size="mini"
                  @click="updateSurgeryArrangeStaff(scope.row.surgeryArrangeNumber)"></el-button>
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
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
      </div>

    </el-card>
    <el-dialog
        title="新增手术安排"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form :model="surgeryArrange" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="手术安排号" prop="eName">
              <el-input v-model="surgeryArrange.surgeryArrangeNumber" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="安排日期" prop="eSex">
              <el-date-picker
                  v-model="surgeryArrange.surgeryArrangeTime"
                  type="datetime"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手术类型" prop="eName">
              <el-select v-model="surgeryArrange.surgeryArrangeType" placeholder="请选择">
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
            <el-form-item label="手术室" prop="eName">
              <el-select v-model="surgeryArrange.operatingRoom.operatingRoomId" placeholder="请选择">
                <el-option
                    v-for="item in selectOperatingRoomTableData"
                    :key="item.operatingRoomId"
                    :label="item.operatingRoomName"
                    :value="item.operatingRoomId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手术申请号" prop="eName">
              <el-select v-model="surgeryArrange.surgeryFor.surgeryForNumber" placeholder="请选择">
                <el-option
                    v-for="item in selectSurgeryForTableData"
                    :key="item.surgeryForNumber"
                    :label="item.surgeryForNumber"
                    :value="item.surgeryForNumber">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
<!--          <el-col :span="10">-->
<!--            <el-form-item label="科室" prop="eName">-->
<!--              <el-select v-model="value" placeholder="请选择">-->
<!--                <el-option-->
<!--                    v-for="item in selectDeskTableData"-->
<!--                    :key="item.deskId"-->
<!--                    :label="item.deskName"-->
<!--                    :value="item.deskId">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="10">
            <el-form-item label="病人姓名" prop="eName">
              <el-input v-model="surgeryArrange.surgeryFor.prescription.registration.patient.patientDataName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="主刀医生" prop="eName">
              <el-input v-model="surgeryArrange.surgeryArrangeDoctor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="总金额" prop="eName">
              <el-input v-model="surgeryArrange.surgeryFor.prescription.prescriptionMoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收费项目" name="first">
              <el-table
                  :data="tableData"
                  style="width: 100%">
                <el-table-column
                    prop="date"
                    label="项目编号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="项目名称">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="项目类型">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="单位">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="单价">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="金额">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-form>

      <template #footer>
    <span class="dialog-footer">
      <el-button @click="closeSurgeryArrange">取 消</el-button>
      <el-button type="primary" @click="saveSurgeryArrange">确 定</el-button>
    </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import qs from "qs";
import moment from "moment";
export default {
  name: "surgeryArrangeManager",
  components: {},


  data() {
    return {
      tableData:[],
      selectOperatingRoomTableData:[],
      selectSurgeryForTableData:[],
      selectDeskTableData:[],
      dialogVisible: false,
      currentPage:1, //初始页
      pageSize:10,    //    每页的数据
      surgeryArrange:{
        surgeryArrangeId:'',
        surgeryArrangeTime:'',
        surgeryArrangeNumber:'',
        surgeryArrangeName:'',
        surgeryForNumber:'',
        surgeryArrangeDoctor:'',
        operatingRoomId:'',
        surgeryArrangeNurse:'',
        surgeryArrangeType:'',
        surgeryFor:{
          surgeryForId:'',
          surgeryForName:'',
          surgeryForNumber:'',
          prescription:{
            prescriptionId:'',
            prescriptionMoney:'',
            registration:{
              registrationNumber:'',
              patient:{
                patientDataName:'',
              },
              desk:{
                deskId:'',
                deskName:'',
              }
            }
          }
        },
        operatingRoom:{
          operatingRoomId:'',
          operatingRoomName:'',
          operatingRoomType:'',
          operatingRoomTypeId:'',
          deskId:'',
          operatingRoomPlace:'',
          operatingRoomCharge:'',
          operatingRoomMaintain:'',
          operatingRoomEmploy:''
        }
      },
      options: [{
        value: '择期手术',
        label: '择期手术'
      }, {
        value: '限期手术',
        label: '限期手术'
      }, {
        value: '急诊手术',
        label: '急诊手术'
      }],
      value:'',
      activeName: 'first',
    }
  },
  methods:{
    dateformat(row , column){
      const data = row[column.property]
      if (data == undefined){
        return
      }
      return moment(data).format("yyyy-MM-ss HH:mm:ss")
    },
    initData(){
      this.axios.get("http://localhost:8088/find_surgery_arrange")
          .then((v) => {
            this.surgeryArrange.surgeryArrangeNumber = 'SSAP'+ this.getProjectNum()+ Math.floor(Math.random() * 10000);
            this.tableData = v.data;
          })
    },
    selectOperating(){
          this.axios.get("http://localhost:8088/select_operating_room").then((v)=>{
            this.selectOperatingRoomTableData = v.data
          })
        },
    selectSurgeryFor(){
      this.axios.get("http://localhost:8088/select_surgery_for").then((v)=>{
        this.selectSurgeryForTableData = v.data
      })
    },
    selectDesk(){
      this.axios.get("http://localhost:8088/select_desk").then((v)=>{
        this.selectDeskTableData = v.data
      })
    },
    saveSurgeryArrange(){
      this.axios.post("http://localhost:8088/save_surgery_arrange",this.surgeryArrange)
          .then((v) => {
            this.dialogVisible=false;
            this.$message('操作成功！');
            this.initData(this.currentPage, this.pageSize);

          })
    },
    updateSurgeryArrangeStaff(surgeryArrangeNumber){
      this.axios.get("http://localhost:8088/update_surgery_arrange_staff",{params:{surgeryArrangeNumber:surgeryArrangeNumber}})
          .then((v) => {
            this.$message('操作成功！');
            this.initData(this.currentPage, this.pageSize);

          })
    },
    editSurgeryArrange(row){
      this.dialogVisible=true;
      this.surgeryArrange = Object.assign({}, row)
    },
    closeSurgeryArrange(){
      this.$refs['ruleForm'].resetFields()
      this.surgeryArrange = this.$options.data().surgeryArrange
      this.dialogVisible=false;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
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
    this.selectOperating();
    this.selectSurgeryFor();
    this.selectDesk();
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