<template  xmlns:el-form-item="http://www.w3.org/1999/xhtml">
    <el-form ref="ruleFrom" :model="ruleFrom"  label-width="100px">
        <el-page-header content="结账记录" @back="goBack" />
        <!--数据表格-->
        <el-row>
            <el-col :span="24">
                <el-form-item>
                    <br>
                    <br>
                    <el-table
                            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                            @expand-change="expandSelect">
                            <el-table-column width="55" align="center" type="expand">
                                药品
                                <el-table
                                        :data="tableData2"
                                        stripe
                                >
                                    <template  #default="scope">
                                    <el-table-column
                                            prop="jieId"
                                            label="结算号">
                                    </el-table-column>
                                    <el-table-column
                                            label="药品名称">
                                        <template  #default="scope">
                                            <template v-if="scope.row.yxjProjectEntity.projectName == null">
                                                {{scope.row.lyhDrugEntity.drugName}}
                                            </template>
                                            <template v-if="scope.row.lyhDrugEntity.drugName == null">
                                                {{scope.row.yxjProjectEntity.projectName}}
                                            </template>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="jiexNum"
                                            label="数量">
                                    </el-table-column>
                                        <el-table-column
                                                label="小计">
                                            <template  #default="scope">
                                                <template v-if="scope.row.yxjProjectEntity.projectName == null">
                                                    {{scope.row.lyhDrugEntity.drugPrice*scope.row.jiexNum}}
                                                </template>
                                                <template v-if="scope.row.lyhDrugEntity.drugName == null">
                                                    {{scope.row.yxjProjectEntity.projectPrice}}
                                                </template>
                                            </template>
                                        </el-table-column>
                                    </template>
                                </el-table>

                            </el-table-column>
                            <el-table-column
                                    prop="jieId"
                                    label="结算号">
                            </el-table-column>
                            <el-table-column
                                    prop="jiePrice"
                                    label="结算金额">
                            </el-table-column>
                            <el-table-column
                                    prop="jieDate"
                                    label="结算时间">
                            </el-table-column>
                            <el-table-column
                                    prop="tyhHosregEntity.tyhPatientEntity.patientName"
                                    label="病人姓名">
                            </el-table-column>
                            <el-table-column
                                    prop="hosregNum"
                                    label="住院号">
                            </el-table-column>
                    </el-table>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>



</template>

<script>

    import qs from "qs";

    export default {
        data() {
            return {
                rcId:0,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                dialogVisible: false,
                tableData:[],
                tableData2:[],
            }


        },

        methods: {
            expandSelect:function (row) {
                this.initData2(row)
            },

            // 跳转返回指定的页面
            goBack() {
                this.$router.push({
                    path: '/zyfyjz'
                })
            },

            initData(){
                this.axios.get("http://localhost:8088/findall-jie",{params:{id:this.rcId}})
                    .then((v) => {
                        this.tableData = v.data;
                    })
            },

            initData2(row){
                this.axios.get("http://localhost:8088/findall-jiex",{params:{id:row.jieId}})
                    .then((v) => {
                        this.tableData2 = v.data;
                        console.log(this.tableData2)
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
        },

        created() {
            this.rcId=this.$route.query.id;
            this.initData()
        }

    }
</script>


<style scoped>
    .whiteSelectBg .el-input.is-disabled .el-input__inner{
        background-color: white;
        color:#606266;
    }
    *{
        margin: 0px;
        padding: 0px;
    }
    .xq{
        width: 100%;

        background-color:#E9EEF3;
        padding-top:100px;
        padding-bottom: 100px;
    }
    .max_box{
        width:100%;
        height:500px;
        margin:auto;
        background-color: #E9EEF3;
    }
    .xia_box{
        width:850px;
        height:500px;
        background: white;
        margin-left: 360px;
        margin-top: 10px;

    }


</style>















