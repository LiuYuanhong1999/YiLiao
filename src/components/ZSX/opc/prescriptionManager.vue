<template>
  <div id="xl">
    <!--表头结束-->
    <!--table开始-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>医生工作站</el-breadcrumb-item>
      <el-breadcrumb-item>门诊处方</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="width: 490px;height: 100%">
      <!--表头-->
      <el-row>
        <el-col :span="20">
          <el-input placeholder="病人"></el-input>
        </el-col>
        <el-table :data="RegistrationData" style="margin-top: 20px">
          <el-table-column
              prop="registrationNumber"
              label="门诊号"
              width="130px">
          </el-table-column>
          <el-table-column
              prop="patient.patientDataName"
              label="病人姓名">
          </el-table-column>
          <el-table-column
              prop="registrationType"
              label="门诊类别">
          </el-table-column>
          <el-table-column
              prop="registrationFee"
              label="门诊费用">
          </el-table-column>
          <el-table-column  label="操作">
            <template  #default="scope">
              <el-tooltip content="查看" placement="top">
                <el-button
                    icon="el-icon-view" size="mini"
                    @click="edit(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>


    <el-card style="width: 60%;height: 100%;margin-left: 500px;margin-top: -220px">
      <!--表头-->
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入处方单号" v-model="eaaOrderNumber"  ></el-input>
        </el-col>

        <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
        <!--打印导入导出-->
      </el-row>
      <el-table
          stripe
          style="width: 100%"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      >
        <el-table-column
            prop="prescriptionId"
            label="处方单号">
        </el-table-column>
        <el-table-column
            prop="registration.registrationNumber"
            label="门诊号">
        </el-table-column>
        <el-table-column
            prop="registration.patient.patientDataName"
            label="病人姓名">
        </el-table-column>
        <el-table-column
            prop="prescriptionTime"
            label="就诊日期">
        </el-table-column>
        <el-table-column
            prop="prescriptionMoney"
            label="处方金额">
        </el-table-column>
        <el-table-column  label="操作" width="130px">
          <template  #default="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button
                  icon="el-icon-edit" size="mini"
                  @click="editPrescription(scope.row)"></el-button>
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
            :total="tableData.length">
        </el-pagination>
      </div>
    </el-card>

<!--新增修改弹窗-->
    <el-dialog
        title="处方"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form :model="prescription" status-icon  ref="prescription" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="门诊号" prop="registrationNumber">
              <el-select v-model="prescription.registration.registrationNumber" disabled placeholder="请选择">
                <el-option
                    v-for="item in RegistrationData"
                    :key="item.registrationId"
                    :label="item.registrationNumber"
                    :value="item.registrationNumber">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="病人姓名" prop="patientDataName">
              <el-input v-model="prescription.registration.patient.patientDataName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="挂号id" prop="patientDataId">
              <el-input v-model="prescription.registration.registrationId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="注意事项" prop="prescriptionDetailsAttention">
              <el-input v-model="prescription.prescriptionDetails[0].prescriptionDetailsAttention"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="处方日期" prop="prescriptionTime">
              <el-date-picker
                  v-model="prescription.prescriptionTime"
                  type="datetime"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="处方金额" prop="prescriptionMoney">
              <el-input v-model="prescription.prescriptionMoney" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="说明" prop="prescriptionDetailsExplain">
              <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="prescription.prescriptionDetails[0].prescriptionDetailsExplain">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-form label-width="100px" style="width: 100%">
                <el-button @click="xzxm=true">选择项目</el-button><br><br>
                药品
                <el-table style="width: 100%" :data="checkBoxData">
                  <el-table-column
                      prop="drugName"
                      label="药品名称">
                  </el-table-column>
                  <el-table-column
                      label="数量">
                    <template  #default="scope">
                      <el-input onkeyup="value = value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="scope.row[prescription.prescriptionDetails.medicineCount]" @input="count(scope.$index,scope.row)"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="drugPrice"
                      label="单价">
                  </el-table-column>
                  <el-table-column
                      label="小计">
                    <template  #default="scope">
                      {{ scope.row[prescription.prescriptionDetails.medicineCount]==null?0 : scope.row[prescription.prescriptionDetails.medicineCount]*scope.row.drugPrice}}
                    </template>
                  </el-table-column>
                  <el-table-column
                      label="注意事项">
                    <template  #default="scope">
                      <el-input  ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column  label="操作">
                    <template  #default="scope">
                      <el-tooltip content="查看" placement="top">
                        <el-button
                            icon="el-icon-delete" size="mini"
                            @click="deleteyp(scope.$index)"></el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
              <br><br>
              项目
              <el-table
                  :data="checkBoxData2"
                  style="width: 100%">
                <el-table-column
                    prop="projectName"
                    label="项目名称">
                </el-table-column>
                <el-table-column
                    prop="projectPrice"
                    label="单价">
                </el-table-column>
                <el-table-column
                    label="注意事项">
                  <el-input></el-input>
                </el-table-column>
                <el-table-column  label="操作">
                  <template  #default="scope">
                    <el-tooltip content="查看" placement="top">
                      <el-button
                          icon="el-icon-delete" size="mini"
                          @click="deleteyp2(scope.$index)"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
        </el-row>
      </el-form>

      <template #footer>
    <span class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="savePrescription">确 定</el-button>
    </span>
      </template>
    </el-dialog>

<!--副弹出 主要显示药品和需要选择的项目-->
    <el-dialog
        title="选择项目"
        v-model="xzxm"
        width="40%"
        :before-close="handleClose">
      <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-tabs v-model="activeName">
            <el-tab-pane label="药品" name="first">
              <el-table
                  :data="DrugData"
                  style="width: 100%"
                  @selection-change="changeFun">
                <el-table-column
                    type="selection">
                </el-table-column>
                <el-table-column
                    prop="drugId"
                    label="药品编号">
                </el-table-column>
                <el-table-column
                    prop="drugName"
                    label="药品名称">
                </el-table-column>
                <el-table-column
                    prop="drugPrice"
                    label="药品价格"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="drugDate"
                    label="生产日期">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="手术项目" name="second">
              <el-table
                  :data="ProjectData"
                  style="width: 100%"
                  @selection-change="changeFun2">
                <el-table-column
                    type="selection">
                </el-table-column>
                <el-table-column
                    prop="projectId"
                    label="项目编号">
                </el-table-column>
                <el-table-column
                    prop="projectName"
                    label="项目名称">
                </el-table-column>
                <el-table-column
                    prop="projectPrice"
                    label="项目价格"
                    width="180">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="体检项目" name="third">
              <el-table
                  :data="ProjectData2"
                  style="width: 100%"
                  @selection-change="changeFun2"
              >
                <el-table-column
                    type="selection">
                </el-table-column>
                <el-table-column
                    prop="projectId"
                    label="项目编号">
                </el-table-column>
                <el-table-column
                    prop="projectName"
                    label="项目名称">
                </el-table-column>
                <el-table-column
                    prop="projectPrice"
                    label="项目价格"
                    width="180">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-form>

      <template #footer>
    <span class="dialog-footer">
      <el-button @click="xzxm = false">取 消</el-button>
      <el-button type="primary" @click="monkey">确 定</el-button>
    </span>
      </template>
    </el-dialog>



  </div>
</template>

<script>
import qs from "qs";
import {ref} from 'vue'
export default {
  name: "prescriptionManager",
  components: {},
  data() {
    return {
      tableData:[],
      //药品表
      DrugData:[],
      //手术项目表
      ProjectData:[],
      //体检项目表
      ProjectData2:[],
      RegistrationData:[],
      //药品表赋值对象
      drugdata1:[],
      //项目表赋值对象
      projectdata1:[],

      checkBoxData: [],
      checkBoxData2:[],
      checkBoxData3:[],
      xzxm: false,
      dialogVisible: false,
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据

      prescription:{
        prescriptionId:'',
        doctor:'',
        prescriptionTime:'',
        prescriptionMoney:'',
        registration:{
          registrationId:'',
          registrationNumber:'',
          patientDataId:'',
          room:'',
          doctot:'',
          registrationTime:'',
          registrationFee:'',
          registrationState:'',
          registrationType:'',
          registrationName:'',
          patient:{
            patientDataId:'',
            patientDataCard:'',
            patientDataName:'',
            patientDataPhone:'',
            patientDataSex:'',
            medicalCardNumber:''
          },
          desk:{
            deskId:'',
            deskName:'',
            deskTime:''
          },
        },
        prescriptionDetails:[{
          prescriptionDetailsId:'',
          medicineCount:'',
          medicineSubtotal:'',
          prescriptionDetailsAttention:'',
          prescriptionDetailsExplain:'',
          drug:[],
          project:[]
        }],
      },
      activeName: 'first',
    }
  },
  methods:{
    //查询处方
    initData(){
      this.axios.get("http://localhost:8088/find-prescription")
          .then((v) => {
            this.tableData = v.data;
          })
    },
    //查询药品
    initDrugData(){
      this.axios.get("http://localhost:8088/find-yp")
          .then((v)=>{
              this.DrugData = v.data;
          })
    },
    //查询项目
    initProjectData(){
      this.axios.get("http://localhost:8088/find-pro1")
          .then((v)=>{
            this.ProjectData = v.data;
          })
    },
    initProjectData2(){
      this.axios.get("http://localhost:8088/find-pro2")
          .then((v)=>{
            this.ProjectData2 = v.data;
          })
    },
    //查询挂号
    initRegistrationData(){
      this.axios.get("http://localhost:8088/find-registration")
          .then((v)=>{
            this.RegistrationData = v.data;
          })
    },
    //新增处方
    savePrescription(){
      this.prescription.prescriptionDetails[0].drug=this.checkBoxData
      this.prescription.prescriptionDetails[0].project=this.checkBoxData2
      console.log(this.prescription)
      this.axios.post("http://localhost:8088/add-prescription",this.prescription).then((v)=>{
        alert("处方开张")
      })
    },
    //修改弹出
    editPrescription(row){
      this.prescription = Object.assign({},row)
      this.dialogVisible = true;
    },
    edit(row){
      this.prescription.registration.registrationNumber = row.registrationNumber
      this.prescription.registration.patient.patientDataId = row.patientDataId
      this.prescription.registration.patient.patientDataName = row.patient.patientDataName
      this.prescription.registration.registrationId = row.registrationId
      this.dialogVisible = true;
    },

    //给弹窗赋值
    changeFun(val) {
      this.drugdata1 = val;
    },

    changeFun2(val) {
      this.projectdata1 = val;
      // this.checkBoxData2 = this.checkBoxData2.concat(val);
      this.count2()
      this.projectdata1.forEach(v=>(
          Math.round(this.prescription.prescriptionMoney=this.prescription.prescriptionMoney+v.projectPrice)
      ))
    },

    monkey(){
      this.checkBoxData = this.drugdata1
      this.checkBoxData2 = this.projectdata1
      this.xzxm = false
    },

    deleteyp(s){
      this.checkBoxData.splice(s,1);
      this.checkBoxData3.splice(s,1)
      this.count2()
      this.checkBoxData2.forEach(v=>(
          Math.round(this.prescription.prescriptionMoney=this.prescription.prescriptionMoney+v.projectPrice)
      ))
    },

    deleteyp2(s){
      //表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
      this.checkBoxData2.splice(s,1);
      this.count2()
      this.checkBoxData2.forEach(v=>(
          Math.round(this.prescription.prescriptionMoney=this.prescription.prescriptionMoney+v.projectPrice)
      ))
    },
    close(){
      this.$refs['prescription'].resetFields()
      this.prescription = this.$options.data().prescription
      this.checkBoxData = []
      this.checkBoxData2 = []
      this.dialogVisible=false;
    },
    //计算价格  x是下标，a是本行数据
    count(x,a){
      this.checkBoxData3.splice(x,0,a)
      let l = 0
      this.checkBoxData3.forEach(v=>{
        if(a.drugId == v.drugId){
          l =l+1
          if (l == 2){
            this.checkBoxData3.splice(x,1)
          }
        }
        try {
          this.count2()
        }catch (e){}
        this.checkBoxData2.forEach(v=>(
            Math.round(this.prescription.prescriptionMoney=this.prescription.prescriptionMoney+v.projectPrice)
        ))
      })
    },
    count2(){
      this.prescription.prescriptionMoney=0
      this.checkBoxData3.forEach(v=>{
        Math.round(this.prescription.prescriptionMoney=this.prescription.prescriptionMoney+v.undefined*v.drugPrice)
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
    //默认选中当前时间
    getdatatime(){
      this.prescription.prescriptionTime = new Date();
    },
  },
  mounted() {
    let that = this;
    that.getdatatime()
  },
  created() {
    this.initData();
    this.initDrugData();
    this.initProjectData();
    this.initProjectData2();
    this.initRegistrationData();
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