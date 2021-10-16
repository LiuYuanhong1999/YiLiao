<template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="User" name="first">
                    <div  id="xl">
                        <!--表头结束-->
                        <!--table开始-->

                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>护士工作站</el-breadcrumb-item>
                            <el-breadcrumb-item>住院医嘱执行</el-breadcrumb-item>
                        </el-breadcrumb>

                        <el-card>
                            <!--表头-->
                            <el-row>
                                <el-col :span="4">
                                    <el-input placeholder="请输入住院医嘱执行号" v-model="eaaOrderNumber"  ></el-input>
                                </el-col>

                                <el-col :span="4">
                                    <el-button type="primary" style="margin-left: 800px" @click="hsxq2()">执行记录</el-button>
                                </el-col>
                                <!--打印导入导出-->
                            </el-row><br><br>
                            今日待执行医嘱<br><br>
                            <el-table

                                    stripe
                                    style="width: 100%"
                                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                            >
                                <el-table-column
                                        prop="executeId"
                                        label="住院医嘱执行号">
                                </el-table-column>
                                <el-table-column
                                        prop="tyhPatientEntity.tyhHosregEntity.hosregNum"
                                        label="住院号">
                                </el-table-column>
                                <el-table-column
                                        prop="tyhPatientEntity.patientName"
                                        label="病人姓名">
                                </el-table-column>
                                <el-table-column
                                        label="执行天数">
                                    <template  #default="scope">
                                        {{"第"+scope.row.executeDay+"天"}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="executeExp"
                                        label="注意事项">
                                </el-table-column>
                                <el-table-column
                                        prop="executeZt"
                                        label="状态">
                                    <template #default="scope">
                                        <template v-if="scope.row.executeZt =='0'">
                                            待执行
                                        </template>
                                        <template v-if="scope.row.executeZt =='1'">
                                            发药中
                                        </template>
                                        <template v-if="scope.row.executeZt =='2'">
                                            已发药
                                        </template>
                                        <template v-if="scope.row.executeZt =='3'">
                                            执行完毕
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="操作">
                                    <template  #default="scope">
                                        <el-tooltip content="详情" placement="top">
                                            <el-button
                                                    icon="el-icon-view" size="mini"
                                                    @click="hsxq(scope.row.executeId)"></el-button>
                                        </el-tooltip>

                                        <template v-if="scope.row.executeDay =='1'">
                                            <template v-if="scope.row.executeZt =='0'">
                                                <el-tooltip content="申请发药" placement="top">
                                                    <el-button
                                                            icon="el-icon-circle-plus" size="mini"
                                                            @click="updata1(scope.row.executeId)"></el-button>
                                                </el-tooltip>
                                            </template>


                                        </template>
                                        <template v-if="scope.row.executeZt =='2'">
                                            <el-tooltip content="执行完毕" placement="top">
                                                <el-button
                                                        icon="el-icon-success" size="mini"
                                                        @click="updata2(scope.row.executeId)"></el-button>
                                            </el-tooltip>
                                        </template>
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
                    </div>
                </el-tab-pane>

                <el-tab-pane label="Config" name="second">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>护士工作站</el-breadcrumb-item>
                        <el-breadcrumb-item>住院医嘱执行记录</el-breadcrumb-item>
                    </el-breadcrumb>

                    <el-card>
                                <!--表头-->
                                <el-row>
                                    <el-col :span="4">
                                        <el-input placeholder="请输入住院医嘱执行号" v-model="eaaOrderNumber"  ></el-input>
                                    </el-col>

                                    <el-col :span="4">
                                        <el-button type="primary" style="margin-left: 800px" @click="hsxq2()">执行记录</el-button>
                                    </el-col>
                                    <!--打印导入导出-->
                                </el-row><br><br>
                                住院医嘱执行记录<br><br>
                                <el-table

                                        stripe
                                        style="width: 100%"
                                        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                                >
                                    <el-table-column
                                            prop="executeId"
                                            label="住院医嘱执行号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tyhPatientEntity.tyhHosregEntity.hosregNum"
                                            label="住院号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tyhPatientEntity.patientName"
                                            label="病人姓名">
                                    </el-table-column>
                                    <el-table-column
                                            label="执行天数">
                                        <template  #default="scope">
                                            {{"第"+scope.row.executeDay+"天"}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="executeExp"
                                            label="注意事项">
                                    </el-table-column>
                                    <el-table-column  label="操作">
                                        <template  #default="scope">
                                            <el-tooltip content="详情" placement="top">
                                                <el-button
                                                        icon="el-icon-view" size="mini"
                                                        @click="hsxq(scope.row.executeId)"></el-button>
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
                </el-tab-pane>

            </el-tabs>
<!--        <el-card>-->
<!--            &lt;!&ndash;表头&ndash;&gt;-->
<!--            <el-row>-->
<!--                <el-col :span="4">-->
<!--                    <el-input placeholder="请输入住院医嘱执行号" v-model="eaaOrderNumber"  ></el-input>-->
<!--                </el-col>-->

<!--                <el-col :span="4">-->
<!--                    <el-button type="primary" style="margin-left: 800px" @click="hsxq2()">执行记录</el-button>-->
<!--                </el-col>-->
<!--                &lt;!&ndash;打印导入导出&ndash;&gt;-->
<!--            </el-row><br><br>-->
<!--            住院医嘱执行记录<br><br>-->
<!--            <el-table-->

<!--                    stripe-->
<!--                    style="width: 100%"-->
<!--                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
<!--            >-->
<!--                <el-table-column-->
<!--                        prop="executeId"-->
<!--                        label="住院医嘱执行号">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="tyhPatientEntity.tyhHosregEntity.hosregNum"-->
<!--                        label="住院号">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="tyhPatientEntity.patientName"-->
<!--                        label="病人姓名">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        label="执行天数">-->
<!--                    <template  #default="scope">-->
<!--                        {{"第"+scope.row.executeDay+"天"}}-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="executeExp"-->
<!--                        label="注意事项">-->
<!--                </el-table-column>-->
<!--                <el-table-column  label="操作">-->
<!--                    <template  #default="scope">-->
<!--                        <el-tooltip content="详情" placement="top">-->
<!--                            <el-button-->
<!--                                    icon="el-icon-view" size="mini"-->
<!--                                    @click="hsxq(scope.row.executeId)"></el-button>-->
<!--                        </el-tooltip>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--            <br>-->
<!--            &lt;!&ndash;分页&ndash;&gt;-->
<!--            <div class="fy_div">-->
<!--                <el-pagination-->
<!--                        @size-change="handleSizeChange"-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        :current-page="currentPage"-->
<!--                        :page-sizes="[5, 10, 20, 40]"-->
<!--                        :page-size="pagesize"-->
<!--                        layout="total, sizes, prev, pager, next, jumper"-->
<!--                        :total="tableData.length">-->
<!--                </el-pagination>-->
<!--            </div>-->

<!--        </el-card>-->



</template>

<script>
    import qs from "qs";
    export default {
        name: "hospitalExecuteManager",
        components: {},


        data() {
            return {
                activeName: 'first',
                tableData:[],
                dialogVisible: false,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                ruleForm:{
                    eId:'',
                    eName:'',
                    eSex:'',
                    ePhone:'',
                    eDate:''
                }
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event)
            },

            hsxq(s){
                this.$router.push({path: '/hsxq',query:{ id:s}});
            },

            initData(){
                this.axios.get("http://localhost:8088/find-execute2")
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