<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门诊管理</el-breadcrumb-item>
            <el-breadcrumb-item>门诊收费</el-breadcrumb-item>
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
            </el-row>
            <el-table

                    stripe
                    style="width: 100%"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            >
                <el-table-column
                        prop="chargeId"
                        label="收费编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="chargeTime"
                        label="收费日期"
                        :formatter="dateformat"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="registration.patient.patientDataName"
                        label="病人姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="chargeOperatorId"
                        label="经办人编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="dotor"
                        label="医生编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="chargeMoney"
                        label="收费金额"
                        width="180">
                </el-table-column>

                <el-table-column  label="操作" width="130px">
                    <template  #default="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button
                                    icon="el-icon-edit" size="mini"
                                    @click="editCharge(scope.row)"></el-button>
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
                title="收费管理"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form :model="charge" status-icon  ref="charge" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="门诊收费号" prop="chargeId">
                            <el-input v-model="charge.chargeId" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
<!--                    <el-col :span="10">-->
<!--                        <el-form-item label="状态" prop="eSex">-->
<!--                            <el-select v-model="value" disabled placeholder="请选择">-->
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
                        <el-form-item label="收费日期" >
                            <el-date-picker
                                    v-model="charge.chargeTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
<!--                    <el-col :span="10">-->
<!--                        <el-form-item label="门诊号" prop="eSex">-->
<!--                            <el-input v-model="chargeForm.eSex" :disabled="true"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="10">-->
<!--                        <el-form-item label="病人姓名" prop="patient.patientDataName">-->
<!--                            <el-select v-model="chargeForm.patient.patientDataName" placeholder="请选择" value-key="patientDataId">-->
<!--                                <el-option-->
<!--                                        v-for="item in tableData"-->
<!--                                        :key="item.patient.patientDataId"-->
<!--                                        :label="item.patient.patientDataName"-->
<!--                                        :value="item.patient.patientDataName">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
                    <el-col :span="10">
                        <el-form-item label="应收金额" prop="chargeMoney">
                            <el-input v-model="charge.chargeMoney"></el-input>
                        </el-form-item>
                    </el-col>
<!--                    <el-col :span="10">-->
<!--                        <el-form-item label="实收金额" prop="eName">-->
<!--                            <el-input v-model="chargeForm.ePhone"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="10">-->
<!--                        <el-form-item label="应退金额" prop="eName">-->
<!--                            <el-input v-model="chargeForm.ePhone"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
                  <el-col :span="10">
                    <el-form-item label="医生" prop="dotor">
                      <el-input v-model="charge.dotor"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="经办人" prop="chargeOperatorId">
                      <el-input v-model="charge.chargeOperatorId"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="未收费" name="first">
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label="收费编号">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费类型">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费项目">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费日期">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费时间">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="金额">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="状态">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="机台号">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="费用清单" name="second">
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label="收费编号">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费类型">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费项目">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费日期">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费时间">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="金额">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="状态">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="ClearFrom">取 消</el-button>
      <el-button type="primary" @click="saveCharge()">确 定</el-button>
    </span>
            </template>
        </el-dialog>




    </div>
</template>

<script>
    import qs from "qs";
    import moment from "moment"
    export default {
        name: "chargeManager",
        components: {},


        data() {
            return {
                tableData:[],
                dialogVisible: false,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                charge:{
                  chargeId:'',
                  chargeTime:'',
                  chargePatientName:'',
                  chargeOperatorId:'',
                  dotor:'',
                  chargeMoney:'',
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
                      medicalCardNumber:'',
                      medicalCard:''
                    }
                  },
                  prescription:{
                    prescriptionId:'',
                    doctor:'',
                    prescriptionTime:'',
                    registrationId:'',
                    prescriptionMoney:'',
                  }
                },
              activeName: 'second'
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
                this.axios.get("http://localhost:8088/charge")
                    .then((v) => {
                        this.tableData = v.data;
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
            editCharge(row){
                this.dialogVisible=true;
                this.charge={...row}
            },

            ClearFrom(){
                this.charge={
                    chargeId:'',
                    chargeTime:'',
                    chargePatientName:'',
                    chargeOperatorId:'',
                    dotor:'',
                    chargeMoney:'',
                    patient:{
                      patientDataId:'',
                      patientDataCard:'',
                      patientDataName:'',
                      patientDataPhone:'',
                      patientDataSex:'',
                      medicalCardNumber:''
                    }
                };
                this.dialogVisible=false;
            },
            saveCharge(){
              console.log(this.charge)
                this.axios.post("http://localhost:8088/saveCharge",this.charge)
                    .then((v) => {
                        this.dialogVisible=false;
                        this.$message('操作成功！');
                        this.initData(this.currentPage, this.pageSize);
                        console.log(this.charge.chargeId)
                    })
            },

            deleteCharge(id){
                this.$confirm('你确定要删除该条信息吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'},
                    this.axios.post("http://localhost:8088/delCharge",qs.stringify({eId: id
                    })))
                    .then((v) => {
                        this.$message('删除成功！');
                        this.initData(this.currentPage, this.pageSize);
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
            }
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