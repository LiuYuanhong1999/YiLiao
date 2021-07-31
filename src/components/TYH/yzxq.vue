<template  xmlns:el-form-item="http://www.w3.org/1999/xhtml">
    <el-form ref="ruleFrom" :model="ruleFrom"  label-width="100px">
        <el-page-header content="详情页" @back="goBack" />
        <!--数据表格-->
        <el-row>
            <el-col :span="24">
                <el-form-item>
                    药品
                    <el-table
                            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                            style="width: 100%;margin-left: -50px">
                        <template  #default="scope">
                                <el-table-column type="selection" width="55" align="center" />
                                <el-table-column
                                        prop="recipedetailId"
                                        label="详情编号">
                                </el-table-column>
                                <el-table-column
                                        prop="lyhDrugEntity.drugName"
                                        label="药品名称">
                                </el-table-column>
                                <el-table-column
                                        prop="lyhDrugEntity.drugPrice"
                                        label="单价">
                              </el-table-column>
                                <el-table-column
                                        prop="recipedetailPrice"
                                        label="小计">
                                </el-table-column>
                                <el-table-column
                                        prop="recipedetailNumber"
                                        label="数量">
                                </el-table-column>
                                <el-table-column
                                        prop="recipedetailPrice"
                                        label="小计">
                                </el-table-column>
                                <el-table-column
                                        prop="recipedetailExplain"
                                        label="注意事项">
                                </el-table-column>

                        </template>
                    </el-table>
                    项目
                    <el-table
                            :data="tableData1.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                            border
                            style="width: 100%;margin-left: -50px">
                        <template  #default="scope">
                            <el-table-column type="selection" width="55" align="center" />
                            <el-table-column
                                    prop="recipedetailId"
                                    label="详情编号">
                            </el-table-column>
                            <el-table-column
                                    prop="yxjProjectEntity.projectName"
                                    label="项目名称">
                            </el-table-column>
                            <el-table-column
                                    prop="recipedetailPrice"
                                    label="小计">
                            </el-table-column>
                            <el-table-column
                                    prop="recipedetailExplain"
                                    label="注意事项">
                            </el-table-column>

                        </template>
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
                reverse: true,
                rcId:0,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                dialogVisible: false,
                tableData:[],
                tableData1:[],
                rdxFrom:{
                    recipedetailId:'',
                    recipeId:'',
                    recipedetailProject:'',
                    recipedetailDurg:'',
                    recipedetailPrice:'',
                    recipedetailNumber:'',
                    recipedetailExplain:''
                }
            }


        },

        methods: {
            // 跳转返回指定的页面
            goBack() {
                this.$router.push({
                    path: '/zyyz'
                })
            },

            initData1(){
                this.axios.get("http://localhost:8088/find-chufang2",{params:{patientId:this.rcId}})
                    .then((v) => {
                        this.tableData1 = v.data;
                    })
            },

            initData(){
                this.axios.get("http://localhost:8088/find-chufang",{params:{patientId:this.rcId}})
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
        },

        created() {
            this.rcId=this.$route.query.id;
            console.log(this.rcId)
            this.initData()
            this.initData1()
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















