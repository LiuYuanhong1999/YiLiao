<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>手术管理</el-breadcrumb-item>
            <el-breadcrumb-item>手术申请</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="请输入审批单号" v-model="eaaOrderNumber"  ></el-input>
                </el-col>

                <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
                <!--打印导入导出-->
                <el-button type="primary" @click="dialogVisible = true">门诊手术申请</el-button>
            </el-row>
            <el-table

                    stripe
                    style="width: 100%"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            >
                <el-table-column
                          prop="surgeryForNumber"
                        label="手术申请号">
                </el-table-column>
              <el-table-column
                  prop="prescription.prescriptionId"
                  label="门诊处方号">
              </el-table-column>
                <el-table-column
                        prop="prescription.registration.patient.patientDataName"
                        label="病人姓名">
                </el-table-column>
                <el-table-column
                        prop="surgeryForName"
                        label="手术名称">
                </el-table-column>
                <el-table-column
                        prop="surgeryForDoctor"
                        label="主刀医生">
                </el-table-column>
                <el-table-column  label="操作" width="130px">
                    <template  #default="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button
                                    icon="el-icon-edit" size="mini"
                                    @click="editEmp(scope.row)"></el-button>
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



      <el-card>
        <!--表头-->
        <el-row>
          <el-col :span="4">
            <el-input placeholder="请输入审批单号" v-model="eaaOrderNumber"  ></el-input>
          </el-col>

          <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
          <!--打印导入导出-->
          <el-button type="primary" @click="dialogVisible1 = true">住院手术申请</el-button>
        </el-row>
        <el-table

            stripe
            style="width: 100%"
            :data="tableData1.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        >
          <el-table-column
              prop="surgeryForNumber"
              label="手术申请号">
          </el-table-column>
          <el-table-column
              prop="recipeEntity.recipeId"
              label="住院处方号">
          </el-table-column>
          <el-table-column
              prop="recipeEntity.tyhPatientEntity.patientName"
              label="病人姓名">
          </el-table-column>
          <el-table-column
              prop="surgeryForName"
              label="手术名称">
          </el-table-column>
          <el-table-column
              prop="surgeryForDoctor"
              label="主刀医生">
          </el-table-column>
          <el-table-column  label="操作" width="130px">
            <template  #default="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button
                    icon="el-icon-edit" size="mini"
                    @click="editEmp1(scope.row)"></el-button>
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
        <el-dialog
                title="新增手术申请"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form :model="surgeryFor" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="手术号" prop="surgeryForNumber">
                            <el-input v-model="surgeryFor.surgeryForNumber" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="手术名称" prop="surgeryForName">
                          <el-input v-model="surgeryFor.surgeryForName"></el-input>
                        </el-form-item>
                    </el-col>
<!--                    <el-col :span="10">-->
<!--                        <el-form-item label="手术室" prop="eName">-->
<!--                            <el-select v-model="value" placeholder="请选择">-->
<!--                                <el-option-->
<!--                                        v-for="item in options"-->
<!--                                        :key="item.value"-->
<!--                                        :label="item.label"-->
<!--                                        :value="item.value">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
                    <el-col :span="10">
                        <el-form-item label="门诊处方号" prop="prescriptionId">
                            <el-select v-model="surgeryFor.prescription.prescriptionId" placeholder="请选择" @change="findByPatient(surgeryFor.prescription.prescriptionId)">
                                <el-option
                                        v-for="item in selectPrescriptionTableData"
                                        :key="item.prescriptionId"
                                        :label="item.prescriptionId"
                                        :value="item.prescriptionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="病人姓名" prop="patientDataName">
                            <el-input v-model="surgeryFor.prescription.registration.patient.patientDataName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="主刀医生" prop="surgeryForDoctor">
                            <el-input v-model="surgeryFor.surgeryForDoctor"></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :span="10">
                    <el-form-item label="术前医嘱" prop="surgeryForPrn">
                      <el-input v-model="surgeryFor.surgeryForPrn"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
            </template>
        </el-dialog>

<!--住院的-->
      <el-dialog
          title="新增手术申请"
          v-model="dialogVisible1"
          width="60%"
          :before-close="handleClose">
        <el-form :model="surgeryFor" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="手术号" prop="eName">
                <el-input v-model="surgeryFor.surgeryForNumber" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="手术类型" prop="eName">
                <el-select v-model="value" placeholder="请选择">
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
              <el-form-item label="住院处方号" prop="eName">
                <el-select v-model="surgeryFor.recipeEntity.recipeId" placeholder="请选择">
                  <el-option
                      v-for="item in selectRecipeTableData"
                      :key="item.recipeId"
                      :label="item.recipeId"
                      :value="item.recipeId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="病人姓名" prop="eName">
                <el-input v-model="surgeryFor.prescription.registration.patient.patientDataName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="主刀医生" prop="eName">
                <el-input v-model="surgeryFor.surgeryForDoctor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
    </span>
        </template>
      </el-dialog>
    </div>
</template>

<script>
    import qs from "qs";
    export default {
        name: "surgeryForManager",
        components: {},
        data() {
            return {
                tableData:[],
                tableData1:[],
              selectPrescriptionTableData:[],
              selectRecipeTableData:[],
              dialogVisible: false,
              dialogVisible1: false,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                //手术申请对象
                surgeryFor:{
                  surgeryForId:'',
                  surgeryForName:'',
                  surgeryForDoctor:'',
                  surgeryForNumber:'',
                  surgeryForPrn:'',
                  surgeryForStaff:'',
                  prescription:{
                    prescriptionId:'',
                    doctor:'',
                    prescriptionTime:'',
                    registrationId:'',
                    prescriptionMoney:'',
                    registration:{
                      registrationId:'',
                      registrationNumber:'',
                      patientDataId:'',
                      room:'',
                      doctot:'',
                      registrationFee:'',
                      patient:{
                        patientDataId:'',
                        patientDataCard:'',
                        patientDataName:'',
                        patientDataPhone:'',
                        patientDataSex:'',
                        medicalCardNumber:''
                      }
                    }
                  },
                  recipeEntity:{
                    recipeId:'',
                    recipePrice:'',
                    recipeDate:'',
                    recipeDay:'',
                    recipeExplain:'',
                    recipeZt:'',
                    tyhPatientEntity:{
                      patientId:'',
                      patientName:'',
                      patientSex:'',
                      patientYue:''
                    }
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
            initData(){
                this.axios.get("http://localhost:8088/find_surgery_for_prescription")
                    .then((v) => {
                      this.surgeryFor.surgeryForNumber= 'SSSQ'+ this.getProjectNum()+ Math.floor(Math.random() * 10000);
                      this.tableData = v.data;
                    })
            },
          initData1(){
            this.axios.get("http://localhost:8088/find_surgery_for_recipe")
                .then((v) => {
                  this.tableData1 = v.data;
                })
          },

          // selectOperating(){
          //   this.axios.get("http://localhost:8088/select_operating").then((v)=>{
          //     this.selectOperatingTableData = v.data
          //   })
          // },
          selectPrescription(){
              this.axios.get("http://localhost:8088/select_prescription").then((v)=>{
                this.selectPrescriptionTableData = v.data
              })
          },
          findByPatient(prescriptionId){
            this.axios.get("http://localhost:8088/find-by-prescriptionId",{params:{
                prescriptionId:prescriptionId}})
                .then((v)=>{
                  //这不就变了嘛，本身你这样查询的话返回一个对象就行了，都不要返回什么数组
                  this.surgeryFor.prescription = Object.assign(this.surgeryFor.prescription,v.data[0])
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
            editEmp(row){
                this.dialogVisible=true;
                this.surgeryFor = Object.assign({}, row)
            },
            editEmp1(row){
              this.dialogVisible1=true;
              this.surgeryFor = Object.assign({}, row)
            },

            ClearFrom(){
                this.ruleForm='';
                this.dialogVisible=false;
            },
            addEmp(){
                this.axios.post("http://localhost:8088/add-emp",this.ruleForm)
                    .then((v) => {
                        this.dialogVisible=false;
                        this.$message('操作成功！');
                        this.initData(this.currPage, this.pageSize);

                    })
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
                        this.initData(this.currPage, this.pageSize);
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
            this.initData1();
            // this.selectOperating();
            this.selectPrescription();
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