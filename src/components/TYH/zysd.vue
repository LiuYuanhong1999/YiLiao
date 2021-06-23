<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>住院管理</el-breadcrumb-item>
            <el-breadcrumb-item>住院锁定</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="请输入住院锁定号"></el-input>
                </el-col>
                <!--打印导入导出-->
                <el-button type="primary" style="margin-left: 800px" @click="dialogVisible = true">新增</el-button>
            </el-row>
            <el-table

                    stripe
                    style="width: 100%"
            >
                <el-table-column
                        prop=""
                        label="住院锁定号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="锁定日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="住院号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="锁定原因"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="病人姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="病人床位"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="备注"
                        width="100">
                </el-table-column>
                <el-table-column  label="操作" width="130px">
                    <template  #default="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button
                                    icon="el-icon-edit" size="mini"
                                    @click=""></el-button>
                        </el-tooltip>


                        <el-tooltip content="删除" placement="top">
                            <el-button
                                    icon="el-icon-delete" size="mini"
                                    @click=""></el-button>
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
                        <el-form-item label="住院锁定号" prop="">
                            <el-input></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="住院号" prop="">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="锁定原因" prop="">
                            <el-input></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注" prop="">
                            <el-input></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="病人姓名" prop="">
                            <el-input></el-input>

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



    </div>
</template>
<script>
    import qs from "qs";
    export default{
        name:"zysd",
        components: {},


        data() {
            return {
                dialogVisible: false,
            }
        },
        methods:{



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