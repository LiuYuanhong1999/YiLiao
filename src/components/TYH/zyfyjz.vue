<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>住院管理</el-breadcrumb-item>
            <el-breadcrumb-item>住院费用结账</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input placeholder=""></el-input>
                </el-col>
            </el-row>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
            >
                <el-table-column
                        prop="tyhHosregEntity.hosregNum"
                        label="住院号"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="tyhHosregEntity.tyhPatientEntity.patientName"
                        label="病人姓名"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="tyhHosregEntity.tyhPatientEntity.patientSex"
                        label="病人性别"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="tyhHosregEntity.tyhPatientEntity.patientYue"
                        label="押金余额"
                        width="">
                </el-table-column>
                <el-table-column  label="操作">
                    <template  #default="scope">
                        <el-tooltip content="结算" placement="top">
                            <el-button
                                    @click="dialogVisible = true,dian(scope.row)"
                                    icon="el-icon-edit" size="mini">

                            </el-button>
                        </el-tooltip>

                        <el-tooltip content="结算记录" placement="top">
                            <el-button
                                    @click="jilu(scope.row.tyhHosregEntity.tyhPatientEntity.patientId)"
                                    icon="el-icon-view" size="mini">

                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <!--分页-->

        </el-card>
        <el-dialog
                title="提示"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="结账日期" prop="">
                                <el-date-picker
                                        v-model="jieFrom.jieData"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="病人姓名" prop="">
                            <el-input v-model="jieFrom.jieName" disabled></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="住院号" prop="">
                            <el-input v-model="jieFrom.hosregNum" disabled></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结账金额" prop="">
                            <el-input v-model="jieFrom.jiePrice" disabled></el-input>

                        </el-form-item>
                    </el-col>

                </el-row>
项目清单



                <el-form status-icon  ref="ruleForm" class="demo-ruleForm">
                    <el-row>
                        <el-tabs>
                            <el-tab-pane label="药品清单" name="first">
                                <el-table
                                        :data="tableData2"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="drugId"
                                            label="药品编号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="lyhDrugEntity.drugName"
                                            label="药品名称">
                                    </el-table-column>
                                    <el-table-column
                                            prop="lyhDrugEntity.drugPrice"
                                            label="药品单价">
                                    </el-table-column>
                                    <el-table-column
                                            prop="executedelNumber"
                                            label="数量">
                                    </el-table-column>
                                    <el-table-column
                                            label="小计">
                                        <template  #default="scope">
                                            {{scope.row.lyhDrugEntity.drugPrice*scope.row.executedelNumber.toFixed(2)}}
                                        </template>

                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <el-tab-pane label="手术项目清单" name="second">
                                <el-table
                                        :data="tableData3"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="tyhRecipedetailEntity.yxjProjectEntity.projectId"
                                            label="手术项目编号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tyhRecipedetailEntity.yxjProjectEntity.projectName"
                                            label="手术项目名称">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tyhRecipedetailEntity.yxjProjectEntity.projectPrice"
                                            label="手术项目价格"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="operDate"
                                            label="手术时间"
                                            width="180">
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <el-tab-pane label="体检项目清单" name="third">
                                <el-table
                                        :data="tableData4"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="tyhRecipedetailEntity.yxjProjectEntity.projectId"
                                            label="体检项目编号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tyhRecipedetailEntity.yxjProjectEntity.projectName"
                                            label="体检项目名称">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tyhRecipedetailEntity.yxjProjectEntity.projectPrice"
                                            label="体检项目价格">
                                    </el-table-column>
                                    <el-table-column
                                            prop="recordTime"
                                            label="体检时间">
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-row>
                </el-form>
            </el-form>


    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false,addjie()">确 定</el-button>
    </span>
        </el-dialog>


    </div>
</template>
<script>
    import qs from "qs";
    export default{
        name:"zyfyjz",
        components: {},

        data() {
            return {
                dialogVisible: false,
                tableData:[],
                tableData2:[],
                tableData3:[],
                tableData4:[],
                tableData5:[],
                tableData6:[],
                tableData7:[],
                jieFrom:{
                    jieData:'',
                    jiePrice:0,
                    jieName:'',
                    hosregNum:'',
                    patientId:0,
                    tyhJiexes:[]
                }
            }
        },
        methods:{
            jilu(id){
                this.$router.push({path: '/zyfyjzx',query:{ id:id}});
            },


            addjie(){
                let a = 0
                this.tableData2.forEach(v=>{
                    this.jieFrom.tyhJiexes.splice(a,0,v)
                    a=a+1
                })
                this.jieFrom.project.forEach(v=>{
                    this.jieFrom.tyhJiexes.splice(a,0,v.tyhRecipedetailEntity.yxjProjectEntity)
                    a=a+1
                })
                this.jieFrom.project2.forEach(v=>{
                    this.jieFrom.tyhJiexes.splice(a,0,v.tyhRecipedetailEntity.yxjProjectEntity)
                    a=a+1
                })
                console.log(this.jieFrom)
                    this.axios.post("http://localhost:8088/add-jie",this.jieFrom)
                        .then((v) => {
                            this.$message.success("結算成功")
                        })
            },

            dian(s){
                this.jieFrom.jieName=s.tyhHosregEntity.tyhPatientEntity.patientName
                this.jieFrom.hosregNum=s.tyhHosregEntity.hosregNum
                this.jieFrom.patientId=s.tyhHosregEntity.tyhPatientEntity.patientId
                this.initData2(s.tyhHosregEntity.tyhPatientEntity.patientId)
                this.initData3(s.tyhHosregEntity.tyhPatientEntity.patientId)
                this.initData4(s.tyhHosregEntity.tyhPatientEntity.patientId)
            },

            initData() {
                this.axios.get("http://localhost:8088/findAll-cash",{params:{cha:this.findmohu}})
                    .then((v) => {
                        this.tableData = v.data;
                    })
            },

            initData2(s){
                this.axios.get("http://localhost:8088/find-jie",{params:{id:s}})
                    .then((v) => {
                        this.tableData2 = v.data;
                        let a = 0
                        this.tableData2.forEach(v=>{
                            v.executedelPrice=v.executedelNumber*v.lyhDrugEntity.drugPrice
                            this.jieFrom.jiePrice=this.jieFrom.jiePrice+v.executedelPrice
                            a=a+1
                        })
                        this.jieFrom.drug=this.tableData2
                    })
            },

            initData3(s){
                this.axios.get("http://localhost:8088/find-oper",{params:{id:s}})
                    .then((v) => {
                        this.tableData3 = v.data;
                        this.tableData3.forEach(v=>{
                            this.jieFrom.jiePrice=this.jieFrom.jiePrice+v.tyhRecipedetailEntity.yxjProjectEntity.projectPrice
                        })
                        this.jieFrom.project=this.tableData3
                    })
            },

            initData4(s){
                this.axios.get("http://localhost:8088/find-record",{params:{id:s}})
                    .then((v) => {
                        this.tableData4 = v.data;
                        this.tableData4.forEach(v=>{
                            this.jieFrom.jiePrice=this.jieFrom.jiePrice+v.tyhRecipedetailEntity.yxjProjectEntity.projectPrice
                        })
                        this.jieFrom.project2=this.tableData4
                    })
            },


            // 初始页currentPage、初始每页数据数pagesize和数据data



            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        },
        created() {
            this.initData()
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