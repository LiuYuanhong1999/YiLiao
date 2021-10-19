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
                    <el-input placeholder="请输入审批单号" v-model="eaaOrderNumber"></el-input>
                </el-col>

                <el-button  icon="el-icon-search" type="primary" @click="initData(currentPage,pageSize)"></el-button>
                <!--打印导入导出-->
                <el-button type="primary" @click="dialogVisible = true">门诊手术申请</el-button>
            </el-row>
            <el-table
                    stripe
                    style="width: 100%"
                    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
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
                        <el-tooltip content="申请完成" placement="top">
                            <el-button
                                    icon="el-icon-delete" size="mini"
                                    @click="updateSurgeryForStaff(scope.row.surgeryForNumber)"></el-button>
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
            :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        >
          <el-table-column
              prop="surgeryForNumber"
              label="手术申请号">
          </el-table-column>
          <el-table-column
              prop="recipeId"
              label="住院处方号">
          </el-table-column>
          <el-table-column
              prop="recipe.tyhRecipeEntity.tyhPatientEntity.patientName"
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
              <el-tooltip content="申请完成" placement="top">
                <el-button
                    icon="el-icon-delete" size="mini"
                    @click="updateSurgeryForStaff(scope.row.surgeryForNumber)"></el-button>
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
              :total="tableData1.length">
          </el-pagination>
        </div>
      </el-card>


<!--      门诊-->
        <el-dialog
                title="新增手术申请"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form :model="surgeryFor" status-icon  ref="surgeryFor" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="手术号" prop="surgeryForNumber">
                            <el-input v-model="surgeryFor.surgeryForNumber" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="手术名称" prop="surgeryForName">
                          <el-input v-model="surgeryFor.surgeryForName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="门诊处方号" prop="prescriptionId">
                            <el-input v-model="surgeryFor.prescription.prescriptionId" placeholder="请选择" @click="dialogVisible3 = true"></el-input>
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
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="savePrescription">确 定</el-button>
    </span>
            </template>
        </el-dialog>
      <el-dialog
          title="提示"
          v-model="dialogVisible3"
          width="60%"
          :before-close="handleClose">
        <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-table
              :data="selectPrescriptionTableData"
              style="width: 100%"
              @row-dblclick="openPrescriptionDetails">
            <el-table-column
                prop="prescription.prescriptionId"
                label="处方编号">
            </el-table-column>
            <el-table-column
                prop="prescription.registration.patient.patientDataName"
                label="病人姓名">
            </el-table-column>
            <el-table-column
                prop="project[0].projectName"
                label="项目名称"
                width="180">
            </el-table-column>
          </el-table>
        </el-form>
        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible3 = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
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
              <el-form-item label="手术号" prop="surgeryForNumber">
                <el-input v-model="surgeryFor.surgeryForNumber" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="手术名称" prop="surgeryForName">
                <el-input v-model="surgeryFor.surgeryForName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="住院处方号" prop="recipeId">
                <el-input v-model="surgeryFor.recipe.tyhRecipeEntity.recipeId" placeholder="请选择" @click="dialogVisible2 = true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="病人姓名" prop="patientName">
                <el-input v-model="surgeryFor.recipe.tyhRecipeEntity.tyhPatientEntity.patientName" :disabled="true"></el-input>
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
      <el-button @click="closeRecipe">取 消</el-button>
      <el-button type="primary" @click="saveRecipe">确 定</el-button>
    </span>
        </template>
      </el-dialog>

      <el-dialog
          title="提示"
          v-model="dialogVisible2"
          width="60%"
          :before-close="handleClose">
        <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-table
              :data="selectRecipeTableData"
              style="width: 100%"
              @row-dblclick="openDetails">
            <el-table-column
                prop="tyhRecipeEntity.recipeId"
                label="处方编号">
            </el-table-column>
            <el-table-column
                prop="tyhRecipeEntity.tyhPatientEntity.patientName"
                label="病人姓名">
            </el-table-column>
            <el-table-column
                prop="yxjProjectEntity.projectName"
                label="项目名称"
                width="180">
            </el-table-column>
          </el-table>
        </el-form>
        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
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
                dialogVisible2:false,
                dialogVisible3:false,
                currentPage:1, //初始页
                pageSize:10,    //    每页的数据
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
                  recipe:{
                    recipedetailId:'',
                    recipedetailProject:'',
                    recipedetailPrice:'',
                    recipedetailExplain:'',
                    tyhRecipeEntity:{
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
                  this.surgeryFor.surgeryForNumber= 'SSSQ'+ this.getProjectNum()+ Math.floor(Math.random() * 10000);
                  this.tableData1 = v.data;
                })
          },

          selectPrescription(){
              this.axios.get("http://localhost:8088/select_prescription").then((v)=>{
                this.selectPrescriptionTableData = v.data
              })
          },
          openPrescriptionDetails(row){
            this.surgeryFor.surgeryForName = row.project[0].projectName
            this.surgeryFor.prescription.prescriptionId =  row.prescription.prescriptionId
            this.surgeryFor.prescription.registration.patient = row.prescription.registration.patient
            this.dialogVisible3 = false;
          },
          selectRecipe(){
            this.axios.get("http://localhost:8088/select_recipe").then((v)=>{
              this.selectRecipeTableData = v.data
            })
          },
          selectRecipePatient(recipeId){
            this.axios.get("http://localhost:8088/find-by-recipeId",{params:{
                recipeId:recipeId}})
                .then((v)=>{
                  //这不就变了嘛，本身你这样查询的话返回一个对象就行了，都不要返回什么数组
                  this.surgeryFor.recipeEntity = Object.assign(this.surgeryFor.recipeEntity,v.data[0])
                })
          },
          savePrescription(){
            this.axios.post("http://localhost:8088/save_prescription",this.surgeryFor).then((v)=>{
              this.dialogVisible=false;
              this.$message('操作成功！');
              this.close();
              this.initData(this.currentPage, this.pageSize);
            })
          },
          openDetails(row){
              this.surgeryFor.recipe = row
              this.surgeryFor.surgeryForName = row.yxjProjectEntity.projectName
              this.dialogVisible2 = false;
          },
          close(){
            this.$refs['surgeryFor'].resetFields()
            this.surgeryFor = this.$options.data().surgeryFor
            this.dialogVisible=false;
          },

          saveRecipe(){
            this.axios.post("http://localhost:8088/save_recipe",this.surgeryFor).then((v)=>{
              this.dialogVisible1=false;
              this.$message('操作成功！');
              this.closeRecipe();
              this.initData(this.currentPage, this.pageSize);
            })
          },
          closeRecipe(){
            this.$refs['ruleForm'].resetFields()
            this.surgeryFor = this.$options.data().surgeryFor
            this.dialogVisible1=false;
          },

          updateSurgeryForStaff(surgeryForNumber){
            this.axios.get("http://localhost:8088/update_surgery_for_staff",{params:{surgeryForNumber:surgeryForNumber}})
                .then((v) => {
                  this.$message('操作成功！');
                  this.initData(this.currentPage, this.pageSize);
                  this.initData1(this.currentPage,this.pageSize);
                })
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
            editEmp(row){
                this.dialogVisible=true;
                this.surgeryFor = Object.assign({}, row)
            },
            editEmp1(row){
              this.dialogVisible1=true;
              this.surgeryFor = Object.assign({}, row)
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
            this.selectPrescription();
            this.selectRecipe();
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