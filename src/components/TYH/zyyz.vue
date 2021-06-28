<template xmlns="http://www.w3.org/1999/html">
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>医生工作站</el-breadcrumb-item>
            <el-breadcrumb-item>住院</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card style="width: 450px;height: 100%">
            <!--表头-->
            <el-row>
                <el-col :span="20">
                    <el-input placeholder="病人"></el-input>
                </el-col>

                <el-table>
                    <el-table-column
                            prop=""
                            label="住院号"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="病人姓名"
                            width="70">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="床位"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="住院状态"
                            width="70">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="押金余额"
                            width="70">
                    </el-table-column>
                    <el-table-column  label="操作" width="50px">
                        <template  #default="scope">
                            <el-tooltip content="查看" placement="top">
                                <el-button
                                        icon="el-icon-edit" size="mini"
                                        @click=""></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>

            </el-row>

            <!--分页-->

        </el-card>

        <el-card style="width: 60%;height: 100%;margin-left: 500px;margin-top: -175px">
            <!--表头-->
            <el-button type="primary" style="margin-left: -650px" @click="dialogVisible = true">新开处方</el-button>
            <el-row>
                <el-table :data="tableData">
                    <el-table-column
                            width="150">
                        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                            临时处方
                        </el-button>

                        <el-drawer
                                v-model="drawer"
                                :direction="direction"
                                :before-close="handleClose" destroy-on-close>
                            <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="处方号" prop="">
                                            <el-input></el-input>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="处方时间" prop="">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="住院病人" prop="">
                                            <el-input></el-input>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="处方金额" prop="">
                                            <el-input></el-input>

                                        </el-form-item>
                                    </el-col>
                                </el-row><br><br>

                                处方内容<br><br><br>
                                <el-form ref="form" :rules="formRules" :inline="true" :model="form" label-width="80px">
                                    <div v-for="(item, index) in form.dynamicItem" :key="index">
                                        <el-form-item
                                                label="项目名称"
                                                :prop="'dynamicItem.' + index + '.name'"
                                        >
                                            <el-input v-model="item.name" @click="xzxm=true"></el-input>
                                        </el-form-item>
                                        <el-form-item
                                                label="单价"
                                                :prop="'dynamicItem.' + index + '.phone'"
                                        >
                                            <el-input v-model="item.phone"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button v-if="index+1 == form.dynamicItem.length" @click="addItem" type="primary">增加</el-button>
                                            <el-button v-if="index !== 0" @click="deleteItem(item, index)" type="danger">删除</el-button>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </el-form>

                            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
                            </template>
                        </el-drawer>
                    </el-table-column>
                    <el-table-column
                            prop="data"
                            label="处方号"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="病人姓名"
                            width="70">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="处方时间"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="ts"
                            label="执行天数"
                            width="70">
                    </el-table-column>
                    <el-table-column
                            prop="je"
                            label="处方金额"
                            width="70">
                    </el-table-column>
                    <el-table-column  label="操作" width="150px">
                        <template  #default="scope">
                            <el-tooltip content="查看" placement="top">
                                <el-button
                                        icon="el-icon-edit" size="mini"
                                        @click=""></el-button>
                            </el-tooltip>
                            <el-tooltip content="处方作废" placement="top">
                                <el-button
                                        icon="el-icon-delete" size="mini"
                                        @click=""></el-button>
                            </el-tooltip>
                        </template>

                    </el-table-column>
                </el-table>

            </el-row>

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
                        <el-form-item label="处方号" prop="">
                            <el-input></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="处方时间" prop="">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="住院病人" prop="">
                            <el-input></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="处方金额" prop="">
                            <el-input></el-input>

                        </el-form-item>
                    </el-col>
                </el-row><br><br>

                处方内容<br><br><br>
                <el-form ref="form" :rules="formRules" :inline="true" :model="form" label-width="80px">
                    <div v-for="(item, index) in form.dynamicItem" :key="index">
                        <el-form-item
                                label="项目名称"
                                :prop="'dynamicItem.' + index + '.name'"
                        >
                            <el-input v-model="item.name" @click="xzxm=true"></el-input>
                        </el-form-item>
                        <el-form-item
                                label="单价"
                                :prop="'dynamicItem.' + index + '.phone'"
                        >
                            <el-input v-model="item.phone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="index+1 == form.dynamicItem.length" @click="addItem" type="primary">增加</el-button>
                            <el-button v-if="index !== 0" @click="deleteItem(item, index)" type="danger">删除</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
            </template>
        </el-dialog>


        <el-dialog
                title="选择项目"
                v-model="xzxm"
                width="40%"
                :before-close="handleClose">
            <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-table>
                        <el-table-column
                                prop=""
                                label="项目编号"
                                width="60">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="项目名称"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="价格"
                                width="150">
                        </el-table-column>
                    </el-table>

                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="xzxm = false">取 消</el-button>
      <el-button type="primary" @click="xzxm = false">确 定</el-button>
    </span>
            </template>
        </el-dialog>



    </div>
</template>
<script>
    import qs from "qs";
    export default{
        name:"zyyz",
        components: {},


        data() {

            return {
                dialogVisible: false,
                xzxm: false,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ts:'1',
                    je:'100'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    ts:'1',
                    je:'100'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    ts:'1',
                    je:'100'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    ts:'1',
                    je:'100'
                }],
                form: {
                    dynamicItem: [
                        {
                            name: "",
                            phone: ""
                        }
                    ]
                },
                drawer: false,
                direction: 'rtl',
            }
        },
        methods:{
            addItem() {
                this.form.dynamicItem.push({
                    name: "",
                    phone: ""
                });
            },
            sure(form) {
                console.log(this.form.dynamicItem.length, "length");
                this.$refs[form].validate(valid => {
                    if (valid) {
                        alert("submit!");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            deleteItem(item, index) {
                this.form.dynamicItem.splice(index, 1);
                console.log(this.form.dynamicItem, "删除");
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