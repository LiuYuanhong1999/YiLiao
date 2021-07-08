<template>
  <!-- 员工管理 -->
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增员工</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin: 40px; border: 1px solid #b9b9b9">
      <div style="margin: 20px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择性别">
            <el-option label="男" value="shanghai"></el-option>
            <el-option label="女" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生年月" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="民族" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择民族">
            <el-option label="汉族" value="shanghai"></el-option>
            <el-option label="少数民族" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="婚姻状况" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择状况">
            <el-option label="已婚" value="shanghai"></el-option>
            <el-option label="未婚" value="shanghai"></el-option>
            <el-option label="离异" value="shanghai"></el-option>
            <el-option label="丧偶" value="shanghai"></el-option>
            <el-option label="再婚" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="头像上传">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>


        <el-form-item label="籍贯地址" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="家庭地址" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="紧急联系人" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="文化程度" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="小学" value="shanghai"></el-option>
            <el-option label="高中" value="beijing"></el-option>
            <el-option label="中专" value="beijing"></el-option>
            <el-option label="大专" value="beijing"></el-option>
            <el-option label="本科" value="beijing"></el-option>
            <el-option label="硕士" value="beijing"></el-option>
            <el-option label="博士" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="政治面貌" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="群众" value="shanghai"></el-option>
            <el-option label="团员" value="beijing"></el-option>
            <el-option label="党员" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职务" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="护理员" value="shanghai"></el-option>
            <el-option label="护理部长" value="beijing"></el-option>
            <el-option label="医生" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业类别" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="薪资范围" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="合同类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="正式员工" value="shanghai"></el-option>
            <el-option label="劳务合同" value="beijing"></el-option>
            <el-option label="无" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合同开始时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="合同结束时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="入职时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="人员类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="行政人员" value="shanghai"></el-option>
            <el-option label="医务人员" value="beijing"></el-option>
            <el-option label="护理人员" value="beijing"></el-option>
            <el-option label="后勤人员" value="beijing"></el-option>
            <el-option label="其他" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工作岗位" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="行政人员" value="shanghai"></el-option>
            <el-option label="医务人员" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属部门" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="行政人员" value="shanghai"></el-option>
            <el-option label="医务人员" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传合同附件" prop="region">
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" >立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>


      </el-form>
      </div>

    </div>



  </div>


</template>

<script>
export default {
  name: "YxjStaffXz",
  data() {
    return {
      //合同附件开始
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      //合同附件结束

      //图片上传
      imageUrl: '',
      //图片上传结束


      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };

  },

  methods: {
    //初始表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //初始表单结束

    //合同附件开始
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //合同附件结束

    //图片上传方法开始
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //图片上传方法结束


    //立即创建跳转开始
    tz(){
      this.$router.push({
        path:"/YxjStaff"
      })
    }

  },



  created() {

  },
}
</script>

<style scoped>


.fy_div {
  margin-top: 20px;
  margin-left: -30px;
}
</style>