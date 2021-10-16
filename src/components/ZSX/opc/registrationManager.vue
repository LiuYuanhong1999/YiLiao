<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门诊管理</el-breadcrumb-item>
            <el-breadcrumb-item>挂号管理</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="请输入门诊号" v-model="eaaOrderNumber"  ></el-input>
                </el-col>

                <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
                <!--打印导入导出-->
                <el-button type="primary" @click="dialogVisible = true">增加</el-button>
            </el-row>
            <el-table

                    stripe
                    style="width: 100%"
                    :data="registrationTableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            >
                <el-table-column
                        prop="registrationNumber"
                        label="门诊号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="desk.deskName"
                        label="科室"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="patient.patientDataName"
                        label="病人姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="registrationType"
                        label="挂号类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="registrationName"
                        label="经办人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="registrationTime"
                        label="挂号日期"
                        :formatter="dateformat"
                        width="180">
                </el-table-column>
                <el-table-column  label="操作" width="130px">
                    <template #default="{row}">
                        <el-tooltip content="编辑" placement="top">
                            <el-button
                                    icon="el-icon-edit" size="mini"
                                    @click="editEmp(row)"></el-button>
                        </el-tooltip>


                        <el-tooltip content="删除" placement="top">
                            <el-button
                                    icon="el-icon-delete" size="mini"
                                    @click="deleteEmp(row.eId)"></el-button>
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
                        :total="registrationTableData.length">
                </el-pagination>
            </div>

        </el-card>
        <el-dialog
                title="挂号"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form :model="registration" status-icon  ref="form" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="门诊号" prop="registrationNumber">
                            <el-input v-model="registration.registrationNumber" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="挂号日期" prop="registrationTime">
                            <el-date-picker
                                    v-model="registration.registrationTime"
                                    type="datetime"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="挂号类型" prop="registrationType">
                            <el-select v-model="registration.registrationType" placeholder="请选择">
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
                        <el-form-item label="科室" prop="room">
                            <el-select v-model="registration.room" placeholder="请选择">
                                <el-option
                                        v-for="item in deskTableData"
                                        :key="item.deskId"
                                        :label="item.deskName"
                                        :value="item.deskId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="经办人" prop="registrationName">
                            <el-input v-model="registration.registrationName"></el-input>
                        </el-form-item>
                    </el-col>

                  <el-col :span="10">
                    <el-form-item label="诊疗卡号" prop="patientDataNumber">
                      <el-select v-model="registration.patient.medicalCardNumber" clearable placeholder="请选择" @change="findByPatient(registration.patient.medicalCardNumber)">
                        <el-option
                            v-for="item in patientTableData"
                            :key="item.patientDataId"
                            :label="item.medicalCardNumber"
                            :value="item.medicalCardNumber">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                    <el-col :span="10">
                        <el-form-item label="病人姓名" prop="patientDataName">
                          <el-input v-model="registration.patient.patientDataName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="身份证号码" prop="patientDataCard">
                            <el-input v-model="registration.patient.patientDataCard" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :span="10">
                    <el-form-item label="病人电话" prop="patientDataPhone">
                      <el-input v-model="registration.patient.patientDataPhone" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10">
                    <el-form-item label="病人性别" prop="patientDataSex">
                      <el-input v-model="registration.patient.patientDataSex" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

<!--                <el-row>-->
<!--                    <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--                        <el-tab-pane label="收费项目" name="first">-->
<!--                            <el-table-->
<!--                                    :data="tableData"-->
<!--                                    style="width: 100%">-->
<!--                                <el-table-column-->
<!--                                        prop="date"-->
<!--                                        label="收费项目编号"-->
<!--                                        width="180">-->
<!--                                </el-table-column>-->
<!--                                <el-table-column-->
<!--                                        prop="name"-->
<!--                                        label="收费项目名称"-->
<!--                                        width="180">-->
<!--                                </el-table-column>-->
<!--                            </el-table>-->
<!--                        </el-tab-pane>-->
<!--                        <el-tab-pane label="收费记录" name="second">-->
<!--                            <el-form-item label="收费项目" prop="eName">-->
<!--                                <el-input v-model="registration.ePhone"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="收挂号费" prop="eName">-->
<!--                                <el-input v-model="registration.ePhone"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="退挂号费" prop="eName">-->
<!--                                <el-input v-model="registration.ePhone"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-button @click="dialogVisible = false">收挂号费</el-button>-->
<!--                            <el-button @click="dialogVisible = false">退挂号费</el-button>-->
<!--                            <el-button @click="dialogVisible = false">删除</el-button>-->
<!--                        </el-tab-pane>-->

<!--                    </el-tabs>-->
<!--                </el-row>-->
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="ClearFrom">取 消</el-button>
      <el-button type="primary" @click="saveRegistration">确 定</el-button>
    </span>
            </template>
        </el-dialog>



    </div>
</template>

    <script>
    import qs from "qs";
    import moment from "moment";
      export default {
        name: "registrationManager",
        components: {},


        data() {
            return {
              patientDataId:'',
              patientDataName:'',
              patientDataCard:'',
                value1:'',
                registrationTableData:[],
                list:[],
                deskTableData:[],
                patientTableData:[],

                dialogVisible: false,
                currentPage:1, //初始页
                pageSize:10,    //    每页的数据

                //挂号对象
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
                  }
                },
                options: [{
                    value: '普通',
                    label: '普通'
                }, {
                    value: '急诊',
                    label: '急诊'
                }, {
                  value: '专家门诊',
                  label: '专家门诊'
                }],
              value:'',
                stateOptions:[{
                  registrationState:'0',
                  stateLabel:'待就诊'
                },{
                  registrationState:'1',
                  stateLabel: '待取药',
                },{
                  registrationState: '2',
                  stateLabel: '待住院',
                },{
                  registrationState: '3',
                  stateLabel: '待出院',
                }],
              registrationState: '1',
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
                this.axios.get("http://localhost:8088/registration")
                    .then((v) => {
                        this.registrationTableData = v.data;
                        this.registration.registrationNumber= 'MZ'+ this.getProjectNum()+ Math.floor(Math.random() * 10000);
                    })
            },
            selectDesk(){
                this.axios.get("http://localhost:8088/select-desk")
              .then((v) =>{
                this.deskTableData = v.data;
              })
            },
            selectPatient(){
              this.axios.get("http://localhost:8088/select-patient").then((v)=>{
                this.patientTableData = v.data;
              })
            },
            findByPatient(medicalCardNumber){
                this.axios.get("http://localhost:8088/find-by-patient",{params:{
                    medicalCardNumber:medicalCardNumber}})
                    .then((v)=>{
                      console.log(v.data)
                      //这不就变了嘛，本身你这样查询的话返回一个对象就行了，都不要返回什么数组
                      this.registration.patient = Object.assign(this.registration.patient,v.data[0])
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
                this.registration = Object.assign({}, row)
                // this.registration.room = row.desk.deskId
                this.dialogVisible=true;
            },

          close(){
            this.$refs['form'].resetFields()
            this.registration = this.$options.data().registration
            this.dialogVisible=false;
          },

            ClearFrom(){
                this.close()
            },
            saveRegistration(){
                this.axios.post("http://localhost:8088/save-registration",this.registration)
                    .then((v) => {
                        this.dialogVisible=false;
                        this.$message('操作成功！');
                        this.initData(this.currentPage, this.pageSize);
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
          //默认选中当前时间
          getdatatime(){
              this.registration.registrationTime = new Date();
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
        mounted() {
          let that = this;
          that.getdatatime()
        },
        created() {
            this.initData();
            this.selectDesk();
            this.selectPatient();
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