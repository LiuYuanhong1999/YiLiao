<template>
  <el-form ref="patientData" :model="patientData"  label-width="100px">
    <el-page-header content="详情页" @back="goBack" />
    <el-row style="margin-top: 30px">
      <!--基本输入框-->
      <el-col :span="5">
        <el-form-item label="诊疗卡编号" prop="medicalCardNumber">
          {{patientData.medicalCard.medicalCardNumber}}
        </el-form-item>
      </el-col>
      <!--基本单选框-->
      <el-col :span="5">
        <el-form-item label="所属人：" prop="patientDataName">
          {{patientData.patientDataName}}
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="余额：" prop="medicalCardBalance">
          {{patientData.medicalCard.medicalCardBalance}}
        </el-form-item>
      </el-col>
    </el-row>
    <!--上传文件-->
    <el-row>
      <el-col :span="20">
        <el-form-item label="充值记录" prop="fileName">

        </el-form-item>
      </el-col>


    </el-row>
    <!--数据表格-->
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-table
              :data="patientData.medicalCard.medicalCardRecord"
              border
              style="width: 100%">
            <el-table-column
                prop="medicalCardRecordId"
                label="充值记录编号"
                width="180">
            </el-table-column>

            <el-table-column
                prop="medicalCardTime"
                label="充值时间">
            </el-table-column>

            <el-table-column
                prop="medicalCardPerson"
                label="执行人">
            </el-table-column>

            <el-table-column
                prop="medicalCardMoney"
                label="充值金额">
            </el-table-column>

          </el-table>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
export default {
  name: "therapyDetailsManager",
  data() {
    return {
      //病人及诊疗卡号
      patientData:{
      },
    }
  },
  methods:{
    // 跳转返回指定的页面
    goBack() {
      this.$router.push({
        path: '/therapy'
      })
    },
  },
  created() {
    this.patientData=JSON.parse(this.$route.query.value);
    console.log(this.patientData)
  }
}
</script>

<style scoped>

</style>